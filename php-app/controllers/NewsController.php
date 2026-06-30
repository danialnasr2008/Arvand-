<?php
class NewsController extends Controller {
    public function index() {
        global $INITIAL_CATEGORIES;
        $catFilter = isset($_GET['cat']) ? (int)$_GET['cat'] : null;
        $search = isset($_GET['search']) ? trim($_GET['search']) : '';
        
        $newsCatIds = array_map(function($c) { return $c['id']; }, array_filter($INITIAL_CATEGORIES, function($c) { return $c['type'] === 'news'; }));
        
        if (empty($newsCatIds)) {
            $inClause = "0"; // fallback
        } else {
            $inClause = implode(',', $newsCatIds);
        }
        
        $query = "SELECT * FROM posts WHERE category_id IN ($inClause)";
        $params = [];
        
        if ($catFilter) {
            $query .= " AND category_id = ?";
            $params[] = $catFilter;
        }
        if ($search) {
            $query .= " AND (title LIKE ? OR content LIKE ?)";
            $params[] = "%$search%";
            $params[] = "%$search%";
        }
        $query .= " ORDER BY id DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        $posts = $stmt->fetchAll();
        
        $this->view('news', [
            'posts' => $posts,
            'categories' => $INITIAL_CATEGORIES,
            'catFilter' => $catFilter,
            'search' => $search
        ]);
    }
}
