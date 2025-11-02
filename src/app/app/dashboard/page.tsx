"use client";

import { useEffect, useMemo, useState } from "react";
import { Container, Rocket, Server, SquareDashed } from "lucide-react";
import Link from "next/link";

interface Service {
  release: string;
  repository?: string;
  chart?: string;
  tag?: string;
}

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const tenants = [];
  const clusters = [];
  const services = [];

  return (
    <div className="p-4">
      <main className="mx-auto gap-8 max-w-5xl">
        {/* Overview card */}
        <div className="card rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex justify-between text-center">
            <div className="flex-1">
              <div className="text-md text-[hsl(var(--foreground))]">
                <span className="mr-1">Services</span>
              </div>
              <div className="flex items-center justify-center mb-2 gap-2">
                <Container />
                <div className="text-3xl font-bold">{services.length}</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-md text-[hsl(var(--foreground))]">
                <span className="mr-1">Clusters</span>
              </div>
              <div className="flex items-center justify-center mb-2 gap-2">
                <Server />
                <div className="text-3xl font-bold">{clusters.length}</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-md text-[hsl(var(--foreground))]">
                <span className="mr-1">Tenants</span>
              </div>
              <div className="flex items-center justify-center mb-2 gap-2">
                <SquareDashed />
                <div className="text-3xl font-bold">{tenants.length}</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search infrastructure"
              className="grow input rounded px-4 py-4 text-lg"
            />
            <button className="ml-4 button-primary flex flex-row items-center">
              <Rocket />
              <span className="ml-2 flex flex-row items-center">
                Deploy Service
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
