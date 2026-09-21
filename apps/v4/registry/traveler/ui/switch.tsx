"use client"

import * as React from "react"
import { cn } from "cn"
import { Switch as SwitchPrimitive } from "radix-ui"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "trav-control peer group/switch inline-flex shrink-0 items-center rounded-full border border-input bg-background disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive data-[size=default]:h-6 data-[size=default]:w-11 data-[size=sm]:h-5 data-[size=sm]:w-9 data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-foreground transition-transform duration-[var(--trav-duration)] group-data-[size=default]/switch:size-5 group-data-[size=sm]/switch:size-4 data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=checked]:bg-primary-foreground data-[state=unchecked]:translate-x-0 rtl:data-[state=checked]:-translate-x-[calc(100%+2px)]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
