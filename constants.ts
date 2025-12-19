



import { Translations, AppData } from './types';

export const TEXT: Translations = {
  app_name: { en: "Life Booster", fr: "Life Booster", dr: "Life Booster" },
  app_subtitle: { 
    en: "Private Growth System", 
    fr: "Système de Croissance Privé",
    dr: "System Dyalek L'khas"
  },
  
  // Onboarding
  onboarding_1_title: { 
    en: "Private Space", 
    fr: "Espace Privé",
    dr: "Espace Privé"
  },
  onboarding_1_desc: { 
    en: "No judgment. Just you and your progress.", 
    fr: "Pas de jugement. Juste vous et vos progrès.",
    dr: "Ma kayn li y7kem 3lik. Ghi nta w l'progress dyalek."
  },
  onboarding_2_title: { 
    en: "Radical Truth", 
    fr: "Vérité Radicale",
    dr: "Saraha M3a Ras"
  },
  onboarding_2_desc: { 
    en: "Log what you really do. Learn from reality.", 
    fr: "Notez ce que vous faites vraiment. Apprenez de la réalité.",
    dr: "Qeyed dakchi li kayn. T3ellem men l'wa9i3."
  },
  onboarding_3_title: { 
    en: "100% Secure", 
    fr: "100% Sécurisé",
    dr: "100% Sécurisé"
  },
  onboarding_3_desc: { 
    en: "Data stays on your phone.", 
    fr: "Les données restent sur votre téléphone.",
    dr: "L'ma3loumat kayb9aw f telephone dyalek."
  },
  btn_continue: { en: "Next", fr: "Suivant", dr: "Zid" },
  btn_get_started: { en: "Initialize System", fr: "Initialiser", dr: "Bda System" },
  btn_skip: { en: "Skip", fr: "Passer", dr: "Doz" },
  btn_save: { en: "Save", fr: "Sauver", dr: "Sauvegarder" },

  // Dashboard Common
  hi: { en: "Hi", fr: "Salut", dr: "Ahlan" },
  dashboard_subtitle: { en: "Your progress shows here", fr: "Votre progression s'affiche ici", dr: "Hna fin kayban l'progress" },
  daily_goal: { en: "Daily Mission", fr: "Mission du Jour", dr: "Mission Dyal L'youm" },
  your_progress: { en: "Execution Rate", fr: "Taux d'exécution", dr: "Chhal derti" },
  total_spent: { en: "Outflow", fr: "Sorties", dr: "Masarif" },
  mistakes_logged: { en: "Lessons", fr: "Leçons", dr: "Dourous" },
  
  // Dashboard Sections
  btn_start_day: { en: "Manage Tasks", fr: "Gérer Tâches", dr: "Gadd Chghal" },
  quick_overview: { en: "Status Report", fr: "Rapport d'État", dr: "Rapport" },
  pending: { en: "left", fr: "restants", dr: "b9aw" },
  logged: { en: "logged", fr: "notées", dr: "mamsouh" },
  push_yourself: { en: "Discipline", fr: "Discipline", dr: "Discipline" },
  track_debts: { en: "Liabilities", fr: "Dettes", dr: "Diyoun" },
  
  // Quick Menu
  quick_menu_title: { en: "Quick Entry", fr: "Entrée Rapide", dr: "Zid Bel Zerba" },
  quick_task: { en: "Task", fr: "Tâche", dr: "Tâche" },
  quick_wallet: { en: "Transaction", fr: "Transaction", dr: "Transaction" },
  quick_challenge: { en: "Challenge", fr: "Défi", dr: "Challenge" },
  quick_mistake: { en: "Lesson", fr: "Leçon", dr: "Dars" },

  // Sections Titles
  section_tasks: { en: "Tasks", fr: "Tâches", dr: "Tâches" },
  section_challenges: { en: "Discipline", fr: "Discipline", dr: "Discipline" },
  section_money: { en: "Cash Flow", fr: "Trésorerie", dr: "L'flouss" },
  section_wallet: { en: "Wallet", fr: "Portefeuille", dr: "Bztam" },
  section_mistakes: { en: "Daily Lessons", fr: "Leçons du Jour", dr: "Dourous L'youm" },
  section_loans: { en: "Debts & Loans", fr: "Dettes & Prêts", dr: "Kridiyat" },
  section_trash: { en: "Archive", fr: "Archives", dr: "Archive" },

  // Time Manager
  tasks_title: { en: "Execution", fr: "Exécution", dr: "Tanfid" },
  tasks_placeholder: { en: "Enter task...", fr: "Saisir tâche...", dr: "Ktbe chnou khasek dir..." },
  tasks_empty: { en: "System ready. Add tasks.", fr: "Système prêt. Ajoutez des tâches.", dr: "System wajed. Zid chghal." },
  task_completed_label: { en: "Task completed", fr: "Tâches terminées", dr: "Tâches salaw" },
  task_export: { en: "Export statistics", fr: "Exporter stats", dr: "Telechargi stats" },
  
  // Priorities
  prio_urgent: { en: "Urgent", fr: "Urgent", dr: "Zerba" },
  prio_high: { en: "High", fr: "Élevé", dr: "Tale3" },
  prio_medium: { en: "Medium", fr: "Moyen", dr: "Moyen" },
  prio_low: { en: "Low", fr: "Bas", dr: "Habet" },
  prio_cat_desc: { en: "In this category", fr: "Dans cette catégorie", dr: "F had l'categorie" },

  // Challenges
  challenges_title: { en: "Hard Mode", fr: "Mode Difficile", dr: "Niveau Tale3" },
  challenges_placeholder: { en: "Challenge description...", fr: "Description du défi...", dr: "Challenge..." },

  // Money & Wallet
  money_spent: { en: "Expense", fr: "Dépense", dr: "Khssarti" },
  money_income: { en: "Income", fr: "Revenu", dr: "Dkhalti" },
  money_balance: { en: "Net Worth", fr: "Solde Net", dr: "Solde" },
  money_placeholder: { en: "0.00", fr: "0.00", dr: "0.00" },
  money_desc_placeholder: { en: "Label (e.g. Coffee)", fr: "Libellé (ex: Café)", dr: "Label (ex: 9hiwa)" },
  person_name: { en: "Contact Name", fr: "Nom du Contact", dr: "Smiya" },
  due_date: { en: "Deadline", fr: "Échéance", dr: "Imta?" },
  
  // Transaction Types
  tx_type_income: { en: "Income", fr: "Entrée", dr: "Dakhel" },
  tx_type_expense: { en: "Expense", fr: "Sortie", dr: "Kharej" },
  tx_type_lent: { en: "Lent", fr: "Prêté", dr: "Sleft" },
  tx_type_borrowed: { en: "Borrowed", fr: "Emprunté", dr: "Tsleft" },
  tx_add_btn: { en: "Save Record", fr: "Enregistrer", dr: "Sejjel" },
  tx_history: { en: "History", fr: "Historique", dr: "Historique" },
  tx_empty: { en: "No activity recorded.", fr: "Aucune activité.", dr: "Walou." },
  
  // Filters & Actions
  filter_all: { en: "All", fr: "Tout", dr: "Kulchi" },
  filter_title: { en: "Filter", fr: "Filtrer", dr: "Filtri" },
  loan_paid: { en: "Settled", fr: "Réglé", dr: "Khaless" },
  loan_mark_paid: { en: "Settle", fr: "Régler", dr: "Khelles" },
  loan_unpaid: { en: "Pending", fr: "En attente", dr: "Mazal" },

  // Mistakes
  mistakes_title: { en: "Daily Lessons", fr: "Leçons Apprises", dr: "Dourous L'youm" },
  mistakes_placeholder: { en: "What went wrong? What did you learn?", fr: "Qu'est-ce qui n'a pas été ? Qu'avez-vous appris ?", dr: "Chnou l'ghalat li derti? Chnou t3lemti?" },
  
  // Loans
  loans_net: { en: "Net Position", fr: "Position Nette", dr: "Posotion Nette" },
  loans_add: { en: "New Record", fr: "Nouveau", dr: "Jdid" },
  loans_lent: { en: "Assets (Lent)", fr: "Actifs (Prêté)", dr: "Li 3nd Nass" },
  loans_borrowed: { en: "Liabilities (Borrowed)", fr: "Passifs (Emprunté)", dr: "Li 3liya" },

  // Summary & Report
  summary_title: { en: "Daily Debrief", fr: "Débriefing", dr: "Rapport L'youm" },
  summary_footer: { 
    en: "Analysis complete.", 
    fr: "Analyse terminée.",
    dr: "Salina."
  },
  report_title: { en: "Analytics", fr: "Analytique", dr: "Tahlil" },
  task_overview: { en: "Performance", fr: "Performance", dr: "Ada2" },
  completed_tasks: { en: "Done", fr: "Fait", dr: "Derti" },
  ongoing_tasks: { en: "Missed", fr: "Manqué", dr: "Zgelti" },
  weekly_activity: { en: "7-Day Trend", fr: "Tendance 7j", dr: "Trend 7 Iyam" },
  productivity_trend: { en: "Velocity", fr: "Vélocité", dr: "Sor3a" },
  avg_project: { en: "Avg/Day", fr: "Moy/Jour", dr: "Moyenne/Nhar" },
  last_7_days: { en: "Last 7 Days", fr: "7 Derniers Jours", dr: "7 Iyam Lkhra" },
  
  // Settings
  edit_profile: { en: "Edit profile", fr: "Modifier profil", dr: "Beddel Profil" },
  settings_title: { en: "System Config", fr: "Configuration", dr: "Reglage" },
  settings_language: { en: "Interface Language", fr: "Langue Interface", dr: "Lougha" },
  settings_currency: { en: "Base Currency", fr: "Devise Principale", dr: "L'3oumla" },
  settings_reset: { en: "Factory Reset", fr: "Réinitialisation Usine", dr: "Formatage" },
  settings_gender: { en: "Identity", fr: "Identité", dr: "Chakhsiya" },
  settings_male: { en: "Male", fr: "Homme", dr: "Rajel" },
  settings_female: { en: "Female", fr: "Femme", dr: "Mra" },
  settings_name: { en: "Display Name", fr: "Nom d'affichage", dr: "Smiya" },
  settings_id: { en: "ID", fr: "ID", dr: "ID" },
  reset_confirm_msg: {
    en: "CRITICAL: This will wipe all data. Confirm?",
    fr: "CRITIQUE : Cela effacera toutes les données. Confirmer ?",
    dr: "MO3HIM: Ghadi tmse7 kulchi. Nadi?"
  },

  // Trash
  trash_title: { en: "Archive", fr: "Archives", dr: "Archive" },
  trash_empty: { en: "Archive empty", fr: "Archives vides", dr: "Archive khawi" },
  trash_restore: { en: "Recover", fr: "Récupérer", dr: "Rje3" },
  trash_delete: { en: "Shred", fr: "Détruire", dr: "Mse7" },
  trash_warning: { en: "Items here are inactive.", fr: "Éléments inactifs.", dr: "Hada rchiif." },
  
  // Calendar
  calendar_title: { en: "Timeline", fr: "Chronologie", dr: "Zmam" },
  calendar_empty: { 
    en: "No data.", 
    fr: "Aucune donnée.",
    dr: "Walou."
  },
  stats_month: { en: "Monthly", fr: "Mensuel", dr: "Chahriyane" },
  stats_weekly: { en: "Weekly", fr: "Hebdomadaire", dr: "Simana" },
  stats_respected: { en: "Active Days", fr: "Jours Actifs", dr: "Ayam l'khedma" },
  stats_missed: { en: "Zero Days", fr: "Jours Zéro", dr: "Ayam l'khwa" },
  stats_completion: { en: "Consistency", fr: "Constance", dr: "Istimrariya" },

  // Notifications
  notifications_title: { en: "Logs", fr: "Journaux", dr: "Logs" },
  notifications_empty: { en: "No logs", fr: "Aucun journal", dr: "Walou" },
  notifications_mark_read: { en: "Clear all", fr: "Tout effacer", dr: "Mse7 kulchi" },
  
  // General
  back: { en: "Back", fr: "Retour", dr: "Rjou3" },
  next: { en: "Next", fr: "Suivant", dr: "Zid" },
};

export const INITIAL_DATA: AppData = {
  hasOnboarded: false,
  joinDate: new Date().toISOString(), 
  name: "User", 
  userId: "TNAV9832",
  gender: 'male',
  currency: 'AED',
  tasks: [],
  challenges: [],
  expenses: [],
  incomes: [],
  loans: [],
  mistakes: [],
  trash: [], 
  notifications: [], 
  lastActiveDate: new Date().toISOString(),
};

export const CURRENCIES = [
  { code: 'MAD', name: 'Moroccan Dirham' },
  { code: 'AED', name: 'United Arab Emirates Dirham' },
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'SAR', name: 'Saudi Riyal' },
  { code: 'QAR', name: 'Qatari Rial' },
  { code: 'DZD', name: 'Algerian Dinar' },
  { code: 'TND', name: 'Tunisian Dinar' },
  { code: 'EGP', name: 'Egyptian Pound' },
  { code: 'CAD', name: 'Canadian Dollar' },
];
