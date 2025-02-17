document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    function createParticle(x, y) {
        const particle = document.createElement('span');
        particle.classList.add('particle');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 2000);
    }

    document.addEventListener('mousemove', (e) => {
        createParticle(e.clientX, e.clientY);
    });
});