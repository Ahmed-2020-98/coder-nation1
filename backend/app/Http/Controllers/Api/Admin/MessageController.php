<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ContactMessageResource;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;

class MessageController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $messages = ContactMessage::with('service')
            ->when($request->query('status'), fn ($q, $status) => $q->where('status', $status))
            ->when($request->query('search'), fn ($q, $search) => $q->where(fn ($q) => $q
                ->where('name', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%")
                ->orWhere('message', 'like', "%$search%")))
            ->latest()
            ->paginate($request->integer('per_page', 20));

        return ContactMessageResource::collection($messages);
    }

    public function show(ContactMessage $message): ContactMessageResource
    {
        if ($message->status === 'new') {
            $message->update(['status' => 'read']);
        }

        return new ContactMessageResource($message->load('service'));
    }

    public function update(Request $request, ContactMessage $message): ContactMessageResource
    {
        $message->update($request->validate([
            'status' => ['required', Rule::in(ContactMessage::STATUSES)],
        ]));

        return new ContactMessageResource($message->load('service'));
    }

    public function destroy(ContactMessage $message): JsonResponse
    {
        $message->delete();

        return response()->json(status: 204);
    }
}
