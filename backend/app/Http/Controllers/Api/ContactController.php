<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function store(ContactRequest $request): JsonResponse
    {
        ContactMessage::create([...$request->validated(), 'locale' => app()->getLocale()]);

        return response()->json(['message' => __('Your message has been received.')], 201);
    }
}
