const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let w, h, particles;
const numParticles = 100;
const maxDist = 150;

function init() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  particles = Array.from({ length: numParticles }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 1.2,
    dy: (Math.random() - 0.5) * 1.2,
  }));
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  // Arka plan hafif koyu ve saydam
  ctx.fillStyle = "rgba(10, 12, 20, 0.9)";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    // Parlayan noktalar
    const glow = Math.sin(Date.now() / 500 + i) * 0.5 + 0.5;
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 6);
    gradient.addColorStop(0, `rgba(0, 191, 255, ${0.8 + glow * 0.2})`);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.arc(p.x, p.y, p.r + 1, 0, Math.PI * 2);
    ctx.fill();

    // Bağlantı çizgileri
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.7;
        ctx.strokeStyle = `rgba(0, 200, 255, ${alpha})`;
        ctx.lineWidth = 1;

        // Parlama efekti (gölge)
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(0, 200, 255, 0.8)";

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    // Hareket
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
  }

  requestAnimationFrame(draw);
}

// Fareyle etkileşim
const mouse = { x: null, y: null, radius: 150 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function repelParticles() {
  particles.forEach((p) => {
    if (mouse.x && mouse.y) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - dist) / mouse.radius;
        p.dx += Math.cos(angle) * force * 0.6;
        p.dy += Math.sin(angle) * force * 0.6;
      }
    }
  });
  requestAnimationFrame(repelParticles);
}

window.addEventListener("resize", init);
init();
draw();
repelParticles();
