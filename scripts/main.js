// 💡 KNEO: Sticky Header + Easter Egg + Dark Mode Toggle

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkToggle");
  const header = document.querySelector("header");

  // 🌙 Lade gespeichertes Theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  }

  // 🌗 Toggle-Logik
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });

  // 🌐 Sticky Header mit Shadow beim Scrollen
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 🎉 Easter Egg: Ctrl + Alt + K => Alert + Dark Mode Toggle
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "k") {
      alert("✨ KNEO MODE ACTIVATED ✨\nKosmos erkannt. Realität neu kalibriert.");
      document.body.classList.toggle("dark-mode");
    }
  });
});
