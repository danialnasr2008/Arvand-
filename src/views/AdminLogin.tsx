import { useState, FormEvent } from 'react';
import { Key, User, Landmark, HelpCircle, AlertTriangle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSubmit: (username: string, pass: string) => boolean;
  onGoBack: () => void;
  installedAdminUsername: string;
}

export default function AdminLogin({ onLoginSubmit, onGoBack, installedAdminUsername }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('نام کاربری و رمز ورود الزامی هستند.');
      return;
    }

    const success = onLoginSubmit(username, password);
    if (!success) {
      setError('نام کاربری یا رمز عبور اشتباه است.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors duration-300" id="admin-login-page" dir="rtl">
      
      {/* Brand */}
      <div className="text-center mb-6 flex flex-col items-center" id="admin-login-brand">
        <button onClick={onGoBack} className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20 mb-3 focus:outline-none cursor-pointer">
          <Landmark className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">ورود به پنل مدیریت آکادمی اروند</h1>
        <p className="text-xs text-slate-400 mt-1">کنترل دسترسی امن به دیتابیس و مدیریت سیستم</p>
      </div>

      {/* Main card */}
      <div className="max-w-sm w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8" id="admin-login-card">
        {error && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 rounded-xl text-xs" id="login-error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" id="admin-login-form">
          <div id="login-username-field">
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">نام کاربری ادمین (Username)</label>
            <div className="relative">
              <User className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-3 pr-10 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                dir="ltr"
                id="login-input-username"
              />
            </div>
          </div>

          <div id="login-pass-field">
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">گذرواژه پنل (Password)</label>
            <div className="relative">
              <Key className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-3 pr-10 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                dir="ltr"
                id="login-input-password"
              />
            </div>
          </div>

          <div className="pt-2" id="login-submit-wrapper">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none text-sm"
              id="login-submit-btn"
            >
              <span>ورود امن به پنل</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center" id="login-demo-helper">
          <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <AlertTriangle className="h-3 w-3 text-amber-500" />
            <span>اطلاعات ادمین ثبت‌شده در نصب اول:</span>
            <code className="font-mono bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-1 rounded">{installedAdminUsername}</code>
          </span>
        </div>
      </div>

      <button
        onClick={onGoBack}
        className="mt-4 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:underline focus:outline-none"
        id="login-go-back-btn"
      >
        انصراف و بازگشت به آکادمی
      </button>
    </div>
  );
}
