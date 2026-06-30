<div class="space-y-12 pb-16 animate-fade-in" id="request-service-view" dir="rtl">
    <!-- Header -->
    <section class="bg-slate-50 py-12 border-b border-slate-100 transition-colors duration-300" id="request-service-header">
        <div class="max-w-4xl mx-auto px-4 text-center space-y-3">
            <h1 class="text-3xl font-extrabold text-slate-900">درخواست دریافت خدمات و مشاوره مالی</h1>
            <p class="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                با پر کردن فرم زیر، پرونده مالی شما به جریان افتاده و کارشناسان آکادمی اروند در اولین فرصت جهت ارائه راهکار با شما تماس خواهند گرفت.
            </p>
        </div>
    </section>

    <!-- Main Form container -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6" id="request-service-main">
        <?php if(isset($_SESSION['success_msg'])): ?>
            <div class="mb-8 p-5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center gap-3 shadow-sm animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 shrink-0"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
                <span class="font-semibold text-sm leading-relaxed"><?= htmlspecialchars($_SESSION['success_msg']) ?></span>
            </div>
            <?php unset($_SESSION['success_msg']); ?>
        <?php endif; ?>

        <form action="/php-app/request" method="POST" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8" id="request-service-form">
            
            <!-- Section 1: Contact Details -->
            <div class="space-y-5" id="request-form-section-1">
                <h3 class="text-lg font-bold text-slate-900 border-r-4 border-blue-500 pr-2.5">۱. اطلاعات متقاضی و تماس</h3>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="section-1-grid">
                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">نام و نام خانوادگی *</label>
                        <input type="text" name="full_name" required placeholder="مثال: دانیال نصر" class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">شماره موبایل *</label>
                        <input type="tel" name="phone" required placeholder="مثال: 09123456789" dir="ltr" class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-left font-mono">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">نام شرکت / مجموعه (اختیاری)</label>
                        <input type="text" name="company_name" placeholder="مثال: شرکت اروند الکترونیک" class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">سمت شما در مجموعه</label>
                        <select name="position" class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right">
                            <option value="">-- لطفاً یک گزینه را انتخاب کنید --</option>
                            <option value="مدیر عامل">مدیر عامل</option>
                            <option value="مدیر مالی">مدیر مالی</option>
                            <option value="حسابدار">حسابدار</option>
                            <option value="مالک کسب‌وکار">مالک کسب‌وکار</option>
                            <option value="سایر">سایر موارد</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">آدرس ایمیل</label>
                        <input type="email" name="email" placeholder="name@example.com" dir="ltr" class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-left font-mono">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">شهر / استان محل فعالیت</label>
                        <input type="text" name="city" placeholder="مثال: تهران" class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right">
                    </div>
                </div>
            </div>

            <!-- Section 2: Business Profile -->
            <div class="space-y-5" id="request-form-section-2">
                <h3 class="text-lg font-bold text-slate-900 border-r-4 border-blue-500 pr-2.5">۲. مشخصات و نیازهای کسب‌وکار</h3>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="section-2-grid">
                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">نوع فعالیت کسب‌وکار</label>
                        <select name="business_type" class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right">
                            <option value="">-- لطفاً یک گزینه را انتخاب کنید --</option>
                            <option value="تولیدی و صنعتی">تولیدی و صنعتی</option>
                            <option value="خدماتی">خدماتی</option>
                            <option value="بازرگانی و صادرات/واردات">بازرگانی و صادرات/واردات</option>
                            <option value="پیمانکاری">پیمانکاری</option>
                            <option value="استارتاپ / نوپا">استارتاپ / نوپا</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">وضعیت فعلی کسب‌وکار</label>
                        <select name="business_status" class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right">
                            <option value="">-- لطفاً یک گزینه را انتخاب کنید --</option>
                            <option value="نوپا و در حال راه‌اندازی">نوپا و در حال راه‌اندازی</option>
                            <option value="فعال و در حال رشد">فعال و در حال رشد</option>
                            <option value="نیاز به اصلاحات ساختاری مالی">نیاز به اصلاحات ساختاری مالی</option>
                            <option value="درگیر پرونده دادرسی و جریمه">درگیر پرونده دادرسی و جریمه</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">موضوع اصلی درخواست خدمت</label>
                        <select name="request_subject" class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right">
                            <option value="">-- لطفاً یک گزینه را انتخاب کنید --</option>
                            <option value="حسابداری و تراز مالی">حسابداری و تراز مالی</option>
                            <option value="مشاوره مالیاتی و سامانه مودیان">مشاوره مالیاتی و سامانه مودیان</option>
                            <option value="دفاعیه و لوایح دادرسی مالیاتی">دفاعیه و لوایح دادرسی مالیاتی</option>
                            <option value="حسابرسی تامین اجتماعی و کارفرما">حسابرسی تامین اجتماعی و کارفرما</option>
                            <option value="محاسبه بهای تمام‌شده صنعتی">محاسبه بهای تمام‌شده صنعتی</option>
                            <option value="تأمین مالی و بیزینس پلن">تأمین مالی و بیزینس پلن</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">گردش مالی تقریبی سالانه</label>
                        <select name="annual_turnover" class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right">
                            <option value="">-- لطفاً یک گزینه را انتخاب کنید --</option>
                            <option value="زیر ۵ میلیارد تومان">زیر ۵ میلیارد تومان</option>
                            <option value="بین ۵ تا ۲۰ میلیارد تومان">بین ۵ تا ۲۰ میلیارد تومان</option>
                            <option value="بین ۲۰ تا ۱۰۰ میلیارد تومان">بین ۲۰ تا ۱۰۰ میلیارد تومان</option>
                            <option value="بالای ۱۰۰ میلیارد تومان">بالای ۱۰۰ میلیارد تومان</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">اولویت درخواست شما</label>
                        <div class="flex gap-2">
                            <label class="flex items-center gap-1 text-sm"><input type="radio" name="priority" value="immediate" checked> فوری</label>
                            <label class="flex items-center gap-1 text-sm"><input type="radio" name="priority" value="week"> این هفته</label>
                            <label class="flex items-center gap-1 text-sm"><input type="radio" name="priority" value="month"> این ماه</label>
                            <label class="flex items-center gap-1 text-sm"><input type="radio" name="priority" value="evaluating"> در حال بررسی</label>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1.5">میزان پیچیدگی پرونده</label>
                        <div class="flex gap-2">
                            <label class="flex items-center gap-1 text-sm"><input type="radio" name="complexity" value="simple" checked> ساده</label>
                            <label class="flex items-center gap-1 text-sm"><input type="radio" name="complexity" value="medium"> متوسط</label>
                            <label class="flex items-center gap-1 text-sm"><input type="radio" name="complexity" value="complex"> پیچیده</label>
                            <label class="flex items-center gap-1 text-sm"><input type="radio" name="complexity" value="unknown"> اطلاع ندارم</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 3: Detailed Description -->
            <div class="space-y-4" id="request-form-section-3">
                <h3 class="text-lg font-bold text-slate-900 border-r-4 border-blue-500 pr-2.5">۳. توضیحات درخواست و ترجیحات تماس</h3>
                
                <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1.5">لطفاً مشکل یا نیاز خود را توضیح دهید *</label>
                    <textarea name="description" required rows="5" placeholder="مثال: دریافت برگ تشخیص مالیاتی..." class="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right leading-relaxed"></textarea>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pt-4">
                    <div>
                        <span class="block text-xs font-bold text-slate-600 mb-2">ترجیح می‌دهید از چه طریقی با شما تماس بگیریم؟</span>
                        <div class="flex gap-4">
                            <label class="flex items-center gap-1 text-sm"><input type="radio" name="contact_method" value="phone" checked> تماس تلفنی</label>
                            <label class="flex items-center gap-1 text-sm"><input type="radio" name="contact_method" value="bale"> پیام‌رسان بله</label>
                            <label class="flex items-center gap-1 text-sm"><input type="radio" name="contact_method" value="email"> ایمیل</label>
                        </div>
                    </div>

                    <button type="submit" class="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        <span>ثبت درخواست نهایی</span>
                    </button>
                </div>
            </div>

        </form>
    </section>
</div>
