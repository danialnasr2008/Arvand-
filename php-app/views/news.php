<?php
$catFilter = $_GET['cat'] ?? null;
$search = $_GET['search'] ?? '';
$newsCategories = array_filter($categories, function($c) { return $c['type'] === 'news'; });
?>
<div class="space-y-8 pb-16 animate-fade-in" id="news-view" dir="rtl">
    <section class="bg-slate-50 py-12 border-b border-slate-100 transition-colors duration-300">
        <div class="max-w-4xl mx-auto px-4 text-center space-y-3">
            <h1 class="text-3xl font-extrabold text-slate-900">اخبار و رویدادهای مالیاتی</h1>
            <p class="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">جدیدترین بخشنامه‌ها، فراخوان‌های رسمی سازمان امور مالیاتی و اخبار مالی را از این بخش دنبال کنید.</p>
        </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div class="lg:col-span-1 space-y-6">
                <div class="bg-white p-4 border border-slate-200 rounded-2xl shadow-sm space-y-2">
                    <label class="block text-xs font-bold text-slate-500 uppercase pr-1">جستجو در اخبار</label>
                    <form action="<?= BASE_URL ?>news" method="GET" class="relative">
                        <input type="text" name="search" value="<?= htmlspecialchars($search) ?>" placeholder="جستجو در اخبار..." class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right">
                        <?php if($catFilter): ?><input type="hidden" name="cat" value="<?= htmlspecialchars($catFilter) ?>"><?php endif; ?>
                    </form>
                </div>

                <div class="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm space-y-4 text-right">
                    <h4 class="font-bold text-slate-900 text-sm border-r-3 border-blue-500 pr-2">دسته‌بندی موضوعی اخبار</h4>
                    <div class="flex flex-col gap-1.5 text-sm">
                        <a href="<?= BASE_URL ?>news" class="w-full text-right px-3 py-2 rounded-lg flex items-center justify-between transition-colors <?= !$catFilter ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50' ?>">
                            <span>همه موضوعات</span>
                        </a>
                        <?php foreach($newsCategories as $cat): ?>
                            <a href="<?= BASE_URL ?>news?cat=<?= $cat['id'] ?><?= $search ? '&search='.urlencode($search) : '' ?>" class="w-full text-right px-3 py-2 rounded-lg flex items-center justify-between transition-colors <?= $catFilter == $cat['id'] ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50' ?>">
                                <span><?= htmlspecialchars($cat['name']) ?></span>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-3">
                <?php if(empty($posts)): ?>
                    <div class="text-center py-16 bg-white border border-slate-200 rounded-2xl">
                        <span class="block text-slate-400 text-sm">هیچ خبر جدیدی در این دسته‌بندی یافت نشد.</span>
                    </div>
                <?php else: ?>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <?php foreach($posts as $post): ?>
                            <?php 
                            $catName = 'اخبار آکادمی'; 
                            foreach($categories as $c) if($c['id'] == $post['category_id']) $catName = $c['name']; 
                            ?>
                            <a href="<?= BASE_URL ?>post?slug=<?= urlencode($post['slug']) ?>" class="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
                                <div class="relative h-44 overflow-hidden bg-slate-100 shrink-0">
                                    <img src="<?= htmlspecialchars($post['image_url'] ?: '') ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                                    <span class="absolute top-3 right-3 text-xs font-semibold bg-blue-600 text-white px-2.5 py-1 rounded shadow"><?= htmlspecialchars($catName) ?></span>
                                </div>
                                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                                    <div class="space-y-2 text-right">
                                        <h3 class="font-bold text-slate-950 group-hover:text-blue-600 transition-colors leading-snug text-base line-clamp-2"><?= htmlspecialchars($post['title']) ?></h3>
                                        <p class="text-xs text-slate-500 leading-relaxed line-clamp-2"><?= htmlspecialchars($post['summary']) ?></p>
                                    </div>
                                    <div class="pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-500">
                                        <span>مشاهده جزئیات خبر</span>
                                    </div>
                                </div>
                            </a>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
</div>
