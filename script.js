/**
 * Hetavi Rampariya - Developer Portfolio
 * Features Client-Side Router, View Transitions, Modals, and Interactive Actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initModals();
  initContactForm();
  initMobileNav();
  initBackToTop();
  initCopyTriggers();
});

/* ==========================================================================
   1. CLIENT-SIDE SPA ROUTER
   ========================================================================== */
function initRouter() {
  const routes = ['home', 'about', 'education', 'skills', 'projects', 'certifications', 'activities', 'contact'];
  const views = document.querySelectorAll('.portfolio-view');
  const navLinks = document.querySelectorAll('.nav-link');

  function getRouteFromHash() {
    let hash = window.location.hash.replace('#/', '').replace('#', '').trim();
    if (!hash || !routes.includes(hash)) {
      hash = 'home';
    }
    return hash;
  }

  function navigateTo(routeName, updateHistory = true) {
    if (!routes.includes(routeName)) {
      routeName = 'home';
    }

    // 1. Hide all views & show target view
    views.forEach(view => {
      view.classList.remove('active-view');
    });

    const targetView = document.getElementById(`view-${routeName}`);
    if (targetView) {
      targetView.classList.add('active-view');
    }

    // 2. Update active link in navbar
    navLinks.forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      if (linkRoute === routeName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // 3. Update window hash & history
    if (updateHistory) {
      window.location.hash = `#/${routeName}`;
    }

    // 4. Reset scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 5. Close mobile navigation menu if open
    const navMenu = document.getElementById('nav-menu');
    const toggleBtn = document.getElementById('mobile-toggle');
    if (navMenu && navMenu.classList.contains('mobile-active')) {
      navMenu.classList.remove('mobile-active');
      if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    }
  }

  // Intercept all router-link clicks (Navbar, Hero buttons, Bottom Explore cards, Footer)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.router-link');
    if (link) {
      const route = link.getAttribute('data-route');
      if (route) {
        e.preventDefault();
        navigateTo(route, true);
      }
    }
  });

  // Handle browser Back & Forward navigation
  window.addEventListener('hashchange', () => {
    const currentRoute = getRouteFromHash();
    navigateTo(currentRoute, false);
  });

  // Initial Route Resolution on load
  const initialRoute = getRouteFromHash();
  navigateTo(initialRoute, false);
}

/* ==========================================================================
   2. MODAL SYSTEMS: ATS RESUME & PROJECT DEEP DIVE
   ========================================================================== */
const projectDetails = {
  tailorflow: {
    title: "TailorFlow — Full-Stack Smart Tailor Management System",
    category: "Full-Stack • Hybrid DB",
    date: "Jul 2026 – Present",
    status: "Featured Project",
    image: "assets/images/tailorflow.png",
    overview: "TailorFlow is a bespoke tailor management system designed to eliminate manual bookkeeping by coordinating structured business data and dynamic order-tracking.",
    architecture: [
      "Developing a Flask backend that handles customer management, order tracking, and measurement records through structured CRUD operations.",
      "Integrating a hybrid database layer using MySQL for core structured business data (customers, orders) and MongoDB for dynamic order-tracking and activity logs.",
      "Coordinating MySQL and MongoDB through a unified Flask backend to streamline tailoring operations, keeping relational business data and document-based tracking data in sync across the application."
    ],
    techStack: ["Python", "Flask", "MySQL", "MongoDB", "HTML", "CSS", "JavaScript", "Git", "GitHub"],
    github: "https://github.com/Hetavi2102/TailorFlow"
  },
  contractlens: {
    title: "ContractLens — Privacy-Safe AI for Detecting High-Risk Clauses",
    category: "AI & NLP • Flask",
    date: "Jul 2026 – Present",
    status: "Active Project",
    image: "assets/images/contractlens.png",
    overview: "ContractLens is an AI-powered legal contract assistant that protects parties by automating risk analysis, summarization, and clause extraction without compromising privacy.",
    architecture: [
      "Developing an AI-powered Flask application that automates legal contract analysis using Natural Language Processing (NLP), Retrieval-Augmented Generation (RAG), and Large Language Models (LLMs).",
      "Building clause-level analysis features including clause extraction, contract summarization, and risk classification to help identify high-risk terms in agreements.",
      "Implementing semantic search over contract text using FAISS embeddings, alongside secure PDF processing with PyMuPDF for reliable text extraction from legal documents."
    ],
    techStack: ["Python", "Flask", "HTML", "CSS", "JavaScript", "PyMuPDF", "spaCy", "FAISS", "LLM API", "Git"],
    github: "https://github.com/Hetavi2102/ContractLens"
  },
  smartshelf: {
    title: "SmartShelf — Inventory Management & Optimization System",
    category: "Machine Learning • Analytics",
    date: "Sep 2025 – Nov 2025",
    status: "Completed",
    image: "assets/images/smartshelf.png",
    overview: "SmartShelf solves stockout dilemmas by combining real-time inventory tracking with predictive machine learning demand forecasting.",
    architecture: [
      "Developed an inventory management system that tracks and optimizes stock levels using machine learning.",
      "Designed an interactive Streamlit dashboard to monitor inventory levels and provide real-time inventory insights.",
      "Implemented a demand forecasting model using the XGBoost algorithm to improve inventory stock optimization."
    ],
    techStack: ["Python", "Streamlit", "XGBoost", "Pandas", "NumPy", "Scikit-learn"],
    github: "https://github.com/Hetavi2102/SmartShelf"
  },
  billdecoder: {
    title: "AI Bill Decoder — Automated Invoice Analyzer",
    category: "AI OCR • Computer Vision",
    date: "2026",
    status: "AI Project",
    image: "assets/images/billdecoder.png",
    overview: "AI Bill Decoder simplifies complex utility and retail bills by extracting charges via OCR and using GenAI to explain each line item and flag hidden surcharges.",
    architecture: [
      "OCR Extraction Layer: Processes bill scans and photos using OpenCV pre-processing and Tesseract OCR.",
      "Entity Recognition: Identifies vendor names, invoice dates, line items, taxes, fees, and grand totals.",
      "AI Explanation Module: Interfaces with LLM APIs to translate cryptic billing codes into simple English.",
      "Cost Breakdown & Insights: Generates visual breakdown charts showing where money is spent."
    ],
    techStack: ["Python", "Flask", "OpenCV", "Tesseract OCR", "LLM API", "Tailwind/CSS", "JavaScript"],
    github: "https://github.com/Hetavi2102/AI-Bill-Decoder"
  }
};

function initModals() {
  // Resume Modal
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    if (resumeModal) resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (resumeModal) {
    resumeModal.querySelector('.modal-overlay').addEventListener('click', closeResume);
  }

  // Project Modal
  const projectModal = document.getElementById('project-modal');
  const closeProjectBtn = document.getElementById('close-project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalBody = document.getElementById('modal-project-body');
  const projectBtns = document.querySelectorAll('.project-modal-btn');

  function openProject(key) {
    const data = projectDetails[key];
    if (!data || !projectModal) return;

    modalTitle.innerHTML = `<i class="fa-solid fa-cubes text-purple"></i> ${data.title}`;
    
    modalBody.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:14px;">
        <div style="width:100%; height:190px; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.08);">
          <img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:0.78rem; color:var(--text-dim); font-weight:600;">${data.date}</span>
            <span class="project-status active">${data.status}</span>
          </div>
          <p style="font-size:0.86rem; color:var(--text-muted); line-height:1.55; margin-bottom:12px;">${data.overview}</p>
          
          <h4 style="font-size:0.9rem; font-weight:700; color:#FFFFFF; margin-bottom:6px;"><i class="fa-solid fa-layer-group text-purple"></i> Key Architecture:</h4>
          <ul style="margin-left:16px; font-size:0.82rem; color:var(--text-muted); line-height:1.5; margin-bottom:14px;">
            ${data.architecture.map(a => `<li style="margin-bottom:4px;">${a}</li>`).join('')}
          </ul>

          <h4 style="font-size:0.86rem; font-weight:700; color:#FFFFFF; margin-bottom:6px;"><i class="fa-solid fa-code text-cyan"></i> Tech Stack:</h4>
          <div style="display:flex; flex-wrap:wrap; gap:5px; margin-bottom:18px;">
            ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>

          <div style="display:flex; justify-content:flex-end;">
            <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
              <i class="fa-brands fa-github"></i> View GitHub Repository
            </a>
          </div>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProject() {
    if (projectModal) projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      openProject(key);
    });
  });

  if (closeProjectBtn) closeProjectBtn.addEventListener('click', closeProject);
  if (projectModal) {
    projectModal.querySelector('.modal-overlay').addEventListener('click', closeProject);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResume();
      closeProject();
    }
  });
}

/* ==========================================================================
   3. CONTACT FORM & TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast("Thank you! Your message has been sent successfully.");
      form.reset();
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
    }, 700);
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

/* ==========================================================================
   4. COPY TO CLIPBOARD
   ========================================================================== */
function initCopyTriggers() {
  const copyTriggers = document.querySelectorAll('.copy-trigger');

  copyTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = trigger.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast(`Copied: ${textToCopy}`);
        });
      }
    });
  });
}

/* ==========================================================================
   5. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-active');
    const icon = toggleBtn.querySelector('i');
    if (navMenu.classList.contains('mobile-active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });
}

/* ==========================================================================
   6. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
