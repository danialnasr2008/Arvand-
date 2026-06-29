<?php 
require_once __DIR__ . '/layout/header.php'; 

if (!function_exists('parseMarkdown')) {
    function parseMarkdown($text) {
        $text = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
        $text = str_replace(["\r\n", "\r"], "\n", $text);
        $blocks = explode("\n\n", $text);
        $output = [];
        
        foreach ($blocks as $block) {
            $block = trim($block);
            if ($block === '') continue;
            
            // Headers
            if (preg_match('/^### (.*?)$/m', $block)) {
                $block = preg_replace('/^### (.*?)$/m', '<h3>$1</h3>', $block);
                $output[] = $block;
            } elseif (preg_match('/^## (.*?)$/m', $block)) {
                $block = preg_replace('/^## (.*?)$/m', '<h2>$1</h2>', $block);
                $output[] = $block;
            } elseif (preg_match('/^# (.*?)$/m', $block)) {
                $block = preg_replace('/^# (.*?)$/m', '<h1>$1</h1>', $block);
                $output[] = $block;
            }
            // Blockquotes
            elseif (preg_match('/^&gt; (.*?)$/m', $block)) {
                $block = preg_replace('/^&gt; (.*?)$/m', '<blockquote>$1</blockquote>', $block);
                $output[] = $block;
            }
            // Bullet list
            elseif (preg_match('/^[\*\-] (.*?)$/m', $block)) {
                $items = preg_split('/\n/', $block);
                $listHtml = "<ul>\n";
                foreach ($items as $item) {
                    $cleanedItem = preg_replace('/^[\*\-] (.*?)$/', '$1', trim($item));
                    $cleanedItem = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $cleanedItem);
                    $cleanedItem = preg_replace('/`(.*?)`/', '<code>$1</code>', $cleanedItem);
                    $listHtml .= "  <li>" . $cleanedItem . "</li>\n";
                }
                $listHtml .= "</ul>";
                $output[] = $listHtml;
            }
            // Plain paragraph
            else {
                $block = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $block);
                $block = preg_replace('/`(.*?)`/', '<code>$1</code>', $block);
                $block = nl2br($block);
                $output[] = "<p>" . $block . "</p>";
            }
        }
        
        return implode("\n\n", $output);
    }
}
?>

<article class="py-16 px-4 max-w-4xl mx-auto">
    <!-- Post Cover Image -->
    <img src="<?php echo htmlspecialchars($post['image_url']); ?>" alt="<?php echo htmlspecialchars($post['title']); ?>" class="w-full h-80 object-cover rounded-2xl shadow-md mb-8">

    <!-- Title and Meta -->
    <h1 class="text-3xl font-black text-slate-900 mb-4 leading-tight"><?php echo htmlspecialchars($post['title']); ?></h1>
    <div class="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-6 mb-8">
        <span>تعداد بازدید: <?php echo (int)$post['views']; ?> مرتبه</span>
        <span>دسته‌بندی: عمومی</span>
    </div>

    <!-- Content -->
    <div class="prose-custom max-w-none text-slate-700 mb-12">
        <?php echo parseMarkdown($post['content']); ?>
    </div>

    <!-- Comments Section -->
    <section class="border-t border-slate-200 pt-10">
        <h2 class="text-xl font-bold text-slate-900 mb-6">دیدگاه‌های کاربران (<?php echo count($comments); ?>)</h2>

        <?php if (isset($_SESSION['comment_success'])): ?>
            <div class="bg-green-50 border-r-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 text-xs">
                <?php 
                    echo htmlspecialchars($_SESSION['comment_success']); 
                    unset($_SESSION['comment_success']);
                ?>
            </div>
        <?php endif; ?>

        <?php if (isset($_SESSION['comment_error'])): ?>
            <div class="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-xs">
                <?php 
                    echo htmlspecialchars($_SESSION['comment_error']); 
                    unset($_SESSION['comment_error']);
                ?>
            </div>
        <?php endif; ?>

        <!-- List Comments -->
        <div class="space-y-4 mb-10">
            <?php if (!empty($comments)): ?>
                <?php foreach ($comments as $comment): ?>
                    <div class="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-bold text-slate-800"><?php echo htmlspecialchars($comment['author_name']); ?></span>
                            <span class="text-xs text-slate-400">یک دیدگاه</span>
                        </div>
                        <p class="text-slate-600 text-xs leading-relaxed"><?php echo nl2br(htmlspecialchars($comment['content'])); ?></p>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p class="text-xs text-slate-400 text-center py-4">اولین نفری باشید که دیدگاه خود را ارسال می‌کند!</p>
            <?php endif; ?>
        </div>

        <!-- Add Comment Form -->
        <div class="bg-slate-50 p-6 border border-slate-200 rounded-xl">
            <h3 class="text-sm font-bold text-slate-900 mb-4">ارسال نظر جدید</h3>
            <form action="/comment/add" method="POST" class="space-y-4">
                <input type="hidden" name="post_id" value="<?php echo (int)$post['id']; ?>">
                <input type="hidden" name="post_slug" value="<?php echo htmlspecialchars($post['slug']); ?>">
                
                <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">نام یا نام مستعار</label>
                    <input type="text" name="author_name" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none" required>
                </div>
                <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">متن دیدگاه</label>
                    <textarea name="content" rows="4" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none" required></textarea>
                </div>

                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg text-xs transition-colors">
                    ثبت و ارسال دیدگاه
                </button>
            </form>
        </div>
    </section>
</article>

<?php require_once __DIR__ . '/layout/footer.php'; ?>
