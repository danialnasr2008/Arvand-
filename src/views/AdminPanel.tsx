import { useState, useEffect, FormEvent } from 'react';
import { Post, Comment, Category, ServiceRequest } from '../types';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  ClipboardList,
  RotateCcw,
  Check,
  Trash2,
  PlusCircle,
  Edit3,
  TrendingUp,
  ShieldAlert,
  Calendar,
  Eye,
  Settings,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  Bell
} from 'lucide-react';

interface AdminPanelProps {
  posts: Post[];
  categories: Category[];
  comments: Comment[];
  serviceRequests: ServiceRequest[];
  academyInfo: any;
  servicesList: any[];
  additionalAdmins: { username: string; pass: string; role: string }[];
  primaryAdminUser: string;
  onAddAdmin: (username: string, pass: string, role: string) => void;
  onDeleteAdmin: (username: string) => void;
  onAddPost: (post: Omit<Post, 'id' | 'createdAt' | 'views'>) => void;
  onEditPost: (id: number, updated: Partial<Post>) => void;
  onDeletePost: (id: number) => void;
  onApproveComment: (id: number) => void;
  onDeleteComment: (id: number) => void;
  onUpdateRequestStatus: (id: number, status: 'pending' | 'reviewed' | 'completed') => void;
  onDeleteRequest: (id: number) => void;
  onUpdateAcademyInfo: (newInfo: any) => void;
  onUpdateServicesList: (newList: any[]) => void;
  onResetSystem: () => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onEditCategory: (id: number, name: string, slug: string) => void;
  onDeleteCategory: (id: number) => void;
}

export default function AdminPanel({
  posts,
  categories,
  comments,
  serviceRequests,
  academyInfo,
  servicesList,
  additionalAdmins,
  primaryAdminUser,
  onAddAdmin,
  onDeleteAdmin,
  onAddPost,
  onEditPost,
  onDeletePost,
  onApproveComment,
  onDeleteComment,
  onUpdateRequestStatus,
  onDeleteRequest,
  onUpdateAcademyInfo,
  onUpdateServicesList,
  onResetSystem,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'news' | 'comments' | 'requests' | 'categories' | 'system' | 'content'>('dashboard');
  const [selectedCatType, setSelectedCatType] = useState<'article' | 'news'>('article');
  
  // New Admin form states
  const [newAdminUser, setNewAdminUser] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('مدیر کمکی');
  
  // Search & Pagination States
  const [postsSearch, setPostsSearch] = useState('');
  const [postsPage, setPostsPage] = useState(1);

  // News specific search & pagination states
  const [newsSearch, setNewsSearch] = useState('');
  const [newsPage, setNewsPage] = useState(1);

  const [commentsSearch, setCommentsSearch] = useState('');
  const [commentsPage, setCommentsPage] = useState(1);
  const [requestsSearch, setRequestsSearch] = useState('');
  const [requestsPage, setRequestsPage] = useState(1);

  // Site Content Editor subtab states
  const [contentSubTab, setContentSubTab] = useState<'general' | 'services' | 'faqs' | 'links'>('general');

  // Partners editing states
  const [partnersState, setPartnersState] = useState<string[]>(academyInfo?.partners || ['سازمان حسابرسی', 'سازمان امور مالیاتی', 'CFA Institute', 'ACCA', 'AAA']);
  const [newPartnerName, setNewPartnerName] = useState('');
  const [editingPartnerIdx, setEditingPartnerIdx] = useState<number | null>(null);
  const [editingPartnerValue, setEditingPartnerValue] = useState('');

  // Academy Button customize states
  const [academyBtnText, setAcademyBtnText] = useState(academyInfo?.academyBtnText || 'ورود به آکادمی اروند');
  const [academyBtnUrl, setAcademyBtnUrl] = useState(academyInfo?.academyBtnUrl || 'login');

  // Extra menu/footer links states
  const [extraHeaderLinks, setExtraHeaderLinks] = useState<any[]>(academyInfo?.extraHeaderLinks || []);
  const [extraFooterLinks, setExtraFooterLinks] = useState<any[]>(academyInfo?.extraFooterLinks || []);
  const [newExtraHeaderTitle, setNewExtraHeaderTitle] = useState('');
  const [newExtraHeaderUrl, setNewExtraHeaderUrl] = useState('');
  const [newExtraFooterTitle, setNewExtraFooterTitle] = useState('');
  const [newExtraFooterUrl, setNewExtraFooterUrl] = useState('');

  // Services dynamic management states
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceDetails, setNewServiceDetails] = useState('');
  const [newServiceIcon, setNewServiceIcon] = useState('Calculator');

  // Categories editing states
  const [editingCatId, setEditingCatId] = useState<number | null>(null);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');

  // Links editing states
  const [headerLinksState, setHeaderLinksState] = useState<any[]>(academyInfo?.headerLinks || [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'about', label: 'درباره ما' },
    { id: 'services', label: 'خدمات مالی' },
    { id: 'contact', label: 'دریافت خدمات' },
    { id: 'blog', label: 'مقالات آموزشی' },
    { id: 'news', label: 'اخبار' },
  ]);
  const [quickAccessTitle, setQuickAccessTitle] = useState(academyInfo?.quickAccessTitle || 'دسترسی سریع');
  const [quickAccessLinksState, setQuickAccessLinksState] = useState<any[]>(academyInfo?.quickAccessLinks || [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'about', label: 'درباره ما' },
    { id: 'services', label: 'خدمات حسابداری و مالیاتی' },
    { id: 'contact', label: 'دریافت خدمات' },
    { id: 'blog', label: 'مقالات آموزشی' },
    { id: 'news', label: 'اخبار' },
  ]);

  // General texts state (initialized from props.academyInfo)
  const [slogan, setSlogan] = useState(academyInfo?.slogan || '');
  const [heroDescription, setHeroDescription] = useState(academyInfo?.heroDescription || '');
  const [subtitle, setSubtitle] = useState(academyInfo?.subtitle || '');
  const [aboutLong, setAboutLong] = useState(academyInfo?.aboutLong || '');
  const [vision, setVision] = useState(academyInfo?.vision || '');

  // Footer / contact info states
  const [phoneState, setPhoneState] = useState(academyInfo?.phone || '');
  const [emailState, setEmailState] = useState(academyInfo?.email || '');
  const [addressState, setAddressState] = useState(academyInfo?.address || '');
  const [telegramUrlState, setTelegramUrlState] = useState(academyInfo?.telegramUrl || '');
  const [instagramUrlState, setInstagramUrlState] = useState(academyInfo?.instagramUrl || '');

  // Services editing state
  const [selectedServiceId, setSelectedServiceId] = useState(servicesList[0]?.id || '');
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceDetailsText, setServiceDetailsText] = useState('');

  // FAQs editing state
  const [faqsState, setFaqsState] = useState<any[]>(academyInfo?.faqs || []);
  const [editingFaqIdx, setEditingFaqIdx] = useState<number | null>(null);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  // Synchronize site text inputs with parent props
  useEffect(() => {
    if (academyInfo) {
      setSlogan(academyInfo.slogan || '');
      setHeroDescription(academyInfo.heroDescription || '');
      setSubtitle(academyInfo.subtitle || '');
      setAboutLong(academyInfo.aboutLong || '');
      setVision(academyInfo.vision || '');
      setFaqsState(academyInfo.faqs || []);
      setPhoneState(academyInfo.phone || '');
      setEmailState(academyInfo.email || '');
      setAddressState(academyInfo.address || '');
      setTelegramUrlState(academyInfo.telegramUrl || '');
      setInstagramUrlState(academyInfo.instagramUrl || '');
      setPartnersState(academyInfo.partners || ['سازمان حسابرسی', 'سازمان امور مالیاتی', 'CFA Institute', 'ACCA', 'AAA']);
      setAcademyBtnText(academyInfo.academyBtnText || 'ورود به آکادمی اروند');
      setAcademyBtnUrl(academyInfo.academyBtnUrl || 'login');
      setExtraHeaderLinks(academyInfo.extraHeaderLinks || []);
      setExtraFooterLinks(academyInfo.extraFooterLinks || []);
      setHeaderLinksState(academyInfo.headerLinks || [
        { id: 'home', label: 'صفحه اصلی' },
        { id: 'about', label: 'درباره ما' },
        { id: 'services', label: 'خدمات مالی' },
        { id: 'contact', label: 'دریافت خدمات' },
        { id: 'blog', label: 'مقالات آموزشی' },
        { id: 'news', label: 'اخبار' },
      ]);
      setQuickAccessTitle(academyInfo.quickAccessTitle || 'دسترسی سریع');
      setQuickAccessLinksState(academyInfo.quickAccessLinks || [
        { id: 'home', label: 'صفحه اصلی' },
        { id: 'about', label: 'درباره ما' },
        { id: 'services', label: 'خدمات حسابداری و مالیاتی' },
        { id: 'contact', label: 'دریافت خدمات' },
        { id: 'blog', label: 'مقالات آموزشی' },
        { id: 'news', label: 'اخبار' },
      ]);
    }
  }, [academyInfo]);

  useEffect(() => {
    const srv = servicesList.find((s) => s.id === selectedServiceId);
    if (srv) {
      setServiceTitle(srv.title || '');
      setServiceDesc(srv.description || '');
      setServiceDetailsText(srv.details?.join('\n') || '');
    }
  }, [selectedServiceId, servicesList]);

  // Reset page numbers when search filters change
  useEffect(() => { setPostsPage(1); }, [postsSearch]);
  useEffect(() => { setNewsPage(1); }, [newsSearch]);
  useEffect(() => { setCommentsPage(1); }, [commentsSearch]);
  useEffect(() => { setRequestsPage(1); }, [requestsSearch]);

  // States for Adding/Editing Post Form
  const [formPostType, setFormPostType] = useState<'article' | 'news'>('article');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formCategory, setFormCategory] = useState<number>(categories[0]?.id || 1);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formIsSpecial, setFormIsSpecial] = useState(false);

  const insertFormatting = (tag: string) => {
    const el = document.getElementById('crud-content') as HTMLTextAreaElement;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const selectedText = text.substring(start, end);
    let replacement = '';
    
    switch (tag) {
      case 'bold':
        replacement = `**${selectedText || 'متن ضخیم'}**`;
        break;
      case 'italic':
        replacement = `*${selectedText || 'متن مورب'}*`;
        break;
      case 'h1':
        replacement = `\n# ${selectedText || 'تیتر بزرگ'}\n`;
        break;
      case 'h2':
        replacement = `\n## ${selectedText || 'تیتر متوسط'}\n`;
        break;
      case 'blockquote':
        replacement = `\n> ${selectedText || 'متن نقل قول'}\n`;
        break;
      case 'bullet':
        replacement = `\n- ${selectedText || 'مورد لیست'}\n`;
        break;
      case 'link':
        replacement = `[${selectedText || 'عنوان لینک'}](https://example.com)`;
        break;
      default:
        return;
    }
    
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setFormContent(newContent);
    
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start, start + replacement.length);
    }, 10);
  };

  const handleExportRequestsToExcel = () => {
    if (serviceRequests.length === 0) {
      alert('هیچ درخواستی برای استخراج وجود ندارد.');
      return;
    }

    const headers = [
      'شناسه',
      'نام و نام خانوادگی',
      'نام مجموعه/شرکت',
      'سمت',
      'شماره تماس',
      'ایمیل',
      'شهر',
      'اولویت نیاز',
      'روش ترجیحی تماس',
      'توضیحات و جزئیات نیاز مالی',
      'تاریخ ثبت',
      'وضعیت بررسی'
    ];

    const rows = serviceRequests.map(req => [
      req.id,
      `"${req.fullName.replace(/"/g, '""')}"`,
      req.companyName ? `"${req.companyName.replace(/"/g, '""')}"` : 'شخص حقیقی',
      req.position ? `"${req.position.replace(/"/g, '""')}"` : 'ثبت نشده',
      `"${req.phone}"`,
      req.email ? `"${req.email.replace(/"/g, '""')}"` : 'ثبت نشده',
      req.city ? `"${req.city.replace(/"/g, '""')}"` : 'ثبت نشده',
      req.priority === 'immediate' ? 'فوری (تا پایان هفته جاری)' : req.priority === 'week' ? 'طی ۱۰ روز آینده' : req.priority === 'month' ? 'بازه زمانی ۱ ماهه' : 'در حال بررسی اولیه',
      req.contactMethod === 'phone' ? 'تماس تلفنی مستقیم' : req.contactMethod === 'email' ? 'مکاتبه ایمیلی' : 'ارتباط در بله',
      `"${(req.description || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`,
      req.createdAt,
      req.status === 'pending' ? 'در انتظار بررسی اولیه' : req.status === 'reviewed' ? 'تماس گرفته شده' : 'تکمیل و بایگانی'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `arvand-academy-requests-${new Date().toLocaleDateString('fa-IR-u-nu-latn').replace(/\//g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats calculation
  const pendingComments = comments.filter((c) => !c.isApproved);
  const pendingRequests = serviceRequests.filter((r) => r.status === 'pending');

  // Filtered and paginated posts (Articles/Blog only)
  const filteredPosts = posts.filter((p) =>
    (p.type === 'article' || !p.type) && (
      p.title.toLowerCase().includes(postsSearch.toLowerCase()) ||
      p.summary.toLowerCase().includes(postsSearch.toLowerCase())
    )
  );
  const postsPerPage = 5;
  const totalPostsPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((postsPage - 1) * postsPerPage, postsPage * postsPerPage);

  // Filtered and paginated news (News only)
  const filteredNews = posts.filter((p) =>
    p.type === 'news' && (
      p.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
      p.summary.toLowerCase().includes(newsSearch.toLowerCase())
    )
  );
  const totalNewsPages = Math.ceil(filteredNews.length / postsPerPage);
  const currentNews = filteredNews.slice((newsPage - 1) * postsPerPage, newsPage * postsPerPage);

  // Filtered and paginated comments
  const filteredComments = comments.filter((c) =>
    c.authorName.toLowerCase().includes(commentsSearch.toLowerCase()) ||
    c.content.toLowerCase().includes(commentsSearch.toLowerCase())
  );
  const commentsPerPage = 5;
  const totalCommentsPages = Math.ceil(filteredComments.length / commentsPerPage);
  const currentComments = filteredComments.slice((commentsPage - 1) * commentsPerPage, commentsPage * commentsPerPage);

  // Filtered and paginated requests
  const filteredRequests = serviceRequests.filter((r) =>
    r.fullName.toLowerCase().includes(requestsSearch.toLowerCase()) ||
    (r.companyName && r.companyName.toLowerCase().includes(requestsSearch.toLowerCase())) ||
    r.phone.includes(requestsSearch) ||
    (r.description && r.description.toLowerCase().includes(requestsSearch.toLowerCase()))
  );
  const requestsPerPage = 5;
  const totalRequestsPages = Math.ceil(filteredRequests.length / requestsPerPage);
  const currentRequests = filteredRequests.slice((requestsPage - 1) * requestsPerPage, requestsPage * requestsPerPage);

  const openAddForm = (type: 'article' | 'news' = 'article') => {
    setFormPostType(type);
    setEditingPostId(null);
    setFormTitle('');
    setFormSlug('');
    setFormSummary('');
    // Use first appropriate category based on post type
    const defaultCat = type === 'news'
      ? (categories.find(c => c.type === 'news')?.id || 4)
      : (categories.find(c => c.type === 'article' || !c.type)?.id || 2);
    setFormCategory(defaultCat);
    setFormImageUrl(type === 'news' 
      ? 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200'
      : 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200'
    );
    setFormContent('');
    setFormIsSpecial(false);
    setIsFormOpen(true);
  };

  const openEditForm = (p: Post) => {
    setFormPostType(p.type || 'article');
    setEditingPostId(p.id);
    setFormTitle(p.title);
    setFormSlug(p.slug);
    setFormSummary(p.summary);
    setFormCategory(p.categoryId || 2);
    setFormImageUrl(p.imageUrl);
    setFormContent(p.content);
    setFormIsSpecial(!!p.isSpecial);
    setIsFormOpen(true);
  };

  const handlePostSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formContent) {
      alert('عنوان و متن الزامی هستند.');
      return;
    }

    const slugToUse = formSlug || formTitle.toLowerCase().replace(/\s+/g, '-');
    const categoryIdToUse = formCategory;

    if (editingPostId !== null) {
      onEditPost(editingPostId, {
        title: formTitle,
        slug: slugToUse,
        summary: formSummary,
        categoryId: categoryIdToUse,
        imageUrl: formImageUrl,
        content: formContent,
        isSpecial: formIsSpecial,
        type: formPostType
      });
    } else {
      onAddPost({
        title: formTitle,
        slug: slugToUse,
        summary: formSummary,
        categoryId: categoryIdToUse,
        imageUrl: formImageUrl,
        content: formContent,
        isSpecial: formIsSpecial,
        type: formPostType
      });
    }

    setIsFormOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="admin-panel-container" dir="rtl">
      
      {/* Panel Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="admin-grid-layout">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-1" id="admin-sidebar">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2" id="admin-nav-card">
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-2" id="admin-nav-header">
              <span className="block font-bold text-slate-900 dark:text-white text-sm">پنل مدیریت محتوا</span>
              <span className="text-[10px] text-emerald-500 font-semibold">پایگاه داده متصل (MySQL)</span>
            </div>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-right px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-colors cursor-pointer focus:outline-none ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              id="admin-tab-dashboard"
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <span className="flex-1">داشبورد آمار</span>
            </button>

            <button
              onClick={() => setActiveTab('posts')}
              className={`w-full text-right px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-colors cursor-pointer focus:outline-none ${
                activeTab === 'posts'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              id="admin-tab-posts"
            >
              <FileText className="h-4 w-4 shrink-0" />
              <span className="flex-1">مدیریت مقالات ({posts.filter(p => p.type === 'article' || !p.type).length})</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full text-right px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-colors cursor-pointer focus:outline-none ${
                activeTab === 'news'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              id="admin-tab-news"
            >
              <Bell className="h-4 w-4 shrink-0" />
              <span className="flex-1">مدیریت اخبار ({posts.filter(p => p.type === 'news').length})</span>
            </button>

            <button
              onClick={() => setActiveTab('comments')}
              className={`w-full text-right px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-colors cursor-pointer focus:outline-none ${
                activeTab === 'comments'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              id="admin-tab-comments"
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span className="flex-1">نظرات و دیدگاه‌ها ({comments.length})</span>
              {pendingComments.length > 0 && (
                <span className="bg-amber-500 text-white font-mono text-[10px] px-1.5 py-0.5 rounded-full" id="pending-comments-badge">
                  {pendingComments.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className={`w-full text-right px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-colors cursor-pointer focus:outline-none ${
                activeTab === 'requests'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              id="admin-tab-requests"
            >
              <ClipboardList className="h-4 w-4 shrink-0" />
              <span className="flex-1">درخواست‌های خدمات ({serviceRequests.length})</span>
              {pendingRequests.length > 0 && (
                <span className="bg-blue-500 text-white font-mono text-[10px] px-1.5 py-0.5 rounded-full" id="pending-requests-badge">
                  {pendingRequests.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full text-right px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-colors cursor-pointer focus:outline-none ${
                activeTab === 'categories'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              id="admin-tab-categories"
            >
              <PlusCircle className="h-4 w-4 shrink-0" />
              <span className="flex-1">مدیریت دسته‌بندی‌ها</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`w-full text-right px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-colors cursor-pointer focus:outline-none ${
                activeTab === 'content'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              id="admin-tab-content"
            >
              <Edit3 className="h-4 w-4 shrink-0" />
              <span className="flex-1">مدیریت محتوای سایت</span>
            </button>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4" id="admin-nav-footer">
              <button
                onClick={() => setActiveTab('system')}
                className={`w-full text-right px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer focus:outline-none ${
                  activeTab === 'system' ? 'bg-rose-50 dark:bg-rose-950/20' : ''
                }`}
                id="admin-tab-system"
              >
                <Settings className="h-4 w-4 shrink-0" />
                <span className="flex-1">تنظیمات و بازنشانی</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3" id="admin-content-panel">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in" id="admin-panel-dashboard">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-2.5">وضعیت و آمارهای کلیدی آکادمی</h2>
              
              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="dashboard-stats-grid">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-sm" id="stat-card-posts">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 mb-1">تعداد مقالات</span>
                    <span className="text-2xl font-extrabold text-slate-800 dark:text-white font-mono">{posts.length}</span>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 rounded-xl"><FileText className="h-5 w-5" /></div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-sm" id="stat-card-comments">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 mb-1">نظرات منتظر تایید</span>
                    <span className={`text-2xl font-extrabold font-mono ${pendingComments.length > 0 ? 'text-amber-500' : 'text-slate-800 dark:text-white'}`}>{pendingComments.length}</span>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-xl"><MessageSquare className="h-5 w-5" /></div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-sm" id="stat-card-requests">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 mb-1">درخواست‌های مشاوره جدید</span>
                    <span className={`text-2xl font-extrabold font-mono ${pendingRequests.length > 0 ? 'text-blue-500' : 'text-slate-800 dark:text-white'}`}>{pendingRequests.length}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-xl"><ClipboardList className="h-5 w-5" /></div>
                </div>
              </div>

              {/* Latest requests preview */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm" id="latest-requests-preview">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">آخرین درخواست‌های خدمات رسیده</h3>
                <div className="space-y-3" id="latest-requests-list">
                  {serviceRequests.slice(0, 3).map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl text-xs sm:text-sm border border-slate-100 dark:border-slate-800" id={`dash-req-row-${req.id}`}>
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{req.fullName}</span>
                        {req.companyName && <span className="text-slate-400 text-xs mr-2">({req.companyName})</span>}
                      </div>
                      <div className="flex items-center gap-3" id={`dash-req-meta-${req.id}`}>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${req.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                          {req.status === 'pending' ? 'جدید' : 'بررسی‌شده'}
                        </span>
                        <span className="text-slate-400 text-xs font-mono">{req.createdAt}</span>
                      </div>
                    </div>
                  ))}
                  {serviceRequests.length === 0 && (
                    <div className="text-center text-slate-400 py-6">درخواستی یافت نشد.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE POSTS */}
          {activeTab === 'posts' && (
            <div className="space-y-6 animate-fade-in" id="admin-panel-posts">
              <div className="flex items-center justify-between gap-4" id="posts-manager-header">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-2.5">مدیریت مقالات و وبلاگ</h2>
                <button
                  onClick={openAddForm}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow flex items-center gap-1.5 cursor-pointer focus:outline-none"
                  id="admin-add-post-btn"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>انتشار مقاله جدید</span>
                </button>
              </div>

              {/* Add/Edit Form Overlay Modal */}
              {isFormOpen && (
                <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-right shadow-inner" id="post-crud-form">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800" id="post-form-header">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {editingPostId !== null 
                        ? (formPostType === 'news' ? 'ویرایش خبر موجود' : 'ویرایش مقاله موجود') 
                        : (formPostType === 'news' ? 'انتشار خبر جدید' : 'انتشار مقاله جدید')}
                    </h3>
                    <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 focus:outline-none">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handlePostSubmit} className="space-y-4" id="crud-form-element">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="post-form-row-1">
                      <div id="form-field-title">
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                          {formPostType === 'news' ? 'عنوان خبر *' : 'عنوان مقاله *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder={formPostType === 'news' ? "مثال: انتشار دفترچه آزمون مالیاتی" : "مثال: راهنمای ارسال اظهارنامه"}
                          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-slate-100 text-right"
                          id="crud-title"
                        />
                      </div>

                      <div id="form-field-slug">
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                          {formPostType === 'news' ? 'آدرس خبر (Slug)' : 'آدرس مقاله (Slug)'}
                        </label>
                        <input
                          type="text"
                          value={formSlug}
                          onChange={(e) => setFormSlug(e.target.value)}
                          placeholder="taxpayers-guide"
                          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-slate-100 text-left font-mono"
                          dir="ltr"
                          id="crud-slug"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="post-form-row-2">
                      {formPostType !== 'news' ? (
                        <div id="form-field-category">
                          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">دسته‌بندی موضوعی</label>
                          <select
                            value={formCategory}
                            onChange={(e) => setFormCategory(Number(e.target.value))}
                            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-slate-100 text-right"
                            id="crud-category"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="hidden" />
                      )}

                      <div id="form-field-image" className={formPostType === 'news' ? 'sm:col-span-2' : ''}>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">لینک تصویر شاخص (URL)</label>
                        <input
                          type="text"
                          value={formImageUrl}
                          onChange={(e) => setFormImageUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-slate-100 text-left font-mono"
                          dir="ltr"
                          id="crud-image-url"
                        />
                      </div>
                    </div>

                    {/* Special News Switch */}
                    <div className="flex items-center gap-2.5 p-3.5 bg-amber-500/5 dark:bg-amber-500/5 border border-amber-500/10 rounded-xl" id="form-field-special">
                      <input
                        type="checkbox"
                        id="form-is-special"
                        checked={formIsSpecial}
                        onChange={(e) => setFormIsSpecial(e.target.checked)}
                        className="h-4.5 w-4.5 text-amber-600 focus:ring-amber-500 border-slate-300 rounded cursor-pointer"
                      />
                      <label htmlFor="form-is-special" className="text-xs font-bold text-slate-700 dark:text-amber-300 cursor-pointer select-none">
                        قرار دادن به عنوان «خبر ویژه آکادمی» (نمایش ویژه در هیرو صفحه اصلی - حداکثر ۵ مورد)
                      </label>
                    </div>

                    <div id="form-field-summary">
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                        {formPostType === 'news' ? 'خلاصه کوتاه خبر (در حدود یک یا دو خط)' : 'خلاصه کوتاه مقاله (در حدود یک یا دو خط)'}
                      </label>
                      <input
                        type="text"
                        value={formSummary}
                        onChange={(e) => setFormSummary(e.target.value)}
                        placeholder="خلاصه‌ای جذاب برای نمایش در لیست وبلاگ..."
                        className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-slate-100 text-right"
                        id="crud-summary"
                      />
                    </div>

                    <div id="form-field-content">
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                        {formPostType === 'news' ? 'متن کامل خبر *' : 'متن کامل مقاله *'}
                      </label>
                      
                      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-100 dark:bg-slate-950 border-t border-x border-slate-200 dark:border-slate-800 rounded-t-xl" id="editor-toolbar">
                        <button
                          type="button"
                          onClick={() => insertFormatting('bold')}
                          className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="ضخیم کردن"
                        >
                          <b>B</b>
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('italic')}
                          className="px-2.5 py-1 text-xs italic bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="مورب کردن"
                        >
                          <i>I</i>
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('h1')}
                          className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="تیتر بزرگ"
                        >
                          H1
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('h2')}
                          className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="تیتر متوسط"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('blockquote')}
                          className="px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="نقل قول"
                        >
                          نقل‌قول
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('bullet')}
                          className="px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="لیست نشانه‌دار"
                        >
                          لیست Bullet
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('link')}
                          className="px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="درج لینک"
                        >
                          لینک
                        </button>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mr-auto select-none pl-1">ابزار نگارش سریع (بدون نیاز به نوشتن نمادها)</span>
                      </div>

                      <textarea
                        required
                        rows={10}
                        value={formContent}
                        onChange={(e) => setFormContent(e.target.value)}
                        placeholder={formPostType === 'news' ? "محتوای متنی خبر..." : "محتوای متنی مقاله..."}
                        className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-900 border-x border-b border-slate-200 dark:border-slate-800 rounded-b-xl focus:outline-none text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                        id="crud-content"
                      />
                    </div>

                    <div className="flex gap-2 justify-end pt-2" id="crud-buttons">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
                        id="crud-cancel-btn"
                      >
                        انصراف
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
                        id="crud-save-btn"
                      >
                        {editingPostId !== null ? 'بروزرسانی مقاله' : 'انتشار نهایی'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Search Bar */}
              <div className="relative" id="admin-posts-search-bar">
                <input
                  type="text"
                  placeholder="جستجو در عنوان یا خلاصه مقالات..."
                  value={postsSearch}
                  onChange={(e) => setPostsSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                />
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>

              {/* Posts Table list */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm" id="admin-posts-table-wrapper">
                <div className="overflow-x-auto" id="admin-posts-scroll">
                  <table className="w-full text-right text-xs sm:text-sm border-collapse" id="admin-posts-table">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 text-slate-500 font-bold" id="posts-table-head">
                        <th className="px-6 py-4">عنوان مقاله</th>
                        <th className="px-4 py-4">دسته‌بندی</th>
                        <th className="px-4 py-4">تاریخ انتشار</th>
                        <th className="px-4 py-4 text-center">بازدید</th>
                        <th className="px-6 py-4 text-left">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800" id="posts-table-body">
                      {currentPosts.map((p) => {
                        const cat = categories.find((c) => c.id === p.categoryId)?.name || 'عمومی';
                        return (
                          <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20" id={`posts-tr-${p.id}`}>
                            <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200 max-w-xs truncate" id={`posts-td-title-${p.id}`}>{p.title}</td>
                            <td className="px-4 py-4 text-slate-500" id={`posts-td-cat-${p.id}`}>{cat}</td>
                            <td className="px-4 py-4 text-slate-400 font-mono" id={`posts-td-date-${p.id}`}>{p.createdAt}</td>
                            <td className="px-4 py-4 text-center text-slate-400 font-mono" id={`posts-td-views-${p.id}`}>{p.views}</td>
                            <td className="px-6 py-4 text-left flex gap-2 justify-end" id={`posts-td-actions-${p.id}`}>
                              <button
                                onClick={() => openEditForm(p)}
                                className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded transition-colors"
                                title="ویرایش"
                                id={`posts-edit-btn-${p.id}`}
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('آیا از حذف این مقاله اطمینان دارید؟')) onDeletePost(p.id);
                                }}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded transition-colors"
                                title="حذف"
                                id={`posts-delete-btn-${p.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPostsPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-2" id="posts-pagination">
                  <button
                    disabled={postsPage === 1}
                    onClick={() => setPostsPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer focus:outline-none"
                    id="posts-pagination-prev"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPostsPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPostsPage(pageNum)}
                      className={`w-7 h-7 font-mono text-xs font-bold rounded-lg flex items-center justify-center cursor-pointer transition-all focus:outline-none ${
                        postsPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    disabled={postsPage === totalPostsPages}
                    onClick={() => setPostsPage((p) => Math.min(totalPostsPages, p + 1))}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer focus:outline-none"
                    id="posts-pagination-next"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB: MANAGE NEWS */}
          {activeTab === 'news' && (
            <div className="space-y-6 animate-fade-in" id="admin-panel-news">
              <div className="flex items-center justify-between gap-4" id="news-manager-header">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-2.5">مدیریت و انتشار اخبار</h2>
                <button
                  onClick={() => openAddForm('news')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow flex items-center gap-1.5 cursor-pointer focus:outline-none"
                  id="admin-add-news-btn"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>انتشار خبر جدید</span>
                </button>
              </div>

              {/* Add/Edit Form Overlay Modal (Same as posts, dynamically adapted based on formPostType) */}
              {isFormOpen && (
                <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-right shadow-inner" id="post-crud-form">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800" id="post-form-header">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {editingPostId !== null 
                        ? (formPostType === 'news' ? 'ویرایش خبر موجود' : 'ویرایش مقاله موجود') 
                        : (formPostType === 'news' ? 'انتشار خبر جدید' : 'انتشار مقاله جدید')}
                    </h3>
                    <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 focus:outline-none">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handlePostSubmit} className="space-y-4" id="crud-form-element">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="post-form-row-1">
                      <div id="form-field-title">
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                          {formPostType === 'news' ? 'عنوان خبر *' : 'عنوان مقاله *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder={formPostType === 'news' ? "مثال: انتشار دفترچه آزمون مالیاتی" : "مثال: راهنمای ارسال اظهارنامه"}
                          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-slate-100 text-right"
                          id="crud-title"
                        />
                      </div>

                      <div id="form-field-slug">
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                          {formPostType === 'news' ? 'آدرس خبر (Slug)' : 'آدرس مقاله (Slug)'}
                        </label>
                        <input
                          type="text"
                          value={formSlug}
                          onChange={(e) => setFormSlug(e.target.value)}
                          placeholder="taxpayers-guide"
                          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-slate-100 text-left font-mono"
                          dir="ltr"
                          id="crud-slug"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="post-form-row-2">
                      {formPostType !== 'news' ? (
                        <div id="form-field-category">
                          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">دسته‌بندی موضوعی</label>
                          <select
                            value={formCategory}
                            onChange={(e) => setFormCategory(Number(e.target.value))}
                            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-slate-100 text-right"
                            id="crud-category"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="hidden" />
                      )}

                      <div id="form-field-image" className={formPostType === 'news' ? 'sm:col-span-2' : ''}>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">لینک تصویر شاخص (URL)</label>
                        <input
                          type="text"
                          value={formImageUrl}
                          onChange={(e) => setFormImageUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-slate-100 text-left font-mono"
                          dir="ltr"
                          id="crud-image-url"
                        />
                      </div>
                    </div>

                    {/* Special News Switch */}
                    <div className="flex items-center gap-2.5 p-3.5 bg-amber-500/5 dark:bg-amber-500/5 border border-amber-500/10 rounded-xl" id="form-field-special">
                      <input
                        type="checkbox"
                        id="form-is-special"
                        checked={formIsSpecial}
                        onChange={(e) => setFormIsSpecial(e.target.checked)}
                        className="h-4.5 w-4.5 text-amber-600 focus:ring-amber-500 border-slate-300 rounded cursor-pointer"
                      />
                      <label htmlFor="form-is-special" className="text-xs font-bold text-slate-700 dark:text-amber-300 cursor-pointer select-none">
                        قرار دادن به عنوان «خبر ویژه آکادمی» (نمایش ویژه در هیرو صفحه اصلی - حداکثر ۵ مورد)
                      </label>
                    </div>

                    <div id="form-field-summary">
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                        {formPostType === 'news' ? 'خلاصه کوتاه خبر (در حدود یک یا دو خط)' : 'خلاصه کوتاه مقاله (در حدود یک یا دو خط)'}
                      </label>
                      <input
                        type="text"
                        value={formSummary}
                        onChange={(e) => setFormSummary(e.target.value)}
                        placeholder="خلاصه‌ای جذاب برای نمایش در لیست..."
                        className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-slate-100 text-right"
                        id="crud-summary"
                      />
                    </div>

                    <div id="form-field-content">
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                        {formPostType === 'news' ? 'متن کامل خبر *' : 'متن کامل مقاله *'}
                      </label>
                      
                      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-100 dark:bg-slate-950 border-t border-x border-slate-200 dark:border-slate-800 rounded-t-xl" id="editor-toolbar">
                        <button
                          type="button"
                          onClick={() => insertFormatting('bold')}
                          className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="ضخیم کردن"
                        >
                          <b>B</b>
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('italic')}
                          className="px-2.5 py-1 text-xs italic bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="مورب کردن"
                        >
                          <i>I</i>
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('h1')}
                          className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="تیتر بزرگ"
                        >
                          H1
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('h2')}
                          className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="تیتر متوسط"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('blockquote')}
                          className="px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="نقل قول"
                        >
                          نقل‌قول
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('bullet')}
                          className="px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="لیست نشانه‌دار"
                        >
                          لیست Bullet
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting('link')}
                          className="px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                          title="درج لینک"
                        >
                          لینک
                        </button>
                      </div>

                      <textarea
                        required
                        rows={10}
                        value={formContent}
                        onChange={(e) => setFormContent(e.target.value)}
                        placeholder={formPostType === 'news' ? "محتوای متنی خبر..." : "محتوای متنی مقاله..."}
                        className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-900 border-x border-b border-slate-200 dark:border-slate-800 rounded-b-xl focus:outline-none text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                        id="crud-content"
                      />
                    </div>

                    <div className="flex gap-2 justify-end pt-2" id="crud-buttons">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer focus:outline-none"
                      >
                        انصراف
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow cursor-pointer focus:outline-none"
                      >
                        {editingPostId !== null ? 'اعمال تغییرات' : 'انتشار خبر'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* News Search Bar */}
              <div className="relative" id="admin-news-search-bar">
                <input
                  type="text"
                  placeholder="جستجو در عنوان یا خلاصه اخبار..."
                  value={newsSearch}
                  onChange={(e) => setNewsSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                />
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>

              {/* News Table Listing */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden" id="news-table-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse text-xs sm:text-sm" id="news-list-table">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                        <th className="p-4 font-bold">شناسه</th>
                        <th className="p-4 font-bold">تصویر</th>
                        <th className="p-4 font-bold">عنوان خبر</th>
                        <th className="p-4 font-bold">خلاصه</th>
                        <th className="p-4 font-bold">تاریخ ثبت</th>
                        <th className="p-4 font-bold text-center">ویژه</th>
                        <th className="p-4 font-bold text-center">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {currentNews.map((p) => {
                        return (
                          <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors" id={`news-row-${p.id}`}>
                            <td className="p-4 font-mono text-slate-400">{p.id}</td>
                            <td className="p-4">
                              <img src={p.imageUrl} alt="" className="h-10 w-16 object-cover rounded-lg border border-slate-200 dark:border-slate-800" />
                            </td>
                            <td className="p-4 font-bold text-slate-800 dark:text-slate-100 max-w-[200px] truncate">{p.title}</td>
                            <td className="p-4 text-slate-400 max-w-[200px] truncate">{p.summary}</td>
                            <td className="p-4 text-slate-400 font-mono text-[11px]">{p.createdAt}</td>
                            <td className="p-4 text-center">
                              {p.isSpecial ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                  بله (ویژه)
                                </span>
                              ) : (
                                <span className="text-slate-400 text-xs">-</span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => openEditForm(p)}
                                  className="p-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg transition-colors cursor-pointer focus:outline-none"
                                  title="ویرایش"
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm('آیا مایل به حذف این خبر هستید؟')) {
                                      onDeletePost(p.id);
                                    }
                                  }}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-lg transition-colors cursor-pointer focus:outline-none"
                                  title="حذف"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {currentNews.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center text-slate-400 py-10">هیچ خبری ثبت نشده است.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* News Pagination */}
              {totalNewsPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-2" id="news-pagination">
                  <button
                    disabled={newsPage === 1}
                    onClick={() => setNewsPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer focus:outline-none"
                    id="news-pagination-prev"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalNewsPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setNewsPage(pageNum)}
                      className={`w-7 h-7 font-mono text-xs font-bold rounded-lg flex items-center justify-center cursor-pointer transition-all focus:outline-none ${
                        newsPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    disabled={newsPage === totalNewsPages}
                    onClick={() => setNewsPage((p) => Math.min(totalNewsPages, p + 1))}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer focus:outline-none"
                    id="news-pagination-next"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MANAGE COMMENTS */}
          {activeTab === 'comments' && (
            <div className="space-y-6 animate-fade-in" id="admin-panel-comments">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-2.5">مدیریت و تایید دیدگاه‌های کاربران</h2>

              {/* Comments Search Bar */}
              <div className="relative" id="admin-comments-search-bar">
                <input
                  type="text"
                  placeholder="جستجو در نویسنده یا محتوای نظرات..."
                  value={commentsSearch}
                  onChange={(e) => setCommentsSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                />
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>

              <div className="space-y-4" id="admin-comments-list">
                {currentComments.map((c) => {
                  const postTitle = posts.find((p) => p.id === c.postId)?.title || 'مقاله حذف‌شده';
                  return (
                    <div
                      key={c.id}
                      className={`p-5 rounded-2xl border text-right space-y-3 bg-white dark:bg-slate-900 shadow-sm transition-all ${
                        c.isApproved
                          ? 'border-slate-200 dark:border-slate-800'
                          : 'border-amber-300 dark:border-amber-900/50 bg-amber-50/20 dark:bg-amber-950/10'
                      }`}
                      id={`admin-comment-box-${c.id}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs" id={`admin-comment-meta-wrapper-${c.id}`}>
                        <div className="flex items-center gap-2" id={`admin-comment-author-box-${c.id}`}>
                          <span className="font-bold text-slate-800 dark:text-slate-100">{c.authorName}</span>
                          <span className="text-slate-400">روی مقاله:</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400 truncate max-w-xs">{postTitle}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-slate-400" id={`admin-comment-time-box-${c.id}`}>
                          <span>{c.createdAt}</span>
                          {!c.isApproved && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">منتظر تایید</span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl" id={`admin-comment-content-text-${c.id}`}>
                        {c.content}
                      </p>

                      <div className="flex justify-end gap-2 text-xs font-semibold pt-1" id={`admin-comment-actions-wrapper-${c.id}`}>
                        {!c.isApproved && (
                          <button
                            onClick={() => onApproveComment(c.id)}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1 transition-all focus:outline-none cursor-pointer"
                            id={`comment-approve-btn-${c.id}`}
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>تایید و انتشار</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm('آیا مایل به حذف این دیدگاه هستید؟')) onDeleteComment(c.id);
                          }}
                          className="px-3.5 py-1.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg flex items-center gap-1 transition-all focus:outline-none cursor-pointer"
                          id={`comment-delete-btn-${c.id}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>حذف نهایی</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {filteredComments.length === 0 && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                    هیچ دیدگاهی متناسب با فیلتر شما یافت نشد.
                  </div>
                )}
              </div>

              {/* Comments Pagination */}
              {totalCommentsPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4" id="comments-pagination">
                  <button
                    disabled={commentsPage === 1}
                    onClick={() => setCommentsPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer focus:outline-none"
                    id="comments-pagination-prev"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalCommentsPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCommentsPage(pageNum)}
                      className={`w-7 h-7 font-mono text-xs font-bold rounded-lg flex items-center justify-center cursor-pointer transition-all focus:outline-none ${
                        commentsPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    disabled={commentsPage === totalCommentsPages}
                    onClick={() => setCommentsPage((p) => Math.min(totalCommentsPages, p + 1))}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer focus:outline-none"
                    id="comments-pagination-next"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SERVICE REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-6 animate-fade-in" id="admin-panel-requests">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3" id="requests-tab-header">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-2.5">درخواست‌های مشاوره و دریافت خدمات مالی</h2>
                
                <button
                  type="button"
                  onClick={handleExportRequestsToExcel}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow flex items-center gap-2 cursor-pointer transition-colors focus:outline-none self-end sm:self-auto"
                >
                  <Download className="h-4 w-4" />
                  <span>خروجی اکسل (دانلود CSV فارسی)</span>
                </button>
              </div>

              {/* Requests Search Bar */}
              <div className="relative" id="admin-requests-search-bar">
                <input
                  type="text"
                  placeholder="جستجو در نام، نام شرکت، تلفن یا شرح نیاز متقاضی..."
                  value={requestsSearch}
                  onChange={(e) => setRequestsSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                />
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>

              <div className="space-y-4" id="admin-requests-list">
                {currentRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-right space-y-4 shadow-sm"
                    id={`admin-req-box-${req.id}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3" id={`admin-req-header-${req.id}`}>
                      <div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base">{req.fullName}</h4>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-400 mt-1" id={`admin-req-submeta-${req.id}`}>
                          {req.companyName && <span className="bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded">{req.companyName} • {req.position}</span>}
                          <span>موبایل: <span className="font-mono text-slate-600 dark:text-slate-300" dir="ltr">{req.phone}</span></span>
                          {req.email && <span>ایمیل: <span className="font-mono text-slate-500" dir="ltr">{req.email}</span></span>}
                          {req.city && <span>محل: {req.city}</span>}
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 font-mono shrink-0">{req.createdAt}</span>
                    </div>

                    {/* Meta options grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/60" id={`admin-req-options-grid-${req.id}`}>
                      <div>
                        <span className="block text-[10px] text-slate-400">موضوع درخواست</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{req.requestSubject || 'ذکر نشده'}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400">نوع فعالیت</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{req.businessType || 'ذکر نشده'}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400">گردش مالی سالانه</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{req.annualTurnover || 'ذکر نشده'}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400">اولویت پرونده</span>
                        <span className={`font-extrabold ${req.priority === 'immediate' ? 'text-rose-500' : 'text-slate-600 dark:text-slate-400'}`}>
                          {req.priority === 'immediate' ? 'فوری' : req.priority === 'week' ? 'این هفته' : req.priority === 'month' ? 'این ماه' : 'بررسی'}
                        </span>
                      </div>
                    </div>

                    <div id={`admin-req-problem-${req.id}`}>
                      <span className="block text-[10px] text-slate-400 mb-1 font-bold">شرح جزئیات مشکل و نیاز کارفرما:</span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-blue-50/10 dark:bg-blue-950/5 border border-blue-500/10 p-3.5 rounded-xl text-justify whitespace-pre-line">
                        {req.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 text-xs" id={`admin-req-footer-${req.id}`}>
                      <div className="flex items-center gap-3" id={`admin-req-status-editor-${req.id}`}>
                        <span className="text-slate-500">بروزرسانی وضعیت پیگیری:</span>
                        <div className="flex gap-1.5" id={`admin-req-status-btns-${req.id}`}>
                          {(['pending', 'completed'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => onUpdateRequestStatus(req.id, st)}
                              className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors focus:outline-none ${
                                req.status === st
                                  ? st === 'pending'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                              }`}
                              id={`req-status-btn-${req.id}-${st}`}
                            >
                              {st === 'pending' ? 'در انتظار بررسی' : 'پایان پیگیری'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm('آیا پرونده این متقاضی به طور کامل بسته و حذف شود؟')) onDeleteRequest(req.id);
                        }}
                        className="px-3.5 py-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg flex items-center gap-1 transition-all focus:outline-none cursor-pointer"
                        id={`req-delete-btn-${req.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>حذف نهایی پرونده</span>
                      </button>
                    </div>
                  </div>
                ))}

                {filteredRequests.length === 0 && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                    هیچ درخواستی متناسب با فیلتر شما یافت نشد.
                  </div>
                )}
              </div>

              {/* Requests Pagination */}
              {totalRequestsPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4" id="requests-pagination">
                  <button
                    disabled={requestsPage === 1}
                    onClick={() => setRequestsPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer focus:outline-none"
                    id="requests-pagination-prev"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalRequestsPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setRequestsPage(pageNum)}
                      className={`w-7 h-7 font-mono text-xs font-bold rounded-lg flex items-center justify-center cursor-pointer transition-all focus:outline-none ${
                        requestsPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    disabled={requestsPage === totalRequestsPages}
                    onClick={() => setRequestsPage((p) => Math.min(totalRequestsPages, p + 1))}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer focus:outline-none"
                    id="requests-pagination-next"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: WEBSITE CONTENT MANAGEMENT */}
          {activeTab === 'content' && (
            <div className="space-y-6 animate-fade-in text-right" id="admin-panel-content">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-2.5">مدیریت محتوا و متون صفحات وب‌سایت</h2>
              
              {/* Content Sub Tabs */}
              <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-800 gap-1" id="content-subtabs">
                <button
                  onClick={() => setContentSubTab('general')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-xl border-t border-x transition-colors cursor-pointer focus:outline-none ${
                    contentSubTab === 'general'
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  صفحه اصلی و درباره ما
                </button>
                <button
                  onClick={() => setContentSubTab('services')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-xl border-t border-x transition-colors cursor-pointer focus:outline-none ${
                    contentSubTab === 'services'
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  سرفصل خدمات مالی ({servicesList.length})
                </button>
                <button
                  onClick={() => setContentSubTab('faqs')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-xl border-t border-x transition-colors cursor-pointer focus:outline-none ${
                    contentSubTab === 'faqs'
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  سوالات متداول (FAQs) ({faqsState.length})
                </button>

                <button
                  onClick={() => setContentSubTab('links')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-xl border-t border-x transition-colors cursor-pointer focus:outline-none ${
                    contentSubTab === 'links'
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  لینک‌های منو و فوتر
                </button>
              </div>

              {/* SUB TAB 1: GENERAL & ABOUT */}
              {contentSubTab === 'general' && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm" id="subtab-general-content">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">متون عمومی سایت</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">شعار اصلی هیرو (Landing Page Slogan)</label>
                      <input
                        type="text"
                        value={slogan}
                        onChange={(e) => setSlogan(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">توضیح کوتاه هیرو (Hero Description)</label>
                      <textarea
                        rows={3}
                        value={heroDescription}
                        onChange={(e) => setHeroDescription(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">متن دکمه ورود به آکادمی (هدر و هیرو)</label>
                        <input
                          type="text"
                          value={academyBtnText}
                          onChange={(e) => setAcademyBtnText(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                          placeholder="مثال: ورود به آکادمی اروند"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">لینک یا مسیر دکمه ورود به آکادمی</label>
                        <input
                          type="text"
                          value={academyBtnUrl}
                          onChange={(e) => setAcademyBtnUrl(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                          dir="ltr"
                          placeholder="مثال: login یا آدرس خارجی"
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">متون صفحه درباره ما</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">زیرعنوان صفحه درباره ما</label>
                          <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">معرفی جامع آکادمی مالی (پاراگراف اصلی درباره ما)</label>
                          <textarea
                            rows={6}
                            value={aboutLong}
                            onChange={(e) => setAboutLong(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">چشم‌انداز ما (Our Vision)</label>
                          <textarea
                            rows={3}
                            value={vision}
                            onChange={(e) => setVision(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">تنظیمات تماس، ارتباطات و فوتر (Footer)</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">تلفن پشتیبانی (فوتر و تماس)</label>
                          <input
                            type="text"
                            value={phoneState}
                            onChange={(e) => setPhoneState(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">ایمیل آکادمی</label>
                          <input
                            type="text"
                            value={emailState}
                            onChange={(e) => setEmailState(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-500 mb-1">آدرس فیزیکی دفتر مرکزی</label>
                          <input
                            type="text"
                            value={addressState}
                            onChange={(e) => setAddressState(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">لینک کانال تلگرام</label>
                          <input
                            type="text"
                            value={telegramUrlState}
                            onChange={(e) => setTelegramUrlState(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">لینک اینستاگرام</label>
                          <input
                            type="text"
                            value={instagramUrlState}
                            onChange={(e) => setInstagramUrlState(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={() => {
                          const updated = {
                            ...academyInfo,
                            slogan,
                            heroDescription,
                            subtitle,
                            aboutLong,
                            vision,
                            phone: phoneState,
                            email: emailState,
                            address: addressState,
                            telegramUrl: telegramUrlState,
                            instagramUrl: instagramUrlState,
                            academyBtnText,
                            academyBtnUrl,
                          };
                          onUpdateAcademyInfo(updated);
                          alert('تغییرات متون عمومی سایت با موفقیت ذخیره شد!');
                        }}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow transition-colors cursor-pointer focus:outline-none text-xs sm:text-sm"
                      >
                        ذخیره تغییرات عمومی سایت
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB TAB 2: EDIT SERVICES */}
              {contentSubTab === 'services' && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm" id="subtab-services-content">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">ویرایش سرفصل خدمات مالی</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setIsAddingService(!isAddingService)}
                        className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow cursor-pointer focus:outline-none flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        <span>{isAddingService ? 'مشاهده/ویرایش لیست' : 'تعریف خدمت جدید'}</span>
                      </button>

                      {!isAddingService && servicesList.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-bold">انتخاب خدمت جهت ویرایش:</span>
                          <select
                            value={selectedServiceId}
                            onChange={(e) => setSelectedServiceId(e.target.value)}
                            className="px-3 py-1.5 text-xs font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-700 dark:text-slate-300"
                          >
                            {servicesList.map((s) => (
                              <option key={s.id} value={s.id}>{s.title}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  {isAddingService ? (
                    /* ADD NEW SERVICE FORM */
                    <div className="space-y-4 border border-emerald-500/20 bg-emerald-500/5 p-5 rounded-2xl">
                      <h4 className="font-bold text-slate-800 dark:text-emerald-400 text-sm">تعریف خدمت مالی جدید</h4>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">عنوان خدمت جدید *</label>
                        <input
                          type="text"
                          value={newServiceTitle}
                          onChange={(e) => setNewServiceTitle(e.target.value)}
                          className="w-full px-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                          placeholder="مثال: خدمات مالیاتی پزشکان"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">توضیحات کوتاه جدید *</label>
                        <textarea
                          rows={2}
                          value={newServiceDesc}
                          onChange={(e) => setNewServiceDesc(e.target.value)}
                          className="w-full px-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                          placeholder="توضیح کوتاه درباره این خدمت..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">جزئیات و عناوین زیرمجموعه خدمت جدید (هر خط یک مورد)</label>
                        <textarea
                          rows={4}
                          value={newServiceDetails}
                          onChange={(e) => setNewServiceDetails(e.target.value)}
                          className="w-full px-4 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                          placeholder="مورد اول&#10;مورد دوم"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">نوع آیکون خدمت (نام آیکون لوکید)</label>
                        <select
                          value={newServiceIcon}
                          onChange={(e) => setNewServiceIcon(e.target.value)}
                          className="w-full px-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-700 dark:text-slate-300 text-right"
                        >
                          <option value="Calculator">حسابگر (Calculator)</option>
                          <option value="TrendingUp">روند صعودی (TrendingUp)</option>
                          <option value="FileText">پرونده متنی (FileText)</option>
                          <option value="ShieldAlert">امنیت و سپر (ShieldAlert)</option>
                          <option value="Briefcase">کیف کار (Briefcase)</option>
                          <option value="Check">تایید شده (Check)</option>
                        </select>
                      </div>

                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setIsAddingService(false);
                            setNewServiceTitle('');
                            setNewServiceDesc('');
                            setNewServiceDetails('');
                          }}
                          className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                        >
                          انصراف
                        </button>
                        <button
                          onClick={() => {
                            if (!newServiceTitle || !newServiceDesc) {
                              alert('عنوان و توضیحات الزامی هستند.');
                              return;
                            }
                            const detailsArray = newServiceDetails
                              .split('\n')
                              .map((line) => line.trim())
                              .filter((line) => line.length > 0);

                            const newSrv = {
                              id: newServiceTitle.toLowerCase().replace(/\s+/g, '-'),
                              title: newServiceTitle,
                              description: newServiceDesc,
                              details: detailsArray,
                              icon: newServiceIcon
                            };

                            const updatedList = [...servicesList, newSrv];
                            onUpdateServicesList(updatedList);
                            setSelectedServiceId(newSrv.id);
                            
                            // Reset state
                            setNewServiceTitle('');
                            setNewServiceDesc('');
                            setNewServiceDetails('');
                            setIsAddingService(false);
                            alert('خدمت جدید با موفقیت اضافه شد!');
                          }}
                          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow cursor-pointer"
                        >
                          افزودن این خدمت
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* EDIT EXISTING SERVICE */
                    servicesList.length > 0 ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">عنوان خدمت مالی</label>
                          <input
                            type="text"
                            value={serviceTitle}
                            onChange={(e) => setServiceTitle(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">توضیحات کوتاه (Description)</label>
                          <textarea
                            rows={3}
                            value={serviceDesc}
                            onChange={(e) => setServiceDesc(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs font-bold text-slate-500">جزئیات و عناوین زیرمجموعه خدمت (هر خط یک مورد)</label>
                            <span className="text-[10px] text-slate-400">مثال: تهیه و ارسال اظهارنامه عملکرد سالانه</span>
                          </div>
                          <textarea
                            rows={6}
                            value={serviceDetailsText}
                            onChange={(e) => setServiceDetailsText(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                            placeholder="مورد اول&#10;مورد دوم&#10;مورد سوم"
                          />
                        </div>

                        <div className="pt-4 flex justify-between items-center border-t border-slate-100 dark:border-slate-800/60">
                          <button
                            onClick={() => {
                              if (confirm('آیا مطمئن هستید که می‌خواهید این خدمت را حذف کنید؟')) {
                                const updatedList = servicesList.filter((s) => s.id !== selectedServiceId);
                                onUpdateServicesList(updatedList);
                                if (updatedList.length > 0) {
                                  setSelectedServiceId(updatedList[0].id);
                                } else {
                                  setSelectedServiceId('');
                                }
                                alert('خدمت مورد نظر با موفقیت حذف شد!');
                              }
                            }}
                            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl transition-colors cursor-pointer focus:outline-none text-xs"
                          >
                            حذف این خدمت
                          </button>

                          <button
                            onClick={() => {
                              const detailsArray = serviceDetailsText
                                .split('\n')
                                .map((line) => line.trim())
                                .filter((line) => line.length > 0);

                              const updatedList = servicesList.map((s) => {
                                if (s.id === selectedServiceId) {
                                  return {
                                    ...s,
                                    title: serviceTitle,
                                    description: serviceDesc,
                                    details: detailsArray,
                                  };
                                }
                                return s;
                              });

                              onUpdateServicesList(updatedList);
                              alert('اطلاعات خدمت با موفقیت بروزرسانی شد!');
                            }}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow transition-colors cursor-pointer focus:outline-none text-xs sm:text-sm"
                          >
                            ذخیره تغییرات این خدمت
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-slate-400 py-6">هیچ خدمتی تعریف نشده است. جهت ایجاد، دکمه بالا را کلیک کنید.</div>
                    )
                  )}
                </div>
              )}

              {/* SUB TAB 3: MANAGE FAQS */}
              {contentSubTab === 'faqs' && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm" id="subtab-faqs-content">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">مدیریت سوالات متداول (FAQs)</h3>
                    <button
                      onClick={() => {
                        setEditingFaqIdx(null);
                        setNewFaqQ('');
                        setNewFaqA('');
                        setEditingFaqIdx(-1); // -1 means adding new
                      }}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow flex items-center gap-1 cursor-pointer focus:outline-none"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>افزودن سوال جدید</span>
                    </button>
                  </div>

                  {/* FAQ Form (Add/Edit) */}
                  {editingFaqIdx !== null && (
                    <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4" id="faq-form">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="font-bold text-sm text-slate-800 dark:text-white">
                          {editingFaqIdx === -1 ? 'افزودن سوال متداول جدید' : 'ویرایش سوال متداول'}
                        </span>
                        <button onClick={() => setEditingFaqIdx(null)} className="text-slate-400 hover:text-slate-600">
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-slate-500 mb-1">صورت سوال (Question)</label>
                          <input
                            type="text"
                            value={newFaqQ}
                            onChange={(e) => setNewFaqQ(e.target.value)}
                            className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                            placeholder="مثال: آيا آکادمی اروند دادرسی پرونده‌های سنوات قبل را قبول می‌کند؟"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-500 mb-1">پاسخ تشریحی (Answer)</label>
                          <textarea
                            rows={3}
                            value={newFaqA}
                            onChange={(e) => setNewFaqA(e.target.value)}
                            className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                            placeholder="پاسخ سوال را بنویسید..."
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingFaqIdx(null)}
                            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            انصراف
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!newFaqQ || !newFaqA) {
                                alert('لطفاً هم صورت سوال و هم پاسخ را وارد کنید.');
                                return;
                              }
                              let updated: any[];
                              if (editingFaqIdx === -1) {
                                updated = [...faqsState, { q: newFaqQ, a: newFaqA }];
                              } else {
                                updated = [...faqsState];
                                updated[editingFaqIdx!] = { q: newFaqQ, a: newFaqA };
                              }
                              setFaqsState(updated);
                              onUpdateAcademyInfo({
                                ...academyInfo,
                                faqs: updated
                              });
                              setEditingFaqIdx(null);
                              alert('سوال متداول با موفقیت ذخیره شد!');
                            }}
                            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            ذخیره سوال
                          </button>
                        </div>
                      </div>
                    )}

                    {/* FAQ List Display */}
                    <div className="space-y-4 pt-4">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">لیست سوالات متداول موجود</h4>
                      <div className="space-y-3">
                        {faqsState.map((faq, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-150 dark:border-slate-800/60 flex items-start justify-between gap-4">
                            <div className="space-y-1 flex-1">
                              <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">س: {faq.q}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">ج: {faq.a}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setNewFaqQ(faq.q);
                                  setNewFaqA(faq.a);
                                  setEditingFaqIdx(idx);
                                }}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors cursor-pointer"
                                title="ویرایش"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm('آیا از حذف این سوال متداول مطمئن هستید؟')) {
                                    const updated = faqsState.filter((_, i) => i !== idx);
                                    setFaqsState(updated);
                                    onUpdateAcademyInfo({
                                      ...academyInfo,
                                      faqs: updated
                                    });
                                    alert('سوال متداول با موفقیت حذف شد.');
                                  }
                                }}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg transition-colors cursor-pointer"
                                title="حذف"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                        {faqsState.length === 0 && (
                          <div className="text-center py-6 text-slate-400 text-xs">هیچ سوال متداولی تعریف نشده است. برای افزودن از دکمه بالا استفاده کنید.</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              {/* SUB TAB 5: MENU AND FOOTER LINKS */}
              {contentSubTab === 'links' && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm" id="subtab-links-content">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">مدیریت پیشرفته منو و فوتر سایت</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <span>کنترل کامل لینک‌های منوی بالای سایت (Header) و دسترسی سریع فوتر با امکان افزودن، ویرایش، حذف و سفارشی‌سازی مقاصد پیوندها</span>
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Header Links Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm border-r-4 border-teal-500 pr-2">لینک‌های منوی بالای سایت (Header Menu)</h4>
                        <button
                          type="button"
                          onClick={() => {
                            setHeaderLinksState([...headerLinksState, { id: 'new-link', label: 'پیوند جدید' }]);
                          }}
                          className="px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                          <span>افزودن لینک منو</span>
                        </button>
                      </div>

                      <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-150 dark:border-slate-800/60">
                        {headerLinksState.map((link, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row items-end gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800/50 last:border-0 last:pb-0">
                            <div className="flex-1 w-full space-y-1">
                              <label className="block text-[11px] font-bold text-slate-400">عنوان نمایش فارسی</label>
                              <input
                                type="text"
                                value={link.label}
                                onChange={(e) => {
                                  const updated = [...headerLinksState];
                                  updated[idx] = { ...updated[idx], label: e.target.value };
                                  setHeaderLinksState(updated);
                                }}
                                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100 text-right"
                                placeholder="مثال: آموزش‌ها"
                              />
                            </div>

                            <div className="flex-1 w-full space-y-1">
                              <label className="block text-[11px] font-bold text-slate-400">شناسه صفحه (مانند home, about, services, blog, news, contact) یا آدرس کامل اینترنتی</label>
                              <input
                                type="text"
                                value={link.id}
                                onChange={(e) => {
                                  const updated = [...headerLinksState];
                                  updated[idx] = { ...updated[idx], id: e.target.value };
                                  setHeaderLinksState(updated);
                                }}
                                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                                dir="ltr"
                                placeholder="home یا https://example.com"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm('آیا از حذف این لینک از منو مطمئن هستید؟')) {
                                  setHeaderLinksState(headerLinksState.filter((_, i) => i !== idx));
                                }
                              }}
                              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 rounded-xl transition-colors cursor-pointer"
                              title="حذف لینک"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        {headerLinksState.length === 0 && (
                          <div className="text-center py-4 text-slate-400 text-xs">هیچ لینکی در منوی بالا تعریف نشده است.</div>
                        )}
                      </div>
                    </div>

                    {/* Quick Access Title */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm border-r-4 border-blue-500 pr-2">عنوان بخش دسترسی سریع در فوتر</h4>
                      <div>
                        <input
                          type="text"
                          value={quickAccessTitle}
                          onChange={(e) => setQuickAccessTitle(e.target.value)}
                          placeholder="مثال: دسترسی سریع"
                          className="w-full max-w-md px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                        />
                      </div>
                    </div>

                    {/* Quick Access Links Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm border-r-4 border-blue-500 pr-2">پیوندهای بخش دسترسی سریع فوتر (Footer Links)</h4>
                        <button
                          type="button"
                          onClick={() => {
                            setQuickAccessLinksState([...quickAccessLinksState, { id: 'new-link', label: 'پیوند جدید' }]);
                          }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                          <span>افزودن لینک فوتر</span>
                        </button>
                      </div>

                      <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-150 dark:border-slate-800/60">
                        {quickAccessLinksState.map((link, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row items-end gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800/50 last:border-0 last:pb-0">
                            <div className="flex-1 w-full space-y-1">
                              <label className="block text-[11px] font-bold text-slate-400">عنوان نمایش فارسی</label>
                              <input
                                type="text"
                                value={link.label}
                                onChange={(e) => {
                                  const updated = [...quickAccessLinksState];
                                  updated[idx] = { ...updated[idx], label: e.target.value };
                                  setQuickAccessLinksState(updated);
                                }}
                                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                                placeholder="مثال: قوانین مالیات"
                              />
                            </div>

                            <div className="flex-1 w-full space-y-1">
                              <label className="block text-[11px] font-bold text-slate-400">شناسه صفحه (مانند home, about, services, blog, news, contact) یا آدرس کامل اینترنتی</label>
                              <input
                                type="text"
                                value={link.id}
                                onChange={(e) => {
                                  const updated = [...quickAccessLinksState];
                                  updated[idx] = { ...updated[idx], id: e.target.value };
                                  setQuickAccessLinksState(updated);
                                }}
                                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                                dir="ltr"
                                placeholder="home یا https://example.com"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm('آیا از حذف این لینک از فوتر مطمئن هستید؟')) {
                                  setQuickAccessLinksState(quickAccessLinksState.filter((_, i) => i !== idx));
                                }
                              }}
                              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 rounded-xl transition-colors cursor-pointer"
                              title="حذف لینک"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        {quickAccessLinksState.length === 0 && (
                          <div className="text-center py-4 text-slate-400 text-xs">هیچ لینکی در فوتر تعریف نشده است.</div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = {
                            ...academyInfo,
                            headerLinks: headerLinksState,
                            quickAccessTitle: quickAccessTitle,
                            quickAccessLinks: quickAccessLinksState,
                          };
                          onUpdateAcademyInfo(updated);
                          alert('تنظیمات منوها و فوتر با موفقیت ذخیره شد!');
                        }}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow transition-colors cursor-pointer focus:outline-none text-xs sm:text-sm"
                      >
                        ذخیره تنظیمات منوها و فوتر
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: CATEGORIES MANAGEMENT */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-fade-in text-right" id="admin-panel-categories">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-2.5">مدیریت دسته‌بندی موضوعی</h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                  دسته‌بندی‌های مجزا برای بخش مقالات آموزشی و اخبار آکادمی را در این بخش مدیریت کنید.
                </p>
              </div>

              {/* Category Segment Selector */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1" id="categories-segment-selector">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCatType('article');
                    setEditingCatId(null);
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-xl border-t border-x transition-colors cursor-pointer focus:outline-none ${
                    selectedCatType === 'article'
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  دسته‌بندی‌های مقالات آموزشی
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCatType('news');
                    setEditingCatId(null);
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-xl border-t border-x transition-colors cursor-pointer focus:outline-none ${
                    selectedCatType === 'news'
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  دسته‌بندی‌های اخبار و اطلاعیه‌ها
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm" id="categories-main-content">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    {selectedCatType === 'article' ? 'فهرست موضوعات مقالات' : 'فهرست موضوعات اخبار'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCatId(-1); // -1 means add new
                      setNewCatName('');
                      setNewCatSlug('');
                    }}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow flex items-center gap-1 cursor-pointer focus:outline-none"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>افزودن دسته‌بندی جدید</span>
                  </button>
                </div>

                {/* Add/Edit Category Form */}
                {editingCatId !== null && (
                  <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4" id="category-edit-form">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-sm text-slate-800 dark:text-white">
                        {editingCatId === -1 ? 'ایجاد دسته‌بندی جدید' : 'ویرایش مشخصات دسته‌بندی'}
                      </span>
                      <button type="button" onClick={() => setEditingCatId(null)} className="text-slate-400 hover:text-slate-600">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">عنوان فارسی دسته‌بندی</label>
                        <input
                          type="text"
                          value={newCatName}
                          onChange={(e) => {
                            setNewCatName(e.target.value);
                            if (editingCatId === -1) {
                              setNewCatSlug(e.target.value.toLowerCase().trim().replace(/\s+/g, '-'));
                            }
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                          placeholder="مثال: آموزش قوانین سامانه مودیان"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-500 mb-1">نام انگلیسی برای آدرس (Slug)</label>
                        <input
                          type="text"
                          value={newCatSlug}
                          onChange={(e) => setNewCatSlug(e.target.value)}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                          dir="ltr"
                          placeholder="taxpayers-system"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingCatId(null)}
                        className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        انصراف
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newCatName || !newCatSlug) {
                            alert('لطفاً هم نام و هم اسلاگ دسته‌بندی را وارد کنید.');
                            return;
                          }
                          if (editingCatId === -1) {
                            onAddCategory({ name: newCatName, slug: newCatSlug, type: selectedCatType });
                          } else {
                            onEditCategory(editingCatId, newCatName, newCatSlug);
                          }
                          setEditingCatId(null);
                          alert('تغییرات با موفقیت ذخیره شد!');
                        }}
                        className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        ذخیره اطلاعات
                      </button>
                    </div>
                  </div>
                )}

                {/* Categories List */}
                <div className="space-y-2.5">
                  {categories
                    .filter((c) => selectedCatType === 'news' ? c.type === 'news' : (c.type === 'article' || !c.type))
                    .map((cat) => (
                      <div
                        key={cat.id}
                        className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800/80 rounded-xl flex items-center justify-between"
                        id={`category-row-${cat.id}`}
                      >
                        <div className="space-y-0.5 text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-sm">
                              {cat.name}
                            </span>
                            {cat.id <= 5 && (
                              <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded">سیستمی</span>
                            )}
                          </div>
                          <span className="block text-xs text-slate-400 font-mono" dir="ltr">
                            /{cat.slug}
                          </span>
                        </div>

                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCatId(cat.id);
                              setNewCatName(cat.name);
                              setNewCatSlug(cat.slug);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg cursor-pointer transition-colors"
                            title="ویرایش"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          
                          {cat.id > 5 ? (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`آیا مایل به حذف دسته‌بندی موضوعی "${cat.name}" هستید؟`)) {
                                  onDeleteCategory(cat.id);
                                  alert('دسته‌بندی موضوعی با موفقیت حذف شد.');
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer transition-colors"
                              title="حذف"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="p-1.5 text-slate-300 dark:text-slate-700 cursor-not-allowed"
                              title="دسته‌بندی‌های پیش‌فرض سیستم غیرقابل حذف هستند"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  {categories.filter((c) => selectedCatType === 'news' ? c.type === 'news' : (c.type === 'article' || !c.type)).length === 0 && (
                    <div className="text-center text-slate-400 py-6">هیچ دسته‌بندی موضوعی برای این بخش یافت نشد.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SYSTEM CONFIG RESET & ADMINS MANAGEMENT */}
          {activeTab === 'system' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 text-right animate-fade-in" id="admin-panel-system">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-2.5">تنظیمات و کاربران سیستم</h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                  مدیریت مدیران ارشد سیستم و ابزارهای هسته وب‌سایت در این بخش قرار دارد.
                </p>
              </div>

              {/* SECTION A: ADMINS MANAGEMENT */}
              <div className="p-5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl space-y-6" id="admins-management-box">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base border-b border-slate-200 dark:border-slate-800 pb-3">
                  <PlusCircle className="h-5 w-5 text-blue-500" />
                  <span>مدیریت مدیران سیستم (Admins)</span>
                </h4>

                {/* Admins List */}
                <div className="space-y-3" id="admins-list">
                  {/* Primary Admin */}
                  <div className="p-3.5 bg-blue-500/10 border border-blue-200 dark:border-blue-900/40 rounded-xl flex items-center justify-between gap-4">
                    <div className="text-right">
                      <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{primaryAdminUser}</span>
                      <span className="block text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">مدیر کل اصلی (غیرقابل تغییر)</span>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg text-[10px] font-bold">مالک سیستم</span>
                  </div>

                  {/* Additional Admins */}
                  {additionalAdmins.map((admin, idx) => (
                    <div key={idx} className="p-3.5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/60 rounded-xl flex items-center justify-between gap-4">
                      <div className="text-right">
                        <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{admin.username}</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">نقش: {admin.role}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`آیا از حذف دسترسی ادمین "${admin.username}" مطمئن هستید؟`)) {
                            onDeleteAdmin(admin.username);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer transition-colors"
                        title="حذف دسترسی"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Admin Form */}
                <div className="bg-white dark:bg-slate-900 p-4 border border-slate-150 dark:border-slate-800 rounded-xl space-y-4" id="add-admin-form">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">افزودن مدیر جدید به سیستم</h5>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">نام کاربری ادمین</label>
                      <input
                        type="text"
                        value={newAdminUser}
                        onChange={(e) => setNewAdminUser(e.target.value)}
                        placeholder="مثال: admin_assistant"
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">کلمه عبور</label>
                      <input
                        type="password"
                        value={newAdminPass}
                        onChange={(e) => setNewAdminPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">سمت / نقش</label>
                      <input
                        type="text"
                        value={newAdminRole}
                        onChange={(e) => setNewAdminRole(e.target.value)}
                        placeholder="مثال: مدیر کمکی یا نویسنده"
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!newAdminUser || !newAdminPass) {
                        alert('لطفاً نام کاربری و کلمه عبور را وارد کنید.');
                        return;
                      }
                      if (newAdminUser === primaryAdminUser) {
                        alert('این نام کاربری با نام کاربری مدیر اصلی تداخل دارد.');
                        return;
                      }
                      if (additionalAdmins.some(admin => admin.username === newAdminUser)) {
                        alert('این نام کاربری قبلاً اضافه شده است.');
                        return;
                      }

                      onAddAdmin(newAdminUser, newAdminPass, newAdminRole);
                      setNewAdminUser('');
                      setNewAdminPass('');
                      setNewAdminRole('مدیر کمکی');
                      alert('مدیر جدید با موفقیت اضافه شد!');
                    }}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs shadow transition-all cursor-pointer flex items-center gap-1.5 mr-auto"
                  >
                    <Plus className="h-4 w-4" />
                    <span>ثبت و ایجاد مدیر جدید</span>
                  </button>
                </div>
              </div>

              {/* SECTION B: SYSTEM RESET */}
              <div className="p-5 bg-rose-50/40 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/50 rounded-2xl space-y-4" id="system-reset-box">
                <h4 className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2 text-sm sm:text-base">
                  <RotateCcw className="h-5 w-5 animate-spin" />
                  <span>بازنشانی به حالت کارخانه (Reset System)</span>
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed text-justify">
                  با کلیک روی دکمه زیر، فایل تنظیمات <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded text-rose-600">config/database.php</code> به صورت مجازی پاک خواهد شد. در نتیجه وب‌سایت مجدداً قفل شده و همانند اولین ورود، صفحه جادویی نصب‌کننده خودکار دیتابیس (WordPress-like Installer) برای شما نمایان می‌شود تا بتوانید عملکرد نصب را مجدداً آزمایش کنید.
                </p>
                
                <button
                  onClick={() => {
                    if (confirm('آیا مطمئن هستید که می‌خواهید کل سیستم را بازنشانی کنید؟ تمام مقالات جدید و نظرات حذف خواهند شد.')) onResetSystem();
                  }}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl shadow transition-all focus:outline-none cursor-pointer text-xs sm:text-sm"
                  id="system-reset-btn"
                >
                  حذف فایل کانفیگ و بازگشت به صفحه نصب
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
