import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { types }: { types: string[] } = await req.json();

    const pokemonTypeData = await Promise.all(
      types.map(async (type) => {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await res.json();
        let typeImage = data.sprites?.["generation-iii"]?.emerald?.name_icon;
        if (!typeImage && type.toLowerCase() === "fairy") {
          typeImage = "/FAIRY.svg";
        }
        return { typeImage };
      })
    );

    const typeImages = pokemonTypeData.map((d) => d.typeImage);
    return NextResponse.json({ typeImages });
  } catch (error) {
    console.error("에러 발생:", error);
    return NextResponse.json(
      { error: "Invalid JSON or fetch failed" },
      { status: 400 }
    );
  }
}
