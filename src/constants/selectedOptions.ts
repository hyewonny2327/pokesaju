import { BirthId, GenderId, SelectOption } from "@custom-types/SelectOption";

export const genderOptions: SelectOption<GenderId>[] = [
  {
    id: "male",
    name: "남자",
    value: "male",
    label: "남자",
    checked: true,
  },
  {
    id: "female",
    name: "여자",
    value: "female",
    label: "여자",
    checked: false,
  },
];
export const birthOptions: SelectOption<BirthId>[] = [
  {
    id: "solar",
    name: "양력",
    value: "solar-calendar",
    label: "양력",
    checked: true,
  },
  {
    id: "lunar",
    name: "음력",
    value: "lunar-calendar",
    label: "음력",
    checked: false,
  },
  {
    id: "lunar-leap",
    name: "음력(윤달)",
    value: "lunar-calendar-leap-month",
    label: "음력(윤달)",
    checked: false,
  },
];
