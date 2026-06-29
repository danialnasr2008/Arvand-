<?php
class BlogController extends Controller {
    public function index() {
        $postModel = $this->model('Post');
        $categoryModel = $this->model('Category');

        $categoryId = isset($_GET['category']) ? (int)$_GET['category'] : null;

        $posts = $postModel->getAll($categoryId);
        $categories = $categoryModel->getAll();

        $selectedCategory = null;
        if ($categoryId) {
            $selectedCategory = $categoryModel->getById($categoryId);
        }

        $this->view('blog', [
            'posts' => $posts,
            'categories' => $categories,
            'selectedCategory' => $selectedCategory
        ]);
    }

    public function post($params) {
        $slug = $params['slug'] ?? '';
        if (empty($slug)) {
            $this->redirect('/blog');
        }

        $postModel = $this->model('Post');
        $commentModel = $this->model('Comment');
        $categoryModel = $this->model('Category');

        $post = $postModel->getBySlug($slug);
        if (!$post) {
            die("مقاله مورد نظر یافت نشد.");
        }

        // Increment views
        $postModel->incrementViews($post['id']);

        // Fetch comments and categories
        $comments = $commentModel->getApprovedByPostId($post['id']);
        $categories = $categoryModel->getAll();

        $this->view('post', [
            'post' => $post,
            'comments' => $comments,
            'categories' => $categories
        ]);
    }

    public function addComment() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/blog');
        }

        $postId = (int)($_POST['post_id'] ?? 0);
        $authorName = trim($_POST['author_name'] ?? '');
        $content = trim($_POST['content'] ?? '');
        $postSlug = $_POST['post_slug'] ?? '';

        if (empty($authorName) || empty($content) || $postId === 0) {
            $_SESSION['comment_error'] = "لطفاً تمامی فیلدها را پر کنید.";
            $this->redirect('/post/' . $postSlug);
        }

        $commentModel = $this->model('Comment');
        
        $data = [
            'post_id' => $postId,
            'author_name' => $authorName,
            'content' => $content,
            'is_approved' => 0 // Needs moderation
        ];

        if ($commentModel->create($data)) {
            $_SESSION['comment_success'] = "دیدگاه شما با موفقیت ثبت شد و پس از تایید مدیر نمایش داده خواهد شد.";
        } else {
            $_SESSION['comment_error'] = "خطایی در ثبت دیدگاه رخ داد. مجدداً تلاش کنید.";
        }

        $this->redirect('/post/' . $postSlug);
    }
}
