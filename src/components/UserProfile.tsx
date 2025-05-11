function UserProfile({ name }: { name: string | undefined }) {
  return (
    <div className="w-[310px] h-[310px] bg-white border-2 border-black rounded-[20px] shadow-[4px_4px_0px_black] overflow-hidden flex flex-col items-center justify-between">
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src={`/pokeball_color.svg`}
          alt="pokeball"
          className="w-[180px] h-auto"
        />
      </div>
      <div className="w-full bg-yellow-100 border-t-2 border-black h-[20%] flex items-center justify-center">
        <span className="text-black font-mono text-base tracking-wide">
          {name} 님의 사주 리포트
        </span>
      </div>
    </div>
  );
}

export default UserProfile;
