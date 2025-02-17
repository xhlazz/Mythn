document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const colors = ['#FF00FF', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF'];

    function createParticle(x, y) {
        const particle = document.createElement('span');
        particle.classList.add('particle');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1500);
    }

    document.addEventListener('mousemove', (e) => {
        createParticle(e.clientX, e.clientY);
    });
});