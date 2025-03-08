
async function fetchPokemonList() {
    const pokemonList = document.getElementById("pokemonList");
    for (let i = 1; i <= 250; i++) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const pokemon = await response.json();
            
            const speciesResponse = await fetch(pokemon.species.url);
            const speciesData = await speciesResponse.json();
            const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
            const evolutionChainData = await evolutionChainResponse.json();

            const getEvolutionStage = (chain, pokemonName) => {
                if (chain.species.name === pokemonName) return chain.evolves_to;
                for (const evolution of chain.evolves_to) {
                    const result = getEvolutionStage(evolution, pokemonName);
                    if (result) return result;
                }
                return null;
            };

            const evolutions = getEvolutionStage(evolutionChainData.chain, pokemon.name);
            const evolutionName = evolutions && evolutions.length > 0 ? evolutions[0].species.name : "No Evolution";

            const card = document.createElement("div");
            card.className =
                "bg-white rounded-lg p-4 text-center hover:scale-105 transition transform duration-300 border-2 border-blue-600";
            card.setAttribute("data-name", pokemon.name);
            card.setAttribute("onclick", `showEvolution('${pokemon.name}', '${evolutionName}')`);

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
            console.error("Error al obtener Pokemon: " + error);
        }
    }
}

async function showEvolution(name, evolutionName) {
    if (evolutionName === "No Evolution") {
        alert(`${name} no tiene evolución`);
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionName}`);
        const evolutionData = await response.json();

        const evolutionImage = evolutionData.sprites.other["official-artwork"].front_default;

        const modal = document.createElement("div");
        modal.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50";
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8">
                <img src="${evolutionImage}" alt="${evolutionName}" class="w-32 mx-auto mb-4 animate-bounce" />
                <h2 class="text-xl font-bold text-center">${evolutionName.toUpperCase()}</h2>
                <button class="mt-4 bg-red-500 text-white px-4 py-2 rounded" onclick="closeModal()">Cerrar</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    } catch (error) {
        console.error("Error al obtener evolución: " + error);
    }
}

function closeModal() {
    const modal = document.querySelector(".fixed.inset-0");
    modal.remove();
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