// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";
import { exec } from 'child_process';
import { speechToText } from "@/utils/speechtotext";
import { AnalysisChain, probabiltyChain } from "@/utils/gptanalysis";
import { join, resolve } from "path";
import { writeFile } from "fs/promises";
import { Utils } from "@/utils/utils";

const utilities = new Utils();

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

    const path = join(process.cwd(), 'audio', file.name)
    await writeFile(path, audioFile);
    const audioUrl =
        `C:/audio/${file.name}`;
    console.log("audio url:", audioUrl)
    const audio_transcript = await speechToText(audioUrl);

    const deepfake_result = new Promise((resolve, reject) => {
        exec(`python test.py ${audioUrl}`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing Python script:', error);
                reject(error);
            }
            resolve(stdout)
        });
    })

    console.log("checking python result: ", await deepfake_result)


    // const audio_transcript = `Transcript of Audio Recording:
    // [00:00:00] Speaker 1: Hi, it's Mark. Just wanted to check if you're still available for our meeting tomorrow at 10 a.m.?
    // [00:00:10] Speaker 2: Hi Mark, yes, I'm still available. Looking forward to it.
    // [00:00:15] Speaker 1: Great, see you then. Have a good day!
    // [00:00:20] Speaker 2: You too, bye!
    // `

    const response = await AnalysisChain().call({
        input: audio_transcript
    });
    console.log("result from the analysis chain: ", response.text)
    const probabilityChainResponse = await probabiltyChain().call({
        analysis_result: response.text
    })
    result = JSON.parse(probabilityChainResponse.text)
    console.log("Probability: ", result)
    const probability = utilities.removeExtraOperators(result.probability)
    console.log("Probability: ", probability)


    console.log("finallly");
    return NextResponse.json({ success: true, analysis_result: probability, deepfake_result: await deepfake_result })

}
