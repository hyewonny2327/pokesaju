export interface PokemonDetail {
  name: string;
  url: string;
  sprites: {
    front_default: string;
    [key: string]: any;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  [key: string]: any; // species 내부 필드 전체 정의 안 할 거면 이거 포함
}
