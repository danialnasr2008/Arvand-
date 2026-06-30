<?php
$catName = 'عمومی';
foreach($categories as $c) if($c['id'] == $post['category_id']) $catName = $c['name'];

function parseMarkdown($text) {
    $text = htmlspecialchars($text);
    $text = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $text);
    $text = preg_replace('/`(.*?)`/', '<code class="font-mono text-xs bg-slate-100 text-blue-600 px-1.5 py-0.5 rounded">$1</code>', $text);
    $text = preg_replace('/### (.*?)\n/', '<h4 class="text-lg font-bold text-slate-800 mt-6 mb-3 border-r-4 border-blue-500 pr-2">$1</h4>', $text);
    $text = preg_replace('/## (.*?)\n/', '<h3 class="text-xl font-extrabold text-slate-900 mt-8 mb-4 border-r-4 border-blue-600 pr-2">$1</h3>', $text);
    $text = nl2br($text);
    return $text;
}
?>
<div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in" id="post-detail-view" dir="rtl">
    <a href="<?= BASE_URL ?>blog" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 focus:outline-none cursor-pointer">
        <span>بازگشت به لیست مقالات</span>
    </a>

    <article class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl" id="post-detail-card">
        <div class="relative h-64 sm:h-96 w-full bg-slate-100" id="post-detail-img-container">
            <img src="<?= htmlspecialchars($post['image_url'] ?: '') ?>" class="w-full h-full object-cover">
            <span class="absolute bottom-4 right-4 text-xs font-bold bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow"><?= htmlspecialchars($catName) ?></span>
        </div>

        <div class="p-6 sm:p-10 space-y-6 text-right" id="post-detail-body">
            <div class="flex flex-wrap gap-4 items-center text-xs text-slate-400 font-mono border-b border-slate-100 pb-4">
                <span>انتشار: <?= htmlspecialchars($post['created_at']) ?></span>
                <span><?= (int)$post['views'] ?> بازدید</span>
            </div>

            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                <?= htmlspecialchars($post['title']) ?>
            </h1>

            <div class="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 text-justify font-sans">
                <?= parseMarkdown($post['content']) ?>
            </div>
        </div>
    </article>

    <section class="space-y-6" id="post-comments-section">
        <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2 border-r-4 border-blue-500 pr-2.5">
            <span>دیدگاه‌های کاربران (<?= count($comments) ?>)</span>
        </h3>

        <div class="space-y-4" id="post-comments-list">
            <?php foreach($comments as $c): ?>
                <div class="bg-white border border-slate-200 rounded-2xl p-5 text-right space-y-2.5 shadow-sm">
                    <div class="flex items-center justify-between text-xs">
                        <div class="flex items-center gap-2 font-bold text-slate-800">
                            <div class="h-7 w-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs">👤</div>
                            <span><?= htmlspecialchars($c['author_name']) ?></span>
                        </div>
                        <span class="text-slate-400 font-mono"><?= htmlspecialchars($c['created_at']) ?></span>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed pr-9">
                        <?= htmlspecialchars($c['content']) ?>
                    </p>
                </div>
            <?php endforeach; ?>

            <?php if(empty($comments)): ?>
                <div class="p-8 text-center text-sm text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                    هیچ دیدگاهی برای این مقاله ثبت نشده است. اولین نفری باشید که نظر می‌دهد!
                </div>
            <?php endif; ?>
        </div>

        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 text-right">
            <h4 class="font-bold text-slate-900 text-base">ثبت دیدگاه جدید</h4>
            <p class="text-xs text-slate-400">دیدگاه شما پس از بررسی و تایید توسط مدیریت در سایت نمایش داده خواهد شد. نیازی به ثبت‌نام یا لاگین نیست!</p>

            <?php if(isset($_SESSION['comment_success'])): ?>
                <div class="p-3.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                    <span><?= htmlspecialchars($_SESSION['comment_success']) ?></span>
                </div>
                <?php unset($_SESSION['comment_success']); ?>
            <?php endif; ?>

            <form action="<?= BASE_URL ?>post?slug=<?= urlencode($slug) ?>" method="POST" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1">نام یا نام مستعار *</label>
                    <input type="text" name="author_name" required placeholder="مثال: حمیدرضا علوی" class="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1">متن دیدگاه شما *</label>
                    <textarea name="content" required rows="4" placeholder="دیدگاه خود را اینجا بنویسید..." class="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right leading-relaxed"></textarea>
                </div>
                <button type="submit" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow transition-all flex items-center justify-center gap-2">
                    <span>ارسال دیدگاه</span>
                </button>
            </form>
        </div>
    </section>
</div>
