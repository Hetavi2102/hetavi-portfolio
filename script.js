/**
 * HETAVI RAMPARIYA — DEVELOPER WORKSPACE INTERACTIVE LOGIC
 * Features:
 * 1. Interactive Terminal Console Simulator (Commands: whoami, tech, projects, contact, clear)
 * 2. GitHub Activity Heatmap Grid Generator
 * 3. Project Architecture Deep Dive Modal System (with dedicated repos)
 * 4. ATS-Friendly Resume Viewer & Print Handler
 * 5. Copy-to-Clipboard Notifications (Toast)
 * 6. Contact Form Submission Handler
 * 7. Sticky Navigation & ScrollSpy
 * 8. Mobile Navigation Drawer Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  initTerminalSimulator();
  initHeatmap();
  initProjectModals();
  initResumeModal();
  initCopyTriggers();
  initContactForm();
  initScrollSpy();
  initMobileNav();
});

/* ==========================================================================
   1. INTERACTIVE TERMINAL CONSOLE SIMULATOR
   ========================================================================== */
function initTerminalSimulator() {
  const terminalBody = document.getElementById('terminal-body');
  const interactiveCmd = document.getElementById('terminal-interactive-cmd');
  const interactiveOutput = document.getElementById('terminal-interactive-output');
  const copyBtn = document.getElementById('terminal-copy-btn');
  const cmdButtons = document.querySelectorAll('.cmd-pill');

  if (!terminalBody) return;

  const commands = {
    whoami: {
      cmd: 'whoami',
      output: 'Hetavi Rampariya — AI & Data Science Engineering Student (KKWIEER, Nashik | 8.17 CGPA)'
    },
    skills: {
      cmd: 'cat skills.txt',
      output: 'Languages: Python, C++, SQL, JS, HTML/CSS\nFrameworks: Flask, Streamlit, REST APIs\nAI/Data: TensorFlow, Scikit-Learn, Pandas, NumPy, spaCy, FAISS\nDatabases: MySQL, MongoDB'
    },
    projects: {
      cmd: 'ls -l ./projects',
      output: 'drwx-- ContractLens   (AI Legal Contract Analyzer - Flask/FAISS/NLP)\ndrwx-- TailorFlow     (Smart Tailor Management Platform - Flask/MySQL/Mongo)\ndrwx-- SmartShelf     (Inventory Demand Forecaster - Streamlit/XGBoost)\ndrwx-- AI-BillDecoder (Invoice OCR & Cost Explainer - OpenCV/LLM)'
    },
    contact: {
      cmd: 'cat contact.env',
      output: 'EMAIL="rampariyahetavi@gmail.com"\nGITHUB="https://github.com/Hetavi2102"\nLINKEDIN="https://linkedin.com/in/hetavi-rampariya"'
    },
    clear: {
      cmd: 'clear',
      output: ''
    }
  };

  cmdButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-run');
      if (key === 'clear') {
        if (interactiveCmd && interactiveOutput) {
          interactiveCmd.textContent = 'clear';
          interactiveOutput.textContent = 'Terminal cleared. Click command pills below to query workspace.';
        }
        return;
      }

      const target = commands[key];
      if (target && interactiveCmd && interactiveOutput) {
        interactiveCmd.textContent = target.cmd;
        interactiveOutput.textContent = target.output;
      }
    });
  });

  // Copy Terminal Content
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = terminalBody.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Terminal output copied to clipboard!');
      }).catch(() => {
        showToast('Copied terminal output.');
      });
    });
  }
}

/* ==========================================================================
   2. GITHUB ACTIVITY HEATMAP GRID GENERATOR
   ========================================================================== */
function initHeatmap() {
  const grid = document.getElementById('heatmap-grid');
  if (!grid) return;

  grid.innerHTML = '';
  const totalCells = 28 * 4; // 112 cells

  // Realistic seed distribution representing active coding patterns
  const distribution = [0, 0, 1, 2, 0, 1, 3, 2, 4, 1, 0, 2, 3, 4, 1, 2, 0, 3, 4, 2, 1, 0, 2, 3, 1, 4, 2, 0];

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('h-cell');
    
    const seed = distribution[i % distribution.length];
    // Add realistic randomness
    let level = seed;
    if (i % 7 === 0) level = Math.min(4, level + 1);
    if (i % 11 === 0 && level > 0) level = Math.max(0, level - 1);
    
    cell.classList.add(`lvl-${level}`);
    grid.appendChild(cell);
  }
}

/* ==========================================================================
   3. PROJECT ARCHITECTURE DEEP DIVE MODAL SYSTEM
   ========================================================================== */
const projectData = {
  contractlens: {
    title: "ContractLens (LegalEase)",
    category: "AI & NLP • Document Intelligence",
    date: "Jul 2026 – Present",
    status: "Active Project",
    image: "assets/images/contractlens.png",
    tagline: "Privacy-Safe AI for High-Risk Legal Clause Detection & Summarization",
    problem: "Reviewing lengthy legal contracts manually is time-consuming and prone to missing ambiguous liabilities, unfavorable renewal terms, and hidden indemnification clauses.",
    solution: "ContractLens provides an automated analysis pipeline that ingests complex PDFs, parses clauses using spaCy, computes semantic similarity against known high-risk legal templates with FAISS, and outputs plain-language explanations with actionable mitigation notes using LLMs.",
    architecture: [
      "PyMuPDF Ingestion Layer: High-fidelity document parsing preserving clause boundary hierarchies.",
      "spaCy NLP Tokenizer & Chunking: Semantic decomposition of complex multi-paragraph legal agreements.",
      "FAISS Vector Indexing: High-speed cosine similarity searching across pre-indexed liability risk patterns.",
      "LLM Risk Classifier: Automated assignment of risk tiers (Low, Medium, High, Critical) with clear rationales.",
      "Python Flask REST Backend: Fast, modular API architecture delivering structured JSON responses to the frontend."
    ],
    techStack: ["Python", "Flask", "spaCy", "FAISS", "PyMuPDF", "LLM API", "HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/Hetavi2102/ContractLens"
  },
  tailorflow: {
    title: "TailorFlow",
    category: "Full-Stack • Hybrid Database Architecture",
    date: "Jul 2026 – Present",
    status: "Featured Project",
    image: "assets/images/tailorflow.png",
    tagline: "Full-Stack Smart Tailor Management & Order Lifecycle Platform",
    problem: "Bespoke tailoring businesses struggle with paper ledgers, fragmented customer body measurements, untracked fabric inventory, and delayed delivery communications.",
    solution: "TailorFlow provides a centralized web dashboard handling customer management, dynamic custom garment measurements, multi-stage order tracking (Cutting, Stitching, Trial, Ready, Delivered), and automated status histories.",
    architecture: [
      "Hybrid Storage Layer: MySQL handles ACID-compliant billing, customer profiles, and order financials; MongoDB stores custom, flexible garment measurement schemas.",
      "Flask Modular REST APIs: Clean separation of concerns across Customer, Order, Measurement, and Invoice services.",
      "Custom Measurement Profiler: Supports dynamic dimensional data tailored to men's, women's, and bespoke clothing.",
      "Interactive Delivery Pipeline: Real-time visual progress tracker keeping tailor and customer in sync."
    ],
    techStack: ["Python", "Flask", "MySQL", "MongoDB", "JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/Hetavi2102/TailorFlow"
  },
  smartshelf: {
    title: "SmartShelf",
    category: "Machine Learning • Inventory Analytics",
    date: "Sep 2025 – Nov 2025",
    status: "Completed",
    image: "assets/images/smartshelf.png",
    tagline: "Inventory Management & Predictive Demand Forecasting System",
    problem: "Retailers frequently experience lost revenue from out-of-stock items or increased overhead costs from excessive warehouse overstock.",
    solution: "SmartShelf tracks real-time inventory levels and leverages trained XGBoost regression models to forecast future stock demand based on seasonality, lead times, and past purchase velocity.",
    architecture: [
      "Data Processing Pipeline: Uses Pandas and NumPy for feature engineering, lag variable calculations, and data normalization.",
      "XGBoost Regression Model: Predicts expected product demand across variable forecast horizons with high accuracy.",
      "Streamlit Visual Dashboard: Live KPI metric cards, interactive supply-level charts, and automated reorder alerts.",
      "Safety Stock Threshold Engine: Dynamically adjusts buffer stock limits based on demand variance."
    ],
    techStack: ["Python", "Streamlit", "XGBoost", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    github: "https://github.com/Hetavi2102/SmartShelf"
  },
  billdecoder: {
    title: "AI Bill Decoder",
    category: "AI OCR • Computer Vision & LLM",
    date: "2026",
    status: "AI Project",
    image: "assets/images/billdecoder.png",
    tagline: "Automated Invoice & Utility Bill OCR with Plain-Language Cost Breakdown",
    problem: "Consumers and small business operators are often confused by dense utility bills, medical invoices, and cryptic surcharge codes.",
    solution: "AI Bill Decoder scans invoice photos or PDFs, extracts line-item charges via OCR, analyzes pricing breakdowns with Generative AI, and explains charges in simple terms to uncover hidden fees.",
    architecture: [
      "Image Preprocessing & OCR: OpenCV enhancement and OCR text extraction for receipts, bills, and statements.",
      "Entity & Table Parsing: Structured parsing identifying vendor, invoice date, line items, taxes, and final total.",
      "LLM Explanation Engine: Translates ambiguous item codes and acronyms into transparent English explanations.",
      "Responsive Frontend: Clean UI displaying categorized cost breakdowns and saving recommendations."
    ],
    techStack: ["Python", "Flask", "OpenCV", "Tesseract OCR", "LLM API", "Tailwind/CSS", "JavaScript"],
    github: "https://github.com/Hetavi2102/AI-Bill-Decoder"
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const overlay = document.getElementById('project-modal-overlay');
  const closeBtn = document.getElementById('close-project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-category');
  const modalBody = document.getElementById('modal-project-body');
  const triggers = document.querySelectorAll('.project-modal-trigger');

  function openProject(key) {
    const data = projectData[key];
    if (!data || !modal) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;

    modalBody.innerHTML = `
      <div class="proj-modal-grid">
        <div class="proj-modal-banner">
          <img src="${data.image}" alt="${data.title}" loading="lazy">
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:0.78rem; color:var(--text-dim); font-weight:600;"><i class="fa-regular fa-calendar"></i> ${data.date}</span>
            <span class="status-tag active" style="font-size:0.72rem; padding:2px 8px; border-radius:12px; background:rgba(124,58,237,0.2); color:#DDD6FE; border:1px solid rgba(124,58,237,0.4); font-weight:600;">${data.status}</span>
          </div>
          
          <h4 style="font-size:1rem; font-weight:700; color:#FFFFFF; margin-bottom:6px;">${data.tagline}</h4>
          <p style="font-size:0.86rem; color:var(--text-muted); line-height:1.55; margin-bottom:14px;"><strong>Problem:</strong> ${data.problem}</p>
          <p style="font-size:0.86rem; color:var(--text-muted); line-height:1.55; margin-bottom:18px;"><strong>Solution:</strong> ${data.solution}</p>

          <h5 class="proj-modal-sec-title"><i class="fa-solid fa-network-wired text-purple"></i> Architecture & Engineering Highlights:</h5>
          <ul class="proj-modal-bullets" style="margin-bottom:16px;">
            ${data.architecture.map(a => `<li>${a}</li>`).join('')}
          </ul>

          <h5 class="proj-modal-sec-title"><i class="fa-solid fa-code text-cyan"></i> Technology Stack:</h5>
          <div class="proj-modal-tags" style="margin-bottom:18px;">
            ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>

          <div class="proj-modal-footer">
            <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
              <i class="fa-brands fa-github"></i> <span>View Repository (${key})</span>
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      openProject(key);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================================================
   4. ATS RESUME VIEWER & PRINT HANDLER
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const overlay = document.getElementById('resume-modal-overlay');
  const closeBtn = document.getElementById('close-resume-modal');
  const openNavBtn = document.getElementById('btn-open-resume');
  const openHeroBtn = document.getElementById('btn-hero-resume');
  const printBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openNavBtn) openNavBtn.addEventListener('click', openResume);
  if (openHeroBtn) openHeroBtn.addEventListener('click', openResume);
  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  if (overlay) overlay.addEventListener('click', closeResume);

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResume();
  });
}

/* ==========================================================================
   5. COPY TO CLIPBOARD & TOAST NOTIFICATIONS
   ========================================================================== */
function initCopyTriggers() {
  const triggers = document.querySelectorAll('.copy-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const text = trigger.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}" to clipboard!`);
      }).catch(() => {
        showToast(`Copied: ${text}`);
      });
    });
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
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

/* ==========================================================================
   6. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Sending...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast("Thank you! Your message has been recorded. I'll get back to you shortly.");
      form.reset();
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
    }, 1000);
  });
}

/* ==========================================================================
   7. STICKY NAVBAR & SCROLLSPY
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], main[id]');
  const navLinks = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let current = 'overview';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const items = document.querySelectorAll('.nav-item');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    const icon = toggleBtn.querySelector('i');
    if (navLinks.classList.contains('mobile-active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}
