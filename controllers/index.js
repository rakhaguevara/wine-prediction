// controllers/index.js

// Function to fetch and insert HTML components
async function loadComponent(url, containerId) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const html = await response.text();
      document.getElementById(containerId).innerHTML = html;
    } else {
      console.error(`Failed to load component from ${url}`);
    }
  } catch (error) {
    console.error(`Error loading component from ${url}:`, error);
  }
}

// Initialize component loading for index page
function initIndexPage() {
  loadComponent("/components/Header.html", "header-container");
  loadComponent("/components/HeroSection.html", "hero-section-container");
  loadComponent("/components/Footer.html", "footer-container");
  loadComponent("/components/Gallery.html", "gallery-container");
  loadComponent("/components/BuyWine.html", "wine-container");
  loadComponent("/components/Location.html", "map-container");
}

// Export functions for use in other modules if needed
window.indexController = {
  init: initIndexPage,
  loadComponent: loadComponent,
};

// Run initialization when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initIndexPage);

// maps js

// Initialize map after page load
document.addEventListener("DOMContentLoaded", function () {
  // Manhattan coordinates
  const latitude = 40.7831;
  const longitude = -73.9712;

  // Create map centered on Manhattan
  const map = L.map("map").setView([latitude, longitude], 12);

  // Add OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // Add marker for Manhattan
  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup("Manhattan, New York")
    .openPopup();

  // Optional: You can customize marker icon

  //   const customIcon = L.icon({
  //     iconUrl: "marker-icon.png",
  //     iconSize: [25, 41],
  //     iconAnchor: [12, 41],
  //     popupAnchor: [1, -34],
  //   });

  //   L.marker([latitude, longitude], { icon: customIcon })
  //     .addTo(map)
  //     .bindPopup("Manhattan, New York")
  //     .openPopup();

  //   header JS
  // Header.js - JavaScript functionality for responsive navbar

  // Mobile Header functionality
  // Add this to your existing index.js file

  document.addEventListener("DOMContentLoaded", function () {
    // Mobile header menu functionality
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.querySelector(".menu-overlay");

    if (mobileMenuToggle && navMenu && menuOverlay) {
      // Function to toggle menu state
      function toggleMenu() {
        mobileMenuToggle.classList.toggle("open");
        navMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");

        // Prevent scrolling when menu is open
        if (navMenu.classList.contains("active")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      }

      // Toggle menu when hamburger icon is clicked
      mobileMenuToggle.addEventListener("click", toggleMenu);

      // Close menu when clicking outside
      menuOverlay.addEventListener("click", toggleMenu);

      // Close menu when a navigation link is clicked
      const navLinks = document.querySelectorAll(".nav-menu a");
      navLinks.forEach((link) => {
        link.addEventListener("click", function () {
          if (navMenu.classList.contains("active")) {
            toggleMenu();
          }
        });
      });

      // Close menu when window is resized to desktop size
      window.addEventListener("resize", function () {
        if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
          toggleMenu();
        }
      });
    }
  });
});
