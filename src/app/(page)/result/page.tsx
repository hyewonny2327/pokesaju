"use client";
import PokemonCard from "@components/pokemon/PokemonCard";
import UserProfile from "@components/UserProfile";
import { typeClassMap } from "@constants/pokemon/pokemonTypesColor";
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
    <>
      {iljuDetail && (
        <div className="min-h-screen bg-gray-50 ">
          <div
            className={`${typeClassMap[iljuDetail.types[0].toLowerCase()]} w-full h-[50vh]`}
          >
            <header className="w-full flex justify-between items-center px-6 py-4 fixed top-0 left-0 z-50">
              <div className="flex gap-2">
                <button
                  onClick={fetchPokemonData}
                  className="px-4 py-2  backdrop-blur-md bg-white/30 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                >
                  🔁 다시 뽑기
                </button>
                <button
                  onClick={() => router.push("/input")}
                  className="px-4 py-2 rounded-full  backdrop-blur-md bg-white/30 text-black hover:bg-gray-800 text-sm"
                >
                  🏠 홈으로
                </button>
              </div>
            </header>
            <img src={"/pokeball.svg"} className="ml-auto" />
          </div>
          <div className="absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <UserProfile name={sajuInfo?.name} />
          </div>
          <div className="bg-gray-50">
            <div className="w-full flex gap-4 justify-center p-8 mt-16">
              {typeImages.map((item, idx) => (
                <span key={idx} className="inline-block px-3 py-1 rounded-full">
                  <img src={item} className="w-20 h-auto" />
                </span>
              ))}
            </div>

            {iljuDetail?.trait && (
              <div className="mb-6 text-center text-gray-600 text-lg space-y-1">
                {iljuDetail.trait.map((item, idx) => (
                  <div key={idx}>{item}</div>
                ))}
              </div>
            )}

            <div className="w-full flex flex-wrap gap-8 mb-12 justify-center">
              {pokemons?.map((pokemon) => (
                <PokemonCard key={pokemon.url} pokemon={pokemon} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ResultPage;
