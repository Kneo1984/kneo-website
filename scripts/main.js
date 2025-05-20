// 🌌 KNEO MASTER SCRIPT 2.0 – Kosmisch vollendet
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkToggle");
  const header = document.querySelector("header");

  // 🌗 DARK MODE LOGIK (inkl. Speicherung)
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (toggle) toggle.checked = true;
  }

  if (toggle) {
    toggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");
      const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
      localStorage.setItem("theme", theme);
    });
  }

  // 🌌 STICKY HEADER MIT SHADOW
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("sticky-shadow");
      } else {
        header.classList.remove("sticky-shadow");
      }
    });
  }

  // 🔮 KNEO MODE (Ctrl + Alt + K)
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "k") {
      alert("✨ KNEO MODE ACTIVATED ✨\nKosmisches Bewusstsein erweitert.");
      document.body.classList.toggle("dark-mode");
    }
  });

  // 📦 APP-CARD LAUNCHER (Simuliert App-Start)
  const appCards = document.querySelectorAll(".app-card");
  appCards.forEach(card => {
    card.addEventListener("click", () => {
      const appName = card.textContent.trim();
      alert(`🚀 App "${appName}" wird geöffnet... (Simulation)`);
    });
  });

  // 💡 SMOOTH SCROLL (Anker-Sprung weicher machen)
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
