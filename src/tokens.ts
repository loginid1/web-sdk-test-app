interface TokenResponse {
  token: string;
}

export const createAuthtoken = async (
  username: string,
  type: string,
  privateKey: string,
  txPayload?: string
) => {
  const res = await fetch("/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, type, txPayload, privateKey }),
  });
  const data: TokenResponse = await res.json();
  if (res.ok) return data.token;
  throw data;
};
