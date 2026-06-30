<?php
class PostController extends Controller {
    public function index() {
        global $INITIAL_CATEGORIES;
        $slug = $_GET['slug'] ?? '';
        $stmt = $this->db->prepare("SELECT * FROM posts WHERE slug = ?");
        $stmt->execute([$slug]);
        $post = $stmt->fetch();

        if(!$post) {
            echo '<div class="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500">مقاله مورد نظر یافت نشد.<br><br><a href="' . BASE_URL . 'blog" class="text-blue-500 underline font-bold">بازگشت به وبلاگ</a></div>';
            return;
        }

        // Handle comment submit
        if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['author_name'])) {
            $author = trim($_POST['author_name']);
            $content = trim($_POST['content']);
            if($author && $content) {
                $stmt = $this->db->prepare("INSERT INTO comments (post_id, author_name, content, is_approved) VALUES (?, ?, ?, 0)");
                $stmt->execute([$post['id'], $author, $content]);
                $_SESSION['comment_success'] = 'دیدگاه شما با موفقیت ثبت شد و به بخش مدیریت ارسال شد.';
            }
            $this->redirect("post?slug=".urlencode($slug));
        }

        // Increment views
        $this->db->exec("UPDATE posts SET views = views + 1 WHERE id = ".$post['id']);

        $stmt = $this->db->prepare("SELECT * FROM comments WHERE post_id = ? AND is_approved = 1 ORDER BY id ASC");
        $stmt->execute([$post['id']]);
        $comments = $stmt->fetchAll();

        $this->view('post', [
            'post' => $post,
            'categories' => $INITIAL_CATEGORIES,
            'comments' => $comments,
            'slug' => $slug
        ]);
    }
}
