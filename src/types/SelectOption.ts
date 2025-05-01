type GenderId = "male" | "female";
type BirthId = "solar" | "lunar" | "lunar-leap";

interface SelectOption<ID extends string = string> {
  id: ID;
  name: string;
  value: string;
  label: string;
  checked: boolean;
}
