// 🌌 KNEOS TERMINAL – Kosmisch vollendet: Verlauf + Sound + Zeit + Autoscroll
document.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("terminal");

  if (!terminal) return; // Sicherheitscheck

  terminal.innerHTML = `
    <p style="color:lime;">✨ Willkommen im KNEOS Terminal ✨</p>
    <p style="color:cyan;">💡 Gib 'help' für Befehle ein.</p>
    <div id="terminal-output" style="margin-top: 1rem;"></div>
    <input type="text" id="terminal-input" autofocus placeholder="Befehl eingeben..." style="width: 100%; padding: 10px; background: black; color: #0f0; border: none; outline: none; font-family: monospace;" />
  `;

  const output = document.getElementById("terminal-output");
  const input = document.getElementById("terminal-input");

  if (!output || !input) return; // Sicherheitscheck

  // 🎵 Kosmischer Klicksound
  const beep = new Audio("https://cdn.jsdelivr.net/gh/Kneo1984/kneo-assets/sounds/beep.mp3");

  // 🕒 Uhrzeit-Overlay
  const timeParagraph = document.createElement("p");
  timeParagraph.style.color = "lightblue";
  timeParagraph.style.textAlign = "right";
  timeParagraph.style.fontSize = "0.9rem";
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

  // 🧠 Kommando-Eingabe
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = input.value.trim().toLowerCase();
      if (cmd) {
        beep.currentTime = 0;
        beep.play().catch(() => {}); // Fehlerfreie Soundauslösung
        writeToTerminal(`> ${cmd}`, "white");
        handleCommand(cmd);
        input.value = "";
      }
    }
  });

  // 🔮 Befehlserkennung
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

    // 🔁 Autoscroll
    terminal.scrollTop = terminal.scrollHeight;
  }

  // 📤 Terminalausgabe
  function writeToTerminal(text, color = "lightgreen") {
    const p = document.createElement("p");
    p.style.color = color;
    p.innerHTML = text;
    output.appendChild(p);
  }
});
