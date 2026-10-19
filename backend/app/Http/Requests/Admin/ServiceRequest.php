<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ServiceRequest extends FormRequest
{
    use TranslatableRules;

    public function rules(): array
    {
        return [
            'slug' => ['required', 'alpha_dash', 'max:120', Rule::unique('services')->ignore($this->route('service'))],
            ...$this->translatable('title', max: 160),
            ...$this->translatable('excerpt', max: 400),
            ...$this->translatable('description'),
            'features' => ['nullable', 'array'],
            'features.ar' => ['nullable', 'array'],
            'features.ar.*' => ['string', 'max:200'],
            'features.en' => ['nullable', 'array'],
            'features.en.*' => ['string', 'max:200'],
            'icon' => ['required', 'string', 'max:60'],
            'category' => ['nullable', 'string', 'max:60'],
            'order' => ['integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}
