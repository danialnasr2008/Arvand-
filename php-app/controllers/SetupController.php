<?php
class SetupController extends Controller {
    public function index() {
        if ($this->db) {
            try {
                $userCount = $this->db->query("SELECT COUNT(*) FROM users")->fetchColumn();
                if ($userCount > 0) {
                    $this->redirect('home');
                }
            } catch(Exception $e) {}
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $dbHost = $_POST['db_host'] ?? 'localhost';
            $dbName = $_POST['db_name'] ?? '';
            $dbUser = $_POST['db_user'] ?? '';
            $dbPass = $_POST['db_pass'] ?? '';
            
            $adminUser = $_POST['admin_user'] ?? '';
            $adminPass = $_POST['admin_pass'] ?? '';
            
            if ($dbHost && $dbName && $dbUser && $adminUser && $adminPass) {
                try {
                    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
                    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    
                    // Write to config.php
                    $configContent = "<?php\n"
                                   . "define('DB_HOST', " . var_export($dbHost, true) . ");\n"
                                   . "define('DB_NAME', " . var_export($dbName, true) . ");\n"
                                   . "define('DB_USER', " . var_export($dbUser, true) . ");\n"
                                   . "define('DB_PASS', " . var_export($dbPass, true) . ");\n\n"
                                   . "\$scriptName = \$_SERVER['SCRIPT_NAME'] ?? '/index.php';\n"
                                   . "\$baseUrl = str_replace('index.php', '', \$scriptName);\n"
                                   . "define('BASE_URL', \$baseUrl);\n";
                    file_put_contents(__DIR__ . '/../config/config.php', $configContent);
                    
                    // Init tables
                    $this->initTables($pdo);
                    
                    // Insert admin user
                    $hash = password_hash($adminPass, PASSWORD_DEFAULT);
                    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
                    $stmt->execute([$adminUser, $hash]);
                    
                    $_SESSION['success_msg'] = 'سیستم با موفقیت نصب شد. لطفاً وارد شوید.';
                    $this->redirect('login');
                } catch(Exception $e) {
                    $_SESSION['error_msg'] = 'خطا در اتصال به دیتابیس: ' . $e->getMessage();
                }
            } else {
                $_SESSION['error_msg'] = 'لطفا تمام فیلدها را پر کنید.';
            }
        }

        $this->view('setup');
    }

    private function initTables($pdo) {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'admin'
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

            CREATE TABLE IF NOT EXISTS posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                summary TEXT,
                content TEXT,
                image_url LONGTEXT,
                category_id INT,
                is_special TINYINT(1) DEFAULT 0,
                views INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

            CREATE TABLE IF NOT EXISTS requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                company_name VARCHAR(255),
                position VARCHAR(255),
                phone VARCHAR(50) NOT NULL,
                email VARCHAR(255),
                city VARCHAR(100),
                business_type VARCHAR(100),
                business_status VARCHAR(100),
                request_subject VARCHAR(255),
                priority VARCHAR(50),
                annual_turnover VARCHAR(100),
                complexity VARCHAR(50),
                description TEXT,
                contact_method VARCHAR(50),
                status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            
            CREATE TABLE IF NOT EXISTS comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                post_id INT NOT NULL,
                author_name VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                is_approved TINYINT(1) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");
    }
}
