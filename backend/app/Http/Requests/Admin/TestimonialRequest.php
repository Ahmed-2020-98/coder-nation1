<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TestimonialRequest extends FormRequest
{
    use TranslatableRules;

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            ...$this->translatable('role', max: 120),
            'company' => ['nullable', 'string', 'max:120'],
            ...$this->translatable('content', max: 1500),
            'rating' => ['required', 'integer', 'between:1,5'],
            'avatar' => ['nullable', 'string', 'max:255'],
            'order' => ['integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}
