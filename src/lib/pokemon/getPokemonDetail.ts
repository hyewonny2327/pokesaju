export async function getPokemonDetail(
  pokemonList: {
    name: string;
    url: string;
  }[]
) {
  const details = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const { species, sprites, types } = await res.json();
      console.log("디테일 정보", species, sprites, types);
      return { ...species, sprites, types };
    })
  );

  return [...details];
}
