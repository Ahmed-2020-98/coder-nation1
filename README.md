# Coder Nation

الموقع التعريفي لشركة **Coder Nation** (تصميم وتطوير المواقع وتطبيقات الموبايل) + لوحة تحكم + API.

| المجلد | التقنية | الوصف | المنفذ |
| --- | --- | --- | --- |
| `backend/` | Laravel 13 + Sanctum | REST API للمحتوى، فورم التواصل، ولوحة التحكم | `8000` |
| `web/` | Next.js 15 + Tailwind v4 + next-intl | الموقع العام — عربي/إنجليزي، فاتح/داكن | `3000` |
| `dashboard/` | Next.js 15 + TanStack Query | لوحة التحكم (عربي RTL) | `3001` |

## التشغيل محلياً

المتطلبات: PHP 8.3+، Composer، Node.js 20+.

```bash
# 1) الـ API
cd backend
composer install
cp .env.example .env && php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan storage:link
php artisan serve            # http://localhost:8000

# 2) الموقع
cd ../web
cp .env.example .env.local
npm install && npm run dev   # http://localhost:3000

# 3) لوحة التحكم
cd ../dashboard
cp .env.example .env.local
npm install && npm run dev   # http://localhost:3001
```

بيانات دخول لوحة التحكم الافتراضية (من `ADMIN_EMAIL` / `ADMIN_PASSWORD` في `backend/.env`):
`admin@codernation.com` / `password` — **غيّرها قبل النشر.**

## إضافة خدمة جديدة (لوجو، هوية، SEO…)

من لوحة التحكم ← **الخدمات** ← **خدمة جديدة**. الخدمة تظهر تلقائياً في الرئيسية، صفحة الخدمات، الفوتر، وقائمة فورم التواصل.
الموقع يحدّث المحتوى كل 60 ثانية (ISR).

## الـ API

- عام (`/api/v1`): `services`, `services/{slug}`, `projects?category=&featured=&limit=`, `projects/{slug}`, `testimonials`, `settings`, `POST contact` — اللغة عبر `?locale=ar|en`.
- لوحة التحكم (`/api/v1/admin`, Bearer token): `login`, `logout`, `me`, `stats`, CRUD لـ `services` / `projects` / `testimonials`, `messages`, `settings`, `uploads`, `PATCH {resource}/reorder`.

لوحة التحكم لا تعرض التوكن للمتصفح: يتم حفظه في cookie من نوع httpOnly، وكل الطلبات تمر عبر `dashboard/src/app/api/proxy`.

## الاختبارات

```bash
cd backend && php artisan test
cd web && npm run lint && npm run build
cd dashboard && npm run lint && npm run build
```

## النشر

- `backend`: أي استضافة PHP (MySQL مدعوم — عدّل `DB_*`)، واضبط `APP_URL` و `CORS_ALLOWED_ORIGINS` بدومين الموقع واللوحة.
- `web`: Vercel أو أي Node host — `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`.
- `dashboard`: `API_URL` (يُستخدم من السيرفر فقط), `NEXT_PUBLIC_SITE_URL`.
