"use client";

import { useState } from "react";
import Sidebar from "./sidebar";

export function SidebarPreview() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="w-fit px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        {isVisible ? "Hide" : "Show"} Sidebar
      </button>
      {isVisible && <Sidebar />}
    </div>
  );
}

