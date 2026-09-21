import * as Baseline_badge from "@/registry/new-york-v4/ui/badge"
import {
  Button as BaselineButton,
  buttonVariants as baselineButtonVariants,
} from "@/registry/new-york-v4/ui/button"
import * as Baseline_card from "@/registry/new-york-v4/ui/card"
import * as Baseline_checkbox from "@/registry/new-york-v4/ui/checkbox"
import * as Baseline_dialog from "@/registry/new-york-v4/ui/dialog"
import * as Baseline_dropdown_menu from "@/registry/new-york-v4/ui/dropdown-menu"
import * as Baseline_input from "@/registry/new-york-v4/ui/input"
import * as Baseline_label from "@/registry/new-york-v4/ui/label"
import * as Baseline_radio_group from "@/registry/new-york-v4/ui/radio-group"
import * as Baseline_separator from "@/registry/new-york-v4/ui/separator"
import * as Baseline_switch from "@/registry/new-york-v4/ui/switch"
import * as Baseline_textarea from "@/registry/new-york-v4/ui/textarea"
import * as Traveler_badge from "@/registry/traveler/ui/badge"
import { Button, buttonVariants } from "@/registry/traveler/ui/button"
import * as Traveler_card from "@/registry/traveler/ui/card"
import * as Traveler_checkbox from "@/registry/traveler/ui/checkbox"
import * as Traveler_dialog from "@/registry/traveler/ui/dialog"
import * as Traveler_dropdown_menu from "@/registry/traveler/ui/dropdown-menu"
import * as Traveler_input from "@/registry/traveler/ui/input"
import * as Traveler_label from "@/registry/traveler/ui/label"
import * as Traveler_radio_group from "@/registry/traveler/ui/radio-group"
import * as Traveler_separator from "@/registry/traveler/ui/separator"
import * as Traveler_switch from "@/registry/traveler/ui/switch"
import * as Traveler_textarea from "@/registry/traveler/ui/textarea"

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

export const badgeContract: typeof Baseline_badge = Traveler_badge
export const baseline_badgeContract: typeof Traveler_badge = Baseline_badge

export const separatorContract: typeof Baseline_separator = Traveler_separator
export const baseline_separatorContract: typeof Traveler_separator =
  Baseline_separator

export const labelContract: typeof Baseline_label = Traveler_label
export const baseline_labelContract: typeof Traveler_label = Baseline_label

export const textareaContract: typeof Baseline_textarea = Traveler_textarea
export const baseline_textareaContract: typeof Traveler_textarea =
  Baseline_textarea

export const checkboxContract: typeof Baseline_checkbox = Traveler_checkbox
export const baseline_checkboxContract: typeof Traveler_checkbox =
  Baseline_checkbox

export const radio_groupContract: typeof Baseline_radio_group =
  Traveler_radio_group
export const baseline_radio_groupContract: typeof Traveler_radio_group =
  Baseline_radio_group

export const switchContract: typeof Baseline_switch = Traveler_switch
export const baseline_switchContract: typeof Traveler_switch = Baseline_switch
