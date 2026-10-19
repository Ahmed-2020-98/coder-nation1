<?php

namespace App\Http\Resources\Admin;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Project */
class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->getTranslations('title'),
            'summary' => $this->getTranslations('summary'),
            'description' => $this->getTranslations('description'),
            'category' => $this->category,
            'cover' => $this->cover,
            'cover_url' => Media::url($this->cover),
            'color' => $this->color,
            'gallery' => $this->gallery ?? [],
            'gallery_urls' => Media::urls($this->gallery),
            'client' => $this->client,
            'tech_stack' => $this->tech_stack ?? [],
            'live_url' => $this->live_url,
            'year' => $this->year,
            'is_featured' => $this->is_featured,
            'order' => $this->order,
            'is_active' => $this->is_active,
            'updated_at' => $this->updated_at,
        ];
    }
}
