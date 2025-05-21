// 🧠 KNEO MASTER SCRIPT – Kosmische Steuerung & Dark Mode

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkToggle");
  const header = document.querySelector("header");

  // 🌗 Dark Mode Zustand aus localStorage lesen
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  }

  // 🔄 Umschalten & speichern
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });

  // 🧲 Sticky Header mit sanftem Schatten
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("sticky-shadow");
    } else {
      header.classList.remove("sticky-shadow");
    }
  });

  // 🪐 Easter Egg: Ctrl + Alt + K – KNEO MODE
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "k") {
      document.body.classList.toggle("dark-mode");
      alert("✨ KNEO MODE ACTIVATED ✨ Kosmisches Bewusstsein erweitert.");
    }
  });

  // 🚀 Interaktive App Cards
  const appCards = document.querySelectorAll(".app-card");
  appCards.forEach((card) => {
    card.addEventListener("click", () => {
      alert(`🚀 App "${card.textContent.trim()}" wird geladen... (Simulation)`);
    });
  });

  // ☄️ Smooth Scroll Navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
