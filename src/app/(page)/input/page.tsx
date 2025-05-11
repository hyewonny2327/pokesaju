"use client";
import DatePicker from "@components/DatePicker";
import Input from "@components/Input";
import TalkingBox from "@components/pokemon/TalkingBox";
import Select from "@components/Select";
import talkingText from "@constants/pokemon/talkingText.json";
import { birthOptions, genderOptions } from "@constants/selectedOptions";
import { SajuProfile } from "@custom-types/sajuProfile";
import { BirthId, GenderId } from "@custom-types/SelectOption";
import { formatCurrentDateTime, parseDateTimeString } from "@utils/dateUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";
// ! 저장버튼 클릭했을 때 Local storage 저장

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
      id: Math.random().toString(36).substring(2, 10),
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
    <div className="min-h-screen flex items-center justify-center bg-[#E11B1D]">
      <TalkingBox ment={talkingText.drO}>
        <div className="w-full  flex flex-col p-12 bg-slate-100 border-2 border-black rounded-xl shadow-[4px_4px_0px_black] space-y-6">
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
          <button
            className="w-full py-2 px-4 bg-red-500 text-white font-bold text-sm border-2 border-black rounded-full shadow-[2px_2px_0px_black] hover:bg-red-600 transition-all duration-200"
            onClick={handleButtonClick}
          >
            다음으로
          </button>
        </div>
      </TalkingBox>
    </div>
  );
}
export default InputPage;
