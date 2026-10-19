<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email', 'max:190'],
            'phone' => ['nullable', 'string', 'max:30'],
            'service_id' => ['nullable', 'integer', 'exists:services,id'],
            'budget' => ['nullable', 'string', 'max:60'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ];
    }
}
