<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        Service::updateOrCreate(['slug' => 'web-development'], [
            'icon' => 'monitor',
            'category' => 'web',
            'order' => 0,
            'title' => ['ar' => 'تصميم وتطوير المواقع', 'en' => 'Web Design & Development'],
            'excerpt' => [
                'ar' => 'مواقع سريعة وأنيقة ومتجاوبة، مبنية لتحويل الزوار إلى عملاء.',
                'en' => 'Fast, elegant, responsive websites engineered to turn visitors into customers.',
            ],
            'description' => [
                'ar' => 'من الموقع التعريفي إلى المتجر الإلكتروني ومنصات الأعمال المعقدة، نبني مواقع بأحدث التقنيات مثل Next.js و Laravel. نبدأ بفهم أهدافك وجمهورك، ثم نصمم تجربة استخدام واضحة وواجهة تعكس هويتك، ونطوّرها بكود نظيف وأداء عالٍ وتوافق كامل مع محركات البحث، مع لوحة تحكم سهلة تدير منها كل المحتوى.',
                'en' => 'From corporate websites to e-commerce stores and complex business platforms, we build with modern technology like Next.js and Laravel. We start by understanding your goals and audience, design a clear experience and an interface that reflects your brand, then engineer it with clean code, high performance and SEO built in — plus an easy dashboard to manage every piece of content.',
            ],
            'features' => [
                'ar' => ['تصميم UI/UX مخصص لهويتك', 'تطوير بـ Next.js و Laravel', 'متجاوب مع كل الشاشات', 'سرعة تحميل وأداء عالٍ', 'تهيئة كاملة لمحركات البحث', 'لوحة تحكم سهلة الاستخدام'],
                'en' => ['Custom UI/UX tailored to your brand', 'Built with Next.js & Laravel', 'Responsive on every screen', 'Fast loading & high performance', 'SEO-ready from day one', 'Easy-to-use admin dashboard'],
            ],
        ]);

        Service::updateOrCreate(['slug' => 'mobile-apps'], [
            'icon' => 'smartphone',
            'category' => 'mobile',
            'order' => 1,
            'title' => ['ar' => 'تطوير تطبيقات الموبايل', 'en' => 'Mobile App Development'],
            'excerpt' => [
                'ar' => 'تطبيقات iOS و Android بتجربة سلسة وأداء أصلي تحبها جماهيرك.',
                'en' => 'iOS and Android apps with seamless UX and native-grade performance your users love.',
            ],
            'description' => [
                'ar' => 'نحوّل فكرتك إلى تطبيق حقيقي على App Store و Google Play. نصمم رحلة المستخدم بعناية، ونطوّر بتقنيات Flutter و React Native للوصول إلى المنصتين بكود واحد وجودة عالية، مع ربط كامل بالـ API والدفع الإلكتروني والإشعارات، ونرافقك في النشر والدعم بعد الإطلاق.',
                'en' => 'We turn your idea into a real app on the App Store and Google Play. We carefully design the user journey and build with Flutter and React Native to reach both platforms from one high-quality codebase — fully integrated with your APIs, payments and push notifications — and we stay with you through launch and beyond.',
            ],
            'features' => [
                'ar' => ['تطبيقات iOS و Android', 'Flutter و React Native', 'تصميم تجربة مستخدم سلسة', 'ربط بالـ API والدفع الإلكتروني', 'إشعارات فورية وتحليلات', 'نشر على المتاجر ودعم مستمر'],
                'en' => ['iOS & Android apps', 'Flutter & React Native', 'Seamless UX design', 'API & payment integrations', 'Push notifications & analytics', 'Store publishing & ongoing support'],
            ],
        ]);
    }
}
