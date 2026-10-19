<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(['data' => Setting::allValues()]);
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'string', 'max:30'],
            'whatsapp' => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'array'],
            'address.ar' => ['nullable', 'string', 'max:255'],
            'address.en' => ['nullable', 'string', 'max:255'],
            'tagline' => ['nullable', 'array'],
            'tagline.ar' => ['nullable', 'string', 'max:255'],
            'tagline.en' => ['nullable', 'string', 'max:255'],
            'socials' => ['nullable', 'array'],
            'socials.*' => ['nullable', 'url', 'max:255'],
            'stats' => ['nullable', 'array'],
            'stats.*' => ['nullable', 'integer', 'min:0'],
        ]);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return $this->show();
    }
}
