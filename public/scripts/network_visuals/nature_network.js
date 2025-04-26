// Nature Netzwerk Animation für KNEO 🌿

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('network-visual').appendChild(canvas);

let width, height, nodes;

function resizeCanvas() {
    width = window.innerWidth;
    height = 400; // Höhe deines Netzwerkbereichs
    canvas.width = width;
    canvas.height = height;
}

function createNodes(count) {
    nodes = [];
    for (let i = 0; i < count; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: 2 + Math.random() * 2
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // Linien zwischen nahen Punkten
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.strokeStyle = 'rgba(76, 175, 80, 0.2)'; // sanftes Naturgrün
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Punkte bewegen und pulsieren
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Ränder umkehren
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#66bb6a';
        ctx.fill();
    });

    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createNodes(50); // 50 Punkte neu generieren
});

resizeCanvas();
createNodes(50);
draw();
