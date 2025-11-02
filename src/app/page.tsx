"use client";

import { BrainCircuit } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="w-full h-screen absolute top-0 flex items-center">
      <div className="card max-w-lg mx-auto p-4 flex flex-col gap-8">
        <h1 className="text-2xl font-bold flex flex-row items-center">
          <BrainCircuit />
          <span className="ml-4">Axon</span>
        </h1>
        <p className="text-lg">
          Axon is a developer platform to handle service deployment and release
          management. It utilizes GitOps and leverages GitHub pull requests to
          promote services and change configurations.
        </p>
        {/* <Activity mode={session && session.error ? "visible" : "hidden"}>
          <p className="text-lg card p-4 bg-[hsl(var(--destructive))] flex flex-col">
            <strong>Login Error</strong>
            <span>{session?.error || "An unknown error occurred."}</span>
          </p>
        </Activity> */}
        <button
          className="button-primary"
          type="button"
          onClick={() => signIn("github")}
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}
