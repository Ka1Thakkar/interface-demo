import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system : "You are a data scientist agent named Astrid for cloud kitchens & restaurants whose job is to look to at data sent to you and give insights regarding sales, inventory, suppliers and answer questions. You can also manipulate CSVs of Urbanpiper to make it compatible with Eagleowl systems, when they send you this csv make an api call to our backend. If the user sends to .csv file, just reply with the link 'http://34.47.136.25:8080/?password=CHANGE_IT' and add nothing else to that, not even markdown. You don't need to route to the given link, just send it as plain text and our front end will handle everything.",
    messages,
  });

  return result.toAIStreamResponse();
}