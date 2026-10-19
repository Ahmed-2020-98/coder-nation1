<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ContactMessageResource;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json(['data' => [
            'services' => Service::count(),
            'projects' => Project::count(),
            'testimonials' => Testimonial::count(),
            'messages' => ContactMessage::count(),
            'new_messages' => ContactMessage::where('status', 'new')->count(),
            'latest_messages' => ContactMessageResource::collection(
                ContactMessage::with('service')->latest()->limit(5)->get()
            ),
        ]]);
    }
}
