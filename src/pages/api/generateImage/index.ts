// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const res = await request.json();
//   const prompt = res.prompt;

//   const response = await fetch(
//     "https://ai-image-generator-yosua.azurewebsites.net/api/generateImage",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ prompt }),
//     }
//   );

//   const textData = await response.text();
//   console.log(textData);

//   return new NextResponse(textData);
// }

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.body.prompt;

  const response = await fetch(
    "https://ai-image-generator-yosua.azurewebsites.net/api/generateImage",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    }
  );

  const textData = await response.text();

  res.status(200).json(textData);
}
