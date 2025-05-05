"use client";
import DatePicker from "@components/DatePicker";
import Input from "@components/Input";
import Select from "@components/Select";
import { birthOptions, genderOptions } from "@constants/selectedOptions";
import { BirthId, GenderId } from "@custom-types/SelectOption";
import { formatCurrentDateTime, parseDateTimeString } from "@utils/dateUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";
// ! 저장버튼 클릭했을 때 Local storage 저장

interface SajuProfile {
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
function InputPage() {
  const [input, setInput] = useState("");
  const [birth, setBirth] = useState(formatCurrentDateTime());
  const [selectedGenderId, setSelectedGenderId] = useState<GenderId>(
    genderOptions[0].id
  );
  const [selectedBirthId, setSelectedBirthId] = useState<BirthId>(
    birthOptions[0].id
  );
  const router = useRouter();
  function handleDatePickerChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBirth(e.target.value);
  }
  function handleSelectBirthOptions(e: React.ChangeEvent<HTMLInputElement>) {
    birthOptions.map((item) => {
      if (item.id === e.target.id) {
        setSelectedBirthId(e.target.id);
      }
    });
  }

  function handleSelectGenderOptions(e: React.ChangeEvent<HTMLInputElement>) {
    genderOptions.map((item) => {
      if (item.id === e.target.id) {
        setSelectedGenderId(item.id);
      }
    });
  }

  function handleButtonClick() {
    const { year, month, day, hours, minutes } = parseDateTimeString(birth);
    const userInfo: SajuProfile = {
      id: new Date().toString(),
      name: input,
      gender: selectedGenderId,
      birthday: {
        year: year,
        month: month,
        day: day,
        hour: hours,
        minute: minutes,
        calendarType: selectedBirthId,
      },
    };
    //유저 인포를 로컬스토리지에 저장
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    router.push("/result");
  }

  return (
    <div className="text-red-500">
      <Input
        value={input}
        placeholder="이름"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <DatePicker
        value={birth}
        label="태어난 날짜와 시간을 입력하세요"
        onChange={handleDatePickerChange}
      />
      <Select
        options={birthOptions}
        onChange={handleSelectBirthOptions}
        checked={selectedBirthId}
      />
      <Select
        label="성별을 선택하세요"
        options={genderOptions}
        onChange={handleSelectGenderOptions}
        checked={selectedGenderId}
      />
      <button onClick={handleButtonClick}>다음으로</button>
    </div>
  );
}
export default InputPage;
