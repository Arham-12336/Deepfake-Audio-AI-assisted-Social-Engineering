import { OpenAIChat } from '@langchain/openai';

import { LLMChain } from 'langchain/chains';

import { PromptTemplate } from '@langchain/core/prompts';


export const AnalysisChain = () => {
    console.log("calling analysis chain");
    const Prompt = PromptTemplate.fromTemplate(`
    You are a An Agent.The agent has expertise in performing a linguistic analysis. You are given a transcript of an audio {input}. The agent is responsible to perform a comprehensive linguistic analysis and identify that the given audio has some potential social engineering threats which has been facilitated by deep fake technologies.
    Response a JSON :percentage: of how much chances are there that the provided transcript had been generated by an deep fake technologies for social engineering attacks
    `);

    return new LLMChain({
        llm: new OpenAIChat({
            modelName: "gpt-3.5-turbo",
            verbose: true,
            temperature: 0.0
        }),
        prompt: Prompt,
    });
}