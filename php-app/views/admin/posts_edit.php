<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ویرایش مقاله - آکادمی مالی اروند</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>body { font-family: 'Vazirmatn', sans-serif; }</style>
</head>
<body class="bg-slate-100 min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900 text-slate-400 flex flex-col hidden md:flex border-l border-slate-800">
        <div class="h-16 flex items-center px-6 border-b border-slate-800 text-white font-bold gap-2">
            <span class="text-xl font-black">پنل مدیریت</span>
        </div>
        <nav class="flex-1 p-4 space-y-1">
            <a href="/admin" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors">داشبورد اصلی</a>
            <a href="/admin/posts" class="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold">مدیریت مقالات</a>
            <a href="/admin/comments" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors">دیدگاه‌ها</a>
            <a href="/admin/requests" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors">درخواست‌ها</a>
            <a href="/" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors border-t border-slate-800 pt-4">← مشاهده وب‌سایت</a>
        </nav>
        <div class="p-4 border-t border-slate-800">
            <a href="/logout" class="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-bold transition-colors">خروج از حساب</a>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-h-screen">
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <span class="font-bold text-slate-800">ویرایش مقاله: <?php echo htmlspecialchars($post['title']); ?></span>
            <a href="/admin/posts" class="text-sm font-bold text-slate-500 hover:text-slate-800">← بازگشت به لیست مقالات</a>
        </header>

        <div class="p-6 md:p-8 max-w-4xl w-full mx-auto space-y-6 flex-1">
            <?php if (isset($error) && !empty($error)): ?>
                <div class="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-lg text-sm">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                <form action="/admin/posts/edit/<?php echo (int)$post['id']; ?>" method="POST" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-2">عنوان مقاله <span class="text-red-500">*</span></label>
                            <input type="text" name="title" value="<?php echo htmlspecialchars($post['title']); ?>" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-2">اسلاگ آدرس (Slug)</label>
                            <input type="text" name="slug" value="<?php echo htmlspecialchars($post['slug']); ?>" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-left font-mono focus:outline-none focus:border-blue-500" required>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-2">لینک تصویر شاخص (URL)</label>
                            <input type="text" name="image_url" value="<?php echo htmlspecialchars($post['image_url']); ?>" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-left font-mono focus:outline-none focus:border-blue-500">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-2">دسته‌بندی</label>
                            <select name="category_id" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                                <?php if(!empty($categories)): ?>
                                    <?php foreach($categories as $cat): ?>
                                        <option value="<?php echo (int)$cat['id']; ?>" <?php echo ((int)$post['category_id'] === (int)$cat['id']) ? 'selected' : ''; ?>>
                                            <?php echo htmlspecialchars($cat['name']); ?>
                                        </option>
                                    <?php endforeach; ?>
                                <?php else: ?>
                                    <option value="1">عمومی</option>
                                <?php endif; ?>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">خلاصه کوتاه مقاله <span class="text-red-500">*</span></label>
                        <input type="text" name="summary" value="<?php echo htmlspecialchars($post['summary']); ?>" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">محتوای کامل مقاله <span class="text-red-500">*</span></label>
                        <textarea name="content" rows="12" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required><?php echo htmlspecialchars($post['content']); ?></textarea>
                    </div>

                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-blue-500/20">
                        به‌روزرسانی و ذخیره تغییرات مقاله
                    </button>
                </form>
            </div>
        </div>
    </main>
</body>
</html>
