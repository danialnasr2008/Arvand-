<?php
require_once __DIR__ . '/../core/Model.php';

class Post extends Model {
    public function getAll($categoryId = null) {
        if ($categoryId) {
            $stmt = $this->db->prepare("SELECT p.*, c.name as category_name 
                                       FROM posts p 
                                       LEFT JOIN categories c ON p.category_id = c.id 
                                       WHERE p.category_id = :cat_id 
                                       ORDER BY p.id DESC");
            $stmt->execute(['cat_id' => $categoryId]);
        } else {
            $stmt = $this->db->query("SELECT p.*, c.name as category_name 
                                     FROM posts p 
                                     LEFT JOIN categories c ON p.category_id = c.id 
                                     ORDER BY p.id DESC");
        }
        return $stmt->fetchAll();
    }

    public function getBySlug($slug) {
        $stmt = $this->db->prepare("SELECT p.*, c.name as category_name 
                                   FROM posts p 
                                   LEFT JOIN categories c ON p.category_id = c.id 
                                   WHERE p.slug = :slug LIMIT 1");
        $stmt->execute(['slug' => $slug]);
        return $stmt->fetch();
    }

    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM posts WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function incrementViews($id) {
        $stmt = $this->db->prepare("UPDATE posts SET views = views + 1 WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }

    public function create($data) {
        $stmt = $this->db->prepare("INSERT INTO posts (title, slug, summary, content, category_id, image_url) 
                                   VALUES (:title, :slug, :summary, :content, :category_id, :image_url)");
        return $stmt->execute([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'summary' => $data['summary'],
            'content' => $data['content'],
            'category_id' => $data['category_id'],
            'image_url' => $data['image_url']
        ]);
    }

    public function update($id, $data) {
        $stmt = $this->db->prepare("UPDATE posts SET 
                                    title = :title, 
                                    slug = :slug, 
                                    summary = :summary, 
                                    content = :content, 
                                    category_id = :category_id, 
                                    image_url = :image_url 
                                    WHERE id = :id");
        return $stmt->execute([
            'id' => $id,
            'title' => $data['title'],
            'slug' => $data['slug'],
            'summary' => $data['summary'],
            'content' => $data['content'],
            'category_id' => $data['category_id'],
            'image_url' => $data['image_url']
        ]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM posts WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
