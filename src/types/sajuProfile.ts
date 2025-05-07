export interface SajuProfile {
  id?: string; // DB 연동 시 유용 (optional)
  name: string;
  gender: String; // 성별
  birthday: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute?: string;
    calendarType: string;
  };
}
