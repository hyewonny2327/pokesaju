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
      className="w-[220px] bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_black] p-4 flex flex-col items-center gap-3 transition hover:scale-[1.02] hover:brightness-95"
    >
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-24 h-24 object-contain"
      />
      <div className="text-center font-bold text-base capitalize font-mono tracking-wide">
        {pokemon.name}
      </div>
      <div className="flex gap-2 justify-center">
        {typeImages.map((type, idx) => (
          <img key={idx} src={type} className="w-10 h-auto" />
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
