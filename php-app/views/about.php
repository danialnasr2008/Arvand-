<div class="space-y-16 pb-16 animate-fade-in" id="about-view" dir="rtl">
      <!-- Header -->
      <section class="bg-slate-50 py-12 border-b border-slate-100 transition-colors duration-300" id="about-header">
        <div class="max-w-4xl mx-auto px-4 text-center space-y-3">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900">آکادمی مالی اروند را بیشتر بشناسید</h1>
          <p class="text-blue-600 font-medium text-sm sm:text-base"><?= htmlspecialchars($ACADEMY_INFO['subtitle']) ?></p>
        </div>
      </section>

      <!-- Intro details -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6" id="about-intro">
        <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative" id="about-intro-card">
          <div class="absolute top-6 right-6 text-blue-500/10" id="about-bg-decoration">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-24 w-24"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
          </div>
          <p class="text-slate-700 text-sm sm:text-base leading-relaxed text-justify whitespace-pre-line relative z-10 font-medium">
            <?= htmlspecialchars($ACADEMY_INFO['aboutLong']) ?>
          </p>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section class="max-w-5xl mx-auto px-4" id="about-mission-vision">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8" id="about-mv-grid">
          <!-- Vision -->
          <div class="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-md space-y-4 text-right" id="about-vision-card">
            <div class="p-3 bg-blue-50 rounded-xl w-fit text-blue-600" id="vision-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900">چشم‌انداز ما</h3>
            <p class="text-sm text-slate-500 leading-relaxed">
              <?= htmlspecialchars($ACADEMY_INFO['vision']) ?>
            </p>
          </div>

          <!-- Mission -->
          <div class="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-md space-y-4 text-right" id="about-mission-card">
            <div class="p-3 bg-indigo-50 rounded-xl w-fit text-indigo-600" id="mission-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900">ماموریت ما</h3>
            <div class="space-y-3" id="mission-items">
              <?php foreach($ACADEMY_INFO['mission'] as $i => $item): ?>
                <div class="text-right" id="mission-item-<?= $i ?>">
                  <span class="block font-bold text-slate-800 text-sm"><?= htmlspecialchars($item['title']) ?></span>
                  <span class="text-xs text-slate-500 leading-relaxed"><?= htmlspecialchars($item['desc']) ?></span>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </section>

      <!-- Audiences -->
      <section class="max-w-5xl mx-auto px-4" id="about-audiences">
        <div class="text-center mb-10 space-y-2" id="about-audiences-header">
          <h2 class="text-2xl font-bold text-slate-900">مخاطبین خدمات و آموزش‌های ما</h2>
          <p class="text-xs sm:text-sm text-slate-500">طیف گسترده‌ای از جامعه هدف که دلسوزانه پاسخگوی نیاز آن‌ها هستیم</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="about-audiences-grid">
          <?php foreach($ACADEMY_INFO['audiences'] as $i => $aud): ?>
            <div class="bg-slate-50 border border-slate-100 p-5 rounded-xl space-y-2 text-right hover:bg-white hover:shadow-md transition-all" id="audience-card-<?= $i ?>">
              <div class="h-2 w-10 bg-blue-500 rounded"></div>
              <h4 class="font-bold text-slate-900 text-sm pt-2"><?= htmlspecialchars($aud['title']) ?></h4>
              <p class="text-xs text-slate-500 leading-relaxed"><?= htmlspecialchars($aud['desc']) ?></p>
            </div>
          <?php endforeach; ?>
        </div>
      </section>

      <!-- Values -->
      <section class="bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 border border-slate-200 py-16 text-white transition-all rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 shadow-2xl" id="about-values">
        <div class="max-w-4xl mx-auto text-center space-y-3 mb-12" id="about-values-header">
          <span class="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold tracking-widest uppercase">Our Values</span>
          <h2 class="text-3xl font-extrabold tracking-tight">ارزش‌های بنیادین آکادمی اروند</h2>
          <p class="text-sm text-blue-100/90 max-w-xl mx-auto leading-relaxed">تعهد همیشگی ما به رعایت اصول اخلاق حرفه‌ای، رازداری کامل و استخراج محاسبات دقیق</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="about-values-grid">
          <?php foreach($ACADEMY_INFO['values'] as $i => $v): ?>
            <div class="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3 hover:bg-white/10 transition-all text-right" id="value-card-<?= $i ?>">
              <div class="p-2.5 bg-white/10 rounded-2xl w-fit text-white" id="value-icon-box-<?= $i ?>">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <h4 class="font-bold text-white text-base"><?= htmlspecialchars($v['title']) ?></h4>
              <p class="text-xs text-blue-100/80 leading-relaxed text-justify"><?= htmlspecialchars($v['desc']) ?></p>
            </div>
          <?php endforeach; ?>
        </div>
      </section>
    </div>
