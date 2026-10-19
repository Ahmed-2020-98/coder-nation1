<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Service */
class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->getTranslations('title'),
            'excerpt' => $this->getTranslations('excerpt'),
            'description' => $this->getTranslations('description'),
            'features' => $this->getTranslations('features'),
            'icon' => $this->icon,
            'category' => $this->category,
            'order' => $this->order,
            'is_active' => $this->is_active,
            'messages_count' => $this->whenCounted('messages'),
            'updated_at' => $this->updated_at,
        ];
    }
}
