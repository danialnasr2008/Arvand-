<?php
class HomeController extends Controller {
    public function index() {
        $stmt = $this->db->query("SELECT * FROM posts ORDER BY id DESC LIMIT 6");
        $latest_posts = $stmt->fetchAll();
        $this->view('home', ['latest_posts' => $latest_posts]);
    }
    
    public function notFound() {
        echo "<h1 class='text-center mt-10 text-2xl font-bold' style='font-family:Vazirmatn,sans-serif;'>صفحه پیدا نشد 404</h1>";
    }
}
