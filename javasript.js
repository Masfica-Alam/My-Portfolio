

// PORTFOLIO WEBSITE - JAVASCRIPT

// Main functionality for interactive features:
// - Theme toggle (dark/light mode)
// - Mobile menu
// - Typing animation
// - Scroll reveal effects
// - Project filtering
// - Contact form validation & submission
// - Charts visualization


// 1. THEME TOGGLE (Dark / Light Mode)

const initThemeToggle = () => {
  const themeButton = document.getElementById('themeToggle');
  
  // Set default theme to dark
  document.documentElement.setAttribute('data-theme', 'dark');
  
  // Toggle between dark and light when button is clicked
  themeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    refreshChartColors(); // Update chart colors based on theme
  });
};


// 2. MOBILE MENU (Toggle on small screens)


const initMobileMenu = () => {
  const hamburgerButton = document.getElementById('hamburgerBtn');
  const mobileMenuElement = document.getElementById('mobileMenu');
  const closeButton = document.getElementById('mobileMenuClose');
  const menuLinks = document.querySelectorAll('.nav-mobile-link');
  
  // Open menu when hamburger is clicked
  hamburgerButton.addEventListener('click', () => {
    mobileMenuElement.classList.add('open');
  });
  
  // Close menu when X button is clicked
  closeButton.addEventListener('click', () => {
    mobileMenuElement.classList.remove('open');
  });
  
  // Close menu when any link is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuElement.classList.remove('open');
    });
  });
};


// 3. TYPING ANIMATION (Hero section)


const initTypingAnimation = () => {
  const roleTitles = [ 'Web Development', 'Artificial Intelligence', 'Data Science', 'Problem Solving'];
  const typingDisplay = document.getElementById('typingText');
  
  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isErasing = false;
  
  const typeCharacter = () => {
    const currentRole = roleTitles[currentRoleIndex];
    
    if (!isErasing) {
      // Typing mode: add one character at a time
      typingDisplay.textContent = currentRole.slice(0, currentCharIndex + 1);
      currentCharIndex++;
      
      if (currentCharIndex === currentRole.length) {
        // Full word typed - pause then start erasing
        isErasing = true;
        setTimeout(typeCharacter, 1800);
        return;
      }
    } else {
      // Erasing mode: remove one character at a time
      typingDisplay.textContent = currentRole.slice(0, currentCharIndex - 1);
      currentCharIndex--;
      
      if (currentCharIndex === 0) {
        // Word fully erased - move to next role
        isErasing = false;
        currentRoleIndex = (currentRoleIndex + 1) % roleTitles.length;
      }
    }
    
    // Typing speed (slower) vs erasing speed (faster)
    const speed = isErasing ? 55 : 95;
    setTimeout(typeCharacter, speed);
  };
  
  typeCharacter();
};


// 4. SCROLL REVEAL ANIMATION


const initScrollReveal = () => {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When element enters viewport, add 'visible' class to trigger CSS animation
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
};


// 5. SKILL BARS ANIMATION


const initSkillBarsAnimation = () => {
  const skillCards = document.querySelectorAll('.skill-card');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get all skill bars in the card
        const skillBars = entry.target.querySelectorAll('.skill-bar__fill');
        
        // Animate each bar to its target width (stored in data-width attribute)
        skillBars.forEach(bar => {
          const targetPercentage = bar.getAttribute('data-width');
          bar.style.width = targetPercentage + '%';
        });
      }
    });
  }, { threshold: 0.3 });
  
  skillCards.forEach(card => {
    skillObserver.observe(card);
  });
};


// 6. PROJECT FILTER BUTTONS


const initProjectFilters = () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.getAttribute('data-filter');
      
      // Update active button styling
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show/hide projects based on selected category
      projectCards.forEach(card => {
        const projectCategory = card.getAttribute('data-category') || '';
        const shouldShow = selectedCategory === 'all' || projectCategory.includes(selectedCategory);
        
        card.style.display = shouldShow ? '' : 'none';
      });
    });
  });
};


// 7. CONTACT FORM VALIDATION & SUBMISSION


const initContactForm = () => {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Get trimmed values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();
    
    // Validate all fields
    const validationErrors = validateContactForm(name, email, subject, message);
    
    // Show error styling on invalid fields
    nameInput.classList.toggle('error', validationErrors.has('name'));
    emailInput.classList.toggle('error', validationErrors.has('email'));
    subjectInput.classList.toggle('error', validationErrors.has('subject'));
    messageInput.classList.toggle('error', validationErrors.has('message'));
    
    // If validation passes, submit form
    if (validationErrors.size === 0) {
      submitContactForm(form);
    }
  });
};

// Validate contact form fields
const validateContactForm = (name, email, subject, message) => {
  const errors = new Set();
  
  if (name.length < 2) errors.add('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.add('email');
  if (subject.length < 3) errors.add('subject');
  if (message.length < 10) errors.add('message');
  
  return errors;
};

// Submit form to Formspree
const submitContactForm = (form) => {
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      showSuccessMessage(form);
    } else {
      alert('Error sending message. Please try again.');
    }
  })
  .catch(error => {
    console.error('Form submission error:', error);
    alert('Error sending message. Please try again.');
  });
};

// Show success message after form submission
const showSuccessMessage = (form) => {
  const successMessage = document.getElementById('formSuccess');
  successMessage.style.display = 'block';
  form.reset();
  
  // Hide message after 5 seconds
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000);
};


// 8. SMOOTH SCROLL FOR ANCHOR LINKS


const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Handle CV download button
  const cvButton = document.getElementById('downloadCV');
  if (cvButton) {
    cvButton.addEventListener('click', (event) => {
      event.preventDefault();
      alert('Link your CV PDF file here to enable the download!');
    });
  }
};


// 9. CHARTS (Chart.js Dashboard)


// Check if dark mode is currently active
const isDarkMode = () => {
  return document.documentElement.getAttribute('data-theme') !== 'light';
};

// Get theme-aware grid color
const getGridColor = () => {
  return isDarkMode() ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)';
};

// Get theme-aware text color
const getTextColor = () => {
  return isDarkMode() ? '#7f8ab0' : '#445080';
};

// Store chart instances for later updates
const chartInstances = {};

// Create and initialize all dashboard charts
const buildCharts = () => {
  const chartColors = {
    purple: '#8b7cf8',
    blue: '#5aacff',
    green: '#36d6a0',
    yellow: 'rgba(251,191,36,0.85)'
  };
  
  // Set default font for all charts
  Chart.defaults.font.family = "'Fira Code', monospace";
  
  // Chart 1: Income vs Expenses (Bar Chart)
  chartInstances.expense = new Chart(
    document.getElementById('expenseChart'),
    {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Income',
            data: [4200, 4800, 5100, 4600, 5500, 5800, 6200, 5900],
            backgroundColor: 'rgba(139,124,248,0.6)',
            borderColor: chartColors.purple,
            borderWidth: 1,
            borderRadius: 5
          },
          {
            label: 'Expenses',
            data: [2800, 3100, 2900, 3300, 2700, 3600, 3200, 3500],
            backgroundColor: 'rgba(90,172,255,0.6)',
            borderColor: chartColors.blue,
            borderWidth: 1,
            borderRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: getTextColor(), font: { size: 11 } }
          }
        },
        scales: {
          x: { grid: { color: getGridColor() }, ticks: { color: getTextColor(), font: { size: 10 } } },
          y: { grid: { color: getGridColor() }, ticks: { color: getTextColor(), font: { size: 10 } } }
        }
      }
    }
  );
  
  // Chart 2: ML Training Accuracy (Line Chart)
  chartInstances.ml = new Chart(
    document.getElementById('mlChart'),
    {
      type: 'line',
      data: {
        labels: ['Ep 1', 'Ep 5', 'Ep 10', 'Ep 15', 'Ep 20', 'Ep 25', 'Ep 30'],
        datasets: [
          {
            label: 'Training Accuracy',
            data: [0.62, 0.74, 0.82, 0.87, 0.91, 0.93, 0.95],
            borderColor: chartColors.green,
            backgroundColor: 'rgba(54,214,160,0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: chartColors.green
          },
          {
            label: 'Validation Accuracy',
            data: [0.58, 0.70, 0.78, 0.83, 0.88, 0.90, 0.94],
            borderColor: chartColors.purple,
            backgroundColor: 'rgba(139,124,248,0.08)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: chartColors.purple
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: getTextColor(), font: { size: 11 } }
          }
        },
        scales: {
          x: { grid: { color: getGridColor() }, ticks: { color: getTextColor(), font: { size: 10 } } },
          y: { min: 0.5, max: 1.0, grid: { color: getGridColor() }, ticks: { color: getTextColor(), font: { size: 10 } } }
        }
      }
    }
  );
  
  // Chart 3: Skills Radar
  chartInstances.radar = new Chart(
    document.getElementById('radarChart'),
    {
      type: 'radar',
      data: {
        labels: ['Python', 'Web Dev', 'ML / AI', 'Database', 'C++', 'Data Viz'],
        datasets: [
          {
            label: 'Proficiency',
            data: [92, 85, 85, 82, 78, 80],
            borderColor: chartColors.purple,
            backgroundColor: 'rgba(139,124,248,0.15)',
            pointBackgroundColor: chartColors.purple,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0,
            max: 100,
            grid: { color: getGridColor() },
            ticks: { display: false },
            pointLabels: { color: getTextColor(), font: { size: 11 } }
          }
        }
      }
    }
  );
  
  // Chart 4: Project Categories (Donut Chart)
  chartInstances.donut = new Chart(
    document.getElementById('donutChart'),
    {
      type: 'doughnut',
      data: {
        labels: ['AI / ML', 'Full-Stack', 'Database', 'Data Analysis'],
        datasets: [
          {
            data: [35, 30, 20, 15],
            backgroundColor: [chartColors.purple, chartColors.blue, chartColors.green, chartColors.yellow],
            borderColor: isDarkMode() ? '#131629' : '#ffffff',
            borderWidth: 3,
            hoverOffset: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: getTextColor(), font: { size: 11 }, padding: 14 }
          }
        },
        cutout: '62%'
      }
    }
  );
};

// Update chart colors when theme changes
const refreshChartColors = () => {
  Object.values(chartInstances).forEach(chart => {
    if (!chart) return;
    
    // Update scales (axes)
    if (chart.options.scales) {
      Object.values(chart.options.scales).forEach(scale => {
        if (scale.grid) scale.grid.color = getGridColor();
        if (scale.ticks) scale.ticks.color = getTextColor();
        if (scale.pointLabels) scale.pointLabels.color = getTextColor();
      });
    }
    
    // Update legend
    if (chart.options.plugins && chart.options.plugins.legend) {
      chart.options.plugins.legend.labels.color = getTextColor();
    }
    
    // Update donut border color
    if (chart.config.type === 'doughnut') {
      chart.data.datasets[0].borderColor = isDarkMode() ? '#131629' : '#ffffff';
    }
    
    chart.update();
  });
};

// Lazy-load charts when dashboard section is visible
const initCharts = () => {
  const dashboardSection = document.getElementById('dashboard');
  
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !chartInstances.expense) {
        // Small delay to let section render first
        setTimeout(buildCharts, 100);
        chartObserver.disconnect(); // Only build once
      }
    });
  }, { threshold: 0.15 });
  
  chartObserver.observe(dashboardSection);
};


// INITIALIZE ALL FEATURES ON PAGE LOAD

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initTypingAnimation();
  initScrollReveal();
  initSkillBarsAnimation();
  initProjectFilters();
  initContactForm();
  initSmoothScroll();
  initCharts();
});


  