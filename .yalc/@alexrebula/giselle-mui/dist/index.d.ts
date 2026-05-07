import * as _mui_material_styles from '@mui/material/styles';
import { SxProps, Theme } from '@mui/material/styles';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { IconProps } from '@iconify/react';
import React, { ReactNode } from 'react';
import { AccordionProps as AccordionProps$1 } from '@mui/material/Accordion';
import { BoxProps } from '@mui/material/Box';
import { PaperProps } from '@mui/material/Paper';
import { ButtonBaseProps } from '@mui/material/ButtonBase';
import { CardProps } from '@mui/material/Card';
import { TimelineDotProps } from '@mui/lab/TimelineDot';
import { IconButtonProps } from '@mui/material/IconButton';
import { TooltipProps } from '@mui/material/Tooltip';
import { GridProps } from '@mui/material/Grid';
import { StackProps } from '@mui/material/Stack';
import { ContainerProps } from '@mui/material/Container';
import { ApexOptions } from 'apexcharts';

/**
 * A single icon entry in the flat icon map.
 *
 * `body` — The raw SVG path content — everything that would go _inside_ the
 *   `<svg>` wrapper tag, not including the wrapper itself.
 *
 *   HOW TO GET THE BODY STRING FOR ANY ICON:
 *   1. Browse https://icon-sets.iconify.design/ and find your icon.
 *   2. Click the icon → "Download" → switch to "JSON" tab. You will see the
 *      raw `body` string. Alternatively:
 *   3. Install the icon set package: `npm install --save-dev @iconify-json/solar`
 *   4. Open `node_modules/@iconify-json/solar/icons.json`
 *   5. Find your icon by name (e.g. "rocket-bold-duotone") and copy the `body` value.
 *   6. Paste it as-is — do NOT wrap it in `<svg>...</svg>` tags.
 *
 *   COMMON MISTAKES WHEN COPYING SVG BODIES:
 *   ❌ Copying the full SVG file: `<svg viewBox="..." xmlns="..."><path .../></svg>`
 *      → The `<svg>` wrapper is added by @iconify/react. Including it yourself
 *        produces nested `<svg>` elements and breaks the icon.
 *   ❌ Keeping the `xmlns` attribute: `<path xmlns="http://www.w3.org/2000/svg" .../>`
 *      → The `xmlns` is already on the outer `<svg>`. Repeating it on inner
 *        elements is harmless in browsers but clutters the body string.
 *   ❌ Using `fill="black"` or `fill="#000000"` for monochrome icons
 *      → Use `fill="currentColor"` instead. This makes the icon inherit the CSS
 *        `color` property, so `sx={{ color: 'primary.main' }}` works.
 *   ✅ Correct body (Solar icon): `'<path fill="currentColor" d="M12 2c..." />'`
 *   ✅ Correct body (logo, multi-path): `'<path fill="#3178c6" d="..." /><path fill="#fff" d="..." />'`
 *
 * `width` — viewBox width. **Omit** for icons with a 24×24 viewBox (Solar,
 *   simple-icons, mdi, ph, lucide, etc.). **Required** for icons with a
 *   non-24 viewBox — the `logos:` collection commonly uses 256px or larger.
 *   To find the correct value: check the `width` field in the icon's source
 *   `icons.json`, or inspect the `viewBox` attribute of the raw SVG file.
 *
 * `height` — viewBox height. Same rule as `width`.
 */
interface GiselleIconData {
    body: string;
    width?: number;
    height?: number;
}
/**
 * A flat map of icon entries keyed by `"prefix:name"` strings.
 *
 * @example
 * const icons: GiselleIconMap = {
 *   'solar:rocket-bold-duotone': { body: '...' },
 *   'logos:react': { body: '...' },
 *   'logos:angular-icon': { width: 256, height: 271, body: '...' },
 * };
 */
type GiselleIconMap = Record<string, GiselleIconData>;
/**
 * Creates an idempotent icon registrar from a flat icon map.
 *
 * **Idempotent** means: safe to call multiple times, but only does work once.
 * The first call registers all icons with `@iconify/react`. Every subsequent
 * call is a no-op (it returns immediately without re-registering). This means
 * you can call `registerIcons()` at module level in multiple files without
 * worrying about duplicate registrations or performance penalties.
 *
 * Groups the flat `"prefix:name"` entries into per-prefix Iconify collections
 * and registers them with `@iconify/react`'s `addCollection` on the first call.
 *
 * Call the returned function at module level in your consuming/client app —
 * not inside a React component, not in a `useEffect` hook — so the store is
 * populated before any `GiselleIcon` attempts to render.
 *
 * @param icons - Flat map of `"prefix:name"` → icon data entries.
 * @returns An idempotent `registerIcons()` function.
 *
 * @example
 * // src/icon-sets.ts  (in your consuming/client app)
 * import { createIconRegistrar } from '@alexrebula/giselle-mui';
 *
 * export const registerIcons = createIconRegistrar({
 *   'solar:rocket-bold-duotone': { body: '...' },
 *   'logos:react': { body: '...' },
 *   'logos:typescript-icon': { width: 256, height: 256, body: '...' },
 * });
 */
declare function createIconRegistrar(icons: GiselleIconMap): () => void;

/**
 * Theme utility helpers for MUI v7 CSS Variables mode.
 *
 * These are commonly needed when building themes with `extendTheme()` and
 * `theme.vars.palette.*`. They are intentionally tiny, dependency-free, and
 * safe to use in any consumer project alongside `@mui/material` v7.
 */
/**
 * Produces an `rgba(channel / alpha)` string from a MUI v7 CSS-variable channel value.
 *
 * MUI v7 CSS Variables mode exposes palette colours as space-separated RGB
 * channels (e.g. `theme.vars.palette.primary.mainChannel → "99 102 241"`).
 * This helper converts that channel string + an alpha value to a valid CSS Color 4
 * expression using slash syntax.
 *
 * **Why slash syntax, not comma syntax:**
 * The channel value can be either a literal string (`"99 102 241"`) or a
 * CSS `var(--mui-palette-primary-mainChannel)` reference. Slash syntax
 * (`rgba(var(...) / 0.08)`) is valid CSS and works in all cases. The older
 * comma syntax (`rgba(var(...), 0.08)`) does not work with CSS var references
 * because a single var cannot substitute multiple comma-separated arguments.
 *
 * @param channel - Space-separated RGB string or CSS `var()` reference.
 *   Matches the format of `theme.vars.palette[color].mainChannel` in MUI v7.
 * @param alpha - Opacity value between `0` (fully transparent) and `1` (fully opaque).
 * @returns A valid CSS Color 4 `rgba(channel / alpha)` string.
 *
 * @example
 * ```tsx
 * sx={(theme) => ({
 *   backgroundColor: channelAlpha(theme.vars.palette.primary.mainChannel, 0.08),
 * })}
 * ```
 */
declare function channelAlpha(channel: string, alpha: number): string;
/**
 * Converts a hex colour string to a space-separated RGB channel string
 * compatible with MUI v7 CSS Variables palette channels.
 *
 * Use this when you need to define a custom colour in a theme that uses
 * `channelAlpha` for tinting. The output can be stored as a custom channel and
 * passed to `channelAlpha`.
 *
 * @param hex - A 6-digit hex colour string with or without the `#` prefix,
 *   e.g. `"#6366f1"` or `"6366f1"`.
 * @returns A space-separated RGB channel string, e.g. `"99 102 241"`.
 * @throws {Error} If the hex value cannot be parsed (invalid format).
 *
 * @example
 * ```ts
 * const channel = hexToChannel('#6366f1'); // "99 102 241"
 * channelAlpha(channel, 0.08);             // "rgba(99 102 241 / 0.08)"
 * ```
 */
declare function hexToChannel(hex: string): string;
/**
 * Converts a pixel value to a `rem` string using a 16px root font size baseline.
 *
 * Useful for defining typography scales in `extendTheme()` where rem units are
 * preferred for accessibility (user font-size overrides apply).
 *
 * @param px - The pixel value to convert (e.g. `14`).
 * @returns A `rem` string (e.g. `"0.875rem"`).
 *
 * @example
 * ```ts
 * pxToRem(14)  // "0.875rem"
 * pxToRem(16)  // "1rem"
 * pxToRem(24)  // "1.5rem"
 * ```
 */
declare function pxToRem(px: number): string;
/**
 * Converts a `rem` value to its pixel equivalent using a 16px root font size baseline.
 *
 * Useful when consuming a typography scale defined in `rem` and needing a numeric
 * pixel value for canvas calculations, fixed-size containers, or Storybook annotations.
 *
 * @param rem - The rem value to convert (e.g. `0.875`).
 * @returns The pixel value as a number (e.g. `14`).
 *
 * @example
 * ```ts
 * remToPx(0.875)  // 14
 * remToPx(1)      // 16
 * remToPx(1.5)    // 24
 * ```
 */
declare function remToPx(rem: number): number;

/**
 * Giselle brand theme preset for MUI v7 CSS Variables mode.
 *
 * Defines the Giselle ecosystem's default palette as a ready-to-use
 * `extendTheme()` result. Pass directly to `ThemeProvider` or use the
 * zero-config `GiselleThemeProvider` wrapper (Phase C).
 *
 * **Brand palette — the Carabao mango tree:**
 * - Primary   — Deep grove green `#2E7D32` (Lime `#76C442` in dark mode)
 * - Secondary — Mango gold `#F5A623`
 */
/**
 * Giselle brand primary colour — Deep grove green `#2E7D32`.
 *
 * Used as the light-mode primary. Achieves 4.76:1 contrast against white —
 * passes WCAG 2.1 AA for normal text.
 */
declare const GISELLE_PRIMARY_MAIN = "#2E7D32";
/**
 * Giselle brand primary colour in dark mode — Lime green `#76C442`.
 *
 * Lighter variant applied as `primary.main` in the dark colour scheme so
 * primary-tinted surfaces and text remain readable on dark backgrounds.
 */
declare const GISELLE_PRIMARY_DARK_MAIN = "#76C442";
/**
 * Giselle brand secondary colour — Mango gold `#F5A623`.
 *
 * The Carabao mango accent. Identical in both light and dark colour schemes.
 */
declare const GISELLE_SECONDARY_MAIN = "#F5A623";
/**
 * The Giselle brand theme preset.
 *
 * A ready-to-use result of `extendTheme()` carrying the full Giselle palette
 * for both light and dark colour schemes.
 *
 * **Usage — with `ThemeProvider` directly:**
 * ```tsx
 * import { ThemeProvider } from '@mui/material/styles';
 * import { giselleTheme } from '@alexrebula/giselle-mui';
 *
 * <ThemeProvider theme={giselleTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * **Usage — via `GiselleThemeProvider` (Phase C, zero-config):**
 * ```tsx
 * import { GiselleThemeProvider } from '@alexrebula/giselle-mui';
 *
 * <GiselleThemeProvider>
 *   <App />
 * </GiselleThemeProvider>
 * ```
 *
 * **Palette decisions:**
 * - `primary`   — Deep grove green / Lime (dark mode): the tree foundation
 * - `secondary` — Mango gold: the fruit accent, unchanged between modes
 * - `info`      — Accessible blue (standard MUI default family)
 * - `success`   — Leaf green `#388E3C` — distinct from primary to avoid ambiguity
 * - `warning`   — Amber orange `#ED6C02` — warm, complements the mango gold family
 * - `error`     — Standard red `#D32F2F`
 */
declare const giselleTheme: Omit<_mui_material_styles.Theme, "applyStyles"> & _mui_material_styles.CssVarsTheme;

/**
 * Props for {@link GiselleIcon}.
 *
 * Not extending `IconProps` directly — `@iconify/react` types `display` as
 * `string | number`, which conflicts with MUI Box's `ResponsiveStyleValue<Display>`
 * and causes a TypeScript overload resolution failure when used with `Box component`.
 * Only the safe subset of `IconProps` is exposed here.
 */
interface GiselleIconProps {
    /**
     * Iconify icon identifier in the format `"prefix:name"`,
     * e.g. `"solar:rocket-bold-duotone"` or `"logos:react"`.
     */
    icon: string;
    /**
     * MUI `sx` prop for theming, spacing, color, and responsive styles.
     * Applied to the outer `Box component="span"` wrapper.
     */
    sx?: SxProps<Theme>;
    /**
     * Icon width in pixels (or any valid CSS length string).
     * @default 20
     */
    width?: number | string;
    /**
     * Icon height in pixels (or any valid CSS length string).
     * Defaults to `width` when omitted, keeping icons square by default.
     */
    height?: number | string;
    /** HTML `class` attribute forwarded to the inner `Icon` SVG element. */
    className?: string;
    /** Inline style forwarded to the inner `Icon` SVG element. */
    style?: React.CSSProperties;
    /**
     * Flip the icon horizontally, vertically, or both.
     * @example `"horizontal"` | `"vertical"` | `"horizontal,vertical"`
     */
    flip?: IconProps['flip'];
    /**
     * Rotate the icon.
     * Accepts 0–3 (quarter-turn increments) or a CSS angle string like `"90deg"`.
     */
    rotate?: IconProps['rotate'];
}

/**
 * GiselleIcon — zero-dependency icon component with MUI `sx` support.
 *
 * A thin wrapper around `@iconify/react`'s `Icon` that adds the full MUI `sx`
 * API for theming, spacing, and responsive styles.
 *
 * @example
 * // Default size (20px square)
 * import { GiselleIcon } from '@alexrebula/giselle-mui';
 * <GiselleIcon icon="solar:rocket-bold-duotone" />
 *
 * @example
 * // Custom size with sx theming
 * <GiselleIcon icon="logos:typescript-icon" width={36} sx={{ color: 'primary.main' }} />
 *
 * @example
 * // As a ReactNode slot inside MetricCard
 * import { MetricCard, MetricCardDecoration, GiselleIcon } from '@alexrebula/giselle-mui';
 * <MetricCard
 *   value="20+"
 *   label="Years"
 *   icon={<GiselleIcon icon="solar:clock-circle-bold-duotone" width={36} />}
 *   decoration={<MetricCardDecoration color="primary" />}
 * />
 */
declare function GiselleIcon({ icon, width, height, sx, className, style, flip, rotate, }: GiselleIconProps): react_jsx_runtime.JSX.Element;

/**
 * Props for the {@link Accordion} component.
 *
 * Extends MUI `AccordionProps` — all expand/collapse controls (`expanded`,
 * `onChange`, `defaultExpanded`, `TransitionComponent`, etc.) are forwarded
 * to the underlying MUI Accordion unchanged.
 */
type AccordionProps = Omit<AccordionProps$1, 'children' | 'title'> & {
    /** Content displayed in the accordion summary row (the always-visible part). */
    title: ReactNode;
    /** Content revealed inside the accordion when it is expanded. */
    children?: ReactNode;
    /**
     * Enables checklist mode.
     *
     * When `true`, a done-toggle control appears before the title. The control is
     * **independent** from the expand/collapse trigger — activating it toggles the
     * `done` state without opening or closing the accordion.
     *
     * - Without `checkIcon`: renders a MUI `Checkbox` (default).
     * - With `checkIcon`: renders an `IconButton` with 3-state icon feedback
     *   (idle / hover+focus / done). See `checkIcon` prop for details.
     *
     * @default false
     */
    checklist?: boolean;
    /**
     * Controlled done state for the checklist toggle.
     *
     * - `true` → done
     * - `false` → pending
     *
     * Has no effect when `checklist` is `false`.
     *
     * @default false
     */
    done?: boolean;
    /**
     * Called when the done-toggle is activated.
     *
     * Receives the **next** done state — the value the control will transition
     * **to** after the interaction (the opposite of the current `done` prop).
     *
     * Has no effect when `checklist` is `false`.
     *
     * ```tsx
     * <Accordion
     *   checklist
     *   done={task.done}
     *   onDoneButtonClick={(isDone) => updateTask(task.id, { done: isDone })}
     *   title={task.title}
     * >
     *   <Typography>{task.description}</Typography>
     * </Accordion>
     * ```
     */
    onDoneButtonClick?: (nextDone: boolean) => void;
    /**
     * Custom icon for the **idle undone** state of the checklist toggle.
     *
     * When provided, the MUI `Checkbox` is replaced by an `IconButton` that
     * displays three different icons depending on interaction state:
     *
     * | State                       | Icon shown                  |
     * | --------------------------- | --------------------------- |
     * | Undone + idle               | `checkIcon` (this prop)     |
     * | Hover **or** keyboard focus | `checkHoverIcon` (outlined green check) |
     * | Done + idle                 | `checkDoneIcon` (filled green check)    |
     * | Done + hover/focus          | `checkHoverIcon` (outlined check → signals "click to undo") |
     *
     * Keyboard behaviour: Tab focuses the button (showing the outlined check),
     * Space / Enter toggles the done state.
     *
     * Both hover and focus icons can be overridden via `checkHoverIcon`.
     * The done icon can be overridden via `checkDoneIcon`.
     *
     * Ignored when `checklist` is `false`.
     *
     * ```tsx
     * // Circle icon as the "not done yet" state
     * <Accordion
     *   checklist
     *   checkIcon={<svg width={20} height={20}><circle cx={12} cy={12} r={9} /></svg>}
     *   done={task.done}
     *   onDoneButtonClick={(isDone) => updateTask(task.id, { done: isDone })}
     *   title={task.title}
     * >
     *   ...
     * </Accordion>
     * ```
     */
    checkIcon?: ReactNode;
    /**
     * Icon shown when the item is done and the button is **not** hovered/focused.
     *
     * Default: built-in filled green check circle SVG.
     * Override with your own `ReactNode` to use a different done indicator.
     *
     * Only used in icon-button mode (when `checkIcon` is provided).
     */
    checkDoneIcon?: ReactNode;
    /**
     * Icon shown when the button is **hovered or keyboard-focused**, regardless of
     * done state.
     *
     * Default: built-in outlined green check circle SVG.
     * Provides visual feedback that the button is interactive and hints at the
     * "toggle" action. When the item is done, this icon also signals "click to undo".
     *
     * Only used in icon-button mode (when `checkIcon` is provided).
     */
    checkHoverIcon?: ReactNode;
    /**
     * Optional icon rendered before the title when `checklist` is `false`.
     *
     * Pass a `ReactNode` — typically a `<GiselleIcon icon="solar:..." />`.
     * The wrapper is `aria-hidden` because the icon is decorative.
     *
     * Ignored when `checklist` is `true` (the done-toggle control replaces it).
     */
    leadingIcon?: ReactNode;
    /**
     * The expand/collapse indicator icon on the right side of the summary row.
     *
     * Passed directly to MUI `AccordionSummary`'s `expandIcon` prop.
     * Typical usage:
     * ```tsx
     * expandIcon={<GiselleIcon icon="solar:alt-arrow-down-bold" width={16} />}
     * ```
     */
    expandIcon?: ReactNode;
};

/**
 * A generic, accessible accordion component that can represent any
 * collapsible content — FAQ entries, tasks, settings sections, etc.
 *
 * ## Checklist mode
 *
 * When `checklist` is `true`, a done-toggle `Checkbox` appears before the
 * title. The checkbox is **independent** from the expand/collapse trigger:
 *
 * - Clicking the **checkbox** calls `onDoneButtonClick(nextDone)` without
 *   opening or closing the accordion.
 * - Clicking the **title / summary area** expands or collapses the accordion
 *   without toggling the done state.
 *
 * This is WCAG 2.2 AA compliant — the checkbox and the summary are sibling
 * `<button>` / `<input>` elements, never nested inside each other.
 *
 * ## Usage
 *
 * ```tsx
 * // Basic
 * <Accordion title="What is this?" expandIcon={<GiselleIcon icon="solar:alt-arrow-down-bold" width={16} />}>
 *   <Typography>It is a generic accordion.</Typography>
 * </Accordion>
 *
 * // Task (checklist mode)
 * <Accordion
 *   title={task.title}
 *   checklist
 *   done={task.done}
 *   onDoneButtonClick={(isDone) => updateTask(task.id, { done: isDone })}
 *   expandIcon={<GiselleIcon icon="solar:alt-arrow-down-bold" width={16} />}
 * >
 *   <Typography>{task.description}</Typography>
 * </Accordion>
 * ```
 */
declare function Accordion({ title, children, checklist, done, onDoneButtonClick, leadingIcon, expandIcon, checkIcon, checkDoneIcon, checkHoverIcon, sx, ...other }: AccordionProps): react_jsx_runtime.JSX.Element;

/**
 * Minimum touch target size (px) for the done-toggle checkbox.
 *
 * WCAG 2.5.8 (Level AA) requires interactive targets to be at least 24 × 24 px.
 * MUI Checkbox in `size="small"` mode renders a 38 × 38 px touch target by
 * default, which exceeds this minimum. This constant documents the floor so
 * regression tests can enforce it even if the checkbox padding is ever changed.
 */
declare const ACCORDION_DONE_MIN_TOUCH_TARGET = 24;
/**
 * Width and height (px) of the default check SVG icons in icon-button mode
 * (`checkIcon`, `checkDoneIcon`, `checkHoverIcon`).
 *
 * Set to 20 px — the minimum for interactive icons per WCAG 1.4.11.
 * Never reduce below 20.
 */
declare const ACCORDION_CHECK_ICON_SIZE = 20;
/**
 * Minimum touch target size (px) for the icon-button done toggle.
 *
 * WCAG 2.5.8 requires interactive targets to be ≥ 24 × 24 px.
 * MUI `IconButton` in `size="small"` mode renders a ≥ 30 px touch target
 * by default, which exceeds this minimum. This constant documents the floor
 * for regression tests.
 */
declare const ACCORDION_ICON_BUTTON_MIN_SIZE = 28;

type MetricCardColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
interface MetricCardProps extends PaperProps {
    /** Pre-formatted display value, e.g. `"20+"` or `"<600ms"`. */
    value: string | number;
    /** Primary label rendered below the value. */
    label: string;
    /** Optional second-line detail rendered below the label. */
    sublabel?: string;
    /**
     * Icon slot rendered at the top-right of the card.
     * Accepts any `ReactNode` — the component has no icon-library dependency.
     *
     * @example
     * import { GiselleIcon, MetricCard } from '@alexrebula/giselle-mui';
     * <MetricCard icon={<GiselleIcon icon="solar:clock-circle-bold-duotone" width={36} />} ... />
     */
    icon?: ReactNode;
    /**
     * Palette color key used for the icon tint.
     * @default 'primary'
     */
    color?: MetricCardColor;
    /**
     * Optional decoration rendered in a zero-interaction layer behind the card content.
     * The decoration positions itself; the card clips it via `overflow: hidden`.
     *
     * @example
     * import { MetricCard, MetricCardDecoration } from '@alexrebula/giselle-mui';
     * <MetricCard decoration={<MetricCardDecoration color="primary" />} ... />
     */
    decoration?: ReactNode;
}
interface MetricCardDecorationProps extends BoxProps {
    /**
     * Palette color used for the gradient fill.
     * @default 'primary'
     */
    color?: MetricCardColor;
}

/**
 * MetricCardDecoration — the rotated gradient rectangle that sits behind MetricCard content.
 *
 * Pass as the `decoration` prop of `MetricCard`. The card clips it via `overflow: hidden`.
 *
 * @example
 * import { MetricCard, MetricCardDecoration } from '@alexrebula/giselle-mui';
 * <MetricCard decoration={<MetricCardDecoration color="primary" />} ... />
 */
declare function MetricCardDecoration({ color, sx, ...other }: MetricCardDecorationProps): react_jsx_runtime.JSX.Element;

/**
 * MetricCard — compact stat card with a large value, label, icon slot, and decoration slot.
 *
 * Library-ready: zero icon-library dependency. Pass any `ReactNode` into `icon` and `decoration`.
 *
 * @example
 * import { MetricCard, MetricCardDecoration, GiselleIcon } from '@alexrebula/giselle-mui';
 *
 * <MetricCard
 *   value="20+"
 *   label="Years"
 *   sublabel="of experience"
 *   color="primary"
 *   icon={<GiselleIcon icon="solar:clock-circle-bold-duotone" width={36} />}
 *   decoration={<MetricCardDecoration color="primary" />}
 *   sx={(theme) => ({ boxShadow: theme.shadows[2] })}
 * />
 */
declare function MetricCard({ value, label, sublabel, icon, color, decoration, elevation, sx, ...other }: MetricCardProps): react_jsx_runtime.JSX.Element;

interface SelectableCardProps extends ButtonBaseProps {
    /**
     * Whether this card is in the selected/pressed state.
     * Maps to `aria-pressed` and applies a 2px ring shadow using `text.primary`.
     * @default false
     */
    selected?: boolean;
}

/**
 * SelectableCard — an accessible, clickable card surface.
 *
 * Built on `ButtonBase` so it is:
 * - A native `<button>` element (keyboard-activatable via Enter/Space)
 * - Focusable (tabIndex=0 by default, -1 when disabled)
 * - Screen-reader friendly (aria-pressed reflects selection state)
 * - Hover and focus-visible states styled explicitly
 * - Disabled state handled natively (aria-disabled, no pointer events)
 *
 * Library-ready: only `@mui/material` dependencies.
 *
 * @example
 * // Basic selectable option card
 * <SelectableCard selected={plan === 'starter'} onClick={() => setPlan('starter')}>
 *   <Typography>Starter — $9/mo</Typography>
 * </SelectableCard>
 *
 * @example
 * // Disabled state
 * <SelectableCard selected disabled>
 *   <Typography>Current plan</Typography>
 * </SelectableCard>
 *
 * @example
 * // Custom padding via sx
 * <SelectableCard selected={isSelected} sx={{ p: 3, borderRadius: 2 }} onClick={...}>
 *   ...children...
 * </SelectableCard>
 */
declare function SelectableCard({ selected, disabled, children, sx, ...other }: SelectableCardProps): react_jsx_runtime.JSX.Element;

type QuoteColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
interface QuoteCardProps extends PaperProps {
    /** The full text of the quote. Rendered in italics inside the card body. */
    quote: string;
    /**
     * Attribution name displayed below the quote, e.g. `"Jane Smith"`.
     * Omit to hide the attribution row entirely.
     */
    author?: string;
    /**
     * Source or context label displayed next to the author, e.g. `"Platform Team"`.
     * A separator dot is only rendered when both `author` and `source` are present.
     */
    source?: string;
    /**
     * Accent color key applied to the background tint, border, and decorative quote mark.
     * Accepts any MUI palette color key.
     * @default 'primary'
     */
    color?: QuoteColor;
}

/**
 * A warm, readable block-quote card built on MUI Paper.
 *
 * Extends `PaperProps` — callers can pass `elevation` for shadow depth and
 * `variant="outlined"` to switch to a border-only surface.
 * Colors are driven by MUI CSS variables so it adapts to light/dark mode and
 * any custom theme without additional configuration.
 *
 * **Theming via sx:**
 * ```tsx
 * <QuoteCard sx={{ borderRadius: 4, p: 4 }} ... />
 * ```
 *
 * **Theming via elevation:**
 * ```tsx
 * <QuoteCard elevation={4} ... />
 * ```
 *
 * **Theming via color:**
 * ```tsx
 * <QuoteCard color="info" ... />
 * ```
 *
 * @example
 * <QuoteCard
 *   quote="Leave every file a little better than you found it."
 *   author="Jane Smith"
 *   source="Platform Team"
 *   elevation={0}
 * />
 */
declare function QuoteCard({ quote, author, source, color, elevation, sx, ...other }: QuoteCardProps): react_jsx_runtime.JSX.Element;

type StatCardColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
/**
 * Data-layer representation of a single `StatCard` entry.
 *
 * Use this type in data factory files instead of defining a local equivalent.
 * The view layer maps `iconId` to `<GiselleIcon icon={iconId} />` — no `ReactNode`
 * is stored in the data layer.
 *
 * ```ts
 * const stats: StatCardItem[] = [
 *   { label: 'Components', value: '10 of ~20', color: 'primary', iconId: 'solar:widget-bold-duotone', sparkline: [3,4,5,6,7,8,9,10] },
 * ];
 * ```
 */
interface StatCardItem {
    label: string;
    value: string | number;
    trend?: number;
    trendLabel?: string;
    color: StatCardColor;
    /** Iconify icon ID — rendered as `<GiselleIcon icon={iconId} />` in the view layer. */
    iconId: string;
    sparkline?: number[];
}
interface StatCardProps extends Omit<CardProps, 'title' | 'color'> {
    /** Card label, e.g. `"Weekly sales"`. */
    label: string;
    /** Pre-formatted display value, e.g. `"714k"` or `"551"`. */
    value: string | number;
    /**
     * Trend percentage. Positive = upward trend (green arrow), negative = downward (red arrow).
     *
     * @example 2.6 → `+2.6%`
     */
    trend?: number;
    /** Supplementary label next to the trend, e.g. `"last week"`. */
    trendLabel?: string;
    /**
     * Icon slot — accepts any `ReactNode`. No icon-library dependency inside this component.
     *
     * ```tsx
     * icon={<GiselleIcon icon="solar:widget-bold-duotone" width={28} />}
     * ```
     */
    icon?: ReactNode;
    /**
     * Palette key controlling background tint, trend colour, and sparkline colour.
     * @default 'primary'
     */
    color?: StatCardColor;
    /**
     * Chart slot — accepts any `ReactNode`. Renders bottom-right inside the card.
     *
     * No chart-library dependency inside this component. Pass a pre-configured
     * chart element from the consumer. Use `STAT_CARD_SPARKLINE_OPTIONS` from
     * `stat-card.styles.ts` as the base options for the canonical 84×56 slot.
     *
     * ```tsx
     * chart={
     *   <ReactApexChart
     *     type="line"
     *     series={[{ data: sparkline }]}
     *     options={{ ...STAT_CARD_SPARKLINE_OPTIONS, colors: [theme.palette.primary.dark] }}
     *     width={84}
     *     height={56}
     *   />
     * }
     * ```
     */
    chart?: ReactNode;
    /** MUI `sx` override on the root `Card`. */
    sx?: SxProps<Theme>;
}

/**
 * Base ApexCharts options for the `StatCard` sparkline slot (84×56 px).
 *
 * Spread this and add `colors` to match the card's palette:
 *
 * ```ts
 * options={{ ...STAT_CARD_SPARKLINE_OPTIONS, colors: [theme.palette[color].dark] }}
 * ```
 */
declare const STAT_CARD_SPARKLINE_OPTIONS: ApexOptions;

/**
 * StatCard — KPI summary card with icon, trend indicator, and optional chart slot.
 *
 * The gradient background is built from the palette's `lightChannel` via `channelAlpha`.
 * No Minimals utilities (`varAlpha`, `varFade`, etc.) are used.
 *
 * The `chart` slot accepts any `ReactNode` — no chart-library dependency inside this
 * component. Use `STAT_CARD_SPARKLINE_OPTIONS` as the base options for the canonical
 * 84×56 slot and override `colors` with the palette key's dark token.
 *
 * @example
 * ```tsx
 * <StatCard
 *   label="Components"
 *   value="9"
 *   trend={12.5}
 *   trendLabel="this month"
 *   color="primary"
 *   icon={<GiselleIcon icon="solar:widget-bold-duotone" width={28} />}
 *   chart={
 *     <ReactApexChart
 *       type="line"
 *       series={[{ data: [4, 5, 6, 7, 8, 9] }]}
 *       options={{ ...STAT_CARD_SPARKLINE_OPTIONS, colors: [theme.palette.primary.dark] }}
 *       width={84}
 *       height={56}
 *     />
 *   }
 * />
 * ```
 */
declare function StatCard({ label, value, trend, trendLabel, icon, color, chart, sx, ...other }: StatCardProps): react_jsx_runtime.JSX.Element;

/** MUI palette keys that carry mainChannel — derived from TimelineDot's own color prop. */
type HighlightedPaletteKey = Exclude<NonNullable<TimelineDotProps['color']>, 'inherit' | 'grey'>;
/**
 * Base unit for any trackable work item in the timeline.
 *
 * `TimelinePhase`, `TimelineMilestone`, and every nested sub-task all share this shape.
 * Having a common base makes parent-child done-state propagation computable at any depth:
 *
 * - All `children` done → parent can be auto-marked done.
 * - Any `children` un-done → parent reverts to not-done.
 * - Nesting is unbounded: a `Task` child can itself have `children`.
 *
 * ```
 * TimelinePhase  (extends Task)
 *   └─ milestones: TimelineMilestone[]  (each extends Task)
 *        └─ children: Task[]
 *             └─ children: Task[]   ← infinite depth
 * ```
 */
type Task = {
    /** Display text for this work item. */
    title: string;
    /** Whether this task is complete. */
    done?: boolean;
    /**
     * Nested sub-tasks. Can be nested to any depth.
     *
     * Replaces the legacy flat `details: string[]` field. Migrate data files by converting
     * each string to `{ title: string }`. Add `done?` and further `children?` as needed.
     */
    children?: Task[];
};
/**
 * A single platform / tech-stack entry for `TimelinePhase.platforms`.
 *
 * - **Preferred form:** `{ icon: ReactNode; label: string }` — renders a tooltip-wrapped icon slot.
 *   Use `<GiselleIcon icon={...} width={24} />` or any icon element.
 * - **String form:** backward-compatibility shim only. The string is rendered as a plain text
 *   label chip with no icon slot. Strings are **not** interpreted as icon IDs.
 *   Prefer the object form for all new entries.
 */
type TimelinePlatformItem = {
    icon: ReactNode;
    label: string;
} | string;
/**
 * A milestone on the timeline spine — a tracked point-in-time event between two phases.
 *
 * Extends `Task` — every milestone has its own `done` state and can carry nested sub-tasks
 * via `children`. The legacy `details: string[]` flat array is preserved for backward
 * compatibility but superseded by `children`.
 */
type TimelineMilestone = Task & {
    /** Human-readable date shown on the milestone badge (e.g. `'Mar 2022'`). */
    date: string;
    /** Display title of the milestone. */
    title: string;
    /**
     * Glanceable 2–4 word label shown in the collapsed milestone card at rest.
     * Falls back to `title` when omitted.
     */
    shortTitle?: string;
    /**
     * Short description shown when the milestone card is hovered or expanded.
     * Provides context about what this milestone is and why it matters.
     */
    description?: string;
    /** Icon rendered inside the milestone dot. Pass any ReactNode icon slot. */
    icon: ReactNode;
    /** MUI TimelineDot color. */
    color?: TimelineDotProps['color'];
    /**
     * @deprecated Use `children` (inherited from `Task`) instead.
     *
     * Kept for backward compatibility. The component renders `children` first; when
     * absent it falls back to mapping these strings to `{ title: string }` Task objects.
     * Migrate data files by converting `details: ['text']` to `children: [{ title: 'text' }]`.
     */
    details?: string[];
    /** Dims the milestone badge and card — mirrors the phase-level `done` flag. */
    done?: boolean;
    /** Renders the milestone badge in error (red) colour when not done. */
    overdue?: boolean;
    /** Marks this milestone as newly added — renders a "NEW" dot near the title. Clear once seen. */
    new?: boolean;
    /**
     * Overrides the spine dot circle background colour.
     * Accepts any CSS colour string (e.g. `'#111'`).
     * Useful when a brand icon has a specific colour that clashes with the palette-derived background.
     */
    dotBg?: string;
    /**
     * Custom tooltip shown on the milestone dot in the centre spine.
     *
     * When omitted the tooltip is computed automatically:
     * - **Read-only mode:** first sentence of `description` (capped at 72 characters) →
     *   falls back to `shortTitle ?? title` + `date` when `description` is absent.
     * - **Checklist mode:** status label (`Done`, `Blocking`, etc.) + `date`.
     *
     * Set this explicitly to override the computed value with a custom metric or note.
     */
    dotTooltip?: string;
    /**
     * Which column this milestone renders in.
     *
     * Inherits the parent `phase.side` when omitted — the milestone appears in the
     * same column as its phase card. Set explicitly to place the milestone in the
     * **opposite** column (e.g. a tech-context event on a professional phase that
     * should appear in the "Education & Open Source" column).
     */
    side?: 'left' | 'right';
};
type TimelinePhase = Task & {
    /** Numeric sort key. Fractional keys (e.g. 4.5) interleave life events between roles. */
    key: number;
    /** Display title of the phase — shown as the card heading. */
    title: string;
    /**
     * Glanceable 2–4 word label shown in the collapsed card at rest.
     * Falls back to `title` when omitted.
     *
     * **Three-level disclosure model:**
     * - REST (collapsed): `shortTitle` (or `title` if omitted)
     * - HOVER (before click): full `title` + `description`
     * - EXPANDED (after click): full `title` + `description` + `details[]`
     */
    shortTitle?: string;
    /** Short summary paragraph shown below the title on the default card view.
     * Optional for `variant: 'marker'` entries, which have no card. */
    description?: string;
    /** Human-readable date range (e.g. `'Jan 2020 – Mar 2022'`). Also used for automatic overdue detection in checklist mode. */
    date: string;
    /** Icon rendered inside the TimelineDot. Size is controlled via CSS (wrapping Box sets `& svg: { width, height }`) — pass any ReactNode icon slot. */
    icon: ReactNode;
    /** MUI TimelineDot color. */
    color?: TimelineDotProps['color'];
    /** Which column this item appears in. */
    side: 'left' | 'right';
    /**
     * @deprecated Use `children` (inherited from `Task`) instead.
     *
     * Kept for backward compatibility. The component renders `children` first; when
     * absent it falls back to mapping these strings to `{ title: string }` Task objects.
     * Migrate data files by converting `details: ['text']` to `children: [{ title: 'text' }]`.
     */
    details?: string[];
    /**
     * Custom tooltip shown on the phase dot in the centre spine.
     *
     * When omitted the tooltip is computed automatically:
     * - **Read-only mode:** first sentence of `description` (capped at 72 characters) →
     *   falls back to `shortTitle ?? title` + `date` when `description` is absent.
     * - **Checklist mode:** status label (`Done`, `Blocking`, etc.) + `date`.
     *
     * Set this explicitly to override the computed value with a custom metric, status
     * note, or any text not derived from `description`.
     */
    dotTooltip?: string;
    /**
     * Tech stack icons for this entry. Each item provides a `ReactNode` icon and an accessible label.
     * Renders as a horizontal strip of icon slots with a tooltip per item.
     * Use `<GiselleIcon icon={...} width={24} />` or any icon element.
     *
     * Also accepts a plain `string[]` for backward compatibility — strings are rendered as labels
     * with no icon slot. Prefer the `{ icon, label }` form for full icon rendering.
     *
     * See {@link TimelinePlatformItem} for the full union type.
     */
    platforms?: TimelinePlatformItem[];
    /**
     * Label displayed above the tech stack strip.
     * @default 'Tech Stack'
     */
    platformsLabel?: string;
    /**
     * 'scenario' — coloured left border + badge label (used in case-001 for departure scenarios).
     * 'life-event' — coloured left border + tinted background (used in career timeline).
     * 'marker' — spine-only: dot + floating label, no card. For single point-in-time events
     *             that don't warrant a full phase card (e.g. a certification date, a visa grant).
     */
    variant?: 'scenario' | 'life-event' | 'marker';
    /** Label shown as a badge above the card when variant='scenario'. */
    scenarioLabel?: string;
    /** Marks this phase as past-due without being done.
     * Renders the dot and connector in error (red) colour as a visual warning.
     */
    overdue?: boolean;
    /** Marks this phase as currently in progress — renders a pulsing badge above the card. */
    active?: boolean;
    /**
     * Nested milestone keypoints on the connector spine between this phase and the next.
     * Each milestone renders as a coloured badge dot on the spine.
     */
    milestones?: TimelineMilestone[];
    /**
     * Client logos shown as a horizontal strip directly in the card (always visible).
     * Each entry is a public path (e.g. '/assets/icons/clients/nbn.svg') plus an accessible name.
     */
    clients?: Array<{
        name: string;
        logo: string;
    }>;
    /** Label displayed above the client logo strip. Set this to something meaningful, e.g. 'Delivered for' or 'Trusted by'. */
    clientsLabel?: string;
    /**
     * Project/product logos shown as a horizontal strip — for showcasing your own work, side-projects, or open-source.
     * Each entry is a public path plus an accessible name.
     */
    projects?: Array<{
        name: string;
        logo: string;
    }>;
    /** Label displayed above the projects logo strip. E.g. 'Building in public' or 'Current projects'. */
    projectsLabel?: string;
    /** Marks this phase as newly added — renders a pulsing "NEW" badge on the card. Clear this flag once the audience has seen the update. */
    new?: boolean;
    /**
     * Label for the pulsing active badge above the card.
     * @default 'Now'
     */
    activeLabel?: string;
    /** Suppress the date label inside the card. Useful when the date is obvious from context (e.g. active/"Now" entries). */
    hideDate?: boolean;
    /**
     * Suppress the `MetricCardDecoration` and corner icon for this specific step.
     * By default both are shown on all non-highlighted cards regardless of `side`.
     */
    hideDecoration?: boolean;
    /**
     * Optional personal photo displayed as a block image at `maxWidth: 200px` below the description.
     * Use for historic snapshots, childhood photos, or other memorable moments on the timeline.
     * For a single photo. Use `photos` when you have more than one.
     */
    photo?: {
        src: string;
        alt: string;
    };
    /**
     * Multiple personal photos rendered as stacked thumbnails below the description.
     * Each photo is displayed as a rounded block image at `maxWidth: 200px`.
     * Use when you have two or more photos for the same moment. Takes precedence over `photo`
     * when both are provided.
     */
    photos?: Array<{
        src: string;
        alt: string;
    }>;
    /**
     * Text alignment for card content. Defaults to `'left'` regardless of which column the card
     * sits in. Set to `'right'` from the data layer when right-aligned content is intentional.
     * @default 'left'
     */
    textAlign?: 'left' | 'right';
    /**
     * Optional footer slot rendered at the bottom of the card's always-visible content area,
     * below all icon strips and above the expandable detail bullets.
     *
     * Use for interactive elements (play buttons, links, counters) that belong contextually
     * to the card but aren't part of the expandable detail section.
     *
     * ```tsx
     * footer={<PlayButton />}
     * ```
     */
    footer?: ReactNode;
};
type TimelineTwoColumnProps = Omit<BoxProps, 'children'> & {
    /** The ordered list of phases to render. Sorted internally by date (active first, then newest → oldest). */
    phases: TimelinePhase[];
    /**
     * Enables interactive checklist behaviour:
     * - Phase and milestone dots become clickable to toggle done state.
     * - Done items are dimmed with a grayscale filter and a checkmark icon.
     * - Past-due items (date in the past, not done, not active) are highlighted in red.
     * - Manual `overdue: true` on a phase forces the red state regardless of date.
     *
     * When omitted (default), the timeline is read-only: no click-to-done, no overdue
     * detection. Hover effects on cards are limited to items with expandable details.
     */
    checklist?: boolean;
    /**
     * Called when the user clicks a phase dot to toggle its done state.
     * Only fires when `checklist` is true.
     * Receives the phase `key` and the new `done` value.
     */
    onTogglePhaseDone?: (key: number, done: boolean) => void;
    /**
     * Called when the user clicks a milestone dot to toggle its done state.
     * Only fires when `checklist` is true.
     * Receives the parent phase `key`, the milestone `index`, and the new `done` value.
     */
    onToggleMilestoneDone?: (phaseKey: number, milestoneIndex: number, done: boolean) => void;
    /**
     * Called when the user toggles a task (sub-item) within a milestone or phase.
     * Fires unconditionally — task toggles are always interactive regardless of `checklist`.
     *
     * Receives the parent phase `key`, the milestone `index` (or `null` for phase-level tasks),
     * the task `index`, and the new `done` value.
     */
    onToggleTaskDone?: (phaseKey: number, milestoneIndex: number | null, taskIndex: number, done: boolean) => void;
    /**
     * Controlled selection — the key of the currently selected phase.
     * When set, the matching phase dot is shown in its active (enlarged) state.
     * Intended for hero navigation use: the parent controls which phase is focused.
     */
    selectedPhaseKey?: number;
    /**
     * Called when the user clicks a phase dot while `checklist` is false.
     * Receives the phase `key`. Use together with `selectedPhaseKey` for
     * controlled hero navigation.
     */
    onPhaseSelect?: (key: number) => void;
    /**
     * Sort direction for non-active, non-done phases.
     * - `'desc'` (default) — newest end-date first. Use for career/past timelines.
     * - `'asc'` — oldest end-date first. Use for roadmap/future timelines so the
     *   soonest upcoming phase appears directly below the active phases.
     * - `'key'` — sort by `phase.key` ascending. Use when the key encodes the
     *   intended sequence (e.g. a roadmap where phase number is the ordering
     *   criterion, not the end date). Deterministic regardless of array insertion order.
     * @default 'desc'
     */
    sortOrder?: 'asc' | 'desc' | 'key';
    /**
     * Minimum vertical space (px) allocated per milestone slot on the spine.
     * Controls the breathing room between collapsed milestone cards.
     * Increase when cards are too close; decrease when the timeline feels too tall.
     * @default 60
     */
    milestoneSlotHeight?: number;
    /**
     * Gap (px) added below each phase card — appended as `paddingBottom` on the card column.
     * Because it is measured from the bottom edge of every card (not the top of the li),
     * the visual gap between consecutive phase cards is always exactly
     * `phaseCardGap + column top padding (~6px)`, regardless of individual card height.
     * @default 90
     */
    phaseCardGap?: number;
    /**
     * Bottom offset (px) of the year-boundary label chip from the end of the spine connector.
     * Controls the breathing room between the year label and the next phase dot below it.
     * @default 30
     */
    yearLabelMarginBottom?: number;
    /**
     * Set of item keys that the current viewer has already marked as seen.
     * Key format: `"phase-${phase.key}"` for phases, `"ms-${phaseKey}-${milestoneIndex}"` for milestones.
     * Controlled externally — pair with `onMarkViewed` and a persistence hook (e.g. localStorage).
     * When a key is present in this set, the corresponding card shows a filled "viewed" eye indicator.
     */
    viewedKeys?: Set<string>;
    /**
     * Called when the user clicks the "mark as viewed" eye button on a phase card or milestone badge.
     * Receives the item key in `"phase-${key}"` or `"ms-${phaseKey}-${mi}"` format.
     * The parent is responsible for persisting this (localStorage, server, etc.).
     */
    onMarkViewed?: (key: string) => void;
    /**
     * Icon rendered inside the expandable-details count badge on phase cards and milestone badges.
     * Accepts any `ReactNode` — typically a small icon at 14–16px.
     *
     * Defaults to an inline SVG subtask icon (parent rect → L-line → child rect) that is
     * bundled with the component, so it renders immediately with zero flicker.
     *
     * Pass `null` to suppress the icon and show only the count number.
     *
     * @example
     * ```tsx
     * import { Icon } from '@iconify/react';
     * <TimelineTwoColumn expandableIcon={<Icon icon="tabler:subtask" width={14} />} phases={phases} />
     * ```
     */
    expandableIcon?: ReactNode;
    /**
     * Called when the user applies a date-repair action (e.g. "Make sequential") from
     * the `PhaseWarningPopover`. Receives the full updated `phases` array with corrected dates.
     *
     * **When provided:** the corner overlap-warning badge on each conflicting `PhaseCard`
     * opens a rich `PhaseWarningPopover` with range sliders, a mini Gantt ruler, and
     * Make sequential + Apply/Cancel controls.
     *
     * **When omitted (default):** the badge shows only a plain string tooltip — no interactive
     * popover, no date editing. This is the read-only mode.
     *
     * Pair with a state setter to keep `phases` in sync:
     *
     * ```tsx
     * const [phases, setPhases] = useState(initialPhases);
     * <TimelineTwoColumn phases={phases} onPhasesChange={setPhases} />
     * ```
     */
    onPhasesChange?: (updated: TimelinePhase[]) => void;
};
/**
 * Sidebar content for a timeline section page.
 *
 * Contains the heading, description paragraphs, and optional status chip shown
 * alongside `TimelineTwoColumn` in a two-column section layout.
 */
interface TimelineSidebar {
    overline: string;
    heading: string;
    body: string[];
    statusChip?: string;
}
/**
 * Column header labels for the two columns of a `TimelineTwoColumn` layout.
 *
 * Both `leftSubtitle` and `rightSubtitle` are optional short-description lines
 * rendered below the column label.
 */
interface TimelineColumnLabels {
    left: string;
    leftSubtitle?: string;
    right: string;
    rightSubtitle?: string;
}
/**
 * Aggregated props for a complete timeline section — sidebar, column labels, and phases.
 *
 * Pass the result of a data factory directly to a timeline section view component:
 * ```tsx
 * const data: TimelineSectionData = createCareerTimelineSectionData();
 * <CareerTimelineSection {...data} />
 * ```
 */
interface TimelineSectionData {
    sidebar: TimelineSidebar;
    columnLabels: TimelineColumnLabels;
    phases: TimelinePhase[];
}

type PhaseCardProps = Omit<BoxProps, 'children'> & {
    /** The timeline phase data to render. */
    phase: TimelinePhase;
    /** Runtime done override from the parent timeline (local toggle state). Defaults to phase.done. */
    done?: boolean;
    /** Runtime overdue override from the parent timeline. Adds a red warning border to the card. */
    overdue?: boolean;
    /** Set by the parent when this phase's date range overlaps another phase. Shows a ⚠ Date overlap badge. */
    dateConflict?: boolean;
    /** Human-readable explanation of the overlap rendered in a Tooltip on the badge. */
    dateConflictLabel?: string;
    /**
     * Controlled expansion state. When provided together with `onRequestExpand`,
     * the card operates in controlled mode and the parent owns the open/close state.
     */
    isExpanded?: boolean;
    /** Called when the user clicks or keys the card to toggle details. Controlled mode only. */
    onRequestExpand?: () => void;
    /** When true, suppresses box-shadow so the card appears flat (used when another card is expanded). */
    suppressElevation?: boolean;
    /**
     * When true, the viewed eye indicator shows as filled (success colour).
     * Only renders the indicator when `onMarkViewed` is also provided.
     */
    isViewed?: boolean;
    /**
     * Called when the user clicks the viewed eye button. Provide this to enable the indicator.
     * The parent is responsible for persisting the viewed state.
     */
    onMarkViewed?: () => void;
    /**
     * Icon rendered in the expandable-details count badge. Defaults to the bundled inline SVG subtask icon.
     * Pass `null` to suppress the icon and show only the count number.
     */
    expandableIcon?: ReactNode;
    /**
     * Which column the card sits in — controls where the corner alert badge is anchored.
     * - `'right'` (default): badge floats on the right top corner (between card and spine).
     * - `'left'`: badge floats on the left top corner (mirrored, between spine and card edge).
     */
    columnSide?: 'left' | 'right';
    /**
     * Forwarded from `TimelineTwoColumn.onPhasesChange`.
     *
     * When provided, the corner overlap-warning badge opens a rich `PhaseWarningPopover`
     * (range sliders + mini Gantt ruler + Apply/Cancel) instead of a plain string tooltip.
     * The popover calls this with the full updated phases array on "Apply".
     *
     * When omitted, the badge is read-only — plain tooltip only.
     */
    onPhasesChange?: (updated: TimelinePhase[]) => void;
    /**
     * The full `phases` array from `TimelineTwoColumn` — passed down only when
     * `onPhasesChange` is also provided. Used by `PhaseWarningPopover` to compute
     * the conflict group and to merge updated dates on Apply.
     */
    allPhases?: TimelinePhase[];
    /**
     * Done state for each task (sub-item) in this phase, indexed by position.
     * Provided by `TimelineTwoColumn` when task-level done state is active.
     * Falls back to `task.done` from the data when absent.
     */
    taskDoneStates?: boolean[];
    /**
     * Called when the user clicks a task toggle icon.
     * When provided, task rows are interactive; when absent they are decorative.
     */
    onToggleTask?: (taskIndex: number, done: boolean) => void;
};

/**
 * Expandable card for a single timeline phase.
 *
 * Renders the phase title, description, date, optional icon strips (platforms,
 * clients, projects), and a collapsible bullet-point detail section.
 * Operates in controlled mode when `onRequestExpand` is provided; falls back to
 * internal toggle state otherwise.
 *
 * Status badge (overdue / active / scenario) is resolved automatically from props.
 */
declare function PhaseCard({ phase, done, overdue, dateConflict, dateConflictLabel, isExpanded, onRequestExpand, suppressElevation, expandableIcon, isViewed, onMarkViewed, columnSide, onPhasesChange, allPhases, taskDoneStates, onToggleTask, sx, ...other }: PhaseCardProps): react_jsx_runtime.JSX.Element;

type TimelineDotComponentProps = Omit<BoxProps, 'color' | 'onClick'> & {
    /** Icon to render inside the dot. Accepts a `width` prop for sizing. */
    icon?: ReactNode;
    /** MUI palette key — controls background colour and shadow tint. @default 'primary' */
    color?: HighlightedPaletteKey;
    /**
     * Size variant.
     * - `'phase'`: 42px (all states). Active state adds a pulsing ring halo — no size change.
     * - `'milestone'`: 34px fixed.
     * @default 'phase'
     */
    size?: 'phase' | 'milestone';
    /** Shows pulsing ring halo around the dot (phase size only). Does not change dot size. */
    active?: boolean;
    /**
     * Done state — replaces icon with animated checkmark and dims milestone badges.
     * In checklist mode this is driven by the toggle state; in read-only mode it
     * reflects `phase.milestones[].done` from the data model.
     */
    done?: boolean;
    /**
     * Increment on each done/undone toggle to remount the icon wrapper
     * and restart the spring-pop animation cleanly.
     */
    animationKey?: number;
    /**
     * Overrides the dot circle background colour. Accepts any CSS colour string (e.g. `'#111'`).
     * Useful when a brand icon has a specific colour that clashes with the palette-derived background.
     * Ignored when `done=true` — done dots always render success-green.
     */
    dotBg?: string;
    /** Makes the dot clickable. Omit for decorative (read-only) dots. */
    onClick?: () => void;
};

/**
 * Unified dot circle for the timeline component.
 *
 * Replaces both the inner content of MUI `<TimelineDot>` in `timeline-two-column.tsx`
 * and the badge circle in `MilestoneBadge`. The outer separator / positioning wrapper
 * remains in the parent.
 *
 * Two mutually exclusive inner states:
 * 1. `done` → animated checkmark SVG (always success/green — see `resolveEffectiveColor`)
 * 2. default → `icon` prop
 *
 * Active dots show a pulsing ring halo via `::after`.
 * In checklist mode pass `onClick`, `role`, `aria-checked`, `aria-label`, `tabIndex`.
 *
 * ## Overflow strategy
 *
 * The outer Box has `overflow: visible` so the `::after` ring (which extends 5 px
 * outside via `inset: -5`) is not clipped. An inner clip Box with `overflow: hidden`
 * and `border-radius: 50%` keeps the icon inside the circle shape.
 */
declare function TimelineDot({ icon, color, size, active, done, animationKey, dotBg, onClick, onKeyDown, role, 'aria-checked': ariaChecked, 'aria-label': ariaLabel, tabIndex, className, sx, ...other }: TimelineDotComponentProps): react_jsx_runtime.JSX.Element;

/**
 * Two-column alternating timeline.
 *
 * Phases are sorted automatically (active pinned first, then newest → oldest).
 * Each phase renders a dot on the central spine and a card in the left or right
 * column depending on `phase.side`. Milestone dots appear at equal intervals
 * along the spine between consecutive phases.
 *
 * Two modes:
 * - **Default (read-only):** cards are expandable on click; no done/overdue state.
 * - **Checklist:** pass `checklist` to enable dot-click toggling, done dimming,
 *   and automatic overdue detection (past date + not done + not active → red).
 *
 * For hero navigation use, pass `selectedPhaseKey` + `onPhaseSelect` to control
 * which phase dot appears active from the outside.
 */
declare function TimelineTwoColumn({ phases, checklist, onTogglePhaseDone, onToggleMilestoneDone, onToggleTaskDone, selectedPhaseKey, onPhaseSelect, expandableIcon, viewedKeys, onMarkViewed, onPhasesChange, sortOrder, milestoneSlotHeight, phaseCardGap, yearLabelMarginBottom, sx, ...other }: TimelineTwoColumnProps): react_jsx_runtime.JSX.Element;

/**
 * Props for `TimelineCompact`.
 *
 * Accepts the same `phases` array as `TimelineTwoColumn` — no separate data model.
 * Swap at a breakpoint without changing the data layer:
 *
 * ```tsx
 * {isMobile
 *   ? <TimelineCompact phases={phases} />
 *   : <TimelineTwoColumn phases={phases} columnLabels={...} sidebar={...} />
 * }
 * ```
 *
 * The props below mirror the equivalent `TimelineTwoColumnProps` — they are passed
 * through automatically when `TimelineTwoColumn` switches to compact on mobile.
 */
interface TimelineCompactProps extends BoxProps {
    /**
     * Timeline phases to render as accordion rows.
     *
     * Each phase maps to one accordion item:
     * - Summary: coloured dot + title + date
     * - Details: description text + task children list + milestone list
     */
    phases: TimelinePhase[];
    /**
     * Enables interactive checklist behaviour:
     * - Phase and milestone dots become clickable to toggle done state.
     * - Done items render with a green dot and reduced opacity.
     * - Task children render as checkboxes.
     * @see TimelineTwoColumnProps.checklist
     */
    checklist?: boolean;
    /**
     * Sort direction for phases and milestones — mirrors `TimelineTwoColumnProps.sortOrder`.
     * @default 'desc'
     * @see TimelineTwoColumnProps.sortOrder
     */
    sortOrder?: 'asc' | 'desc' | 'key';
    /**
     * Set of viewed phase keys. `phase-${phase.key}` is added when a phase accordion is opened.
     * @see TimelineTwoColumnProps.viewedKeys
     */
    viewedKeys?: Set<string>;
    /**
     * Called when a phase accordion is opened for the first time — key format `phase-${phase.key}`.
     * @see TimelineTwoColumnProps.onMarkViewed
     */
    onMarkViewed?: (key: string) => void;
    /**
     * Called when the user clicks a phase dot in checklist mode.
     * @see TimelineTwoColumnProps.onTogglePhaseDone
     */
    onTogglePhaseDone?: (key: number, done: boolean) => void;
    /**
     * Called when the user clicks a milestone dot in checklist mode.
     * @see TimelineTwoColumnProps.onToggleMilestoneDone
     */
    onToggleMilestoneDone?: (phaseKey: number, milestoneIndex: number, done: boolean) => void;
    /**
     * Called when the user toggles a task checkbox.
     * @see TimelineTwoColumnProps.onToggleTaskDone
     */
    onToggleTaskDone?: (phaseKey: number, milestoneIndex: number | null, taskIndex: number, done: boolean) => void;
}

declare function TimelineCompact({ phases, checklist, sortOrder, viewedKeys: _viewedKeys, onMarkViewed, onTogglePhaseDone, onToggleMilestoneDone, onToggleTaskDone, sx, ...other }: TimelineCompactProps): react_jsx_runtime.JSX.Element;

/**
 * Resolves a `TimelineDotProps['color']` value to a `HighlightedPaletteKey` safe
 * for indexing into `theme.vars.palette[color]`.
 *
 * - `done=true` always returns `'success'` (green checkmark — same convention as
 *   `TimelineTwoColumn`'s done-dot colour enforcement rule).
 * - `'inherit'` and `'grey'` fall back to `'primary'` — neither maps to a
 *   `mainChannel`-capable palette slot.
 * - `undefined` falls back to `'primary'`.
 */
declare function resolveCompactColor(color: TimelineDotProps['color'] | undefined, done?: boolean): HighlightedPaletteKey;

/** Diameter (px) of the coloured dot in the accordion phase summary row. */
declare const COMPACT_PHASE_DOT_SIZE = 32;
/** Diameter (px) of the coloured dot in each milestone row. */
declare const COMPACT_MILESTONE_DOT_SIZE = 32;
/**
 * Size (px) of the icon rendered inside the phase summary dot.
 * Must be smaller than `COMPACT_PHASE_DOT_SIZE` to fit inside the circle.
 */
declare const COMPACT_PHASE_ICON_SIZE = 18;
/**
 * Minimum acceptable diameter for the phase dot.
 * Must stay at or above this to remain glanceable at mobile font scales.
 */
declare const COMPACT_MIN_PHASE_DOT_SIZE = 18;
/**
 * Minimum acceptable diameter for the milestone dot.
 * Must stay at or above this to remain visible as a distinct element.
 */
declare const COMPACT_MIN_MILESTONE_DOT_SIZE = 18;

interface TaskListProps extends BoxProps {
    /** The task items to render. */
    tasks: Task[];
    /**
     * When `true`, renders a `Checkbox` before each task title so users can
     * toggle individual tasks done.
     * @default false
     */
    checklist?: boolean;
    /**
     * Resolved done-state per task (0-indexed, matches `tasks` array order).
     * When provided, overrides `task.done` for display and accessibility.
     * Must have the same length as `tasks`.
     */
    taskDoneState?: boolean[];
    /**
     * Called when the user toggles a task checkbox.
     * Receives the 0-based index of the toggled task.
     * Has no effect when `checklist={false}`.
     */
    onTaskToggle?: (taskIndex: number) => void;
    /**
     * Controls left-padding level.
     * - `'phase'` — top-level task list, `pl: 2` (default)
     * - `'milestone'` — nested under a milestone card, `pl: 3`
     * @default 'phase'
     */
    indent?: 'phase' | 'milestone';
}

/**
 * Renders a flat list of `Task` items for use inside timeline cards,
 * detail drawers, and modals.
 *
 * In **checklist mode** (`checklist={true}`) each row shows a `Checkbox`
 * that the consumer controls via `taskDoneState` + `onToggle`. In read-only
 * mode the list is purely presentational and tasks marked `done` in the
 * data receive a line-through style.
 *
 * Use `indent="milestone"` when the list sits inside a milestone card to
 * add an extra level of left padding relative to the phase-level baseline.
 */
declare function TaskList({ tasks, checklist, taskDoneState, onTaskToggle, indent, sx, ...other }: TaskListProps): react_jsx_runtime.JSX.Element;

/**
 * A single action item rendered as a `Tooltip` + `IconButton`.
 *
 * The `icon` slot accepts any `ReactNode` — use `<GiselleIcon ... />` to fill it.
 */
interface IconActionItem {
    /**
     * Tooltip label shown on hover.
     */
    tooltip: string;
    /**
     * Icon rendered inside the button.
     *
     * @example
     * import { GiselleIcon } from '@alexrebula/giselle-mui';
     * { tooltip: 'Edit', icon: <GiselleIcon icon="solar:pen-bold" /> }
     */
    icon: ReactNode;
    /**
     * Click handler for the button.
     */
    onClick?: IconButtonProps['onClick'];
    /**
     * `href` for link behaviour. Requires `component` to be set to a link element
     * (e.g. `RouterLink`) that handles the `href` prop.
     */
    href?: string;
    /**
     * Overrides the root element of `IconButton` — e.g. pass `RouterLink` together
     * with `href` to make the button navigate.
     */
    component?: React.ElementType;
    /**
     * Disables the button and prevents interaction.
     * @default false
     */
    disabled?: boolean;
    /**
     * `aria-label` for the button. Defaults to the `tooltip` value.
     */
    'aria-label'?: string;
    /**
     * Extra placement for the Tooltip.
     * @default 'bottom'
     */
    tooltipPlacement?: TooltipProps['placement'];
}
interface IconActionBarProps extends BoxProps {
    /**
     * Array of action items rendered as `Tooltip` + `IconButton` pairs.
     *
     * Each item configures the tooltip label, icon, click behaviour, and optional
     * link target (`href` + `component`).
     *
     * When omitted the bar renders the default Edit / View / Print / Send / Share set.
     *
     * @example
     * ```tsx
     * import { GiselleIcon, IconActionBar } from '@alexrebula/giselle-mui';
     *
     * <IconActionBar
     *   actions={[
     *     { tooltip: 'Edit', icon: <GiselleIcon icon="solar:pen-bold" />, onClick: onEdit },
     *     { tooltip: 'Delete', icon: <GiselleIcon icon="solar:trash-bin-trash-bold" />, onClick: onDelete },
     *   ]}
     * />
     * ```
     *
     * @example
     * ```tsx
     * // Link action using a router component
     * import { GiselleIcon, IconActionBar } from '@alexrebula/giselle-mui';
     *
     * <IconActionBar
     *   actions={[
     *     {
     *       tooltip: 'Edit',
     *       icon: <GiselleIcon icon="solar:pen-bold" />,
     *       component: RouterLink,
     *       href: `/invoices/${id}/edit`,
     *     },
     *   ]}
     * />
     * ```
     */
    actions?: IconActionItem[];
}

/**
 * Default actions rendered when no `actions` prop is supplied.
 *
 * Uses the same Solar icon set as the source reference (invoice toolbar):
 * Edit, View, Print, Send, Share.
 */
declare const DEFAULT_ICON_ACTIONS: IconActionItem[];

/**
 * IconActionBar — a horizontal row of icon buttons, each paired with a tooltip.
 *
 * Renders a `Box` containing `Tooltip` + `IconButton` pairs. Each item is
 * fully configurable: icon slot, tooltip label, click handler, link target,
 * disabled state, and tooltip placement.
 *
 * When `actions` is omitted the bar defaults to the standard document toolbar
 * set: **Edit, View, Print, Send, Share**.
 *
 * ```tsx
 * import { GiselleIcon, IconActionBar } from '@alexrebula/giselle-mui';
 *
 * // Minimal — default actions
 * <IconActionBar />
 *
 * // Custom actions
 * <IconActionBar
 *   actions={[
 *     { tooltip: 'Edit', icon: <GiselleIcon icon="solar:pen-bold" />, onClick: handleEdit },
 *     { tooltip: 'Delete', icon: <GiselleIcon icon="solar:trash-bin-trash-bold" />, onClick: handleDelete },
 *   ]}
 * />
 * ```
 */
declare function IconActionBar({ actions, sx, ...other }: IconActionBarProps): react_jsx_runtime.JSX.Element;

/** Controls the visual order and flow direction of the two columns. */
type ShowcaseRowOrientation = 'row' | 'row-reverse' | 'column' | 'column-reverse';
/** Optional text block rendered in the left/top column. */
type TwoColumnShowcaseRowText = {
    /** Short uppercase label rendered above the heading. */
    overline?: string;
    /** Main heading text. */
    heading?: string;
    /** Supporting description paragraph. */
    description?: string;
};
type TwoColumnShowcaseRowProps = Omit<GridProps, 'direction' | 'container' | 'columnSpacing' | 'rowSpacing' | 'sx' | 'children'> & {
    /**
     * Optional text block rendered in the first column.
     * When omitted the layout is single-column (controls only).
     */
    text?: TwoColumnShowcaseRowText;
    /**
     * Content rendered in the controls column.
     * Accepts any `ReactNode` — form controls, cards, previews, etc.
     */
    controls: React.ReactNode;
    /**
     * Controls the visual order and flow direction of the two columns.
     * - `'row'`            → text left,    controls right  (default)
     * - `'row-reverse'`    → controls left, text right
     * - `'column'`         → text top,     controls bottom
     * - `'column-reverse'` → controls top, text bottom
     *
     * At `xs` the orientation is always `'column'` regardless of this value.
     *
     * @default 'row'
     */
    orientation?: ShowcaseRowOrientation;
    /**
     * `alignItems` applied to the controls `Stack`.
     *
     * @default 'flex-start'
     */
    controlsAlign?: StackProps['alignItems'];
    /** `sx` applied to the text column `Stack`. */
    textSx?: SxProps<Theme>;
    /** `sx` applied to the controls column `Stack`. */
    controlsSx?: SxProps<Theme>;
    /** `sx` applied to the root `Grid` container. */
    sx?: SxProps<Theme>;
};

/**
 * `TwoColumnShowcaseRow` lays out a text description alongside an interactive
 * controls area in a responsive two-column grid.
 *
 * ## Layout behaviour
 * - At `md+` the columns sit side by side, each taking half the container width.
 * - At `xs` the layout always stacks vertically regardless of `orientation`.
 * - When `text` is omitted the entire width is given to the `controls` slot.
 *
 * ## Orientation
 * Use `orientation` to swap which column comes first, or to force a stacked
 * layout at all breakpoints:
 *
 * ```tsx
 * // Text left, controls right (default)
 * <TwoColumnShowcaseRow text={{ heading: 'Theme' }} controls={<PresetPicker />} />
 *
 * // Controls only — full width column layout
 * <TwoColumnShowcaseRow controls={<DashboardPreview />} orientation="column" />
 * ```
 */
declare function TwoColumnShowcaseRow({ text, controls, orientation, controlsAlign, textSx, controlsSx, sx, ...other }: TwoColumnShowcaseRowProps): react_jsx_runtime.JSX.Element;

type TextSlotProps = {
    sx?: SxProps<Theme>;
};
type SectionTitleProps = Omit<BoxProps, 'title'> & {
    /**
     * Optional gradient accent word appended to `title`.
     * Rendered with reduced opacity and a horizontal gradient that fades from
     * `text.primary` to a 20% alpha of the same channel.
     */
    txtGradient?: string;
    /** Main heading text. Rendered as an `h2`. */
    title: ReactNode;
    /**
     * Short overline label rendered above the heading.
     * Styled as `overline` typography in `text.disabled` colour.
     */
    caption?: ReactNode;
    /**
     * Supporting description text rendered below the heading.
     * Styled as `body1` in `text.secondary` colour.
     */
    description?: ReactNode;
    /**
     * `sx` overrides for individual text slots.
     */
    slotProps?: {
        title?: TextSlotProps;
        caption?: TextSlotProps;
        description?: TextSlotProps;
    };
};
type SectionCaptionProps = {
    title: ReactNode;
    sx?: SxProps<Theme>;
};

/**
 * `SectionCaption` renders the overline label above the section heading.
 * Exported so consumers can use it standalone when they need just the overline.
 */
declare function SectionCaption({ title, sx, ...other }: SectionCaptionProps): react_jsx_runtime.JSX.Element;

/**
 * `SectionTitle` renders a stacked heading group: optional overline caption,
 * an `h2` heading with an optional gradient accent word, and an optional
 * description paragraph.
 *
 * ## Usage
 *
 * ```tsx
 * <SectionTitle
 *   caption="What we offer"
 *   title="Build better"
 *   txtGradient="faster"
 *   description="A set of tools that removes boilerplate and encodes best practices."
 * />
 * ```
 *
 * ## Gradient accent
 * The `txtGradient` word is appended after `title` and rendered with a
 * `text.primary → text.primary @20%` left-to-right gradient. In dark mode
 * `text.primary` resolves to near-white, giving a natural fade-out.
 */
declare function SectionTitle({ sx, title, caption, slotProps, txtGradient, description, ...other }: SectionTitleProps): react_jsx_runtime.JSX.Element;

type FloatingSubNavItem = {
    id: string;
    label: string;
    /** Icon to display inside the button. Pass a `<GiselleIcon />` or any `ReactNode`. */
    icon: ReactNode;
};
type FloatingSubNavProps = {
    /** Ordered list of items to display as icon buttons. */
    items: FloatingSubNavItem[];
    /**
     * The id of the currently active item.
     * When `null` the nav is hidden (slides out via `AnimatePresence` exit).
     */
    activeId: string | null;
    /** Called whenever the user presses a button. Always switches — never toggles. */
    onSelect: (id: string) => void;
    /**
     * When `true` the nav uses `position: sticky` within its parent container
     * instead of `position: fixed` relative to the viewport.
     *
     * @default false
     */
    sticky?: boolean;
};

/**
 * `FloatingSubNav` renders a compact pill of icon-only navigation buttons
 * that floats above the page content. Supports a **fixed** (viewport) variant
 * and a **sticky** (parent-contained) variant.
 */
declare function FloatingSubNav({ items, activeId, onSelect, sticky }: FloatingSubNavProps): react_jsx_runtime.JSX.Element;

interface SectionContainerProps extends Omit<ContainerProps, 'maxWidth'> {
    /**
     * MUI `Container` maxWidth. Controls the max-width breakpoint of the section content.
     * @default 'lg'
     */
    maxWidth?: ContainerProps['maxWidth'];
    /**
     * Vertical padding applied to the section via `py` shorthand.
     * Accepts a single value or a responsive object keyed by MUI breakpoints.
     * @default { xs: 8, md: 12 }
     */
    py?: number | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>>;
    /** MUI `sx` override on the root `Container`. */
    sx?: SxProps<Theme>;
}

/**
 * `SectionContainer` — standard full-width section wrapper.
 *
 * Wraps `Container maxWidth="lg"` with consistent vertical padding so every
 * section page has the same horizontal constraints and spacing without
 * repeating `sx={{ py: { xs: 8, md: 12 } }}` inline.
 *
 * **Usage:**
 * ```tsx
 * <SectionContainer>
 *   <Typography variant="h2">Section heading</Typography>
 * </SectionContainer>
 *
 * // Custom padding / max-width:
 * <SectionContainer maxWidth="md" py={{ xs: 6, md: 10 }}>
 *   ...
 * </SectionContainer>
 * ```
 */
declare function SectionContainer({ children, maxWidth, py, sx, ...other }: SectionContainerProps): react_jsx_runtime.JSX.Element;

/**
 * Maps a maturity/readiness percentage to a MUI palette key.
 *
 * Colours follow **MUI semantic conventions** — not the mango visual palette.
 * The mango metaphor (green = unripe, golden = ripe) is brand language used
 * in release stage labels (`resolveMaturityLabel`) and docs. The colour
 * mapping here defers to MUI standards so components read correctly to any
 * MUI-fluent developer regardless of the brand story.
 *
 * | Range    | Palette key  | Semantic meaning      |
 * |----------|--------------|-----------------------|
 * | 0–19 %   | `'error'`    | Blocked / not started |
 * | 20–39 %  | `'warning'`  | Early / at risk       |
 * | 40–59 %  | `'info'`     | In progress           |
 * | 60–79 %  | `'primary'`  | On track              |
 * | 80–100 % | `'success'`  | Stable / shipped      |
 *
 * The function clamps the input to `[0, 100]` before mapping.
 *
 * **Typical usage — derive `color` from readiness data:**
 * ```tsx
 * <StatCard
 *   label="Store Readiness"
 *   value="35%"
 *   color={resolveMaturityColor(35)}
 * />
 * ```
 */
declare function resolveMaturityColor(percent: number): StatCardColor;
/**
 * Returns a human-readable ripeness label for a maturity percentage.
 * Useful for `aria-label` text and tooltip descriptions.
 *
 * @example resolveMaturityLabel(35) → 'Early stage'
 */
declare function resolveMaturityLabel(percent: number): string;

/**
 * Transforms a `TimelinePhase[]` array so that each milestone's column placement
 * is derived automatically from its `done` state:
 *
 * - `done: true`  → `side: 'left'`  (Complete column)
 * - `done: false` → `side: 'right'` (Remaining column)
 *
 * **When to use:**
 * For checklist-style timelines where the two columns represent "Complete" and
 * "Remaining" — and the column a milestone belongs to is a function of its progress
 * state, not of a manual data entry.
 *
 * **Explicit overrides are preserved:**
 * If a milestone already has an explicit `side` property set in the data, that value
 * is kept unchanged. The auto-assignment only fills in milestones where `ms.side` is
 * `undefined`.
 *
 * **Where this logic lives (architectural rationale):**
 * The library's `TimelineTwoColumn` component does not automatically re-route milestones
 * based on `done` because it has no knowledge of the columns' semantic meaning — a
 * consumer could use "Past / Future", "Professional / Personal", or any other axis.
 * This transform lives in the consuming app's data layer (`sections-api/`), which is
 * where business semantics belong. The library exports the function so consumers don't
 * have to rediscover the correct `side` mapping pattern.
 *
 * @example
 * ```ts
 * // In sections-api/store-readiness/data.tsx
 * import { assignMilestoneSidesByDone } from '@alexrebula/giselle-mui';
 *
 * export const storeReadinessPhases = assignMilestoneSidesByDone(rawPhases);
 * ```
 */
declare function assignMilestoneSidesByDone(phases: TimelinePhase[]): TimelinePhase[];

type RadialProgressItem = {
    /** Series segment label displayed in the chart and legend. */
    label: string;
    /** Percentage value (0–100) for this segment. */
    value: number;
    /** MUI palette key used to colour this segment and its legend dot. */
    color: StatCardColor;
};
type RadialProgressCardProps = Omit<CardProps, 'title' | 'children'> & {
    /**
     * Card title shown in the `CardHeader`.
     * Omit to suppress the header entirely.
     */
    title?: string;
    /**
     * Card subheader shown below `title`.
     * Ignored when `title` is not provided.
     */
    subheader?: string;
    /**
     * Number shown in the radial chart centre — typically an aggregate percentage.
     *
     * **Example:** `35` renders as `"35"` with the `totalLabel` below it.
     */
    total: number;
    /**
     * Short label shown below `total` in the chart centre.
     *
     * @default '%'
     */
    totalLabel?: string;
    /**
     * Chart height in pixels.
     *
     * @default 280
     */
    chartHeight?: number;
    /**
     * Array of series items — one radial segment per item.
     * Segments are rendered from outermost (first) to innermost (last).
     */
    series: RadialProgressItem[];
    sx?: SxProps<Theme>;
};

/**
 * `RadialProgressCard`
 *
 * A `Card` containing a multi-series radial-bar chart and a legend row.
 * Inspired by the EcommerceSaleByGender pattern — independently implemented
 * without any Minimals utilities.
 *
 * **Usage:**
 * ```tsx
 * <RadialProgressCard
 *   title="Store Readiness"
 *   total={35}
 *   totalLabel="% Ready"
 *   series={[
 *     { label: 'Quality',    value: 90, color: 'success'  },
 *     { label: 'Components', value: 50, color: 'primary'  },
 *     { label: 'Theme',      value: 40, color: 'warning'  },
 *     { label: 'Docs',       value: 20, color: 'error'    },
 *   ]}
 * />
 * ```
 */
declare function RadialProgressCard({ title, subheader, total, totalLabel, chartHeight, series, sx, ...other }: RadialProgressCardProps): react_jsx_runtime.JSX.Element;

/**
 * PersonProfile — data model for a person in a cross-border family dispute.
 *
 * Designed for use in the Parents Across Borders (PAB) module and any
 * case-documentation page that needs to display the parties involved in a
 * family law / international custody situation.
 *
 * Contains no personal data — that lives in the consumer's data layer.
 * This file defines only the shape.
 */
/**
 * The role of this person in the case.
 *
 * - `'applicant'`     — the person seeking the court order / requesting the visit
 * - `'respondent'`    — the person responding to the application
 * - `'primary-carer'` — holds day-to-day physical custody
 * - `'non-resident'`  — lives in a different country from the child
 */
type PersonRole = 'applicant' | 'respondent' | 'primary-carer' | 'non-resident';
/**
 * A documented behavioral pattern observed in a parent's conduct.
 * Used to build a profile for strategic communication planning.
 */
type BehavioralPattern = {
    /** Short machine-readable identifier, e.g. `'incremental-obstruction'` */
    id: string;
    /** Display label, e.g. `'Incremental obstruction'` */
    label: string;
    /** One-sentence description of the pattern */
    description: string;
    /** Number of documented instances (for evidence weight) */
    evidenceCount?: number;
};
/**
 * A prior legal event relevant to the case (court hearing, ruling, settlement).
 */
type LegalRecord = {
    /** Date of the ruling / hearing, e.g. `'Feb 2026'` */
    date: string;
    /** What the case was about */
    description: string;
    /** What the judge decided */
    outcome: string;
    /** Approximate legal cost to the applicant, e.g. `'~€2,000'` */
    costToApplicant?: string;
};
/**
 * A note about how to communicate with this parent — what works, what to avoid.
 */
type CommunicationNote = {
    /** Short label, e.g. `'Always in writing'` */
    label: string;
    /** Explanation */
    detail: string;
};
/**
 * Full profile of one person in a cross-border family dispute.
 *
 * Used by the Parents Across Borders (PAB) module to display the parties
 * involved, document behavioral patterns, and guide communication strategy.
 *
 * @example
 * ```ts
 * const respondentProfile: PersonProfile = {
 *   id: 'respondent',
 *   displayName: '[Mother]',
 *   role: 'respondent',
 *   location: 'Country A',
 *   language: 'Slovenian',
 *   custodyStatus: 'sole physical custody',
 *   behavioralPatterns: [
 *     {
 *       id: 'asymmetric-rule-enforcement',
 *       label: 'Asymmetric rule enforcement',
 *       description:
 *         'Enforces rules on the other parent that she does not follow herself.',
 *       evidenceCount: 3,
 *     },
 *   ],
 * };
 * ```
 */
type PersonProfile = {
    /**
     * Stable machine-readable identifier, e.g. `'applicant'` or `'respondent'`.
     * Used as a key — never displayed directly.
     */
    id: string;
    /**
     * Display name — may be anonymised for public use, e.g. `'[Father]'`,
     * or a real first name for internal case documentation.
     */
    displayName: string;
    /** The role this person plays in the dispute. */
    role: PersonRole;
    /** City and/or country of residence, e.g. `'Melbourne, Australia'`. */
    location: string;
    /** Primary language for written communication. */
    language: string;
    /** Custody status description, e.g. `'sole physical custody'`. */
    custodyStatus?: string;
    /**
     * Documented behavioral patterns. Used for strategic communication planning.
     * Each pattern should have at least one recorded evidence instance before
     * being added here.
     */
    behavioralPatterns?: BehavioralPattern[];
    /**
     * Prior legal events relevant to the case.
     * Document outcomes and costs — the record matters.
     */
    legalHistory?: LegalRecord[];
    /**
     * Practical communication guidance for this parent.
     * What works. What to avoid. What triggers escalation.
     */
    communicationNotes?: CommunicationNote[];
    /** Free-form strategic notes — internal use only, never displayed publicly. */
    notes?: string[];
};

export { ACCORDION_CHECK_ICON_SIZE, ACCORDION_DONE_MIN_TOUCH_TARGET, ACCORDION_ICON_BUTTON_MIN_SIZE, Accordion, type AccordionProps, type BehavioralPattern, COMPACT_MILESTONE_DOT_SIZE, COMPACT_MIN_MILESTONE_DOT_SIZE, COMPACT_MIN_PHASE_DOT_SIZE, COMPACT_PHASE_DOT_SIZE, COMPACT_PHASE_ICON_SIZE, type CommunicationNote, DEFAULT_ICON_ACTIONS, FloatingSubNav, type FloatingSubNavItem, type FloatingSubNavProps, GISELLE_PRIMARY_DARK_MAIN, GISELLE_PRIMARY_MAIN, GISELLE_SECONDARY_MAIN, GiselleIcon, type GiselleIconData, type GiselleIconMap, type GiselleIconProps, type HighlightedPaletteKey, IconActionBar, type IconActionBarProps, type IconActionItem, type LegalRecord, MetricCard, type MetricCardColor, MetricCardDecoration, type MetricCardDecorationProps, type MetricCardProps, type PersonProfile, type PersonRole, PhaseCard, type PhaseCardProps, QuoteCard, type QuoteCardProps, RadialProgressCard, type RadialProgressCardProps, type RadialProgressItem, STAT_CARD_SPARKLINE_OPTIONS, SectionCaption, SectionContainer, type SectionContainerProps, SectionTitle, type SectionTitleProps, SelectableCard, type SelectableCardProps, type ShowcaseRowOrientation, StatCard, type StatCardColor, type StatCardItem, type StatCardProps, type Task, TaskList, type TaskListProps, type TimelineColumnLabels, TimelineCompact, type TimelineCompactProps, TimelineDot, type TimelineDotComponentProps, type TimelineMilestone, type TimelinePhase, type TimelinePlatformItem, type TimelineSectionData, type TimelineSidebar, TimelineTwoColumn, type TimelineTwoColumnProps, TwoColumnShowcaseRow, type TwoColumnShowcaseRowProps, type TwoColumnShowcaseRowText, assignMilestoneSidesByDone, channelAlpha, createIconRegistrar, giselleTheme, hexToChannel, pxToRem, remToPx, resolveCompactColor, resolveMaturityColor, resolveMaturityLabel };
