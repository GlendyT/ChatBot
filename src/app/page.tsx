import Chatbot from "./components/ChatBot/chatbot";

export default function Home() {
  return (
    <main className=" min-h-screen flex flex-col items-center p-24">
      <h1>Chatbot with OpenAI</h1>
      <Chatbot />
    </main>
  );
}
