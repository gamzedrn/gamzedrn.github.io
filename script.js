const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let w, h, particles;
function init() {
  /*Canvas’ın genişliği (width) ve yüksekliği (height) ekran boyutuna göre ayarlanır.*/
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.7,
    dy: (Math.random() - 0.5) * 0.7,
  }));
}
function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#00bfff";
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
  });
  requestAnimationFrame(draw); /*Animasyonu sürekli çalıştırmak*/
}
/*Kullanıcı pencereyi büyütür veya küçültürse, tuvalin boyutu otomatik güncellenir */
window.addEventListener("resize", init);
init();
draw();
