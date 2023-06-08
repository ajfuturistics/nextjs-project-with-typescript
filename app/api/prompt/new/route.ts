import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const POST = async (request: Request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });

    newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
