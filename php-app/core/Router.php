<?php
class Router {
    public function route() {
        $url = isset($_GET['url']) ? rtrim($_GET['url'], '/') : 'home';
        $urlParts = explode('/', $url);
        
        $controllerName = ucfirst($urlParts[0]) . 'Controller';
        $methodName = $urlParts[1] ?? 'index';
        
        $controllerFile = __DIR__ . '/../controllers/' . $controllerName . '.php';
        
        // Enforce Setup Wizard
        try {
            $db = Database::getInstance();
            $userCount = $db->query("SELECT COUNT(*) FROM users")->fetchColumn();
            if ($userCount == 0 && strtolower($urlParts[0]) !== 'setup' && strtolower($urlParts[0]) !== 'setup_action') {
                header("Location: " . BASE_URL . "setup");
                exit;
            }
        } catch(Exception $e) {
            // DB connection handles die inside Database.php
        }
        
        if (file_exists($controllerFile)) {
            require_once $controllerFile;
            $controller = new $controllerName();
            if (method_exists($controller, $methodName)) {
                $controller->$methodName();
            } else {
                echo "<h1 style='text-align:center;margin-top:50px;font-family:Vazirmatn,sans-serif;'>متد یافت نشد 404</h1>";
            }
        } else {
            require_once __DIR__ . '/../controllers/HomeController.php';
            $controller = new HomeController();
            $controller->notFound();
        }
    }
}
