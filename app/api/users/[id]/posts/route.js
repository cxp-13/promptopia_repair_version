import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { connect, Document } from "mongoose";
import { NextResponse } from 'next/server'

export const GET = async (request, { params }) => {
    try {
        const { id } = params
        await connectToDB()
        const res = await Prompt.find({ creator: id }).populate('creator').exec()
        return NextResponse.json(res, {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch my posts", {
            status: 500
        })
    }
}