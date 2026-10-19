<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReorderController extends Controller
{
    private const MODELS = [
        'services' => Service::class,
        'projects' => Project::class,
        'testimonials' => Testimonial::class,
    ];

    public function __invoke(Request $request, string $resource): JsonResponse
    {
        abort_unless(isset(self::MODELS[$resource]), 404);

        $ids = $request->validate(['ids' => ['required', 'array'], 'ids.*' => ['integer']])['ids'];
        $model = self::MODELS[$resource];

        DB::transaction(function () use ($ids, $model) {
            foreach ($ids as $position => $id) {
                $model::whereKey($id)->update(['order' => $position]);
            }
        });

        return response()->json(status: 204);
    }
}
