let allPokemon = []; 

async function fetchPokemonList() {
    const pokemonList = document.getElementById("pokemonList");

    for (let i = 1; i <= 250; i++) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const pokemon = await response.json();
            
            const speciesResponse = await fetch(pokemon.species.url);
            const speciesData = await speciesResponse.json();
            let descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "es");
            let description = descriptionEntry ? descriptionEntry.flavor_text.replace(/[\n\f]/g, " ") : "Descripción no disponible.";

            const type = pokemon.types[0].type.name;
            const typeColors = {
                fire: "#FF5733",
                water: "#3498DB",
                grass: "#2ECC71",
                electric: "#F1C40F",
                ice: "#76D7C4",
                fighting: "#D35400",
                poison: "#8E44AD",
                ground: "#E67E22",
                flying: "#85C1E9",
                psychic: "#E84393",
                bug: "#27AE60",
                rock: "#A04000",
                ghost: "#6C3483",
                dragon: "#641E16",
                dark: "#2C3E50",
                steel: "#95A5A6",
                fairy: "#FADBD8",
                normal: "#BDC3C7"
            };
            const bgColor = typeColors[type] || "#1E3A8A"; 

            const cardContainer = document.createElement("div");
            cardContainer.className = "card-container";
            cardContainer.setAttribute("data-name", pokemon.name.toLowerCase()); // Para el filtrado

            const card = document.createElement("div");
            card.className = `card pokemon-${type}`;
            card.setAttribute("data-name", pokemon.name.toLowerCase());

            card.addEventListener("click", () => {
                card.classList.toggle("flipped");
            });

            const cardFront = document.createElement("div");
            cardFront.className = "card-front";
            cardFront.innerHTML = `
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="pokemon-image" />
                <h2 class="text-xl font-bold">${pokemon.name.toUpperCase()}</h2>
                <p>Peso: ${pokemon.weight}</p>
                <p>Altura: ${pokemon.height}</p>
            `;

            const cardBack = document.createElement("div");
            cardBack.className = "card-back";
            cardBack.style.backgroundColor = bgColor;
            cardBack.innerHTML = `<p>${description}</p>`;

            card.appendChild(cardFront);
            card.appendChild(cardBack);
            cardContainer.appendChild(card);
            pokemonList.appendChild(cardContainer);

            allPokemon.push(cardContainer);
        } catch (error) {
            console.error("Error al obtener Pokémon: " + error);
        }
    }
}


function filterPokemon() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    allPokemon.forEach(card => {
        const name = card.getAttribute("data-name");
        if (name.includes(searchInput)) {
            card.style.display = "flex"; 
        } else {
            card.style.display = "none"; 
        }
    });
}

fetchPokemonList();
