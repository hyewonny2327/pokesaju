import earthBranchesData from "@constants/saju/earthBranches.json";
import heavenlyStemsData from "@constants/saju/heavenlyStems.json";
type EarthBranchKey = keyof typeof earthBranchesData;
type heavenlyStemsKey = keyof typeof heavenlyStemsData;
//req(query) : 60갑자
//res : 60갑자에 해당하는 포켓몬 타입 리스트
//{
//   "ilju": "갑자",
//   "element": "목",
//   "summary": "활동적이고 선도적인 성향",
//   "keywords": ["리더", "도전", "직진"],
//   "matchingTypes": ["fire", "electric", "fighting"]
// }
export interface IljuDetailType {
  ilju: string;
  element: string[];
  trait: string[];
  types: string[];
}
export function getIljuDetail(
  ilju: string
): { error: string; status: number } | IljuDetailType {
  const branch: EarthBranchKey = ilju?.charAt(1) as EarthBranchKey;
  const stem: heavenlyStemsKey = ilju.charAt(0) as heavenlyStemsKey;
  if (!stem || !(stem in heavenlyStemsData)) {
    return {
      error: "올바르지 않은 천간입니다",
      status: 400,
    };
  }
  if (!branch || !(branch in earthBranchesData)) {
    return {
      error: "올바르지 않은 지지입니다",
      status: 400,
    };
  }
  //중복된 타입은 제외하고 반환
  const {
    element: stemElement,
    type: stemType,
    trait: stemTrait,
  } = heavenlyStemsData[stem];
  const {
    element: branchElement,
    pokemonType: branchType,
    trait: branchTrait,
  } = earthBranchesData[branch];

  const result = {
    ilju: ilju,
    element: [stemElement, branchElement],
    trait: [stemTrait, branchTrait],
    types: [...stemType, branchType],
  };
  return result;
}
