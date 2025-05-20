// 🛸 KNEO NETWORK – Galaktisches Partikelfeld mit Puls und Tiefe
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('network-visual').appendChild(canvas);

let width, height, nodes = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = 400;
  canvas.width = width;
  canvas.height = height;
}

// 🌌 Farbpalette aus dem Kosmos
function getCosmicColor() {
  const palette = ["#39ff14", "#ff00ff", "#00ccff", "#ffff66", "#ff66cc"];
  return palette[Math.floor(Math.random() * palette.length)];
}

// 🌠 Sternen-Knoten erzeugen
function createNodes(count) {
  nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: 1 + Math.random() * 1.5,
      color: getCosmicColor()
    });
  }
}

// ✨ Zeichne Sterne & Verbindungen
function draw() {
  ctx.clearRect(0, 0, width, height);

  // ✨ Linien zwischen nahen Knoten
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 100) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // 🌀 Bewegung & Puls der Sterne
  nodes.forEach(node => {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = node.color;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

// 📏 Reaktion auf Fenstergröße
window.addEventListener('resize', () => {
  resizeCanvas();
  createNodes(50);
});

// 🌌 Initialisierung
resizeCanvas();
createNodes(50);
draw();
