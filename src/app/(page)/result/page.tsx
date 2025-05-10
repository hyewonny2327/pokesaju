"use client";
import PokemonCard from "@components/pokemon/PokemonCard";
import { PokemonDetail } from "@custom-types/pokemonDetail";
import { SajuProfile } from "@custom-types/sajuProfile";
import { IljuDetailType } from "@lib/pokemon/getIljuDetail";
import { getIljuByBirth } from "@lib/sajuUtils";
import { getRandomPokemonByIlju } from "@services/pokemonServices";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function ResultPage() {
  const [sajuInfo, setSajuInfo] = useState<SajuProfile | null>(null);
  const [pokemons, setPokemons] = useState<PokemonDetail[] | null>(null);
  const [iljuDetail, setIljuDetail] = useState<IljuDetailType | null>(null);
  const router = useRouter();
  const ilju = useMemo(() => {
    if (!sajuInfo) return "";
    const { year, month, day } = sajuInfo.birthday;
    return getIljuByBirth(`${year}-${month}-${day}`);
  }, [sajuInfo]);

  useEffect(() => {
    //전역상태로 사용하는 방법으로 수정 필요
    const data = localStorage.getItem("userInfo");
    if (data) {
      const userData = JSON.parse(data);
      setSajuInfo(userData);
    }
  }, []);
  useEffect(() => {
    if (ilju) {
      fetchPokemonData();
    }
  }, [ilju]);

  async function fetchPokemonData() {
    if (ilju) {
      //리액트 쿼리로 수정 필요
      const pokemonData = await getRandomPokemonByIlju(ilju);
      console.log(pokemonData.iljuDetail);
      setPokemons(pokemonData.pokemon);
      setIljuDetail(pokemonData.iljuDetail);
    }
  }
  useEffect(() => {
    console.log(iljuDetail);
  }, [iljuDetail]);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <div className="text-center text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">
        {sajuInfo?.name}님의 성향은!
      </div>

      {iljuDetail?.types && (
        <div className="mb-10 text-center text-sm font-medium text-blue-600 space-x-2">
          {iljuDetail.types.map((type, idx) => (
            <span
              key={idx}
              className="inline-block px-3 py-1 bg-blue-100 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
      )}
      {iljuDetail?.trait && (
        <div className="mb-6 text-center text-gray-600 text-lg space-y-1">
          {iljuDetail.trait.map((item, idx) => (
            <div key={idx}>{item}</div>
          ))}
        </div>
      )}
      <div className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-6">
        {sajuInfo?.name}님의 포켓몬은!
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {pokemons?.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemon={pokemon} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={fetchPokemonData}
          className="px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 font-semibold rounded-full transition-all duration-200 shadow-md"
        >
          다시 뽑기 🎲
        </button>
        <button
          onClick={() => router.push("/input")}
          className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold rounded-full transition-all duration-200 shadow-sm"
        >
          돌아가기 ↩️
        </button>
      </div>
    </div>
  );
}
export default ResultPage;
