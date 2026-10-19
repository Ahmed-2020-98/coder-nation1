<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TestimonialRequest;
use App\Http\Resources\Admin\TestimonialResource;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TestimonialController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return TestimonialResource::collection(Testimonial::orderBy('order')->orderBy('id')->get());
    }

    public function store(TestimonialRequest $request): TestimonialResource
    {
        return new TestimonialResource(Testimonial::create($request->validated()));
    }

    public function show(Testimonial $testimonial): TestimonialResource
    {
        return new TestimonialResource($testimonial);
    }

    public function update(TestimonialRequest $request, Testimonial $testimonial): TestimonialResource
    {
        $testimonial->update($request->validated());

        return new TestimonialResource($testimonial);
    }

    public function destroy(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();

        return response()->json(status: 204);
    }
}
