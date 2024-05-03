import { assemblyai_Client } from "./assemblyai"

export const speechToText = async (audioUrl: string) => {

    const config = {
        audio_url: audioUrl,
        auto_highlights: true
    }
    const transcript = await assemblyai_Client.transcripts.create(config)
    //@ts-ignore
    for (let result of transcript.auto_highlights_result.results) {
        console.log("result: ", result)
        console.log(
            `Highlight: ${result.text}, Count: ${result.count}, Rank: ${result.rank}`
        );
        return transcript.text;
    }
}

