import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('document') as File;
    const fileName = file.name;
    const fileType = file.type;
    const fileSize = file.size;
    const response = await fetch("https://server.getinterface.tech/upload", {
        method: "POST",
        body: formData,
        headers: { "Content-Type": fileType },
        mode : "no-cors",
        redirect : "follow" as RequestRedirect
    })
    return NextResponse.json(response.body)
}