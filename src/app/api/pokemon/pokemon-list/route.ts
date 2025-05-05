import { NextResponse } from "next/server";
interface PokemonRequestBody {
  types: string[];
  randomNumber: number;
}

export async function POST(req: Request) {
  const body: PokemonRequestBody = await req.json();
  const types = body.types;
  const randomNumber = body.randomNumber;

  const pokemons = await Promise.all(
    types.map(async (type) => {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();
      return data.pokemon.map((p: any) => p.pokemon); // name, url
    })
  );
  const results = pokemons.flat();
  //이 부분을 분리할까 고민..
  const randomList = results
    .sort(() => 0.5 - Math.random())
    .slice(0, randomNumber);

  return NextResponse.json(randomList);
}
