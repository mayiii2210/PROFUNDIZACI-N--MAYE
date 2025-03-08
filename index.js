document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    const likeButton = document.getElementById("like");
    const dislikeButton = document.getElementById("dislike");
    const fightButton = document.getElementById("fight");
    const likedList = document.getElementById("liked-list");
    let characters = [];
    let currentIndex = 0;
    let likedCharacters = [];

    fetch("https://rickandmortyapi.com/api/character")
        .then((response) => response.json())
        .then((data) => {
            characters = data.results;
            displayCharacter();
        });

    function displayCharacter() {
        if (currentIndex >= characters.length) {
            cardContainer.innerHTML = "<p class='text-xl'>No more characters!</p>";
            return;
        }

        const character = characters[currentIndex];
        cardContainer.innerHTML = `
        <div class="character-card card-3d" onclick="showCharacterName('${character.name}')">
            <img src="${character.image}" alt="${character.name}" class="w-48 h-48 object-cover rounded-full mx-auto shadow-lg">
            <h2 class="text-xl font-semibold mt-2">${character.name}</h2>
            <p class="text-gray-400">${character.species} - ${character.status}</p>
        </div>
      `;
    }

    function showCharacterName(name) {
        alert(`Este personaje es: ${name}`);
    }

    function swipe(direction) {
        if (currentIndex >= characters.length) return;

        if (direction === "like") {
            likedCharacters.push(characters[currentIndex]);
            updateLikedList();
        }
        currentIndex++;
        displayCharacter();
    }

    function battle() {
        if (likedCharacters.length < 2) {
            alert("Agrega al menos dos personajes para iniciar la batalla!");
            return;
        }
        let fighter1 = likedCharacters[Math.floor(Math.random() * likedCharacters.length)];
        let fighter2 = likedCharacters[Math.floor(Math.random() * likedCharacters.length)];
        while (fighter1 === fighter2) {
            fighter2 = likedCharacters[Math.floor(Math.random() * likedCharacters.length)];
        }

        cardContainer.innerHTML = `
        <div class="flex flex-col items-center space-y-4">
            <div class="fighter text-center">
                <img src="${fighter1.image}" alt="${fighter1.name}" class="rounded-full w-32 h-32 shadow-lg">
                <p class="text-white font-bold">${fighter1.name}</p>
            </div>
            <p class="text-4xl text-white">⚔️</p>
            <div class="fighter text-center">
                <img src="${fighter2.image}" alt="${fighter2.name}" class="rounded-full w-32 h-32 shadow-lg">
                <p class="text-white font-bold">${fighter2.name}</p>
            </div>
        </div>
      `;

        setTimeout(() => {
            alert(`${Math.random() > 0.5 ? fighter1.name : fighter2.name} wins!`);
            displayCharacter();
        }, 1500);
    }

    function updateLikedList() {
        likedList.innerHTML = likedCharacters
            .map((c, index) => `
                <li class='text-green-400 font-bold flex justify-between items-center'>
                    ${c.name} 
                    <button onclick="removeCharacter(${index})" class="bg-red-500 text-white px-2 py-1 rounded text-sm">❌</button>
                </li>`)
            .join("");
    }

    window.removeCharacter = function(index) {
        likedCharacters.splice(index, 1);
        updateLikedList();
    };

    likeButton.addEventListener("click", () => swipe("like"));
    dislikeButton.addEventListener("click", () => swipe("dislike"));
    fightButton.addEventListener("click", battle);
});
