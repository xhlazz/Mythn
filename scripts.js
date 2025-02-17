@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

body {
    font-family: 'Press Start 2P', cursive;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #000;
    color: #fff;
    overflow: hidden;
    cursor: crosshair;
}

header {
    background-color: #111;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

#search-bar {
    width: 50%;
    padding: 0.5rem;
    margin: 1rem 0;
    border: 2px solid #333;
    background: #222;
    color: #fff;
    outline: none;
}

#categories {
    width: 20%;
    padding: 1rem;
    background-color: #111;
    margin: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

#categories ul {
    list-style: none;
    padding: 0;
}

#categories li {
    padding: 0.5rem;
    cursor: pointer;
    border-bottom: 1px solid #333;
    color: #fff;
}

#categories li:hover, #categories li.active {
    background-color: #222;
    border-left: 4px solid #ff00ff;
}

#game-list {
    width: 70%;
    padding: 1rem;
    background-color: #111;
    margin: 1rem;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    position: relative;
}

.game-item {
    width: 30%;
    margin: 1rem;
    padding: 1rem;
    border: 2px solid #333;
    border-radius: 10px;
    background-color: #222;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
}

.game-item img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-bottom: 0.5rem;
    border-radius: 10px;
}

.game-item h3, .game-item p {
    margin: 0;
    padding: 0.5rem 0;
}

.game-item::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, red, yellow, green, cyan, blue, magenta, red);
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
}

.game-item:hover::before {
    opacity: 1;
    animation: animateBorder 5s linear infinite;
}

@keyframes animateBorder {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

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
