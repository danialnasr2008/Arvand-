<?php
class Database {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        $host = DB_HOST;
        $db = DB_NAME;
        $user = DB_USER;
        $pass = DB_PASS;
        
        try {
            $this->pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
            $this->initTables();
        } catch(PDOException $e) {
            die("<div style='text-align:center; margin-top: 50px; font-family: Tahoma; direction: rtl;'>
                    <h2>خطا در اتصال به دیتابیس MySQL</h2>
                    <p>" . $e->getMessage() . "</p>
                    <p>لطفاً یک دیتابیس در MySQL بسازید و اطلاعات اتصال را در فایل <b>config/config.php</b> وارد کنید.</p>
                 </div>");
        }
    }

    private function initTables() {
        $this->pdo->exec("
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

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance->pdo;
    }
}
