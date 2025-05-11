"use client";
import { PokemonDetail } from "@custom-types/pokemonDetail";
import { getTypeImage } from "@services/pokemonServices";
import { useEffect, useState } from "react";

interface PokemonCardProps {
  pokemon: PokemonDetail;
}
function PokemonCard({ pokemon }: PokemonCardProps) {
  const [typeImages, setTypeImages] = useState<string[]>([]);
  useEffect(() => {
    async function getTypes() {
      const types = pokemon.types.map((type: any) => type.type.name);
      const typeImages = await getTypeImage(types);
      console.log(typeImages);
      setTypeImages(typeImages.typeImages);
    }
    getTypes();
  }, []);
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
        {typeImages.map((type: any) => (
          <img src={type} className="w-16 h-auto" />
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
