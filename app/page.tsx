"use client";

import Link from "next/link";

import ChatGPT from "@/app/components/ChatGPT";

export default function Home() {
  return (
    <div>
      <ChatGPT />
      <Link href="/analytics">analytics</Link>
    </div>
  );
}
