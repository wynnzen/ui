import {
  Button as BaselineButton,
  buttonVariants as baselineButtonVariants,
} from "@/registry/new-york-v4/ui/button"
import * as Baseline_card from "@/registry/new-york-v4/ui/card"
import * as Baseline_dialog from "@/registry/new-york-v4/ui/dialog"
import * as Baseline_dropdown_menu from "@/registry/new-york-v4/ui/dropdown-menu"
import * as Baseline_input from "@/registry/new-york-v4/ui/input"
import { Button, buttonVariants } from "@/registry/traveler/ui/button"
import * as Traveler_card from "@/registry/traveler/ui/card"
import * as Traveler_dialog from "@/registry/traveler/ui/dialog"
import * as Traveler_dropdown_menu from "@/registry/traveler/ui/dropdown-menu"
import * as Traveler_input from "@/registry/traveler/ui/input"

// Assignment in both directions catches changed required props and narrowed APIs.
export const buttonContract: typeof BaselineButton = Button
export const baselineButtonContract: typeof Button = BaselineButton
export const variantsContract: typeof baselineButtonVariants = buttonVariants
export const baselineVariantsContract: typeof buttonVariants =
  baselineButtonVariants

export const cardContract: typeof Baseline_card = Traveler_card
export const baseline_cardContract: typeof Traveler_card = Baseline_card

export const inputContract: typeof Baseline_input = Traveler_input
export const baseline_inputContract: typeof Traveler_input = Baseline_input

export const dialogContract: typeof Baseline_dialog = Traveler_dialog
export const baseline_dialogContract: typeof Traveler_dialog = Baseline_dialog

export const dropdown_menuContract: typeof Baseline_dropdown_menu =
  Traveler_dropdown_menu
export const baseline_dropdown_menuContract: typeof Traveler_dropdown_menu =
  Baseline_dropdown_menu
