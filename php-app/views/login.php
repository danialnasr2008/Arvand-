<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ورود به پنل مدیریت آکادمی مالی اروند</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Vazirmatn', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 min-h-screen flex flex-col justify-center items-center p-4">
    <div class="max-w-md w-full bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
            <div class="inline-block p-3 bg-blue-600 text-white rounded-xl mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <h1 class="text-xl font-bold text-slate-900">ورود به پنل مدیریت</h1>
            <p class="text-xs text-slate-400 mt-1">جهت مدیریت مطالب، درخواست‌ها و دیدگاه‌ها وارد شوید.</p>
        </div>

        <?php if (isset($_SESSION['install_success'])): ?>
            <div class="bg-green-50 border-r-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 text-xs">
                <?php 
                    echo htmlspecialchars($_SESSION['install_success']); 
                    unset($_SESSION['install_success']);
                ?>
            </div>
        <?php endif; ?>

        <?php if (isset($error) && !empty($error)): ?>
            <div class="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-xs">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <form action="/login" method="POST" class="space-y-5">
            <div>
                <label class="block text-xs font-medium text-slate-600 mb-1">نام کاربری مدیر</label>
                <input type="text" name="username" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
            </div>
            <div>
                <label class="block text-xs font-medium text-slate-600 mb-1">گذرواژه (رمز عبور)</label>
                <input type="password" name="password" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
            </div>

            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-blue-500/20">
                ورود به پنل ادمین
            </button>
        </form>

        <div class="text-center mt-6">
            <a href="/" class="text-xs text-slate-400 hover:text-blue-600 transition-colors">← بازگشت به صفحه اصلی آکادمی</a>
        </div>
    </div>
</body>
</html>
