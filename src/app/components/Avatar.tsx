"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { Activity, useEffect, useRef, useState } from "react";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function Avatar({ user }: { user?: User | null }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const el = rootRef.current;
      if (!el) return;
      // if click is outside the root element, close
      if (!el.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    // listen to pointerdown for better responsiveness across touch/mouse
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <Activity mode={user ? "visible" : "hidden"}>
      <div ref={rootRef}>
        <button
          className="flex items-center hover:bg-[hsl(var(--popover))] rounded-lg transition-colors p-2 cursor-pointer"
          type="button"
          onClick={() => setOpen(!open)}
        >
          {user?.image && (
            <Image
              src={user.image}
              width={32}
              height={32}
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-4"
            />
          )}
          <div className="flex flex-col items-start text-md">
            <span>{user?.name}</span>
          </div>
        </button>
        <Activity mode={open ? "visible" : "hidden"}>
          <div className="card absolute right-2 top-14 border shadow-lg p-2">
            <button
              className="button-destructive w-full"
              type="button"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        </Activity>
      </div>
    </Activity>
  );
}
