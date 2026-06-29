<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>پنل مدیریت آکادمی مالی اروند</title>
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
            <a href="/admin" class="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold">داشبورد اصلی</a>
            <a href="/admin/posts" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors">مدیریت مقالات</a>
            <a href="/admin/comments" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors">دیدگاه‌ها (<?php echo (int)$pendingCommentsCount; ?>)</a>
            <a href="/admin/requests" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors">درخواست‌ها (<?php echo (int)$pendingRequestsCount; ?>)</a>
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
                <span class="font-bold text-slate-800">خوش آمدید، مدیر گرامی</span>
            </div>
            <a href="/logout" class="text-xs font-bold text-red-600 hover:text-red-700 md:hidden">خروج</a>
        </header>

        <div class="p-6 md:p-8 space-y-6 flex-1">
            <h1 class="text-2xl font-black text-slate-900">پیشخوان مدیریت سیستم</h1>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <span class="text-xs text-slate-400">تعداد مقالات منتشر شده</span>
                    <h3 class="text-3xl font-black text-slate-900 mt-2"><?php echo (int)$postsCount; ?> مقاله</h3>
                    <a href="/admin/posts" class="text-xs text-blue-600 font-bold mt-4 inline-block hover:underline">مدیریت مقالات ←</a>
                </div>
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <span class="text-xs text-slate-400">دیدگاه‌های منتظر تایید</span>
                    <h3 class="text-3xl font-black text-slate-900 mt-2"><?php echo (int)$pendingCommentsCount; ?> دیدگاه</h3>
                    <a href="/admin/comments" class="text-xs text-blue-600 font-bold mt-4 inline-block hover:underline">مشاهده نظرات ←</a>
                </div>
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <span class="text-xs text-slate-400">درخواست‌های خدمات مالی پیگیری‌نشده</span>
                    <h3 class="text-3xl font-black text-slate-900 mt-2"><?php echo (int)$pendingRequestsCount; ?> درخواست</h3>
                    <a href="/admin/requests" class="text-xs text-blue-600 font-bold mt-4 inline-block hover:underline">لیست درخواست‌ها ←</a>
                </div>
            </div>

            <!-- Latest Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Recent Requests -->
                <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">آخرین درخواست‌های خدمات مالی</h2>
                    <div class="space-y-4">
                        <?php if(!empty($latestRequests)): ?>
                            <?php foreach($latestRequests as $req): ?>
                                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm">
                                    <div>
                                        <span class="font-bold text-slate-800"><?php echo htmlspecialchars($req['full_name']); ?></span>
                                        <p class="text-xs text-slate-400 mt-0.5"><?php echo htmlspecialchars($req['phone']); ?></p>
                                    </div>
                                    <span class="px-2.5 py-1 rounded-full text-xs font-semibold <?php echo $req['status'] === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'; ?>">
                                        <?php echo $req['status'] === 'pending' ? 'در انتظار پیگیری' : 'پیگیری شده'; ?>
                                    </span>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <p class="text-xs text-slate-400 text-center py-6">هیچ درخواستی یافت نشد.</p>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Recent Comments -->
                <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">آخرین دیدگاه‌های کاربران</h2>
                    <div class="space-y-4">
                        <?php if(!empty($latestComments)): ?>
                            <?php foreach($latestComments as $com): ?>
                                <div class="p-3 bg-slate-50 rounded-lg text-sm">
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="font-bold text-slate-800"><?php echo htmlspecialchars($com['author_name']); ?></span>
                                        <span class="text-xs <?php echo $com['is_approved'] ? 'text-green-600' : 'text-amber-600 font-bold'; ?>">
                                            <?php echo $com['is_approved'] ? 'تایید شده' : 'منتظر تایید'; ?>
                                        </span>
                                    </div>
                                    <p class="text-xs text-slate-500 line-clamp-1"><?php echo htmlspecialchars($com['content']); ?></p>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <p class="text-xs text-slate-400 text-center py-6">هیچ دیدگاهی یافت نشد.</p>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
