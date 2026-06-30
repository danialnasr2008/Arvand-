<?php
class Controller {
    protected $db;
    
    public function __construct() {
        try {
            $this->db = Database::getInstance();
        } catch(Exception $e) {
            $this->db = null;
        }
    }

    public function view($view, $data = []) {
        extract($data);
        global $ACADEMY_INFO, $SERVICES_LIST, $INITIAL_CATEGORIES;
        
        ob_start();
        require_once __DIR__ . '/../views/' . $view . '.php';
        $content = ob_get_clean();
        
        if ($view !== 'setup' && $view !== 'login') {
            require_once __DIR__ . '/../views/layout.php';
        } else {
            echo $content;
        }
    }

    public function redirect($url) {
        header("Location: " . BASE_URL . ltrim($url, '/'));
        exit;
    }
    
    public function isLoggedIn() {
        return isset($_SESSION['user_id']);
    }
}
