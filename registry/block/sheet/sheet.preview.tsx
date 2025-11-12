"use client";

import { useState } from "react";
import { Sheet3D } from "./sheet";
import { FileText } from "lucide-react";

export function SheetPreview() {
  const [open, setOpen] = useState(false);
  
  const sampleData = {
    id: "1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
    disabledAt: null,
  };

  return (
    <Sheet3D
      open={open}
      onOpenChange={setOpen}
      data={sampleData}
      sheetIcon={FileText}
      sheetTitle="Sheet Preview"
      sheetDescription="This is a preview of the sheet component"
      triggerText="Open Sheet"
    >
      <div className="p-6">
        <p className="text-sm text-muted-foreground">
          This is the content area of the sheet. You can add any content here.
        </p>
      </div>
    </Sheet3D>
  );
}

