import { NextResponse } from "next/server";
import earthBranchesData from "../../../../constants/saju/earthBranches.json";
import heavenlyStemsData from "../../../../constants/saju/heavenlyStems.json";
type EarthBranchKey = keyof typeof earthBranchesData;
type heavenlyStemsKey = keyof typeof heavenlyStemsData;
//req(query) : 60갑자
//res : 60갑자에 해당하는 포켓몬 타입 리스트
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ilju = searchParams.get("ilju"); // "기유"
  if (!ilju) {
    return NextResponse.json({ error: "일주 누락" }, { status: 400 });
  }
  const branch: EarthBranchKey = ilju?.charAt(1) as EarthBranchKey;
  const stem: heavenlyStemsKey = ilju.charAt(0) as heavenlyStemsKey;

  if (!stem || !(stem in heavenlyStemsData)) {
    return NextResponse.json(
      { error: "올바르지 않은 천간입니다" },
      { status: 400 }
    );
  }
  if (!branch || !(branch in earthBranchesData)) {
    return NextResponse.json(
      { error: "올바르지 않은 지지입니다" },
      { status: 400 }
    );
  }
  //중복된 타입은 제외하고 반환
  const result = [
    ...new Set([
      ...heavenlyStemsData[stem].type,
      earthBranchesData[branch].subType,
    ]),
  ];
  return NextResponse.json(result);
}
