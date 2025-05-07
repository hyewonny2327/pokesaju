"use client";
import PokemonCard from "@components/pokemon/PokemonCard";
import { PokemonDetail } from "@custom-types/pokemonDetail";
import { SajuProfile } from "@custom-types/sajuProfile";
import { getIljuByBirth } from "@lib/sajuUtils";
import { getRandomPokemonByIlju } from "@services/pokemonServices";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function ResultPage() {
  const [sajuInfo, setSajuInfo] = useState<SajuProfile | null>(null);
  const [pokemons, setPokemons] = useState<PokemonDetail[] | null>(null);
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
      setPokemons(pokemonData);
    }
  }
  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-50">
      <div className="text-xl sm:text-2xl font-bold text-center mb-8">
        {sajuInfo?.name}님의 포켓몬은!
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {pokemons?.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemon={pokemon} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={fetchPokemonData}
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          다시 뽑기 🎲
        </button>
        <button
          onClick={() => router.push("/input")}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition"
        >
          돌아가기 ↩️
        </button>
      </div>
    </div>
  );
}
export default ResultPage;
