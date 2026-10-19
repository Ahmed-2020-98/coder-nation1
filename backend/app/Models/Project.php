<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Project extends Model
{
    use HasTranslations;

    public array $translatable = ['title', 'summary', 'description'];

    protected $fillable = [
        'slug', 'title', 'summary', 'description', 'category', 'cover', 'color', 'gallery', 'client',
        'tech_stack', 'live_url', 'year', 'is_featured', 'order', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'gallery' => 'array',
            'tech_stack' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'order' => 'integer',
            'year' => 'integer',
        ];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)->orderBy('order')->orderByDesc('id');
    }
}
