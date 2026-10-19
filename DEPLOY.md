# رفع Coder Nation على coder-nation.com

| الجزء | المكان | الدومين |
| --- | --- | --- |
| الموقع (`web/`) | Vercel | `coder-nation.com` + `www.coder-nation.com` |
| لوحة التحكم (`dashboard/`) | Vercel | `admin.coder-nation.com` |
| الـ API (`backend/`) | Railway (أو أي استضافة PHP 8.3) | `api.coder-nation.com` |

ابدأ بالـ API لأن الموقع واللوحة محتاجين رابطه.

## 1) الـ API على Railway

1. https://railway.com/new ← **Deploy from GitHub repo** ← `Ahmed-2020-98/coder-nation1`.
2. Settings ← **Root Directory** = `backend`.
3. اضغط **+ New** ← **Database** ← **MySQL** في نفس المشروع.
4. في متغيرات خدمة الـ backend (Variables):

   ```env
   APP_NAME="Coder Nation"
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=           # اعمله بـ: php artisan key:generate --show
   APP_URL=https://api.coder-nation.com
   APP_LOCALE=ar
   DB_CONNECTION=mysql
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_DATABASE=${{MySQL.MYSQLDATABASE}}
   DB_USERNAME=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   CORS_ALLOWED_ORIGINS=https://coder-nation.com,https://www.coder-nation.com,https://admin.coder-nation.com
   ADMIN_EMAIL=you@coder-nation.com
   ADMIN_PASSWORD=   # كلمة سر قوية
   ```

5. Settings ← Deploy ← **Pre-Deploy Command**:
   `php artisan migrate --force && php artisan storage:link`
6. **الصور المرفوعة:** ملفات Railway بتتمسح مع كل deploy. ضيف **Volume** على مسار `/app/storage/app/public` عشان صور الأعمال وآراء العملاء تفضل محفوظة.
7. بعد أول deploy شغّل مرة واحدة من الـ shell أو كـ one-off command:
   `php artisan db:seed --force`
   (بيعمل حساب الأدمن من `ADMIN_EMAIL` / `ADMIN_PASSWORD` + المحتوى المبدئي.)
8. Settings ← Networking ← **Custom Domain** = `api.coder-nation.com`. Railway هيديك سجل CNAME تحطه عند مزوّد الدومين.

اختبار: `https://api.coder-nation.com/api/v1/services` لازم يرجّع JSON.

## 2) الموقع على Vercel

1. https://vercel.com/new ← Import `Ahmed-2020-98/coder-nation1`.
2. **Root Directory** = `web` (الـ Framework هيتعرف تلقائياً Next.js).
3. Environment Variables:

   ```env
   NEXT_PUBLIC_API_URL=https://api.coder-nation.com/api/v1
   NEXT_PUBLIC_SITE_URL=https://coder-nation.com
   ```

4. Deploy، وبعدها Settings ← **Domains** ← ضيف `coder-nation.com` و `www.coder-nation.com` (خلّي www يحوّل على الأساسي).

## 3) لوحة التحكم على Vercel

نفس الخطوات بمشروع Vercel تاني:

- **Root Directory** = `dashboard`
- Environment Variables:

  ```env
  API_URL=https://api.coder-nation.com/api/v1
  NEXT_PUBLIC_SITE_URL=https://coder-nation.com
  ```

- Domain: `admin.coder-nation.com`

## 4) DNS عند مزوّد الدومين

القيم الدقيقة بتظهر في صفحة Domains في Vercel و Railway، وغالباً هتكون:

| النوع | الاسم | القيمة |
| --- | --- | --- |
| A | `@` | `76.76.21.21` (Vercel) |
| CNAME | `www` | `cname.vercel-dns.com` |
| CNAME | `admin` | `cname.vercel-dns.com` |
| CNAME | `api` | القيمة اللي Railway يديهالك |

الـ SSL (https) بيتعمل تلقائياً على الاتنين بعد ما الـ DNS ينتشر (من دقايق لساعات).

## بعد الرفع

- أي push على `main` بيعمل deploy تلقائي للتلاتة.
- الموقع بيحدّث المحتوى من الـ API كل 60 ثانية.
- لو الموقع اتفتح قبل ما الـ API يشتغل، هيعرض الخدمتين من المحتوى الاحتياطي، والأعمال والآراء وفورم التواصل مش هيشتغلوا لحد ما الـ API يبقى متاح.
