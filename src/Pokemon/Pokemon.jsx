import { useState, useEffect } from "react";
import useDebounce from "../utils.js/debounce";
import PokemonItem from "../PokemonItem/PokemonItem";
import "./Pokemon.css";

const PokemonSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [error, setError] = useState(null);

  const debouncedInput = useDebounce(searchInput, 1000);

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    if (debouncedInput) {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(debouncedInput.toLowerCase())
      );
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon(pokemonList);
    }
  }, [debouncedInput, pokemonList]);

  const fetchPokemonDetail = async (pokemon) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    return data;
  };
  const fetchAllPokemon = async () => {
    try {
      setError(null);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=60`
      );
      const data = await response.json();

      const pokemonDetail = data.results.map(fetchPokemonDetail);
      const detailResponse = await Promise.all(pokemonDetail);
      setPokemonList(detailResponse);
      setFilteredPokemon(detailResponse);
      console.log(detailResponse);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch Pokémon data");
    }
  };

  return (
    <div>
      <h1 className="pokemon__heading">DevPokémon</h1>
      <div className="pokemon__search">
        <input
          className="pokemon__search__input"
          type="text"
          placeholder="Search Pokémon"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {error && <p className="error__message">{error}</p>}
      <div className="pokemon__list">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => {
            return <PokemonItem key={pokemon.id} data={pokemon} />;
          })
        ) : (
          <p className="pokemon__message">No Pokémon found</p>
        )}
      </div>
    </div>
  );
};

export default PokemonSearch;
