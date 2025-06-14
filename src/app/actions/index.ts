"use server";
import OpenAI from "openai";
import { Message } from "../components/ChatBot/chatbot";
import fs from "fs";
import path from "path";

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type FAQ = {
  question: string
  answer: string
}

const filePath = path.resolve(process.cwd(), "src/app/data", "faqs.json");
const faqs: FAQ[] = JSON.parse(fs.readFileSync(filePath, "utf-8")).faqs;


export async function chatCompletion(chatMessages: Message[]) {
  try {
    console.log("FROM BACKEND", chatMessages);

    const faqsAnswer = faqs.find(faq => chatMessages.at(-1)?.content.toLowerCase().includes(faq.question.toLowerCase()))

    if (faqsAnswer) {
      console.log(faqsAnswer)
      return {role: "assistant", content: faqsAnswer.answer}
    }

    console.log(`Reraching out to OPENAI API...`)

    const chat = [
      { role: "system", content: "You are a helpful asswistant" },
      ...faqs.map(faq => ({
        role: "system",
        content: `Q: ${faq.question}\nA: ${faq.answer}`
      })),
      ...chatMessages,
    ];

    const completion = await openAI.chat.completions.create({
      messages: chat,
      model: "gpt-4o-mini",
    });

    if (!completion) {
      throw new Error("Invalid Response from OPENAI API!")
    }

    const assistantMessage = completion.choices[0].message?.content

    if(!assistantMessage){
      throw new Error("No message from OPEN API")
    }

    console.log("COMPLETION", completion.choices[0].message.content);
    return {role: "assistant", content: assistantMessage}
   
  } catch (error) {
    console.log(error);
  }
}
