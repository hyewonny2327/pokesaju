import Button from "@components/Button";
import TalkingBox from "@components/pokemon/TalkingBox";
import ResultPage from "@components/ResultPage";
import { getIljuByBirth } from "@lib/sajuUtils";
import { cookies } from "next/headers";

export default async function Result() {
  //쿠키에서 유저 정보 가져옴
  const raw = (await cookies()).get("userInfo")?.value;
  const data = raw ? JSON.parse(raw) : null;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E11B1D]">
        <TalkingBox
          ment={[
            "트레이너 정보를 확인할 수가 없다고 나오는군!\n다시 돌아가서 정보를 입력해주게나",
          ]}
        >
          <div className="flex flex-col justify-center items-center">
            <Button routerPath="/input" background="white">
              ↩️ 돌아가기
            </Button>
          </div>
        </TalkingBox>
      </div>
    );
  }

  const { year, month, day } = data.birthday;
  const ilju = getIljuByBirth(`${year}-${month}-${day}`);

  return <ResultPage ilju={ilju} username={data.name} />;
}
