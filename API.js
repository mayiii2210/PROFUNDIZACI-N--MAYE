async function fetchPokemonList() {
    const pokemonList = document.getElementById("pokemonList");
    for (let i = 1; i <= 250; i++) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const pokemon = await response.json();
            const card = document.createElement("div");
            card.className =
                "bg-white rounded-lg p-4 text-center hover:scale-105 transition transform duration-300 border-2 border-blue-600";
            card.setAttribute("data-name", pokemon.name);

            const types = pokemon.types
            .map(
              (t) =>
                `<span class="bg-blue-100 text-blue-700 px-2 rounded mx-1">${t.type.name.toUpperCase()}</span>`
            )
            .join(" ");

            card.innerHTML = `
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="w-32 mx-auto mb-4" />
                <h2 class="text-xl font-bold">${pokemon.name.toUpperCase()}</h2>
                <p>Peso: ${pokemon.weight}</p>
                <p>Altura: ${pokemon.height}</p>
                <p class="text-black-700">Ataque: ${pokemon.stats[1].base_stat}</p>
                <p class="text-black-700">Defensa: ${pokemon.stats[2].base_stat}</p>
                <div class="mt-2">${types}</div>
            `;
            pokemonList.appendChild(card);
        } catch (error) {
            console.error("Error al obtener Pokemon:" + error);
        }
    }
}

function filterPokemon() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll("#pokemonList > div");

    cards.forEach((card) => {
        const name = card.getAttribute("data-name");
        if (name.includes(searchInput)) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}

fetchPokemonList();
