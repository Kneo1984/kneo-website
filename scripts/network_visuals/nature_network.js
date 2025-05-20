// 🌌 KNEO NATURE COSMOS – Galaktische Netzwerk-Visualisierung

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

// ✨ Sternen-Knoten erzeugen
function createNodes(count) {
  nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 0.8 + Math.random() * 1.8
    });
  }
}

// 🌠 Zeichnen & Verbinden
function draw() {
  ctx.clearRect(0, 0, width, height);

  // Verbindungslinien
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 100) {
        ctx.strokeStyle = 'rgba(160, 200, 255, 0.07)'; // kosmisches Blau
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Sterne zeichnen
  nodes.forEach(node => {
    node.x += node.vx;
    node.y += node.vy;

    // Ränder spiegeln
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; // Sternenweiß
    ctx.shadowColor = '#88ccff';
    ctx.shadowBlur = 5;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

// 🌍 Reaktion auf Resize
window.addEventListener('resize', () => {
  resizeCanvas();
  createNodes(60);
});

// 🚀 Start
resizeCanvas();
createNodes(60);
draw();
