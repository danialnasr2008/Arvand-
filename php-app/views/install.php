<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>راه‌اندازی سیستم آکادمی مالی اروند</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Vazirmatn', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 min-h-screen flex flex-col justify-center items-center p-4">
    <div class="max-w-xl w-full bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
        <div class="text-center mb-6">
            <div class="inline-block p-3 bg-blue-600 text-white rounded-xl mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            </div>
            <h1 class="text-2xl font-black text-slate-900">نصب خودکار وب‌سایت آکادمی مالی اروند</h1>
            <p class="text-sm text-slate-500 mt-2">خوش آمدید! این فرآیند دیتابیس را ساخته و جدول‌های سیستم را مستقر خواهد کرد.</p>
        </div>

        <?php if (isset($error) && !empty($error)): ?>
            <div class="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <form action="/install/run" method="POST" class="space-y-6">
            <!-- Database Settings Section -->
            <div>
                <h3 class="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">۱. مشخصات اتصال پایگاه داده (MySQL)</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">سرور پایگاه داده (Host)</label>
                        <input type="text" name="db_host" value="localhost" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">نام پایگاه داده (Database Name)</label>
                        <input type="text" name="db_name" value="arvand_db" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">نام کاربری دیتابیس (User)</label>
                        <input type="text" name="db_user" value="root" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">رمز عبور دیتابیس (Password)</label>
                        <input type="password" name="db_pass" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                    </div>
                </div>
            </div>

            <!-- Admin Settings Section -->
            <div>
                <h3 class="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">۲. مشخصات حساب کاربری مدیر پنل (Admin)</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">نام کاربری ادمین</label>
                        <input type="text" name="admin_user" value="admin" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">رمز عبور ادمین</label>
                        <input type="password" name="admin_pass" placeholder="حداقل ۶ کاراکتر" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">نام و نام خانوادگی مدیر</label>
                        <input type="text" name="admin_name" value="مدیر سیستم" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">ایمیل مدیر</label>
                        <input type="email" name="admin_email" value="admin@arvand-fi.ir" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
                    </div>
                </div>
            </div>

            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-blue-500/20">
                راه‌اندازی سیستم و استقرار جداول دیتابیس
            </button>
        </form>
    </div>
</body>
</html>
