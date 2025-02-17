document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('game-list');
    const searchBar = document.getElementById('search-bar');
    const categoryItems = document.querySelectorAll('#categories li');
    let games = [];

    // Fetch games from RAWG API
    async function fetchGames() {
        try {
            const apiKey = '430631d81f7d43c38513f9724436a1f5'; // Your RAWG API key
            const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
            const data = await response.json();
            games = data.results.map(game => ({
                title: game.name,
                category: game.genres.map(genre => genre.name).join(', '),
                imageUrl: game.background_image
            }));
            displayGames(games);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    function displayGames(games) {
        gameList.innerHTML = '';
        games.forEach(game => {
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
            const matchesCategory = selectedCategory === 'all' || game.category.toLowerCase().includes(selectedCategory);
            return matchesSearch && matchesCategory;
        });
        
        displayGames(filteredGames);
    }

    searchBar.addEventListener('input', () => filterGames(games));

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            filterGames(games);
        });
    });

    fetchGames();
});
