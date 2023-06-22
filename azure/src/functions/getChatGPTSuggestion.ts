import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
const openai = require("../../lib/openai");

export async function getChatGPTSuggestion(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Write a random text prompt for DALL·E to generate an image, this prompt will be shown to user",
    max_tokens: 100,
    temperature: 0.8,
  });
  context.log(`Http function processed request for url "${request.url}"`);

  const responseText = response.data.choices[0].text;

  return { body: responseText };
}

app.http("getChatGPTSuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getChatGPTSuggestion,
});
