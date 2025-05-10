import { getIljuDetail } from "@lib/pokemon/getIljuDetail";
import { getPokemonDetail } from "@lib/pokemon/getPokemonDetail";
import { getPokemonsByType } from "@lib/pokemon/getPokemonsByType";
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
  const iljuDetail = getIljuDetail(ilju);
  let pokemon = [];
  if ("error" in iljuDetail) {
    return NextResponse.json(
      { error: iljuDetail.error },
      { status: iljuDetail.status }
    );
  } else {
    let pokemonList = await getPokemonsByType(
      iljuDetail.types,
      randomPokemonNumber
    );
    pokemon = await getPokemonDetail(pokemonList);
  }

  return NextResponse.json({ pokemon, iljuDetail });
}
