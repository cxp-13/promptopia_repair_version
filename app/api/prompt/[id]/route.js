import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { connect, Document } from "mongoose";
import { NextResponse } from "next/server";


// get 获取
export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const prompt = await Prompt.findById(params.id).exec()
        if (!prompt) {
            return new Response("Prompt not found", {
                status: 404
            })
        }
        console.log("api/prompt/[id] get prompt", prompt);
        return NextResponse.json(prompt, {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to get a prompt", {
            status: 500
        })
    }
}
// patch 更新
export const PATCH = async (request, { params }) => {
    try {
        const reqJson = await request.json()
        const { prompt, tag } = reqJson
        console.log("api/prompt/[id] patch req 的body", reqJson);
        
        console.log("api/prompt/[id] patch req 的数据", prompt, tag);

        await connectToDB()
        await Prompt.findOneAndUpdate({ _id: params.id }, {
            prompt,
            tag
        }).exec()
        return NextResponse.json(JSON.stringify("update success"), {
            status: 200
        })
    } catch (error) {
        return new Response(JSON.stringify("Failed to update a prompt"), {
            status: 500
        })
    }
}
// delete 删除
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()
        // await Prompt.findOneAndDelete({ _id: params.id }).exec()
        await Prompt.findByIdAndDelete(params.id).exec()


        return NextResponse.json(JSON.stringify("delete success"), {
            status: 200
        })
    } catch (error) {
        return new Response(JSON.stringify("Failed to update a prompt"), {
            status: 500
        })
    }
}