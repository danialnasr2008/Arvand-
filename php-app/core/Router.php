<?php
class Router {
    public function route() {
        $url = isset($_GET['url']) ? rtrim($_GET['url'], '/') : 'home';
        $urlParts = explode('/', $url);
        
        $controllerName = ucfirst($urlParts[0]) . 'Controller';
        $methodName = $urlParts[1] ?? 'index';
        
        $controllerFile = __DIR__ . '/../controllers/' . $controllerName . '.php';
        
        // Enforce Setup Wizard
        $needsSetup = false;
        try {
            $db = Database::getInstance();
            $userCount = $db->query("SELECT COUNT(*) FROM users")->fetchColumn();
            if ($userCount == 0) {
                $needsSetup = true;
            }
        } catch(Exception $e) {
            $needsSetup = true;
        }
        
        if ($needsSetup && strtolower($urlParts[0]) !== 'setup') {
            header("Location: " . BASE_URL . "setup");
            exit;
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
