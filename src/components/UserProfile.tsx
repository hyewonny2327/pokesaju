function UserProfile({ name }: { name: string | undefined }) {
  return (
    <div className="w-[310px] h-[310px] rounded-[20px] shadow-2xl backdrop-blur-md bg-white/30 overflow-hidden flex flex-col items-center justify-between">
      <div className="flex-1 flex items-center justify-center">
        <img
          src={`/pokeball_color.svg`}
          alt="pokeball"
          className="w-[210px] h-auto"
        />
      </div>
      <div
        className={`w-full text-white h-[20%] flex items-center justify-center`}
      >
        <span className="text-black font-semibold text-lg">{name}</span>
      </div>
    </div>
  );
}

export default UserProfile;
