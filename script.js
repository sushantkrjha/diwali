const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random() * 5 - 2.5;
        this.color = color;
        this.opacity = 1;
        this.gravity = 0.05;
        this.decay = Math.random() * 0.015 + 0.003;
    }

   
    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.decay;
    }

    
    draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const fireworks = [];


function createFirework() {
    const colors = [
        '255, 99, 71',  
        '135, 206, 250',
        '238, 130, 238', 
        '255, 215, 0'   
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;


    for (let i = 0; i < 100; i++) {
        fireworks.push(new Particle(x, y, color));
    }
}


function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    fireworks.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.opacity <= 0) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}


setInterval(createFirework, 1000);
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


const textElement = document.getElementById('diwaliText');
let angle = 0; 
const radius = 100; 

function moveText() {
    
    const colors = ['#FFD700', '#FF6347', '#32CD32', '#1E90FF', '#FF69B4'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    textElement.style.color = color;

   
    const x = (canvas.width / 2) + radius * Math.cos(angle) - textElement.clientWidth / 2;
    const y = (canvas.height / 2) + radius * Math.sin(angle) - textElement.clientHeight / 2;

   
    textElement.style.left = `${x}px`;
    textElement.style.top = `${y}px`;

    angle += 0.05; 
    requestAnimationFrame(moveText);
}

moveText();
