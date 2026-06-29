<?php
class Database {
    private static $instance = null;
    private $conn;

    private function __construct() {
        $configFile = __DIR__ . '/../config/database.php';
        
        if (!file_exists($configFile)) {
            // If the database configuration does not exist, redirect to installer
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
            
            // Set Persian time and charset
            $this->conn->exec("SET NAMES utf8mb4 COLLATE utf8mb4_persian_ci");
        } catch (PDOException $e) {
            die("اتصال به دیتابیس با خطا مواجه شد. لطفاً مشخصات فایل config/database.php را بررسی کنید. خطا: " . $e->getMessage());
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
}
