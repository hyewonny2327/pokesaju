export async function getPokemonsByType(
  pokemonTypes: string[],
  randomPokemonNumber: number
) {
  const pokemons = await Promise.all(
    pokemonTypes.map(async (type) => {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();
      return data.pokemon.map((p: any) => p.pokemon); // name, url
    })
  );
  const results = pokemons.flat();
  return results.sort(() => 0.5 - Math.random()).slice(0, randomPokemonNumber);
}
