<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@codernation.com')],
            ['name' => 'Coder Nation Admin', 'password' => env('ADMIN_PASSWORD', 'password')],
        );

        $this->call([
            SettingSeeder::class,
            ServiceSeeder::class,
            ProjectSeeder::class,
            TestimonialSeeder::class,
        ]);
    }
}
