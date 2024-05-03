import { OpenAIChat } from '@langchain/openai';

import { LLMChain } from 'langchain/chains';

import { PromptTemplate } from '@langchain/core/prompts';


export const AnalysisChain = () => {
    // const Prompt_v2 = PromptTemplate.fromTemplate(`
    // You are a An Agent.The agent has expertise in performing a analysis. You are given a transcript of an audio {input}. The agent is responsible to perform a comprehensive analysis and identify that the given audio has some potential social engineering threats or queues present in it.
    // Response a JSON :percentage: of how much chances are there that the provided transcript has some social engineering queues.
    // `);
    const Prompt_v2 = PromptTemplate.fromTemplate(`
    You are an intelligence analyst working for a security agency. Your role is to meticulously analyze audio transcripts for potential social engineering threats or cues. Imagine you are presented with a transcript of an audio recording {input}. Your task is to conduct a thorough examination, identifying any indicators of social engineering tactics or manipulative strategies.

    Please provide your analysis in JSON format, including a percentage estimation of the likelihood that the provided transcript contains elements indicative of social engineering attempts.
`);


    return new LLMChain({
        llm: new OpenAIChat({
            modelName: "gpt-4",
            verbose: true,
            temperature: 0.0
        }),
        prompt: Prompt_v2,
    });
}
export const probabiltyChain = () => {
    const Prompt_v2 = PromptTemplate.fromTemplate(`
    You are a An Agent.You are given a linguistic analysis report {analysis_result} generated to determine that the given transcript of an audio is being generated from deep fake technologies or not. The agent is responsible to to carefully understand the analysis report and provide quantitative assessment of the probability (%) indicating the likelihood that the transcript originates from a deep fake source engineered for social engineering purposes. .
    Response a JSON with "probability" 
    `);
    return new LLMChain({
        llm: new OpenAIChat({
            modelName: "gpt-4",
            verbose: true,
            temperature: 0.0
        }),
        prompt: Prompt_v2,
    });
}