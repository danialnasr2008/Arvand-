<?php
class InstallController extends Controller {
    public function index() {
        $configFile = __DIR__ . '/../config/database.php';
        if (file_exists($configFile)) {
            $this->redirect('/');
        }
        $this->view('install');
    }

    public function run() {
        $configFile = __DIR__ . '/../config/database.php';
        if (file_exists($configFile)) {
            $this->redirect('/');
        }

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/install');
        }

        $host = $_POST['db_host'] ?? 'localhost';
        $dbname = $_POST['db_name'] ?? '';
        $username = $_POST['db_user'] ?? '';
        $password = $_POST['db_pass'] ?? '';
        
        $adminUser = $_POST['admin_user'] ?? 'admin';
        $adminPass = $_POST['admin_pass'] ?? '';
        $adminName = $_POST['admin_name'] ?? 'مدیر سیستم';
        $adminEmail = $_POST['admin_email'] ?? '';

        if (empty($dbname) || empty($username) || empty($adminPass)) {
            $this->view('install', ['error' => 'لطفاً تمامی فیلدهای الزامی را پر کنید.']);
            return;
        }

        try {
            // 1. Test Connection
            $dsn = "mysql:host=$host;charset=utf8mb4";
            $pdo = new PDO($dsn, $username, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);

            // 2. Create Database if not exists
            $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci");
            $pdo->exec("USE `$dbname`");

            // 3. Create Tables
            $queries = [
                "CREATE TABLE IF NOT EXISTS `users` (
                  `id` INT AUTO_INCREMENT PRIMARY KEY,
                  `username` VARCHAR(50) NOT NULL UNIQUE,
                  `password` VARCHAR(255) NOT NULL,
                  `full_name` VARCHAR(100) NOT NULL,
                  `email` VARCHAR(100) NULL,
                  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci",

                "CREATE TABLE IF NOT EXISTS `categories` (
                  `id` INT AUTO_INCREMENT PRIMARY KEY,
                  `name` VARCHAR(100) NOT NULL,
                  `slug` VARCHAR(100) NOT NULL UNIQUE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci",

                "CREATE TABLE IF NOT EXISTS `posts` (
                  `id` INT AUTO_INCREMENT PRIMARY KEY,
                  `title` VARCHAR(255) NOT NULL,
                  `slug` VARCHAR(255) NOT NULL UNIQUE,
                  `summary` TEXT NOT NULL,
                  `content` LONGTEXT NOT NULL,
                  `category_id` INT,
                  `image_url` VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
                  `views` INT DEFAULT 0,
                  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci",

                "CREATE TABLE IF NOT EXISTS `comments` (
                  `id` INT AUTO_INCREMENT PRIMARY KEY,
                  `post_id` INT NOT NULL,
                  `author_name` VARCHAR(100) NOT NULL,
                  `content` TEXT NOT NULL,
                  `is_approved` TINYINT(1) DEFAULT 0,
                  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci",

                "CREATE TABLE IF NOT EXISTS `service_requests` (
                  `id` INT AUTO_INCREMENT PRIMARY KEY,
                  `full_name` VARCHAR(150) NOT NULL,
                  `company_name` VARCHAR(150) NULL,
                  `position` VARCHAR(100) NULL,
                  `phone` VARCHAR(20) NOT NULL,
                  `email` VARCHAR(100) NULL,
                  `city` VARCHAR(100) NULL,
                  `business_type` VARCHAR(100) NULL,
                  `business_status` VARCHAR(100) NULL,
                  `request_subject` VARCHAR(100) NULL,
                  `priority` VARCHAR(50) NOT NULL DEFAULT 'immediate',
                  `annual_turnover` VARCHAR(100) NULL,
                  `complexity` VARCHAR(50) NOT NULL DEFAULT 'simple',
                  `description` TEXT NOT NULL,
                  `contact_method` VARCHAR(50) NOT NULL DEFAULT 'phone',
                  `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
                  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci"
            ];

            foreach ($queries as $q) {
                $pdo->exec($q);
            }

            // 4. Seed Default Categories
            $categories = [
                ['name' => 'عمومی', 'slug' => 'general'],
                ['name' => 'مالیات و مودیان', 'slug' => 'tax-laws'],
                ['name' => 'حسابداری و مالی', 'slug' => 'accounting'],
                ['name' => 'قوانین کار و بیمه', 'slug' => 'labor-laws'],
                ['name' => 'سرمایه‌گذاری و بودجه', 'slug' => 'investment']
            ];

            $stmt = $pdo->prepare("INSERT IGNORE INTO categories (name, slug) VALUES (:name, :slug)");
            foreach ($categories as $cat) {
                $stmt->execute($cat);
            }

            // 5. Create Admin User
            $hashedPass = password_hash($adminPass, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("INSERT INTO users (username, password, full_name, email) VALUES (:username, :password, :full_name, :email)");
            $stmt->execute([
                'username' => $adminUser,
                'password' => $hashedPass,
                'full_name' => $adminName,
                'email' => $adminEmail
            ]);

            // 6. Seed first default post
            $firstPost = [
                'title' => 'راهنمای جامع قانون جدید سامانه مودیان و پایانه‌های فروشگاهی',
                'slug' => 'taxpayers-system-guide',
                'summary' => 'در این مقاله به بررسی تکالیف قانونی مودیان، نحوه صدور صورتحساب الکترونیکی، و جرایم عدم عضویت در سامانه مودیان پرداخته‌ایم.',
                'content' => 'این نخستین مقاله آزمایشی آکادمی مالی اروند است که به صورت خودکار در سیستم ثبت شده است. مودیان گرامی می‌توانند با مراجعه به پنل کاربری نسبت به ویرایش یا ایجاد مقالات جدید اقدام فرمایند.',
                'category_id' => 2,
                'image_url' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200'
            ];
            $stmt = $pdo->prepare("INSERT IGNORE INTO posts (title, slug, summary, content, category_id, image_url) VALUES (:title, :slug, :summary, :content, :category_id, :image_url)");
            $stmt->execute($firstPost);

            // 7. Write database config file
            if (!is_dir(__DIR__ . '/../config')) {
                mkdir(__DIR__ . '/../config', 0755, true);
            }

            $configContent = "<?php\n"
                           . "return [\n"
                           . "    'host' => '" . addslashes($host) . "',\n"
                           . "    'dbname' => '" . addslashes($dbname) . "',\n"
                           . "    'username' => '" . addslashes($username) . "',\n"
                           . "    'password' => '" . addslashes($password) . "',\n"
                           . "];\n";

            file_put_contents($configFile, $configContent);

            $_SESSION['install_success'] = "راه‌اندازی سیستم با موفقیت انجام شد! اکنون می‌توانید وارد پنل مدیریت شوید.";
            $this->redirect('/login');

        } catch (PDOException $e) {
            $this->view('install', ['error' => 'خطا در ارتباط با پایگاه داده: ' . $e->getMessage()]);
        }
    }
}
