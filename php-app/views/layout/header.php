<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>آکادمی مالی اروند</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Vazirmatn', 'tahoma', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <!-- Google Fonts Vazirmatn -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Vazirmatn', 'tahoma', sans-serif;
        }
        .prose-custom h1 {
            font-size: 1.875rem; /* 30px */
            font-weight: 900;
            color: #0f172a; /* slate-900 */
            margin-top: 1.75rem;
            margin-bottom: 0.875rem;
            line-height: 1.3;
        }
        .prose-custom h2 {
            font-size: 1.5rem; /* 24px */
            font-weight: 800;
            color: #1e293b; /* slate-800 */
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            line-height: 1.35;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 0.375rem;
        }
        .prose-custom h3 {
            font-size: 1.25rem; /* 20px */
            font-weight: 700;
            color: #334155; /* slate-700 */
            margin-top: 1.25rem;
            margin-bottom: 0.5rem;
            line-height: 1.4;
        }
        .prose-custom p {
            font-size: 0.95rem;
            line-height: 1.8;
            color: #475569; /* slate-600 */
            margin-bottom: 1.25rem;
        }
        .prose-custom ul {
            list-style-type: disc;
            margin-right: 1.5rem;
            margin-bottom: 1.25rem;
            color: #475569;
        }
        .prose-custom ol {
            list-style-type: decimal;
            margin-right: 1.5rem;
            margin-bottom: 1.25rem;
            color: #475569;
        }
        .prose-custom li {
            margin-bottom: 0.5rem;
            line-height: 1.7;
        }
        .prose-custom blockquote {
            border-right: 4px solid #3b82f6; /* blue-500 */
            padding-right: 1.25rem;
            margin-right: 0;
            margin-bottom: 1.25rem;
            font-style: italic;
            color: #334155;
            background-color: #f8fafc;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            border-radius: 0 8px 8px 0;
        }
        .prose-custom code {
            font-family: monospace;
            background-color: #f1f5f9;
            padding: 0.125rem 0.375rem;
            border-radius: 0.375rem;
            font-size: 0.9em;
            color: #0f172a;
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 flex flex-col min-h-screen">
    <!-- Beautiful top loading progress bar for AJAX SPA -->
    <div id="loading-bar" class="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 z-[9999] w-0 transition-all duration-300 opacity-0 pointer-events-none"></div>

    <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-blue-600 text-white rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <span class="text-xl font-black text-slate-900">آکادمی مالی اروند</span>
                </div>

                <!-- Navigation -->
                <nav class="hidden md:flex items-center gap-6">
                    <a href="/" class="text-slate-600 hover:text-blue-600 font-medium transition-colors">خانه</a>
                    <a href="/about" class="text-slate-600 hover:text-blue-600 font-medium transition-colors">درباره ما</a>
                    <a href="/services" class="text-slate-600 hover:text-blue-600 font-medium transition-colors">خدمات ما</a>
                    <a href="/blog" class="text-slate-600 hover:text-blue-600 font-medium transition-colors">مقالات و اخبار</a>
                    <a href="/contact" class="text-slate-600 hover:text-blue-600 font-medium transition-colors">درخواست خدمات مالی</a>
                </nav>

                <!-- Actions -->
                <div class="flex items-center gap-4">
                    <div class="hidden md:flex items-center gap-4">
                        <?php if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true): ?>
                            <a href="/admin" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">پنل مدیریت</a>
                            <a href="/logout" class="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">خروج</a>
                        <?php else: ?>
                            <a href="/login" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">ورود ادمین</a>
                        <?php endif; ?>
                    </div>

                    <!-- Mobile menu button -->
                    <button id="mobile-menu-toggle" onclick="document.getElementById('mobile-drawer').classList.remove('translate-x-full');" class="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none md:hidden">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Mobile navigation drawer -->
    <div id="mobile-drawer" class="fixed inset-0 z-[100] transform translate-x-full transition-transform duration-300 ease-in-out md:hidden" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div id="mobile-drawer-backdrop" onclick="document.getElementById('mobile-drawer').classList.add('translate-x-full');" class="fixed inset-0 bg-slate-950/40 backdrop-blur-sm"></div>
        
        <div class="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-xl flex flex-col justify-between z-10">
            <div>
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center gap-2">
                        <div class="p-1.5 bg-blue-600 text-white rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M9 7h1M9 11h1M15 7h1M15 11h1" />
                            </svg>
                        </div>
                        <span class="text-md font-extrabold text-slate-900">آکادمی مالی اروند</span>
                    </div>
                    <button onclick="document.getElementById('mobile-drawer').classList.add('translate-x-full');" class="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav class="space-y-2">
                    <a href="/" onclick="document.getElementById('mobile-drawer').classList.add('translate-x-full');" class="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors">خانه</a>
                    <a href="/about" onclick="document.getElementById('mobile-drawer').classList.add('translate-x-full');" class="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors">درباره ما</a>
                    <a href="/services" onclick="document.getElementById('mobile-drawer').classList.add('translate-x-full');" class="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors">خدمات ما</a>
                    <a href="/blog" onclick="document.getElementById('mobile-drawer').classList.add('translate-x-full');" class="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors">مقالات و اخبار</a>
                    <a href="/contact" onclick="document.getElementById('mobile-drawer').classList.add('translate-x-full');" class="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors">درخواست خدمات مالی</a>
                </nav>
            </div>
            <div class="border-t border-slate-100 pt-6 space-y-3">
                <?php if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true): ?>
                    <a href="/admin" onclick="document.getElementById('mobile-drawer').classList.add('translate-x-full');" class="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-bold text-sm transition-colors">پنل مدیریت</a>
                    <a href="/logout" onclick="document.getElementById('mobile-drawer').classList.add('translate-x-full');" class="block w-full text-center bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-lg font-bold text-sm transition-colors">خروج</a>
                <?php else: ?>
                    <a href="/login" onclick="document.getElementById('mobile-drawer').classList.add('translate-x-full');" class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold text-sm transition-colors shadow-md">ورود ادمین</a>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <main id="main-content" class="flex-1 transition-all duration-300 opacity-100">
