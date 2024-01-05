import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { connect, Document } from "mongoose";

export const POST = async (req, res) => {
    const reqJson = await req.json()
    const { userId, prompt, tag } = reqJson

    console.log("api/prompt/new reqJson", reqJson);
    console.log("api/prompt/new res", req);
    console.log("api/prompt/new res", res);


    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save()

        console.log("newPrompt is document", newPrompt instanceof Document);

        return new Response(JSON.stringify(newPrompt), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to create a new prompt", {
            status: 500
        })
    }
}