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

  mobileMenuButton.addEventListener("click", () => {
    const isMenuOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");
    // Animate the menu icon
    const menuIcon = mobileMenuButton.querySelector("i");
    if (isMenuOpen) {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    } else {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    }
  });

  // Handle X button inside mobile menu
  const closeMenuBtn = mobileMenu.querySelector("[aria-label='Close menu']");
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      const menuIcon = mobileMenuButton.querySelector("i");
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    });
  }

  // Close mobile menu when clicking a link
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      // Reset menu icon
      const menuIcon = mobileMenuButton.querySelector("i");
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    });
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
      "assets/images/project_images/foodrescue_provider.png",
      "assets/images/project_images/foodrescue_recipient.png",
    ],
    achievements: [
      "Implemented secure user authentication and admin controls",
      "Automated food expiry and claim management for safety",
      "Real-time dashboard for providers, recipients, and admins",
      "User-friendly activity log with advanced filtering and search",
      "Suspension logic to prevent access for suspended users",
    ],
  },
  "cloud-native-app": {
    title: "Cloud-Native Application Development",
    description:
      "Built a scalable web application using AWS services, focusing on microservices architecture and containerization.",
    technologies: ["AWS", "Docker", "Kubernetes"],
    github: "https://github.com/vkakorsu/cloud-native-app",
    demo: "#",
    images: [
      "assets/images/cloud-native-app-1.jpg",
      "assets/images/cloud-native-app-2.jpg",
    ],
    achievements: [
      "Deployed to production with zero downtime",
      "Achieved 99.9% uptime",
      "Scaled to handle 1000+ concurrent users",
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

// Enhance openProjectModal to stack images and enable lightbox
function openProjectModal(projectKey) {
  const details = projectDetails[projectKey];
  console.log("Opening modal for project:", projectKey);
  const modal = document.getElementById("projectModal");
  const modalContent = modal.querySelector(".relative");
  const content = document.getElementById("modalContentInner");

  if (!modal || !modalContent || !content) {
    console.error("Modal elements not found");
    return;
  }

  // Get project details
  const project = projectDetails[projectKey];
  if (!project) {
    console.error("Project not found:", projectKey);
    return;
  }

  console.log("Project details:", project);

  // Generate modal content
  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Project Information -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">${project.title}</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-6">${
          project.description
        }</p>
        
        <!-- Technologies -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold mb-2">Technologies Used</h4>
          <div class="flex flex-wrap gap-2">
            ${project.technologies
              .map(
                (tech) => `
              <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                ${tech}
              </span>
            `
              )
              .join("")}
          </div>
        </div>
        
        <!-- Links -->
        <div class="flex flex-wrap gap-4 mb-6">
          <a href="${
            project.github
          }" target="_blank" class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 flex items-center space-x-2 transition-all duration-200">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          ${
            project.demo !== "#"
              ? `
            <a href="${project.demo}" target="_blank" class="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 flex items-center space-x-2 transition-all duration-200">
              <i class="fas fa-external-link-alt"></i>
              <span>Demo</span>
            </a>
          `
              : ""
          }
        </div>
        
        <!-- Achievements -->
        <div>
          <h4 class="text-lg font-semibold mb-2">Key Achievements</h4>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300">
            ${project.achievements
              .map((achievement) => `<li>${achievement}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
      
      <!-- Project Images -->
      <div id="project-images" class="grid grid-cols-1 gap-4">
      </div>
    </div>
  `;

  // Populate images stacked vertically
  const imagesContainer = document.getElementById("project-images");
  if (imagesContainer && details.images) {
    imagesContainer.innerHTML = "";
    details.images.forEach((src, idx) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = details.title + " screenshot " + (idx + 1);
      img.className =
        "w-full max-w-2xl rounded-lg cursor-pointer transition-transform hover:scale-105";
      img.style.margin = "0 auto 1rem auto";
      img.onclick = () => openImageLightbox(src);
      imagesContainer.appendChild(img);
    });
  }

  // Add scale transform for smooth entrance
  modalContent.style.transform = "scale(0.95)";
  modalContent.style.opacity = "0";

  // Show modal
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Animate in
  setTimeout(() => {
    modalContent.style.transform = "scale(1)";
    modalContent.style.opacity = "1";
  }, 10);
}

// Simple lightbox implementation
function openImageLightbox(src) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0,0,0,0.8)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = 9999;

  // Create image
  const img = document.createElement("img");
  img.src = src;
  img.style.maxWidth = "90vw";
  img.style.maxHeight = "90vh";
  img.style.borderRadius = "8px";
  img.style.boxShadow = "0 2px 16px rgba(0,0,0,0.5)";
  overlay.appendChild(img);

  // Close on click
  overlay.onclick = () => document.body.removeChild(overlay);

  document.body.appendChild(overlay);
}

// Close project modal
function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  const modalContent = modal.querySelector(".relative");

  // Animate out
  modalContent.style.transform = "scale(0.95)";
  modalContent.style.opacity = "0";

  // Remove modal after animation
  setTimeout(() => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    modalContent.style.transform = "";
    modalContent.style.opacity = "";
  }, 300);
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
