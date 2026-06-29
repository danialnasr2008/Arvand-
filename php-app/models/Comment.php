<?php
require_once __DIR__ . '/../core/Model.php';

class Comment extends Model {
    public function getApprovedByPostId($postId) {
        $stmt = $this->db->prepare("SELECT * FROM comments 
                                   WHERE post_id = :post_id AND is_approved = 1 
                                   ORDER BY id DESC");
        $stmt->execute(['post_id' => $postId]);
        return $stmt->fetchAll();
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT c.*, p.title as post_title 
                                 FROM comments c 
                                 JOIN posts p ON c.post_id = p.id 
                                 ORDER BY c.id DESC");
        return $stmt->fetchAll();
    }

    public function create($data) {
        $stmt = $this->db->prepare("INSERT INTO comments (post_id, author_name, content, is_approved) 
                                   VALUES (:post_id, :author_name, :content, :is_approved)");
        return $stmt->execute([
            'post_id' => $data['post_id'],
            'author_name' => $data['author_name'],
            'content' => $data['content'],
            'is_approved' => $data['is_approved'] ?? 0
        ]);
    }

    public function approve($id) {
        $stmt = $this->db->prepare("UPDATE comments SET is_approved = 1 WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM comments WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
