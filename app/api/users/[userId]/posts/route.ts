import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

interface ParamProp {
  params: { userId: string };
}

export const GET = async (request: Request, { params }: ParamProp) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.userId }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
