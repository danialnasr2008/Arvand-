import { useState, FormEvent } from 'react';
import { FileText, Send, Phone, User, Landmark, HelpCircle, MapPin, Check, Briefcase, Sparkles, ShieldCheck } from 'lucide-react';
import { ServiceRequest } from '../types';

interface RequestServiceProps {
  onRequestSubmit: (req: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>) => void;
  successMessage?: string;
  errorMessage?: string;
}

export default function RequestService({ onRequestSubmit, successMessage, errorMessage }: RequestServiceProps) {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  
  const [businessType, setBusinessType] = useState('');
  const [businessStatus, setBusinessStatus] = useState('');
  const [requestSubject, setRequestSubject] = useState('');
  const [priority, setPriority] = useState<'immediate' | 'week' | 'month' | 'evaluating'>('immediate');
  const [annualTurnover, setAnnualTurnover] = useState('');
  const [complexity, setComplexity] = useState<'simple' | 'medium' | 'complex' | 'unknown'>('simple');
  const [description, setDescription] = useState('');
  const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'bale'>('phone');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !description) {
      alert('لطفاً فیلدهای الزامی (نام، شماره همراه و شرح درخواست) را پر کنید.');
      return;
    }

    onRequestSubmit({
      fullName,
      companyName,
      position,
      phone,
      email,
      city,
      businessType,
      businessStatus,
      requestSubject,
      priority,
      annualTurnover,
      complexity,
      description,
      contactMethod,
    });

    // Clear form on success
    setFullName('');
    setCompanyName('');
    setPosition('');
    setPhone('');
    setEmail('');
    setCity('');
    setBusinessType('');
    setBusinessStatus('');
    setRequestSubject('');
    setPriority('immediate');
    setAnnualTurnover('');
    setComplexity('simple');
    setDescription('');
    setContactMethod('phone');
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in" id="request-service-view" dir="rtl">
      {/* Header */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300" id="request-service-header">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">درخواست دریافت خدمات و مشاوره مالی</h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            با پر کردن فرم زیر، پرونده مالی شما به جریان افتاده و کارشناسان آکادمی اروند در اولین فرصت جهت ارائه راهکار با شما تماس خواهند گرفت.
          </p>
        </div>
      </section>

      {/* Main Form container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6" id="request-service-main">
        {successMessage && (
          <div className="mb-8 p-5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl flex items-center gap-3 shadow-sm animate-fade-in" id="request-success-banner">
            <ShieldCheck className="h-6 w-6 shrink-0" />
            <span className="font-semibold text-sm leading-relaxed">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-8 p-5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 rounded-2xl flex items-center gap-3 shadow-sm" id="request-error-banner">
            <span className="font-semibold text-sm leading-relaxed">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/5 space-y-8" id="request-service-form">
          
          {/* Section 1: Contact Details */}
          <div className="space-y-5" id="request-form-section-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-2.5">۱. اطلاعات متقاضی و تماس</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="section-1-grid">
              <div id="field-fullname">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">نام و نام خانوادگی *</label>
                <div className="relative">
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: دانیال نصر"
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                    id="input-req-fullname"
                  />
                </div>
              </div>

              <div id="field-phone">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">شماره موبایل *</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: 09123456789"
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                    dir="ltr"
                    id="input-req-phone"
                  />
                </div>
              </div>

              <div id="field-company">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">نام شرکت / مجموعه (اختیاری)</label>
                <div className="relative">
                  <Landmark className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="مثال: شرکت اروند الکترونیک"
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                    id="input-req-company"
                  />
                </div>
              </div>

              <div id="field-position">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">سمت شما در مجموعه</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                  id="input-req-position"
                >
                  <option value="">-- لطفاً یک گزینه را انتخاب کنید --</option>
                  <option value="مدیر عامل">مدیر عامل</option>
                  <option value="مدیر مالی">مدیر مالی</option>
                  <option value="حسابدار">حسابدار</option>
                  <option value="مالک کسب‌وکار">مالک کسب‌وکار</option>
                  <option value="سایر">سایر موارد</option>
                </select>
              </div>

              <div id="field-email">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">آدرس ایمیل</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-left font-mono"
                  dir="ltr"
                  id="input-req-email"
                />
              </div>

              <div id="field-city">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">شهر / استان محل فعالیت</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="مثال: تهران"
                    className="w-full pl-3 pr-11 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                    id="input-req-city"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Business Profile */}
          <div className="space-y-5" id="request-form-section-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-2.5">۲. مشخصات و نیازهای کسب‌وکار</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="section-2-grid">
              <div id="field-business-type">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">نوع فعالیت کسب‌وکار</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                  id="input-req-business-type"
                >
                  <option value="">-- لطفاً یک گزینه را انتخاب کنید --</option>
                  <option value="تولیدی و صنعتی">تولیدی و صنعتی</option>
                  <option value="خدماتی">خدماتی</option>
                  <option value="بازرگانی و صادرات/واردات">بازرگانی و صادرات/واردات</option>
                  <option value="پیمانکاری">پیمانکاری</option>
                  <option value="استارتاپ / نوپا">استارتاپ / نوپا</option>
                </select>
              </div>

              <div id="field-business-status">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">وضعیت فعلی کسب‌وکار</label>
                <select
                  value={businessStatus}
                  onChange={(e) => setBusinessStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                  id="input-req-business-status"
                >
                  <option value="">-- لطفاً یک گزینه را انتخاب کنید --</option>
                  <option value="نوپا و در حال راه‌اندازی">نوپا و در حال راه‌اندازی</option>
                  <option value="فعال و در حال رشد">فعال و در حال رشد</option>
                  <option value="نیاز به اصلاحات ساختاری مالی">نیاز به اصلاحات ساختاری مالی</option>
                  <option value="درگیر پرونده دادرسی و جریمه">درگیر پرونده دادرسی و جریمه</option>
                </select>
              </div>

              <div id="field-subject">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">موضوع اصلی درخواست خدمت</label>
                <select
                  value={requestSubject}
                  onChange={(e) => setRequestSubject(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                  id="input-req-subject"
                >
                  <option value="">-- لطفاً یک گزینه را انتخاب کنید --</option>
                  <option value="حسابداری و تراز مالی">حسابداری و تراز مالی</option>
                  <option value="مشاوره مالیاتی و سامانه مودیان">مشاوره مالیاتی و سامانه مودیان</option>
                  <option value="دفاعیه و لوایح دادرسی مالیاتی">دفاعیه و لوایح دادرسی مالیاتی</option>
                  <option value="حسابرسی تامین اجتماعی و کارفرما">حسابرسی تامین اجتماعی و کارفرما</option>
                  <option value="محاسبه بهای تمام‌شده صنعتی">محاسبه بهای تمام‌شده صنعتی</option>
                  <option value="تأمین مالی و بیزینس پلن">تأمین مالی و بیزینس پلن</option>
                </select>
              </div>

              <div id="field-turnover">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">گردش مالی تقریبی سالانه</label>
                <select
                  value={annualTurnover}
                  onChange={(e) => setAnnualTurnover(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                  id="input-req-turnover"
                >
                  <option value="">-- لطفاً یک گزینه را انتخاب کنید --</option>
                  <option value="زیر ۵ میلیارد تومان">زیر ۵ میلیارد تومان</option>
                  <option value="بین ۵ تا ۲۰ میلیارد تومان">بین ۵ تا ۲۰ میلیارد تومان</option>
                  <option value="بین ۲۰ تا ۱۰۰ میلیارد تومان">بین ۲۰ تا ۱۰۰ میلیارد تومان</option>
                  <option value="بالای ۱۰۰ میلیارد تومان">بالای ۱۰۰ میلیارد تومان</option>
                </select>
              </div>

              <div id="field-priority">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">اولویت درخواست شما</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium" id="req-priority-radios">
                  {(['immediate', 'week', 'month', 'evaluating'] as const).map((pr) => {
                    const label = pr === 'immediate' ? 'فوری' : pr === 'week' ? 'این هفته' : pr === 'month' ? 'این ماه' : 'در حال بررسی';
                    return (
                      <button
                        key={pr}
                        type="button"
                        onClick={() => setPriority(pr)}
                        className={`py-2 px-3 border rounded-xl text-center cursor-pointer transition-all focus:outline-none ${
                          priority === pr
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                        }`}
                        id={`priority-radio-${pr}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div id="field-complexity">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">میزان پیچیدگی پرونده</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium" id="req-complexity-radios">
                  {(['simple', 'medium', 'complex', 'unknown'] as const).map((cx) => {
                    const label = cx === 'simple' ? 'ساده' : cx === 'medium' ? 'متوسط' : cx === 'complex' ? 'پیچیده' : 'اطلاع ندارم';
                    return (
                      <button
                        key={cx}
                        type="button"
                        onClick={() => setComplexity(cx)}
                        className={`py-2 px-3 border rounded-xl text-center cursor-pointer transition-all focus:outline-none ${
                          complexity === cx
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                        }`}
                        id={`complexity-radio-${cx}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Detailed Description */}
          <div className="space-y-4" id="request-form-section-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-2.5">۳. توضیحات درخواست و ترجیحات تماس</h3>
            
            <div id="field-description">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">لطفاً مشکل یا نیاز خود را توضیح دهید *</label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="مثال: دریافت برگ تشخیص مالیاتی عملکرد سال ۱۴۰۴ با جریمه سنگین، نیاز به بررسی اسناد، تنظیم لوایح دفاعیه برای هیئت‌های حل اختلاف بدوی..."
                className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                id="input-req-description"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pt-4" id="contact-method-section">
              <div id="contact-method-radios-wrapper">
                <span className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">ترجیح می‌دهید از چه طریقی با شما تماس بگیریم؟</span>
                <div className="flex gap-4" id="contact-method-btns">
                  <button
                    type="button"
                    onClick={() => setContactMethod('phone')}
                    className={`px-4 py-2 border rounded-xl text-xs font-semibold cursor-pointer focus:outline-none transition-all ${
                      contactMethod === 'phone'
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                    id="contact-method-phone"
                  >
                    تماس تلفنی مستقیم
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod('bale')}
                    className={`px-4 py-2 border rounded-xl text-xs font-semibold cursor-pointer focus:outline-none transition-all ${
                      contactMethod === 'bale'
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                    id="contact-method-bale"
                  >
                    پیام‌رسان بله
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod('email')}
                    className={`px-4 py-2 border rounded-xl text-xs font-semibold cursor-pointer focus:outline-none transition-all ${
                      contactMethod === 'email'
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                    id="contact-method-email"
                  >
                    ارسال ایمیل جزئیات
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none mt-4 sm:mt-0"
                id="request-submit-btn"
              >
                <Send className="h-4 w-4 shrink-0" />
                <span>ثبت درخواست نهایی</span>
              </button>
            </div>
          </div>

        </form>
      </section>
    </div>
  );
}
