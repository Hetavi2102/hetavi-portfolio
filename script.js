/**
 * Hetavi Rampariya - Personal Developer Profile / Dashboard Interactive Scripts
 * Powers animations, particle canvas, terminal simulator, project modals, and resume viewer.
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initScrollSpy();
  initRevealOnScroll();
  initTerminalSimulator();
  initModals();
  initContactForm();
  initMobileNav();
  initBackToTop();
  initCopyTriggers();
  initCardSpotlight();
});

/* ==========================================================================
   1. PARTICLE CANVAS ANIMATION
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 130 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(124, 58, 237, ' : 'rgba(56, 189, 248, ';
      this.alpha = Math.random() * 0.4 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion
      if (mouse.x != null && mouse.y != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  const count = Math.min(Math.floor((width * height) / 16000), 65);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 95) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - dist / 95)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. DEVELOPER TERMINAL SIMULATOR
   ========================================================================== */
function initTerminalSimulator() {
  const activeCmd = document.getElementById('term-active-cmd');
  const activeRes = document.getElementById('term-active-res');
  const copyBtn = document.getElementById('terminal-copy-action');
  const termConsole = document.getElementById('terminal-console');
  const cmdChips = document.querySelectorAll('.cmd-chip');

  const commandMap = {
    whoami: {
      cmd: 'whoami',
      res: 'Hetavi Rampariya — B.Tech in AI & Data Science (KKWIEER Nashik • 8.17 CGPA)'
    },
    stack: {
      cmd: 'cat stack.txt',
      res: 'Python, C++, SQL, JavaScript, Flask, Streamlit, TensorFlow, Scikit-Learn, Pandas, MySQL, MongoDB'
    },
    projects: {
      cmd: 'ls -l ./projects',
      res: '• ContractLens (AI Legal Analyzer)\n• TailorFlow (Smart Tailor Platform)\n• SmartShelf (ML Inventory Forecaster)\n• AI Bill Decoder (OCR Cost Explainer)'
    },
    clear: {
      cmd: 'clear',
      res: 'Terminal reset. Click shortcut chips to query developer profile.'
    }
  };

  cmdChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-cmd');
      const data = commandMap[key];
      if (data && activeCmd && activeRes) {
        activeCmd.textContent = data.cmd;
        activeRes.textContent = data.res;
      }
    });
  });

  if (copyBtn && termConsole) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(termConsole.innerText).then(() => {
        showToast('Terminal content copied to clipboard!');
      }).catch(() => {
        showToast('Copied terminal output.');
      });
    });
  }
}

/* ==========================================================================
   3. SCROLLSPY & STICKY NAVBAR
   ========================================================================== */
function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  const panels = document.querySelectorAll('[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = 'overview';
    panels.forEach(panel => {
      const panelTop = panel.offsetTop - 120;
      const panelHeight = panel.clientHeight;
      if (window.scrollY >= panelTop && window.scrollY < panelTop + panelHeight) {
        current = panel.getAttribute('id');
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
   4. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initRevealOnScroll() {
  const reveals = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay');
        if (delay) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, parseInt(delay, 10));
        } else {
          entry.target.classList.add('revealed');
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -25px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. PROJECT MODALS & RESUME MODAL
   ========================================================================== */
const projectDetails = {
  contractlens: {
    title: "ContractLens (LegalEase) — AI Legal Contract Assistant",
    category: "AI & NLP • Flask",
    date: "Jul 2026 – Present",
    status: "Active Project",
    image: "assets/images/contractlens.png",
    overview: "ContractLens is an intelligent contract analysis platform built to protect businesses and individuals from unfavorable clauses, missing liabilities, and confusing legal terminology without compromising document privacy.",
    architecture: [
      "PDF Ingestion Engine: Extracts text from complex legal contracts using PyMuPDF and OCR fallbacks.",
      "NLP Processing & Chunking: Uses spaCy to tokenize and structure clauses by section and category.",
      "Semantic Search & FAISS: Converts clauses into vector embeddings and indexes them for high-speed similarity search against known risky clause patterns.",
      "LLM Summarizer: Generates clear, plain-language summaries and risk scores (Low, Medium, High, Critical) with actionable advice.",
      "Interactive Dashboard: Built with Python Flask REST backend, dynamic charts, and clean responsive UI."
    ],
    techStack: ["Python", "Flask", "spaCy", "FAISS", "PyMuPDF", "LLM API", "HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/Hetavi2102/ContractLens"
  },
  tailorflow: {
    title: "TailorFlow — Smart Tailor Management Platform",
    category: "Full-Stack • Hybrid DB",
    date: "Jul 2026 – Present",
    status: "Featured Project",
    image: "assets/images/tailorflow.png",
    overview: "TailorFlow is a purpose-built business management system designed to eliminate manual bookkeeping for bespoke tailoring shops. It streamlines customer measurement tracking, fabric records, delivery milestones, and order statuses.",
    architecture: [
      "Hybrid Database Architecture: MySQL handles structured financial, customer, and billing data with ACID guarantees, while MongoDB stores dynamic, custom garment measurement schemas.",
      "RESTful Backend: Modular Python Flask API handling customer management, order lifecycle, invoice generation, and status updates.",
      "Measurement Profiler: Allows flexible measurement inputs tailored to men's, women's, and specialty garments.",
      "Delivery & Notification Engine: Tracks tailoring stages (Cutting, Stitching, Trial, Ready, Delivered) with estimated completion dates."
    ],
    techStack: ["Python", "Flask", "MySQL", "MongoDB", "JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/Hetavi2102/TailorFlow"
  },
  smartshelf: {
    title: "SmartShelf — Inventory Management & Optimization System",
    category: "Machine Learning • Analytics",
    date: "Sep 2025 – Nov 2025",
    status: "Completed",
    image: "assets/images/smartshelf.png",
    overview: "SmartShelf solves stockout and overstock dilemmas in retail warehouses by combining real-time inventory tracking with predictive machine learning models to forecast future product demand accurately.",
    architecture: [
      "Predictive Regressor Model: Utilizes XGBoost and Scikit-learn trained on historical sales patterns, seasonal trends, and supplier lead times to forecast demand.",
      "Data Processing Pipeline: Cleans, normalizes, and aggregates high-frequency inventory data using Pandas and NumPy.",
      "Interactive Streamlit Dashboard: Real-time visual dashboard showcasing inventory levels, low-stock alerts, reorder recommendations, and sales trends.",
      "Reorder Logic: Automatic safety-stock threshold calculation based on predicted volatility."
    ],
    techStack: ["Python", "Streamlit", "XGBoost", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    github: "https://github.com/Hetavi2102/SmartShelf"
  },
  billdecoder: {
    title: "AI Bill Decoder — Automated Invoice Analyzer",
    category: "AI OCR • Computer Vision",
    date: "2026",
    status: "AI Project",
    image: "assets/images/billdecoder.png",
    overview: "AI Bill Decoder simplifies complex utility, hospital, and retail bills by extracting all charges via OCR and using GenAI to explain each line item, flag hidden surcharges, and suggest money-saving tips.",
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

    modalTitle.innerHTML = `<i class="fa-solid fa-layer-group text-purple"></i> ${data.title}`;
    
    modalBody.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:14px;">
        <div style="width:100%; height:190px; border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,0.1);">
          <img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:0.78rem; color:var(--text-dim); font-weight:600;">${data.date}</span>
            <span class="p-status active">${data.status}</span>
          </div>
          <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.55; margin-bottom:14px;">${data.overview}</p>
          
          <h4 style="font-size:0.92rem; font-weight:700; color:#FFFFFF; margin-bottom:6px;"><i class="fa-solid fa-network-wired text-purple"></i> Architecture Highlights:</h4>
          <ul style="margin-left:18px; font-size:0.82rem; color:var(--text-muted); line-height:1.5; margin-bottom:16px;">
            ${data.architecture.map(a => `<li style="margin-bottom:4px;">${a}</li>`).join('')}
          </ul>

          <h4 style="font-size:0.88rem; font-weight:700; color:#FFFFFF; margin-bottom:6px;"><i class="fa-solid fa-code text-cyan"></i> Tech Stack:</h4>
          <div style="display:flex; flex-wrap:wrap; gap:5px; margin-bottom:18px;">
            ${data.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
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
   6. CONTACT FORM & TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Sending...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast("Thank you! Your message has been sent successfully. I'll get back to you shortly.");
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 900);
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
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   7. COPY TO CLIPBOARD
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
   8. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

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

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

/* ==========================================================================
   9. BACK TO TOP
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

/* ==========================================================================
   10. CARD MOUSE SPOTLIGHT EFFECT
   ========================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.glass-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
