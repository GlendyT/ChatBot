"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { TbMessageChatbot } from "react-icons/tb";
import BotMessage from "./ui/bot-message";
import UserMessage from "./ui/user-message";
import ChatInput from "./ui/chat-input";
import { chatCompletion } from "@/app/actions";

export type Message = {
  content: string;
  role: "user" | "assistant" | "system";
};

const Chatbot = () => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello, how may I help you today?" },
  ]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight
      })
    }
  }, [messages, loading])

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    console.log("USER MESSAGE", userMessage);
    if (!userMessage) return;
    const newMessage: Message = { role: "user", content: userMessage };

    console.log("NEW MESSAGE", newMessage);

    setMessages((prevMessage) => [...prevMessage, newMessage]);
    setLoading(true);
    setUserMessage("");

    try {
      const chatMessages = messages.slice(1);
      console.log("CHAT MESSAGES", chatMessages);

      const res = await chatCompletion([...chatMessages, newMessage]);
      console.log("RESPONSE", res);

      setMessages(prevMessages => [...prevMessages, res]);

    } catch (error) {
      console.log("API Error", error);
    } finally {
      setLoading(false);
    }
  };
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

              {loading && (
                <div className="text-center text-gray-500">loading...</div>
              )}
            </div>
            <ChatInput
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
