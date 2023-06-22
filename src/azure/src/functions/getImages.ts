import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const generateSASToken = require("../../lib/generateSASToken");

const accountName = process.env.accountName;
const accountKey = process.env.accountKey;
const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net?$`,
  sharedKeyCredential
);

export async function getImages(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const imageUrls = [];
  const sasToken = await generateSASToken();

  for await (const blob of containerClient.listBlobsFlat()) {
    const imageUrl = `${blob.name}?${sasToken}`;
    const url = `https://${accountName}.blob.core.windows.net/${containerName}/${imageUrl}`;
    imageUrls.push({ url, name: blob.name });
  }

  const sortedImageUrls = imageUrls.sort((a, b) => {
    return b.name.split("_")[1] - a.name.split("_")[1];
  });

  return {
    jsonBody: {
      imageUrls: sortedImageUrls,
    },
  };
}

app.http("getImages", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getImages,
});
