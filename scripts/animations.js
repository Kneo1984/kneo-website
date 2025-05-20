// 🎬 KNEO ANIMATIONS – Sanft, natürlich, reaktiv

/* --------------------------------------------------------
   ✨ 1. Pulsierendes Profilbild bei Hover
-------------------------------------------------------- */
const profilePicture = document.getElementById('profile-picture');

if (profilePicture) {
  profilePicture.style.transition = 'box-shadow 0.4s ease-in-out';

  profilePicture.addEventListener('mouseenter', () => {
    profilePicture.style.boxShadow = '0 0 40px rgba(76, 175, 80, 0.9)';
  });

  profilePicture.addEventListener('mouseleave', () => {
    profilePicture.style.boxShadow = '0 0 20px rgba(34, 139, 34, 0.5)';
  });
}

/* --------------------------------------------------------
   🌐 2. Sanftes Scrollen beim Klicken auf Navigationslinks
-------------------------------------------------------- */
const navLinks = document.querySelectorAll('#site-header nav a');

navLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    const targetId = this.getAttribute('href')?.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
