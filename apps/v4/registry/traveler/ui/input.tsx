import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "trav-control min-h-10 w-full min-w-0 rounded-xs border border-input bg-background px-3 py-2 text-base selection:bg-primary selection:text-primary-foreground file:me-3 file:inline-flex file:min-h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground read-only:bg-muted disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
