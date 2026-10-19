<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Mohamed Adel', 'company' => 'Souq Masr', 'rating' => 5,
                'role' => ['ar' => 'المدير التنفيذي', 'en' => 'CEO'],
                'content' => ['ar' => 'فريق كودر نيشن فهم احتياجاتنا من أول اجتماع، والمنصة اتسلمت في الميعاد وبجودة فاقت توقعاتنا. المبيعات زادت بشكل واضح من أول شهر.', 'en' => 'Coder Nation understood our needs from the very first meeting. The platform shipped on time with quality beyond our expectations — sales grew noticeably from month one.'],
            ],
            [
                'name' => 'Sara Mahmoud', 'company' => 'FitLife', 'rating' => 5,
                'role' => ['ar' => 'مؤسسة', 'en' => 'Founder'],
                'content' => ['ar' => 'التطبيق سلس جداً والمستخدمين بيحبوه. التواصل كان ممتاز طول المشروع وكل تفصيلة كانت مدروسة.', 'en' => 'The app is incredibly smooth and our users love it. Communication was excellent throughout and every detail was thought through.'],
            ],
            [
                'name' => 'Omar Khaled', 'company' => 'Nile Estates', 'rating' => 5,
                'role' => ['ar' => 'مدير التسويق', 'en' => 'Marketing Director'],
                'content' => ['ar' => 'الموقع الجديد نقل صورة شركتنا لمستوى تاني. التصميم فخم والأداء سريع، والعملاء المحتملين زادوا الضعف.', 'en' => 'The new website took our brand to another level. The design feels premium, it is fast, and our leads doubled.'],
            ],
            [
                'name' => 'Nour Hassan', 'company' => 'Wasla', 'rating' => 5,
                'role' => ['ar' => 'مدير المنتج', 'en' => 'Product Manager'],
                'content' => ['ar' => 'شركاء حقيقيين مش مجرد منفذين. ساعدونا نطوّر الفكرة نفسها وطلّعنا منتج قوي في وقت قياسي.', 'en' => 'True partners, not just vendors. They helped us sharpen the idea itself and we launched a solid product in record time.'],
            ],
        ];

        foreach ($testimonials as $order => $testimonial) {
            Testimonial::updateOrCreate(['name' => $testimonial['name']], [...$testimonial, 'order' => $order]);
        }
    }
}
