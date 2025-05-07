import { PokemonDetail } from "@custom-types/pokemonDetail";

interface PokemonCardProps {
  pokemon: PokemonDetail;
}
function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div
      key={pokemon.url}
      className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center gap-2"
    >
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-24 h-24 object-contain"
      />
      <div className="text-lg font-semibold capitalize">{pokemon.name}</div>
      <div className="flex gap-2">
        {pokemon.types.map((type: any) => (
          <span
            key={type.type.name}
            className="px-2 py-1 bg-gray-100 text-sm rounded-full text-gray-600"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
