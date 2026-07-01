/* ===========================
   HDHILI'S VOYAGE - JavaScript Professional v2.0
   نسخة احترافية مع جميع الميزات المتقدمة
=========================== */

// 🌐 نظام اللغات المتعددة (Multi-Language System)
const translations = {
  fr: {
    home: 'Accueil', destinations: 'Destinations', offers: 'Offres', 
    services: 'Services', reviews: 'Avis', contact: 'Contact',
    search: 'Rechercher votre voyage', searchBtn: 'Rechercher',
    discover: 'Découvrir', popular: 'Destinations Populaires',
    special: 'Offres Spéciales', why: 'Pourquoi Nous Choisir ?',
    clients: 'Avis Clients', plan: 'Planifiez votre voyage avec nous',
    descr: 'Nous vous accompagnons pour vos voyages',
    fullName: 'Nom complet', email: 'Adresse email',
    destination: 'Destination souhaitée', message: 'Décrivez votre voyage...',
    send: 'Envoyer', success: 'Message envoyé avec succès! ✅',
    error: 'Erreur lors de l\'envoi. Veuillez réessayer.',
    errorFields: 'Veuillez remplir tous les champs.'
  },
  ar: {
    home: 'الرئيسية', destinations: 'الوجهات', offers: 'العروض',
    services: 'الخدمات', reviews: 'التقييمات', contact: 'الاتصال',
    search: 'ابحث عن رحلتك', searchBtn: 'بحث', discover: 'اكتشف',
    popular: 'الوجهات الشهيرة', special: 'عروض خاصة',
    why: 'لماذا تختارنا؟', clients: 'آراء العملاء',
    plan: 'خطط رحلتك معنا', descr: 'نرافقك في رحلاتك',
    fullName: 'الاسم الكامل', email: 'البريد الإلكتروني',
    destination: 'الوجهة المطلوبة', message: 'صف رحلتك...',
    send: 'إرسال', success: 'تم إرسال الرسالة بنجاح! ✅',
    error: 'خطأ في الإرسال. يرجى المحاولة مرة أخرى.',
    errorFields: 'يرجى ملء جميع الحقول.'
  },
  en: {
    home: 'Home', destinations: 'Destinations', offers: 'Offers',
    services: 'Services', reviews: 'Reviews', contact: 'Contact',
    search: 'Search Your Trip', searchBtn: 'Search', discover: 'Discover',
    popular: 'Popular Destinations', special: 'Special Offers',
    why: 'Why Choose Us?', clients: 'Client Reviews',
    plan: 'Plan Your Trip With Us', descr: 'We guide you through your travels',
    fullName: 'Full Name', email: 'Email Address',
    destination: 'Desired Destination', message: 'Describe your trip...',
    send: 'Send', success: 'Message sent successfully! ✅',
    error: 'Error sending message. Please try again.',
    errorFields: 'Please fill in all fields.'
  }
};

// 🌍 المتغيرات العامة
let currentLanguage = localStorage.getItem('language') || 'fr';
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// ==================== THEME MANAGEMENT ====================

function initTheme() {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
  updateThemeToggle();
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  localStorage.setItem('darkMode', isDarkMode);
  document.body.classList.toggle('dark-mode');
  updateThemeToggle();
}

function updateThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.innerHTML = isDarkMode 
      ? '☀️ ' + (translations[currentLanguage].lightMode || 'Light Mode')
      : '🌙 ' + (translations[currentLanguage].darkMode || 'Dark Mode');
  }
}

// ==================== LANGUAGE MANAGEMENT ====================

function changeLanguage(lang) {
  if (!translations[lang]) return;
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  updatePageText();
}

function updatePageText() {
  const t = translations[currentLanguage];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
}

// ==================== MOBILE MENU ====================

const menuBtn = document.querySelector('.menu');
const navbar = document.getElementById('navbar');

if (menuBtn && navbar) {
  menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });
  
  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      menuBtn.classList.remove('active');
    });
  });
}

// ==================== SEARCH FORM HANDLER ====================

const searchForm = document.querySelector('.search form');
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const destination = searchForm.querySelector('input[type="text"]').value.trim();
    const startDate = searchForm.querySelectorAll('input[type="date"]')[0].value;
    const endDate = searchForm.querySelectorAll('input[type="date"]')[1].value;
    const travelers = searchForm.querySelector('select').value;
    
    if (!destination || !startDate || !endDate || travelers === 'Voyageurs') {
      showMessage(translations[currentLanguage].errorFields, 'error');
      return;
    }
    
    console.log('🔍 Search:', { destination, startDate, endDate, travelers });
    showMessage(`✅ ${destination} - ${startDate} to ${endDate}`, 'success');
    searchForm.reset();
  });
}

// ==================== CONTACT FORM HANDLER ====================

const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    const formData = {
      name: inputs[0].value.trim(),
      email: inputs[1].value.trim(),
      destination: inputs[2]?.value.trim() || '',
      message: inputs[3].value.trim()
    };
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      showMessage(translations[currentLanguage].errorFields, 'error');
      return;
    }
    
    if (!isValidEmail(formData.email)) {
      showMessage('Email invalide', 'error');
      return;
    }
    
    // Log et confirmation
    console.log('📧 Contact Data:', formData);
    showMessage(translations[currentLanguage].success, 'success');
    contactForm.reset();
  });
}

// ==================== VALIDATION UTILS ====================

function isValidEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

// ==================== MESSAGE DISPLAY ====================

function showMessage(msg, type = 'info') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = msg;
  messageDiv.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(messageDiv);
  setTimeout(() => messageDiv.remove(), 4000);
}

// ==================== SCROLL EFFECTS ====================

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    header.style.boxShadow = window.scrollY > 50 
      ? '0 5px 20px rgba(0,0,0,0.1)' 
      : 'none';
  }
});

// ==================== SCROLL TO TOP BUTTON ====================

const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==================== LAZY LOADING IMAGES ====================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '1';
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[loading="lazy"], .card img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';
    imageObserver.observe(img);
  });
}

// ==================== EVENT LISTENERS SETUP ====================

function setupEventListeners() {
  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.dataset.lang;
      changeLanguage(lang);
    });
  });
  
  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleDarkMode);
  }
}

// ==================== INITIALIZATION ====================

function init() {
  initTheme();
  updatePageText();
  setupEventListeners();
  console.log('🚀 Hdhili\\'s Voyage loaded successfully!');
  console.log('📍 Language:', currentLanguage);
  console.log('🌙 Dark Mode:', isDarkMode);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
