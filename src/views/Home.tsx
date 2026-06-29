import { ArrowLeft, ChevronDown, CheckCircle, HelpCircle, Shield, Award, Users, Hourglass, Globe, Star } from 'lucide-react';
import { ACADEMY_INFO, SERVICES_LIST } from '../data';
import { Post } from '../types';
import { useState } from 'react';

interface HomeProps {
  latestPosts: Post[];
  allPosts?: Post[];
  setCurrentView: (view: string) => void;
  setSelectedPostSlug: (slug: string) => void;
  academyInfo?: typeof ACADEMY_INFO;
  servicesList?: typeof SERVICES_LIST;
}

export default function Home({
  latestPosts,
  allPosts = [],
  setCurrentView,
  setSelectedPostSlug,
  academyInfo = ACADEMY_INFO,
  servicesList = SERVICES_LIST,
}: HomeProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'accounting': return <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      case 'tax': return <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      case 'litigation': return <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      default: return <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="space-y-20 pb-16 animate-fade-in" id="home-view" dir="rtl">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-blue-950/20 py-20 md:py-28 border-b border-slate-200 dark:border-slate-900 transition-colors duration-300" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="hero-grid">
            <div className="space-y-6 text-right lg:col-span-7" id="hero-text-content">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-full border border-blue-100 dark:border-blue-900/50" id="hero-badge">
                ✨ معتبرترین مرجع دانش و فناوری مالی
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.15]" id="hero-main-title">
                آکادمی مالی اروند؛ <span className="text-blue-600 dark:text-blue-400 italic">هوشمندانه</span> تصمیم بگیرید
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 font-bold leading-relaxed" id="hero-sub-title">
                {academyInfo.slogan}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed" id="hero-desc">
                {academyInfo.heroDescription}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4" id="hero-cta-group">
                <button
                  onClick={() => setCurrentView('contact')}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer focus:outline-none"
                  id="hero-cta-primary"
                >
                  <span>دریافت خدمات و مشاوره</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentView('services')}
                  className="px-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl transition-all cursor-pointer focus:outline-none"
                  id="hero-cta-secondary"
                >
                  <span>مشاهده خدمات آکادمی</span>
                </button>
                <button
                  onClick={() => setCurrentView('login')}
                  className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black rounded-xl shadow-lg shadow-emerald-500/15 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer focus:outline-none border border-emerald-500/10"
                  id="hero-cta-academy-login"
                >
                  <Users className="h-4 w-4" />
                  <span>ورود به آکادمی اروند</span>
                </button>
              </div>
            </div>

            {/* Visual element / stats cards */}
            <div className="relative flex justify-center lg:justify-end lg:col-span-5" id="hero-visual">
              <div className="absolute inset-0 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl w-72 h-72 m-auto" />
              <div className="relative bg-white dark:bg-slate-900/80 rounded-3xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-2xl max-w-sm w-full space-y-6 z-10 backdrop-blur-sm" id="hero-stats-card">
                <div className="flex items-center justify-between" id="hero-stats-header">
                  <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 tracking-wider">پنل گزارش عملکرد مالی</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="space-y-4" id="hero-stats-items">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-900" id="hero-stat-1">
                    <span className="block text-xs text-slate-400 mb-1">دقت و تطبیق استانداردها</span>
                    <div className="flex items-center justify-between" id="hero-stat-1-row">
                      <span className="text-sm font-bold text-slate-800 dark:text-white">۱۰۰٪ انطباق مالیاتی</span>
                      <span className="text-xs text-emerald-500 font-bold">ساده و ایمن</span>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-900" id="hero-stat-2">
                    <span className="block text-xs text-slate-400 mb-1">صرفه‌جویی در هزینه‌های جریمه</span>
                    <div className="flex items-center justify-between" id="hero-stat-2-row">
                      <span className="text-sm font-bold text-slate-800 dark:text-white">تا ۸۰٪ کاهش ریسک قانونی</span>
                      <span className="text-xs text-blue-500 font-bold font-mono">Arvand</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3 text-xs text-slate-500" id="hero-stats-footer">
                  <Users className="h-4 w-4 text-slate-400 shrink-0" />
                  <span className="leading-relaxed">بیش از ۱۲۰ شرکت تولیدی و خدماتی همراه ما هستند</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special News Section (خبرهای ویژه) */}
      {allPosts && allPosts.filter(p => p.isSpecial).length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20" id="special-news-section">
          <div className="bg-amber-500/5 dark:bg-amber-500/5 border border-amber-500/20 dark:border-amber-500/10 rounded-3xl p-6 shadow-xl shadow-amber-500/5">
            <div className="flex items-center gap-2 mb-4 border-b border-amber-500/10 pb-3" id="special-news-header">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <h3 className="text-base font-black text-amber-900 dark:text-amber-300">اخبار ویژه آکادمی اروند</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="special-news-grid">
              {allPosts
                .filter(p => p.isSpecial)
                .slice(0, 5)
                .map(post => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setSelectedPostSlug(post.slug);
                      setCurrentView('post-detail');
                    }}
                    className="bg-white dark:bg-slate-900/60 p-4 border border-amber-500/10 rounded-2xl hover:border-blue-500/40 transition-all cursor-pointer group flex flex-col justify-between shadow-sm"
                  >
                    <div className="space-y-1.5 text-right">
                      <span className="text-[10px] bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold px-2 py-0.5 rounded">ویژه</span>
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 text-sm leading-snug line-clamp-2 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-3 mt-3 border-t border-slate-50 dark:border-slate-800/40">
                      <span>{post.createdAt}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:underline">مشاهده جزئیات ←</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Services Overview Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-services">
        <div className="text-center max-w-2xl mx-auto mb-12" id="home-services-header">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">خدمات تخصصی و راهکارهای مالی جامع</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            در فضای اقتصادی امروز، مدیریت مالی حرفه‌ای یک ضرورت است. ما در اروند بازوی اجرایی شما خواهیم بود.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="home-services-grid">
          {servicesList.slice(0, 3).map((srv) => (
            <div
              key={srv.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 rounded-3xl hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              id={`home-service-card-${srv.id}`}
              onClick={() => setCurrentView('services')}
            >
              <div className="space-y-4" id={`home-service-content-${srv.id}`}>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl w-fit text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" id={`home-service-icon-${srv.id}`}>
                  {getIcon(srv.id)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{srv.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify">{srv.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentView('services');
                }}
                className="mt-6 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all cursor-pointer focus:outline-none text-right"
                id={`home-service-more-btn-${srv.id}`}
              >
                <span>اطلاعات بیشتر و جزئیات خدمت</span>
                <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8" id="home-services-more-cta-wrapper">
          <button
            onClick={() => setCurrentView('services')}
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500/50 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-bold rounded-full transition-all cursor-pointer focus:outline-none"
            id="home-services-view-all-btn"
          >
            <span>مشاهده همه ۸ سرفصل خدمات مالی اروند</span>
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 3. Why Us ("چرا اروند؟") */}
      <section className="bg-slate-50/50 dark:bg-slate-900/40 py-16 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300" id="home-why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start" id="why-us-grid">
            {/* Title / Info */}
            <div className="space-y-4 lg:col-span-1 text-right" id="why-us-info-panel">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Arvand Academy</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">چرا سپردن امور مالی به آکادمی اروند؟</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
                ما صرفاً اسناد مالی شما را ثبت نمی‌کنیم؛ ما به عنوان یک شریک مالی و مشاور استراتژیک دلسوز، از مرحله طراحی ساختار مالی تا اجرا و دادرسی، شانه به شانه در کنار کسب‌وکار شما خواهیم بود.
              </p>
              <div className="space-y-3 pt-4" id="why-us-bullets-list">
                {academyInfo.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300" id={`why-us-bullet-${i}`}>
                    <CheckCircle className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2" id="why-us-points-grid">
              {academyInfo.whyUsPoints.map((pt, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 space-y-2.5" id={`why-us-point-${idx}`}>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                    {pt.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pr-3 text-justify">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Latest Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-blog">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10" id="home-blog-header">
          <div className="space-y-1 text-right" id="home-blog-header-text">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">جدیدترین مقالات و اخبار مالیاتی</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">تحلیل‌های روز، قوانین جدید و آموزش‌های تخصصی بازار مالی ایران</p>
          </div>
          <button
            onClick={() => setCurrentView('blog')}
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center gap-1 shrink-0 cursor-pointer focus:outline-none"
            id="home-blog-view-all-btn"
          >
            <span>ورود به بخش مقالات</span>
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="home-blog-grid">
          {latestPosts.map((p) => (
            <article
              key={p.id}
              onClick={() => {
                setSelectedPostSlug(p.slug);
                setCurrentView('post-detail');
              }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 cursor-pointer group"
              id={`home-blog-post-${p.id}`}
            >
              <div className="relative h-52 overflow-hidden bg-slate-100" id={`home-blog-post-img-wrapper-${p.id}`}>
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  id={`home-blog-post-img-${p.id}`}
                />
                <span className="absolute top-4 right-4 text-[10px] font-extrabold uppercase bg-blue-600 text-white px-3 py-1.5 rounded-full tracking-wider" id={`home-blog-post-badge-${p.id}`}>
                  {p.id === 1 ? 'مهم' : 'آموزشی'}
                </span>
              </div>
              <div className="p-6 space-y-3 text-right" id={`home-blog-post-body-${p.id}`}>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono" id={`home-blog-post-meta-${p.id}`}>
                  <span>{p.createdAt}</span>
                  <span>{p.views} بازدید</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug text-base">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed text-justify">
                  {p.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="home-faqs">
        <div className="text-center mb-10 space-y-1" id="home-faqs-header">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">پاسخ به سوالات متداول مالی شما</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">برخی از رایج‌ترین سوالات مودیان و کارفرمایان ارجمند</p>
        </div>

        <div className="space-y-4" id="home-faqs-accordion">
          {academyInfo.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:border-blue-500/30 dark:hover:border-blue-500/30"
                id={`faq-item-${idx}`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-right px-6 py-4.5 font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer focus:outline-none"
                  id={`faq-toggle-${idx}`}
                >
                  <span className="text-sm pr-3 border-r-4 border-blue-600 dark:border-blue-400 leading-relaxed text-slate-900 dark:text-slate-100">{faq.q}</span>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`} />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-60 border-t border-slate-100 dark:border-slate-800' : 'max-h-0'
                  }`}
                  id={`faq-body-${idx}`}
                >
                  <div className="px-6 py-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-950/30 text-justify">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Instant Consultation Call-to-action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-cta-banner">
        <div className="bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden shadow-2xl shadow-blue-500/10" id="cta-banner-card">
          <div className="absolute inset-0 bg-grid-white opacity-5" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6" id="cta-banner-content">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">به راهکار یا مشاوره فوری نیاز دارید؟</h3>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed text-justify sm:text-center">
              مشخصات کسب‌وکار و نیاز خود را از طریق فرم الکترونیکی برای ما بفرستید. تیم مشاوران ارشد اروند در کوتاه‌ترین زمان، پرونده شما را ارزیابی کرده و تماس خواهند گرفت.
            </p>
            <div className="pt-2" id="cta-banner-buttons">
              <button
                onClick={() => setCurrentView('contact')}
                className="px-8 py-3.5 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl shadow-lg transition-all cursor-pointer focus:outline-none text-sm hover:scale-[1.02]"
                id="cta-banner-btn"
              >
                ارسال مشخصات و دریافت خدمات مالی
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
