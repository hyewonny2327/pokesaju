"use client";
import { PokemonDetail } from "@custom-types/pokemonDetail";
import { getTypeImage } from "@services/pokemonServices";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface PokemonCardProps {
  pokemon: PokemonDetail;
}
function PokemonCard({ pokemon }: PokemonCardProps) {
  const types = pokemon.types.map((type: any) => type.type.name);
  const { data: typeImages } = useQuery({
    queryKey: ["pokemonType", pokemon],
    queryFn: () => getTypeImage(types),
    enabled: !!types,
  });

  return (
    <div
      key={pokemon.url}
      className="bg-[#E5E5E5] rounded-2xl p-4 flex flex-col items-center gap-2 min-w-[210px] w-fit h-fit"
    >
      <div className="flex flex-row w-full justify-start align-center border-red">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-24 h-24 object-contain"
        />
        <div className="text-sm font-semibold capitalize flex flex-col justify-center align-center">
          {pokemon.name}
        </div>
      </div>
      <div className="flex gap-2">
        {Array.isArray(typeImages) &&
          typeImages?.map((type: any) => (
            <img src={type} className="w-16 h-auto" />
          ))}
      </div>
    </div>
  );
}

export default PokemonCard;
