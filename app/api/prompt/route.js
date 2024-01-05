import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { connect, Document } from "mongoose";
import { NextResponse } from 'next/server'
// 获取全部post
export const GET = async (request) => {
    try {
        await connectToDB()
        const res = await Prompt.find({}).populate("creator").exec()
        return NextResponse.json(res, {
            status: 200
        })

    } catch (error) {
        return new Response("Failed to get all prompt", {
            status: 500
        })
    }
}