import React, { useEffect, useState } from 'react';
import './App.css';

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

const App = () => {
    const [allPokemon, setAllPokemon] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonList = async () => {
            const pokemonList = [];
            setLoading(true);
            for (let i = 1; i <= 250; i++) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                    const pokemon = await response.json();
                    
                    const speciesResponse = await fetch(pokemon.species.url);
                    const speciesData = await speciesResponse.json();
                    let descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "es");
                    let description = descriptionEntry ? descriptionEntry.flavor_text.replace(/[\n\f]/g, " ") : "Descripción no disponible.";

                    const type = pokemon.types[0].type.name;
                    const bgColor = typeColors[type] || "#1E3A8A"; 

                    pokemonList.push({
                        name: pokemon.name,
                        weight: pokemon.weight / 10, 
                        height: pokemon.height / 10,
                        image: pokemon.sprites.other["official-artwork"].front_default,
                        description,
                        bgColor,
                        type
                    });
                } catch (error) {
                    console.error("Error al obtener Pokémon: " + error);
                }
            }
            setAllPokemon(pokemonList);
            setLoading(false);
        };

        fetchPokemonList();
    }, []);

    const filteredPokemon = allPokemon.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className="bg-black min-h-screen flex flex-col items-center">
            <div className="header-container w-full text-center">
                <h1 className="text-4xl font-bold mb-2">Tú lista de Pokemones</h1>
                <h2 className="text-2xl font-bold mb-6">¡Empecemos esta aventura pokemón!</h2>
                
                <div className="search-container px-4">
                    <input
                        type="text"
                        id="searchInput"
                        placeholder="Busca tu Pokémon..."
                        className="focus:outline-none focus:ring-4 focus:ring-green-400 shadow-lg"
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </div>
            
            {loading ? (
                <div className="loading text-center text-white text-xl mt-12">
                    Cargando Pokémones...
                </div>
            ) : (
                <div id="pokemonList">
                    {filteredPokemon.map((pokemon, index) => (
                        <div key={index} className="card-container" data-name={pokemon.name.toLowerCase()}>
                            <div className={`card pokemon-${pokemon.type}`} data-name={pokemon.name.toLowerCase()} onClick={(e) => e.currentTarget.classList.toggle("flipped")}>
                                <div className="card-front">
                                    <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                                    <h2 className="text-xl font-bold">{pokemon.name.toUpperCase()}</h2>
                                    <p>Peso: {pokemon.weight} kg</p>
                                    <p>Altura: {pokemon.height} m</p>
                                </div>
                                <div className="card-back" style={{ backgroundColor: pokemon.bgColor }}>
                                    <p>{pokemon.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;