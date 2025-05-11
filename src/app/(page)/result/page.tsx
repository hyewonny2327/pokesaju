"use client";
import PokemonCard from "@components/pokemon/PokemonCard";
import { PokemonDetail } from "@custom-types/pokemonDetail";
import { SajuProfile } from "@custom-types/sajuProfile";
import { IljuDetailType } from "@lib/pokemon/getIljuDetail";
import { getIljuByBirth } from "@lib/sajuUtils";
import {
  getRandomPokemonByIlju,
  getTypeImage,
} from "@services/pokemonServices";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function ResultPage() {
  const [sajuInfo, setSajuInfo] = useState<SajuProfile | null>(null);
  const [pokemons, setPokemons] = useState<PokemonDetail[] | null>(null);
  const [iljuDetail, setIljuDetail] = useState<IljuDetailType | null>(null);
  const [typeImages, setTypeImages] = useState<string[]>([]);
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
      const typeImages = await getTypeImage(pokemonData.iljuDetail.types);
      console.log("typeImages", typeImages.typeImages);
      console.log(pokemonData.iljuDetail);
      setPokemons(pokemonData.pokemon);
      setIljuDetail(pokemonData.iljuDetail);
      setTypeImages(typeImages.typeImages);
    }
  }
  useEffect(() => {
    console.log(iljuDetail);
  }, [iljuDetail]);
  return (
    <div className="min-h-screen bg-slate-100 border-t-4 border-black shadow-[inset_0_4px_8px_rgba(0,0,0,0.2)]">
      {/* 상단 헤더 + 배경 */}
      <div className="relative w-full">
        <header className="w-full flex justify-between items-center px-6 py-4 fixed top-0 left-0 z-50">
          <div className="flex gap-2">
            <button
              onClick={fetchPokemonData}
              className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full border-2 border-black shadow-[2px_2px_0px_black] hover:bg-red-600"
            >
              🔁 다시 뽑기
            </button>
            <button
              onClick={() => router.push("/input")}
              className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full border-2 border-black shadow-[2px_2px_0px_black] hover:bg-gray-100"
            >
              🏠 홈으로
            </button>
          </div>
        </header>
        <img src="/pokeball.svg" className="w-28 h-auto opacity-30" />
      </div>

      {/* 리포트 카드 */}
      <div className="max-w-xl mx-auto mt-[-30px] bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_black] p-6 space-y-4 z-10 relative ">
        {/* <UserProfile name={sajuInfo?.name} /> */}
        <div className="w-full flex justify-center items-center p-4 ">
          <img
            src={`/pokeball_color.svg`}
            alt="pokeball"
            className="w-[180px] h-auto"
          />
        </div>
        <div className="flex justify-center gap-2">
          {typeImages.map((img, idx) => (
            <img key={idx} src={img} className="w-16 h-auto" />
          ))}
        </div>
        <div className="text-center text-gray-800 text-base font-mono tracking-wide space-y-1">
          {iljuDetail &&
            iljuDetail.trait.map((trait, idx) => <p key={idx}>{trait}</p>)}
        </div>
      </div>

      {/* 추천 포켓몬 영역 */}
      <div className="w-full mx-auto mt-12 px-4">
        <h2 className="text-xl font-bold text-center mb-4  border-black pb-2 font-mono tracking-widest">
          {sajuInfo?.name}님과 어울리는 포켓몬
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
export default ResultPage;
