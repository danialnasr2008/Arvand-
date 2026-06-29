<?php require_once __DIR__ . '/layout/header.php'; ?>

<section class="py-16 px-4 max-w-7xl mx-auto">
    <div class="mb-10 text-center">
        <h1 class="text-3xl font-black text-slate-900">مقالات تخصصی و اخبار مالیاتی</h1>
        <p class="text-slate-500 mt-2">مرجع تخصصی مقالات و قوانین نوین مالی، مالیاتی و حسابداری</p>
    </div>

    <!-- Category Filter -->
    <?php if (!empty($categories)): ?>
        <div class="flex gap-2 overflow-x-auto pb-4 mb-8 justify-center">
            <a href="/blog" class="px-4 py-1.5 rounded-full text-xs font-semibold <?php echo !isset($_GET['category']) ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'; ?>">همه</a>
            <?php foreach ($categories as $cat): ?>
                <a href="/blog?category=<?php echo (int)$cat['id']; ?>" class="px-4 py-1.5 rounded-full text-xs font-semibold <?php echo (isset($_GET['category']) && (int)$_GET['category'] === (int)$cat['id']) ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'; ?>">
                    <?php echo htmlspecialchars($cat['name']); ?>
                </a>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <!-- Articles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <?php if (!empty($posts)): ?>
            <?php foreach ($posts as $post): ?>
                <article class="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <img src="<?php echo htmlspecialchars($post['image_url']); ?>" alt="<?php echo htmlspecialchars($post['title']); ?>" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                            <a href="/post/<?php echo htmlspecialchars($post['slug']); ?>" class="hover:text-blue-600 transition-colors">
                                <?php echo htmlspecialchars($post['title']); ?>
                            </a>
                        </h3>
                        <p class="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">
                            <?php echo htmlspecialchars($post['summary']); ?>
                        </p>
                        <div class="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400">
                            <span>بازدید: <?php echo (int)$post['views']; ?></span>
                            <span>تاریخ انتشار</span>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        <?php else: ?>
            <div class="col-span-3 text-center py-20 text-slate-400 text-sm">
                هیچ مقاله‌ای در این دسته‌بندی یافت نشد.
            </div>
        <?php endif; ?>
    </div>
</section>

<?php require_once __DIR__ . '/layout/footer.php'; ?>
