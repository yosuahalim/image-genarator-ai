import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
const generateSASToken = require("../../lib/generateSASToken");

export async function generateToken(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const sasToken = await generateSASToken();

  return { body: sasToken };
}

app.http("generateSASToken", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: generateToken,
});
