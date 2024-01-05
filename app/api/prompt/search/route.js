'use client'
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { connect, Document } from "mongoose";
import { useSearchParams } from "next/navigation";
import { NextResponse } from 'next/server'
// 搜索框功能，查询包含searchText的prompt，用户名，tag
export const GET = async (request) => {
    try {
        const searchText = useSearchParams().get("searchText");
        console.log("搜索框 searchText", searchText);

        await connectToDB()

        // 构建查询条件
        const query = {
            $or: [
                { prompt: { $regex: searchText, $options: 'i' } },
                { 'creator.username': { $regex: searchText, $options: 'i' } },
                { tag: { $regex: searchText, $options: 'i' } },
            ],
        };

        // 执行查询
        const results = await Prompt.find(query).exec();
        console.log("搜索框 result", results);
        
        return NextResponse.json(JSON.stringify(results), {
            status: 200
        })

    } catch (error) {
        console.log("搜索框 error", error);
        return new Response(JSON.stringify("Failed to search prompts"), {
            status: 500
        })
    }
}