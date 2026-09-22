import { cn } from "cn"
import { Loader2Icon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(
        "size-4 animate-spin text-current motion-reduce:animate-none",
        className
      )}
      {...props}
    />
  )
}

export { Spinner }
