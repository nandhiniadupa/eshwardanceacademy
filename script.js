
"use strict";

// Academy contact details
const ACADEMY_WHATSAPP = "918121296136";
const ACADEMY_ADDRESS =
  "#2-10-886, S.B.H Colony, Road No. 3, Subedari, Hanamkonda, Telangana";

// 1. Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");

function closeMenu() {
  navigation.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open navigation");
  menuBtn.textContent = "☰";
}

menuBtn.addEventListener("click", function () {
  const opened = navigation.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(opened));
  menuBtn.setAttribute(
    "aria-label",
    opened ? "Close navigation" : "Open navigation"
  );
  menuBtn.textContent = opened ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 850) closeMenu();
});

// 2. Set footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// 3. Set minimum selectable date to today
const dateInput = document.getElementById("preferredDate");

function todayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

dateInput.min = todayString();

// 4. Class enquiry links prefill the booking form
document.querySelectorAll("[data-service]").forEach(function (link) {
  link.addEventListener("click", function () {
    document.getElementById("service").value = link.dataset.service;
  });
});

// 5. Batch enquiry links prefill the preferred batch
document.querySelectorAll("[data-batch]").forEach(function (link) {
  link.addEventListener("click", function () {
    document.getElementById("batch").value = link.dataset.batch;
  });
});

// 6. Booking form -> WhatsApp
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();
  formMessage.textContent = "";

  if (!bookingForm.reportValidity()) return;

  const fullName =
    document.getElementById("fullName").value.trim();

  const phone =
    document.getElementById("phone").value.trim();

  const service =
    document.getElementById("service").value;

  const batch =
    document.getElementById("batch").value || "Not specified";

  const preferredDate =
    dateInput.value || "Not specified";

  const notes =
    document.getElementById("notes").value.trim() || "None";

  if (preferredDate !== "Not specified" &&
      preferredDate < todayString()) {
    formMessage.textContent =
      "Please choose today or a future date.";
    return;
  }

  if (!/^[1-9]\d{7,14}$/.test(ACADEMY_WHATSAPP)) {
    formMessage.textContent =
      "Please check the WhatsApp number in script.js.";
    return;
  }

  const message = [
    "Hello Eshwar Dance Academy & Event Organisers!",
    "",
    "I would like to make an enquiry.",
    "",
    "Name: " + fullName,
    "Contact Number: " + phone,
    "Service: " + service,
    "Preferred Batch: " + batch,
    "Preferred Date: " + preferredDate,
    "Additional Details: " + notes,
    "",
    "Please let me know the availability and further details.",
    "",
    "Address: " + ACADEMY_ADDRESS
  ].join("\n");

  const whatsappURL =
    "https://wa.me/" + ACADEMY_WHATSAPP +
    "?text=" + encodeURIComponent(message);

  // Navigate to WhatsApp after the visitor submits the form.
  formMessage.textContent =
    "Opening WhatsApp. Please review the message and press Send.";

  window.location.href = whatsappURL;
});

// 7. Floating WhatsApp button
const whatsappFloat = document.getElementById("whatsappFloat");

whatsappFloat.href =
  "https://wa.me/" + ACADEMY_WHATSAPP +
  "?text=" + encodeURIComponent(
    "Hello Eshwar Dance Academy! I would like to enquire about your dance classes and event services."
  );

// 8. Google Maps directions
const directionsLink = document.getElementById("directionsLink");

directionsLink.href =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(ACADEMY_ADDRESS);

// 9. Highlight the active navigation section
const sections = document.querySelectorAll("main section[id]");
const navLinks = navigation.querySelectorAll('a[href^="#"]');

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        navLinks.forEach(function (link) {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    },
    { rootMargin: "-20% 0px -65% 0px" }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}

console.log("Eshwar Dance Academy website is ready.");
