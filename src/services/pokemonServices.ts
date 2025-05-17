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

  return pokemonData;
}

export async function getTypeImage(
  types: string[] | undefined
): Promise<string[]> {
  if (!types) throw new Error("types가 정의되지 않았습니다.");
  const response = await fetch("/api/pokemon/type-image", {
    method: "POST",
    body: JSON.stringify({
      types: types,
    }),
  });
  const typeImages: string[] = await response.json();
  return typeImages;
}
