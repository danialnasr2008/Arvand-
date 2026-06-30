<?php
session_start();

require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/core/Database.php';
require_once __DIR__ . '/core/Controller.php';
require_once __DIR__ . '/core/Router.php';
require_once __DIR__ . '/data.php';

// Helper function used in views/layout.php
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

$router = new Router();
$router->route();
