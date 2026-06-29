<?php require_once __DIR__ . '/layout/header.php'; ?>

<section class="py-16 px-4 max-w-2xl mx-auto">
    <div class="bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
        <h1 class="text-2xl font-black text-slate-900 mb-2">درخواست دریافت خدمات مالی</h1>
        <p class="text-xs text-slate-400 mb-6">لطفاً فرم زیر را پر کنید تا کارشناسان ما جهت ارائه مشاوره با شما تماس بگیرند.</p>

        <?php if (isset($success) && !empty($success)): ?>
            <div class="bg-green-50 border-r-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 text-sm">
                <?php echo htmlspecialchars($success); ?>
            </div>
        <?php endif; ?>

        <?php if (isset($error) && !empty($error)): ?>
            <div class="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <form action="/contact" method="POST" class="space-y-4">
            <div>
                <label class="block text-xs font-medium text-slate-600 mb-1">نام و نام خانوادگی <span class="text-red-500">*</span></label>
                <input type="text" name="full_name" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
            </div>
            <div>
                <label class="block text-xs font-medium text-slate-600 mb-1">شماره تماس (تلفن همراه) <span class="text-red-500">*</span></label>
                <input type="text" name="phone" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
            </div>
            <div>
                <label class="block text-xs font-medium text-slate-600 mb-1">توضیحات درخواست <span class="text-red-500">*</span></label>
                <textarea name="description" rows="4" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required></textarea>
            </div>

            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold text-sm transition-colors shadow-lg">
                ثبت درخواست مشاوره مالی
            </button>
        </form>
    </div>
</section>

<?php require_once __DIR__ . '/layout/footer.php'; ?>
