// 🌌 KNEOS TERMINAL – Kosmisch perfektioniert: Verlauf + Sound + Uhrzeit + Autoscroll + History
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

  // 🎵 Eingabesound laden
  const commandSound = new Audio("https://cdn.jsdelivr.net/gh/Kneo1984/kneo-assets/sounds/beep.mp3");

  // 🕒 Uhrzeit-Anzeige rechts unten
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

  // 🔁 Eingabeverlauf speichern
  let commandHistory = [];
  let historyIndex = -1;

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const command = input.value.trim().toLowerCase();
      if (command) {
        writeToTerminal(`> ${command}`, "white");
        commandSound.currentTime = 0;
        commandSound.play(); // ✅ Soundeffekt
        handleCommand(command);

        commandHistory.push(command);
        historyIndex = commandHistory.length;

        input.value = "";
      }
    }

    // 🔼 Verlauf durchblättern
    if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    }

    if (e.key === "ArrowDown") {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = "";
      }
      e.preventDefault();
    }
  });

  // 🧠 Befehlslogik
  function handleCommand(cmd) {
    switch (cmd) {
      case "help":
        writeToTerminal(`
<strong>🌐 Verfügbare Befehle:</strong><br>
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
        output.appendChild(timeParagraph); // 🕒 Uhrzeit beibehalten
        break;
      default:
        writeToTerminal(`❓ Unbekannter Befehl: "${cmd}". Gib 'help' ein.`, "orange");
    }

    // 🔄 Autoscroll
    terminal.scrollTop = terminal.scrollHeight;
  }

  // 📤 Ausgabehelfer
  function writeToTerminal(text, color = "lightgreen") {
    const response = document.createElement("p");
    response.style.color = color;
    response.innerHTML = text;
    output.appendChild(response);
  }
});
