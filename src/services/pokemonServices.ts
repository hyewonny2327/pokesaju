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
  const pokemonData: {
    pokemon: PokemonDetail[];
    iljuDetail: IljuDetailType;
  } = await response.json();

  console.log("출력:ㅣ", pokemonData);
  return pokemonData;
}

export async function getTypeImage(types: string[]) {
  const response = await fetch("/api/pokemon/type-image", {
    method: "POST",
    body: JSON.stringify({
      types: types,
    }),
  });
  const typeImages = await response.json();
  return typeImages;
}
