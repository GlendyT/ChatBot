"use client";
import React, { useState } from "react";
import { TbMessageChatbot } from "react-icons/tb";
import BotMessage from "./ui/bot-message";
import UserMessage from "./ui/user-message";
import ChatInput from "./ui/chat-input";

export type Message = {
  content: string;
  role: "user" | "assistant" | "system";
};

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [useMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello, how may I help you today?" },
  ]);
  return (
    <>
      <TbMessageChatbot
        size={64}
        onClick={() => setShowChat(!showChat)}
        className="fixed right-12 bottom-[calc(1rem)] hover:cursor-pointer"
      />

      {showChat && (
        <div className="fixed right-12 bottom-[calc(4rem+1.5rem)] border hover:cursor-pointer p-5 shadow-md shadow-white h-[474px] w-[500px}">
          <div className="flex flex-col h-full">
            <div>
              <h2>Chatbot</h2>
              <p>Powered by OpenAI</p>
            </div>
            <div className="flex flex-col flex-1 items-center p-2 mt-5 overflow-y-auto">
              {messages &&
                messages.map((m, i) => {
                  return m.role === "assistant" ? (
                    <BotMessage {...m} key={i} />
                  ) : (
                    <UserMessage {...m} key={i} />
                  );
                })}
            </div>
            <ChatInput />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
