// Dark mode handling
function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const darkModeToggleMobile = document.getElementById("darkModeToggleMobile");
  const html = document.documentElement;

  // Helper to update sun/moon icon visibility for both toggles
  function updateIcons(isDark) {
    [darkModeToggle, darkModeToggleMobile].forEach((toggle) => {
      if (!toggle) return;
      const sunIcon = toggle.querySelector(".fa-sun");
      const moonIcon = toggle.querySelector(".fa-moon");
      // Show sun icon in light mode (to indicate it is light)
      if (sunIcon) sunIcon.classList.toggle("hidden", isDark);
      // Show moon icon in dark mode (to indicate it is dark)
      if (moonIcon) moonIcon.classList.toggle("hidden", !isDark);
    });
  }

  // Helper to update toggle button UI for both toggles
  function updateToggleUI(isDark) {
    [darkModeToggle, darkModeToggleMobile].forEach((toggle) => {
      if (!toggle) return;
      toggle.classList.toggle("dark-mode-on", isDark);
      toggle.style.backgroundColor = isDark ? "#3b82f6" : "#f3f4f6";
      const toggleThumb = toggle.querySelector(".toggle-thumb");
      if (toggleThumb) {
        toggleThumb.style.transform = isDark
          ? "translateX(1.5rem)"
          : "translateX(0.25rem)";
      }
    });
    updateIcons(isDark);
  }

  // Check for saved dark mode preference
  let isDark = false;
  if (
    localStorage.getItem("darkMode") === "true" ||
    !localStorage.getItem("darkMode") // Default to dark mode if no preference
  ) {
    html.classList.add("dark");
    isDark = true;
  } else {
    html.classList.remove("dark");
    isDark = false;
  }
  updateToggleUI(isDark);

  // Add event listeners to both toggles
  [darkModeToggle, darkModeToggleMobile].forEach((toggle) => {
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const isDarkNow = html.classList.contains("dark");
      html.classList.toggle("dark");
      const newIsDark = !isDarkNow;
      localStorage.setItem("darkMode", newIsDark);
      updateToggleUI(newIsDark);
    });
  });
}

// Dynamic Tagline
function initTaglineAnimation() {
  const taglines = [
    "Systems Software Engineer",
    "C++ & Python Developer",
    "Linux Systems Expert",
    "Open-source Enthusiast",
  ];
  const taglineElement = document.getElementById("tagline");

  let currentTaglineIndex = 0;
  setInterval(() => {
    currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
    taglineElement.style.opacity = "0";
    setTimeout(() => {
      taglineElement.textContent = taglines[currentTaglineIndex];
      taglineElement.style.opacity = "1";
    }, 500);
  }, 3000);
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const hamburgerIcon = mobileMenuButton.querySelector(".hamburger-icon");

  function openMenu() {
    mobileMenu.classList.remove("hidden");
    mobileMenuBackdrop.classList.remove("hidden");
    // Small delay to allow display change before animation
    requestAnimationFrame(() => {
      mobileMenu.classList.add("active");
      mobileMenuBackdrop.classList.add("active");
      hamburgerIcon.classList.add("active");
    });
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.remove("active");
    mobileMenuBackdrop.classList.remove("active");
    hamburgerIcon.classList.remove("active");
    document.body.style.overflow = "";
    // Hide after animation completes
    setTimeout(() => {
      if (!mobileMenu.classList.contains("active")) {
        mobileMenu.classList.add("hidden");
        mobileMenuBackdrop.classList.add("hidden");
      }
    }, 300);
  }

  // Toggle menu on hamburger click
  mobileMenuButton.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on X button
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMenu);
  }

  // Close on backdrop click
  mobileMenuBackdrop.addEventListener("click", closeMenu);

  // Close on link click
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  });
}

// Form handling
function initContactForm() {
  const contactForm = document.querySelector("#contact form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Add loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
      contactForm.reset();

      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 2000);
    }, 1500);
  });
}

// Go Up Button functionality
function initGoUpButton() {
  const goUpBtn = document.getElementById("go-up-btn");

  // Show button when user scrolls down 500px
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      goUpBtn.classList.remove("scale-0");
      goUpBtn.classList.add("scale-100");
    } else {
      goUpBtn.classList.remove("scale-100");
      goUpBtn.classList.add("scale-0");
    }
  });

  // Smooth scroll to top when button is clicked
  goUpBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Project modal functionality
const projectDetails = {
  "foodrescue-connect": {
    title: "FoodRescue Connect",
    description:
      "Developed a web application to connect food providers with recipients, manage food listings, and ensure food safety through claim and expiry logic. Features robust user management, including admin controls and suspension logic.",
    technologies: ["Flask", "SQLAlchemy", "HTML/CSS/Boostrap/JS"],
    github: "https://github.com/vkakorsu/foodrescue-connect",
    demo: "https://foodrescue-connect.com",
    images: [
      "assets/images/project_images/foodrescue_connect/foodrescue_provider.png",
      "assets/images/project_images/foodrescue_connect/foodrescue_recipient.png",
    ],
    achievements: [
      "Implemented secure user authentication and admin controls",
      "Automated food expiry and claim management for safety",
      "Real-time dashboard for providers, recipients, and admins",
      "User-friendly activity log with advanced filtering and search",
      "Suspension logic to prevent access for suspended users",
    ],
  },
  "tbss": {
    title: "Torchbearers Books & Stationery Services (TBSS)",
    description:
      "Full-stack Django web app for a Ghanaian bookshop featuring catalog browsing, staff picks, search suggestions, accounts/auth, cart and order flows, and production deployment via Gunicorn and Docker.",
    technologies: ["Django", "Redis", "Celery", "Whitenoise", "Docker"],
    github: "#",
    demo: "#",
    images: ["assets/images/project_images/tbss/tbss_homepage.png"],
    achievements: [
      "Responsive storefront UI (catalog, staff picks, about)",
      "Search with suggestions for books/authors/tags",
      "Auth & account flows via django-allauth",
      "Background task processing with Celery + Redis",
      "Containerized deployment with Gunicorn",
    ],
  },
  "memory-allocator": {
    title: "Custom Memory Allocator",
    description:
      "High-performance memory allocator implemented in C++ with focus on minimal fragmentation and thread safety.",
    technologies: ["C++", "Systems", "Performance"],
    github: "https://github.com/vkakorsu/memory-allocator",
    demo: "#",
    images: [
      "assets/images/memory-allocator-1.jpg",
      "assets/images/memory-allocator-2.jpg",
    ],
    achievements: [
      "Reduced memory fragmentation by 80%",
      "Improved allocation speed by 50%",
      "Thread-safe implementation",
    ],
  },
};

// Enhance openProjectModal with neobrutalist styling
function openProjectModal(projectKey) {
  const details = projectDetails[projectKey];
  const modal = document.getElementById("projectModal");
  const modalContent = modal.querySelector(".relative");
  const content = document.getElementById("modalContentInner");

  if (!modal || !modalContent || !content) {
    console.error("Modal elements not found");
    return;
  }

  const project = projectDetails[projectKey];
  if (!project) {
    console.error("Project not found:", projectKey);
    return;
  }

  // Color assignments for tech tags
  const tagColors = ['neo-tag-blue', 'neo-tag-pink', 'neo-tag-green', 'neo-tag-orange', 'neo-tag-purple', ''];

  // Generate neobrutalist modal content
  content.innerHTML = `
    <div class="space-y-6">
      <!-- Header -->
      <div class="border-b-4 border-black dark:border-[#FFFEF0] pb-4">
        <h3 class="text-2xl md:text-3xl font-black uppercase mb-2">${project.title}</h3>
        <p class="text-sm md:text-base">${project.description}</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Column: Details -->
        <div class="space-y-6">
          <!-- Technologies -->
          <div>
            <h4 class="text-sm font-bold uppercase mb-3 inline-block border-b-2 border-[#FFE600]">Tech Stack</h4>
            <div class="flex flex-wrap gap-2 mt-2">
              ${project.technologies
      .map((tech, i) => `
                <span class="neo-tag ${tagColors[i % tagColors.length]} px-3 py-1">${tech}</span>
              `)
      .join("")}
            </div>
          </div>
          
          <!-- Links -->
          <div class="flex flex-wrap gap-3">
            <a href="${project.github}" target="_blank" 
               class="neo-btn inline-flex items-center px-4 py-2 text-sm">
              <i class="fab fa-github mr-2"></i>
              <span>View Code</span>
            </a>
            ${project.demo !== "#" ? `
              <a href="${project.demo}" target="_blank" 
                 class="neo-btn neo-btn-green inline-flex items-center px-4 py-2 text-sm">
                <i class="fas fa-external-link-alt mr-2"></i>
                <span>Live Demo</span>
              </a>
            ` : ""}
          </div>
          
          <!-- Achievements -->
          <div>
            <h4 class="text-sm font-bold uppercase mb-3 inline-block border-b-2 border-[#00D4FF]">Key Achievements</h4>
            <ul class="list-none space-y-2 mt-2">
              ${project.achievements
      .map((achievement, i) => `
                  <li class="flex items-start text-sm md:text-base">
                    <span class="${tagColors[i % tagColors.length] || 'bg-[#FFE600]'} w-2 h-2 mt-2 mr-3 flex-shrink-0 border border-black"></span>
                    ${achievement}
                  </li>
                `)
      .join("")}
            </ul>
          </div>
        </div>
        
        <!-- Right Column: Images -->
        <div id="project-images" class="space-y-4">
        </div>
      </div>
    </div>
  `;

  // Populate images with neobrutalist styling
  const imagesContainer = document.getElementById("project-images");
  if (imagesContainer && details.images && details.images.length > 0) {
    imagesContainer.innerHTML = `
      <h4 class="text-sm font-bold uppercase mb-3 inline-block border-b-2 border-[#FF6B9D]">Screenshots</h4>
    `;
    details.images.forEach((src, idx) => {
      const wrapper = document.createElement("div");
      wrapper.className = "border-4 border-black dark:border-[#FFFEF0] bg-white p-1 cursor-pointer transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000]";
      wrapper.onclick = () => openImageLightbox(src);

      const img = document.createElement("img");
      img.src = src;
      img.alt = details.title + " screenshot " + (idx + 1);
      img.className = "w-full h-auto";
      img.onerror = function () {
        // Hide wrapper if image fails to load
        wrapper.style.display = 'none';
      };

      wrapper.appendChild(img);
      imagesContainer.appendChild(wrapper);
    });
  }

  // Animate modal entrance
  modalContent.style.transform = "translateY(20px)";
  modalContent.style.opacity = "0";
  modalContent.style.transition = "transform 0.2s ease, opacity 0.2s ease";

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    modalContent.style.transform = "translateY(0)";
    modalContent.style.opacity = "1";
  });
}

// Neobrutalist lightbox implementation
function openImageLightbox(src) {
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4";
  overlay.style.animation = "fadeIn 0.2s ease";

  // Container for image and close button
  const container = document.createElement("div");
  container.className = "relative max-w-5xl w-full";

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  closeBtn.className = "absolute -top-12 right-0 w-10 h-10 bg-[#FF6B9D] border-4 border-white text-black font-bold flex items-center justify-center cursor-pointer hover:bg-[#ff4477] transition-colors";
  closeBtn.onclick = (e) => {
    e.stopPropagation();
    overlay.style.animation = "fadeOut 0.2s ease";
    setTimeout(() => document.body.removeChild(overlay), 150);
  };

  // Image wrapper
  const imgWrapper = document.createElement("div");
  imgWrapper.className = "border-4 border-white bg-white p-2";

  const img = document.createElement("img");
  img.src = src;
  img.className = "w-full h-auto max-h-[80vh] object-contain";
  img.alt = "Project screenshot";

  imgWrapper.appendChild(img);
  container.appendChild(closeBtn);
  container.appendChild(imgWrapper);
  overlay.appendChild(container);

  // Close on overlay click
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.style.animation = "fadeOut 0.2s ease";
      setTimeout(() => document.body.removeChild(overlay), 150);
    }
  };

  // Close on ESC
  const escHandler = (e) => {
    if (e.key === "Escape") {
      overlay.style.animation = "fadeOut 0.2s ease";
      setTimeout(() => document.body.removeChild(overlay), 150);
      document.removeEventListener("keydown", escHandler);
    }
  };
  document.addEventListener("keydown", escHandler);

  document.body.appendChild(overlay);
}

// Close project modal with animation
function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  const modalContent = modal.querySelector(".relative");

  modalContent.style.transform = "translateY(20px)";
  modalContent.style.opacity = "0";

  setTimeout(() => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    modalContent.style.transform = "";
    modalContent.style.opacity = "";
    modalContent.style.transition = "";
  }, 200);
}

// Close modal when clicking outside
document.getElementById("projectModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeProjectModal();
  }
});

// Close modal when pressing ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});

// Fix: Ensure anchor scroll lands at the top, even with AOS or dynamic content
function fixAnchorScrollOffset() {
  // Only run scroll fix on click, never on page load
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href.length < 2 || href === "#" || href.startsWith("#!"))
        return;
      const target = document.querySelector(href);
      if (!target) return;

      // Only handle in-page navigation
      if (
        location.pathname === this.pathname &&
        location.hostname === this.hostname
      ) {
        e.preventDefault();
        setTimeout(() => {
          const y =
            target.getBoundingClientRect().top +
            window.scrollY -
            parseFloat(
              getComputedStyle(document.documentElement).scrollPaddingTop || 0
            );
          window.scrollTo({ top: y, behavior: "smooth" });
          history.replaceState(null, "", href);
        }, 350);
      }
    });
  });
}

// --- Scroll Position Persistence ---
// Save scroll position before page unload
window.addEventListener("beforeunload", function () {
  sessionStorage.setItem("scrollPosition", window.scrollY);
});

// Restore scroll position after DOM is loaded
window.addEventListener("DOMContentLoaded", function () {
  const scrollY = sessionStorage.getItem("scrollPosition");
  if (scrollY !== null) {
    window.scrollTo(0, parseInt(scrollY, 10));
    // Optionally clear the scroll position after restoring
    // sessionStorage.removeItem('scrollPosition');
  }
});

// Highlight navbar link for current section
function initNavbarHighlight() {
  const sectionIds = [
    "about",
    "skills",
    "experience",
    "education",
    "projects",
    "achievements",
    "publications",
    "testimonials",
    "hobbies",
    "contact",
  ];
  const navLinks = {};
  sectionIds.forEach((id) => {
    const link = document.querySelectorAll(`a[href='#${id}']`);
    navLinks[id] = link;
  });

  function onScroll() {
    let currentSection = sectionIds[0];
    for (let i = 0; i < sectionIds.length; i++) {
      const section = document.getElementById(sectionIds[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 80) {
          currentSection = sectionIds[i];
        }
      }
    }
    sectionIds.forEach((id) => {
      navLinks[id].forEach((link) => {
        if (id === currentSection) {
          link.classList.add(
            "text-blue-600",
            "dark:text-blue-400",
            "font-bold"
          );
        } else {
          link.classList.remove(
            "text-blue-600",
            "dark:text-blue-400",
            "font-bold"
          );
        }
      });
    });
  }
  window.addEventListener("scroll", onScroll);
  // Initial highlight
  onScroll();
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  initTaglineAnimation();
  initMobileMenu();
  initContactForm();
  initGoUpButton();
  initNavbarHighlight();

  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });

  fixAnchorScrollOffset();
});
