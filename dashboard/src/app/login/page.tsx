"use client";

import { Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { Monogram } from "@/components/Logo";
import { Button, Field, Input } from "@/components/ui";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(event.currentTarget);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });

    if (res.ok) {
      const next = params.get("next");
      router.replace(next?.startsWith("/") ? next : "/");
      router.refresh();
      return;
    }

    setLoading(false);
    setError(res.status === 429 ? "محاولات كثيرة، حاول بعد دقيقة." : "البريد الإلكتروني أو كلمة المرور غير صحيحة.");
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <Field label="البريد الإلكتروني" htmlFor="email">
        <Input id="email" name="email" type="email" dir="ltr" autoComplete="username" required className="text-right" />
      </Field>
      <Field label="كلمة المرور" htmlFor="password">
        <Input id="password" name="password" type="password" dir="ltr" autoComplete="current-password" required className="text-right" />
      </Field>
      {error && (
        <p role="alert" className="rounded-xl bg-red-500/10 px-3.5 py-2.5 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}
      <Button type="submit" loading={loading} className="h-11 w-full">
        <Lock className="size-4" />
        تسجيل الدخول
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-brand lg:block">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <Monogram className="absolute -bottom-20 -left-20 h-[38rem] w-auto text-white/[0.06]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3" dir="ltr">
            <Monogram className="h-8 w-auto" />
            <span className="font-wordmark text-sm font-semibold tracking-[0.18em]">CODER NATION</span>
          </div>
          <div>
            <h1 className="text-4xl leading-tight font-bold">أدِر محتوى موقعك<br />بسهولة ووضوح.</h1>
            <p className="mt-4 max-w-sm text-white/65">الخدمات، الأعمال، آراء العملاء، والرسائل — كلها في مكان واحد.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Monogram className="h-10 w-auto text-ink lg:hidden" />
          <h2 className="mt-6 text-2xl font-bold text-ink lg:mt-0">تسجيل الدخول</h2>
          <p className="mt-1 mb-8 text-sm text-muted">ادخل بياناتك للوصول إلى لوحة التحكم.</p>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
