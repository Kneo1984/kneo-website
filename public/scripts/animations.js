/* Animations.js - Steuerung von Animationen auf der Seite */
/* -------------------------------------------------------- */

/* Pulsierendes Leuchten für das Profilbild noch weicher machen */
const profilePicture = document.getElementById('profile-picture');

if (profilePicture) {
    profilePicture.addEventListener('mouseenter', () => {
        profilePicture.style.boxShadow = '0 0 40px rgba(76, 175, 80, 0.9)'; // Kräftiger beim Überfahren
    });

    profilePicture.addEventListener('mouseleave', () => {
        profilePicture.style.boxShadow = '0 0 20px rgba(34, 139, 34, 0.5)'; // Zurück auf normale Pulsierung
    });
}

/* Smooth Scroll Effekt beim Klicken auf Navigation */
const navLinks = document.querySelectorAll('#site-header nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Standardverhalten verhindern

        const targetId = this.getAttribute('href').substring(1); // Ziel-ID aus dem Link holen
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth' // Sanftes Scrollen
            });
        }
    });
});
