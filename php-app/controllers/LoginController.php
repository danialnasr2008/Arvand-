<?php
class LoginController extends Controller {
    public function index() {
        if ($this->isLoggedIn()) {
            $this->redirect('admin');
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $username = $_POST['username'] ?? '';
            $password = $_POST['password'] ?? '';
            $stmt = $this->db->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch();
            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $this->redirect('admin');
            } else {
                $_SESSION['error'] = 'نام کاربری یا رمز عبور اشتباه است.';
                $this->redirect('login');
            }
        }
        
        $this->view('login');
    }
}
