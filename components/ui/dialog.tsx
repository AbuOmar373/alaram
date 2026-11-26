"use client";
import * as React from "react";
import * as Primitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = Primitive.Root;
export const DialogTitle = Primitive.Title;
export const DialogDescription = Primitive.Description;
export function DialogContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Overlay className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm" />
      <Primitive.Content
        dir="rtl"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border bg-background p-6 shadow-2xl focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
        <Primitive.Close
          className="absolute left-4 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          aria-label="إغلاق"
        >
          <X className="h-4 w-4" />
        </Primitive.Close>
      </Primitive.Content>
    </Primitive.Portal>
  );
}
