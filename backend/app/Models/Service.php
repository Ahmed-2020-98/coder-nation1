<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class Service extends Model
{
    use HasTranslations;

    public array $translatable = ['title', 'excerpt', 'description', 'features'];

    protected $fillable = [
        'slug', 'title', 'excerpt', 'description', 'features', 'icon', 'category', 'order', 'is_active',
    ];

    protected function casts(): array
    {
        return ['is_active' => 'boolean', 'order' => 'integer'];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)->orderBy('order')->orderBy('id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(ContactMessage::class);
    }
}
