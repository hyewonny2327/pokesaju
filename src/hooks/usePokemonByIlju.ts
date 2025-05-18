"use client";

import {
  getRandomPokemonByIlju,
  getTypeImage,
} from "@services/pokemonServices";
import { useQuery } from "@tanstack/react-query";

export default function usePokemonByIlju(ilju: string) {
  //사주정보를 바탕으로, 포켓몬에 매칭 정보 받아오는 쿼리
  const {
    data: { pokemon: pokemons, iljuDetail } = {},
    refetch: refetchPokemonData,
  } = useQuery({
    queryKey: ["ilju", ilju],
    queryFn: () => getRandomPokemonByIlju(ilju, 6),
    enabled: !!ilju,
  });

  //사주 정보를 바탕으로 포켓몬 타입 이미지 받아오는 쿼리
  const { data: typeImages } = useQuery({
    queryKey: ["ilju-pokemonType", iljuDetail?.types],
    queryFn: () => getTypeImage(iljuDetail?.types),
    enabled: !!iljuDetail?.types,
  });

  return {
    pokemons,
    iljuDetail,
    typeImages,
    refetchPokemonData,
  };
}
