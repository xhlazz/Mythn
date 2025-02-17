document.addEventListener('DOMContentLoaded', () => {
    const keys = ['ElderOwnerKey', 'JesusFriendMeme'];
    const keyInput = document.getElementById('key-input');
    const submitKey = document.getElementById('submit-key');
    const message = document.getElementById('message');
    const keyEntryContainer = document.getElementById('key-entry-container');
    const mainContent = document.getElementById('main-content');

    // Validate the entered key
    submitKey.addEventListener('click', () => {
        const enteredKey = keyInput.value.trim();
        if (keys.includes(enteredKey)) {
            message.textContent = "Welcome Elder's friends!";
            keyEntryContainer.style.display = 'none';
            mainContent.style.display = 'block';
            fetchGames();
        } else {
            message.textContent = 'Invalid key. Please try again.';
        }
    });

    const gameList = document.getElementById('game-list');
    const searchBar = document.getElementById('search-bar');
    const categoryItems = document.querySelectorAll('#categories li');
    const gameDisplay = document.getElementById('game-display');
    const gameFrame = document.getElementById('game-frame');
    const closeGame = document.getElementById('close-game');
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
                imageUrl: game.background_image,
                gameUrl: `https://example.com/play/${game.slug}` // Replace with actual playable URLs
            }));
            // Manually add Papa's Sushiria
            games.push({
                title: "Papa's Sushiria",
                category: "Simulation",
                imageUrl: 'https://via.placeholder.com/150',
                gameUrl: 'https://www.mathgames.com/play/papas-sushiria'
            });
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
            gameItem.addEventListener('click', () => playGame(game.gameUrl));
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

    function playGame(url) {
        gameFrame.src = url;
        gameDisplay.style.display = 'flex';
    }

    closeGame.addEventListener('click', () => {
        gameFrame.src = '';
        gameDisplay.style.display = 'none';
    });

    searchBar.addEventListener('input', () => filterGames(games));

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            filterGames(games);
        });
    });
});