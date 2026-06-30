<?php
class SetupController extends Controller {
    public function index() {
        try {
            $userCount = $this->db->query("SELECT COUNT(*) FROM users")->fetchColumn();
            if ($userCount > 0) {
                $this->redirect('home');
            }
        } catch(Exception $e) {}

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $adminUser = $_POST['admin_user'];
            $adminPass = $_POST['admin_pass'];
            
            if($adminUser && $adminPass) {
                $hash = password_hash($adminPass, PASSWORD_DEFAULT);
                $stmt = $this->db->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
                $stmt->execute([$adminUser, $hash]);
                $_SESSION['success_msg'] = 'سیستم با موفقیت نصب شد. لطفاً وارد شوید.';
            }
            $this->redirect('login');
        }

        $this->view('setup');
    }
}
