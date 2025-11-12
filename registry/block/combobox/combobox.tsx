import { ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PersistableEntity } from "@/registry/lib/utils/persistable-entity/persistable-entity";



/* DEFAULT VALUES FOR EXAMPLE PURPOSES */
interface MockOption extends PersistableEntity {
  name: string;
  description: string;
}

const defaultOptions: MockOption[] = [
  {
    id: "1",
    name: "Option 1",
    description: "This is the first option",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Option 2",
    description: "This is the second option",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    name: "Option 3",
    description: "This is the third option",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
  {
    id: "4",
    name: "Option 4",
    description: "This is the fourth option",
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04"),
  },
];

/* END DEFAULT VALUES FOR EXAMPLE PURPOSES */
interface Props<T extends PersistableEntity> {
  /** The options to display in the combobox */
  options?: T[];
  /** The key to use as the display value from the options object */
  dataKey?: keyof T;
  /** The currently selected value */
  value?: string;
  /** The default value to display in the combobox */
  defaultValue?: string;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Whether the combobox has an error */
  error?: boolean;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Optional CSS class for styling the combobox */
  className?: string;
  /** Callback fired when an item is selected */
  onSelect: (item: T) => void;
}

export default function Combobox<T extends PersistableEntity>(props: Props<T>) {
  const {
    options = defaultOptions as unknown as T[],
    dataKey = "name" as keyof T,
    value = "1",
    defaultValue = "1",
    disabled,
    searchPlaceholder = "Search here...",
    error,
    className,
    onSelect,
  } = props;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  function getItemName() {
    const element = options?.find((item) => item.id === value);
    return element ? String(element[dataKey]) : "-";
  }

  const filteredOptions = useMemo(() => {
    if (!options || options.length === 0) return [];
    if (!query || query.length === 0) return options;

    return options?.filter((item) => {
      return String(item[dataKey]).toLowerCase().includes(query.toLowerCase());
    });
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "h-9 w-[240px] min-w-[120px] max-w-full justify-between border bg-background py-0 text-sm font-normal text-muted-foreground disabled:cursor-not-allowed disabled:opacity-100",
            className,
            value && "font-semibold text-foreground",
            error && "border-destructive",
            disabled && "text-muted-foreground/50"
          )}
        >
          {getItemName()}
          <ChevronsUpDown className="opacity-50" size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("min-w-[40dvh] max-w-[80dvh] p-0")}>
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={(value) => setQuery(value)}
          />
          {filteredOptions.length > 0 ? (
            <CommandList>
              <CommandGroup>
                {filteredOptions.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      console.log(item);
                      onSelect;
                      setOpen(false);
                    }}
                  >
                    {String(item[dataKey])}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          ) : (
            <CommandEmpty className="flex flex-col text-muted-foreground p-6 items-center justify-center text-sm">
              <p className="font-semibold">No results found</p>
              <p>Please try a different search or check your spelling</p>
            </CommandEmpty>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
