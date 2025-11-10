"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { BooleanIcon } from "./icon-boolean";

export function IconBooleanPreview() {
  const [value, setValue] = useState<boolean | null | undefined>(true);
  const [size, setSize] = useState<"sm" | "base" | "lg" | undefined | null>(
    "base"
  );
  const [variant, setVariant] = useState<
    "success" | "error" | "muted" | undefined | null
  >("success");

  return (
    <div className="flex flex-col gap-6 p-6 items-center h-full">
      <section className="flex flex-row items-center gap-6">
        <Tabs
          value={size || undefined}
          onValueChange={(value) =>
            setSize(value as "sm" | "base" | "lg" | undefined | null)
          }
          className="flex flex-row items-center gap-2"
        >
          Size:
          <TabsList>
            <TabsTrigger value="sm">Small</TabsTrigger>
            <TabsTrigger value="base">Base</TabsTrigger>
            <TabsTrigger value="lg">Large</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs
          value={variant || undefined}
          onValueChange={(value) => {
            if (value === "success") {
              setValue(true);
            } else if (value === "error") {
              setValue(false);
            } else {
              setValue(undefined);
            }

            return setVariant(
              value as "success" | "error" | "muted" | undefined | null
            );
          }}
          className="flex flex-row items-center gap-2"
        >
          Variant:
          <TabsList>
            <TabsTrigger value="success">Success</TabsTrigger>
            <TabsTrigger value="error">Error</TabsTrigger>
            <TabsTrigger value="muted">Muted</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>
      <section className="flex h-full w-full items-center justify-center p-6 bg-muted/50 rounded-lg">
        <BooleanIcon value={value} size={size} variant={variant} />
      </section>
    </div>
  );
}

