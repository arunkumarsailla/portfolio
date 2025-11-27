// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    // Animate hamburger
    const bars = document.querySelectorAll('.bar');
    if (mobileMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        bars[1].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.transform = 'none';
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.transform = 'none';
    });
});

// Hero Animation (Canvas 3D Simulation)
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particles = [];
const particleCount = window.innerWidth < 768 ? 50 : 100; // Fewer particles on mobile

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 2; // Depth
        this.size = Math.random() * 3;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + this.z * 0.2})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (this.z + 0.5), 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation Loop
function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateCanvas);
}
animateCanvas();

// Scroll-based "Scrubbing" effect on Canvas
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    particles.forEach(p => {
        p.x += (Math.random() - 0.5) * (scrollY * 0.01);
    });
});

// Hero Text Reveal
gsap.to('.hero-title', { opacity: 1, y: 0, duration: 1, delay: 0.5 });
gsap.to('.hero-subtitle', { opacity: 1, y: 0, duration: 1, delay: 0.8 });
gsap.to('.hero-desc', { opacity: 1, y: 0, duration: 1, delay: 1.1 });

// Universal Animations (Works on Desktop & Mobile)

// Sticky About Section
const aboutSection = document.querySelector('.scroll-section');
const textBlocks = document.querySelectorAll('.scroll-text-block');
const profileImg = document.querySelector('.about-visual');

ScrollTrigger.create({
    trigger: aboutSection,
    start: "top top",
    end: "bottom bottom",
    pin: ".sticky-wrapper",
    scrub: true,
});

gsap.to(profileImg, {
    scale: 1,
    opacity: 1,
    scrollTrigger: {
        trigger: aboutSection,
        start: "top center",
        end: "center center",
        scrub: true
    }
});

textBlocks.forEach((block, i) => {
    gsap.to(block, {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: aboutSection,
            start: `top+=${i * 30}% top`,
            end: `top+=${(i * 30) + 20}% top`,
            toggleActions: "play reverse play reverse",
            scrub: true
        }
    });

    if (i < textBlocks.length - 1) {
        gsap.to(block, {
            opacity: 0,
            scrollTrigger: {
                trigger: aboutSection,
                start: `top+=${(i * 30) + 25}% top`,
                end: `top+=${(i * 30) + 35}% top`,
                scrub: true
            }
        });
    }
});

// Horizontal Scroll Projects
const horizontalSection = document.querySelector('.horizontal-section');
const horizontalContent = document.querySelector('.horizontal-content');

gsap.to(horizontalContent, {
    x: () => -(horizontalContent.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
        trigger: horizontalSection,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: ".horizontal-wrapper",
    }
});

// Parallax Skills
gsap.utils.toArray('.skill-item').forEach(item => {
    const speed = item.getAttribute('data-speed');
    gsap.to(item, {
        y: -50 * speed,
        scrollTrigger: {
            trigger: "#skills",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const toggleIcon = themeToggle.querySelector('.toggle-icon');
const htmlElement = document.documentElement;

// Check for saved user preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    toggleIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}
