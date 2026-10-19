<?php

namespace App\Http\Requests\Admin;

trait TranslatableRules
{
    /** Validation rules for a {ar, en} translatable field. */
    protected function translatable(string $field, bool $required = true, int $max = 5000): array
    {
        $presence = $required ? 'required' : 'nullable';

        return [
            $field => [$presence, 'array'],
            "$field.ar" => [$presence, 'string', "max:$max"],
            "$field.en" => [$presence, 'string', "max:$max"],
        ];
    }
}
