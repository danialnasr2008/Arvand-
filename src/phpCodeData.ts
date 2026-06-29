export interface PHPFile {
  path: string;
  description: string;
  code: string;
}

export const PHP_FILES: PHPFile[] = [
  {
    path: 'index.php',
    description: 'نقطه شروع برنامه (Front Controller) - کلیه درخواست‌ها از این فایل عبور کرده و بر اساس آدرس به کنترلر مربوطه هدایت می‌شوند.',
    code: `<?php
/**
 * Arvand Financial Academy - PHP MVC Entry Point
 * Front Controller Pattern
 */

// شروع نشست به صورت امن
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// بارگذاری فایل‌های هسته سیستم
require_once __DIR__ . '/core/Router.php';
require_once __DIR__ . '/core/Controller.php';
require_once __DIR__ . '/core/Model.php';

// نمونه‌سازی از مسیریاب
$router = new Router();

// تعریف مسیرهای عمومی (Public)
$router->add('', ['controller' => 'HomeController', 'action' => 'index']);
$router->add('about', ['controller' => 'HomeController', 'action' => 'about']);
$router->add('services', ['controller' => 'HomeController', 'action' => 'services']);
$router->add('contact', ['controller' => 'HomeController', 'action' => 'contact']);
$router->add('blog', ['controller' => 'BlogController', 'action' => 'index']);
$router->add('post/{slug}', ['controller' => 'BlogController', 'action' => 'post']);
$router->add('comment/add', ['controller' => 'BlogController', 'action' => 'addComment']);

// مسیرهای احراز هویت
$router->add('login', ['controller' => 'AdminController', 'action' => 'login']);
$router->add('logout', ['controller' => 'AdminController', 'action' => 'logout']);

// مسیرهای پنل مدیریت
$router->add('admin', ['controller' => 'AdminController', 'action' => 'index']);
$router->add('admin/posts', ['controller' => 'AdminController', 'action' => 'posts']);
$router->add('admin/posts/add', ['controller' => 'AdminController', 'action' => 'addPost']);
$router->add('admin/posts/edit/{id}', ['controller' => 'AdminController', 'action' => 'editPost']);
$router->add('admin/comments', ['controller' => 'AdminController', 'action' => 'comments']);
$router->add('admin/requests', ['controller' => 'AdminController', 'action' => 'requests']);

// مسیرهای نصب‌کننده خودکار
$router->add('install', ['controller' => 'InstallController', 'action' => 'index']);
$router->add('install/run', ['controller' => 'InstallController', 'action' => 'run']);

// دریافت آدرس ورودی و اجرای روت مربوطه
$url = isset($_GET['url']) ? $_GET['url'] : '';
$router->dispatch($url);`
  },
  {
    path: 'core/Router.php',
    description: 'موتور مسیریابی (Routing Engine) - آدرس‌های ورودی کاربر را تجزیه کرده و با تطبیق الگوهای منظم (Regex) به کنترلر و متد هدف متصل می‌کند.',
    code: `<?php
class Router {
    protected $routes = [];

    public function add($route, $params = []) {
        $route = preg_replace('/^\\//', '', $route);
        $route = preg_replace('/\\//', '\\\\/', $route);
        $route = preg_replace('/\\{([a-z0-9_]+)\\}/', '(?P<\\1>[a-z0-9-]+)', $route);
        $route = '/^' . $route . '$/i';

        $this->routes[$route] = $params;
    }

    public function dispatch($url) {
        $url = $this->removeQueryStringVariables($url);

        // بررسی وضعیت نصب سیستم
        $configFile = __DIR__ . '/../config/database.php';
        if (!file_exists($configFile) && strpos($url, 'install') === false) {
            header('Location: /install');
            exit();
        }

        foreach ($this->routes as $route => $params) {
            if (preg_match($route, $url, $matches)) {
                foreach ($matches as $key => $value) {
                    if (is_string($key)) {
                        $params[$key] = $value;
                    }
                }

                $controllerName = $params['controller'];
                $actionName = $params['action'];

                $controllerFile = __DIR__ . '/../controllers/' . $controllerName . '.php';
                if (file_exists($controllerFile)) {
                    require_once $controllerFile;
                    $controller = new $controllerName();

                    if (method_exists($controller, $actionName)) {
                        unset($params['controller']);
                        unset($params['action']);
                        
                        call_user_func_array([$controller, $actionName], [$params]);
                        return;
                    }
                }
            }
        }
        $this->renderError(404, "صفحه مورد نظر یافت نشد.");
    }
}`
  },
  {
    path: 'core/Database.php',
    description: 'کلاس مدیریت دیتابیس با الگوی طراحی Singleton و کتابخانه امن PDO جهت برقراری ارتباط با MySQL.',
    code: `<?php
class Database {
    private static $instance = null;
    private $conn;

    private function __construct() {
        $configFile = __DIR__ . '/../config/database.php';
        if (!file_exists($configFile)) {
            header('Location: /install');
            exit();
        }
        $config = require $configFile;

        try {
            $dsn = "mysql:host=" . $config['host'] . ";dbname=" . $config['dbname'] . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $this->conn = new PDO($dsn, $config['username'], $config['password'], $options);
        } catch (PDOException $e) {
            die("اتصال به دیتابیس با خطا مواجه شد: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->conn;
    }
}`
  },
  {
    path: 'controllers/InstallController.php',
    description: 'کنترلر نصب خودکار (WordPress-like Installer) - دریافت اطلاعات هاست و دیتابیس، ساخت جداول، ایجاد ادمین ارشد و ساخت خودکار فایل کانفیگ.',
    code: `<?php
class InstallController extends Controller {
    public function index() {
        $configFile = __DIR__ . '/../config/database.php';
        if (file_exists($configFile)) {
            $this->redirect('/');
        }
        $this->view('install');
    }

    public function run() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') { $this->redirect('/install'); }

        $host = $_POST['db_host'] ?? 'localhost';
        $dbname = $_POST['db_name'] ?? '';
        $username = $_POST['db_user'] ?? '';
        $password = $_POST['db_pass'] ?? '';
        $adminUser = $_POST['admin_user'] ?? 'admin';
        $adminPass = $_POST['admin_pass'] ?? '';

        try {
            $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);
            
            // ساخت دیتابیس و جداول اصلی
            $pdo->exec("CREATE DATABASE IF NOT EXISTS \`$dbname\` CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci");
            $pdo->exec("USE \`$dbname\`");

            // اجرای کدهای ساخت جدول (جداول users, categories, posts, comments, service_requests)
            // ... (ساخت خودکار جداول مطابق فایل SQL)

            // رمزنگاری امن پسورد مدیر با Bcrypt
            $hashedPass = password_hash($adminPass, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("INSERT INTO users (username, password, full_name) VALUES (:u, :p, :n)");
            $stmt->execute(['u' => $adminUser, 'p' => $hashedPass, 'n' => 'مدیر سیستم']);

            // ساخت فایل تنظیمات دیتابیس
            $configContent = "<?php\\nreturn [ 'host' => '$host', 'dbname' => '$dbname', 'username' => '$username', 'password' => '$password' ];";
            file_put_contents(__DIR__ . '/../config/database.php', $configContent);

            $_SESSION['install_success'] = "راه‌اندازی با موفقیت انجام شد!";
            $this->redirect('/login');
        } catch (PDOException $e) {
            $this->view('install', ['error' => 'خطا در دیتابیس: ' . $e->getMessage()]);
        }
    }
}`
  },
  {
    path: 'models/Comment.php',
    description: 'مدل نظرات و دیدگاه‌ها - واکشی نظرات تایید شده برای نمایش در سایت و مدیریت همه‌جانبه برای ادمین.',
    code: `<?php
class Comment extends Model {
    public function getApprovedByPostId($postId) {
        $stmt = $this->db->prepare("SELECT * FROM comments 
                                   WHERE post_id = :post_id AND is_approved = 1 
                                   ORDER BY id DESC");
        $stmt->execute(['post_id' => $postId]);
        return $stmt->fetchAll();
    }

    public function create($data) {
        $stmt = $this->db->prepare("INSERT INTO comments (post_id, author_name, content, is_approved) 
                                   VALUES (:post_id, :author_name, :content, :is_approved)");
        return $stmt->execute([
            'post_id' => $data['post_id'],
            'author_name' => $data['author_name'],
            'content' => $data['content'],
            'is_approved' => $data['is_approved'] ?? 0
        ]);
    }

    public function approve($id) {
        $stmt = $this->db->prepare("UPDATE comments SET is_approved = 1 WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM comments WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}`
  },
  {
    path: 'database.sql',
    description: 'کدهای ساختار پایگاه داده (MySQL Schema) - شامل تعاریف جداول کاربران، مقالات، دسته‌بندی‌ها، نظرات و کلیدهای خارجی ارتباطی.',
    code: `-- ساخت پایگاه داده آکادمی مالی اروند
CREATE DATABASE IF NOT EXISTS \`arvand_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci;
USE \`arvand_db\`;

-- جدول کاربران پنل مدیریت
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL,
  \`full_name\` VARCHAR(100) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- جدول مقالات و اخبار مالی
CREATE TABLE IF NOT EXISTS \`posts\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL UNIQUE,
  \`summary\` TEXT NOT NULL,
  \`content\` LONGTEXT NOT NULL,
  \`category_id\` INT,
  \`views\` INT DEFAULT 0,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;`
  }
];
