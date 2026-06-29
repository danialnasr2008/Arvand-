<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>جزئیات درخواست خدمات مالی - آکادمی مالی اروند</title>
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
            <a href="/admin/posts" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors">مدیریت مقالات</a>
            <a href="/admin/comments" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors">دیدگاه‌ها</a>
            <a href="/admin/requests" class="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold">درخواست‌ها</a>
            <a href="/" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors border-t border-slate-800 pt-4">← مشاهده وب‌سایت</a>
        </nav>
        <div class="p-4 border-t border-slate-800">
            <a href="/logout" class="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-bold transition-colors">خروج از حساب</a>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-h-screen">
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <span class="font-bold text-slate-800">جزئیات درخواست مشاوره شماره <?php echo (int)$request['id']; ?></span>
            <a href="/admin/requests" class="text-sm font-bold text-slate-500 hover:text-slate-800">← بازگشت به لیست</a>
        </header>

        <div class="p-6 md:p-8 max-w-2xl w-full mx-auto space-y-6 flex-1">
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
                <div>
                    <h3 class="text-xs text-slate-400 mb-1">نام و نام خانوادگی متقاضی</h3>
                    <p class="text-lg font-bold text-slate-900"><?php echo htmlspecialchars($request['full_name']); ?></p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xs text-slate-400 mb-1">تلفن تماس (همراه)</h3>
                        <p class="text-sm font-bold text-slate-800 font-mono"><?php echo htmlspecialchars($request['phone']); ?></p>
                    </div>
                    <div>
                        <h3 class="text-xs text-slate-400 mb-1">وضعیت کنونی</h3>
                        <span class="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold <?php echo $request['status'] === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'; ?>">
                            <?php echo $request['status'] === 'pending' ? 'در انتظار پیگیری' : 'پیگیری شده'; ?>
                        </span>
                    </div>
                </div>

                <div>
                    <h3 class="text-xs text-slate-400 mb-2">شرح درخواست خدمات مالی</h3>
                    <div class="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 leading-relaxed border border-slate-100">
                        <?php echo nl2br(htmlspecialchars($request['description'])); ?>
                    </div>
                </div>

                <!-- Update Status Form -->
                <div class="border-t border-slate-100 pt-6">
                    <h4 class="text-sm font-bold text-slate-900 mb-4">به‌روزرسانی وضعیت درخواست</h4>
                    <form action="/admin/requests/view/<?php echo (int)$request['id']; ?>" method="POST" class="flex gap-4 items-center">
                        <select name="status" class="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                            <option value="pending" <?php echo $request['status'] === 'pending' ? 'selected' : ''; ?>>در انتظار پیگیری</option>
                            <option value="completed" <?php echo $request['status'] === 'completed' ? 'selected' : ''; ?>>پیگیری شد (موفق)</option>
                        </select>
                        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors">
                            ثبت وضعیت جدید
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
