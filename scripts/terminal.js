// KNEOS TERMINAL – Fancy & Funktional ✨
// Erstellt ein interaktives Terminal mit Befehlen

document.addEventListener("DOMContentLoaded", function () {
  const terminal = document.getElementById("terminal");

  // Füge Initialtext + Eingabefeld ins Terminal ein
  terminal.innerHTML = `
    <p style="color:lime;">✨ Willkommen im KNEOS Terminal ✨</p>
    <p style="color:cyan;">💡 Gib 'help' für Befehle ein.</p>
    <div id="terminal-output" style="margin-top: 1rem;"></div>
    <input type="text" id="terminal-input" autofocus placeholder="Befehl eingeben..." style="width: 100%; padding: 10px; background: black; color: #0f0; border: none; outline: none; font-family: monospace;" />
  `;

  const output = document.getElementById("terminal-output");
  const input = document.getElementById("terminal-input");

  // Reagiere auf Enter
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const command = input.value.trim().toLowerCase();
      if (command) {
        writeToTerminal(`> ${command}`, "white");
        handleCommand(command);
        input.value = "";
      }
    }
  });

  // Befehlsverarbeitung
  function handleCommand(cmd) {
    switch (cmd) {
      case "help":
        writeToTerminal(`
<strong>Verfügbare Befehle:</strong><br>
<code>launch flow</code> – Öffnet die Flow-App<br>
<code>open seeds</code> – Öffnet Seeds<br>
<code>connect</code> – Verbindet mit Kontaktmodul<br>
<code>clear</code> – Terminal leeren
`, "cyan");
        break;
      case "launch flow":
        writeToTerminal("🚀 Flow-App gestartet... (Simulation)", "lightgreen");
        break;
      case "open seeds":
        writeToTerminal("📚 Seeds geöffnet... (Simulation)", "lightgreen");
        break;
      case "connect":
        writeToTerminal("🔗 Verbindung mit Kontaktmodul hergestellt.", "lightgreen");
        break;
      case "clear":
        output.innerHTML = "";
        break;
      default:
        writeToTerminal(`❓ Unbekannter Befehl: "${cmd}". Gib 'help' ein.`, "orange");
    }

    // Autoscroll
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Hilfsfunktion für Ausgabe
  function writeToTerminal(text, color = "lightgreen") {
    const response = document.createElement("p");
    response.style.color = color;
    response.innerHTML = text;
    output.appendChild(response);
  }
});
