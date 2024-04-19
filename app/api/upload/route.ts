// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";
import { speechToText } from "@/utils/speechtotext";
import { AnalysisChain } from "@/utils/gptanalysis";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function POST(
    request: NextRequest

) {
    const data = await request.formData()
    let result;

    const file: File | null = data.get('file') as unknown as File

    if (!file) {
        return NextResponse.json({ success: false })
    }
    const bytes = await file.arrayBuffer();
    const audioFile = Buffer.from(bytes)

    const path = join('/', 'audio', file.name)
    await writeFile(path, audioFile)


    const audioUrl =
        `C:/audio/${file.name}`;

    console.log("here is the audio path: ", audioUrl)
    const audio_transcript = await speechToText(audioUrl);
    console.log("response from the assembly ai: ", audio_transcript)
    const response = await AnalysisChain().call({
        input: audio_transcript
    });
    result = JSON.parse(response.text)
    console.log("result from the api call: ", result)


    console.log("finallly");
    return NextResponse.json({ success: true, result: result })

}
