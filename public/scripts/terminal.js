/* terminal.js - Mini-Terminal für KNEOS App Suite */
/* ------------------------------------------------ */

/* Sobald das Dokument geladen ist */
document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');

    if (!terminal) return; // Falls Terminal-Element nicht vorhanden ist, abbrechen

    // Grund-Styles für das Terminal setzen
    terminal.style.backgroundColor = '#263238'; // Dunkelgrauer Hintergrund
    terminal.style.color = '#00e676'; // Neon-Grün für Text
    terminal.style.padding = '20px';
    terminal.style.borderRadius = '10px';
    terminal.style.fontFamily = 'monospace';
    terminal.style.height = '300px';
    terminal.style.overflowY = 'auto';
    terminal.style.whiteSpace = 'pre-line';
    terminal.style.boxShadow = '0 0 20px rgba(0, 230, 118, 0.5)'; // Grünes Leuchten

    // Eingabefeld erstellen
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Gib einen Befehl ein...';
    input.style.width = '100%';
    input.style.padding = '10px';
    input.style.border = 'none';
    input.style.borderRadius = '5px';
    input.style.marginTop = '10px';
    input.style.backgroundColor = '#37474f';
    input.style.color = '#00e676';
    input.style.fontFamily = 'monospace';

    terminal.appendChild(input);

    // Funktion zum Anzeigen von Text im Terminal
    function printToTerminal(text) {
        const output = document.createElement('div');
        output.textContent = text;
        terminal.insertBefore(output, input);
        terminal.scrollTop = terminal.scrollHeight; // Automatisch runterscrollen
    }

    // Befehlsverarbeitung
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            handleCommand(command);
            input.value = ''; // Eingabefeld leeren
        }
    });

    // Hier definieren wir, welche Befehle möglich sind
    function handleCommand(command) {
        if (command === 'help') {
            printToTerminal('Verfügbare Befehle: help, apps, info');
        } else if (command === 'apps') {
            printToTerminal('Starte die KNEOS App Suite... [BETA]');
        } else if (command === 'info') {
            printToTerminal('Projekt von Dennis Maier – Infinity Worlds Creator.');
        } else if (command === '') {
            // Nichts tun bei leerer Eingabe
        } else {
            printToTerminal(`Unbekannter Befehl: ${command}`);
        }
    }

    // Begrüßungstext beim Start
    // Begrüßungstext mit Secret Welcome
setTimeout(() => {
    printToTerminal('✨ Willkommen in der Welt von Dennis Maier ✨');
}, 500);

setTimeout(() => {
    printToTerminal('🌿 Entdecke Projekte, Apps und Geheimnisse...');
}, 1500);

setTimeout(() => {
    printToTerminal('Tippe "help", um deine Reise zu starten.');
}, 2500);

