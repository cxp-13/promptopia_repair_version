import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { connect, Document } from "mongoose";
import { NextResponse } from 'next/server'

export const GET = async (request) => {
    try {
        await connectToDB()
        const res = await Prompt.find({}).populate("creator").exec()
        console.log("api/prompt/search res", res);


        // return new Response(JSON.stringify(res) , {
        //     status: 200
        // })

        return NextResponse.json(res, {
            status: 200
        })

    } catch (error) {
        return new Response("Failed to create a new prompt", {
            status: 500
        })
    }
}