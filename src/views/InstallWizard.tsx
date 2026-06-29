import { useState, FormEvent } from 'react';
import { Database, Key, Server, User, Mail, Landmark, CheckCircle, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';

interface InstallWizardProps {
  onInstallComplete: (config: {
    host: string;
    dbName: string;
    dbUser: string;
    dbPass: string;
    adminUser: string;
    adminPass: string;
  }) => void;
}

export default function InstallWizard({ onInstallComplete }: InstallWizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form fields
  const [dbHost, setDbHost] = useState('localhost');
  const [dbName, setDbName] = useState('arvand_db');
  const [dbUser, setDbUser] = useState('root');
  const [dbPass, setDbPass] = useState('');
  
  const [adminUser, setAdminUser] = useState('admin');
  const [adminPass, setAdminPass] = useState('');
  const [adminName, setAdminName] = useState('مدیر سیستم');
  const [adminEmail, setAdminEmail] = useState('admin@arvand-fi.ir');

  const handleNextStep = () => {
    if (step === 1) {
      if (!dbName || !dbUser) {
        setError('لطفاً نام دیتابیس و نام کاربری دیتابیس را پر کنید.');
        return;
      }
      setError('');
      setStep(2);
    }
  };

  const handleInstallSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!adminUser || !adminPass || !adminName) {
      setError('لطفاً مشخصات مدیر ارشد را کامل وارد کنید.');
      return;
    }
    
    setError('');
    setLoading(true);

    // Simulate database tables creation and config file write (WordPress-like setup delay)
    setTimeout(() => {
      try {
        onInstallComplete({
          host: dbHost,
          dbName,
          dbUser,
          dbPass,
          adminUser,
          adminPass,
        });
      } catch (err: any) {
        setError(err.message || 'خطایی در راه‌اندازی پایگاه داده پیش آمد.');
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300" id="install-wizard-page" dir="rtl">
      {/* Brand Header */}
      <div className="text-center mb-8 flex flex-col items-center" id="install-wizard-logo-group">
        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20 mb-3" id="install-logo-box">
          <Landmark className="h-8 w-8" id="install-logo-icon" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white" id="install-title">سیستم راه‌اندازی خودکار آکادمی مالی اروند</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1" id="install-subtitle">سورس کد پیشرفته PHP MVC • دیتابیس خودکار MySQL</p>
      </div>

      {/* Steps Visualizer */}
      <div className="max-w-md w-full flex items-center justify-between mb-6 px-4" id="install-steps-tracker">
        <div className="flex items-center gap-2" id="step-indicator-1">
          <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600 dark:bg-slate-800'
          }`}>۱</span>
          <span className={`text-xs font-medium ${step >= 1 ? 'text-blue-600' : 'text-slate-500'}`}>تنظیمات دیتابیس</span>
        </div>
        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 mx-4" id="step-divider" />
        <div className="flex items-center gap-2" id="step-indicator-2">
          <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600 dark:bg-slate-800'
          }`}>۲</span>
          <span className={`text-xs font-medium ${step >= 2 ? 'text-blue-600' : 'text-slate-500'}`}>حساب کاربری ادمین</span>
        </div>
      </div>

      {/* Main Installer Card */}
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8" id="install-card">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 rounded-xl text-sm" id="install-error-box">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center" id="install-loading-state">
            <RefreshCw className="h-10 w-10 text-blue-600 animate-spin mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">در حال استقرار دیتابیس و ساخت جداول...</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              سیستم در حال ایجاد دیتابیس <code className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{dbName}</code>، تحریر جداول MySQL و ساختاردهی فایل <code className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">config/database.php</code> می‌باشد.
            </p>
          </div>
        ) : step === 1 ? (
          <div id="install-step-1-form">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">اتصال به پایگاه داده MySQL</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              سیستم MVC اروند برای شروع کار به دیتابیس MySQL نیاز دارد. لطفاً مشخصات اتصال دریافتی از هاست یا نرم‌افزارهای شبیه‌ساز (مانند XAMPP) را وارد کنید.
            </p>

            <div className="space-y-4" id="install-db-inputs">
              <div id="db-host-field">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">آدرس سرور پایگاه داده (Host)</label>
                <div className="relative">
                  <Server className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={dbHost}
                    onChange={(e) => setDbHost(e.target.value)}
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                    placeholder="localhost"
                    dir="ltr"
                    id="install-input-db-host"
                  />
                </div>
              </div>

              <div id="db-name-field">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">نام پایگاه داده (Database Name) *</label>
                <div className="relative">
                  <Database className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={dbName}
                    onChange={(e) => setDbName(e.target.value)}
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                    placeholder="arvand_db"
                    dir="ltr"
                    id="install-input-db-name"
                  />
                </div>
              </div>

              <div id="db-user-field">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">نام کاربری دیتابیس (User) *</label>
                <div className="relative">
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={dbUser}
                    onChange={(e) => setDbUser(e.target.value)}
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                    placeholder="root"
                    dir="ltr"
                    id="install-input-db-user"
                  />
                </div>
              </div>

              <div id="db-pass-field">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">رمز عبور دیتابیس (Password)</label>
                <div className="relative">
                  <Key className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="password"
                    value={dbPass}
                    onChange={(e) => setDbPass(e.target.value)}
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                    placeholder="••••••••"
                    dir="ltr"
                    id="install-input-db-pass"
                  />
                </div>
                <span className="block text-[10px] text-slate-400 mt-1">در صورت استفاده از XAMPP محلی معمولاً خالی رها می‌شود.</span>
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              id="install-next-step-btn"
            >
              <span>مرحله بعد: ایجاد مدیر ارشد</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleInstallSubmit} id="install-step-2-form">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">تنظیمات حساب کاربری مدیر ارشد</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              این اطلاعات برای ورود امن شما به پنل مدیریت وب‌سایت آکادمی استفاده خواهد شد. لطفا رمز عبور قوی انتخاب کنید.
            </p>

            <div className="space-y-4" id="install-admin-inputs">
              <div id="admin-name-field">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">نام و نام خانوادگی مدیر *</label>
                <div className="relative">
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                    placeholder="مثال: دانیال نصر"
                    id="install-input-admin-name"
                  />
                </div>
              </div>

              <div id="admin-user-field">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">نام کاربری ورود ادمین (Username) *</label>
                <div className="relative">
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                    placeholder="admin"
                    dir="ltr"
                    id="install-input-admin-user"
                  />
                </div>
              </div>

              <div id="admin-email-field">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">ایمیل مدیر *</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                    placeholder="admin@arvand-fi.ir"
                    dir="ltr"
                    id="install-input-admin-email"
                  />
                </div>
              </div>

              <div id="admin-pass-field">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">گذرواژه ورود پنل (Password) *</label>
                <div className="relative">
                  <Key className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                    placeholder="••••••••"
                    dir="ltr"
                    id="install-input-admin-pass"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6" id="install-step-2-buttons">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none"
                id="install-back-btn"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                <span>قبلی</span>
              </button>
              
              <button
                type="submit"
                className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                id="install-submit-btn"
              >
                <Sparkles className="h-4 w-4" />
                <span>راه‌اندازی سیستم</span>
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-6 text-xs text-slate-400 text-center max-w-sm" id="install-footer-note">
        نکته: با تکمیل این فرآیند، جداول دیتابیس در سورس کدهای PHP به صورت خودکار پیکربندی می‌شوند تا بتوانید در هاست واقعی آپلود کنید.
      </div>
    </div>
  );
}
