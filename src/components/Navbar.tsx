import { useState } from 'react';
import { Sun, Moon, LogIn, LogOut, FileCode, Menu, X, Landmark, User, HelpCircle, Briefcase, FileText } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  isInstalled: boolean;
  isAdminLoggedIn: boolean;
  adminUsername?: string;
  onLogout: () => void;
  academyInfo?: any;
}

export default function Navbar({
  currentView,
  setCurrentView,
  darkMode,
  setDarkMode,
  isInstalled,
  isAdminLoggedIn,
  adminUsername,
  onLogout,
  academyInfo,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = academyInfo?.headerLinks || [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'about', label: 'درباره ما' },
    { id: 'services', label: 'خدمات مالی' },
    { id: 'contact', label: 'دریافت خدمات' },
    { id: 'blog', label: 'مقالات آموزشی' },
    { id: 'news', label: 'اخبار' },
  ];

  const handleNav = (viewId: string) => {
    if (viewId.startsWith('http://') || viewId.startsWith('https://')) {
      window.open(viewId, '_blank');
    } else {
      setCurrentView(viewId);
    }
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300" id="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Right side: Logo & Desktop Links */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 focus:outline-none cursor-pointer"
              id="nav-logo"
            >
              <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md shadow-blue-500/20" id="nav-logo-icon-container">
                <Landmark className="h-5 w-5" id="nav-logo-icon" />
              </div>
              <div className="text-right" id="nav-logo-text">
                <span className="block font-bold text-lg text-slate-900 dark:text-white leading-tight">آکادمی مالی اروند</span>
                <span className="block text-xs text-blue-600 dark:text-blue-400 font-medium tracking-wider">Arvand Academy</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            {isInstalled && (
              <div className="hidden md:flex items-center gap-6" id="nav-links-desktop">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`pb-1 text-sm font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer border-b-2 ${
                      currentView === item.id
                        ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                        : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    id={`nav-item-${item.id}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Left side: Buttons & Toggles */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Switch */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer focus:outline-none"
              title={darkMode ? "حالت روز" : "حالت شب"}
              id="dark-mode-toggle"
            >
              {darkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </button>

            {/* Admin Dashboard / Login */}
            {isInstalled && isAdminLoggedIn && (
              <div className="flex items-center gap-1.5" id="nav-admin-logged-in-container">
                <button
                  onClick={() => handleNav('admin-panel')}
                  className={`hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer focus:outline-none ${
                    currentView === 'admin-panel'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/20'
                      : 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
                  }`}
                  id="nav-admin-panel-btn"
                >
                  <User className="h-4 w-4" />
                  <span>پنل مدیریت</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-full transition-colors cursor-pointer focus:outline-none border border-transparent hover:border-rose-200 dark:hover:border-rose-900/40"
                  title="خروج از حساب مدیریت"
                  id="nav-logout-btn"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Responsive Menu Button */}
            {isInstalled && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer focus:outline-none"
                id="mobile-menu-toggle"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isInstalled && mobileOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 px-4 space-y-1 shadow-inner animate-fade-in" id="mobile-menu-container">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full text-right px-4 py-3 rounded-lg text-sm font-medium block transition-all cursor-pointer ${
                currentView === item.id
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              id={`mobile-nav-item-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1" id="mobile-menu-extra-section">
            {isAdminLoggedIn && (
              <button
                onClick={() => handleNav('admin-panel')}
                className={`w-full text-right px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-between text-emerald-600 dark:text-emerald-400 cursor-pointer ${
                  currentView === 'admin-panel' ? 'bg-emerald-50 dark:bg-emerald-950/20' : ''
                }`}
                id="mobile-nav-item-admin"
              >
                <span>پنل مدیریت ادمین</span>
                <User className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
