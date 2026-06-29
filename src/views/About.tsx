import { Landmark, Compass, Eye, ShieldCheck, CheckCircle2, Heart, Award, Sparkles } from 'lucide-react';
import { ACADEMY_INFO } from '../data';

interface AboutProps {
  academyInfo?: typeof ACADEMY_INFO;
}

export default function About({ academyInfo = ACADEMY_INFO }: AboutProps) {
  return (
    <div className="space-y-16 pb-16 animate-fade-in" id="about-view" dir="rtl">
      {/* Header */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300" id="about-header">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">آکادمی مالی اروند را بیشتر بشناسید</h1>
          <p className="text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base">{academyInfo.subtitle}</p>
        </div>
      </section>

      {/* Intro details */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6" id="about-intro">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative" id="about-intro-card">
          <div className="absolute top-6 right-6 text-blue-500/10 dark:text-blue-500/5" id="about-bg-decoration">
            <Landmark className="h-24 w-24" />
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-justify whitespace-pre-line relative z-10 font-medium">
            {academyInfo.aboutLong}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto px-4" id="about-mission-vision">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="about-mv-grid">
          {/* Vision */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-md space-y-4 text-right" id="about-vision-card">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl w-fit text-blue-600 dark:text-blue-400" id="vision-icon-box">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">چشم‌انداز ما</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {academyInfo.vision}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-md space-y-4 text-right" id="about-mission-card">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl w-fit text-indigo-600 dark:text-indigo-400" id="mission-icon-box">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">ماموریت ما</h3>
            <div className="space-y-3" id="mission-items">
              {academyInfo.mission.map((item, i) => (
                <div key={i} className="text-right" id={`mission-item-${i}`}>
                  <span className="block font-bold text-slate-800 dark:text-slate-200 text-sm">{item.title}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="max-w-5xl mx-auto px-4" id="about-audiences">
        <div className="text-center mb-10 space-y-2" id="about-audiences-header">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">مخاطبین خدمات و آموزش‌های ما</h2>
          <p className="text-xs sm:text-sm text-slate-500">طیف گسترده‌ای از جامعه هدف که دلسوزانه پاسخگوی نیاز آن‌ها هستیم</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="about-audiences-grid">
          {academyInfo.audiences.map((aud, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 p-5 rounded-xl space-y-2 text-right hover:bg-white dark:hover:bg-slate-900 hover:shadow-md transition-all" id={`audience-card-${i}`}>
              <div className="h-2 w-10 bg-blue-500 rounded" />
              <h4 className="font-bold text-slate-900 dark:text-white text-sm pt-2">{aud.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{aud.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 border border-slate-200 dark:border-slate-800/80 py-16 text-white transition-all rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 shadow-2xl" id="about-values">
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-12" id="about-values-header">
          <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold tracking-widest uppercase">Our Values</span>
          <h2 className="text-3xl font-extrabold tracking-tight">ارزش‌های بنیادین آکادمی اروند</h2>
          <p className="text-sm text-blue-100/90 max-w-xl mx-auto leading-relaxed">تعهد همیشگی ما به رعایت اصول اخلاق حرفه‌ای، رازداری کامل و استخراج محاسبات دقیق</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="about-values-grid">
          {academyInfo.values.map((v, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3 hover:bg-white/10 transition-all text-right" id={`value-card-${i}`}>
              <div className="p-2.5 bg-white/10 rounded-2xl w-fit text-white" id={`value-icon-box-${i}`}>
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-white text-base">{v.title}</h4>
              <p className="text-xs text-blue-100/80 leading-relaxed text-justify">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
