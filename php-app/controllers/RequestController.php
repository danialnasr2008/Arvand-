<?php
class RequestController extends Controller {
    public function index() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $full_name = $_POST['full_name'];
            $company_name = $_POST['company_name'];
            $position = $_POST['position'];
            $phone = $_POST['phone'];
            $email = $_POST['email'];
            $city = $_POST['city'];
            $business_type = $_POST['business_type'];
            $business_status = $_POST['business_status'];
            $request_subject = $_POST['request_subject'];
            $priority = $_POST['priority'];
            $annual_turnover = $_POST['annual_turnover'];
            $complexity = $_POST['complexity'];
            $description = $_POST['description'];
            $contact_method = $_POST['contact_method'];

            $stmt = $this->db->prepare("INSERT INTO requests (full_name, company_name, position, phone, email, city, business_type, business_status, request_subject, priority, annual_turnover, complexity, description, contact_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
            $stmt->execute([$full_name, $company_name, $position, $phone, $email, $city, $business_type, $business_status, $request_subject, $priority, $annual_turnover, $complexity, $description, $contact_method]);
            
            $_SESSION['success_msg'] = 'درخواست شما با موفقیت ثبت شد.';
            $this->redirect('request');
        }
        $this->view('request');
    }
}
