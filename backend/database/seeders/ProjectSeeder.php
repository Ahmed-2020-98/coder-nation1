<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'slug' => 'souq-platform', 'category' => 'web', 'color' => '#2F5BEA', 'client' => 'Souq Masr', 'year' => 2026, 'is_featured' => true,
                'tech_stack' => ['Next.js', 'Laravel', 'MySQL', 'Stripe'],
                'title' => ['ar' => 'منصة سوق للتجارة الإلكترونية', 'en' => 'Souq E-commerce Platform'],
                'summary' => ['ar' => 'متجر إلكتروني متكامل بأكثر من 5,000 منتج ولوحة تحكم للبائعين.', 'en' => 'A full e-commerce store with 5,000+ products and a vendor dashboard.'],
                'description' => ['ar' => 'صممنا وطوّرنا منصة تجارة إلكترونية متعددة البائعين بتجربة شراء سريعة، بحث ذكي، ودفع إلكتروني آمن، مما رفع معدل التحويل بنسبة 38% خلال أول ثلاثة أشهر.', 'en' => 'We designed and built a multi-vendor marketplace with a fast checkout, smart search and secure payments — lifting conversion by 38% within the first three months.'],
            ],
            [
                'slug' => 'fitlife-app', 'category' => 'mobile', 'color' => '#10B981', 'client' => 'FitLife', 'year' => 2026, 'is_featured' => true,
                'tech_stack' => ['Flutter', 'Firebase', 'Laravel'],
                'title' => ['ar' => 'تطبيق FitLife للياقة', 'en' => 'FitLife Fitness App'],
                'summary' => ['ar' => 'تطبيق تمارين وتغذية مخصص بخطط ذكية ومتابعة يومية.', 'en' => 'A personalised workout and nutrition app with smart plans and daily tracking.'],
                'description' => ['ar' => 'تطبيق على iOS و Android يقدّم خطط تمارين وتغذية مخصصة لكل مستخدم، مع متابعة التقدم والإشعارات التحفيزية والاشتراكات داخل التطبيق.', 'en' => 'An iOS and Android app delivering personalised workout and meal plans, progress tracking, motivational notifications and in-app subscriptions.'],
            ],
            [
                'slug' => 'nile-real-estate', 'category' => 'web', 'color' => '#C08A2E', 'client' => 'Nile Estates', 'year' => 2025, 'is_featured' => true,
                'tech_stack' => ['Next.js', 'Laravel', 'Mapbox'],
                'title' => ['ar' => 'موقع النيل للعقارات', 'en' => 'Nile Real Estate'],
                'summary' => ['ar' => 'بوابة عقارية بخرائط تفاعلية وفلاتر بحث متقدمة.', 'en' => 'A property portal with interactive maps and advanced search filters.'],
                'description' => ['ar' => 'بوابة عقارية فاخرة تعرض المشروعات والوحدات بخرائط تفاعلية وجولات افتراضية، مع نظام إدارة عملاء محتملين متصل بفريق المبيعات.', 'en' => 'A premium real-estate portal showcasing developments and units with interactive maps and virtual tours, connected to a lead-management system for the sales team.'],
            ],
            [
                'slug' => 'wasla-delivery', 'category' => 'mobile', 'color' => '#F97316', 'client' => 'Wasla', 'year' => 2025, 'is_featured' => true,
                'tech_stack' => ['React Native', 'Node.js', 'Google Maps'],
                'title' => ['ar' => 'تطبيق وصلة للتوصيل', 'en' => 'Wasla Delivery App'],
                'summary' => ['ar' => 'منظومة توصيل كاملة: تطبيق عميل، تطبيق مندوب ولوحة إدارة.', 'en' => 'A complete delivery suite: customer app, courier app and admin panel.'],
                'description' => ['ar' => 'بنينا منظومة توصيل متكاملة بتتبع لحظي للطلبات على الخريطة، توزيع ذكي للمناديب، ودفع إلكتروني ومحفظة داخل التطبيق.', 'en' => 'We built an end-to-end delivery ecosystem with real-time order tracking, smart courier dispatching, and in-app payments and wallet.'],
            ],
            [
                'slug' => 'medica-clinics', 'category' => 'web', 'color' => '#0EA5E9', 'client' => 'Medica', 'year' => 2025, 'is_featured' => false,
                'tech_stack' => ['Next.js', 'Laravel', 'PostgreSQL'],
                'title' => ['ar' => 'نظام حجز عيادات ميديكا', 'en' => 'Medica Clinic Booking'],
                'summary' => ['ar' => 'موقع ونظام حجز مواعيد أونلاين لسلسلة عيادات.', 'en' => 'A website and online appointment system for a clinic chain.'],
                'description' => ['ar' => 'موقع طبي بنظام حجز مواعيد ذكي، ملفات للأطباء، تذكيرات عبر الرسائل، ولوحة تحكم لإدارة الفروع والجداول.', 'en' => 'A medical website with smart appointment booking, doctor profiles, SMS reminders and a dashboard to manage branches and schedules.'],
            ],
            [
                'slug' => 'qahwa-loyalty', 'category' => 'mobile', 'color' => '#8B5CF6', 'client' => 'Qahwa', 'year' => 2024, 'is_featured' => false,
                'tech_stack' => ['Flutter', 'Laravel', 'Stripe'],
                'title' => ['ar' => 'تطبيق ولاء قهوة', 'en' => 'Qahwa Loyalty App'],
                'summary' => ['ar' => 'تطبيق طلب مسبق ونقاط ولاء لسلسلة مقاهي.', 'en' => 'An order-ahead and loyalty-points app for a coffee chain.'],
                'description' => ['ar' => 'تطبيق يتيح للعملاء الطلب المسبق والاستلام بدون انتظار، مع برنامج نقاط ومكافآت زاد من تكرار الزيارات بنسبة 45%.', 'en' => 'An app that lets customers order ahead and skip the line, with a points-and-rewards programme that increased repeat visits by 45%.'],
            ],
        ];

        foreach ($projects as $order => $project) {
            Project::updateOrCreate(['slug' => $project['slug']], [...$project, 'order' => $order]);
        }
    }
}
