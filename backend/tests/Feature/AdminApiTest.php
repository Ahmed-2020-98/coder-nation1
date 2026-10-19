<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\Service;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_admin_routes_require_authentication(): void
    {
        $this->getJson('/api/v1/admin/stats')->assertUnauthorized();
        $this->postJson('/api/v1/admin/services', [])->assertUnauthorized();
    }

    public function test_admin_can_login_and_logout(): void
    {
        $token = $this->postJson('/api/v1/admin/login', [
            'email' => 'admin@codernation.com',
            'password' => 'password',
        ])->assertOk()->json('token');

        $this->withToken($token)->getJson('/api/v1/admin/me')->assertJsonPath('data.email', 'admin@codernation.com');
        $this->withToken($token)->postJson('/api/v1/admin/logout')->assertNoContent();
    }

    public function test_login_rejects_wrong_password(): void
    {
        $this->postJson('/api/v1/admin/login', ['email' => 'admin@codernation.com', 'password' => 'nope'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('email');
    }

    public function test_admin_can_manage_services(): void
    {
        Sanctum::actingAs(User::first());

        $payload = [
            'slug' => 'seo',
            'icon' => 'search',
            'title' => ['ar' => 'تحسين محركات البحث', 'en' => 'SEO'],
            'excerpt' => ['ar' => 'تصدّر نتائج البحث.', 'en' => 'Rank higher on Google.'],
            'description' => ['ar' => 'وصف الخدمة', 'en' => 'Service description'],
            'features' => ['ar' => ['تحليل الكلمات'], 'en' => ['Keyword research']],
            'order' => 2,
            'is_active' => true,
        ];

        $id = $this->postJson('/api/v1/admin/services', $payload)
            ->assertCreated()
            ->assertJsonPath('data.title.en', 'SEO')
            ->json('data.id');

        $this->getJson('/api/v1/services?locale=en')->assertJsonCount(3, 'data');

        $this->putJson("/api/v1/admin/services/$id", [...$payload, 'title' => ['ar' => 'سيو', 'en' => 'Search Engine Optimization']])
            ->assertOk()
            ->assertJsonPath('data.title.en', 'Search Engine Optimization');

        $this->postJson('/api/v1/admin/services', $payload)->assertJsonValidationErrors('slug');

        $this->deleteJson("/api/v1/admin/services/$id")->assertNoContent();
        $this->assertDatabaseMissing(Service::class, ['id' => $id]);
    }

    public function test_viewing_a_message_marks_it_read(): void
    {
        Sanctum::actingAs(User::first());
        $message = ContactMessage::create(['name' => 'X', 'email' => 'x@example.com', 'message' => 'Hello world!']);

        $this->getJson('/api/v1/admin/stats')->assertJsonPath('data.new_messages', 1);
        $this->getJson("/api/v1/admin/messages/{$message->id}")->assertJsonPath('data.status', 'read');
        $this->patchJson("/api/v1/admin/messages/{$message->id}", ['status' => 'replied'])->assertJsonPath('data.status', 'replied');
        $this->patchJson("/api/v1/admin/messages/{$message->id}", ['status' => 'bogus'])->assertUnprocessable();
    }

    public function test_settings_and_reorder_and_upload(): void
    {
        Sanctum::actingAs(User::first());
        Storage::fake('public');

        $this->putJson('/api/v1/admin/settings', ['email' => 'team@codernation.com', 'stats' => ['projects' => 150]])
            ->assertJsonPath('data.email', 'team@codernation.com');
        $this->getJson('/api/v1/settings')->assertJsonPath('data.stats.projects', 150);

        $ids = Service::orderByDesc('id')->pluck('id')->all();
        $this->patchJson('/api/v1/admin/services/reorder', ['ids' => $ids])->assertNoContent();
        $this->getJson('/api/v1/services')->assertJsonPath('data.0.id', $ids[0]);

        $path = $this->postJson('/api/v1/admin/uploads', [
            'file' => UploadedFile::fake()->image('cover.jpg'),
            'folder' => 'projects',
        ])->assertCreated()->json('path');
        Storage::disk('public')->assertExists($path);
    }
}
