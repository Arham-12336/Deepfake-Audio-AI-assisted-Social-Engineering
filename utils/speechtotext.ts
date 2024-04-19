import { assemblyai_Client } from "./assemblyai"

export const speechToText = async (audioUrl: string) => {
    console.log("calling speech to text")

    const config = {
        audio_url: audioUrl
    }
    const transcript = await assemblyai_Client.transcripts.create(config)
    return transcript.text;
}

