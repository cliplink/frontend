// A lightweight confetti implementation
export function triggerConfetti() {
  const colors = ['#FF6B9D', '#C44BFF', '#4B7BFF', '#FFD93D', '#6BCB77'];
  const particleCount = 100;
  const angle = 90;
  const spread = 70;
  const startVelocity = 45;
  const decay = 0.9;
  const gravity = 1;
  const ticks = 200;
  const zIndex = 100;
  
  // Use window check for SSR safety
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = zIndex.toString();
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const particles: any[] = [];
  
  class Particle {
    x: number;
    y: number;
    wobble: number;
    wobbleSpeed: number;
    velocity: number;
    angle2D: number;
    tiltAngle: number;
    color: string;
    decay: number;
    drift: number;
    random: number;
    tilt: number;
    scale: number;
    tick: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.wobble = Math.random() * 10;
      this.wobbleSpeed = Math.min(0.11, Math.random() * 0.1 + 0.05);
      this.velocity = startVelocity * 0.5 + Math.random() * startVelocity;
      this.angle2D = -angle + (0.5 * spread - Math.random() * spread);
      this.tiltAngle = Math.random() * Math.PI;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.decay = decay;
      this.drift = Math.random();
      this.random = Math.random() + 5;
      this.tilt = Math.sin(this.tiltAngle) * 15;
      this.scale = Math.random() * 0.5 + 0.5;
      this.tick = 0;
    }
    update() {
      this.velocity *= this.decay;
      this.x += Math.cos(this.angle2D * Math.PI / 180) * this.velocity + this.drift;
      this.y += Math.sin(this.angle2D * Math.PI / 180) * this.velocity + gravity;
      this.wobble += this.wobbleSpeed;
      this.tilt = Math.sin(this.wobble) * 15;
      this.tick++;
    }
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.wobble + this.random * this.tilt, this.y + this.random * this.tilt + this.random);
      ctx.lineTo(this.x + this.wobble, this.y + this.random);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(width / 2, height / 2));
  }
  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, index) => {
      p.update();
      p.draw(ctx);
      if (p.tick > ticks) {
        particles.splice(index, 1);
      }
    });
    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }
  }
  animate();

  // Handle resize
  const resizeHandler = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };
  
  window.addEventListener('resize', resizeHandler);
  // Cleanup listener when animation is done (imperfect but better than leaking)
  setTimeout(() => window.removeEventListener('resize', resizeHandler), 5000);
}