import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "trav-control flex field-sizing-content min-h-24 w-full min-w-0 rounded-xs border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground read-only:bg-muted disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
