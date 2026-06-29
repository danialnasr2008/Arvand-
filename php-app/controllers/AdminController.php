<?php
require_once __DIR__ . '/../models/User.php';

class AdminController extends Controller {
    public function login() {
        if (User::isLoggedIn()) {
            $this->redirect('/admin');
        }

        $error = null;
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $username = trim($_POST['username'] ?? '');
            $password = $_POST['password'] ?? '';

            if (empty($username) || empty($password)) {
                $error = 'نام کاربری و رمز عبور الزامی هستند.';
            } else {
                $userModel = $this->model('User');
                if ($userModel->login($username, $password)) {
                    $this->redirect('/admin');
                } else {
                    $error = 'نام کاربری یا رمز عبور اشتباه است.';
                }
            }
        }

        $this->view('login', ['error' => $error]);
    }

    public function logout() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION = [];
        session_destroy();
        $this->redirect('/login');
    }

    public function index() {
        User::requireLogin();
        
        $postModel = $this->model('Post');
        $commentModel = $this->model('Comment');
        $requestModel = $this->model('Request');

        $postsCount = count($postModel->getAll());
        $comments = $commentModel->getAll();
        $requests = $requestModel->getAll();

        $commentsCount = count($comments);
        $pendingCommentsCount = count(array_filter($comments, function($c) { return !$c['is_approved']; }));
        
        $requestsCount = count($requests);
        $pendingRequestsCount = count(array_filter($requests, function($r) { return $r['status'] === 'pending'; }));

        $this->view('admin/dashboard', [
            'postsCount' => $postsCount,
            'commentsCount' => $commentsCount,
            'pendingCommentsCount' => $pendingCommentsCount,
            'requestsCount' => $requestsCount,
            'pendingRequestsCount' => $pendingRequestsCount,
            'latestRequests' => array_slice($requests, 0, 5),
            'latestComments' => array_slice($comments, 0, 5),
        ]);
    }

    public function posts() {
        User::requireLogin();
        $postModel = $this->model('Post');
        $posts = $postModel->getAll();
        $this->view('admin/posts', ['posts' => $posts]);
    }

    public function addPost() {
        User::requireLogin();
        $categoryModel = $this->model('Category');
        $categories = $categoryModel->getAll();

        $error = null;
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = [
                'title' => trim($_POST['title'] ?? ''),
                'slug' => trim($_POST['slug'] ?? ''),
                'summary' => trim($_POST['summary'] ?? ''),
                'content' => trim($_POST['content'] ?? ''),
                'category_id' => (int)($_POST['category_id'] ?? 0),
                'image_url' => trim($_POST['image_url'] ?? '')
            ];

            // Auto slug generator if empty
            if (empty($data['slug'])) {
                $data['slug'] = strtolower(str_replace(' ', '-', $data['title']));
            }

            if (empty($data['title']) || empty($data['content'])) {
                $error = 'عنوان و محتوای مقاله الزامی هستند.';
            } else {
                $postModel = $this->model('Post');
                if ($postModel->create($data)) {
                    $_SESSION['admin_success'] = "مقاله جدید با موفقیت منتشر شد.";
                    $this->redirect('/admin/posts');
                } else {
                    $error = 'خطایی در ثبت مقاله پیش آمد.';
                }
            }
        }

        $this->view('admin/posts_add', ['categories' => $categories, 'error' => $error]);
    }

    public function editPost($params) {
        User::requireLogin();
        $id = (int)($params['id'] ?? 0);
        
        $postModel = $this->model('Post');
        $post = $postModel->getById($id);
        
        if (!$post) {
            die("مقاله یافت نشد.");
        }

        $categoryModel = $this->model('Category');
        $categories = $categoryModel->getAll();

        $error = null;
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = [
                'title' => trim($_POST['title'] ?? ''),
                'slug' => trim($_POST['slug'] ?? ''),
                'summary' => trim($_POST['summary'] ?? ''),
                'content' => trim($_POST['content'] ?? ''),
                'category_id' => (int)($_POST['category_id'] ?? 0),
                'image_url' => trim($_POST['image_url'] ?? '')
            ];

            if (empty($data['title']) || empty($data['content'])) {
                $error = 'عنوان و محتوای مقاله الزامی هستند.';
            } else {
                if ($postModel->update($id, $data)) {
                    $_SESSION['admin_success'] = "مقاله با موفقیت ویرایش شد.";
                    $this->redirect('/admin/posts');
                } else {
                    $error = 'خطایی در ویرایش مقاله پیش آمد.';
                }
            }
        }

        $this->view('admin/posts_edit', ['post' => $post, 'categories' => $categories, 'error' => $error]);
    }

    public function deletePost($params) {
        User::requireLogin();
        $id = (int)($params['id'] ?? 0);
        $postModel = $this->model('Post');
        if ($postModel->delete($id)) {
            $_SESSION['admin_success'] = "مقاله با موفقیت حذف شد.";
        }
        $this->redirect('/admin/posts');
    }

    public function comments() {
        User::requireLogin();
        $commentModel = $this->model('Comment');
        $comments = $commentModel->getAll();
        $this->view('admin/comments', ['comments' => $comments]);
    }

    public function approveComment($params) {
        User::requireLogin();
        $id = (int)($params['id'] ?? 0);
        $commentModel = $this->model('Comment');
        if ($commentModel->approve($id)) {
            $_SESSION['admin_success'] = "دیدگاه مورد نظر تایید شد.";
        }
        $this->redirect('/admin/comments');
    }

    public function deleteComment($params) {
        User::requireLogin();
        $id = (int)($params['id'] ?? 0);
        $commentModel = $this->model('Comment');
        if ($commentModel->delete($id)) {
            $_SESSION['admin_success'] = "دیدگاه مورد نظر حذف شد.";
        }
        $this->redirect('/admin/comments');
    }

    public function requests() {
        User::requireLogin();
        $requestModel = $this->model('Request');
        $requests = $requestModel->getAll();
        $this->view('admin/requests', ['requests' => $requests]);
    }

    public function viewRequest($params) {
        User::requireLogin();
        $id = (int)($params['id'] ?? 0);
        $requestModel = $this->model('Request');
        $request = $requestModel->getById($id);

        if (!$request) {
            die("درخواست یافت نشد.");
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $status = $_POST['status'] ?? 'pending';
            $requestModel->updateStatus($id, $status);
            $_SESSION['admin_success'] = "وضعیت درخواست با موفقیت بروز شد.";
            $this->redirect('/admin/requests');
        }

        $this->view('admin/request_view', ['request' => $request]);
    }

    public function exportRequests() {
        User::requireLogin();
        $requestModel = $this->model('Request');
        $requests = $requestModel->getAll();

        if (ob_get_level()) {
            ob_end_clean();
        }

        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="service_requests_' . date('Y-m-d') . '.csv"');
        header('Pragma: no-cache');
        header('Expires: 0');

        $output = fopen('php://output', 'w');
        fwrite($output, "\xEF\xBB\xBF");

        fputcsv($output, [
            'شناسه', 'نام کامل', 'شرکت', 'سمت', 'تلفن', 'ایمیل', 'شهر', 
            'نوع کسب و کار', 'وضعیت کسب و کار', 'موضوع درخواست', 'اولویت', 
            'گردش مالی سالانه', 'پیچیدگی', 'توضیحات', 'روش تماس', 'وضعیت', 'تاریخ ثبت'
        ]);

        foreach ($requests as $req) {
            $priorityMap = [
                'immediate' => 'فوری',
                'normal' => 'معمولی',
                'low' => 'کم اهمیت'
            ];
            $statusMap = [
                'pending' => 'در انتظار بررسی',
                'completed' => 'پیگیری شده'
            ];
            $complexityMap = [
                'simple' => 'ساده',
                'medium' => 'متوسط',
                'complex' => 'پیچیده'
            ];

            fputcsv($output, [
                $req['id'],
                $req['full_name'],
                $req['company_name'] ?? '---',
                $req['position'] ?? '---',
                $req['phone'],
                $req['email'] ?? '---',
                $req['city'] ?? '---',
                $req['business_type'] ?? '---',
                $req['business_status'] ?? '---',
                $req['request_subject'] ?? '---',
                $priorityMap[$req['priority']] ?? $req['priority'],
                $req['annual_turnover'] ?? '---',
                $complexityMap[$req['complexity']] ?? $req['complexity'],
                str_replace(["\r", "\n"], " ", $req['description']),
                $req['contact_method'] === 'phone' ? 'تلفن' : 'ایمیل',
                $statusMap[$req['status']] ?? $req['status'],
                $req['created_at']
            ]);
        }

        fclose($output);
        exit();
    }
}
