// export async function GET(request: Request) {
//   const response = await fetch(
//     "https://ai-image-generator-yosua.azurewebsites.net/api/getimages",
//     {
//       cache: "no-store",
//     }
//   );

//   const blob = await response.blob();
//   const textData = await blob.text();

//   const data = JSON.parse(textData);

//   return new Response(JSON.stringify(data), {
//     status: 200,
//   });
// }

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    "https://ai-image-generator-yosua.azurewebsites.net/api/getimages",
    {
      cache: "no-store",
    }
  );

  const blob = await response.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);

  res.status(200).json(data);
}
