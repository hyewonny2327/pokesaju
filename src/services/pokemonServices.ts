import { PokemonDetail } from "@custom-types/pokemonDetail";

export async function getRandomPokemonByIlju(ilju: string) {
  const response = await fetch("/api/pokemon/pokemon-by-ilju", {
    method: "POST",
    body: JSON.stringify({
      ilju: ilju,
      randomPokemonNumber: 6,
    }),
  });
  const pokemonData: PokemonDetail[] = await response.json();

  return pokemonData;
}
