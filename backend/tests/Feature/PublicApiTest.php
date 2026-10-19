<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\Service;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_services_are_localized(): void
    {
        $this->getJson('/api/v1/services?locale=ar')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.title', 'تصميم وتطوير المواقع');

        $this->getJson('/api/v1/services?locale=en')
            ->assertJsonPath('data.0.title', 'Web Design & Development')
            ->assertJsonPath('data.0.features.0', 'Custom UI/UX tailored to your brand');
    }

    public function test_inactive_services_are_hidden(): void
    {
        Service::where('slug', 'mobile-apps')->update(['is_active' => false]);

        $this->getJson('/api/v1/services')->assertJsonCount(1, 'data');
        $this->getJson('/api/v1/services/mobile-apps')->assertNotFound();
    }

    public function test_projects_can_be_filtered(): void
    {
        $this->getJson('/api/v1/projects?category=mobile')
            ->assertOk()
            ->assertJsonCount(3, 'data');

        $this->getJson('/api/v1/projects?featured=1&limit=2')->assertJsonCount(2, 'data');
        $this->getJson('/api/v1/projects/souq-platform?locale=en')
            ->assertJsonPath('data.title', 'Souq E-commerce Platform');
    }

    public function test_settings_resolve_translatable_values(): void
    {
        $this->getJson('/api/v1/settings?locale=en')
            ->assertOk()
            ->assertJsonPath('data.address', 'Cairo, Egypt')
            ->assertJsonPath('data.stats.projects', 120);
    }

    public function test_contact_form_stores_message(): void
    {
        $service = Service::first();

        $this->postJson('/api/v1/contact?locale=en', [
            'name' => 'Ahmed',
            'email' => 'ahmed@example.com',
            'service_id' => $service->id,
            'message' => 'I need a new company website.',
        ])->assertCreated();

        $this->assertDatabaseHas(ContactMessage::class, [
            'email' => 'ahmed@example.com', 'status' => 'new', 'locale' => 'en',
        ]);
    }

    public function test_contact_form_validates_input(): void
    {
        $this->postJson('/api/v1/contact', ['name' => 'A', 'email' => 'not-an-email'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'message']);
    }

    public function test_contact_form_is_throttled(): void
    {
        $payload = ['name' => 'Ahmed', 'email' => 'a@example.com', 'message' => 'Hello there, need an app.'];

        foreach (range(1, 5) as $i) {
            $this->postJson('/api/v1/contact', $payload)->assertCreated();
        }

        $this->postJson('/api/v1/contact', $payload)->assertTooManyRequests();
    }
}
