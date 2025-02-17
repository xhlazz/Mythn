document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const colors = ['#FF00FF', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF'];
    let lastX = 0;
    let lastY = 0;

    function createParticle(x, y) {
        const particle = document.createElement('span');
        particle.classList.add('particle');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = `linear-gradient(45deg, ${colors.join(', ')})`;
        body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1500);
    }

    document.addEventListener('mousemove', (e) => {
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const numParticles = Math.floor(distance / 5);

        for (let i = 0; i < numParticles; i++) {
            const t = i / numParticles;
            const x = lastX + t * deltaX;
            const y = lastY + t * deltaY;
            createParticle(x, y);
        }

        lastX = e.clientX;
        lastY = e.clientY;
    });
});