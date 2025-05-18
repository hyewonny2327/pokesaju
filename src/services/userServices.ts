import { SajuProfile } from "@custom-types/sajuProfile";

export async function setUserInfo(data: SajuProfile) {
  await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
