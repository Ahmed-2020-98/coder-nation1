<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectRequest;
use App\Http\Resources\Admin\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return ProjectResource::collection(Project::orderBy('order')->orderByDesc('id')->get());
    }

    public function store(ProjectRequest $request): ProjectResource
    {
        return new ProjectResource(Project::create($request->validated()));
    }

    public function show(Project $project): ProjectResource
    {
        return new ProjectResource($project);
    }

    public function update(ProjectRequest $request, Project $project): ProjectResource
    {
        $project->update($request->validated());

        return new ProjectResource($project);
    }

    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json(status: 204);
    }
}
