"use client";

import { useState } from "react";
import Combobox from "./combobox";
import { PersistableEntity } from "@/registry/lib/utils/persistable-entity/persistable-entity";

interface MockOption extends PersistableEntity {
  name: string;
  description: string;
}

const sampleOptions: MockOption[] = [
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

export function ComboboxPreview() {
  const [selectedValue, setSelectedValue] = useState<string>("1");

  return (
    <Combobox
      options={sampleOptions}
      value={selectedValue}
      onSelect={(item) => setSelectedValue(item.id || "")}
      searchPlaceholder="Search options..."
    />
  );
}

