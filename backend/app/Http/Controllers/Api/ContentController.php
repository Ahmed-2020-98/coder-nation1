<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\TestimonialResource;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ContentController extends Controller
{
    /** Settings stored as {ar, en} maps that are resolved to the request locale. */
    public const TRANSLATABLE_SETTINGS = ['address', 'tagline'];

    public function services(): AnonymousResourceCollection
    {
        return ServiceResource::collection(Service::active()->get());
    }

    public function service(string $slug): ServiceResource
    {
        return new ServiceResource(Service::active()->where('slug', $slug)->firstOrFail());
    }

    public function projects(Request $request): AnonymousResourceCollection
    {
        $projects = Project::active()
            ->when($request->query('category'), fn ($q, $category) => $q->where('category', $category))
            ->when($request->boolean('featured'), fn ($q) => $q->where('is_featured', true))
            ->when($request->integer('limit'), fn ($q, $limit) => $q->limit($limit))
            ->get();

        return ProjectResource::collection($projects);
    }

    public function project(string $slug): ProjectResource
    {
        return new ProjectResource(Project::active()->where('slug', $slug)->firstOrFail());
    }

    public function testimonials(): AnonymousResourceCollection
    {
        return TestimonialResource::collection(Testimonial::active()->get());
    }

    public function settings(): JsonResponse
    {
        $locale = app()->getLocale();
        $settings = Setting::allValues();

        foreach (self::TRANSLATABLE_SETTINGS as $key) {
            if (is_array($settings[$key] ?? null)) {
                $settings[$key] = $settings[$key][$locale] ?? $settings[$key][config('app.fallback_locale')] ?? null;
            }
        }

        return response()->json(['data' => $settings]);
    }
}
