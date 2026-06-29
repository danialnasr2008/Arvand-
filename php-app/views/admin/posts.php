<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مدیریت مقالات آکادمی مالی اروند</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>body { font-family: 'Vazirmatn', sans-serif; }</style>
</head>
<body class="bg-slate-100 min-h-screen flex relative">
    <!-- Sidebar Overlay -->
    <div id="sidebar-overlay" onclick="document.getElementById('admin-sidebar').classList.add('translate-x-full'); this.classList.add('hidden');" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 hidden md:hidden"></div>

    <!-- Sidebar -->
    <aside id="admin-sidebar" class="w-64 bg-slate-900 text-slate-400 flex flex-col fixed inset-y-0 right-0 z-50 transform translate-x-full md:translate-x-0 md:static transition-transform duration-300 ease-in-out border-l border-slate-800">
        <div class="h-16 flex items-center px-6 border-b border-slate-800 text-white font-bold gap-2 justify-between">
            <span class="text-xl font-black">پنل مدیریت</span>
            <button onclick="document.getElementById('admin-sidebar').classList.add('translate-x-full'); document.getElementById('sidebar-overlay').classList.add('hidden');" class="p-1 text-slate-400 hover:text-white rounded-lg md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
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
    <main class="flex-1 flex flex-col min-h-screen w-full">
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
            <div class="flex items-center gap-3">
                <button onclick="document.getElementById('admin-sidebar').classList.toggle('translate-x-full'); document.getElementById('sidebar-overlay').classList.toggle('hidden');" class="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <span class="font-bold text-slate-800">مدیریت مقالات و وبلاگ</span>
            </div>
            <a href="/admin/posts/add" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md">افزودن مقاله جدید</a>
        </header>

        <div class="p-6 md:p-8 space-y-6 flex-1">
            <?php if (isset($_SESSION['admin_success'])): ?>
                <div class="bg-green-50 border-r-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 text-sm">
                    <?php 
                        echo htmlspecialchars($_SESSION['admin_success']); 
                        unset($_SESSION['admin_success']);
                    ?>
                </div>
            <?php endif; ?>

            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-black text-slate-900">لیست تمامی مقالات منتشر شده</h1>
                <a href="/admin/posts/add" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md">افزودن مقاله جدید</a>
            </div>

            <!-- Posts List Card -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-right border-collapse text-sm">
                        <thead class="bg-slate-50 text-slate-500 border-b border-slate-100">
                            <tr>
                                <th class="p-4 font-semibold">شناسه</th>
                                <th class="p-4 font-semibold">عنوان مقاله</th>
                                <th class="p-4 font-semibold">آدرس اسلاگ (Slug)</th>
                                <th class="p-4 font-semibold">بازدیدها</th>
                                <th class="p-4 font-semibold">عملیات</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <?php if(!empty($posts)): ?>
                                <?php foreach($posts as $post): ?>
                                    <tr class="hover:bg-slate-50">
                                        <td class="p-4 text-slate-400 font-mono"><?php echo (int)$post['id']; ?></td>
                                        <td class="p-4 font-bold text-slate-900"><?php echo htmlspecialchars($post['title']); ?></td>
                                        <td class="p-4 text-slate-500 font-mono text-xs"><?php echo htmlspecialchars($post['slug']); ?></td>
                                        <td class="p-4 text-slate-600 font-mono"><?php echo (int)$post['views']; ?></td>
                                        <td class="p-4 space-x-2 space-x-reverse">
                                            <a href="/admin/posts/edit/<?php echo (int)$post['id']; ?>" class="text-blue-600 hover:text-blue-700 font-bold text-xs">ویرایش</a>
                                            <a href="/admin/posts/delete/<?php echo (int)$post['id']; ?>" onclick="return confirm('آیا از حذف این مقاله مطمئن هستید؟');" class="text-red-600 hover:text-red-700 font-bold text-xs">حذف</a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="5" class="p-8 text-center text-slate-400">مقاله‌ای جهت نمایش یافت نشد. اولین مقاله را اضافه کنید!</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
