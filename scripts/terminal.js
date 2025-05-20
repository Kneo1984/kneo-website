// 🧠 KNEOS TERMINAL – Kosmisch erweitert: Verlauf + Sound + Uhrzeit + Autoscroll

document.addEventListener("DOMContentLoaded", function () {
  const terminal = document.getElementById("terminal");

  // Terminal UI einfügen
  terminal.innerHTML = `
    <p style="color:lime;">✨ Willkommen im KNEOS Terminal ✨</p>
    <p style="color:cyan;">💡 Gib 'help' für Befehle ein.</p>
    <div id="terminal-output" style="margin-top: 1rem;"></div>
    <input type="text" id="terminal-input" autofocus placeholder="Befehl eingeben..." style="width: 100%; padding: 10px; background: black; color: #0f0; border: none; outline: none; font-family: monospace;" />
  `;

  const output = document.getElementById("terminal-output");
  const input = document.getElementById("terminal-input");

  // 🎵 Sound Feedback
  const commandSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_cce2b0d6e0.mp3?filename=click-124467.mp3");

  // 🕒 Uhrzeit-Anzeige
  const timeParagraph = document.createElement("p");
  timeParagraph.style.color = "lightblue";
  timeParagraph.style.fontSize = "0.9rem";
  timeParagraph.style.marginTop = "1rem";
  timeParagraph.style.textAlign = "right";
  timeParagraph.id = "terminal-time";
  output.appendChild(timeParagraph);

  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString("de-DE");
    const date = now.toLocaleDateString("de-DE");
    timeParagraph.textContent = `🕒 ${date} – ${time}`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // 🎯 Eingabe verarbeiten
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const command = input.value.trim().toLowerCase();
      if (command) {
        writeToTerminal(`> ${command}`, "white");
        commandSound.play();
        handleCommand(command);
        input.value = "";
      }
    }
  });

  // 🧠 Kommandoverarbeitung
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
        output.appendChild(timeParagraph); // Uhrzeit erhalten
        break;
      default:
        writeToTerminal(`❓ Unbekannter Befehl: "${cmd}". Gib 'help' ein.`, "orange");
    }

    // ✅ Autoscroll – jetzt korrekt eingebettet
    terminal.scrollTop = terminal.scrollHeight;
  }

  // 📤 Ausgabe-Helfer
  function writeToTerminal(text, color = "lightgreen") {
    const response = document.createElement("p");
    response.style.color = color;
    response.innerHTML = text;
    output.appendChild(response);
  }
});
