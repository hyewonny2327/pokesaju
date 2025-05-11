type pokemonType = {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
};

export async function getPokemonsByType(
  pokemonTypes: string[],
  randomPokemonNumber: number
) {
  const pokemonTypeData = await Promise.all(
    pokemonTypes.map(async (type) => {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();
      const pokemonList = data.pokemon.map((p: pokemonType) => p.pokemon);
      return { pokemonList };
    })
  );
  const allPokemons = pokemonTypeData.flatMap((d) => d.pokemonList);

  const randomPokemons = allPokemons
    .sort(() => 0.5 - Math.random())
    .slice(0, randomPokemonNumber);

  return {
    pokemons: randomPokemons,
  };
}
