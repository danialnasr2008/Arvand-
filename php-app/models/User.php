<?php
require_once __DIR__ . '/../core/Model.php';

class User extends Model {
    public function getById($id) {
        $stmt = $this->db->prepare("SELECT id, username, full_name, email FROM users WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function getByUsername($username) {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE username = :username LIMIT 1");
        $stmt->execute(['username' => $username]);
        return $stmt->fetch();
    }

    public function create($username, $password, $fullName, $email = null) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->db->prepare("INSERT INTO users (username, password, full_name, email) 
                                   VALUES (:username, :password, :full_name, :email)");
        return $stmt->execute([
            'username' => $username,
            'password' => $hashedPassword,
            'full_name' => $fullName,
            'email' => $email
        ]);
    }

    public function login($username, $password) {
        $user = $this->getByUsername($username);
        if ($user && password_verify($password, $user['password'])) {
            // Store details in session
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_user_id'] = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            $_SESSION['admin_full_name'] = $user['full_name'];
            return $user;
        }
        return false;
    }

    public static function isLoggedIn() {
        return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
    }

    public static function requireLogin() {
        if (!self::isLoggedIn()) {
            header('Location: /login');
            exit();
        }
    }
}
