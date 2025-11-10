"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useDebounce } from "@/registry/hooks/debounce/debounce";

interface CopyButtonProps {
  toCopy: string;
}

export default function CopyButton(props: CopyButtonProps) {
  const { toCopy } = props;

  const [copied, setCopied] = useState(false);
  const debouncedCopied = useDebounce(copied, 2000);

  const handleCopy = () => {
    navigator.clipboard.writeText(toCopy);
    setCopied(true);
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Reset copied state when debounced value changes
  useEffect(() => {
    if (debouncedCopied === false) {
      setCopied(false);
    }
  }, [debouncedCopied]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={cn(
        "flex flex-row items-center justify-center size-5.5 p-0 rounded-sm transition-all duration-300 ease-in-out text-muted-foreground hover:bg-accent cursor-pointer",
        copied &&
          "w-fit gap-0.5 px-1.5 bg-green-100 text-green-500 hover:bg-green-100 hover:text-green-500"
      )}
    >

        {copied ? (
          <Check
            className={"size-3 transition-all duration-300 ease-in-out"}
          />
        ) : (
          <Copy className={"size-3 transition-all duration-300 ease-in-out"} />
        )}
        {copied && <span className="text-xs">Copied</span>}

    </Button>
  );
}
