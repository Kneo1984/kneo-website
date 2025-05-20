// 🌗 Dark Mode Toggle bei Klick + Speicherung in localStorage
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("darkToggle");

  // Lade vorherigen Zustand
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  }

  toggle.addEventListener("change", function () {
    if (toggle.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });

  // 🌠 Sticky Header Scroll-Shadow
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ✨ KNEO MODE Easter Egg via Tastenkombi (Ctrl + Alt + K)
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "k") {
      alert("✨ KNEO MODE ACTIVATED ✨\nDie Welt ist bereit für deine Vision.");
      document.body.classList.toggle("dark-mode");
    }
  });
});
