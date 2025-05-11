function InputContainer() {
  return (
    <div className="w-full max-w-md flex flex-col p-6 bg-white rounded-xl shadow-md space-y-6">
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
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        onClick={handleButtonClick}
      >
        다음으로
      </button>
    </div>
  );
}

export default InputContainer;
