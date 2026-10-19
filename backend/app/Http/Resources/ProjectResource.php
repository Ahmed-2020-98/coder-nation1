<?php

namespace App\Http\Resources;

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
            'title' => $this->title,
            'summary' => $this->summary,
            'description' => $this->description,
            'category' => $this->category,
            'cover' => Media::url($this->cover),
            'color' => $this->color,
            'gallery' => Media::urls($this->gallery),
            'client' => $this->client,
            'tech_stack' => $this->tech_stack ?? [],
            'live_url' => $this->live_url,
            'year' => $this->year,
            'is_featured' => $this->is_featured,
        ];
    }
}
