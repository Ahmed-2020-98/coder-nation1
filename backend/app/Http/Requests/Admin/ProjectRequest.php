<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    use TranslatableRules;

    public function rules(): array
    {
        return [
            'slug' => ['required', 'alpha_dash', 'max:120', Rule::unique('projects')->ignore($this->route('project'))],
            ...$this->translatable('title', max: 160),
            ...$this->translatable('summary', max: 400),
            ...$this->translatable('description'),
            'category' => ['required', 'string', 'max:60'],
            'cover' => ['nullable', 'string', 'max:255'],
            'color' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'gallery' => ['nullable', 'array', 'max:12'],
            'gallery.*' => ['string', 'max:255'],
            'client' => ['nullable', 'string', 'max:120'],
            'tech_stack' => ['nullable', 'array'],
            'tech_stack.*' => ['string', 'max:40'],
            'live_url' => ['nullable', 'url', 'max:255'],
            'year' => ['nullable', 'integer', 'between:2000,2100'],
            'is_featured' => ['boolean'],
            'order' => ['integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}
