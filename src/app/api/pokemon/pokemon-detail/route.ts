import { NextResponse } from "next/server";

interface pokemonDetailReq {
  data: { name: string; url: string }[];
}
export async function POST(req: Request) {
  const pokemonList: pokemonDetailReq = await req.json();
  const details = await Promise.all(
    pokemonList.data.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const { species, sprites, types } = await res.json();
      console.log("디테일 정보", species, sprites, types);
      return { species, sprites, types };
    })
  );
  return NextResponse.json(details);
}
