<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نصب آکادمی مالی اروند (PHP)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.0.0/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
    <style>
        body { font-family: 'Vazirmatn', sans-serif; background-color: #f8fafc; }
    </style>
</head>
<body class="text-slate-800 antialiased min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-50">
    <div class="text-center mb-8 flex flex-col items-center">
        <div class="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
        </div>
        <h1 class="text-2xl font-extrabold text-slate-900">سیستم راه‌اندازی خودکار آکادمی مالی اروند</h1>
        <p class="text-sm text-slate-500 mt-1">سورس کد پیشرفته PHP MVC • دیتابیس خودکار MySQL</p>
    </div>

    <div class="max-w-md w-full bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8">
        <form action="/php-app/setup" method="POST">
            <h3 class="text-lg font-bold text-slate-800 mb-4">تنظیمات حساب کاربری مدیر ارشد</h3>
            <p class="text-xs text-slate-500 mb-6 leading-relaxed">
                این اطلاعات برای ورود امن شما به پنل مدیریت وب‌سایت آکادمی استفاده خواهد شد. لطفا رمز عبور قوی انتخاب کنید. (جداول MySQL با موفقیت ساخته شده است).
            </p>

            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1.5">نام و نام خانوادگی مدیر *</label>
                    <input type="text" name="admin_name" required class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-right" placeholder="مثال: دانیال نصر">
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1.5">نام کاربری ورود ادمین (Username) *</label>
                    <input type="text" name="admin_user" required class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-left font-mono" placeholder="admin" dir="ltr">
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1.5">ایمیل مدیر *</label>
                    <input type="email" name="admin_email" required class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-left font-mono" placeholder="admin@arvand-fi.ir" dir="ltr">
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1.5">گذرواژه ورود پنل (Password) *</label>
                    <input type="password" name="admin_pass" required class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-left font-mono" placeholder="••••••••" dir="ltr">
                </div>
            </div>

            <div class="mt-6">
                <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
                    <span>راه‌اندازی سیستم</span>
                </button>
            </div>
        </form>
    </div>

    <div class="mt-6 text-xs text-slate-400 text-center max-w-sm">
        نکته: با تکمیل این فرآیند، دیتابیس MySQL به صورت کامل برای مدیریت محتوا پیکربندی می‌شود.
    </div>
</body>
</html>
