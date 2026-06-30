import { Mail, Phone, MapPin, Send, Instagram, Landmark, CheckCircle2 } from 'lucide-react';
import { ACADEMY_INFO } from '../data';

interface FooterProps {
  setCurrentView: (view: string) => void;
  isInstalled: boolean;
  academyInfo?: any;
}

export default function Footer({ setCurrentView, isInstalled, academyInfo }: FooterProps) {
  const info = academyInfo || ACADEMY_INFO;
  const partnersList = info.partners || ACADEMY_INFO.partners;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300" id="main-footer" dir="rtl">
      {/* Upper footer with info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16" id="footer-upper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10" id="footer-grid">
          {/* Col 1: About */}
          <div className="space-y-4" id="footer-col-about">
            <div className="flex items-center gap-2" id="footer-logo">
              <div className="p-2 bg-blue-600 rounded-lg text-white" id="footer-logo-icon">
                <Landmark className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-white">آکادمی مالی اروند</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed text-right">
              {info.subtitle}؛ مرجع قابل‌اعتماد آموزش و خدمات مالی در ایران. ما با تکیه بر تیمی خبره از مدیران مالی و حسابرسان ارشد، مسیر شفاف مالی را برای رشد هموار می‌کنیم.
            </p>
          </div>

          {/* Col 2: Shortcuts */}
          {isInstalled && (
            <div className="space-y-4" id="footer-col-shortcuts">
              <h3 className="text-white font-semibold text-base border-r-4 border-blue-500 pr-2.5">
                {info.quickAccessTitle || 'دسترسی سریع'}
              </h3>
              <ul className="space-y-2 text-sm text-slate-400" id="footer-shortcuts-list">
                {(info.quickAccessLinks || [
                  { id: 'home', label: 'صفحه اصلی' },
                  { id: 'about', label: 'درباره ما' },
                  { id: 'services', label: 'خدمات حسابداری و مالیاتی' },
                  { id: 'contact', label: 'دریافت خدمات' },
                  { id: 'blog', label: 'مقالات آموزشی' },
                  { id: 'news', label: 'اخبار' },
                ]).map((item: any) => (
                  <li key={item.id}>
                    <button onClick={() => {
                      if (item.id.startsWith('http://') || item.id.startsWith('https://')) {
                        window.open(item.id, '_blank');
                      } else {
                        setCurrentView(item.id);
                      }
                    }} className="hover:text-blue-400 transition-colors focus:outline-none cursor-pointer">
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2 border-t border-slate-800/60 mt-2">
                  <button onClick={() => setCurrentView('login')} className="text-slate-500 hover:text-emerald-400 font-bold transition-colors focus:outline-none cursor-pointer flex items-center gap-1">
                    <span>ورود به پنل مدیریت</span>
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Col 3: Contact */}
          <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-2" id="footer-col-contact">
            <h3 className="text-white font-semibold text-base border-r-4 border-blue-500 pr-2.5">ارتباط با آکادمی</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-400" id="footer-contact-details">
              <div className="flex items-start gap-3" id="footer-contact-phone">
                <Phone className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500">تلفن پشتیبانی</span>
                  <span className="font-mono text-slate-300" dir="ltr">{info.phone || '۰۲۱-۸۸۹۹۲۲۰'}</span>
                </div>
              </div>
              <div className="flex items-start gap-3" id="footer-contact-email">
                <Mail className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500">ایمیل آکادمی</span>
                  <span className="font-mono text-slate-300">{info.email || 'info@arvand-fi.ir'}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2" id="footer-contact-address">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500">دفتر مرکزی</span>
                  <span className="text-slate-300">{info.address || 'تهران، میدان آرژانتین، خیابان بخارست، ساختمان اروند'}</span>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2" id="footer-socials">
              <span className="text-xs text-slate-500">شبکه‌های اجتماعی:</span>
              <a href={info.telegramUrl || '#'} className="p-1.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded transition-all text-slate-400" title="تلگرام"><Send className="h-4 w-4" /></a>
              <a href={info.instagramUrl || '#'} className="p-1.5 bg-slate-800 hover:bg-pink-600 hover:text-white rounded transition-all text-slate-400" title="اینستاگرام"><Instagram className="h-4 w-4" /></a>
              <a href={`mailto:${info.email || 'info@arvand-fi.ir'}`} className="p-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white rounded transition-all text-slate-400" title="ایمیل مستقیم"><Mail className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Partners banner */}
      <div className="bg-slate-950 py-6 border-t border-slate-800/60" id="footer-partners">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4" id="footer-partners-content">
            <span className="text-xs text-slate-500">همسو با استانداردهای مراجع مالی ایران و بین‌الملل:</span>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center" id="footer-partners-logos">
              {partnersList.map((p: string) => (
                <span key={p} className="text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded" id={`partner-logo-${p.replace(/\s+/g, '-')}`}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-slate-950 py-4 border-t border-slate-900 text-center text-xs text-slate-500" id="footer-copyright">
        تمامی حقوق مادی و معنوی متعلق به آکادمی مالی اروند می‌باشد. © ۱۴۰۵
      </div>
    </footer>
  );
}
