<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\ContactMessage */
class ContactMessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'budget' => $this->budget,
            'message' => $this->message,
            'status' => $this->status,
            'locale' => $this->locale,
            'service' => $this->whenLoaded('service', fn () => $this->service ? [
                'id' => $this->service->id,
                'title' => $this->service->getTranslations('title'),
            ] : null),
            'created_at' => $this->created_at,
        ];
    }
}
