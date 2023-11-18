import { serialize } from "cookie";
async function handler(request, response) {
  if (request.method !== "GET") return;

  return response
    .status(200)
    .setHeader("Set-Cookie", [
      serialize("AuthToken", "", { maxAge: 0, path: "/" }),
    ])
    .json({ status: "success", message: "Successful Logout." });
}

export default handler;
