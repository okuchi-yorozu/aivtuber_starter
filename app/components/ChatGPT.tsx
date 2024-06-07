"use client";

import { FormEvent, useState } from "react";

import Live2DModel from "@/app/components/Live2DModel";

type Message = {
  role: string;
  content: string;
};
export default function ChatGPT() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<Message | null>(null);
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(messages);
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, prompt, messages }),
    });

    const data = await res.json();
    setResponse(data.message);

    const tmpMessages = [...messages, data.message];
    setMessages(tmpMessages);

    if (userId === null) {
      setUserId(data.id);
    }
  };

  return (
    <div>
      <div>userId: {userId}</div>
      <h1>AIVTuber</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="質問を入力してください"
              rows={5}
              cols={50}
            />
          </div>
          <button type="submit">実行</button>
        </div>
      </form>
      {response && response.content && (
        <div>
          <h2>応答:</h2>
          <textarea rows={5} cols={50} value={response.content}></textarea>
        </div>
      )}
      <Live2DModel />
    </div>
  );
}
