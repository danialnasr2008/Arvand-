<div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg shadow-blue-500/30">A</div>
            <h2 class="text-2xl font-bold text-slate-900">ورود به پنل مدیریت</h2>
            <p class="mt-2 text-sm text-slate-500">جهت مدیریت محتوا وارد شوید</p>
        </div>
        
        <?php if(isset($_SESSION['error'])): ?>
            <div class="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center">
                <?= $_SESSION['error']; unset($_SESSION['error']); ?>
            </div>
        <?php endif; ?>

        <form class="mt-8 space-y-6" action="" method="POST">
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">نام کاربری</label>
                    <input type="text" name="username" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-left font-mono" dir="ltr" value="admin">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">رمز عبور</label>
                    <input type="password" name="password" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-left font-mono" dir="ltr" value="admin">
                </div>
            </div>

            <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                ورود به سیستم
            </button>
        </form>
    </div>
</div>
