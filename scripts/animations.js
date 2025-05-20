// ✨ ANIMATIONS.js – Kosmischer Glanz & Bewegung

// 🌟 Pulsierendes Glühen für das Profilbild
document.addEventListener("DOMContentLoaded", () => {
  const profilePicture = document.getElementById("profile-picture");

  if (profilePicture) {
    profilePicture.style.transition = 'box-shadow 0.4s ease-in-out';

    profilePicture.addEventListener('mouseenter', () => {
      profilePicture.style.boxShadow = '0 0 40px rgba(138, 43, 226, 0.9)'; // Neonlila-Puls
    });

    profilePicture.addEventListener('mouseleave', () => {
      profilePicture.style.boxShadow = '0 0 20px rgba(0, 255, 128, 0.5)'; // Kosmisches Grün
    });
  }

  // 🪐 Smooth Navigation Scroll
  const navLinks = document.querySelectorAll('#site-header nav a, nav.main-nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
