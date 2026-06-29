<?php
class Router {
    protected $routes = [];

    public function add($route, $params = []) {
        // Convert the route to a regular expression
        $route = preg_replace('/^\//', '', $route);
        $route = preg_replace('/\//', '\\/', $route);
        $route = preg_replace('/\{([a-z0-9_]+)\}/', '(?P<\1>[a-z0-9-]+)', $route);
        $route = '/^' . $route . '$/i';

        $this->routes[$route] = $params;
    }

    public function dispatch($url) {
        $url = $this->removeQueryStringVariables($url);

        // Check if the system is installed, if not, force routing to install controller
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

                // Load the controller file
                $controllerFile = __DIR__ . '/../controllers/' . $controllerName . '.php';
                if (file_exists($controllerFile)) {
                    require_once $controllerFile;
                    $controller = new $controllerName();

                    if (method_exists($controller, $actionName)) {
                        // Pass parameters as an array
                        unset($params['controller']);
                        unset($params['action']);
                        
                        call_user_func_array([$controller, $actionName], [$params]);
                        return;
                    } else {
                        $this->renderError(404, "متد $actionName در کنترلر $controllerName پیدا نشد.");
                        return;
                    }
                } else {
                    $this->renderError(404, "کنترلر $controllerName یافت نشد.");
                    return;
                }
            }
        }

        $this->renderError(404, "صفحه مورد نظر یافت نشد.");
    }

    protected function removeQueryStringVariables($url) {
        if ($url != '') {
            $parts = explode('&', $url, 2);
            if (strpos($parts[0], '=') === false) {
                $url = $parts[0];
            } else {
                $url = '';
            }
        }
        return trim($url, '/');
    }

    protected function renderError($code, $message) {
        http_response_code($code);
        echo "<div style='direction:rtl; font-family:tahoma,arial; text-align:center; padding:50px;'>";
        echo "<h1 style='color:#e53e3e;'>خطای $code</h1>";
        echo "<p style='font-size:18px; color:#4a5568;'>$message</p>";
        echo "<a href='/' style='color:#3182ce; text-decoration:none;'>بازگشت به صفحه اصلی</a>";
        echo "</div>";
    }
}
