<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public const LOCALES = ['ar', 'en'];

    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->query('locale') ?? $request->getPreferredLanguage(self::LOCALES);

        app()->setLocale(in_array($locale, self::LOCALES, true) ? $locale : config('app.locale'));

        return $next($request);
    }
}
