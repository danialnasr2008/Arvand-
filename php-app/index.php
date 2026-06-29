<?php
/**
 * Arvand Financial Academy - PHP MVC Entry Point
 * Front Controller Pattern
 */

// Start session securely
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Display errors for debugging (Disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Autoload Core classes
require_once __DIR__ . '/core/Router.php';
require_once __DIR__ . '/core/Controller.php';
require_once __DIR__ . '/core/Model.php';

// Instantiate Router
$router = new Router();

// 1. Public Routes
$router->add('', ['controller' => 'HomeController', 'action' => 'index']);
$router->add('about', ['controller' => 'HomeController', 'action' => 'about']);
$router->add('services', ['controller' => 'HomeController', 'action' => 'services']);
$router->add('contact', ['controller' => 'HomeController', 'action' => 'contact']);
$router->add('blog', ['controller' => 'BlogController', 'action' => 'index']);
$router->add('post/{slug}', ['controller' => 'BlogController', 'action' => 'post']);
$router->add('comment/add', ['controller' => 'BlogController', 'action' => 'addComment']);

// 2. Auth Routes
$router->add('login', ['controller' => 'AdminController', 'action' => 'login']);
$router->add('logout', ['controller' => 'AdminController', 'action' => 'logout']);

// 3. Admin Panel Routes
$router->add('admin', ['controller' => 'AdminController', 'action' => 'index']);
$router->add('admin/posts', ['controller' => 'AdminController', 'action' => 'posts']);
$router->add('admin/posts/add', ['controller' => 'AdminController', 'action' => 'addPost']);
$router->add('admin/posts/edit/{id}', ['controller' => 'AdminController', 'action' => 'editPost']);
$router->add('admin/posts/delete/{id}', ['controller' => 'AdminController', 'action' => 'deletePost']);
$router->add('admin/comments', ['controller' => 'AdminController', 'action' => 'comments']);
$router->add('admin/comments/approve/{id}', ['controller' => 'AdminController', 'action' => 'approveComment']);
$router->add('admin/comments/delete/{id}', ['controller' => 'AdminController', 'action' => 'deleteComment']);
$router->add('admin/requests', ['controller' => 'AdminController', 'action' => 'requests']);
$router->add('admin/requests/export', ['controller' => 'AdminController', 'action' => 'exportRequests']);
$router->add('admin/requests/view/{id}', ['controller' => 'AdminController', 'action' => 'viewRequest']);

// 4. Automated Installer Routes
$router->add('install', ['controller' => 'InstallController', 'action' => 'index']);
$router->add('install/run', ['controller' => 'InstallController', 'action' => 'run']);

// Get incoming URL and dispatch
$url = isset($_GET['url']) ? $_GET['url'] : '';
$router->dispatch($url);
