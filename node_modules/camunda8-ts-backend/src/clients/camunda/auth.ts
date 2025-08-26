import axios from "axios";

type Audience = "operate.camunda.io" | "tasklist.camunda.io" | "zeebe.camunda.io" | string;

export async function getToken(audience: Audience): Promise<string> {
  const { C8_CLIENT_ID, C8_CLIENT_SECRET } = process.env;
  if (!C8_CLIENT_ID || !C8_CLIENT_SECRET) {
    throw new Error("Missing C8_CLIENT_ID or C8_CLIENT_SECRET");
  }

  const url = process.env.C8_OAUTH_URL || (process.env as any).C8_OAUTHURL || "https://login.cloud.camunda.io/oauth/token";
  const resp = await axios.post(
    url,
    {
      grant_type: "client_credentials",
      audience,
      client_id: C8_CLIENT_ID,
      client_secret: C8_CLIENT_SECRET,
    },
    { headers: { "Content-Type": "application/json" } }
  );

  return resp.data.access_token as string;
}