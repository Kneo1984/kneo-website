// 🌿 KNEO NATURE NETWORK – Kosmisch sanfte Visualisierung

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

// 🌱 Nodes erzeugen
function createNodes(count) {
  nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 1.5 + Math.random() * 2
    });
  }
}

// 🌌 Zeichnung & Verbindung
function draw() {
  ctx.clearRect(0, 0, width, height);

  // Linienverbindungen
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 100) {
        ctx.strokeStyle = 'rgba(76, 175, 80, 0.15)';
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Punkte zeichnen & bewegen
  nodes.forEach(node => {
    node.x += node.vx;
    node.y += node.vy;

    // Bounce an Rändern
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#66bb6a';
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

// 🌍 Reaktion auf Resize
window.addEventListener('resize', () => {
  resizeCanvas();
  createNodes(50);
});

// 🌟 Initialisierung
resizeCanvas();
createNodes(50);
draw();
