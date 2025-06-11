import React from "react";
import { CiUser } from "react-icons/ci";
import { Message } from "../chatbot";

const UserMessage = ({ role, content }: Message) => {
  return (
    <div className="flex w-full my-2">
      <div className="flex justify-center p-1 w-8 h-8 border bg-slate-800 rounded-full mr-2">
        <CiUser size={18} />
      </div>
      <div>
        <div>{role}</div>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default UserMessage;
