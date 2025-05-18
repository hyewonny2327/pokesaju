"use client";
import Button from "@components/Button";
import Header from "@components/Header";
import PokemonCard from "@components/pokemon/PokemonCard";
import usePokemonByIlju from "@hooks/usePokemonByIlju";

interface ResultPageProps {
  ilju: string;
  username: string;
}
export default function ResultPage({ ilju, username }: ResultPageProps) {
  const { pokemons, iljuDetail, typeImages, refetchPokemonData } =
    usePokemonByIlju(ilju);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 border-t-4 border-black shadow-[inset_0_4px_8px_rgba(0,0,0,0.2)]">
      {/* 상단 헤더 + 배경 */}
      <div className="relative w-full">
        <Header>
          <Button
            onClick={async () => await refetchPokemonData()}
            background="red-500"
          >
            🔁 다시 뽑기
          </Button>
          <Button routerPath="/input" background={"white"}>
            🏠 홈으로
          </Button>
        </Header>
        {/* <img src="/pokeball.svg" className="w-28 h-auto " /> */}
      </div>

      <div className="max-w-xl mt-[72px] mx-auto bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_black] p-6 space-y-4 z-10 relative ">
        <div className="w-full flex justify-center items-center p-4 ">
          <img
            src={`/pokeball_color.svg`}
            alt="pokeball"
            className="w-[180px] h-auto"
          />
        </div>
        <div className="flex justify-center gap-2">
          {Array.isArray(typeImages) &&
            typeImages.map((img, idx) => (
              <img key={idx} src={img} className="w-16 h-auto" />
            ))}
        </div>
        <div className="text-center text-gray-800 text-base font-mono tracking-wide space-y-1">
          {iljuDetail &&
            iljuDetail.trait.map((trait, idx) => <p key={idx}>{trait}</p>)}
        </div>
      </div>

      <div className="w-full mx-auto mt-12 px-4">
        <h2 className="text-xl font-bold text-center mb-4  border-black pb-2 font-mono tracking-widest">
          {username}님과 어울리는 포켓몬
        </h2>
        <div className="flex flex-wrap gap-8 items-center w-full justify-center">
          {pokemons?.map((pokemon) => (
            <PokemonCard key={pokemon.url} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
}
