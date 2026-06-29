import { useState } from 'react';
import { SERVICES_LIST } from '../data';
import { ChevronDown, ChevronUp, Calculator, Percent, Scale, FileSpreadsheet, ShieldAlert, Coins, TrendingUp, Briefcase } from 'lucide-react';

interface ServicesProps {
  servicesList?: typeof SERVICES_LIST;
}

export default function Services({ servicesList = SERVICES_LIST }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<string>(servicesList[0]?.id || 'accounting');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="h-5 w-5" />;
      case 'Percent': return <Percent className="h-5 w-5" />;
      case 'Scale': return <Scale className="h-5 w-5" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="h-5 w-5" />;
      case 'ShieldAlert': return <ShieldAlert className="h-5 w-5" />;
      case 'Coins': return <Coins className="h-5 w-5" />;
      case 'TrendingUp': return <TrendingUp className="h-5 w-5" />;
      case 'Briefcase': return <Briefcase className="h-5 w-5" />;
      default: return <Calculator className="h-5 w-5" />;
    }
  };

  const activeService = servicesList.find((s) => s.id === activeTab) || servicesList[0] || SERVICES_LIST[0];

  return (
    <div className="space-y-12 pb-16 animate-fade-in" id="services-view" dir="rtl">
      {/* Header */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300" id="services-header">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">خدمات جامع و تخصصی آکادمی مالی اروند</h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            از ثبت دفاتر مالی تا دادرسی‌های فوق‌تخصصی مالیاتی؛ ما بازوی مطمئن، امین و متخصص شرکت شما هستیم.
          </p>
        </div>
      </section>

      {/* Main Services Navigation tabs + content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="services-main">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="services-grid-layout">
          {/* Vertical Menu Tabs */}
          <div className="lg:col-span-1 space-y-1" id="services-tabs-menu">
            <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 mb-3 uppercase pr-2">سرفصل خدمات مالی</span>
            {servicesList.map((srv) => {
              const isActive = activeTab === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(srv.id)}
                  className={`w-full text-right px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer focus:outline-none ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  id={`service-tab-btn-${srv.id}`}
                >
                  <span className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-white/10 text-white' : 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'}`} id={`service-tab-icon-${srv.id}`}>
                    {getIcon(srv.icon)}
                  </span>
                  <span className="truncate flex-1">{srv.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Panel */}
          <div className="lg:col-span-3" id="services-tab-content-panel">
            {activeService && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6" id={`service-content-box-${activeService.id}`}>
                {/* Header */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-5 space-y-3" id={`service-content-header-${activeService.id}`}>
                  <div className="flex items-center gap-3" id={`service-content-title-wrapper-${activeService.id}`}>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-600 dark:text-blue-400" id={`service-content-icon-box-${activeService.id}`}>
                      {getIcon(activeService.icon)}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{activeService.title}</h2>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{activeService.description}</p>
                </div>

                {/* Checklists */}
                <div className="space-y-4" id={`service-content-bullets-${activeService.id}`}>
                  <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">عناوین و شرح جزئیات خدمت:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id={`service-bullets-grid-${activeService.id}`}>
                    {activeService.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-slate-50 dark:bg-slate-950/30 rounded-xl border border-slate-100 dark:border-slate-800/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5 hover:bg-white dark:hover:bg-slate-900 hover:border-blue-500/20 transition-all"
                        id={`service-bullet-box-${activeService.id}-${idx}`}
                      >
                        <span className="h-5 w-5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold" id={`bullet-check-icon-${activeService.id}-${idx}`}>✓</span>
                        <span className="leading-relaxed text-right w-full">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
