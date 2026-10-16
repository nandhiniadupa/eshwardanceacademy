```javascript
// Eshwar Dance Academy - Website JavaScript

document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    event.preventDefault();

                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    // Join button scrolls to Contact section
    const joinButton = document.querySelector(".hero .btn");

    if (joinButton) {
        joinButton.addEventListener("click", function (event) {
            const contactSection = document.querySelector("#contact");

            if (contactSection) {
                event.preventDefault();

                contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    // Reveal sections when they enter the screen
    const sections = document.querySelectorAll(
        ".section, .experience-section"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        sections.forEach(function (section) {
            section.classList.add("reveal");
            observer.observe(section);
        });
    }

    // Current year in footer
    const footerText = document.querySelector("footer p");

    if (footerText) {
        footerText.textContent =
            "© " + new Date().getFullYear() +
            " Eshwar Dance Academy. All Rights Reserved.";
    }

});
```