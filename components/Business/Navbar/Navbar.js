"use client";

import { useSession, signOut } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="bg-cyan-200 flex items-center justify-between px-5 py-3">
      <div className="flex">
        <div className="text-2xl font-semibold">Todo Advance</div>
      </div>
      <div className="flex justify-end items-center gap-2">
        <img src={session?.user?.image} className="image rounded-full w-12" />
        <div className="text-2xl">{session?.user?.name}</div>
        <div>
          <button
            className="text-fuchsia-700 text-xl hover:underline"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Signout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
