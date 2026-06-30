import { useState, useEffect } from 'react';
import { Post, Category } from '../types';
import { Search, Calendar, Eye, ArrowLeft, Folder, ChevronLeft, ChevronRight, Bell, Hash } from 'lucide-react';

interface NewsProps {
  posts: Post[];
  categories: Category[];
  setSelectedPostSlug: (slug: string) => void;
  setCurrentView: (view: string) => void;
}

export default function News({ posts, categories, setSelectedPostSlug, setCurrentView }: NewsProps) {
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; // Paginate with 4 news per page

  // Filter posts to only show 'news' type
  const newsPosts = posts.filter(p => p.type === 'news');
  const newsCategories = categories.filter(c => c.type === 'news');

  const filteredNews = newsPosts.filter((p) => {
    const matchesCategory = selectedCatId === null || p.categoryId === selectedCatId;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset page to 1 when search or category selection changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCatId, searchQuery]);

  const totalPages = Math.ceil(filteredNews.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="space-y-8 pb-16 animate-fade-in" id="news-view" dir="rtl">
      {/* Header */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300" id="news-header">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full mb-2">
            <Bell className="h-6 w-6 animate-swing" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">اخبار و رویدادهای مالیاتی</h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            جدیدترین بخشنامه‌ها، فراخوان‌های رسمی سازمان امور مالیاتی و اخبار مالی را از این بخش دنبال کنید.
          </p>
        </div>
      </section>

      {/* Main News Core */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="news-main-section">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="news-grid-layout">
          
          {/* Sidebar Filter */}
          <div className="lg:col-span-1 space-y-6" id="news-sidebar">
            {/* Search */}
            <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-2" id="news-search-box">
              <label className="block text-xs font-bold text-slate-500 uppercase pr-1">جستجو در اخبار</label>
              <div className="relative" id="news-search-input-wrapper">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="جستجو در اخبار..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                  id="input-news-search"
                />
              </div>
            </div>

            {/* Categories Menu */}
            <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4 text-right" id="news-categories-box">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm border-r-3 border-blue-500 pr-2">دسته‌بندی موضوعی اخبار</h4>
              <div className="flex flex-col gap-1.5 text-sm" id="news-categories-list">
                <button
                  onClick={() => setSelectedCatId(null)}
                  className={`w-full text-right px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer focus:outline-none ${
                    selectedCatId === null
                      ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                  id="news-cat-btn-all"
                >
                  <span>همه موضوعات</span>
                  <Folder className="h-4 w-4 shrink-0 opacity-40" />
                </button>
                {newsCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCatId(cat.id)}
                    className={`w-full text-right px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer focus:outline-none ${
                      selectedCatId === cat.id
                        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                    id={`news-cat-btn-${cat.id}`}
                  >
                    <span>{cat.name}</span>
                    <Hash className="h-3.5 w-3.5 shrink-0 opacity-30" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* News List */}
          <div className="lg:col-span-3" id="news-list-container">
            {filteredNews.length > 0 ? (
              <div className="space-y-10" id="news-items-inner-wrapper">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="news-items-grid">
                  {currentNews.map((p) => {
                    const categoryName = categories.find((c) => c.id === p.categoryId)?.name || 'اخبار آکادمی';
                    return (
                      <article
                        key={p.id}
                        onClick={() => {
                          setSelectedPostSlug(p.slug);
                          setCurrentView('post-detail');
                        }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                        id={`news-post-card-${p.id}`}
                      >
                        <div className="relative h-44 overflow-hidden bg-slate-100 shrink-0" id={`news-post-img-wrapper-${p.id}`}>
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            id={`news-post-img-${p.id}`}
                          />
                          <span className="absolute top-3 right-3 text-xs font-semibold bg-blue-600 text-white px-2.5 py-1 rounded shadow" id={`news-post-badge-${p.id}`}>
                            {categoryName}
                          </span>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4" id={`news-post-body-${p.id}`}>
                          <div className="space-y-2 text-right" id={`news-post-text-${p.id}`}>
                            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono" id={`news-post-meta-${p.id}`}>
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.createdAt}</span>
                              <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {p.views}</span>
                            </div>
                            <h3 className="font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug text-base line-clamp-2">
                              {p.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                              {p.summary}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-50 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-500" id={`news-post-footer-${p.id}`}>
                            <span>مشاهده جزئیات خبر</span>
                            <ArrowLeft className="h-3.5 w-3.5 shrink-0 group-hover:translate-x-[-4px] transition-transform" />
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4" id="news-pagination">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 dark:text-slate-400 cursor-pointer focus:outline-none transition-colors"
                      id="news-page-prev"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-3" id="news-page-indicator">
                      صفحه {currentPage} از {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 dark:text-slate-400 cursor-pointer focus:outline-none transition-colors"
                      id="news-page-next"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl" id="news-empty-state">
                <span className="block text-slate-400 text-sm">هیچ خبر جدیدی در این دسته‌بندی یافت نشد.</span>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
