document.addEventListener('DOMContentLoaded', () => {
    const games = [
        { title: 'Game 1', category: 'action', imageUrl: 'path/to/image1.jpg' },
        { title: 'Game 2', category: 'adventure', imageUrl: 'path/to/image2.jpg' },
        { title: 'Game 3', category: 'rpg', imageUrl: 'path/to/image3.jpg' },
        { title: 'Game 4', category: 'sports', imageUrl: 'path/to/image4.jpg' },
        { title: 'Game 5', category: 'action', imageUrl: 'path/to/image5.jpg' },
        // Add more games as needed
    ];

    const gameList = document.getElementById('game-list');
    const searchBar = document.getElementById('search-bar');
    const categoryItems = document.querySelectorAll('#categories li');

    function displayGames(filteredGames) {
        gameList.innerHTML = '';
        filteredGames.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.classList.add('game-item');
            gameItem.innerHTML = `
                <img src="${game.imageUrl}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p>Category: ${game.category}</p>
            `;
            gameList.appendChild(gameItem);
        });
    }

    function filterGames() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedCategory = document.querySelector('#categories li.active')?.dataset.category || 'all';
        
        const filteredGames = games.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        
        displayGames(filteredGames);
    }

    searchBar.addEventListener('input', filterGames);

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            filterGames();
        });
    });

    displayGames(games);
});
/* Add this at the end of styles.css */
@keyframes particleAnimation {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0); opacity: 0; }
}

.particle {
    position: absolute;
    width: 10px;
    height: 10px;
    background: radial-gradient(circle, rgba(255,0,150,1) 0%, rgba(255,204,0,1) 100%);
    border-radius: 50%;
    pointer-events: none;
    animation: particleAnimation 2s linear forwards;
}
