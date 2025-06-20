'use strict';

// Configuration and Utilities
const config = {
  selectors: {
    sidebar: '[data-sidebar]',
    sidebarBtn: '[data-sidebar-btn]',
    testimonials: '[data-testimonials-item]',
    modal: {
      container: '[data-modal-container]',
      closeBtn: '[data-modal-close-btn]',
      overlay: '[data-overlay]',
      img: '[data-modal-img]',
      title: '[data-modal-title]',
      text: '[data-modal-text]'
    },
    select: {
      main: '[data-select]',
      items: '[data-select-item]',
      value: '[data-selecct-value]'
    },
    filter: {
      btn: '[data-filter-btn]',
      items: '[data-filter-item]'
    },
    form: {
      main: '[data-form]',
      inputs: '[data-form-input]',
      btn: '[data-form-btn]'
    },
    nav: {
      links: '[data-nav-link]',
      pages: '[data-page]'
    },
    themeBtn: '[data-theme-btn]'
  }
};

// Helper Functions
const elementToggleFunc = function (elem) {
  elem.classList.toggle('active');
};

// DOM Elements
const elements = {
  sidebar: document.querySelector(config.selectors.sidebar),
  sidebarBtn: document.querySelector(config.selectors.sidebarBtn),
  testimonialsItems: document.querySelectorAll(config.selectors.testimonials),
  modal: {
    container: document.querySelector(config.selectors.modal.container),
    closeBtn: document.querySelector(config.selectors.modal.closeBtn),
    overlay: document.querySelector(config.selectors.modal.overlay),
    img: document.querySelector(config.selectors.modal.img),
    title: document.querySelector(config.selectors.modal.title),
    text: document.querySelector(config.selectors.modal.text)
  },
  select: {
    main: document.querySelector(config.selectors.select.main),
    items: document.querySelectorAll(config.selectors.select.items),
    value: document.querySelector(config.selectors.select.value)
  },
  filter: {
    btn: document.querySelectorAll(config.selectors.filter.btn),
    items: document.querySelectorAll(config.selectors.filter.items)
  },
  form: {
    main: document.querySelector(config.selectors.form.main),
    inputs: document.querySelectorAll(config.selectors.form.inputs),
    btn: document.querySelector(config.selectors.form.btn)
  },
  nav: {
    links: document.querySelectorAll(config.selectors.nav.links),
    pages: document.querySelectorAll(config.selectors.nav.pages)
  },
  themeBtn: document.querySelector(config.selectors.themeBtn)
};

// Sidebar Functionality
const initSidebar = () => {
  elements.sidebarBtn.addEventListener('click', () => elementToggleFunc(elements.sidebar));
};

// Testimonials Modal Functionality
const initTestimonialsModal = () => {
  const toggleModal = () => {
    elements.modal.container.classList.toggle('active');
    elements.modal.overlay.classList.toggle('active');
  };

  elements.testimonialsItems.forEach(item => {
    item.addEventListener('click', () => {
      const avatar = item.querySelector('[data-testimonials-avatar]');
      elements.modal.img.src = avatar.src;
      elements.modal.img.alt = avatar.alt;
      elements.modal.title.innerHTML = item.querySelector('[data-testimonials-title]').innerHTML;
      elements.modal.text.innerHTML = item.querySelector('[data-testimonials-text]').innerHTML;
      toggleModal();
    });
  });

  elements.modal.closeBtn.addEventListener('click', toggleModal);
  elements.modal.overlay.addEventListener('click', toggleModal);
};

// Portfolio Filter Functionality
const initPortfolioFilter = () => {
  const filterFunc = function (selectedValue) {

    for (let i = 0; i < elements.filter.items.length; i++) {

      if (selectedValue === 'all') {
        elements.filter.items[i].classList.add('active');
      } else if (selectedValue === elements.filter.items[i].dataset.category) {
        elements.filter.items[i].classList.add('active');
      } else {
        elements.filter.items[i].classList.remove('active');
      }

    }

  };

  elements.select.main.addEventListener('click', function () { elementToggleFunc(this); });

  // add event in all select items
  for (let i = 0; i < elements.select.items.length; i++) {
    elements.select.items[i].addEventListener('click', function () {

      let selectedValue = this.innerText.toLowerCase();
      elements.select.value.innerText = this.innerText;
      elementToggleFunc(elements.select.main);
      filterFunc(selectedValue);

    });
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = elements.filter.btn[0];

  for (let i = 0; i < elements.filter.btn.length; i++) {

    elements.filter.btn[i].addEventListener('click', function () {

      let selectedValue = this.innerText.toLowerCase();
      elements.select.value.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove('active');
      this.classList.add('active');
      lastClickedBtn = this;

    });

  }
};

// Form Validation
const initFormValidation = () => {
  // add event to all form input field
  for (let i = 0; i < elements.form.inputs.length; i++) {
    elements.form.inputs[i].addEventListener('input', function () {

      // check form validation
      if (elements.form.main.checkValidity()) {
        elements.form.btn.removeAttribute('disabled');
      } else {
        elements.form.btn.setAttribute('disabled', '');
      }

    });
  }
};

// Page Navigation
const initPageNavigation = () => {
  // add event to all nav link
  for (let i = 0; i < elements.nav.links.length; i++) {
    elements.nav.links[i].addEventListener('click', function () {

      for (let i = 0; i < elements.nav.pages.length; i++) {
        if (this.innerHTML.toLowerCase() === elements.nav.pages[i].dataset.page) {
          elements.nav.pages[i].classList.add('active');
          elements.nav.links[i].classList.add('active');
          window.scrollTo(0, 0);
        } else {
          elements.nav.pages[i].classList.remove('active');
          elements.nav.links[i].classList.remove('active');
        }
      }

    });
  }
};

// Theme Switching Functionality
const initThemeSwitching = () => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Theme toggle handler
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Add theme toggle event listener
  elements.themeBtn.addEventListener('click', toggleTheme);
};

// Initialize Application
const initApp = () => {
  initSidebar();
  initTestimonialsModal();
  initPortfolioFilter();
  initFormValidation();
  initPageNavigation();
  initThemeSwitching();
};

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
