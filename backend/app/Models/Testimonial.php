<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Testimonial extends Model
{
    use HasTranslations;

    public array $translatable = ['role', 'content'];

    protected $fillable = ['name', 'role', 'company', 'content', 'rating', 'avatar', 'order', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean', 'rating' => 'integer', 'order' => 'integer'];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)->orderBy('order')->orderBy('id');
    }
}
