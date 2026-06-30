<?php
$activeTab = $_GET['tab'] ?? ($SERVICES_LIST[0]['id'] ?? 'accounting');
$activeService = null;
foreach($SERVICES_LIST as $srv) {
    if($srv['id'] === $activeTab) {
        $activeService = $srv;
        break;
    }
}
if(!$activeService && !empty($SERVICES_LIST)) {
    $activeService = $SERVICES_LIST[0];
    $activeTab = $activeService['id'];
}
?>
<div class="space-y-12 pb-16 animate-fade-in" id="services-view" dir="rtl">
    <!-- Header -->
    <section class="bg-slate-50 py-12 border-b border-slate-100 transition-colors duration-300" id="services-header">
        <div class="max-w-4xl mx-auto px-4 text-center space-y-3">
            <h1 class="text-3xl font-extrabold text-slate-900">خدمات جامع و تخصصی آکادمی مالی اروند</h1>
            <p class="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                از ثبت دفاتر مالی تا دادرسی‌های فوق‌تخصصی مالیاتی؛ ما بازوی مطمئن، امین و متخصص شرکت شما هستیم.
            </p>
        </div>
    </section>

    <!-- Main Services Navigation tabs + content -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="services-main">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8" id="services-grid-layout">
            <!-- Vertical Menu Tabs -->
            <div class="lg:col-span-1 space-y-1" id="services-tabs-menu">
                <span class="block text-xs font-bold text-slate-400 mb-3 uppercase pr-2">سرفصل خدمات مالی</span>
                <?php foreach($SERVICES_LIST as $srv): ?>
                    <?php $isActive = ($activeTab === $srv['id']); ?>
                    <a
                        href="/php-app/services?tab=<?= $srv['id'] ?>"
                        class="w-full text-right px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer focus:outline-none <?= $isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10' : 'bg-white text-slate-700 border border-slate-200/60 hover:bg-slate-50' ?>"
                        id="service-tab-btn-<?= $srv['id'] ?>"
                    >
                        <span class="p-1.5 rounded-lg shrink-0 <?= $isActive ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600' ?>">
                           <!-- placeholder icon -->
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </span>
                        <span class="truncate flex-1"><?= htmlspecialchars($srv['title']) ?></span>
                    </a>
                <?php endforeach; ?>
            </div>

            <!-- Active Tab Content Panel -->
            <div class="lg:col-span-3" id="services-tab-content-panel">
                <?php if($activeService): ?>
                    <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6" id="service-content-box-<?= $activeService['id'] ?>">
                        <!-- Header -->
                        <div class="border-b border-slate-100 pb-5 space-y-3" id="service-content-header-<?= $activeService['id'] ?>">
                            <div class="flex items-center gap-3">
                                <div class="p-3 bg-blue-50 rounded-xl text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                </div>
                                <h2 class="text-xl sm:text-2xl font-bold text-slate-900"><?= htmlspecialchars($activeService['title']) ?></h2>
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed font-medium"><?= htmlspecialchars($activeService['description']) ?></p>
                        </div>

                        <!-- Checklists -->
                        <div class="space-y-4">
                            <span class="block text-xs font-bold text-slate-400 uppercase">عناوین و شرح جزئیات خدمت:</span>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <?php foreach($activeService['details'] as $idx => $detail): ?>
                                    <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 hover:bg-white hover:border-blue-500/20 transition-all">
                                        <span class="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                                        <span class="leading-relaxed text-right w-full"><?= htmlspecialchars($detail) ?></span>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
</div>
