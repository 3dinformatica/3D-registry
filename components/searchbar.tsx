import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useEffect } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/registry/hooks/debounce/debounce";

export type searchBarProps = {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  debounceTime?: number;
};

export const Searchbar = (props: searchBarProps) => {
  const { value, onChange, disabled, className, placeholder, debounceTime } =
    props;

  const [inputValue, setInputValue] = useState<string | undefined>(value);
  const debouncedValue = useDebounce(inputValue ?? "", debounceTime);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange]);

  return (
    <section
      tabIndex={-1}
      className={cn(
        "min-w-[80px] w-fit group ml-1 mt-1 flex max-w-md items-center gap-2 rounded-md border px-2 py-1.5 focus-within:border-ring focus-within:outline-none focus-within:ring-1 focus-within:ring-ring",
        className
      )}
    >
      <Search
        size={16}
        className="text-muted-foreground group-focus-within:text-foreground"
      />
      <Input
        disabled={disabled}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="h-fit rounded-none border-none p-0 focus-visible:outline-none focus-visible:ring-0 shadow-none"
      />
      <Button
        variant="ghost"
        disabled={!inputValue || inputValue.length === 0}
        onClick={() => {
          setInputValue("");
        }}
        className={cn(
          "aspect-square size-5 p-0 hover:bg-accent hover:text-foreground disabled:opacity-20",
          inputValue && inputValue.length > 0 && "text-muted-foreground"
        )}
      >
        <X size={12} className="size-3" />
      </Button>
    </section>
  );
};
