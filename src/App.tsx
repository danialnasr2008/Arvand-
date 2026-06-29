import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InstallWizard from './views/InstallWizard';
import Home from './views/Home';
import About from './views/About';
import Services from './views/Services';
import RequestService from './views/RequestService';
import Blog from './views/Blog';
import News from './views/News';
import PostDetail from './views/PostDetail';
import AdminLogin from './views/AdminLogin';
import AdminPanel from './views/AdminPanel';

import { INITIAL_POSTS, INITIAL_COMMENTS, INITIAL_CATEGORIES as CATEGORIES, ACADEMY_INFO, SERVICES_LIST } from './data';
import { Post, Comment, ServiceRequest, Category } from './types';
import { Code, Landmark, ArrowLeft, Terminal, ShieldAlert } from 'lucide-react';

export function toEnglishDigits(str: string): string {
  if (!str) return '';
  const persianDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  for (let i = 0; i < 10; i++) {
    str = str.replace(persianDigits[i], i.toString());
  }
  return str;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Installation & Configuration state
  const [isInstalled, setIsInstalled] = useState(false);
  const [dbConfig, setDbConfig] = useState<any>(null);

  // Core Data States (synchronized with localStorage)
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [academyInfo, setAcademyInfo] = useState<any>(null);
  const [servicesList, setServicesList] = useState<any[]>([]);
  
  // Route Navigation
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string>('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Additional Admins list
  const [additionalAdmins, setAdditionalAdmins] = useState<{username: string, pass: string, role: string}[]>([]);

  // Status Alerts
  const [requestSuccess, setRequestSuccess] = useState('');
  const [requestError, setRequestError] = useState('');

  // 1. Initial configuration loading and dark mode synchronization
  useEffect(() => {
    // Sync dark mode preference
    const savedTheme = localStorage.getItem('arvand_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Load installation config
    const savedConfig = localStorage.getItem('arvand_installed_config');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setDbConfig(parsed);
      setIsInstalled(true);
    }

    // Load or set initial categories
    const savedCategories = localStorage.getItem('arvand_categories');
    let loadedCats: Category[] = [];
    if (savedCategories) {
      loadedCats = JSON.parse(savedCategories);
    } else {
      loadedCats = CATEGORIES;
      localStorage.setItem('arvand_categories', JSON.stringify(CATEGORIES));
    }
    setCategories(loadedCats);

    // Load or set initial posts
    const savedPosts = localStorage.getItem('arvand_posts');
    let loadedPosts: Post[] = [];
    if (savedPosts) {
      loadedPosts = JSON.parse(savedPosts);
    } else {
      // Mark some default posts as special initially (e.g. ID 1 and 2 and 5)
      loadedPosts = INITIAL_POSTS.map(p => {
        if (p.id === 1 || p.id === 2 || p.id === 5) {
          return { ...p, isSpecial: true };
        }
        return p;
      });
      localStorage.setItem('arvand_posts', JSON.stringify(loadedPosts));
    }
    // Ensure all dates are in English numbers
    loadedPosts = loadedPosts.map(p => ({
      ...p,
      createdAt: toEnglishDigits(p.createdAt)
    }));
    setPosts(loadedPosts);

    // Load or set initial comments
    const savedComments = localStorage.getItem('arvand_comments');
    let loadedComments: Comment[] = [];
    if (savedComments) {
      loadedComments = JSON.parse(savedComments);
    } else {
      loadedComments = INITIAL_COMMENTS;
      localStorage.setItem('arvand_comments', JSON.stringify(INITIAL_COMMENTS));
    }
    loadedComments = loadedComments.map(c => ({
      ...c,
      createdAt: toEnglishDigits(c.createdAt)
    }));
    setComments(loadedComments);

    // Load service requests
    const savedRequests = localStorage.getItem('arvand_requests');
    let loadedRequests: ServiceRequest[] = [];
    if (savedRequests) {
      loadedRequests = JSON.parse(savedRequests);
    }
    loadedRequests = loadedRequests.map(r => ({
      ...r,
      createdAt: toEnglishDigits(r.createdAt)
    }));
    setServiceRequests(loadedRequests);

    // Load or set initial academy info
    const savedAcademyInfo = localStorage.getItem('arvand_academy_info');
    if (savedAcademyInfo) {
      setAcademyInfo(JSON.parse(savedAcademyInfo));
    } else {
      setAcademyInfo(ACADEMY_INFO);
      localStorage.setItem('arvand_academy_info', JSON.stringify(ACADEMY_INFO));
    }

    // Load or set initial services list
    const savedServicesList = localStorage.getItem('arvand_services_list');
    if (savedServicesList) {
      setServicesList(JSON.parse(savedServicesList));
    } else {
      setServicesList(SERVICES_LIST);
      localStorage.setItem('arvand_services_list', JSON.stringify(SERVICES_LIST));
    }

    // Load additional admins
    const savedAdmins = localStorage.getItem('arvand_additional_admins');
    if (savedAdmins) {
      setAdditionalAdmins(JSON.parse(savedAdmins));
    } else {
      setAdditionalAdmins([]);
    }
  }, []);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  // 2. Theme Toggle
  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('arvand_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('arvand_theme', 'light');
    }
  };

  // 3. Complete Setup Wizard (WordPress style installation)
  const handleInstallComplete = (config: {
    host: string;
    dbName: string;
    dbUser: string;
    dbPass: string;
    adminUser: string;
    adminPass: string;
  }) => {
    localStorage.setItem('arvand_installed_config', JSON.stringify(config));
    setDbConfig(config);
    setIsInstalled(true);
    setCurrentView('home');
  };

  // 4. Admin Auth
  const handleAdminLogin = (username: string, pass: string): boolean => {
    if (dbConfig && username === dbConfig.adminUser && pass === dbConfig.adminPass) {
      setIsAdminLoggedIn(true);
      setCurrentView('admin-panel');
      return true;
    }
    const matched = additionalAdmins.find(admin => admin.username === username && admin.pass === pass);
    if (matched) {
      setIsAdminLoggedIn(true);
      setCurrentView('admin-panel');
      return true;
    }
    return false;
  };

  const handleAddAdmin = (username: string, pass: string, role: string) => {
    const newList = [...additionalAdmins, { username, pass, role }];
    setAdditionalAdmins(newList);
    localStorage.setItem('arvand_additional_admins', JSON.stringify(newList));
  };

  const handleDeleteAdmin = (username: string) => {
    const newList = additionalAdmins.filter(admin => admin.username !== username);
    setAdditionalAdmins(newList);
    localStorage.setItem('arvand_additional_admins', JSON.stringify(newList));
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentView('home');
  };

  // 5. Reset whole system config (to re-test WordPress-like install wizard)
  const handleResetSystem = () => {
    localStorage.removeItem('arvand_installed_config');
    localStorage.removeItem('arvand_posts');
    localStorage.removeItem('arvand_comments');
    localStorage.removeItem('arvand_requests');
    setDbConfig(null);
    setIsInstalled(false);
    setIsAdminLoggedIn(false);
    setPosts(INITIAL_POSTS);
    setComments(INITIAL_COMMENTS);
    setServiceRequests([]);
    setCurrentView('home');
  };

  // 6. Blog & Comment Methods
  const handleAddPost = (newPost: Omit<Post, 'id' | 'createdAt' | 'views'>) => {
    let updatedPosts = [...posts];
    
    // If marked as special, enforce maximum of 5 special posts
    if (newPost.isSpecial) {
      const specialPosts = updatedPosts.filter(p => p.isSpecial);
      if (specialPosts.length >= 5) {
        // Sort by ID ascending to find the oldest
        const sortedSpecial = [...specialPosts].sort((a, b) => a.id - b.id);
        const oldestSpecial = sortedSpecial[0];
        updatedPosts = updatedPosts.map(p => p.id === oldestSpecial.id ? { ...p, isSpecial: false } : p);
      }
    }

    const fresh: Post = {
      ...newPost,
      id: posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      createdAt: new Date().toLocaleDateString('fa-IR-u-nu-latn'),
      views: 0
    };
    
    updatedPosts = [fresh, ...updatedPosts];
    setPosts(updatedPosts);
    localStorage.setItem('arvand_posts', JSON.stringify(updatedPosts));
  };

  const handleEditPost = (id: number, updatedFields: Partial<Post>) => {
    let updatedPosts = [...posts];
    
    if (updatedFields.isSpecial) {
      const specialPosts = updatedPosts.filter(p => p.isSpecial && p.id !== id);
      if (specialPosts.length >= 5) {
        const sortedSpecial = [...specialPosts].sort((a, b) => a.id - b.id);
        const oldestSpecial = sortedSpecial[0];
        updatedPosts = updatedPosts.map(p => p.id === oldestSpecial.id ? { ...p, isSpecial: false } : p);
      }
    }

    updatedPosts = updatedPosts.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setPosts(updatedPosts);
    localStorage.setItem('arvand_posts', JSON.stringify(updatedPosts));
  };

  const handleDeletePost = (id: number) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem('arvand_posts', JSON.stringify(updated));
  };

  const handleCommentSubmit = (newComment: { postId: number; authorName: string; content: string }) => {
    const fresh: Comment = {
      ...newComment,
      id: comments.length ? Math.max(...comments.map(c => c.id)) + 1 : 1,
      createdAt: new Date().toLocaleDateString('fa-IR-u-nu-latn'),
      isApproved: false, // Moderated
    };
    const updated = [fresh, ...comments];
    setComments(updated);
    localStorage.setItem('arvand_comments', JSON.stringify(updated));
  };

  const handleApproveComment = (id: number) => {
    const updated = comments.map((c) => (c.id === id ? { ...c, isApproved: true } : c));
    setComments(updated);
    localStorage.setItem('arvand_comments', JSON.stringify(updated));
  };

  const handleDeleteComment = (id: number) => {
    const updated = comments.filter((c) => (c.id !== id));
    setComments(updated);
    localStorage.setItem('arvand_comments', JSON.stringify(updated));
  };

  // Category Management Methods
  const handleAddCategory = (newCat: Omit<Category, 'id'>) => {
    const fresh: Category = {
      ...newCat,
      id: categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1
    };
    const updated = [...categories, fresh];
    setCategories(updated);
    localStorage.setItem('arvand_categories', JSON.stringify(updated));
  };

  const handleEditCategory = (id: number, name: string, slug: string) => {
    const updated = categories.map(c => c.id === id ? { ...c, name, slug } : c);
    setCategories(updated);
    localStorage.setItem('arvand_categories', JSON.stringify(updated));
  };

  const handleDeleteCategory = (id: number) => {
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    localStorage.setItem('arvand_categories', JSON.stringify(updated));
  };

  // 7. Service Requests Handler (Ajax submission simulation)
  const handleServiceRequest = (newRequest: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>) => {
    const fresh: ServiceRequest = {
      ...newRequest,
      id: serviceRequests.length ? Math.max(...serviceRequests.map(r => r.id)) + 1 : 1,
      createdAt: new Date().toLocaleDateString('fa-IR-u-nu-latn'),
      status: 'pending'
    };
    const updated = [fresh, ...serviceRequests];
    setServiceRequests(updated);
    localStorage.setItem('arvand_requests', JSON.stringify(updated));

    setRequestSuccess('درخواست شما با موفقیت در دیتابیس ثبت شد. یک کوئری INSERT صادر شد و اطلاعات در صف پیگیری قرار گرفت.');
    setTimeout(() => setRequestSuccess(''), 7000);
  };

  const handleUpdateRequestStatus = (id: number, status: 'pending' | 'reviewed' | 'completed') => {
    const updated = serviceRequests.map((r) => (r.id === id ? { ...r, status } : r));
    setServiceRequests(updated);
    localStorage.setItem('arvand_requests', JSON.stringify(updated));
  };

  const handleDeleteRequest = (id: number) => {
    const updated = serviceRequests.filter((r) => r.id !== id);
    setServiceRequests(updated);
    localStorage.setItem('arvand_requests', JSON.stringify(updated));
  };

  const handleUpdateAcademyInfo = (updated: any) => {
    setAcademyInfo(updated);
    localStorage.setItem('arvand_academy_info', JSON.stringify(updated));
  };

  const handleUpdateServicesList = (updated: any[]) => {
    setServicesList(updated);
    localStorage.setItem('arvand_services_list', JSON.stringify(updated));
  };

  // Render setup wizard if not installed yet
  if (!isInstalled) {
    return <InstallWizard onInstallComplete={handleInstallComplete} />;
  }

  // Active view router dispatcher
  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home
            latestPosts={posts.slice(0, 3)}
            allPosts={posts}
            setCurrentView={setCurrentView}
            setSelectedPostSlug={setSelectedPostSlug}
            academyInfo={academyInfo}
            servicesList={servicesList}
          />
        );
      case 'about':
        return <About academyInfo={academyInfo} />;
      case 'services':
        return <Services servicesList={servicesList} />;
      case 'contact':
        return (
          <RequestService
            onRequestSubmit={handleServiceRequest}
            successMessage={requestSuccess}
            errorMessage={requestError}
          />
        );
      case 'blog':
        return (
          <Blog
            posts={posts}
            categories={categories}
            setSelectedPostSlug={setSelectedPostSlug}
            setCurrentView={setCurrentView}
          />
        );
      case 'news':
        return (
          <News
            posts={posts}
            categories={categories}
            setSelectedPostSlug={setSelectedPostSlug}
            setCurrentView={setCurrentView}
          />
        );
      case 'post-detail':
        return (
          <PostDetail
            postSlug={selectedPostSlug}
            posts={posts}
            categories={categories}
            comments={comments}
            onCommentSubmit={handleCommentSubmit}
            setCurrentView={setCurrentView}
          />
        );
      case 'login':
        return (
          <AdminLogin
            onLoginSubmit={handleAdminLogin}
            onGoBack={() => setCurrentView('home')}
            installedAdminUsername={dbConfig?.adminUser || 'admin'}
          />
        );
      case 'admin-panel':
        return (
          <AdminPanel
            posts={posts}
            categories={categories}
            comments={comments}
            serviceRequests={serviceRequests}
            academyInfo={academyInfo}
            servicesList={servicesList}
            additionalAdmins={additionalAdmins}
            primaryAdminUser={dbConfig?.adminUser || 'admin'}
            onAddAdmin={handleAddAdmin}
            onDeleteAdmin={handleDeleteAdmin}
            onAddPost={handleAddPost}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
            onApproveComment={handleApproveComment}
            onDeleteComment={handleDeleteComment}
            onUpdateRequestStatus={handleUpdateRequestStatus}
            onDeleteRequest={handleDeleteRequest}
            onUpdateAcademyInfo={handleUpdateAcademyInfo}
            onUpdateServicesList={handleUpdateServicesList}
            onResetSystem={handleResetSystem}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        );
      default:
        return (
          <div className="py-20 text-center text-slate-500">
            صفحه مورد نظر یافت نشد.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors duration-300 font-sans" id="app-wrapper">
      
      {/* 1. Header Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        darkMode={isDarkMode}
        setDarkMode={toggleTheme}
        isInstalled={isInstalled}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleAdminLogout}
        academyInfo={academyInfo}
      />

      {/* 3. Main Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto animate-fade-in" id="app-main-stage">
        {renderActiveView()}
      </main>

      {/* 4. Footer */}
      <Footer setCurrentView={setCurrentView} isInstalled={isInstalled} academyInfo={academyInfo} />
    </div>
  );
}
