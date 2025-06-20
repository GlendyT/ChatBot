import React, { FormEvent } from "react";

type ChatProps = {
  userMessage: string;
  setUserMessage: (value: string) => void;
  handleSendMessage: (e: FormEvent) => void;
};

const ChatInput = ({
  userMessage,
  setUserMessage,
  handleSendMessage,
}: ChatProps) => {
  return (
    <div className="flex space-x-2 items-center mt-auto">
      <form
        className="flex items-center justify-center w-full space-x-2"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 text-sm text-black bg-white"
          placeholder="Type your message here"
        />
        <button className="p-2 bg-white text-black inline-flex items-center justify-center rounded-md text-xs font-medium px-4 py-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
