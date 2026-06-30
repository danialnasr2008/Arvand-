<?php
// Simple Admin Panel in PHP
?>
<div class="max-w-7xl mx-auto px-4 sm:px-6 py-10" dir="rtl">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-slate-800">پنل مدیریت</h1>
        <a href="/php-app/admin/logout" class="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold">خروج</a>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-2">
            <button onclick="showTab('dashboard')" class="w-full text-right px-4 py-3 bg-blue-600 text-white rounded-xl font-bold tab-btn">داشبورد آمار</button>
            <button onclick="showTab('posts')" class="w-full text-right px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold tab-btn">مدیریت مقالات و اخبار</button>
            <button onclick="showTab('requests')" class="w-full text-right px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold tab-btn">درخواست‌های مشاوره</button>
        </div>

        <!-- Content -->
        <div class="lg:col-span-3">
            <!-- Dashboard Tab -->
            <div id="tab-dashboard" class="space-y-6 tab-content">
                <div class="grid grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
                        <span class="block text-slate-500 mb-2 font-bold">کل مقالات</span>
                        <span class="text-3xl font-extrabold"><?= count($posts) ?></span>
                    </div>
                    <div class="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
                        <span class="block text-slate-500 mb-2 font-bold">درخواست‌های مشاوره</span>
                        <span class="text-3xl font-extrabold"><?= count($requests) ?></span>
                    </div>
                </div>
            </div>

            <!-- Posts Tab -->
            <div id="tab-posts" class="space-y-6 hidden tab-content">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <h2 class="text-lg font-bold border-b pb-4">افزودن مقاله/خبر جدید</h2>
                    <form action="/php-app/admin/post_action" method="POST" enctype="multipart/form-data" class="space-y-4">
                        <input type="hidden" name="action" value="create">
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-1">عنوان</label>
                            <input type="text" name="title" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-1">متن کامل (Markdown)</label>
                            <textarea name="content" required rows="6" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" dir="rtl"></textarea>
                        </div>
                        
                        <div class="p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50">
                            <label class="block text-sm font-bold text-slate-700 mb-2">آپلود عکس (آپلودر تصویر)</label>
                            <input type="file" name="image_file" accept="image/*" class="w-full">
                            <p class="text-xs text-slate-500 mt-2">عکس انتخاب شده به صورت Base64 در دیتابیس ذخیره می‌شود و مستقیما در سایت نمایش داده می‌شود.</p>
                        </div>

                        <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold">ذخیره و انتشار</button>
                    </form>
                </div>

                <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <table class="w-full text-right text-sm">
                        <thead class="bg-slate-50 text-slate-600 border-b">
                            <tr>
                                <th class="px-6 py-4 font-bold">عنوان</th>
                                <th class="px-6 py-4 font-bold">تصویر</th>
                                <th class="px-6 py-4 font-bold">عملیات</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <?php foreach($posts as $post): ?>
                            <tr>
                                <td class="px-6 py-4"><?= htmlspecialchars($post['title']) ?></td>
                                <td class="px-6 py-4">
                                    <?php if($post['image_url']): ?>
                                        <img src="<?= htmlspecialchars($post['image_url']) ?>" class="w-16 h-10 object-cover rounded border">
                                    <?php else: ?>
                                        <span class="text-slate-400 text-xs">بدون تصویر</span>
                                    <?php endif; ?>
                                </td>
                                <td class="px-6 py-4">
                                    <form action="/php-app/admin/post_action" method="POST" onsubmit="return confirm('آیا مطمئن هستید؟')">
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="id" value="<?= $post['id'] ?>">
                                        <button type="submit" class="text-red-500 hover:text-red-700 font-bold">حذف</button>
                                    </form>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Requests Tab -->
            <div id="tab-requests" class="space-y-6 hidden tab-content">
                <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <table class="w-full text-right text-sm">
                        <thead class="bg-slate-50 text-slate-600 border-b">
                            <tr>
                                <th class="px-6 py-4 font-bold">نام</th>
                                <th class="px-6 py-4 font-bold">شماره تماس</th>
                                <th class="px-6 py-4 font-bold">اولویت</th>
                                <th class="px-6 py-4 font-bold">تاریخ</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <?php foreach($requests as $req): ?>
                            <tr>
                                <td class="px-6 py-4"><?= htmlspecialchars($req['full_name']) ?></td>
                                <td class="px-6 py-4" dir="ltr"><?= htmlspecialchars($req['phone']) ?></td>
                                <td class="px-6 py-4"><?= htmlspecialchars($req['priority']) ?></td>
                                <td class="px-6 py-4 font-mono text-xs"><?= htmlspecialchars($req['created_at']) ?></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');
    
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.className = 'w-full text-right px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold tab-btn';
    });
    event.currentTarget.className = 'w-full text-right px-4 py-3 bg-blue-600 text-white rounded-xl font-bold tab-btn';
}
</script>
