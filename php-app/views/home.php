<div class="space-y-20 pb-16 animate-fade-in" id="home-view" dir="rtl">
    <!-- 1. Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-20 md:py-28 border-b border-slate-200 transition-colors duration-300" id="hero-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="hero-grid">
                <div class="space-y-6 text-right lg:col-span-7" id="hero-text-content">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 rounded-full border border-blue-100" id="hero-badge">
                        ✨ معتبرترین مرجع دانش و فناوری مالی
                    </span>
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15]" id="hero-main-title">
                        آکادمی مالی اروند؛ <span class="text-blue-600 italic">هوشمندانه</span> تصمیم بگیرید
                    </h1>
                    <p class="text-lg text-slate-600 font-bold leading-relaxed" id="hero-sub-title">
                        <?= htmlspecialchars($ACADEMY_INFO['slogan']) ?>
                    </p>
                    <p class="text-sm text-slate-500 leading-relaxed" id="hero-desc">
                        <?= htmlspecialchars($ACADEMY_INFO['heroDescription']) ?>
                    </p>
                    <div class="flex flex-wrap gap-4 pt-4" id="hero-cta-group">
                        <a href="<?= BASE_URL ?>request" class="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center gap-2" id="hero-cta-primary">
                            <span>دریافت خدمات و مشاوره</span>
                        </a>
                        <a href="<?= BASE_URL ?>services" class="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl transition-all" id="hero-cta-secondary">
                            <span>مشاهده خدمات آکادمی</span>
                        </a>
                        <a href="<?= BASE_URL ?>login" class="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black rounded-xl shadow-lg shadow-emerald-500/15 hover:scale-[1.02] transition-all flex items-center gap-2 border border-emerald-500/10" id="hero-cta-academy-login">
                            <span>ورود به آکادمی اروند</span>
                        </a>
                    </div>
                </div>

                <!-- Visual element / stats cards -->
                <div class="relative flex justify-center lg:justify-end lg:col-span-5" id="hero-visual">
                    <div class="absolute inset-0 bg-blue-400/10 rounded-full blur-3xl w-72 h-72 m-auto"></div>
                    <div class="relative bg-white/80 rounded-3xl border border-slate-200/80 p-6 shadow-2xl max-w-sm w-full space-y-6 z-10 backdrop-blur-sm" id="hero-stats-card">
                        <div class="flex items-center justify-between" id="hero-stats-header">
                            <span class="text-xs font-extrabold text-blue-600 tracking-wider">پنل گزارش عملکرد مالی</span>
                            <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        </div>
                        <div class="space-y-4" id="hero-stats-items">
                            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100" id="hero-stat-1">
                                <span class="block text-xs text-slate-400 mb-1">دقت و تطبیق استانداردها</span>
                                <div class="flex items-center justify-between" id="hero-stat-1-row">
                                    <span class="text-sm font-bold text-slate-800">۱۰۰٪ انطباق مالیاتی</span>
                                    <span class="text-xs text-emerald-500 font-bold">ساده و ایمن</span>
                                </div>
                            </div>
                            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100" id="hero-stat-2">
                                <span class="block text-xs text-slate-400 mb-1">صرفه‌جویی در هزینه‌های جریمه</span>
                                <div class="flex items-center justify-between" id="hero-stat-2-row">
                                    <span class="text-sm font-bold text-slate-800">تا ۸۰٪ کاهش ریسک قانونی</span>
                                    <span class="text-xs text-blue-500 font-bold font-mono">Arvand</span>
                                </div>
                            </div>
                        </div>
                        <div class="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500" id="hero-stats-footer">
                            <span class="leading-relaxed">بیش از ۱۲۰ شرکت تولیدی و خدماتی همراه ما هستند</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 2. Services Overview Cards -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-services">
        <div class="text-center max-w-2xl mx-auto mb-12" id="home-services-header">
            <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">خدمات تخصصی و راهکارهای مالی جامع</h2>
            <p class="text-sm text-slate-500 mt-2">
                در فضای اقتصادی امروز، مدیریت مالی حرفه‌ای یک ضرورت است. ما در اروند بازوی اجرایی شما خواهیم بود.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="home-services-grid">
            <?php foreach(array_slice($SERVICES_LIST, 0, 3) as $srv): ?>
                <a href="<?= BASE_URL ?>services?tab=<?= $srv['id'] ?>" class="bg-white border border-slate-200/80 p-6 rounded-3xl hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group cursor-pointer" id="home-service-card-<?= $srv['id'] ?>">
                    <div class="space-y-4" id="home-service-content-<?= $srv['id'] ?>">
                        <div class="p-3 bg-blue-50 rounded-2xl w-fit text-blue-600 group-hover:scale-110 transition-transform" id="home-service-icon-<?= $srv['id'] ?>">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-blue-600"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors"><?= htmlspecialchars($srv['title']) ?></h3>
                        <p class="text-sm text-slate-500 leading-relaxed text-justify"><?= htmlspecialchars($srv['description']) ?></p>
                    </div>
                    <div class="mt-6 flex items-center gap-1 text-xs font-bold text-blue-600 hover:gap-2 transition-all text-right">
                        <span>اطلاعات بیشتر و جزئیات خدمت</span>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
        
        <div class="text-center mt-8" id="home-services-more-cta-wrapper">
            <a href="<?= BASE_URL ?>services" class="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 text-sm font-bold rounded-full transition-all">
                <span>مشاهده همه سرفصل خدمات مالی اروند</span>
            </a>
        </div>
    </section>

    <!-- 3. Why Us -->
    <section class="bg-slate-50/50 py-16 border-y border-slate-200 transition-colors duration-300" id="home-why-us">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start" id="why-us-grid">
                <div class="space-y-4 lg:col-span-1 text-right" id="why-us-info-panel">
                    <span class="text-xs font-bold text-blue-600 tracking-wider uppercase">Arvand Academy</span>
                    <h2 class="text-3xl font-extrabold text-slate-900 leading-tight">چرا سپردن امور مالی به آکادمی اروند؟</h2>
                    <p class="text-sm text-slate-500 leading-relaxed text-justify">
                        ما صرفاً اسناد مالی شما را ثبت نمی‌کنیم؛ ما به عنوان یک شریک مالی و مشاور استراتژیک دلسوز، از مرحله طراحی ساختار مالی تا اجرا و دادرسی، شانه به شانه در کنار کسب‌وکار شما خواهیم بود.
                    </p>
                    <div class="space-y-3 pt-4" id="why-us-bullets-list">
                        <?php foreach($ACADEMY_INFO['benefits'] as $i => $b): ?>
                            <div class="flex items-start gap-2.5 text-sm text-slate-700" id="why-us-bullet-<?= $i ?>">
                                <span class="text-blue-600 font-bold mt-0.5">✓</span>
                                <span><?= htmlspecialchars($b) ?></span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2" id="why-us-points-grid">
                    <?php foreach($ACADEMY_INFO['whyUsPoints'] as $idx => $pt): ?>
                        <div class="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-500/30 transition-all duration-300 space-y-2.5" id="why-us-point-<?= $idx ?>">
                            <h4 class="font-bold text-slate-900 text-base flex items-center gap-2">
                                <span class="h-2 w-2 rounded-full bg-blue-600"></span>
                                <?= htmlspecialchars($pt['title']) ?>
                            </h4>
                            <p class="text-xs text-slate-500 leading-relaxed pr-3 text-justify"><?= htmlspecialchars($pt['desc']) ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. Latest Blog Posts -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-blog">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10" id="home-blog-header">
            <div class="space-y-1 text-right" id="home-blog-header-text">
                <h2 class="text-2xl font-bold text-slate-900">جدیدترین مقالات و اخبار مالیاتی</h2>
                <p class="text-sm text-slate-500">تحلیل‌های روز، قوانین جدید و آموزش‌های تخصصی بازار مالی ایران</p>
            </div>
            <a href="<?= BASE_URL ?>blog" class="text-sm font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1 shrink-0" id="home-blog-view-all-btn">
                <span>ورود به بخش مقالات</span>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="home-blog-grid">
            <?php foreach($latest_posts as $p): ?>
                <a href="<?= BASE_URL ?>post?slug=<?= urlencode($p['slug']) ?>" class="bg-white border border-slate-200/80 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-500/30 transition-all duration-300 cursor-pointer group" id="home-blog-post-<?= $p['id'] ?>">
                    <div class="relative h-52 overflow-hidden bg-slate-100" id="home-blog-post-img-wrapper-<?= $p['id'] ?>">
                        <img src="<?= htmlspecialchars($p['image_url'] ?: '') ?>" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500">
                    </div>
                    <div class="p-6 space-y-3 text-right" id="home-blog-post-body-<?= $p['id'] ?>">
                        <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono" id="home-blog-post-meta-<?= $p['id'] ?>">
                            <span><?= htmlspecialchars($p['created_at']) ?></span>
                            <span><?= (int)$p['views'] ?> بازدید</span>
                        </div>
                        <h3 class="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug text-base">
                            <?= htmlspecialchars($p['title']) ?>
                        </h3>
                        <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed text-justify">
                            <?= htmlspecialchars($p['summary']) ?>
                        </p>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- 5. FAQs Section -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="home-faqs">
        <div class="text-center mb-10 space-y-1" id="home-faqs-header">
            <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">پاسخ به سوالات متداول مالی شما</h2>
            <p class="text-sm text-slate-500">برخی از رایج‌ترین سوالات مودیان و کارفرمایان ارجمند</p>
        </div>

        <div class="space-y-4" id="home-faqs-accordion">
            <?php foreach($ACADEMY_INFO['faqs'] as $idx => $faq): ?>
                <div class="faq-item bg-white border border-slate-200/80 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:border-blue-500/30">
                    <button type="button" class="faq-toggle w-full text-right px-6 py-4 font-bold text-slate-800 flex items-center justify-between gap-4 hover:bg-slate-50">
                        <span class="text-sm pr-3 border-r-4 border-blue-600 leading-relaxed text-slate-900"><?= htmlspecialchars($faq['q']) ?></span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="faq-icon h-4 w-4 text-slate-400 transition-transform duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div class="faq-body max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                        <div class="px-6 py-5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 text-justify border-t border-slate-100">
                            <?= htmlspecialchars($faq['a']) ?>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- 6. Instant Consultation CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-cta-banner">
        <div class="bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 border border-slate-200 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden shadow-2xl shadow-blue-500/10" id="cta-banner-card">
            <div class="relative z-10 max-w-2xl mx-auto space-y-6" id="cta-banner-content">
                <h3 class="text-2xl sm:text-3xl font-extrabold text-white leading-tight">به راهکار یا مشاوره فوری نیاز دارید؟</h3>
                <p class="text-sm sm:text-base text-blue-100/90 leading-relaxed text-justify sm:text-center">
                    مشخصات کسب‌وکار و نیاز خود را از طریق فرم الکترونیکی برای ما بفرستید. تیم مشاوران ارشد اروند در کوتاه‌ترین زمان، پرونده شما را ارزیابی کرده و تماس خواهند گرفت.
                </p>
                <div class="pt-2" id="cta-banner-buttons">
                    <a href="<?= BASE_URL ?>request" class="inline-block px-8 py-3.5 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl shadow-lg transition-all text-sm hover:scale-[1.02]" id="cta-banner-btn">
                        ارسال مشخصات و دریافت خدمات مالی
                    </a>
                </div>
            </div>
        </div>
    </section>
</div>

<script>
document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const body = item.querySelector('.faq-body');
        const icon = item.querySelector('.faq-icon');
        
        const isOpen = body.style.maxHeight !== '0px' && body.style.maxHeight !== '';
        
        // Close all other faqs
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.querySelector('.faq-body').style.maxHeight = '0px';
                otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                otherItem.querySelector('.faq-icon').classList.remove('text-blue-600');
            }
        });
        
        if (isOpen) {
            body.style.maxHeight = '0px';
            icon.style.transform = 'rotate(0deg)';
            icon.classList.remove('text-blue-600');
        } else {
            body.style.maxHeight = body.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
            icon.classList.add('text-blue-600');
        }
    });
});
</script>
