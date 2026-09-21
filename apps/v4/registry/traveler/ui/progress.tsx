"use client"

import * as React from "react"
import { cn } from "cn"
import { Progress as ProgressPrimitive } from "radix-ui"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  // Match Radix's validated range when calculating the visual fill.
  const max = typeof props.max === "number" && props.max > 0 ? props.max : 100
  const percent =
    typeof value === "number" && value >= 0 && value <= max
      ? (value / max) * 100
      : 0
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-xs border bg-muted",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full bg-primary transition-transform duration-(--trav-duration) data-[state=indeterminate]:w-1/3 data-[state=indeterminate]:!transform-none data-[state=indeterminate]:opacity-70 forced-colors:bg-[CanvasText]!"
        style={{ transform: `translateX(-${100 - percent}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
