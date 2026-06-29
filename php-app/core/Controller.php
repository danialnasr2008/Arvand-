<?php
class Controller {
    protected function model($modelName) {
        $modelFile = __DIR__ . '/../models/' . $modelName . '.php';
        if (file_exists($modelFile)) {
            require_once $modelFile;
            return new $modelName();
        }
        die("مدل $modelName وجود ندارد.");
    }

    protected function view($viewName, $data = []) {
        $viewFile = __DIR__ . '/../views/' . $viewName . '.php';
        if (file_exists($viewFile)) {
            // Extract data array to make variables available in the view
            extract($data);
            
            // Render view
            require_once $viewFile;
        } else {
            die("نمای $viewName یافت نشد.");
        }
    }

    protected function json($data) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit();
    }

    protected function redirect($url) {
        header('Location: ' . $url);
        exit();
    }
}
