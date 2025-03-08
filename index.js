document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
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
        const hoverColor = getColorFromId(character.id); // Obtener color único

        cardContainer.innerHTML = `
            <div id="character-card" class="cursor-pointer relative w-full flex flex-col items-center p-4 bg-[#0f172a] rounded-2xl shadow-lg transition-transform duration-300 ease-in-out transform perspective-1000 border border-green-500" draggable="true">
                <img src="${character.image}" alt="${character.name}" class="w-48 h-48 object-cover rounded-full mx-auto shadow-lg transition-transform duration-300 ease-in-out hover:scale-110">
                <h2 class="text-xl font-semibold mt-2 text-green-400">${character.name}</h2>
                <p class="text-gray-400">${character.species} - ${character.status}</p>
            </div>
        `;

        const card = document.getElementById("character-card");
        card.style.setProperty("--hover-color", hoverColor);
        card.style.transition = "box-shadow 0.3s ease-in-out";
        
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = `0 0 30px ${hoverColor}`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "none";
        });

        add3DEffect();
        addDragFunctionality();
    }

    // Función para generar color basado en ID del personaje
    function getColorFromId(id) {
        const colors = ["#ff5733", "#33ff57", "#3357ff", "#f4d03f", "#9b59b6", "#e74c3c"];
        return colors[id % colors.length]; // Asigna un color cíclicamente
    }

    function add3DEffect() {
        const card = document.getElementById("character-card");
        card.addEventListener("mousemove", (e) => {
            let { offsetX, offsetY } = e;
            let xRotation = (offsetY / card.offsetHeight - 0.5) * 30;
            let yRotation = (offsetX / card.offsetWidth - 0.5) * 30;

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
        });
    }

    function addDragFunctionality() {
        const characterCard = document.getElementById("character-card");
        characterCard.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text", currentIndex);
        });
    }

    document.getElementById("like-zone").addEventListener("dragover", (e) => e.preventDefault());
    document.getElementById("dislike-zone").addEventListener("dragover", (e) => e.preventDefault());

    document.getElementById("like-zone").addEventListener("drop", () => swipe("like"));
    document.getElementById("dislike-zone").addEventListener("drop", () => swipe("dislike"));

    function swipe(direction) {
        if (currentIndex >= characters.length) return;

        let character = { ...characters[currentIndex], liked: direction === "like" };
        likedCharacters.push(character);
        updateLikedList();
        
        currentIndex++;
        displayCharacter();
    }

    function updateLikedList() {
        likedList.innerHTML = likedCharacters
            .map((c, index) => `
                <li class='flex justify-between items-center p-2 rounded-lg ${c.liked ? "bg-green-600" : "bg-red-600"}'>
                    <span>${c.name}</span>
                    <button onclick="removeCharacter(${index})" class="bg-gray-800 text-white px-2 py-1 rounded text-sm">❌</button>
                </li>`)
            .join("");
    }

    window.removeCharacter = function(index) {
        likedCharacters.splice(index, 1);
        updateLikedList();
    };

    fightButton.addEventListener("click", battle);

    function battle() {
        const likedFighters = likedCharacters.filter(c => c.liked);
        if (likedFighters.length < 2) {
            alert("Agrega al menos dos personajes en 'Like' para iniciar la batalla!");
            return;
        }
        let fighter1 = likedFighters[Math.floor(Math.random() * likedFighters.length)];
        let fighter2 = likedFighters[Math.floor(Math.random() * likedFighters.length)];
        while (fighter1 === fighter2) {
            fighter2 = likedFighters[Math.floor(Math.random() * likedFighters.length)];
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
});
