
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowRight, Shield, Wallet, Clock, Trophy, 
  AlertCircle, Eye, EyeOff, CheckCircle2, 
  Plus, Trash2, ArrowLeft, MoreHorizontal, Settings as SettingsIcon,
  BarChart3, Calendar as CalendarIcon, ChevronLeft, ChevronRight,
  Home, User, Bell, Search, Camera, X,
  ArrowUpRight, ArrowDownLeft, BadgeMinus, BadgePlus,
  RefreshCcw, AlertTriangle, Filter, Check, CheckSquare, Scan, FileBarChart, MoreVertical,
  PieChart, BookOpen, Banknote, Flag, Download
} from 'lucide-react';
import { AppData, ViewState, Language, TrashItem, Notification as AppNotification, Priority } from './types';
import { TEXT, INITIAL_DATA, CURRENCIES } from './constants';

// --- Utility Functions ---

const getISODate = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isSameDay = (isoDate: string, localDateStr: string) => {
  if (!isoDate) return false;
  const d = new Date(isoDate);
  const local = getISODate(d);
  return local === localDateStr;
};

// Generate an array of dates around a center date
const getDaysAround = (centerDateStr: string, daysBefore = 3, daysAfter = 14) => {
    const dates = [];
    const center = new Date(centerDateStr);
    for (let i = -daysBefore; i <= daysAfter; i++) {
        const d = new Date(center);
        d.setDate(center.getDate() + i);
        dates.push(d);
    }
    return dates;
};

// --- UI Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick} 
    className={`bg-[#1A1A1A] rounded-[24px] p-5 border border-white/5 ${className} ${onClick ? 'cursor-pointer active:scale-[0.98] transition-all duration-200 hover:border-white/10' : ''}`}
  >
    {children}
  </div>
);

const Button: React.FC<{ onClick?: () => void; variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; children: React.ReactNode; className?: string; fullWidth?: boolean; disabled?: boolean }> = ({ 
  onClick, variant = 'primary', children, className = "", fullWidth = false, disabled = false 
}) => {
  const baseStyle = "py-4 px-6 rounded-[18px] font-display font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-primary text-white hover:bg-primaryDark shadow-glow",
    secondary: "bg-[#2A2A2A] text-white hover:bg-[#333333] border border-white/5",
    danger: "bg-mistake/10 text-mistake border border-mistake/20",
    ghost: "bg-transparent text-text-muted hover:text-white"
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, ...props }) => (
  <div className="w-full mb-4">
    {label && <label className="block text-text-muted text-xs font-medium mb-2 ml-1">{label}</label>}
    <input 
      {...props}
      className={`w-full bg-[#1A1A1A] border border-white/10 rounded-[20px] p-4 text-white placeholder-text-dark focus:outline-none focus:border-primary/50 transition-colors text-sm ${props.className}`}
    />
  </div>
);

const IconButton: React.FC<{ icon: React.ReactNode; onClick?: () => void; className?: string }> = ({ icon, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-[#252525] transition-colors active:scale-90 border border-white/5 ${className}`}
  >
    {icon}
  </button>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string; onBack?: () => void; rightElement?: React.ReactNode }> = ({ title, subtitle, onBack, rightElement }) => (
  <div className="flex items-center justify-between mb-6 pt-2">
    <div className="flex items-center gap-4">
      {onBack && (
        <IconButton icon={<ArrowLeft size={20} />} onClick={onBack} />
      )}
      <div>
        <h2 className="text-xl font-display font-bold text-white">{title}</h2>
        {subtitle && <p className="text-text-muted text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {rightElement}
  </div>
);

const GenericListView = ({ title, onAdd, items, renderItem, placeholder }: any) => {
    const [newItem, setNewItem] = useState("");
    return (
        <div className="flex flex-col pt-4 pb-40">
            <SectionHeader title={title} />
            
            <div className="mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="flex-1 relative group">
                        <input 
                            value={newItem} 
                            onChange={(e) => setNewItem(e.target.value)} 
                            placeholder={placeholder} 
                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-[28px] py-5 pl-6 pr-6 text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary/50 focus:bg-[#202020] transition-all shadow-sm text-[15px]"
                            onKeyDown={(e) => e.key === 'Enter' && onAdd(newItem, setNewItem)}
                        />
                    </div>
                    <button 
                        onClick={() => onAdd(newItem, setNewItem)} 
                        className={`w-[60px] h-[60px] rounded-[24px] flex items-center justify-center text-white transition-all duration-300 shadow-glow
                            ${newItem.trim() ? 'bg-primary scale-100' : 'bg-[#2A2A2A] text-neutral-600 scale-95'}
                        `}
                    >
                        <Plus size={28} strokeWidth={3} />
                    </button>
                </div>
            </div>
            
            <div className="space-y-3">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-12 opacity-30 relative">
                        <p className="text-base font-medium text-neutral-400">{placeholder}</p>
                    </div>
                ) : (
                    items.map(renderItem)
                )}
            </div>
        </div>
    )
}

// --- App Component ---

const App: React.FC = () => {
  // State
  const [data, setData] = useState<AppData>(() => {
    try {
        const saved = localStorage.getItem('lifebooster_data');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (!parsed.currency) parsed.currency = 'AED'; 
            if (!parsed.incomes) parsed.incomes = [];
            if (!parsed.gender) parsed.gender = 'male';
            if (!parsed.joinDate) parsed.joinDate = new Date().toISOString(); 
            if (!parsed.trash) parsed.trash = []; 
            if (!parsed.notifications) parsed.notifications = [];
            if (!parsed.userId) parsed.userId = "TNAV" + Math.floor(Math.random() * 9000 + 1000);
            return parsed;
        }
    } catch (e) {
        console.error("Failed to load data", e);
    }
    return INITIAL_DATA;
  });
  
  const [view, setView] = useState<ViewState>('onboarding');
  const [lang, setLang] = useState<Language>('en');
  const [privateMode, setPrivateMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(getISODate(new Date()));
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'calendar' | 'wallet' | 'profile'>('home');

  useEffect(() => {
    localStorage.setItem('lifebooster_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (data.hasOnboarded) {
      setView('dashboard');
    } else {
      setView('onboarding');
    }
  }, []); 

  const t = (key: string) => TEXT[key]?.[lang] || key;

  const formatCurrency = (amount: number) => {
    if (privateMode) return "***";
    const currency = data.currency || 'AED';
    try {
        let locale = 'en-US';
        if (lang === 'fr' || lang === 'dr') locale = 'fr-FR';
        
        return new Intl.NumberFormat(locale, { 
            style: 'currency', 
            currency: currency,
            maximumFractionDigits: 0
        }).format(amount);
    } catch (e) {
        return `${amount} ${currency}`;
    }
  };

  const updateData = (updates: Partial<AppData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const addInAppNotification = (title: string, message: string, type: AppNotification['type'] = 'info') => {
      const newNotif: AppNotification = {
          id: Date.now().toString() + Math.random(),
          title,
          message,
          date: new Date().toISOString(),
          read: false,
          type
      };
      updateData({ notifications: [newNotif, ...data.notifications] });
  };

  const scheduleNotification = (text: string, time: string) => {
      if (Notification.permission === 'granted') {
          const [hours, mins] = time.split(':').map(Number);
          const now = new Date();
          const target = new Date();
          target.setHours(hours, mins, 0, 0);
          
          if (target > now) {
              const diff = target.getTime() - now.getTime();
              
              if (diff < 21600000) { 
                  setTimeout(() => {
                      new Notification("Life Booster", { body: `It's time for: ${text}` });
                  }, diff);
              }
          }
      }
  };

  // Trash Logic
  const moveToTrash = (item: any, type: TrashItem['type']) => {
    const trashItem: TrashItem = { type, data: item, deletedAt: new Date().toISOString() };
    const updates: Partial<AppData> = { trash: [trashItem, ...data.trash] };
    
    if (type === 'task') updates.tasks = data.tasks.filter(t => t.id !== item.id);
    else if (type === 'expense') updates.expenses = data.expenses.filter(e => e.id !== item.id);
    else if (type === 'income') updates.incomes = data.incomes.filter(i => i.id !== item.id);
    else if (type === 'loan') updates.loans = data.loans.filter(l => l.id !== item.id);
    else if (type === 'challenge') updates.challenges = data.challenges.filter(c => c.id !== item.id);
    else if (type === 'mistake') updates.mistakes = data.mistakes.filter(m => m.id !== item.id);

    updateData(updates);
  };

  const restoreFromTrash = (item: TrashItem) => {
      const updates: Partial<AppData> = { trash: data.trash.filter(t => t.data.id !== item.data.id) };
      
      if (item.type === 'task') updates.tasks = [...data.tasks, item.data as any];
      else if (item.type === 'expense') updates.expenses = [...data.expenses, item.data as any];
      else if (item.type === 'income') updates.incomes = [...data.incomes, item.data as any];
      else if (item.type === 'loan') updates.loans = [...data.loans, item.data as any];
      else if (item.type === 'challenge') updates.challenges = [...data.challenges, item.data as any];
      else if (item.type === 'mistake') updates.mistakes = [...data.mistakes, item.data as any];

      updateData(updates);
  };

  const deletePermanently = (id: string) => {
      updateData({ trash: data.trash.filter(t => t.data.id !== id) });
  };

  const toggleLoanStatus = (id: string) => {
      updateData({
          loans: data.loans.map(l => l.id === id ? { ...l, isPaid: !l.isPaid } : l)
      });
  };

  const markAllNotificationsRead = () => {
      updateData({
          notifications: data.notifications.map(n => ({ ...n, read: true }))
      });
  };

  // --- Views ---

  const OnboardingView = () => {
    const [step, setStep] = useState(0);

    const steps = [
      { title: t('onboarding_1_title'), desc: t('onboarding_1_desc'), icon: Shield },
      { title: t('onboarding_2_title'), desc: t('onboarding_2_desc'), icon: BookOpen },
      { title: t('onboarding_3_title'), desc: t('onboarding_3_desc'), icon: Wallet },
    ];

    const handleNext = () => {
      if (step < steps.length - 1) setStep(step + 1);
      else {
        finishOnboarding();
      }
    };

    const finishOnboarding = () => {
        const newData = { 
            ...data,
            hasOnboarded: true,
            joinDate: new Date().toISOString()
        };
        setData(newData);
        setView('dashboard');
    }

    return (
      <div className="h-screen flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto animate-in fade-in duration-700 bg-bg relative">
        <button onClick={finishOnboarding} className="absolute top-6 right-6 text-text-muted hover:text-white text-sm font-semibold">{t('btn_skip')}</button>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-10 border border-white/5 relative">
             <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            {React.createElement(steps[step].icon, { size: 40, className: "text-primary relative z-10" })}
          </div>
          <h1 className="text-3xl font-display font-bold mb-4">{steps[step].title}</h1>
          <p className="text-text-muted leading-relaxed text-sm max-w-[280px] mx-auto">{steps[step].desc}</p>
        </div>
        <div className="w-full pb-10">
          <Button fullWidth onClick={handleNext}>
            {step === steps.length - 1 ? t('btn_get_started') : t('btn_continue')}
          </Button>
        </div>
      </div>
    );
  };

  const DashboardView = () => {
    const scrollableDates = useMemo(() => getDaysAround(selectedDate, 3, 7), [selectedDate]);
    const currentTasks = data.tasks.filter(t => t.date === selectedDate);
    const tasksDone = currentTasks.filter(t => t.completed).length;
    const tasksTotal = currentTasks.length;
    const tasksProgress = tasksTotal > 0 ? (tasksDone / tasksTotal) * 100 : 0;
    const totalBalance = data.incomes.reduce((a,c) => a+c.amount,0) - data.expenses.reduce((a,c) => a+c.amount,0);

    return (
      <div className="pb-40 animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-6 pt-4">
          <div className="flex items-center gap-3">
             <div onClick={() => setView('settings')} className="w-10 h-10 rounded-full bg-[#2A2A2A] border border-white/10 flex items-center justify-center overflow-hidden cursor-pointer active:scale-95 transition-transform">
                {data.profileImage ? (
                    <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                    <span className="font-display font-bold text-sm text-primary">
                        {data.name.charAt(0).toUpperCase()}
                    </span>
                )}
             </div>
             <div>
                <h1 className="text-xl font-display font-bold flex items-center gap-2">{t('hi')}, {data.name} 👋</h1>
                <p className="text-text-muted text-xs">{t('dashboard_subtitle')}</p>
             </div>
          </div>
          <div className="flex gap-3">
             <div className="relative">
                <IconButton icon={<Bell size={20} />} onClick={() => setView('notifications')} />
                {data.notifications.some(n => !n.read) && <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1A1A1A]"></div>}
             </div>
             <IconButton icon={privateMode ? <EyeOff size={20} /> : <Eye size={20} />} onClick={() => setPrivateMode(!privateMode)} />
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-[32px] p-6 mb-6 border border-white/5 relative overflow-hidden">
             <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-glow">
                    <Trophy size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-lg text-white">{t('daily_goal')}</h3>
                    <p className="text-text-muted text-xs">{new Date(selectedDate).toLocaleDateString((lang === 'fr' || lang === 'dr') ? 'fr-FR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long'})}</p>
                 </div>
             </div>

             <div className="mb-2 flex justify-between items-end">
                <span className="text-sm font-medium text-gray-200">{t('your_progress')}</span>
                <span className="text-xs text-text-muted">#{tasksDone} / {tasksTotal}</span>
             </div>
             <div className="w-full h-2 bg-[#2A2A2A] rounded-full overflow-hidden mb-6">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${tasksProgress}%` }}></div>
             </div>

             <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-text-muted">{t('money_balance')}:</span>
                    <span className="font-bold text-white">{formatCurrency(totalBalance)}</span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => setView('time_manager')}>{t('btn_start_day')}</Button>
                <Button variant="secondary" onClick={() => setView('daily_summary')}>{t('quick_overview')}</Button>
             </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar px-1">
            {scrollableDates.map((d, idx) => {
                const dateStr = getISODate(d);
                const isSelected = dateStr === selectedDate;
                return (
                    <button key={idx} onClick={() => setSelectedDate(dateStr)} className={`min-w-[56px] h-[72px] rounded-[24px] flex flex-col items-center justify-center gap-1 transition-all duration-300 border ${isSelected ? 'bg-primary text-white border-primary shadow-glow' : 'bg-[#1A1A1A] text-text-muted border-white/5'}`}>
                        <span className={`text-[10px] font-medium opacity-80`}>{d.toLocaleDateString((lang === 'fr' || lang === 'dr') ? 'fr-FR' : 'en-US', { weekday: 'short' })}</span>
                        <span className="text-lg font-bold">{d.getDate()}</span>
                        {!isSelected && data.tasks.some(t => t.date === dateStr) && <span className="w-1 h-1 rounded-full bg-white/30 mt-1"></span>}
                    </button>
                )
            })}
        </div>

        <div className="grid grid-cols-2 gap-3">
            <div onClick={() => setView('time_manager')} className="bg-[#1A1A1A] p-5 rounded-3xl border border-white/5 cursor-pointer active:scale-95 transition-all flex flex-col justify-between h-36">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3"><Clock size={20} /></div>
                <div><h4 className="font-bold text-sm text-white mb-1">{t('section_tasks')}</h4><p className="text-xs text-text-muted">{tasksTotal - tasksDone} {t('pending')}</p></div>
            </div>
            <div onClick={() => { setActiveTab('wallet'); setView('wallet'); }} className="bg-[#1A1A1A] p-5 rounded-3xl border border-white/5 cursor-pointer active:scale-95 transition-all flex flex-col justify-between h-36">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3"><Wallet size={20} /></div>
                <div><h4 className="font-bold text-sm text-white mb-1">{t('section_wallet')}</h4><p className="text-xs text-text-muted">{formatCurrency(totalBalance)}</p></div>
            </div>
            <div onClick={() => setView('personal_challenges')} className="bg-[#1A1A1A] p-5 rounded-3xl border border-white/5 cursor-pointer active:scale-95 transition-all flex flex-col justify-between h-36">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-3"><Trophy size={20} /></div>
                <div><h4 className="font-bold text-sm text-white mb-1">{t('section_challenges')}</h4><p className="text-xs text-text-muted">{t('push_yourself')}</p></div>
            </div>
             <div onClick={() => setView('daily_mistakes')} className="bg-[#1A1A1A] p-5 rounded-3xl border border-white/5 cursor-pointer active:scale-95 transition-all flex flex-col justify-between h-36">
                <div className="w-10 h-10 rounded-full bg-mistake/10 flex items-center justify-center text-mistake mb-3"><AlertCircle size={20} /></div>
                <div><h4 className="font-bold text-sm text-white mb-1">{t('section_mistakes')}</h4><p className="text-xs text-text-muted">{data.mistakes.filter(m => isSameDay(m.date, selectedDate)).length} {t('logged')}</p></div>
            </div>
        </div>
      </div>
    );
  };

  const DailySummaryView = () => {
      const currentTasks = data.tasks.filter(t => t.date === selectedDate);
      const completedTasks = currentTasks.filter(t => t.completed);
      const pendingTasks = currentTasks.filter(t => !t.completed);
      
      const dayIncome = data.incomes.filter(i => isSameDay(i.date, selectedDate)).reduce((a,c) => a + c.amount, 0);
      const dayExpense = data.expenses.filter(e => isSameDay(e.date, selectedDate)).reduce((a,c) => a + c.amount, 0);
      
      const dayMistakes = data.mistakes.filter(m => isSameDay(m.date, selectedDate));
      
      return (
          <div className="pt-4 pb-40 animate-in slide-in-from-right-4 fade-in duration-300">
              <SectionHeader title={t('summary_title')} onBack={() => setView('dashboard')} />
              
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-[32px] border border-primary/20 mb-6 text-center relative overflow-hidden">
                  <div className="relative z-10">
                      <h3 className="text-3xl font-display font-bold text-white mb-1">{currentTasks.length > 0 ? Math.round((completedTasks.length / currentTasks.length) * 100) : 0}%</h3>
                      <p className="text-primary font-medium text-sm">{t('task_overview')}</p>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#1A1A1A] p-5 rounded-[24px] border border-white/5">
                      <p className="text-text-muted text-xs mb-1">{t('completed_tasks')}</p>
                      <p className="text-xl font-bold text-white">{completedTasks.length}</p>
                  </div>
                   <div className="bg-[#1A1A1A] p-5 rounded-[24px] border border-white/5">
                      <p className="text-text-muted text-xs mb-1">{t('ongoing_tasks')}</p>
                      <p className="text-xl font-bold text-white">{pendingTasks.length}</p>
                  </div>
              </div>

              <h3 className="font-bold mb-4">{t('section_money')}</h3>
              <div className="bg-[#1A1A1A] p-6 rounded-[24px] border border-white/5 mb-6">
                  <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                           <ArrowDownLeft className="text-primary" size={20} />
                           <span className="text-sm text-text-muted">{t('money_income')}</span>
                      </div>
                      <span className="font-bold text-white">{formatCurrency(dayIncome)}</span>
                  </div>
                   <div className="w-full h-[1px] bg-white/5 mb-4"></div>
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                           <ArrowUpRight className="text-mistake" size={20} />
                           <span className="text-sm text-text-muted">{t('money_spent')}</span>
                      </div>
                      <span className="font-bold text-white">{formatCurrency(dayExpense)}</span>
                  </div>
              </div>

              {dayMistakes.length > 0 && (
                  <>
                    <h3 className="font-bold mb-4">{t('section_mistakes')}</h3>
                    <div className="space-y-3 mb-6">
                        {dayMistakes.map(m => (
                            <div key={m.id} className="p-4 bg-[#1A1A1A] rounded-[20px] border border-mistake/20 flex gap-3">
                                <AlertCircle className="text-mistake shrink-0" size={20} />
                                <p className="text-sm text-white/90">{m.text}</p>
                            </div>
                        ))}
                    </div>
                  </>
              )}
          </div>
      );
  };
  
  const NotificationsView = () => (
      <div className="pt-4 pb-40 animate-in slide-in-from-right-4 fade-in duration-300">
          <SectionHeader 
            title={t('notifications_title')} 
            onBack={() => setView('dashboard')} 
            rightElement={
                data.notifications.length > 0 && (
                    <button onClick={() => updateData({ notifications: [] })} className="text-xs text-primary font-medium">
                        {t('notifications_mark_read')}
                    </button>
                )
            }
          />
          
          <div className="space-y-3">
              {data.notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center mt-20 opacity-30">
                      <Bell size={48} className="mb-4" />
                      <p>{t('notifications_empty')}</p>
                  </div>
              ) : (
                  data.notifications.map(n => (
                      <div key={n.id} className={`p-4 rounded-[20px] border ${n.read ? 'bg-[#1A1A1A] border-white/5 opacity-60' : 'bg-[#202020] border-primary/20'} transition-all`}>
                          <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-sm text-white">{n.title}</h4>
                              <span className="text-[10px] text-text-muted">{new Date(n.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-text-muted leading-relaxed">{n.message}</p>
                      </div>
                  ))
              )}
          </div>
      </div>
  );

  const TimeManagerView = () => {
      const [newTaskText, setNewTaskText] = useState("");
      const [priority, setPriority] = useState<Priority>('medium');
      const currentTasks = data.tasks.filter(t => t.date === selectedDate);
      
      const urgentTasks = currentTasks.filter(t => t.priority === 'urgent' || (t.isPriority && !t.priority)); // Backwards compatibility for isPriority
      const highTasks = currentTasks.filter(t => t.priority === 'high');
      const mediumTasks = currentTasks.filter(t => t.priority === 'medium' || (!t.priority && !t.isPriority));
      const lowTasks = currentTasks.filter(t => t.priority === 'low');

      const completedCount = currentTasks.filter(t => t.completed).length;
      const progress = currentTasks.length > 0 ? (completedCount / currentTasks.length) * 100 : 0;

      const handleAddTask = () => {
          if (!newTaskText.trim()) return;
          const newTask = {
              id: Date.now().toString(),
              text: newTaskText,
              completed: false,
              isPriority: priority === 'urgent',
              priority: priority,
              date: selectedDate
          };
          updateData({ tasks: [newTask, ...data.tasks] });
          setNewTaskText("");
      };

      const PriorityCard = ({ title, count, type, colorClass, bgClass, iconClass }: any) => (
          <div className="p-4 rounded-[20px] bg-[#202020] border border-white/5 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-white/10 transition-all">
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-10 ${bgClass} -mr-4 -mt-4`}></div>
              <div className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold w-fit ${iconClass}`}>
                  <Flag size={10} className="mr-1 fill-current" />
                  {title}
              </div>
              <div className="relative z-10">
                  <span className="text-xl font-display font-bold block">{count} Task</span>
                  <span className="text-[10px] text-text-muted">{t('prio_cat_desc')}</span>
              </div>
          </div>
      );

      return (
          <div className="pt-4 pb-40 animate-in fade-in duration-300">
              <SectionHeader title={t('section_tasks')} onBack={() => setView('dashboard')} />

              {/* Main Matrix Card */}
              <div className="bg-[#1A1A1A] rounded-[32px] p-5 border border-white/5 mb-8">
                  {/* Header & Progress */}
                  <div className="flex justify-between items-center mb-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-display font-bold text-white">{completedCount}/{currentTasks.length}</span>
                        <span className="text-xs text-text-muted font-medium">{t('task_completed_label')}</span>
                      </div>
                      <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 text-xs font-bold text-white">
                          {Math.round(progress)}%
                      </div>
                  </div>
                  
                  <div className="w-full h-2.5 bg-[#252525] rounded-full overflow-hidden mb-6">
                      <div className="h-full bg-primary rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
                  </div>

                  {/* 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-3">
                      <PriorityCard title={t('prio_urgent')} count={urgentTasks.length} colorClass="text-red-500" bgClass="bg-red-500" iconClass="bg-red-500/10 text-red-500" />
                      <PriorityCard title={t('prio_high')} count={highTasks.length} colorClass="text-orange-500" bgClass="bg-orange-500" iconClass="bg-orange-500/10 text-orange-500" />
                      <PriorityCard title={t('prio_medium')} count={mediumTasks.length} colorClass="text-blue-500" bgClass="bg-blue-500" iconClass="bg-blue-500/10 text-blue-500" />
                      <PriorityCard title={t('prio_low')} count={lowTasks.length} colorClass="text-emerald-500" bgClass="bg-emerald-500" iconClass="bg-emerald-500/10 text-emerald-500" />
                  </div>
              </div>

              {/* Add Task Input - Redesigned */}
              <div className="mb-8">
                  <div className="flex items-center gap-2.5 mb-4 overflow-x-auto no-scrollbar px-1 pb-1">
                      {/* Date Chip */}
                      <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#202020] border border-white/5 text-xs font-bold text-white whitespace-nowrap transition-all active:scale-95 hover:border-white/20">
                          <CalendarIcon size={14} className="text-primary" />
                          <span>Today</span>
                      </button>

                      <div className="w-[1px] h-5 bg-white/10 flex-shrink-0 mx-1"></div>

                      {/* Priority Chips */}
                      {(['urgent', 'high', 'medium', 'low'] as Priority[]).map(p => (
                          <button 
                            key={p} 
                            onClick={() => setPriority(p)}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border flex-shrink-0
                                ${priority === p 
                                    ? p === 'urgent' ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20' 
                                    : p === 'high' ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20'
                                    : p === 'medium' ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                                    : 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                                    : 'bg-[#202020] text-text-muted border-white/5 hover:border-white/20 hover:text-white'
                                }
                            `}
                          >
                              {t(`prio_${p}`)}
                          </button>
                      ))}
                  </div>

                  <div className="flex items-center gap-3">
                      <div className="flex-1 relative group">
                        <input 
                            value={newTaskText} 
                            onChange={(e) => setNewTaskText(e.target.value)} 
                            placeholder="e.g., Learn 5 local phrases daily at 8pm" 
                            className="w-full bg-[#202020] border border-white/5 focus:border-primary/50 rounded-full px-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none text-sm font-medium h-[60px] transition-all shadow-inner"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                        />
                      </div>
                      <button 
                          onClick={handleAddTask} 
                          className="w-[60px] h-[60px] rounded-full bg-primary text-white flex items-center justify-center shadow-glow active:scale-95 transition-transform shrink-0 hover:bg-primaryDark"
                      >
                          <Plus size={28} strokeWidth={3} />
                      </button>
                  </div>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                  {currentTasks.length === 0 && (
                      <div className="text-center py-10 opacity-30">
                          <p>{t('tasks_empty')}</p>
                      </div>
                  )}
                  {currentTasks.map(task => (
                      <div key={task.id} className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-3">
                              <button onClick={() => updateData({ tasks: data.tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t) })}>
                                  {task.completed ? <CheckCircle2 className="text-primary" size={24} /> : <div className="w-6 h-6 rounded-full border-2 border-white/20" />}
                              </button>
                              <div className="flex flex-col">
                                  <span className={`${task.completed ? 'line-through text-text-muted' : 'text-white'}`}>{task.text}</span>
                                  {task.priority && (
                                    <span className={`text-[10px] font-bold uppercase mt-0.5 w-fit
                                        ${task.priority === 'urgent' ? 'text-red-500' : 
                                          task.priority === 'high' ? 'text-orange-500' :
                                          task.priority === 'medium' ? 'text-blue-500' : 'text-emerald-500'}
                                    `}>
                                        {t(`prio_${task.priority}`)}
                                    </span>
                                  )}
                              </div>
                          </div>
                          <button onClick={() => moveToTrash(task, 'task')} className="text-text-muted hover:text-mistake p-2">
                              <Trash2 size={18} />
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      );
  };

  const WalletView = () => {
      const [tab, setTab] = useState<'transactions' | 'loans'>('transactions');
      
      // Transactions Data
      const totalIncome = (data.incomes || []).reduce((acc, curr) => acc + curr.amount, 0);
      const totalExpense = data.expenses.reduce((acc, curr) => acc + curr.amount, 0);
      const totalVolume = totalIncome + totalExpense;
      const incomePct = totalVolume > 0 ? (totalIncome / totalVolume) * 100 : 0;
      const expensePct = totalVolume > 0 ? (totalExpense / totalVolume) * 100 : 0;
      const balance = totalIncome - totalExpense;
      const transactions = [...data.incomes.map(i => ({...i, t: 'income'})), ...data.expenses.map(e => ({...e, t: 'expense'}))]
        .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      // Loans Data
      const totalLent = data.loans.filter(l => l.type === 'lent' && !l.isPaid).reduce((acc, curr) => acc + curr.amount, 0);
      const totalBorrowed = data.loans.filter(l => l.type === 'borrowed' && !l.isPaid).reduce((acc, curr) => acc + curr.amount, 0);

      // Forms State
      const [amount, setAmount] = useState("");
      const [desc, setDesc] = useState("");
      const [type, setType] = useState<'income' | 'expense'>('expense');
      const [isAddingTx, setIsAddingTx] = useState(false);

      const [person, setPerson] = useState("");
      const [loanAmount, setLoanAmount] = useState("");
      const [loanType, setLoanType] = useState<'lent' | 'borrowed'>('lent');
      const [loanDueDate, setLoanDueDate] = useState("");
      const [isAddingLoan, setIsAddingLoan] = useState(false);

      const handleSaveTx = () => {
          if(!amount) return;
          const val = parseFloat(amount);
          const tx = { id: Date.now().toString(), amount: val, description: desc || (type === 'income' ? 'Income' : 'Expense'), date: selectedDate };
          if(type === 'income') updateData({ incomes: [tx, ...data.incomes] });
          else updateData({ expenses: [tx, ...data.expenses] });
          setAmount("");
          setDesc("");
          setIsAddingTx(false);
      };

      const handleSaveLoan = () => {
        if(!person || !loanAmount) return;
        const newLoan = {
            id: Date.now().toString(),
            person,
            amount: parseFloat(loanAmount),
            type: loanType,
            dueDate: loanDueDate || undefined,
            isPaid: false
        };
        updateData({ loans: [newLoan, ...data.loans] });
        setIsAddingLoan(false);
        setPerson("");
        setLoanAmount("");
        setLoanDueDate("");
      };

      return (
          <div className="flex flex-col pt-4 pb-40">
               <SectionHeader 
                  title={t('section_wallet')} 
                  onBack={() => setView('dashboard')} 
                  rightElement={
                      <IconButton icon={privateMode ? <EyeOff size={20} /> : <Eye size={20} />} onClick={() => setPrivateMode(!privateMode)} />
                  }
               />

               {/* Tab Switcher */}
               <div className="grid grid-cols-2 gap-2 bg-[#1A1A1A] p-1.5 rounded-[20px] border border-white/5 mb-6">
                    <button 
                        onClick={() => setTab('transactions')} 
                        className={`py-3 rounded-[16px] text-sm font-bold transition-all ${tab === 'transactions' ? 'bg-[#2A2A2A] text-white shadow-sm border border-white/5' : 'text-text-muted hover:text-white'}`}
                    >
                        {t('section_money')}
                    </button>
                    <button 
                        onClick={() => setTab('loans')} 
                        className={`py-3 rounded-[16px] text-sm font-bold transition-all ${tab === 'loans' ? 'bg-[#2A2A2A] text-white shadow-sm border border-white/5' : 'text-text-muted hover:text-white'}`}
                    >
                        {t('section_loans')}
                    </button>
               </div>

               {tab === 'transactions' ? (
                   <div className="animate-in fade-in duration-300">
                       <div className="bg-[#1A1A1A] rounded-[24px] p-6 mb-6 border border-white/5">
                            {/* Donut Chart */}
                            <div className="flex justify-center mb-8 relative">
                                    <div className="relative w-48 h-48">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                            {totalVolume === 0 && (
                                                <path className="text-[#262626]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                                            )}
                                            {totalVolume > 0 && (
                                                <circle className="text-[#10B981] transition-all duration-500" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3.5" strokeDasharray={`${incomePct}, 100`} />
                                            )}
                                            {totalVolume > 0 && (
                                                <circle className="text-[#EF4444] transition-all duration-500" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3.5" strokeDasharray={`${expensePct}, 100`} strokeDashoffset={-incomePct} />
                                            )}
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-display font-bold text-white">{formatCurrency(balance)}</span>
                                            <span className="text-[10px] text-text-muted uppercase tracking-wider font-medium">{t('money_balance')}</span>
                                        </div>
                                    </div>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                                            <span className="text-sm font-medium text-[#9CA3AF]">{t('money_income')}</span>
                                        </div>
                                        <span className="text-base font-bold text-white">{formatCurrency(totalIncome)}</span>
                                    </div>
                                    <div className="w-full h-[1px] bg-white/5"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                                            <span className="text-sm font-medium text-[#9CA3AF]">{t('money_spent')}</span>
                                        </div>
                                        <span className="text-base font-bold text-white">{formatCurrency(totalExpense)}</span>
                                    </div>
                            </div>
                       </div>

                       <Button fullWidth onClick={() => setIsAddingTx(!isAddingTx)} className="mb-6">{isAddingTx ? t('back') : t('tx_add_btn')}</Button>

                       {isAddingTx && (
                           <div className="bg-[#1A1A1A] p-5 rounded-[32px] border border-white/5 mb-6 animate-in slide-in-from-top-4 fade-in">
                               <div className="flex gap-2 mb-4">
                                    <button onClick={() => setType('expense')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${type === 'expense' ? 'bg-mistake text-white' : 'bg-[#252525] text-text-muted'}`}>{t('tx_type_expense')}</button>
                                    <button onClick={() => setType('income')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${type === 'income' ? 'bg-primary text-white' : 'bg-[#252525] text-text-muted'}`}>{t('tx_type_income')}</button>
                                </div>
                               <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-[#252525] text-white p-4 rounded-xl mb-3 outline-none focus:border focus:border-white/20" />
                               <input type="text" placeholder={t('money_desc_placeholder')} value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-[#252525] text-white p-4 rounded-xl mb-4 outline-none focus:border focus:border-white/20" />
                               <Button fullWidth onClick={handleSaveTx}>{t('tx_add_btn')}</Button>
                           </div>
                       )}

                       <h3 className="font-bold mb-4">{t('tx_history')}</h3>
                       <div className="space-y-3 pb-6">
                           {transactions.length === 0 && <p className="text-text-muted text-center py-10 opacity-50">{t('tx_empty')}</p>}
                           {transactions.map((t: any) => (
                               <div key={t.id} className="flex justify-between items-center p-5 rounded-[24px] bg-[#1A1A1A] border border-white/5">
                                   <div className="flex items-center gap-3">
                                       <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.t === 'income' ? 'bg-primary/10 text-primary' : 'bg-mistake/10 text-mistake'}`}>
                                           {t.t === 'income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                       </div>
                                       <div>
                                           <p className="font-bold text-sm">{t.description}</p>
                                           <p className="text-xs text-text-muted">{new Date(t.date).toLocaleDateString()}</p>
                                       </div>
                                   </div>
                                   <div className="flex items-center gap-3">
                                       <span className={`font-mono font-bold text-sm ${t.t === 'income' ? 'text-primary' : 'text-white'}`}>
                                           {t.t === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                                       </span>
                                       <button onClick={() => moveToTrash(t, t.t === 'income' ? 'income' : 'expense')} className="text-text-muted hover:text-mistake p-1"><Trash2 size={18} /></button>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
               ) : (
                   <div className="animate-in fade-in duration-300">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-[#1A1A1A] p-5 rounded-[24px] border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-3">
                                    <ArrowUpRight size={20} />
                                </div>
                                <p className="text-xs text-text-muted mb-1">{t('loans_lent')}</p>
                                <p className="text-xl font-bold text-white">{formatCurrency(totalLent)}</p>
                            </div>
                            <div className="bg-[#1A1A1A] p-5 rounded-[24px] border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                                    <ArrowDownLeft size={20} />
                                </div>
                                <p className="text-xs text-text-muted mb-1">{t('loans_borrowed')}</p>
                                <p className="text-xl font-bold text-white">{formatCurrency(totalBorrowed)}</p>
                            </div>
                        </div>

                        <Button fullWidth onClick={() => setIsAddingLoan(!isAddingLoan)} className="mb-6">
                            {isAddingLoan ? t('back') : t('loans_add')}
                        </Button>

                        {isAddingLoan && (
                            <div className="bg-[#1A1A1A] p-5 rounded-[32px] border border-white/5 mb-6 animate-in slide-in-from-top-4 fade-in">
                                <div className="flex gap-2 mb-4">
                                    <button onClick={() => setLoanType('lent')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${loanType === 'lent' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/50' : 'bg-[#252525] text-text-muted'}`}>{t('tx_type_lent')}</button>
                                    <button onClick={() => setLoanType('borrowed')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${loanType === 'borrowed' ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-[#252525] text-text-muted'}`}>{t('tx_type_borrowed')}</button>
                                </div>
                                <input type="text" placeholder={t('person_name')} value={person} onChange={e => setPerson(e.target.value)} className="w-full bg-[#252525] text-white p-4 rounded-xl mb-3 outline-none border border-white/5 focus:border-white/20" />
                                <input type="number" placeholder="0.00" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="w-full bg-[#252525] text-white p-4 rounded-xl mb-4 outline-none border border-white/5 focus:border-white/20" />
                                <input type="date" value={loanDueDate} onChange={e => setLoanDueDate(e.target.value)} className="w-full bg-[#252525] text-white p-4 rounded-xl mb-4 outline-none border border-white/5 focus:border-white/20 text-sm [color-scheme:dark]" />
                                <Button fullWidth onClick={handleSaveLoan}>{t('tx_add_btn')}</Button>
                            </div>
                        )}

                        <div className="space-y-3">
                            {data.loans.length === 0 && <p className="text-text-muted text-center py-10 opacity-50">{t('tx_empty')}</p>}
                            {data.loans.map(l => (
                                <div key={l.id} className={`p-5 bg-[#1A1A1A] rounded-[24px] border border-white/5 flex justify-between items-center transition-all ${l.isPaid ? 'opacity-50' : ''}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${l.type === 'lent' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {l.person.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className={`font-bold text-sm ${l.isPaid ? 'line-through' : ''}`}>{l.person}</p>
                                            <p className="text-xs text-text-muted">
                                                {l.type === 'lent' ? t('tx_type_lent') : t('tx_type_borrowed')}
                                                {l.dueDate && <span className="opacity-70"> • {t('due_date')} {new Date(l.dueDate).toLocaleDateString()}</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`font-mono font-bold text-sm ${l.type === 'lent' ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {formatCurrency(l.amount)}
                                        </span>
                                        <button onClick={() => toggleLoanStatus(l.id)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${l.isPaid ? 'bg-primary text-white' : 'bg-white/10 hover:bg-white/20'}`}>
                                            <Check size={14} />
                                        </button>
                                        <button onClick={() => moveToTrash(l, 'loan')} className="text-text-muted hover:text-mistake p-1">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                   </div>
               )}
          </div>
      )
  };

  const SettingsView = () => {
      const fileInputRefProfile = useRef<HTMLInputElement>(null);
      const fileInputRefCover = useRef<HTMLInputElement>(null);

      const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
          const file = e.target.files?.[0];
          if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                  if (type === 'profile') {
                      updateData({ profileImage: reader.result as string });
                  } else {
                      updateData({ coverImage: reader.result as string });
                  }
              };
              reader.readAsDataURL(file);
          }
      };

      return (
      <div className="pt-4 pb-40 animate-in fade-in duration-300">
          <SectionHeader title={t('edit_profile')} onBack={() => setView('dashboard')} />
          
          <div className="relative mb-24 px-1">
                {/* Cover Image */}
                <div className="relative w-full h-44 rounded-[32px] overflow-hidden bg-[#202020] border border-white/5">
                    {data.coverImage ? (
                        <img src={data.coverImage} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]"></div>
                    )}
                    <button 
                        onClick={() => fileInputRefCover.current?.click()}
                        className="absolute top-4 right-4 w-9 h-9 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 active:scale-95 transition-all"
                    >
                        <Camera size={16} />
                    </button>
                    <input ref={fileInputRefCover} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'cover')} />
                </div>

                {/* Profile Image - Overlapping */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                    <div className="w-32 h-32 rounded-full border-[6px] border-[#050505] bg-[#202020] overflow-hidden relative shadow-2xl flex items-center justify-center">
                         {data.profileImage ? (
                            <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-5xl font-display font-bold text-primary">
                                {data.name.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>
                     <button 
                        onClick={() => fileInputRefProfile.current?.click()}
                        className="absolute bottom-1 right-1 w-9 h-9 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 active:scale-95 transition-all z-10"
                    >
                        <Camera size={16} />
                    </button>
                    <input ref={fileInputRefProfile} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'profile')} />
                </div>

                {/* Save Button */}
                <button 
                    onClick={() => { /* Logic to save if needed, currently auto-updates state */ }}
                    className="absolute -bottom-12 right-0 bg-[#10B981] text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform"
                >
                    {t('btn_save')}
                </button>
          </div>

          <div className="text-center mb-8">
              <p className="text-sm font-mono text-text-muted tracking-wide">{t('settings_id')} : {data.userId}</p>
          </div>

          <div className="space-y-6">
              <div className="bg-[#1A1A1A] p-5 rounded-[24px] border border-white/5">
                  <label className="block text-sm font-medium text-text-muted mb-2 ml-1">{t('settings_name')}</label>
                  <input 
                      value={data.name} 
                      onChange={(e) => updateData({ name: e.target.value })}
                      className="w-full bg-[#252525] rounded-xl px-4 py-3 text-white outline-none border border-transparent focus:border-primary/50 transition-all font-medium"
                      placeholder="Enter name"
                  />
              </div>

              <div className="pt-4 border-t border-white/5">
                  <h3 className="text-lg font-bold mb-4 px-2">{t('settings_title')}</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-[#1A1A1A] rounded-2xl border border-white/5 flex justify-between items-center">
                        <span className="text-sm font-medium">{t('settings_language')}</span>
                        <div className="flex gap-2">
                            {(['en', 'fr', 'dr'] as Language[]).map(l => (
                                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === l ? 'bg-primary text-white' : 'bg-[#2A2A2A] text-text-muted hover:text-white'}`}>{l.toUpperCase()}</button>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 bg-[#1A1A1A] rounded-2xl border border-white/5 flex justify-between items-center">
                        <span className="text-sm font-medium">{t('settings_currency')}</span>
                        <select value={data.currency} onChange={(e) => updateData({ currency: e.target.value })} className="bg-[#2A2A2A] rounded-lg px-2 py-1.5 text-xs outline-none font-bold">
                            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                        </select>
                    </div>
                     <Button variant="danger" fullWidth onClick={() => { if(confirm(t('reset_confirm_msg'))) { localStorage.removeItem('lifebooster_data'); window.location.reload(); } }}>
                        {t('settings_reset')}
                    </Button>
                    <Button variant="secondary" fullWidth onClick={() => setView('trash')} className="flex items-center justify-center gap-2">
                        <Trash2 size={16} />
                        {t('trash_title')}
                    </Button>
                  </div>
              </div>
          </div>
      </div>
  )};

  const CalendarView = () => {
    const [currentDate, setCurrentDate] = useState(new Date(selectedDate || new Date()));
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
    }

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };
    
    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getDayStatus = (date: Date) => {
        const dStr = getISODate(date);
        const tasks = data.tasks.filter(t => t.date === dStr);
        if (tasks.length === 0) return 'empty';
        const completed = tasks.filter(t => t.completed).length;
        if (completed === tasks.length) return 'full';
        if (completed > 0) return 'partial';
        return 'missed';
    };

    return (
        <div className="pt-4 pb-40 animate-in fade-in duration-300">
             <SectionHeader title={t('calendar_title')} onBack={() => setView('dashboard')} />
             
             <div className="bg-[#1A1A1A] rounded-[24px] p-6 mb-6 border border-white/5">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full text-white"><ChevronLeft size={20} /></button>
                    <h3 className="font-bold text-lg capitalize text-white">{currentDate.toLocaleDateString((lang === 'fr' || lang === 'dr') ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })}</h3>
                    <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full text-white"><ChevronRight size={20} /></button>
                </div>
                
                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    {['S','M','T','W','T','F','S'].map((d, i) => (
                        <div key={i} className="text-xs text-text-muted font-bold">{d}</div>
                    ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                    {days.map((d, i) => {
                        if (!d) return <div key={i}></div>;
                        const status = getDayStatus(d);
                        let bg = 'bg-[#252525] text-text-muted border border-white/5';
                        if (status === 'full') bg = 'bg-primary text-white shadow-glow border-primary';
                        if (status === 'partial') bg = 'bg-primary/40 text-white border-primary/40';
                        if (status === 'missed') bg = 'bg-mistake/20 text-mistake border-mistake/20';
                        
                        const isSelected = getISODate(d) === selectedDate;
                        
                        return (
                            <button 
                                key={i} 
                                onClick={() => { setSelectedDate(getISODate(d)); setView('dashboard'); }}
                                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all ${bg} ${isSelected ? 'ring-2 ring-white scale-110 z-10' : 'hover:bg-white/10'}`}
                            >
                                {d.getDate()}
                            </button>
                        );
                    })}
                </div>
             </div>

             <h3 className="font-bold mb-4">{t('report_title')}</h3>
             <div className="grid grid-cols-2 gap-3">
                 <div className="bg-[#1A1A1A] p-4 rounded-[20px] border border-white/5">
                     <p className="text-xs text-text-muted mb-1">{t('stats_respected')}</p>
                     <p className="text-xl font-bold text-white">
                         {days.filter(d => d && getDayStatus(d) === 'full').length}
                     </p>
                 </div>
                 <div className="bg-[#1A1A1A] p-4 rounded-[20px] border border-white/5">
                     <p className="text-xs text-text-muted mb-1">{t('stats_missed')}</p>
                     <p className="text-xl font-bold text-white">
                         {days.filter(d => d && getDayStatus(d) === 'missed').length}
                     </p>
                 </div>
             </div>
        </div>
    );
  };

  const renderContent = () => {
      switch (view) {
          case 'onboarding': return <OnboardingView />;
          case 'dashboard': return <DashboardView />;
          case 'daily_summary': return <DailySummaryView />;
          case 'notifications': return <NotificationsView />;
          case 'wallet': return <WalletView />;
          case 'time_manager': return <TimeManagerView />;
          case 'personal_challenges': return <GenericListView title={t('section_challenges')} placeholder={t('challenges_placeholder')} items={data.challenges.filter(c => c.date === selectedDate)} onAdd={(text: string, setText: any) => { updateData({ challenges: [{ id: Date.now().toString(), text, completed: false, date: selectedDate }, ...data.challenges] }); setText(""); }} renderItem={(item: any) => (<div key={item.id} className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-white/5 rounded-2xl"><div className="flex items-center gap-3"><button onClick={() => updateData({ challenges: data.challenges.map(c => c.id === item.id ? { ...c, completed: !c.completed } : c) })}>{item.completed ? <Trophy className="text-yellow-500" size={24} /> : <div className="w-6 h-6 rounded-full border-2 border-white/20" />}</button><span className={`${item.completed ? 'line-through text-text-muted' : 'text-white'}`}>{item.text}</span></div><button onClick={() => moveToTrash(item, 'challenge')} className="text-text-muted"><Trash2 size={18} /></button></div>)} />;
          case 'daily_mistakes': return <GenericListView title={t('section_mistakes')} placeholder={t('mistakes_placeholder')} items={data.mistakes.filter(m => isSameDay(m.date, selectedDate))} onAdd={(text: string, setText: any) => { updateData({ mistakes: [{ id: Date.now().toString(), text, date: selectedDate }, ...data.mistakes] }); setText(""); }} renderItem={(item: any) => (<div key={item.id} className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-mistake/20 rounded-2xl"><div className="flex items-center gap-3"><AlertCircle className="text-mistake" size={24} /><span className="text-white">{item.text}</span></div><button onClick={() => moveToTrash(item, 'mistake')} className="text-text-muted"><Trash2 size={18} /></button></div>)} />;
          case 'loans': return <WalletView />;
          case 'calendar': return <CalendarView />;
          case 'settings': return <SettingsView />;
          case 'trash': return <div className="pt-4 pb-40"><SectionHeader title={t('trash_title')} onBack={() => setView('settings')} />{data.trash.map((item, idx) => (<div key={idx} className="p-4 bg-[#1A1A1A] rounded-2xl flex justify-between items-center mb-2"><div><p className="text-sm font-bold capitalize">{item.type}</p><p className="text-xs text-text-muted">{new Date(item.deletedAt).toLocaleDateString()}</p></div><div className="flex gap-2"><button onClick={() => restoreFromTrash(item)} className="p-2 bg-primary/20 text-primary rounded-lg"><RefreshCcw size={16} /></button><button onClick={() => deletePermanently(item.data.id)} className="p-2 bg-mistake/20 text-mistake rounded-lg"><Trash2 size={16} /></button></div></div>))}</div>;
          default: return <DashboardView />;
      }
  };

  const BottomNav = () => {
    if (view === 'onboarding') return null;
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="absolute bottom-[52px] left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
             <button onClick={() => setShowQuickMenu(true)} className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-glow active:scale-95 transition-transform border-[6px] border-[#050505]"><Plus size={32} strokeWidth={3} /></button>
        </div>
        <div className="bg-black/95 backdrop-blur-lg border-t border-white/5 pb-8 pt-4 px-8 flex justify-between items-center rounded-t-3xl shadow-nav h-[85px] relative z-40">
            <button onClick={() => { setActiveTab('home'); setView('dashboard'); }} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-primary' : 'text-text-muted'}`}><Home size={26} strokeWidth={activeTab === 'home' ? 2.5 : 2} /></button>
            <button onClick={() => { setActiveTab('calendar'); setView('calendar'); }} className={`flex flex-col items-center gap-1 ${activeTab === 'calendar' ? 'text-primary' : 'text-text-muted'}`}><CalendarIcon size={26} strokeWidth={activeTab === 'calendar' ? 2.5 : 2} /></button>
            <div className="w-12"></div>
            <button onClick={() => { setActiveTab('wallet'); setView('wallet'); }} className={`flex flex-col items-center gap-1 ${activeTab === 'wallet' ? 'text-primary' : 'text-text-muted'}`}><Wallet size={26} strokeWidth={activeTab === 'wallet' ? 2.5 : 2} /></button>
            <button onClick={() => { setActiveTab('profile'); setView('settings'); }} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-primary' : 'text-text-muted'}`}><User size={26} strokeWidth={activeTab === 'profile' ? 2.5 : 2} /></button>
        </div>
      </div>
    );
  };

  const QuickMenu = () => (
      <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowQuickMenu(false)}></div>
          <div className="bg-[#1A1A1A] w-full max-w-sm rounded-[32px] p-6 relative z-10 animate-in slide-in-from-bottom-10 fade-in border border-white/10">
              <h3 className="text-center font-bold text-lg mb-6">{t('quick_menu_title')}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                  <button onClick={() => { setShowQuickMenu(false); setView('time_manager'); }} className="bg-[#222] p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-[#2A2A2A] active:scale-95 transition-all"><CheckSquare size={20} className="text-blue-500" /><span className="text-sm font-medium">{t('quick_task')}</span></button>
                  <button onClick={() => { setShowQuickMenu(false); setView('wallet'); }} className="bg-[#222] p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-[#2A2A2A] active:scale-95 transition-all"><Wallet size={20} className="text-primary" /><span className="text-sm font-medium">{t('quick_wallet')}</span></button>
                  <button onClick={() => { setShowQuickMenu(false); setView('personal_challenges'); }} className="bg-[#222] p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-[#2A2A2A] active:scale-95 transition-all"><Trophy size={20} className="text-yellow-500" /><span className="text-sm font-medium">{t('quick_challenge')}</span></button>
                  <button onClick={() => { setShowQuickMenu(false); setView('daily_mistakes'); }} className="bg-[#222] p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-[#2A2A2A] active:scale-95 transition-all"><AlertCircle size={20} className="text-mistake" /><span className="text-sm font-medium">{t('quick_mistake')}</span></button>
              </div>
          </div>
      </div>
  );

  return (
      <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-primary/30 px-5 max-w-lg mx-auto relative shadow-2xl overflow-hidden pb-safe">
          {renderContent()}
          <BottomNav />
          {showQuickMenu && <QuickMenu />}
      </div>
  );
};

export default App;
