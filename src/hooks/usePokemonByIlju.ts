"use client";
import { PokemonDetail } from "@custom-types/pokemonDetail";
import { SajuProfile } from "@custom-types/sajuProfile";
import { IljuDetailType } from "@lib/pokemon/getIljuDetail";
import { getIljuByBirth } from "@lib/sajuUtils";
import {
  getRandomPokemonByIlju,
  getTypeImage,
} from "@services/pokemonServices";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export default function usePokemonByIlju(ilju: string) {
  //사주정보를 바탕으로, 포켓몬에 매칭 정보 받아오는 쿼리
  const {
    data: { pokemon: pokemons, iljuDetail } = {},
    refetch: refetchPokemonData,
  } = useQuery({
    queryKey: ["ilju", ilju],
    queryFn: () => getRandomPokemonByIlju(ilju),
    enabled: !!ilju,
  });

  //사주 정보를 바탕으로 포켓몬 타입 이미지 받아오는 쿼리
  const { data: typeImages } = useQuery({
    queryKey: ["ilju-pokemonType", iljuDetail?.types],
    queryFn: () => getTypeImage(iljuDetail?.types),
    enabled: !!iljuDetail?.types,
  });

  useEffect(() => {
    console.log("hook 실행", ilju);
  }, [ilju]);

  return {
    pokemons,
    iljuDetail,
    typeImages,
    refetchPokemonData,
  };
}
