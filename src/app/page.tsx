"use client";
import Quiz from "@/components/Quiz";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-4xl w-full">
        <Quiz />
      </div>
    </main>
  );
}
