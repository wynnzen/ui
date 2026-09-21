import {
  Button as BaselineButton,
  buttonVariants as baselineButtonVariants,
} from "@/registry/new-york-v4/ui/button"
import { Button, buttonVariants } from "@/registry/traveler/ui/button"

// Assignment in both directions catches changed required props and narrowed APIs.
export const buttonContract: typeof BaselineButton = Button
export const baselineButtonContract: typeof Button = BaselineButton
export const variantsContract: typeof baselineButtonVariants = buttonVariants
export const baselineVariantsContract: typeof buttonVariants =
  baselineButtonVariants
