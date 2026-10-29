
/*
  IT KALAT WEBSITE SETTINGS

  Replace the example WhatsApp number below with your real
  business number, including the country code.

  Pakistan example format: 923001234567
  Do not include +, spaces, or dashes.
*/

const WHATSAPP_NUMBER = "923001234567";

document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the copyright year.
  document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Mobile navigation menu.
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      });
    });
  }

  // Course category filters and search.
  const courseSearch = document.getElementById("course-search");
  const courseCards = [...document.querySelectorAll(".course-card")];
  const courseButtons = document.querySelectorAll("[data-course-filter]");
  const courseEmpty = document.getElementById("course-empty");

  let selectedCategory = "all";

  function filterCourses() {
    if (!courseCards.length) return;

    const query = courseSearch
      ? courseSearch.value.trim().toLowerCase()
      : "";

    let visibleCount = 0;

    courseCards.forEach((card) => {
      const category = card.dataset.category || "";
      const searchText =
        (card.dataset.search || "") + " " + card.textContent;

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      const matchesSearch =
        searchText.toLowerCase().includes(query);

      const visible = matchesCategory && matchesSearch;

      card.hidden = !visible;

      if (visible) visibleCount++;
    });

    if (courseEmpty) {
      courseEmpty.hidden = visibleCount !== 0;
    }
  }

  courseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.courseFilter;

      courseButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      filterCourses();
    });
  });

  if (courseSearch) {
    courseSearch.addEventListener("input", filterCourses);
  }

  // Search the computer accessories catalog.
  const productSearch = document.getElementById("product-search");
  const productCards = [...document.querySelectorAll(".product-card")];
  const productEmpty = document.getElementById("product-empty");

  function filterProducts() {
    if (!productCards.length) return;

    const query = productSearch
      ? productSearch.value.trim().toLowerCase()
      : "";

    let visibleCount = 0;

    productCards.forEach((card) => {
      const searchText =
        (card.dataset.search || "") + " " + card.textContent;

      const visible = searchText.toLowerCase().includes(query);

      card.hidden = !visible;

      if (visible) visibleCount++;
    });

    if (productEmpty) {
      productEmpty.hidden = visibleCount !== 0;
    }
  }

  if (productSearch) {
    productSearch.addEventListener("input", filterProducts);
  }

  // Build a WhatsApp message and open WhatsApp.
  function openWhatsApp(message) {
    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      alert(
        "Please add your correct WhatsApp business number in script.js."
      );
      return;
    }

    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Product-specific inquiries.
  document.querySelectorAll(".whatsapp-product").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const product = link.dataset.product || "Computer accessory";

      openWhatsApp(
        `Assalam-o-Alaikum IT Kalat! I would like to ask about the availability and price of: ${product}.`
      );
    });
  });

  // General WhatsApp contact.
  document.querySelectorAll(".whatsapp-general").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      openWhatsApp(
        "Assalam-o-Alaikum IT Kalat! I would like to know more about your courses and computer accessories."
      );
    });
  });

  // Course-specific admission inquiries.
  document.querySelectorAll(".admission-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const course = link.dataset.course || "your computer courses";

      openWhatsApp(
        `Assalam-o-Alaikum IT Kalat! I am interested in ${course}. Please share the course details, duration, fees, and admission information.`
      );
    });
  });

  // Contact form: compose a message in WhatsApp.
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);

      const name = formData.get("name").toString().trim();
      const phone = formData.get("phone").toString().trim();
      const interest = formData.get("interest").toString();
      const message = formData.get("message").toString().trim();

      const whatsappMessage = [
        "Assalam-o-Alaikum IT Kalat!",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Interested in: ${interest}`,
        `Message: ${message}`
      ].join("\n");

      openWhatsApp(whatsappMessage);
    });
  }
});
