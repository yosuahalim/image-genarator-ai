// export async function GET(request: Request) {
//   const response = await fetch(
//     "https://ai-image-generator-yosua.azurewebsites.net/api/getchatgptsuggestion",
//     {
//       cache: "no-store",
//     }
//   );

//   const textData = await response.text();
//   return new Response(JSON.stringify(textData.trim()), {
//     status: 200,
//   });
// }

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    "https://ai-image-generator-yosua.azurewebsites.net/api/getchatgptsuggestion",
    {
      cache: "no-store",
    }
  );

  const textData = await response.text();

  res.status(200).json(JSON.stringify(textData.trim()));
}
