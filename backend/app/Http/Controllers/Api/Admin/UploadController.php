<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Support\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,svg', 'max:5120'],
            'folder' => ['nullable', 'in:projects,testimonials,services'],
        ]);

        $path = $request->file('file')->store($request->input('folder', 'uploads'), 'public');

        return response()->json(['path' => $path, 'url' => Media::url($path)], 201);
    }
}
