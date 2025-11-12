import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatTimestamp } from "@/registry/lib/utils/util-date-formatters/util-date-formatters";
import { PersistableEntity } from "@/registry/lib/utils/persistable-entity/persistable-entity";
import { Separator } from "@/components/ui/separator";

interface Sheet3DProps<TData extends PersistableEntity>
  extends React.ComponentProps<typeof Sheet> {
  isForm?: boolean;
  children: ReactNode;
  data?: TData;
  sheetIcon?: LucideIcon;
  sheetTitle: string;
  sheetDescription?: string;
  trigger?: ReactNode;
  triggerText?: string;
  sheetContentClassName?: string;
  sheetHeaderClassName?: string;
  triggerClassName?: string;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Sheet3D<TData extends PersistableEntity>({
  data,
  sheetIcon: SheetIcon,
  sheetTitle,
  sheetDescription,
  children,
  trigger,
  triggerText = "Nuovo",
  triggerClassName,
  disabled,
  open,
  onOpenChange,
  sheetContentClassName,
  sheetHeaderClassName,
}: Sheet3DProps<TData>) {
  const { createdAt, updatedAt, disabledAt } = data || {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            size={"sm"}
            disabled={disabled}
            className={cn(
              "text-foreground bg-transparent p-0 font-medium underline shadow-none",
              "hover:text-primary hover:bg-transparent",
              triggerClassName
            )}
          >
            {triggerText ? triggerText : "Nuovo"}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        className={cn(
          "flex min-w-[28dvw] flex-col gap-0 p-0",
          sheetContentClassName
        )}
      >
        {/* Header */}
        <SheetHeader
          className={cn(
            "flex flex-row items-center justify-start gap-4 px-6 py-4",
            sheetHeaderClassName
          )}
        >
          {SheetIcon && (
            <div className="border-primary from-primary/20 to-primary/5 ring-primary/10 flex size-10 items-center justify-center rounded-lg border-2 bg-linear-to-br">
              <SheetIcon className="text-primary" size={24} />
            </div>
          )}
          <div className="flex flex-col gap-0">
            <SheetTitle className="m-0 p-0">{sheetTitle}</SheetTitle>
            {sheetDescription && (
              <SheetDescription className="m-0 p-0">
                {sheetDescription}
              </SheetDescription>
            )}
          </div>
        </SheetHeader>
        <Separator />
        {data && (
          <div className="flex h-fit flex-row items-center justify-evenly gap-4 px-6 pt-4 pb-0">
            <div className="flex h-fit w-full flex-col gap-0.5 text-sm">
              <p className="text-muted-foreground font-normal">Creata il:</p>
              {createdAt ? (
                <span>{formatTimestamp(createdAt)}</span>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </div>
            <Separator orientation="vertical" />
            <div className="flex h-fit w-full flex-col gap-0.5 text-sm">
              <p className="text-muted-foreground font-normal">
                Aggiornata il:
              </p>
              {updatedAt ? (
                <span>{formatTimestamp(updatedAt)}</span>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </div>
            <Separator orientation="vertical" />
            <div className="flex h-fit w-full flex-col gap-0.5 text-sm">
              <p className="text-muted-foreground font-normal">
                Disabilitata il:
              </p>
              {disabledAt ? (
                <span>{formatTimestamp(disabledAt)}</span>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </div>
          </div>
        )}
        {/* Content - Scrollable area */}
        <div className="h-full flex-1 overflow-y-auto">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
