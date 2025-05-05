export type GenderId = "male" | "female";
export type BirthId = "solar" | "lunar" | "lunar-leap";

export interface SelectOption<ID extends string = string> {
  id: ID;
  name: string;
  value: string;
  label: string;
  checked: boolean;
}
