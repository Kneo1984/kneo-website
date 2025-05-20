// 🧠 KNEO MASTER SCRIPT – Letzte Stufe der kosmischen Entfaltung
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkToggle");

  // 🌗 Dark Mode mit Speicherung
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });

  // 🌌 Sticky Header mit Shadow
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("sticky-shadow");
    } else {
      header.classList.remove("sticky-shadow");
    }
  });

  // 🔮 Easter Egg Modus – KNEO MODE
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "k") {
      document.body.classList.toggle("dark-mode");
      alert("✨ KNEO MODE ACTIVATED ✨");
    }
  });

  // 📦 Modal-Launcher für App Cards (optional)
  const appCards = document.querySelectorAll(".app-card");
  appCards.forEach(card => {
    card.addEventListener("click", () => {
      alert(`🚀 App "${card.textContent.trim()}" wird geöffnet... (Simulation)`);
    });
  });

  // 💡 Smooth Scroll fix (optional bei Bedarf)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
