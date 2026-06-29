<?php
require_once __DIR__ . '/../core/Model.php';

class Request extends Model {
    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM service_requests ORDER BY id DESC");
        return $stmt->fetchAll();
    }

    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM service_requests WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function create($data) {
        $stmt = $this->db->prepare("INSERT INTO service_requests 
            (full_name, company_name, position, phone, email, city, business_type, business_status, request_subject, priority, annual_turnover, complexity, description, contact_method) 
            VALUES (:full_name, :company_name, :position, :phone, :email, :city, :business_type, :business_status, :request_subject, :priority, :annual_turnover, :complexity, :description, :contact_method)");
        
        return $stmt->execute([
            'full_name' => $data['full_name'],
            'company_name' => $data['company_name'] ?? null,
            'position' => $data['position'] ?? null,
            'phone' => $data['phone'],
            'email' => $data['email'] ?? null,
            'city' => $data['city'] ?? null,
            'business_type' => $data['business_type'] ?? null,
            'business_status' => $data['business_status'] ?? null,
            'request_subject' => $data['request_subject'] ?? null,
            'priority' => $data['priority'] ?? 'immediate',
            'annual_turnover' => $data['annual_turnover'] ?? null,
            'complexity' => $data['complexity'] ?? 'simple',
            'description' => $data['description'],
            'contact_method' => $data['contact_method'] ?? 'phone'
        ]);
    }

    public function updateStatus($id, $status) {
        $stmt = $this->db->prepare("UPDATE service_requests SET status = :status WHERE id = :id");
        return $stmt->execute(['status' => $status, 'id' => $id]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM service_requests WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
