import { SAJU_MIN_DATE } from "@constants/date";
import { getDateDiffInDays } from "@utils/dateUtils";

//60갑자
export function generateGanzhiList() {
  //천간
  const heavenlyStems = [
    "갑",
    "을",
    "병",
    "정",
    "무",
    "기",
    "경",
    "신",
    "임",
    "계",
  ];
  //지지
  const earthlyBranches = [
    "자",
    "축",
    "인",
    "묘",
    "진",
    "사",
    "오",
    "미",
    "신",
    "유",
    "술",
    "해",
  ];
  //천간, 지지를 조합한 60갑자
  let sixtyGanzhi = [];
  for (let i = 0; i < 60; i++) {
    sixtyGanzhi.push(`${heavenlyStems[i % 10]}${earthlyBranches[i % 12]}`);
  }
  return sixtyGanzhi;
}

//기준일을 바탕으로 일주 구하기
export function getIljuByBirth(birth: string) {
  const diff = getDateDiffInDays(SAJU_MIN_DATE, birth);
  const ganzi = generateGanzhiList();
  console.log(ganzi);
  //1899-12-31일은 계해 일주 (59번째 index);
  const index = (diff + 47) % 60;
  console.log(ganzi[index]);
}
