import { getPokemonDetail } from "@lib/pokemon/getPokemonDetail";
import { getPokemonsByType } from "@lib/pokemon/getPokemonsByType";
import { getTypesByIlju } from "@lib/pokemon/getTypesByIlju";
import { NextResponse } from "next/server";

export interface pokemonByIljuRequestBody {
  ilju: string;
  randomPokemonNumber: number;
}
//req(query) : 60갑자
//res : 60갑자에 해당하는 포켓몬 타입 리스트
export async function POST(req: Request) {
  const { ilju, randomPokemonNumber }: pokemonByIljuRequestBody =
    await req.json();
  if (!ilju) {
    return NextResponse.json({ error: "일주 누락" }, { status: 400 });
  }
  const pokemonTypes = getTypesByIlju(ilju);
  let result = [];
  //pokemonTypes가 제대로 들어왔을 경우, 랜덤으로 포켓몬 리스트 생성
  if (Array.isArray(pokemonTypes)) {
    let pokemonList = await getPokemonsByType(
      pokemonTypes,
      randomPokemonNumber
    );
    result = await getPokemonDetail(pokemonList);
  } else {
    return NextResponse.json(
      { error: pokemonTypes.error },
      { status: pokemonTypes.status }
    );
  }

  //포켓몬 리스트를 가지고 디테일 객체 생성

  return NextResponse.json(result);
}
