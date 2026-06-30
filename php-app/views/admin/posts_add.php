<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>افزودن مقاله جدید - آکادمی مالی اروند</title>
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
            <a href="/admin/posts" class="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold">مدیریت مقالات</a>
            <a href="/admin/comments" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors">دیدگاه‌ها</a>
            <a href="/admin/requests" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors">درخواست‌ها</a>
            <a href="/" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-sm transition-colors border-t border-slate-800 pt-4">← مشاهده وب‌سایت</a>
        </nav>
        <div class="p-4 border-t border-slate-800">
            <a href="/logout" class="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-bold transition-colors">خروج از حساب</a>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-h-screen">
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <span class="font-bold text-slate-800">افزودن مقاله جدید</span>
            <a href="/admin/posts" class="text-sm font-bold text-slate-500 hover:text-slate-800">← بازگشت به لیست مقالات</a>
        </header>

        <div class="p-6 md:p-8 max-w-4xl w-full mx-auto space-y-6 flex-1">
            <?php if (isset($error) && !empty($error)): ?>
                <div class="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-lg text-sm">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                <form action="/admin/posts/add" method="POST" enctype="multipart/form-data" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-2">عنوان مقاله <span class="text-red-500">*</span></label>
                            <input type="text" name="title" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-2">اسلاگ آدرس (Slug - اختیاری)</label>
                            <input type="text" name="slug" placeholder="مثال: financial-tax-guide" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-left font-mono focus:outline-none focus:border-blue-500">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <div class="flex items-center justify-between mb-2">
                                <label class="block text-xs font-bold text-slate-700">تصویر شاخص مقاله</label>
                                <div class="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                                    <button type="button" id="btn-mode-upload" class="px-2.5 py-0.5 text-[10px] font-bold rounded bg-blue-600 text-white shadow-sm transition-all" onclick="setMode('upload')">آپلود فایل عکس</button>
                                    <button type="button" id="btn-mode-url" class="px-2.5 py-0.5 text-[10px] font-bold rounded text-slate-500 hover:text-slate-800 transition-all" onclick="setMode('url')">لینک تصویر (URL)</button>
                                </div>
                            </div>

                            <!-- Upload Mode -->
                            <div id="container-upload" class="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 hover:bg-slate-100 transition-colors relative min-h-[120px]">
                                <div id="upload-preview-container" class="hidden w-full flex flex-col items-center gap-2">
                                    <img id="upload-preview" src="" alt="Preview" class="h-24 w-auto object-cover rounded-lg border border-slate-200 shadow-sm">
                                    <button type="button" class="text-[10px] font-bold bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded transition-colors" onclick="clearUpload()">حذف عکس و انتخاب مجدد</button>
                                </div>
                                <label id="upload-placeholder" class="cursor-pointer w-full text-center block space-y-1">
                                    <div class="flex justify-center text-slate-400">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                                    </div>
                                    <span class="text-xs font-semibold text-slate-600 block">برای بارگذاری تصویر کلیک کنید</span>
                                    <span class="text-[10px] text-slate-400 block"> JPG, PNG, WEBP (حداکثر ۲ مگابایت)</span>
                                    <input type="file" name="image_file" id="image_file" accept="image/*" class="hidden" onchange="handleFileSelect(this)">
                                </label>
                            </div>

                            <!-- URL Mode -->
                            <div id="container-url" class="hidden">
                                <input type="text" name="image_url" id="image_url" value="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-left font-mono focus:outline-none focus:border-blue-500" dir="ltr" oninput="updateUrlPreview(this.value)">
                                <div id="url-preview-container" class="flex items-center gap-2 mt-2">
                                    <img id="url-preview" src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40" class="h-10 w-16 object-cover rounded border border-slate-200 shrink-0">
                                    <span class="text-[10px] text-slate-400">پیش‌نمایش تصویر متصل شده</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-2">دسته‌بندی</label>
                            <select name="category_id" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                                <?php if(!empty($categories)): ?>
                                    <?php foreach($categories as $cat): ?>
                                        <option value="<?php echo (int)$cat['id']; ?>"><?php echo htmlspecialchars($cat['name']); ?></option>
                                    <?php endforeach; ?>
                                <?php else: ?>
                                    <option value="1">عمومی</option>
                                <?php endif; ?>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">خلاصه کوتاه مقاله <span class="text-red-500">*</span></label>
                        <input type="text" name="summary" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">محتوای کامل مقاله <span class="text-red-500">*</span></label>
                        <textarea name="content" rows="12" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required></textarea>
                    </div>

                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-blue-500/20">
                        انتشار و ثبت نهایی مقاله
                    </button>
                </form>
            </div>
        </div>
    </main>
    <script>
        let currentMode = 'upload';
        
        function setMode(mode) {
            currentMode = mode;
            const btnUpload = document.getElementById('btn-mode-upload');
            const btnUrl = document.getElementById('btn-mode-url');
            const containerUpload = document.getElementById('container-upload');
            const containerUrl = document.getElementById('container-url');
            
            if (mode === 'upload') {
                btnUpload.className = "px-2.5 py-0.5 text-[10px] font-bold rounded bg-blue-600 text-white shadow-sm transition-all";
                btnUrl.className = "px-2.5 py-0.5 text-[10px] font-bold rounded text-slate-500 hover:text-slate-800 transition-all";
                containerUpload.classList.remove('hidden');
                containerUrl.classList.add('hidden');
            } else {
                btnUrl.className = "px-2.5 py-0.5 text-[10px] font-bold rounded bg-blue-600 text-white shadow-sm transition-all";
                btnUpload.className = "px-2.5 py-0.5 text-[10px] font-bold rounded text-slate-500 hover:text-slate-800 transition-all";
                containerUrl.classList.remove('hidden');
                containerUpload.classList.add('hidden');
            }
        }
        
        function handleFileSelect(input) {
            const file = input.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert('حجم فایل نباید بیشتر از ۲ مگابایت باشد.');
                    input.value = '';
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('upload-preview').src = e.target.result;
                    document.getElementById('upload-preview-container').classList.remove('hidden');
                    document.getElementById('upload-preview-container').classList.add('flex');
                    document.getElementById('upload-placeholder').classList.add('hidden');
                }
                reader.readAsDataURL(file);
            }
        }
        
        function clearUpload() {
            const input = document.getElementById('image_file');
            input.value = '';
            document.getElementById('upload-preview').src = '';
            document.getElementById('upload-preview-container').classList.add('hidden');
            document.getElementById('upload-preview-container').classList.remove('flex');
            document.getElementById('upload-placeholder').classList.remove('hidden');
        }
        
        function updateUrlPreview(url) {
            const preview = document.getElementById('url-preview');
            const container = document.getElementById('url-preview-container');
            if (url) {
                preview.src = url;
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        }
        
        // Initialize mode on load
        setMode('upload');
    </script>
</body>
</html>
