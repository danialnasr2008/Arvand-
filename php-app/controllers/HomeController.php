<?php
class HomeController extends Controller {
    public function index() {
        $postModel = $this->model('Post');
        // Get latest 3 posts for the homepage
        $posts = $postModel->getAll();
        $latestPosts = array_slice($posts, 0, 3);
        
        $this->view('home', ['latestPosts' => $latestPosts]);
    }

    public function about() {
        $this->view('about');
    }

    public function services() {
        $this->view('services');
    }

    public function contact() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $requestModel = $this->model('Request');
            
            $data = [
                'full_name' => $_POST['full_name'] ?? '',
                'company_name' => $_POST['company_name'] ?? null,
                'position' => $_POST['position'] ?? null,
                'phone' => $_POST['phone'] ?? '',
                'email' => $_POST['email'] ?? null,
                'city' => $_POST['city'] ?? null,
                'business_type' => $_POST['business_type'] ?? null,
                'business_status' => $_POST['business_status'] ?? null,
                'request_subject' => $_POST['request_subject'] ?? null,
                'priority' => $_POST['priority'] ?? 'immediate',
                'annual_turnover' => $_POST['annual_turnover'] ?? null,
                'complexity' => $_POST['complexity'] ?? 'simple',
                'description' => $_POST['description'] ?? '',
                'contact_method' => $_POST['contact_method'] ?? 'phone'
            ];

            if (empty($data['full_name']) || empty($data['phone']) || empty($data['description'])) {
                $this->view('contact', ['error' => 'لطفاً مقادیر الزامی (نام، شماره تماس و توضیحات) را وارد کنید.', 'submitted' => $data]);
                return;
            }

            if ($requestModel->create($data)) {
                $this->view('contact', ['success' => 'درخواست دریافت خدمات شما با موفقیت ثبت شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.']);
            } else {
                $this->view('contact', ['error' => 'خطایی در ثبت درخواست رخ داد. لطفاً مجدداً تلاش کنید.', 'submitted' => $data]);
            }
        } else {
            $this->view('contact');
        }
    }
}
