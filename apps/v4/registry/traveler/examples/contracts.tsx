import * as Baseline_accordion from "@/registry/new-york-v4/ui/accordion"
import * as Baseline_alert from "@/registry/new-york-v4/ui/alert"
import * as Baseline_alert_dialog from "@/registry/new-york-v4/ui/alert-dialog"
import * as Baseline_aspect_ratio from "@/registry/new-york-v4/ui/aspect-ratio"
import * as Baseline_badge from "@/registry/new-york-v4/ui/badge"
import {
  Button as BaselineButton,
  buttonVariants as baselineButtonVariants,
} from "@/registry/new-york-v4/ui/button"
import * as Baseline_card from "@/registry/new-york-v4/ui/card"
import * as Baseline_checkbox from "@/registry/new-york-v4/ui/checkbox"
import * as Baseline_collapsible from "@/registry/new-york-v4/ui/collapsible"
import * as Baseline_dialog from "@/registry/new-york-v4/ui/dialog"
import * as Baseline_direction from "@/registry/new-york-v4/ui/direction"
import * as Baseline_dropdown_menu from "@/registry/new-york-v4/ui/dropdown-menu"
import * as Baseline_input from "@/registry/new-york-v4/ui/input"
import * as Baseline_label from "@/registry/new-york-v4/ui/label"
import * as Baseline_popover from "@/registry/new-york-v4/ui/popover"
import * as Baseline_progress from "@/registry/new-york-v4/ui/progress"
import * as Baseline_radio_group from "@/registry/new-york-v4/ui/radio-group"
import * as Baseline_scroll_area from "@/registry/new-york-v4/ui/scroll-area"
import * as Baseline_select from "@/registry/new-york-v4/ui/select"
import * as Baseline_separator from "@/registry/new-york-v4/ui/separator"
import * as Baseline_skeleton from "@/registry/new-york-v4/ui/skeleton"
import * as Baseline_spinner from "@/registry/new-york-v4/ui/spinner"
import * as Baseline_switch from "@/registry/new-york-v4/ui/switch"
import * as Baseline_table from "@/registry/new-york-v4/ui/table"
import * as Baseline_tabs from "@/registry/new-york-v4/ui/tabs"
import * as Baseline_textarea from "@/registry/new-york-v4/ui/textarea"
import * as Baseline_tooltip from "@/registry/new-york-v4/ui/tooltip"
import * as Traveler_accordion from "@/registry/traveler/ui/accordion"
import * as Traveler_alert from "@/registry/traveler/ui/alert"
import * as Traveler_alert_dialog from "@/registry/traveler/ui/alert-dialog"
import * as Traveler_aspect_ratio from "@/registry/traveler/ui/aspect-ratio"
import * as Traveler_badge from "@/registry/traveler/ui/badge"
import { Button, buttonVariants } from "@/registry/traveler/ui/button"
import * as Traveler_card from "@/registry/traveler/ui/card"
import * as Traveler_checkbox from "@/registry/traveler/ui/checkbox"
import * as Traveler_collapsible from "@/registry/traveler/ui/collapsible"
import * as Traveler_dialog from "@/registry/traveler/ui/dialog"
import * as Traveler_direction from "@/registry/traveler/ui/direction"
import * as Traveler_dropdown_menu from "@/registry/traveler/ui/dropdown-menu"
import * as Traveler_input from "@/registry/traveler/ui/input"
import * as Traveler_label from "@/registry/traveler/ui/label"
import * as Traveler_popover from "@/registry/traveler/ui/popover"
import * as Traveler_progress from "@/registry/traveler/ui/progress"
import * as Traveler_radio_group from "@/registry/traveler/ui/radio-group"
import * as Traveler_scroll_area from "@/registry/traveler/ui/scroll-area"
import * as Traveler_select from "@/registry/traveler/ui/select"
import * as Traveler_separator from "@/registry/traveler/ui/separator"
import * as Traveler_skeleton from "@/registry/traveler/ui/skeleton"
import * as Traveler_spinner from "@/registry/traveler/ui/spinner"
import * as Traveler_switch from "@/registry/traveler/ui/switch"
import * as Traveler_table from "@/registry/traveler/ui/table"
import * as Traveler_tabs from "@/registry/traveler/ui/tabs"
import * as Traveler_textarea from "@/registry/traveler/ui/textarea"
import * as Traveler_tooltip from "@/registry/traveler/ui/tooltip"

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

export const selectContract: typeof Baseline_select = Traveler_select
export const baseline_selectContract: typeof Traveler_select = Baseline_select

export const tabsContract: typeof Baseline_tabs = Traveler_tabs
export const baseline_tabsContract: typeof Traveler_tabs = Baseline_tabs

export const alert_dialogContract: typeof Baseline_alert_dialog =
  Traveler_alert_dialog
export const baseline_alert_dialogContract: typeof Traveler_alert_dialog =
  Baseline_alert_dialog

export const popoverContract: typeof Baseline_popover = Traveler_popover
export const baseline_popoverContract: typeof Traveler_popover =
  Baseline_popover

export const tooltipContract: typeof Baseline_tooltip = Traveler_tooltip
export const baseline_tooltipContract: typeof Traveler_tooltip =
  Baseline_tooltip

export const progressContract: typeof Baseline_progress = Traveler_progress
export const baseline_progressContract: typeof Traveler_progress =
  Baseline_progress

export const tableContract: typeof Baseline_table = Traveler_table
export const baseline_tableContract: typeof Traveler_table = Baseline_table

export const scroll_areaContract: typeof Baseline_scroll_area =
  Traveler_scroll_area
export const baseline_scroll_areaContract: typeof Traveler_scroll_area =
  Baseline_scroll_area

export const accordionContract: typeof Baseline_accordion = Traveler_accordion
export const baseline_accordionContract: typeof Traveler_accordion =
  Baseline_accordion

export const collapsibleContract: typeof Baseline_collapsible =
  Traveler_collapsible
export const baseline_collapsibleContract: typeof Traveler_collapsible =
  Baseline_collapsible

export const aspect_ratioContract: typeof Baseline_aspect_ratio =
  Traveler_aspect_ratio
export const baseline_aspect_ratioContract: typeof Traveler_aspect_ratio =
  Baseline_aspect_ratio

export const directionContract: typeof Baseline_direction = Traveler_direction
export const baseline_directionContract: typeof Traveler_direction =
  Baseline_direction

export const alertContract: typeof Baseline_alert = Traveler_alert
export const baseline_alertContract: typeof Traveler_alert = Baseline_alert

export const skeletonContract: typeof Baseline_skeleton = Traveler_skeleton
export const baseline_skeletonContract: typeof Traveler_skeleton =
  Baseline_skeleton

export const spinnerContract: typeof Baseline_spinner = Traveler_spinner
export const baseline_spinnerContract: typeof Traveler_spinner =
  Baseline_spinner
