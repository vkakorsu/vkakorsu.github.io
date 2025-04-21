// Dark mode handling
function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const html = document.documentElement;

  // Helper to update sun/moon icon visibility
  function updateIcons(isDark) {
    if (!darkModeToggle) return;
    const sunIcon = darkModeToggle.querySelector(".fa-sun");
    const moonIcon = darkModeToggle.querySelector(".fa-moon");
    if (sunIcon) sunIcon.classList.toggle("hidden", isDark);
    if (moonIcon) moonIcon.classList.toggle("hidden", !isDark);
  }

  // Check for saved dark mode preference
  let isDark = false;
  if (
    localStorage.getItem("darkMode") === "true" ||
    (!localStorage.getItem("darkMode")) // Force dark mode by default on first visit
  ) {
    html.classList.add("dark");
    if (darkModeToggle) darkModeToggle.classList.add("dark-mode-on");
    isDark = true;
  }
  updateIcons(isDark);

  // Ensure toggle button is styled correctly on load
  if (darkModeToggle) {
    // Set initial background color
    darkModeToggle.style.backgroundColor = isDark ? "#3b82f6" : "#f3f4f6";
    // Set initial toggle thumb position
    const toggleThumb = darkModeToggle.querySelector(".toggle-thumb");
    if (toggleThumb) {
      toggleThumb.style.transform = isDark
        ? "translateX(1.5rem)"
        : "translateX(0.25rem)";
    }
    // Add event listener as before
    darkModeToggle.addEventListener("click", () => {
      const isDark = html.classList.contains("dark");
      html.classList.toggle("dark");
      localStorage.setItem("darkMode", html.classList.contains("dark"));
      darkModeToggle.classList.toggle("dark-mode-on");
      darkModeToggle.style.backgroundColor = isDark ? "#f3f4f6" : "#3b82f6";
      const toggleThumb = darkModeToggle.querySelector(".toggle-thumb");
      if (toggleThumb) {
        toggleThumb.style.transform = isDark
          ? "translateX(0.25rem)"
          : "translateX(1.5rem)";
      }
      updateIcons(!isDark);
    });
  } else {
    console.error("Dark mode toggle button not found");
  }
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
    mobileMenu.classList.toggle("hidden");
    // Optional: Animate the menu icon
    const menuIcon = mobileMenuButton.querySelector("i");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");
  });

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

// Sync dark mode toggle between desktop and mobile
function initDarkModeMobile() {
  const darkModeToggleMobile = document.getElementById("darkModeToggleMobile");
  const html = document.documentElement;

  if (darkModeToggleMobile) {
    darkModeToggleMobile.addEventListener("click", () => {
      const isDark = html.classList.contains("dark");

      // Toggle dark mode
      html.classList.toggle("dark");
      localStorage.setItem("darkMode", html.classList.contains("dark"));

      // Update toggle button
      darkModeToggleMobile.classList.toggle("dark-mode-on");

      // Update button colors
      darkModeToggleMobile.style.backgroundColor = isDark
        ? "#f3f4f6"
        : "#3b82f6";

      // Update toggle thumb position
      const toggleThumb = darkModeToggleMobile.querySelector(".toggle-thumb");
      if (toggleThumb) {
        toggleThumb.style.transform = isDark
          ? "translateX(0.25rem)"
          : "translateX(1.5rem)";
      }
    });
  }
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
  "ai-image-recognition": {
    title: "AI-Powered Image Recognition System",
    description:
      "Developed a machine learning model for image classification using advanced computer vision techniques.",
    technologies: ["Machine Learning", "Computer Vision", "Python"],
    github: "https://github.com/vkakorsu/ai-image-recognition",
    demo: "#",
    images: [
      "assets/images/ai-image-recognition-1.jpg",
      "assets/images/ai-image-recognition-2.jpg",
    ],
    achievements: [
      "Achieved 95% accuracy on test dataset",
      "Implemented real-time image processing",
      "Optimized model for edge devices",
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

// Open project modal
function openProjectModal(projectId) {
  console.log('Opening modal for project:', projectId);
  const modal = document.getElementById("projectModal");
  const modalContent = modal.querySelector(".relative");
  const content = document.getElementById("modalContentInner");

  if (!modal || !modalContent || !content) {
    console.error('Modal elements not found');
    return;
  }

  // Get project details
  const project = projectDetails[projectId];
  if (!project) {
    console.error('Project not found:', projectId);
    return;
  }

  console.log('Project details:', project);

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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${project.images
          .map(
            (img, index) => `
          <img src="${img}" alt="${project.title} - Image ${
              index + 1
            }" class="w-full rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
        `
          )
          .join("")}
      </div>
    </div>
  `;

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

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  initTaglineAnimation();
  initMobileMenu();
  initDarkModeMobile();
  initContactForm();
  initGoUpButton();

  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });
});
