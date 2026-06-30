<?php
session_start();
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/data.php';

$url = isset($_GET['url']) ? rtrim($_GET['url'], '/') : '';
$urlParts = explode('/', $url);
$route = $urlParts[0] ?: 'home';

// Helpers
function redirect($path) {
    header("Location: /php-app/$path");
    exit;
}
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Handle API / Action Routes (Backend)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($route === 'request' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $full_name = $_POST['full_name'];
        $company_name = $_POST['company_name'];
        $position = $_POST['position'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $city = $_POST['city'];
        $business_type = $_POST['business_type'];
        $business_status = $_POST['business_status'];
        $request_subject = $_POST['request_subject'];
        $priority = $_POST['priority'];
        $annual_turnover = $_POST['annual_turnover'];
        $complexity = $_POST['complexity'];
        $description = $_POST['description'];
        $contact_method = $_POST['contact_method'];

        $stmt = $db->prepare("INSERT INTO requests (full_name, company_name, position, phone, email, city, business_type, business_status, request_subject, priority, annual_turnover, complexity, description, contact_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
        $stmt->execute([$full_name, $company_name, $position, $phone, $email, $city, $business_type, $business_status, $request_subject, $priority, $annual_turnover, $complexity, $description, $contact_method]);
        
        $_SESSION['success_msg'] = 'درخواست شما با موفقیت در دیتابیس ثبت شد. یک کوئری INSERT صادر شد و اطلاعات در صف پیگیری قرار گرفت.';
        redirect('request');
    }

    if ($route === 'login') {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        $stmt = $db->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            redirect('admin');
        } else {
            $_SESSION['error'] = 'نام کاربری یا رمز عبور اشتباه است.';
            redirect('login');
        }
    }
    
    if ($route === 'admin' && $urlParts[1] === 'logout') {
        session_destroy();
        redirect('login');
    }

    if ($route === 'admin' && $urlParts[1] === 'post_action') {
        if (!isLoggedIn()) die('Unauthorized');
        $action = $_POST['action'] ?? '';
        
        if ($action === 'create' || $action === 'edit') {
            $title = $_POST['title'];
            $content = $_POST['content'];
            $image_url = $_POST['image_url'];
            
            // Handle file upload
            if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
                $tmpName = $_FILES['image_file']['tmp_name'];
                $type = $_FILES['image_file']['type'];
                if (strpos($type, 'image/') === 0) {
                    $imgData = file_get_contents($tmpName);
                    $image_url = 'data:' . $type . ';base64,' . base64_encode($imgData);
                }
            }

            if ($action === 'create') {
                $slug = uniqid(); // simplified
                $stmt = $db->prepare("INSERT INTO posts (title, slug, content, image_url) VALUES (?, ?, ?, ?)");
                $stmt->execute([$title, $slug, $content, $image_url]);
            } else {
                $id = $_POST['id'];
                $stmt = $db->prepare("UPDATE posts SET title=?, content=?, image_url=? WHERE id=?");
                $stmt->execute([$title, $content, $image_url, $id]);
            }
        } elseif ($action === 'delete') {
            $id = $_POST['id'];
            $stmt = $db->prepare("DELETE FROM posts WHERE id=?");
            $stmt->execute([$id]);
        }
        redirect('admin');
    }
}

// Frontend Views
ob_start();
switch ($route) {
    case 'home':
        $stmt = $db->query("SELECT * FROM posts ORDER BY id DESC LIMIT 6");
        $latest_posts = $stmt->fetchAll();
        require __DIR__ . '/views/home.php';
        break;
    case 'about':
        require __DIR__ . '/views/about.php';
        break;
    case 'services':
        require __DIR__ . '/views/services.php';
        break;
    case 'request':
        require __DIR__ . '/views/request.php';
        break;
    case 'blog':
        $catFilter = isset($_GET['cat']) ? (int)$_GET['cat'] : null;
        $search = isset($_GET['search']) ? $_GET['search'] : '';
        
        $articleCatIds = array_map(function($c) { return $c['id']; }, array_filter($INITIAL_CATEGORIES, function($c) { return $c['type'] === 'article'; }));
        $inClause = implode(',', $articleCatIds);
        
        $query = "SELECT * FROM posts WHERE category_id IN ($inClause)";
        $params = [];
        
        if ($catFilter) {
            $query .= " AND category_id = ?";
            $params[] = $catFilter;
        }
        if ($search) {
            $query .= " AND (title LIKE ? OR content LIKE ?)";
            $params[] = "%$search%";
            $params[] = "%$search%";
        }
        $query .= " ORDER BY id DESC";
        $stmt = $db->prepare($query);
        $stmt->execute($params);
        $posts = $stmt->fetchAll();
        $categories = $INITIAL_CATEGORIES;
        require __DIR__ . '/views/blog.php';
        break;
    case 'news':
        $catFilter = isset($_GET['cat']) ? (int)$_GET['cat'] : null;
        $search = isset($_GET['search']) ? $_GET['search'] : '';
        
        $newsCatIds = array_map(function($c) { return $c['id']; }, array_filter($INITIAL_CATEGORIES, function($c) { return $c['type'] === 'news'; }));
        $inClause = implode(',', $newsCatIds);
        
        $query = "SELECT * FROM posts WHERE category_id IN ($inClause)";
        $params = [];
        
        if ($catFilter) {
            $query .= " AND category_id = ?";
            $params[] = $catFilter;
        }
        if ($search) {
            $query .= " AND (title LIKE ? OR content LIKE ?)";
            $params[] = "%$search%";
            $params[] = "%$search%";
        }
        $query .= " ORDER BY id DESC";
        $stmt = $db->prepare($query);
        $stmt->execute($params);
        $posts = $stmt->fetchAll();
        $categories = $INITIAL_CATEGORIES;
        require __DIR__ . '/views/news.php';
        break;
    case 'post':
        require __DIR__ . '/views/post.php';
        break;
    case 'login':
        if (isLoggedIn()) redirect('admin');
        require __DIR__ . '/views/login.php';
        break;
    case 'admin':
        if (!isLoggedIn()) redirect('login');
        $stmt = $db->query("SELECT * FROM posts ORDER BY id DESC");
        $posts = $stmt->fetchAll();
        $stmt = $db->query("SELECT * FROM requests ORDER BY id DESC");
        $requests = $stmt->fetchAll();
        require __DIR__ . '/views/admin.php';
        break;
    default:
        echo "<h1 class='text-center mt-10 text-2xl'>صفحه پیدا نشد 404</h1>";
        break;
}
$content = ob_get_clean();

require __DIR__ . '/views/layout.php';
