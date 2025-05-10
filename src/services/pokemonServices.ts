import { PokemonDetail } from "@custom-types/pokemonDetail";
import { IljuDetailType } from "@lib/pokemon/getIljuDetail";

export async function getRandomPokemonByIlju(ilju: string) {
  const response = await fetch("/api/pokemon/pokemon-by-ilju", {
    method: "POST",
    body: JSON.stringify({
      ilju: ilju,
      randomPokemonNumber: 6,
    }),
  });
  const pokemonData: { pokemon: PokemonDetail[]; iljuDetail: IljuDetailType } =
    await response.json();

  return pokemonData;
}
