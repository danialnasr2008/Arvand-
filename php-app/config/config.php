<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'arvand_db'); // نام دیتابیس خود را اینجا وارد کنید
define('DB_USER', 'root'); // نام کاربری دیتابیس
define('DB_PASS', ''); // رمز عبور دیتابیس

$scriptName = $_SERVER['SCRIPT_NAME'] ?? '/index.php';
$baseUrl = str_replace('index.php', '', $scriptName);
define('BASE_URL', $baseUrl);
