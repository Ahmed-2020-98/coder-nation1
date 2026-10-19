<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'email' => 'hello@codernation.com',
            'phone' => '+20 100 000 0000',
            'whatsapp' => '+201000000000',
            'address' => ['ar' => 'القاهرة، مصر', 'en' => 'Cairo, Egypt'],
            'tagline' => [
                'ar' => 'نصمم ونطوّر مواقع وتطبيقات تصنع فرقاً حقيقياً في أعمالك.',
                'en' => 'We design and build websites and apps that move your business forward.',
            ],
            'socials' => [
                'facebook' => 'https://facebook.com/codernation',
                'instagram' => 'https://instagram.com/codernation',
                'linkedin' => 'https://linkedin.com/company/codernation',
                'behance' => 'https://behance.net/codernation',
            ],
            'stats' => ['projects' => 120, 'clients' => 85, 'years' => 6, 'satisfaction' => 98],
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
