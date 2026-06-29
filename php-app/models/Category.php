<?php
require_once __DIR__ . '/../core/Model.php';

class Category extends Model {
    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM categories ORDER BY id ASC");
        return $stmt->fetchAll();
    }

    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM categories WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function create($name, $slug) {
        $stmt = $this->db->prepare("INSERT INTO categories (name, slug) VALUES (:name, :slug)");
        return $stmt->execute(['name' => $name, 'slug' => $slug]);
    }
}
