import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
const generateSASToken = require("../../lib/generateSASToken");
const openai = require("../../lib/openai");
const axios = require("axios");

const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.accountName;
const containerName = "images";

export async function generateImage(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const { prompt }: any = await request.json();

  console.log("prompt", prompt);

  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  const image_url = response.data.data[0].url;
  const res = await axios.get(image_url, { responseType: "arraybuffer" });

  const arrayBuffer = res.data;

  const sasToken = await generateSASToken();

  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net?${sasToken}`
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const timestamp = new Date().getTime();
  const file_name = `${prompt}_${timestamp}.png`;

  const blockBlobClient = containerClient.getBlockBlobClient(file_name);

  try {
    await blockBlobClient.uploadData(arrayBuffer);
    console.log("uploadData success");
  } catch (err: any) {
    console.log(err.message);
  }

  return { body: "Successfully Uploaded Image" };
}

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: generateImage,
});
