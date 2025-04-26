/* Scroll-Funktion für Button "Starte deine Reise" */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/* Terminal-Initialisierung */
document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    if (terminal) {
        terminal.style.backgroundColor = '#263238';
        terminal.style.color = '#00e676';
        terminal.style.padding = '20px';
        terminal.style.borderRadius = '10px';
        terminal.style.fontFamily = 'monospace';
        terminal.innerHTML = "✨ Willkommen im KNEOS Terminal ✨\nGib 'help' für Befehle ein.";
    }
});
