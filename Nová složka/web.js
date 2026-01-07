document.addEventListener('DOMContentLoaded', () => {
    // 1. Glitch Effect (Moved from inline)
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        setInterval(() => {
            glitchText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                glitchText.style.transform = 'translate(0, 0)';
            }, 50);
        }, 2000);
    }

    // 2. Chakra Scroll Bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'chakra-scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // 3. Typewriter Effect for Bio
    const bioParagraphs = document.querySelectorAll('.bio-text p');
    
    // Intersection Observer to start typing when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const p = entry.target;
                const text = p.getAttribute('data-text');
                p.textContent = ''; // Clear text
                p.style.opacity = '1'; // Make visible
                typeWriter(p, text, 0);
                observer.unobserve(p); // Only run once
            }
        });
    }, { threshold: 0.5 });

    bioParagraphs.forEach(p => {
        // Store original text and clear it
        p.setAttribute('data-text', p.innerText.trim());
        p.style.opacity = '0'; // Hide initially
        observer.observe(p);
    });

    function typeWriter(element, text, i) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeWriter(element, text, i + 1), 20); // Typing speed
        }
    }
});
