<?php
class AdminController extends Controller {
    public function __construct() {
        parent::__construct();
        // Allow logout without being fully authenticated if session is messed up
        $url = isset($_GET['url']) ? rtrim($_GET['url'], '/') : '';
        if (!$this->isLoggedIn() && strpos($url, 'admin/logout') === false) {
            $this->redirect('login');
        }
    }

    public function index() {
        global $INITIAL_CATEGORIES;
        $posts = $this->db->query("SELECT * FROM posts ORDER BY id DESC")->fetchAll();
        $requests = $this->db->query("SELECT * FROM requests ORDER BY id DESC")->fetchAll();
        $comments = $this->db->query("SELECT c.*, p.title as post_title FROM comments c JOIN posts p ON c.post_id = p.id ORDER BY c.id DESC")->fetchAll();
        
        $this->view('admin', [
            'posts' => $posts,
            'requests' => $requests,
            'comments' => $comments,
            'INITIAL_CATEGORIES' => $INITIAL_CATEGORIES
        ]);
    }

    public function logout() {
        session_destroy();
        $this->redirect('login');
    }

    public function post_action() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('admin');
        }
        $action = $_POST['action'] ?? '';
        
        if ($action === 'create' || $action === 'edit') {
            $title = $_POST['title'] ?? '';
            $summary = $_POST['summary'] ?? '';
            $content = $_POST['content'] ?? '';
            $category_id = $_POST['category_id'] ?? 1;
            $is_special = isset($_POST['is_special']) ? 1 : 0;
            $image_url = $_POST['image_url'] ?? '';
            
            // Handle file upload (Base64 for simplicity as requested before)
            if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
                $tmpName = $_FILES['image_file']['tmp_name'];
                $type = $_FILES['image_file']['type'];
                if (strpos($type, 'image/') === 0) {
                    $imgData = file_get_contents($tmpName);
                    $image_url = 'data:' . $type . ';base64,' . base64_encode($imgData);
                }
            }

            if ($action === 'create') {
                $slug = md5(uniqid()); // simple slug
                $stmt = $this->db->prepare("INSERT INTO posts (title, slug, summary, content, image_url, category_id, is_special) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$title, $slug, $summary, $content, $image_url, $category_id, $is_special]);
            } else {
                $id = $_POST['id'];
                $stmt = $this->db->prepare("UPDATE posts SET title=?, summary=?, content=?, image_url=?, category_id=?, is_special=? WHERE id=?");
                $stmt->execute([$title, $summary, $content, $image_url, $category_id, $is_special, $id]);
            }
        } elseif ($action === 'delete') {
            $id = $_POST['id'];
            $stmt = $this->db->prepare("DELETE FROM posts WHERE id=?");
            $stmt->execute([$id]);
        }
        $this->redirect('admin');
    }

    public function comment_action() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('admin');
        }
        $action = $_POST['action'] ?? '';
        $id = $_POST['id'];
        
        if ($action === 'approve') {
            $stmt = $this->db->prepare("UPDATE comments SET is_approved = 1 WHERE id=?");
            $stmt->execute([$id]);
        } elseif ($action === 'delete') {
            $stmt = $this->db->prepare("DELETE FROM comments WHERE id=?");
            $stmt->execute([$id]);
        }
        $this->redirect('admin');
    }
}
