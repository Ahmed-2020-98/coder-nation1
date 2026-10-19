<?php

namespace App\Http\Resources\Admin;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Testimonial */
class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->getTranslations('role'),
            'company' => $this->company,
            'content' => $this->getTranslations('content'),
            'rating' => $this->rating,
            'avatar' => $this->avatar,
            'avatar_url' => Media::url($this->avatar),
            'order' => $this->order,
            'is_active' => $this->is_active,
            'updated_at' => $this->updated_at,
        ];
    }
}
