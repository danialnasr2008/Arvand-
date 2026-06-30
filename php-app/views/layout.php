<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>آکادمی مالی اروند (PHP Version)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.0.0/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
    <style>
        body { font-family: 'Vazirmatn', sans-serif; background-color: #f8fafc; }
    </style>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: { sans: ['Vazirmatn', 'sans-serif'] }
                }
            }
        }
    </script>
</head>
<body class="text-slate-800 antialiased min-h-screen flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center gap-6">
                    <a href="/php-app/" class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">A</div>
                        <span class="font-bold text-xl text-slate-800">آکادمی اروند</span>
                    </a>
                    <div class="hidden md:flex items-center gap-4">
                        <a href="/php-app/" class="text-sm font-medium text-slate-600 hover:text-blue-600">خانه</a>
                        <a href="/php-app/services" class="text-sm font-medium text-slate-600 hover:text-blue-600">خدمات</a>
                        <a href="/php-app/about" class="text-sm font-medium text-slate-600 hover:text-blue-600">درباره ما</a>
                        <a href="/php-app/blog" class="text-sm font-medium text-slate-600 hover:text-blue-600">مقالات</a>
                        <a href="/php-app/news" class="text-sm font-medium text-slate-600 hover:text-blue-600">اخبار</a>
                        <a href="/php-app/request" class="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">درخواست خدمت</a>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <?php if(isLoggedIn()): ?>
                        <a href="/php-app/admin" class="text-sm font-bold bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-200 transition">پنل مدیریت</a>
                        <form action="/php-app/admin/logout" method="POST" class="inline">
                            <button type="submit" class="text-sm font-bold bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition">خروج</button>
                        </form>
                    <?php else: ?>
                        <a href="/php-app/login" class="text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm">ورود</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow">
        <?= $content ?>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300 py-8 border-t border-slate-800 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-sm">© <?php echo date('Y'); ?> آکادمی مالی اروند. تمامی حقوق محفوظ است.</p>
        </div>
    </footer>
</body>
</html>
