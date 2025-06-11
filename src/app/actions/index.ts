"use server";

import { Message } from "../components/ChatBot/chatbot";

export async function chatCompletion(chatMessages: Message[]) {
  console.log("FROM BACKEND", chatMessages);
}
