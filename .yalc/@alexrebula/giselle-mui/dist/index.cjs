'use client';
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ACCORDION_CHECK_ICON_SIZE: () => ACCORDION_CHECK_ICON_SIZE,
  ACCORDION_DONE_MIN_TOUCH_TARGET: () => ACCORDION_DONE_MIN_TOUCH_TARGET,
  ACCORDION_ICON_BUTTON_MIN_SIZE: () => ACCORDION_ICON_BUTTON_MIN_SIZE,
  Accordion: () => Accordion,
  COMPACT_MILESTONE_DOT_SIZE: () => COMPACT_MILESTONE_DOT_SIZE,
  COMPACT_MIN_MILESTONE_DOT_SIZE: () => COMPACT_MIN_MILESTONE_DOT_SIZE,
  COMPACT_MIN_PHASE_DOT_SIZE: () => COMPACT_MIN_PHASE_DOT_SIZE,
  COMPACT_PHASE_DOT_SIZE: () => COMPACT_PHASE_DOT_SIZE,
  COMPACT_PHASE_ICON_SIZE: () => COMPACT_PHASE_ICON_SIZE,
  DEFAULT_ICON_ACTIONS: () => DEFAULT_ICON_ACTIONS,
  FloatingSubNav: () => FloatingSubNav,
  GISELLE_PRIMARY_DARK_MAIN: () => GISELLE_PRIMARY_DARK_MAIN,
  GISELLE_PRIMARY_MAIN: () => GISELLE_PRIMARY_MAIN,
  GISELLE_SECONDARY_MAIN: () => GISELLE_SECONDARY_MAIN,
  GiselleIcon: () => GiselleIcon,
  IconActionBar: () => IconActionBar,
  MetricCard: () => MetricCard,
  MetricCardDecoration: () => MetricCardDecoration,
  PhaseCard: () => PhaseCard,
  QuoteCard: () => QuoteCard,
  RadialProgressCard: () => RadialProgressCard,
  STAT_CARD_SPARKLINE_OPTIONS: () => STAT_CARD_SPARKLINE_OPTIONS,
  SectionCaption: () => SectionCaption,
  SectionContainer: () => SectionContainer,
  SectionTitle: () => SectionTitle,
  SelectableCard: () => SelectableCard,
  StatCard: () => StatCard,
  TaskList: () => TaskList,
  TimelineCompact: () => TimelineCompact,
  TimelineDot: () => TimelineDot,
  TimelineTwoColumn: () => TimelineTwoColumn,
  TwoColumnShowcaseRow: () => TwoColumnShowcaseRow,
  assignMilestoneSidesByDone: () => assignMilestoneSidesByDone,
  channelAlpha: () => channelAlpha,
  createIconRegistrar: () => createIconRegistrar,
  giselleTheme: () => giselleTheme,
  hexToChannel: () => hexToChannel,
  pxToRem: () => pxToRem,
  remToPx: () => remToPx,
  resolveCompactColor: () => resolveCompactColor,
  resolveMaturityColor: () => resolveMaturityColor,
  resolveMaturityLabel: () => resolveMaturityLabel,
  useNestedChecklist: () => useNestedChecklist
});
module.exports = __toCommonJS(src_exports);

// src/utils/create-icon-registrar.ts
var import_react = require("@iconify/react");
function createIconRegistrar(icons) {
  const collectionMap = /* @__PURE__ */ new Map();
  for (const [key, data] of Object.entries(icons)) {
    const colonAt = key.indexOf(":");
    if (colonAt === -1) continue;
    const prefix = key.slice(0, colonAt);
    const name = key.slice(colonAt + 1);
    if (!collectionMap.has(prefix)) {
      collectionMap.set(prefix, { prefix, width: 24, height: 24, icons: {} });
    }
    collectionMap.get(prefix).icons[name] = data;
  }
  const collections = Array.from(collectionMap.values());
  let registered = false;
  return function registerIcons() {
    if (registered) return;
    collections.forEach((collection) => (0, import_react.addCollection)(collection));
    registered = true;
  };
}

// src/utils/theme-utils.ts
function channelAlpha(channel, alpha) {
  return `rgba(${channel} / ${alpha})`;
}
function hexToChannel(hex) {
  const clean = hex.startsWith("#") ? hex.slice(1) : hex;
  if (clean.length !== 6) {
    throw new Error(`hexToChannel: expected a 6-digit hex value, got "${hex}"`);
  }
  const r = Number.parseInt(clean.slice(0, 2), 16);
  const g = Number.parseInt(clean.slice(2, 4), 16);
  const b = Number.parseInt(clean.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    throw new Error(`hexToChannel: invalid hex value "${hex}"`);
  }
  return `${r} ${g} ${b}`;
}
function pxToRem(px) {
  return `${px / 16}rem`;
}
function remToPx(rem) {
  return rem * 16;
}

// src/utils/theme-preset.ts
var import_styles = require("@mui/material/styles");
var GISELLE_PRIMARY_MAIN = "#2E7D32";
var GISELLE_PRIMARY_DARK_MAIN = "#76C442";
var GISELLE_SECONDARY_MAIN = "#F5A623";
var giselleTheme = (0, import_styles.extendTheme)({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: GISELLE_PRIMARY_MAIN },
        secondary: { main: GISELLE_SECONDARY_MAIN },
        info: { main: "#0288D1" },
        success: { main: "#388E3C" },
        warning: { main: "#ED6C02" },
        error: { main: "#D32F2F" }
      }
    },
    dark: {
      palette: {
        primary: { main: GISELLE_PRIMARY_DARK_MAIN },
        secondary: { main: GISELLE_SECONDARY_MAIN },
        info: { main: "#29B6F6" },
        success: { main: "#66BB6A" },
        warning: { main: "#FFA726" },
        error: { main: "#F44336" }
      }
    }
  }
});

// src/components/icon/giselle/giselle-icon.tsx
var import_react2 = require("@iconify/react");
var import_Box = __toESM(require("@mui/material/Box"), 1);

// src/components/icon/giselle/giselle-icon.styles.ts
var giselleIconRootSx = (width, height) => ({
  lineHeight: 0,
  display: "inline-flex",
  flexShrink: 0,
  width,
  height
});

// src/components/icon/giselle/giselle-icon.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function GiselleIcon({
  icon,
  width = 20,
  height,
  sx,
  className,
  style,
  flip,
  rotate
}) {
  const h = height ?? width;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Box.default, { component: "span", sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]], children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react2.Icon,
    {
      icon,
      width: "100%",
      height: "100%",
      flip,
      rotate,
      className,
      style
    }
  ) });
}

// src/components/accordion/accordion.tsx
var import_react4 = require("react");
var import_Box2 = __toESM(require("@mui/material/Box"), 1);
var import_Checkbox = __toESM(require("@mui/material/Checkbox"), 1);
var import_Accordion = __toESM(require("@mui/material/Accordion"), 1);
var import_AccordionDetails = __toESM(require("@mui/material/AccordionDetails"), 1);
var import_AccordionSummary = __toESM(require("@mui/material/AccordionSummary"), 1);
var import_Typography = __toESM(require("@mui/material/Typography"), 1);

// src/components/accordion/check-icon-button.tsx
var import_react3 = require("react");
var import_SvgIcon = __toESM(require("@mui/material/SvgIcon"), 1);
var import_IconButton = __toESM(require("@mui/material/IconButton"), 1);

// src/components/accordion/accordion.const.ts
var ACCORDION_DONE_MIN_TOUCH_TARGET = 24;
var ACCORDION_CHECK_ICON_SIZE = 20;
var ACCORDION_ICON_BUTTON_MIN_SIZE = 28;

// src/components/accordion/accordion.styles.ts
var summaryRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5
};
var checkboxSx = {
  flexShrink: 0,
  alignSelf: "center"
};
var checkIconButtonSx = {
  padding: 0,
  flexShrink: 0,
  alignSelf: "center",
  // idle — not done
  "& .ci-idle": { display: "flex", alignItems: "center" },
  "& .ci-done": { display: "none" },
  "& .ci-hover": { display: "none" },
  // done
  '&[aria-pressed="true"] .ci-idle': { display: "none" },
  '&[aria-pressed="true"] .ci-done': { display: "flex", alignItems: "center" },
  // hover (any done state)
  "&:hover .ci-idle": { display: "none" },
  "&:hover .ci-done": { display: "none" },
  "&:hover .ci-hover": { display: "flex", alignItems: "center" },
  // keyboard focus-visible
  "&:focus-visible .ci-idle": { display: "none" },
  "&:focus-visible .ci-done": { display: "none" },
  "&:focus-visible .ci-hover": { display: "flex", alignItems: "center" }
};
var defaultCheckIconSvgSx = {
  color: "success.main",
  fontSize: ACCORDION_CHECK_ICON_SIZE
};
var leadingIconSx = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  px: 1
};
var summarySx = {
  flex: 1,
  minWidth: 0
};

// src/components/accordion/check-icon-button.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var DEFAULT_CHECK_DONE_ICON = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_SvgIcon.default, { sx: defaultCheckIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
var DEFAULT_CHECK_HOVER_ICON = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_SvgIcon.default, { sx: defaultCheckIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });
function CheckIconButton({
  done,
  checkIcon,
  checkDoneIcon = DEFAULT_CHECK_DONE_ICON,
  checkHoverIcon = DEFAULT_CHECK_HOVER_ICON,
  onDoneButtonClick
}) {
  const handleClick = (0, import_react3.useCallback)(
    (e) => {
      e.stopPropagation();
      onDoneButtonClick?.(!done);
    },
    [done, onDoneButtonClick]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    import_IconButton.default,
    {
      onClick: handleClick,
      "aria-pressed": done,
      "aria-label": done ? "Mark as not done" : "Mark as done",
      size: "small",
      sx: checkIconButtonSx,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ci-idle", children: checkIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ci-done", children: checkDoneIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ci-hover", children: checkHoverIcon })
      ]
    }
  );
}

// src/components/accordion/accordion.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function Accordion({
  title,
  children,
  checklist = false,
  done = false,
  indeterminate = false,
  onDoneButtonClick,
  leadingIcon,
  leadingAction,
  trailingContent,
  expandIcon,
  checkIcon,
  checkDoneIcon,
  checkHoverIcon,
  sx,
  ...other
}) {
  const id = (0, import_react4.useId)();
  const summaryId = `accordion-summary-${id}`;
  const detailsId = `accordion-details-${id}`;
  const handleCheckboxChange = (_e, checked) => {
    onDoneButtonClick?.(checked);
  };
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };
  const hasLeadingElement = checklist || leadingIcon !== void 0 || leadingAction !== void 0;
  let leadingElement = null;
  if (checklist) {
    if (checkIcon === void 0) {
      leadingElement = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_Checkbox.default,
        {
          checked: done,
          indeterminate,
          onChange: handleCheckboxChange,
          onClick: handleCheckboxClick,
          slotProps: {
            input: {
              "aria-label": done ? "Mark as not done" : "Mark as done"
            }
          },
          size: "small",
          sx: checkboxSx
        }
      );
    } else {
      leadingElement = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        CheckIconButton,
        {
          done,
          checkIcon,
          checkDoneIcon,
          checkHoverIcon,
          onDoneButtonClick
        }
      );
    }
  } else if (leadingAction === void 0) {
    leadingElement = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_Box2.default, { "aria-hidden": "true", sx: leadingIconSx, children: leadingIcon });
  } else {
    leadingElement = leadingAction;
  }
  const summaryContent = typeof title === "string" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_Typography.default, { component: "span", variant: "subtitle1", children: title }) : title;
  const accordionSummary = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    import_AccordionSummary.default,
    {
      expandIcon,
      id: summaryId,
      "aria-controls": detailsId,
      sx: hasLeadingElement ? summarySx : void 0,
      children: [
        summaryContent,
        trailingContent
      ]
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_Accordion.default, { sx: [...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    hasLeadingElement ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_Box2.default, { sx: summaryRowSx, children: [
      leadingElement,
      accordionSummary
    ] }) : accordionSummary,
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_AccordionDetails.default, { id: detailsId, children })
  ] });
}

// src/components/card/metric/metric-card.tsx
var import_Box4 = __toESM(require("@mui/material/Box"), 1);
var import_Paper = __toESM(require("@mui/material/Paper"), 1);
var import_Typography2 = __toESM(require("@mui/material/Typography"), 1);

// src/components/card/metric/metric-card.const.ts
var METRIC_CARD_ICON_BOX_SIZE = 36;
var METRIC_CARD_DECORATION_SIZE = 140;

// src/components/card/metric/metric-card.styles.ts
var metricCardPaperSx = {
  py: 3,
  pl: 3,
  pr: 2.5,
  position: "relative",
  overflow: "hidden"
};
var decorationOverlaySx = {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  pointerEvents: "none"
};
var metricCardContentSx = {
  position: "relative",
  zIndex: 1,
  flexGrow: 1
};
var metricCardIconBoxSx = (color) => (theme) => ({
  top: 24,
  right: 20,
  width: METRIC_CARD_ICON_BOX_SIZE,
  height: METRIC_CARD_ICON_BOX_SIZE,
  position: "absolute",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.vars.palette[color]?.main
});
var metricCardDecorationSx = (color) => (theme) => ({
  top: -40,
  right: -56,
  width: METRIC_CARD_DECORATION_SIZE,
  height: METRIC_CARD_DECORATION_SIZE,
  opacity: 0.1,
  borderRadius: 4,
  position: "absolute",
  transform: "rotate(40deg)",
  background: `linear-gradient(to right, ${theme.vars.palette[color]?.main}, transparent)`
});

// src/components/card/metric/metric-card-decoration.tsx
var import_Box3 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime4 = require("react/jsx-runtime");
function MetricCardDecoration({
  color = "primary",
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_Box3.default, { sx: [metricCardDecorationSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other });
}

// src/components/card/metric/metric-card.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function MetricCard({
  value,
  label,
  sublabel,
  icon,
  color = "primary",
  decoration,
  elevation = 0,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    import_Paper.default,
    {
      elevation,
      sx: [metricCardPaperSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        decoration && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_Box4.default, { "aria-hidden": "true", sx: decorationOverlaySx, children: decoration }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_Box4.default, { sx: metricCardContentSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_Box4.default, { sx: { typography: "h3" }, children: value }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_Typography2.default, { noWrap: true, variant: "subtitle2", component: "div", sx: { color: "text.secondary" }, children: label }),
          sublabel && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            import_Typography2.default,
            {
              noWrap: true,
              variant: "caption",
              component: "div",
              sx: { color: "text.disabled", mt: 0.25 },
              children: sublabel
            }
          )
        ] }),
        icon && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_Box4.default, { "aria-hidden": "true", sx: metricCardIconBoxSx(color), children: icon })
      ]
    }
  );
}

// src/components/card/selectable/selectable-card.tsx
var import_ButtonBase = __toESM(require("@mui/material/ButtonBase"), 1);

// src/components/card/selectable/selectable-card.styles.ts
var selectableCardSx = (selected) => (theme) => ({
  // --- Layout reset (ButtonBase is inline-flex by default) ---
  display: "block",
  width: "100%",
  textAlign: "left",
  // --- Paper-like surface ---
  p: 2.5,
  borderRadius: 1.5,
  position: "relative",
  overflow: "hidden",
  // Contains the MUI ripple within the border-radius
  border: `1px solid ${theme.vars.palette.divider}`,
  bgcolor: theme.vars.palette.background.paper,
  // --- Hover: subtle fill, cursor affordance ---
  cursor: "pointer",
  transition: theme.transitions.create(["background-color", "box-shadow"], {
    duration: theme.transitions.duration.shorter
  }),
  "&:hover": {
    bgcolor: theme.vars.palette.action.hover
  },
  // --- Keyboard focus ring ---
  // .Mui-focusVisible is applied by ButtonBase on keyboard navigation only,
  // so mouse users never see this ring (good UX + meets WCAG 2.4.11).
  "&.Mui-focusVisible": {
    outline: `3px solid ${theme.vars.palette.primary.main}`,
    outlineOffset: 2
  },
  // --- Selected ring (2px outline using box-shadow, doesn't affect layout) ---
  ...selected && {
    boxShadow: `0 0 0 2px ${theme.vars.palette.text.primary}`
  },
  // --- Disabled: muted + no pointer (ButtonBase also sets aria-disabled) ---
  "&.Mui-disabled": {
    opacity: 0.48,
    cursor: "default",
    pointerEvents: "none"
  }
});

// src/components/card/selectable/selectable-card.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function SelectableCard({
  selected = false,
  disabled = false,
  children,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    import_ButtonBase.default,
    {
      disabled,
      "aria-pressed": selected,
      focusRipple: true,
      sx: [selectableCardSx(selected), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children
    }
  );
}

// src/components/card/quote/quote-card.tsx
var import_Box5 = __toESM(require("@mui/material/Box"), 1);
var import_Paper2 = __toESM(require("@mui/material/Paper"), 1);
var import_Stack = __toESM(require("@mui/material/Stack"), 1);
var import_Typography3 = __toESM(require("@mui/material/Typography"), 1);

// src/components/card/quote/quote-card.styles.ts
var quoteMarkSx = (color) => ({
  lineHeight: 1,
  fontSize: "4rem",
  color: `${color}.main`,
  opacity: 0.4,
  fontFamily: "Georgia, serif",
  userSelect: "none",
  flexShrink: 0,
  mt: -0.5
});
var quoteTextSx = {
  fontStyle: "italic",
  fontWeight: "fontWeightLight",
  color: "text.secondary",
  lineHeight: 1.85
};
var quoteCardPaperSx = (color) => (theme) => ({
  p: 3,
  borderRadius: 2,
  bgcolor: `rgba(${theme.vars.palette[color]?.mainChannel} / 0.06)`,
  border: `1px solid rgba(${theme.vars.palette[color]?.mainChannel} / 0.12)`
});

// src/components/card/quote/quote-card.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function QuoteCard({
  quote,
  author,
  source,
  color = "primary",
  elevation = 0,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    import_Paper2.default,
    {
      elevation,
      sx: [quoteCardPaperSx(color), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_Box5.default, { sx: { display: "flex", gap: 2 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_Typography3.default, { "aria-hidden": true, sx: quoteMarkSx(color), children: "\u201C" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_Box5.default, { sx: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_Typography3.default, { variant: "body1", sx: quoteTextSx, children: quote }),
          (author || source) && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            import_Stack.default,
            {
              direction: "row",
              spacing: 0.75,
              alignItems: "center",
              sx: { mt: 2, color: "text.disabled" },
              children: [
                author && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_Typography3.default, { variant: "caption", sx: { fontWeight: "fontWeightMedium" }, children: author }),
                author && source && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_Typography3.default, { variant: "caption", "aria-hidden": true, sx: { opacity: 0.6 }, children: "\xB7" }),
                source && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_Typography3.default, { variant: "caption", sx: { opacity: 0.72 }, children: source })
              ]
            }
          )
        ] })
      ] })
    }
  );
}

// src/components/card/stat/stat-card.tsx
var import_Box6 = __toESM(require("@mui/material/Box"), 1);
var import_Card = __toESM(require("@mui/material/Card"), 1);
var import_Typography4 = __toESM(require("@mui/material/Typography"), 1);

// src/components/card/stat/stat-card.styles.ts
var statCardRootSx = (color) => (theme) => ({
  p: 3,
  boxShadow: "none",
  position: "relative",
  overflow: "hidden",
  color: `${color}.dark`,
  backgroundImage: `linear-gradient(135deg, ${channelAlpha(theme.vars.palette[color].lightChannel, 0.1)}, ${channelAlpha(theme.vars.palette[color].lightChannel, 0.22)})`
});
var trendBoxSx = {
  top: 16,
  right: 16,
  gap: 0.5,
  display: "flex",
  position: "absolute",
  alignItems: "center"
};
var iconBoxSx = {
  mb: 3,
  width: 48,
  height: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start"
};
var contentRowSx = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-end",
  justifyContent: "flex-end"
};
var labelsBoxSx = {
  flexGrow: 1,
  minWidth: 112
};
var decorationSx = {
  position: "absolute",
  bottom: -20,
  right: -20,
  pointerEvents: "none",
  lineHeight: 0
};
var STAT_CARD_SPARKLINE_OPTIONS = {
  chart: {
    sparkline: { enabled: true },
    animations: { enabled: false }
  },
  stroke: { width: 2, curve: "smooth" },
  tooltip: { enabled: false },
  markers: { strokeWidth: 0 }
};

// src/components/card/stat/stat-card-shape.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function StatCardShape() {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "svg",
    {
      width: "120",
      height: "120",
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "rect",
          {
            x: "14",
            y: "14",
            width: "80",
            height: "80",
            rx: "16",
            transform: "rotate(15 54 54)",
            fill: "currentColor",
            fillOpacity: "0.16"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "rect",
          {
            x: "32",
            y: "32",
            width: "56",
            height: "56",
            rx: "12",
            transform: "rotate(-8 60 60)",
            fill: "currentColor",
            fillOpacity: "0.1"
          }
        )
      ]
    }
  );
}

// src/components/card/stat/stat-card.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function StatCard({
  label,
  value,
  trend,
  trendLabel,
  icon,
  color = "primary",
  chart,
  sx,
  ...other
}) {
  const isUp = (trend ?? 0) >= 0;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_Card.default, { sx: [statCardRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_Box6.default, { "aria-hidden": "true", sx: decorationSx, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(StatCardShape, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_Box6.default, { sx: iconBoxSx, children: icon }),
    trend !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_Box6.default, { sx: trendBoxSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(GiselleIcon, { width: 20, icon: isUp ? "eva:trending-up-fill" : "eva:trending-down-fill" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_Typography4.default, { component: "span", variant: "subtitle2", children: [
        isUp && "+",
        trend,
        "%"
      ] }),
      trendLabel && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        import_Typography4.default,
        {
          component: "span",
          variant: "caption",
          sx: { opacity: 0.72, ml: 0.5, fontWeight: 400 },
          children: trendLabel
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_Box6.default, { sx: contentRowSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_Box6.default, { sx: labelsBoxSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_Typography4.default, { variant: "subtitle2", sx: { mb: 0.5 }, children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_Typography4.default, { variant: "h4", children: value })
      ] }),
      chart
    ] })
  ] });
}

// src/components/timeline/two-column/phase-card/phase-card.tsx
var import_react7 = require("react");

// src/components/timeline/two-column/phase-warning-popover/phase-warning-popover.tsx
var import_react5 = require("react");
var import_Box8 = __toESM(require("@mui/material/Box"), 1);
var import_Paper3 = __toESM(require("@mui/material/Paper"), 1);
var import_Popper = __toESM(require("@mui/material/Popper"), 1);
var import_Slider = __toESM(require("@mui/material/Slider"), 1);
var import_Typography5 = __toESM(require("@mui/material/Typography"), 1);
var import_IconButton2 = __toESM(require("@mui/material/IconButton"), 1);
var import_Divider = __toESM(require("@mui/material/Divider"), 1);
var import_Button = __toESM(require("@mui/material/Button"), 1);
var import_ClickAwayListener = __toESM(require("@mui/material/ClickAwayListener"), 1);

// src/components/timeline/two-column/utils.ts
function getLastYear(date) {
  const re = /\b(20\d{2}|19\d{2})\b/g;
  let last = null;
  let m;
  while ((m = re.exec(date)) !== null) last = m;
  return last ? Number.parseInt(last[1], 10) : null;
}
var MONTH_INDEX = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
};
var MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function parseLastDate(dateStr) {
  const re = /\b(\d\d?)?\s*([a-z]+)\s*(\d{4})\b/gi;
  let lastMatch = null;
  let m;
  while ((m = re.exec(dateStr)) !== null) {
    const year2 = Number.parseInt(m[3], 10);
    if (!(m[2].slice(0, 3).toLowerCase() in MONTH_INDEX) || year2 < 1900 || year2 > 2099) continue;
    lastMatch = m;
  }
  if (!lastMatch) return null;
  const hasDay = Boolean(lastMatch[1]);
  const month = MONTH_INDEX[lastMatch[2].slice(0, 3).toLowerCase()];
  const year = Number.parseInt(lastMatch[3], 10);
  if (!hasDay) {
    return new Date(year, month + 1, 0);
  }
  return new Date(year, month, Number.parseInt(lastMatch[1], 10));
}
function parseSortableDate(dateStr) {
  const precise = parseLastDate(dateStr);
  if (precise !== null) return precise.getTime();
  const year = getLastYear(dateStr);
  if (year !== null) return new Date(year, 0, 1).getTime();
  return null;
}
function sortPhasesByDate(phases, sortOrder = "desc") {
  if (sortOrder === "key") return [...phases].sort((a, b) => a.key - b.key);
  const dir = sortOrder === "asc" ? 1 : -1;
  return [...phases].sort((a, b) => {
    if (sortOrder === "desc") {
      if (a.active && b.active) return b.key - a.key;
      if (a.active) return -1;
      if (b.active) return 1;
    }
    const da = parseSortableDate(a.date);
    const db = parseSortableDate(b.date);
    if (da === null && db === null) return dir * (a.key - b.key);
    if (da === null) return 1;
    if (db === null) return -1;
    if (db !== da) return dir * (da - db);
    return dir * (a.key - b.key);
  });
}
function sortMilestonesAsc(milestones) {
  return [...milestones].sort((a, b) => {
    const da = a.date ? parseSortableDate(a.date) : null;
    const db = b.date ? parseSortableDate(b.date) : null;
    if (da === null && db === null) return 0;
    if (da === null) return 1;
    if (db === null) return -1;
    return da - db;
  });
}
function sortMilestonesDesc(milestones) {
  return [...milestones].sort((a, b) => {
    const da = a.date ? parseSortableDate(a.date) : null;
    const db = b.date ? parseSortableDate(b.date) : null;
    if (da === null && db === null) return 0;
    if (da === null) return 1;
    if (db === null) return -1;
    return db - da;
  });
}
function parseFirstDate(dateStr) {
  const normalized = dateStr.trim().toLowerCase();
  const re = /\b(\d\d?)?\s*([a-z]+)\s*(\d{4})\b/i;
  const m = re.exec(normalized);
  if (m) {
    const year = Number.parseInt(m[3], 10);
    const monthKey = m[2].slice(0, 3).toLowerCase();
    const month = MONTH_INDEX[monthKey];
    if (month !== void 0 && year >= 1900 && year <= 2099) {
      const day = m[1] ? Number.parseInt(m[1], 10) : 1;
      return new Date(year, month, day).getTime();
    }
  }
  const yearRe = /\b(20\d{2}|19\d{2})\b/;
  const ym = yearRe.exec(normalized);
  if (ym) return new Date(Number.parseInt(ym[1], 10), 0, 1).getTime();
  return null;
}
function detectPhaseOverlaps(phases) {
  const overlapping = /* @__PURE__ */ new Map();
  const ranges = phases.map((p) => ({
    key: p.key,
    label: `${p.title ?? String(p.key)} (${p.date})`,
    start: parseFirstDate(p.date),
    end: parseSortableDate(p.date)
  })).filter(
    (r) => r.start !== null && r.end !== null
  );
  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const a = ranges[i];
      const b = ranges[j];
      if (a.start <= b.end && b.start <= a.end) {
        if (!overlapping.has(a.key)) overlapping.set(a.key, []);
        if (!overlapping.has(b.key)) overlapping.set(b.key, []);
        overlapping.get(a.key).push(b.label);
        overlapping.get(b.key).push(a.label);
      }
    }
  }
  const result = /* @__PURE__ */ new Map();
  overlapping.forEach((others, key) => {
    result.set(key, `Date overlap with: ${others.join("; ")}`);
  });
  return result;
}
function dateToMonthIndex(dateStr) {
  const re = /\b([a-z]+)\s*(\d{4})\b/i;
  const m = re.exec(dateStr.trim());
  if (!m) return null;
  const monthKey = m[1].slice(0, 3).toLowerCase();
  const month = MONTH_INDEX[monthKey];
  const year = Number.parseInt(m[2], 10);
  if (month === void 0 || year < 1900 || year > 2099) return null;
  return year * 12 + month;
}
function monthIndexToDate(index) {
  const year = Math.floor(index / 12);
  const month = index % 12;
  return `${MONTH_NAMES[month]} ${year}`;
}
function resolveOverlaps(phases) {
  const parseable = [];
  const unparseable = [];
  for (const phase of phases) {
    const startMs = parseFirstDate(phase.date);
    const endMs = parseSortableDate(phase.date);
    if (startMs === null || endMs === null) {
      unparseable.push(phase);
      continue;
    }
    const startDate = new Date(startMs);
    const endDate = new Date(endMs);
    const startIdx = startDate.getFullYear() * 12 + startDate.getMonth();
    const endIdx = endDate.getFullYear() * 12 + endDate.getMonth();
    parseable.push({ phase, startIdx, endIdx, duration: endIdx - startIdx });
  }
  parseable.sort((a, b) => a.startIdx - b.startIdx || a.phase.key - b.phase.key);
  for (let i = 1; i < parseable.length; i++) {
    const prev = parseable[i - 1];
    const curr = parseable[i];
    if (curr.startIdx <= prev.endIdx) {
      curr.startIdx = prev.endIdx + 1;
      curr.endIdx = curr.startIdx + curr.duration;
    }
  }
  const resolved = parseable.map(({ phase, startIdx, endIdx, duration }) => {
    const newDate = duration === 0 ? monthIndexToDate(startIdx) : `${monthIndexToDate(startIdx)} \u2013 ${monthIndexToDate(endIdx)}`;
    return { ...phase, date: newDate };
  });
  return [...resolved, ...unparseable];
}
function resolvePhaseOverdue(phase, checklist, isDone, today) {
  if (!checklist || isDone) return false;
  const parsedDate = parseLastDate(phase.date);
  const isAutoOverdue = parsedDate !== null && parsedDate < today;
  return (phase.overdue ?? false) || isAutoOverdue;
}
function resolvePhaseState(phase, index, sorted, lastKey, checklist, localPhaseDone, today) {
  const isDone = checklist ? localPhaseDone[String(phase.key)] ?? false : phase.done ?? false;
  const isOverdue = resolvePhaseOverdue(phase, checklist, isDone, today);
  const colorFromData = phase.color && phase.color !== "inherit" && phase.color !== "grey" ? phase.color : null;
  const baseDotColor = colorFromData ?? (phase.side === "left" ? "secondary" : "primary");
  const dotColor = isOverdue ? "error" : baseDotColor;
  const nextPhase = sorted[index + 1];
  const thisYear = getLastYear(phase.date);
  const nextYear = nextPhase ? getLastYear(nextPhase.date) : null;
  const yearLabelValue = nextYear !== null && thisYear !== null && nextYear < thisYear ? String(nextYear) : null;
  return {
    isDone,
    isOverdue,
    dotColor,
    yearLabelValue,
    phaseMilestones: phase.milestones ?? [],
    isLastPhase: phase.key === lastKey
  };
}
function resolvePhaseDotHandlers(phase, isDone, checklist, handleTogglePhase, onPhaseSelect) {
  const dotActionLabel = isDone ? "Unmark" : "Mark";
  let dotAriaLabel;
  if (checklist) {
    dotAriaLabel = `${dotActionLabel} "${phase.title}" as done`;
  } else if (onPhaseSelect) {
    dotAriaLabel = `Select "${phase.title}"`;
  }
  let dotClickAction;
  if (checklist) {
    dotClickAction = () => handleTogglePhase(phase.key);
  } else if (onPhaseSelect) {
    dotClickAction = () => onPhaseSelect(phase.key);
  }
  const dotKeyDownHandler = dotClickAction ? (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      dotClickAction();
    }
  } : void 0;
  return { dotClickAction, dotKeyDownHandler, dotAriaLabel };
}
function buildPhaseCardTsxProps(checklist, isDone, isOverdue, dateConflict, dateConflictLabel, anyExpanded, isThisPhaseExpanded, expandableIcon) {
  return {
    done: isDone,
    overdue: checklist ? isOverdue : void 0,
    dateConflict: dateConflict || void 0,
    dateConflictLabel,
    suppressElevation: anyExpanded && !isThisPhaseExpanded,
    expandableIcon
  };
}
function dotStatusLabel(color, done, date) {
  let status;
  if (done) {
    status = "Done";
  } else if (color === "error") {
    status = "Blocking";
  } else if (color === "warning") {
    status = "In progress";
  } else if (color === "success") {
    status = "Planned";
  } else {
    status = "Upcoming";
  }
  return date ? `${status} \xB7 ${date}` : status;
}
function truncateDescription(s, maxLen = 72) {
  const parts = s.split(/[.!?](?=\s|$)/);
  const firstSentence = (parts[0] ?? "").trim();
  const text = firstSentence.length > 0 ? firstSentence : s;
  return text.length <= maxLen ? text : `${text.slice(0, maxLen).trimEnd()}\u2026`;
}
function resolvePhaseTooltip(checklist, color, done, phase) {
  if (phase.dotTooltip != null) return phase.dotTooltip;
  if (checklist) return dotStatusLabel(color, done, phase.date);
  if (phase.description) return truncateDescription(phase.description);
  const label = phase.shortTitle ?? phase.title;
  return phase.date ? `${label} \xB7 ${phase.date}` : label;
}
function resolveMilestoneTooltip(checklist, color, done, ms) {
  if (ms.dotTooltip != null) return ms.dotTooltip;
  if (checklist) return dotStatusLabel(color, done, ms.date);
  if (ms.description) return truncateDescription(ms.description);
  const label = ms.shortTitle ?? ms.title;
  return ms.date ? `${label} \xB7 ${ms.date}` : label;
}
function buildPhaseDotTsxProps(phase, checklist, isDone, dotAriaLabel, phaseToggleCounts, selectedPhaseKey) {
  let role;
  if (checklist) {
    role = "checkbox";
  } else if (dotAriaLabel) {
    role = "button";
  }
  return {
    active: (phase.active ?? false) || !checklist && phase.key === selectedPhaseKey,
    animationKey: phaseToggleCounts[String(phase.key)] ?? 0,
    done: isDone,
    role,
    "aria-checked": checklist ? isDone : void 0,
    "aria-label": dotAriaLabel,
    tabIndex: checklist || dotAriaLabel ? 0 : void 0
  };
}
function resolveMilestoneState(ms, mi, phaseKey, dotColor, checklist, localMilestoneDone) {
  const msDoneKey = `${phaseKey}-${mi}`;
  const msDone = checklist ? localMilestoneDone[msDoneKey] ?? ms.done ?? false : ms.done ?? false;
  const msIsOverdue = checklist && (ms.overdue ?? false) && !msDone;
  const msColorFromData = ms.color && ms.color !== "inherit" && ms.color !== "grey" ? ms.color : dotColor;
  let msColor;
  if (msDone) {
    msColor = "success";
  } else if (msIsOverdue) {
    msColor = "error";
  } else {
    msColor = msColorFromData;
  }
  return { msDone, msColor };
}
function resolveMilestoneDotHandlers(ms, mi, phaseKey, msDone, checklist, handleToggleMilestone) {
  const msDotActionLabel = msDone ? "Unmark" : "Mark";
  const msDotAriaLabel = checklist ? `${msDotActionLabel} "${ms.title}" as done` : void 0;
  const msDotClickAction = checklist ? () => handleToggleMilestone(phaseKey, mi) : void 0;
  const msDotKeyDown = msDotClickAction ? (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      msDotClickAction();
    }
  } : void 0;
  return { msDotClickAction, msDotKeyDown, msDotAriaLabel };
}
function computeSlotHeights(phases, heightMap) {
  const result = {};
  phases.forEach((phase) => {
    const n = phase.milestones?.length ?? 0;
    if (n === 0) return;
    let maxH = 0;
    for (let i = 0; i < n; i++) {
      const h = heightMap[`${String(phase.key)}-${i}`] ?? 0;
      if (h > maxH) maxH = h;
    }
    if (maxH > 0) {
      result[String(phase.key)] = maxH + 16;
    }
  });
  return result;
}
function resolveTaskChildren(item) {
  if (item.children && item.children.length > 0) return item.children;
  if (item.details && item.details.length > 0) return item.details.map((title) => ({ title }));
  return [];
}

// src/components/timeline/two-column/phase-warning-popover/phase-warning-popover.styles.ts
var ganttTrackSx = {
  position: "relative",
  height: 20,
  borderRadius: 1,
  bgcolor: "action.hover"
};
var popoverPaperSx = {
  width: 340,
  p: 2,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  gap: 1.5
};
var sliderRowHeaderSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 0.25
};
var actionsRowSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 1
};
var ganttBarSx = (leftPct, widthPct, isOverlapping, sliderColor) => (theme) => ({
  position: "absolute",
  top: 4,
  height: 12,
  left: `${leftPct}%`,
  width: `${widthPct}%`,
  borderRadius: 0.5,
  opacity: isOverlapping ? 0.7 : 1,
  bgcolor: isOverlapping ? "transparent" : theme.vars.palette[sliderColor]?.main,
  ...isOverlapping && {
    background: `repeating-linear-gradient(
                  45deg,
                  ${theme.vars.palette[sliderColor]?.main} 0px,
                  ${theme.vars.palette[sliderColor]?.main} 4px,
                  transparent 4px,
                  transparent 8px
                )`
  }
});

// src/components/timeline/two-column/phase-warning-popover/mini-gantt-ruler.tsx
var import_Box7 = __toESM(require("@mui/material/Box"), 1);

// src/components/timeline/two-column/phase-warning-popover/utils.ts
function parsePhaseRange(phase) {
  const parts = phase.date.split(/\s*[–-]\s*/u);
  const startIdx = dateToMonthIndex(parts[0] ?? "");
  const endIdx = dateToMonthIndex(parts[parts.length - 1] ?? "");
  if (startIdx === null) return null;
  return { startIdx, endIdx: endIdx ?? startIdx };
}
function getConnectedOverlapGroup(phases, startKey) {
  const ranges = phases.map((p) => {
    const r = parsePhaseRange(p);
    return r ? { key: p.key, ...r } : null;
  }).filter((r) => r !== null);
  const adjacency = /* @__PURE__ */ new Map();
  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const a = ranges[i];
      const b = ranges[j];
      if (a.startIdx <= b.endIdx && b.startIdx <= a.endIdx) {
        if (!adjacency.has(a.key)) adjacency.set(a.key, /* @__PURE__ */ new Set());
        if (!adjacency.has(b.key)) adjacency.set(b.key, /* @__PURE__ */ new Set());
        adjacency.get(a.key).add(b.key);
        adjacency.get(b.key).add(a.key);
      }
    }
  }
  const visited = /* @__PURE__ */ new Set();
  const queue = [startKey];
  while (queue.length > 0) {
    const key = queue.shift();
    if (visited.has(key)) continue;
    visited.add(key);
    adjacency.get(key)?.forEach((neighbor) => {
      if (!visited.has(neighbor)) queue.push(neighbor);
    });
  }
  return phases.filter((p) => visited.has(p.key));
}
function computeAxis(overrides) {
  let min = Infinity;
  let max = -Infinity;
  overrides.forEach(({ startIdx, endIdx }) => {
    if (startIdx < min) min = startIdx;
    if (endIdx > max) max = endIdx;
  });
  return {
    min: Number.isFinite(min) ? min - 2 : 0,
    max: Number.isFinite(max) ? max + 2 : 24
  };
}
function hasRemainingOverlaps(overrides) {
  const ranges = Array.from(overrides.values());
  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const a = ranges[i];
      const b = ranges[j];
      if (a.startIdx <= b.endIdx && b.startIdx <= a.endIdx) return true;
    }
  }
  return false;
}
function applyOverrides(conflictingPhases, overrides) {
  return conflictingPhases.map((p) => {
    const override = overrides.get(p.key);
    if (!override) return p;
    const { startIdx, endIdx } = override;
    const newDate = startIdx === endIdx ? monthIndexToDate(startIdx) : `${monthIndexToDate(startIdx)} \u2013 ${monthIndexToDate(endIdx)}`;
    return { ...p, date: newDate };
  });
}
function mergeIntoAll(allPhases, updated) {
  const byKey = new Map(updated.map((p) => [p.key, p]));
  return allPhases.map((p) => byKey.get(p.key) ?? p);
}
function resolveSliderColor(color) {
  if (!color || color === "inherit" || color === "grey") return "primary";
  return color;
}

// src/components/timeline/two-column/phase-warning-popover/mini-gantt-ruler.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function MiniGanttRuler({ axis, conflictingPhases, overrides }) {
  const span = axis.max - axis.min;
  if (span <= 0) return null;
  const rangeList = Array.from(overrides.entries());
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_Box7.default, { "aria-hidden": true, sx: ganttTrackSx, children: conflictingPhases.map((phase) => {
    const override = overrides.get(phase.key);
    if (!override) return null;
    const leftPct = (override.startIdx - axis.min) / span * 100;
    const widthPct = Math.max(1, (override.endIdx - override.startIdx) / span * 100);
    const sliderColor = resolveSliderColor(phase.color);
    const isOverlapping = rangeList.some(
      ([otherKey, other]) => otherKey !== phase.key && override.startIdx <= other.endIdx && other.startIdx <= override.endIdx
    );
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_Box7.default, { sx: ganttBarSx(leftPct, widthPct, isOverlapping, sliderColor) }, phase.key);
  }) });
}

// src/components/timeline/two-column/phase-warning-popover/phase-warning-popover.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
function PhaseWarningPopover({
  open,
  anchorEl,
  onClose,
  allPhases,
  currentPhase,
  onPhasesChange
}) {
  const conflictingPhases = (0, import_react5.useMemo)(
    () => getConnectedOverlapGroup(allPhases, currentPhase.key),
    [allPhases, currentPhase.key]
  );
  const [overrides, setOverrides] = (0, import_react5.useState)(() => /* @__PURE__ */ new Map());
  const [pendingApply, setPendingApply] = (0, import_react5.useState)(false);
  (0, import_react5.useEffect)(() => {
    if (!open) return;
    const initial = /* @__PURE__ */ new Map();
    for (const p of conflictingPhases) {
      const range = parsePhaseRange(p);
      if (range) initial.set(p.key, range);
    }
    setOverrides(initial);
    setPendingApply(false);
  }, [open, conflictingPhases]);
  const axis = (0, import_react5.useMemo)(() => computeAxis(overrides), [overrides]);
  const stillOverlapping = (0, import_react5.useMemo)(() => hasRemainingOverlaps(overrides), [overrides]);
  const handleSliderChange = (0, import_react5.useCallback)((phaseKey, value) => {
    if (!Array.isArray(value)) return;
    const [start, end] = value;
    setOverrides((prev) => {
      const next = new Map(prev);
      next.set(phaseKey, { startIdx: start, endIdx: end });
      return next;
    });
    setPendingApply(false);
  }, []);
  const handleMakeSequential = (0, import_react5.useCallback)(() => {
    const withOverrides = applyOverrides(conflictingPhases, overrides);
    const resolved = resolveOverlaps(withOverrides);
    const next = /* @__PURE__ */ new Map();
    for (const p of resolved) {
      const range = parsePhaseRange(p);
      if (range) next.set(p.key, range);
    }
    setOverrides(next);
    setPendingApply(true);
  }, [conflictingPhases, overrides]);
  const handleApply = (0, import_react5.useCallback)(() => {
    const withOverrides = applyOverrides(conflictingPhases, overrides);
    const merged = mergeIntoAll(allPhases, withOverrides);
    onPhasesChange(merged);
    onClose();
  }, [conflictingPhases, overrides, allPhases, onPhasesChange, onClose]);
  const handleCancel = (0, import_react5.useCallback)(() => {
    const initial = /* @__PURE__ */ new Map();
    for (const p of conflictingPhases) {
      const range = parsePhaseRange(p);
      if (range) initial.set(p.key, range);
    }
    setOverrides(initial);
    setPendingApply(false);
  }, [conflictingPhases]);
  const warningCount = conflictingPhases.length;
  if (!open || !anchorEl) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    import_Popper.default,
    {
      open,
      anchorEl,
      placement: "bottom-start",
      modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
      sx: { zIndex: (theme) => theme.zIndex.tooltip + 1 },
      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ClickAwayListener.default, { onClickAway: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Paper3.default, { elevation: 8, sx: popoverPaperSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Box8.default, { sx: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
            import_Typography5.default,
            {
              variant: "subtitle2",
              sx: { display: "flex", alignItems: "center", gap: 0.5 },
              children: [
                "\u26A0 ",
                warningCount,
                " date overlap",
                warningCount !== 1 ? "s" : ""
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            import_IconButton2.default,
            {
              size: "small",
              onClick: onClose,
              "aria-label": "Close warning panel",
              sx: { ml: "auto" },
              children: "\xD7"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Divider.default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Box8.default, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Typography5.default, { variant: "body2", color: "warning.main", sx: { fontWeight: 500 }, children: `Overlap: ${conflictingPhases.map((p) => p.shortTitle ?? p.title).join(" \u2194 ")}` }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Typography5.default, { variant: "caption", color: "text.secondary", sx: { mt: 0.5, display: "block" }, children: [
            currentPhase.shortTitle ?? currentPhase.title,
            " \u2014 adjust sliders or use Make sequential."
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Divider.default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Box8.default, { sx: { display: "flex", flexDirection: "column", gap: 1.5 }, children: conflictingPhases.map((phase) => {
          const override = overrides.get(phase.key);
          if (!override) return null;
          const sliderColor = resolveSliderColor(phase.color);
          return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Box8.default, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Box8.default, { sx: sliderRowHeaderSx, children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Typography5.default, { variant: "caption", fontWeight: 600, children: phase.shortTitle ?? phase.title }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Typography5.default, { variant: "caption", color: "text.secondary", children: [
                monthIndexToDate(override.startIdx),
                " \u2013 ",
                monthIndexToDate(override.endIdx)
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              import_Slider.default,
              {
                value: [override.startIdx, override.endIdx],
                min: axis.min,
                max: axis.max,
                step: 1,
                color: sliderColor,
                disableSwap: true,
                size: "small",
                onChange: (_e, v) => handleSliderChange(phase.key, v),
                "aria-label": `Date range for ${phase.shortTitle ?? phase.title}`
              }
            )
          ] }, phase.key);
        }) }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(MiniGanttRuler, { axis, conflictingPhases, overrides }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Divider.default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Box8.default, { sx: actionsRowSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            import_Button.default,
            {
              size: "small",
              variant: "outlined",
              color: "warning",
              disabled: !stillOverlapping,
              onClick: handleMakeSequential,
              children: "Make sequential"
            }
          ),
          pendingApply && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Box8.default, { sx: { display: "flex", gap: 1 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              import_Button.default,
              {
                size: "small",
                variant: "contained",
                color: "success",
                onClick: handleApply,
                "aria-label": "Apply date changes",
                children: "Apply"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              import_Button.default,
              {
                size: "small",
                variant: "outlined",
                onClick: handleCancel,
                "aria-label": "Cancel date changes",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ] }) })
    }
  );
}

// src/components/timeline/two-column/phase-card/phase-card.tsx
var import_Box14 = __toESM(require("@mui/material/Box"), 1);
var import_Paper4 = __toESM(require("@mui/material/Paper"), 1);
var import_Tooltip3 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography10 = __toESM(require("@mui/material/Typography"), 1);

// src/components/timeline/two-column/icons.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var DEFAULT_EXPANDABLE_ICON = /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("g", { fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M8.308 5.148a3.15 3.15 0 0 1-3.154 3.148A3.15 3.15 0 0 1 2 5.148A3.15 3.15 0 0 1 5.154 2a3.15 3.15 0 0 1 3.154 3.148M5.154 6.296a1.15 1.15 0 0 0 1.154-1.148A1.15 1.15 0 0 0 5.154 4A1.15 1.15 0 0 0 4 5.148a1.15 1.15 0 0 0 1.154 1.148M21 18.924a3.15 3.15 0 0 1-3.154 3.147a3.15 3.15 0 0 1-3.154-3.148a3.15 3.15 0 0 1 3.154-3.147c1.732 0 3.154 1.4 3.154 3.148m-3.154 1.147A1.15 1.15 0 0 0 19 18.923c0-.633-.517-1.147-1.154-1.147a1.15 1.15 0 0 0-1.154 1.148a1.15 1.15 0 0 0 1.154 1.147M21 11.462a3.15 3.15 0 0 1-3.154 3.148a3.15 3.15 0 0 1-3.154-3.148a3.15 3.15 0 0 1 3.154-3.148A3.15 3.15 0 0 1 21 11.462m-3.154 1.148A1.15 1.15 0 0 0 19 11.462c0-.634-.517-1.148-1.154-1.148a1.15 1.15 0 0 0-1.154 1.148a1.15 1.15 0 0 0 1.154 1.148" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M5.154 7.018a1 1 0 0 1 1 1v6.784a3.154 3.154 0 0 0 3.13 3.154l5.724.044a1 1 0 0 1-.016 2l-5.724-.044a5.154 5.154 0 0 1-5.114-5.154V8.018a1 1 0 0 1 1-1" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M9.172 12.462a5.02 5.02 0 0 1-5.018-5.018h2a3.02 3.02 0 0 0 3.018 3.018H15a1 1 0 1 1 0 2z" })
    ] }) })
  }
);

// src/components/timeline/two-column/phase-card/utils.ts
function resolveCornerBadgeAlign(columnSide) {
  if (columnSide === "left") {
    return { left: 0, transform: "translate(-50%, -50%)", tooltipPlacement: "top-start" };
  }
  return { right: 0, transform: "translate(50%, -50%)", tooltipPlacement: "top-end" };
}
function resolvePhotoSources(phase) {
  return phase.photos ?? (phase.photo ? [phase.photo] : null);
}
function isHighlightedVariant(variant) {
  return variant === "scenario" || variant === "life-event";
}
function resolveTaskChildren2(phase) {
  if (phase.children?.length) return phase.children;
  if (phase.details?.length) return phase.details.map((title) => ({ title }));
  return [];
}
function buildCardClickHandler(hasDetails, toggle) {
  return () => {
    if (hasDetails) toggle();
  };
}
function buildCardKeyDownHandler(hasDetails, toggle) {
  return (e) => {
    if (hasDetails && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggle();
    }
  };
}
function resolveCardExpansion(onRequestExpand, isExpanded, internalExpanded, setInternalExpanded) {
  if (onRequestExpand === void 0) {
    return { expanded: internalExpanded, toggle: () => setInternalExpanded((v) => !v) };
  }
  return { expanded: isExpanded ?? false, toggle: onRequestExpand };
}
function derivePlatformEntry(p) {
  const isString = typeof p === "string";
  const label = isString ? p : p.label;
  const icon = isString ? null : p.icon;
  return { label, icon, hasTextFallback: isString };
}

// src/components/timeline/two-column/phase-card/platform-strip.tsx
var import_Box9 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip = __toESM(require("@mui/material/Tooltip"), 1);
var import_jsx_runtime13 = require("react/jsx-runtime");
function buildPlatformStripItems(platforms) {
  return platforms.map((p, i) => {
    const { label, icon } = derivePlatformEntry(p);
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Tooltip.default, { title: label, arrow: true, placement: "top", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box9.default, { sx: { display: "flex", alignItems: "center", justifyContent: "center" }, children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box9.default, { component: "span", sx: { fontSize: 11, px: 0.5 }, children: label }) }) }, `platform-${i}`);
  });
}

// src/components/timeline/two-column/animations.ts
var import_react6 = require("@emotion/react");
var pulseRing = import_react6.keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.6); opacity: 0; }
`;
var pulseDot = import_react6.keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;
var checkPop = import_react6.keyframes`
  0%   { transform: scale(0.3); opacity: 0; }
  55%  { transform: scale(1.25); opacity: 1; }
  75%  { transform: scale(0.92); }
  100% { transform: scale(1); opacity: 1; }
`;

// src/components/timeline/two-column/phase-card/phase-card.styles.ts
var labeledIconStripLabelSx = {
  display: "block",
  mb: 1,
  fontSize: "0.75rem",
  color: "text.disabled"
};
var detailBulletsContainerSx = {
  mt: 1.5,
  pt: 1.5,
  borderTop: "1px solid",
  borderColor: "divider",
  display: "flex",
  flexDirection: "column",
  gap: 0.75
};
var tooltipAlertListSx = {
  display: "flex",
  flexDirection: "column",
  gap: 1.25,
  py: 0.5,
  px: 0.25
};
var cornerBadgeCircleSx = (opts) => (theme) => ({
  position: "absolute",
  top: 0,
  ...opts.positionOverride,
  zIndex: 10,
  transform: opts.transform,
  width: opts.badgeSize ?? 26,
  height: opts.badgeSize ?? 26,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: opts.hasError ? "error.main" : "warning.dark",
  color: "common.white",
  boxShadow: `0 2px 6px rgba(${theme.vars.palette.grey["900Channel"]} / 0.3)`,
  cursor: opts.hasClickHandler ? "pointer" : "help",
  pointerEvents: "auto",
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: opts.hasError ? "error.main" : "warning.dark",
    outlineOffset: 2
  }
});
var scenarioBadgeSx = (color) => ({
  display: "inline-block",
  mb: 1,
  px: 1,
  py: 0.25,
  borderRadius: 0.75,
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: 0.8,
  color: `${color}.dark`,
  bgcolor: `rgba(var(--mui-palette-${color}-mainChannel) / 0.12)`
});
var detailCountPillSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  mb: 1,
  px: 0.75,
  py: 0.25,
  borderRadius: 1,
  bgcolor: "action.hover",
  color: "text.secondary"
};
var logoStripSx = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 2.5
};
var clientLogoSx = {
  height: 40,
  width: "auto",
  maxWidth: 140,
  objectFit: "contain",
  opacity: 0.7,
  filter: "grayscale(1)",
  transition: "opacity 0.2s, filter 0.2s",
  "&:hover": { opacity: 1, filter: "none" }
};
var platformStripSx = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 1
};
var projectLogoSx = {
  height: 28,
  width: "auto",
  maxWidth: 100,
  objectFit: "contain",
  opacity: 0.85,
  transition: "opacity 0.2s",
  "&:hover": { opacity: 1 }
};
var eyeButtonSx = (opts) => ({
  position: "absolute",
  bottom: 0,
  ...opts.columnSide === "left" ? { left: 0 } : { right: 0 },
  transform: "translate(0, calc(100% + 8px))",
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: opts.minSize ?? 28,
  minHeight: opts.minSize ?? 28,
  background: "none",
  border: "none",
  cursor: "pointer",
  p: 0,
  color: opts.isViewed ? "success.main" : "text.secondary",
  transition: "color 0.15s",
  "&:hover": { color: opts.isViewed ? "success.dark" : "text.primary" },
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: opts.isViewed ? "success.main" : "primary.main",
    outlineOffset: 2,
    borderRadius: 0.5
  }
});
var photoImgSx = (isFirst) => ({
  mt: isFirst ? 2 : 1,
  width: "100%",
  maxWidth: 200,
  aspectRatio: "4/3",
  objectFit: "cover",
  borderRadius: 1.5,
  border: "2px solid",
  borderColor: "divider",
  display: "block"
});
var phaseCardIconBoxSx = (color, isOverduePending) => (theme) => ({
  top: 16,
  right: 16,
  width: 36,
  height: 36,
  position: "absolute",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // Force the icon SVG to 32 × 32 via CSS instead of cloneElement,
  // so the icon element can remain an RSC-created React element.
  "& svg": { width: 32, height: 32 },
  color: isOverduePending ? theme.vars.palette.error.main : theme.vars.palette[color]?.main ?? theme.vars.palette.primary.main,
  opacity: isOverduePending ? 0.55 : 0.35
});
var taskRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  py: 0.25
};
var taskToggleButtonSx = {
  all: "unset",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  transition: "color 0.2s",
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: "primary.main",
    borderRadius: "50%"
  }
};
var taskIconStaticSx = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  transition: "color 0.2s"
};
var taskTitleSx = (isDone) => ({
  color: isDone ? "text.disabled" : "text.secondary",
  lineHeight: 1.6,
  textDecoration: isDone ? "line-through" : "none",
  transition: "color 0.2s, text-decoration 0.2s"
});
var taskToggleColorSx = (isDone) => ({
  color: isDone ? "success.main" : "text.disabled",
  "&:hover": { color: isDone ? "success.dark" : "text.secondary" }
});
var taskIconColorSx = (isDone) => ({
  color: isDone ? "success.main" : "text.disabled"
});
function buildPaperSx(p) {
  return (theme) => ({
    p: 2.5,
    position: "relative",
    overflow: "hidden",
    textAlign: p.textAlign ?? "left",
    bgcolor: `rgba(${theme.vars.palette.grey["500Channel"]} / 0.08)`,
    transition: p.hasDetails ? "box-shadow 0.2s, opacity 0.3s, filter 0.3s" : "opacity 0.3s, filter 0.3s",
    ...p.hasDetails && {
      cursor: "pointer",
      "&:hover": {
        boxShadow: `0 16px 40px rgba(${theme.vars.palette[p.color ?? "primary"]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.22)`
      },
      "&:focus-visible": {
        outline: "2px solid",
        outlineColor: theme.vars.palette[p.color ?? "primary"]?.main ?? theme.vars.palette.primary.main,
        outlineOffset: 3
      }
    },
    ...p.isDone && {
      opacity: 0.45,
      filter: "grayscale(1)",
      "&:hover": {
        opacity: 1,
        filter: "none",
        ...p.hasDetails && {
          boxShadow: `0 16px 40px rgba(${theme.vars.palette[p.color ?? "primary"]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.22)`
        }
      }
    },
    ...p.phaseSide === "left" && !p.isHighlighted && {
      bgcolor: "background.paper",
      borderTop: "3px solid",
      borderColor: `${p.color ?? "primary"}.main`,
      boxShadow: `0 8px 24px rgba(${theme.vars.palette[p.color ?? "primary"]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.12)`
    },
    ...p.isHighlighted && {
      borderLeft: "4px solid",
      borderColor: `${p.color}.main`,
      bgcolor: `rgba(${theme.vars.palette[p.color]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / ${p.isScenario ? 0.1 : 0.08})`
    },
    ...p.isOverdue && !p.isDone && {
      border: "2px solid",
      borderColor: "error.main",
      boxShadow: `0 0 0 2px rgba(${theme.vars.palette.error.mainChannel} / 0.2), 0 8px 32px rgba(${theme.vars.palette.error.mainChannel} / 0.18)`
    },
    ...p.suppressElevation && { boxShadow: "none" }
  });
}
function buildDateTypographySx({
  isScenario,
  isHighlighted,
  hideDecoration,
  color
}) {
  return {
    display: "block",
    mb: 1.5,
    pr: !isHighlighted && !hideDecoration ? 6 : 0,
    fontSize: isScenario ? "0.875rem" : "0.8rem",
    fontWeight: isScenario ? 800 : void 0,
    letterSpacing: isScenario ? 0 : void 0,
    color: isScenario ? `${color ?? "primary"}.main` : "text.disabled"
  };
}
var buildCardDecorationGradientSx = (color, isOverduePending) => (theme) => ({
  top: -40,
  right: -56,
  width: 140,
  height: 140,
  borderRadius: 4,
  position: "absolute",
  transform: "rotate(40deg)",
  pointerEvents: "none",
  background: `linear-gradient(to right, ${theme.vars.palette[isOverduePending ? "error" : color]?.main ?? theme.vars.palette.primary.main}, transparent)`,
  opacity: isOverduePending ? 0.18 : 0.08
});
var cornerAlertTooltipSx = {
  maxWidth: 320,
  px: 1.75,
  py: 1.25,
  bgcolor: "grey.900",
  "& .MuiTooltip-arrow": { color: "grey.900" }
};
var pillIconBoxSx = (iconSize) => ({
  display: "inline-flex",
  flexShrink: 0,
  "& svg": { width: iconSize, height: iconSize }
});

// src/components/timeline/two-column/phase-card/phase-card.const.ts
var CORNER_ALERT_BADGE_SIZE = 26;
var CORNER_ALERT_ICON_SIZE = 16;
var CORNER_ALERT_LIST_ICON_SIZE = 16;
var PHASE_EYE_ICON_SIZE = 20;
var EYE_BUTTON_MIN_SIZE = 28;
var PHASE_PILL_ICON_SIZE = 16;
var PHASE_PILL_TEXT_FONT_SIZE = "0.75rem";
var PHASE_TASK_ICON_SIZE = 16;

// src/components/timeline/two-column/phase-card/labeled-icon-strip.tsx
var import_Box10 = __toESM(require("@mui/material/Box"), 1);
var import_Typography6 = __toESM(require("@mui/material/Typography"), 1);
var import_jsx_runtime14 = require("react/jsx-runtime");
function LabeledIconStrip({ label, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_Box10.default, { sx: { mt: 2.5 }, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Typography6.default, { variant: "overline", sx: labeledIconStripLabelSx, children: label }),
    children
  ] });
}

// src/components/timeline/two-column/phase-card/card-detail-bullets.tsx
var import_Box11 = __toESM(require("@mui/material/Box"), 1);
var import_Collapse = __toESM(require("@mui/material/Collapse"), 1);
var import_Typography7 = __toESM(require("@mui/material/Typography"), 1);
var import_jsx_runtime15 = require("react/jsx-runtime");
function CardDetailBullets({
  id,
  details,
  in: expanded,
  taskDoneStates,
  onToggleTask
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Collapse.default, { in: expanded, timeout: 50, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Box11.default, { id, sx: detailBulletsContainerSx, children: details.map((task, i) => {
    const isDoneTask = taskDoneStates ? taskDoneStates[i] ?? false : task.done ?? false;
    const toggleLabel = isDoneTask ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`;
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_Box11.default, { sx: taskRowSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        import_Box11.default,
        {
          component: onToggleTask ? "button" : "span",
          "aria-label": onToggleTask ? toggleLabel : void 0,
          "aria-pressed": onToggleTask ? isDoneTask : void 0,
          onClick: onToggleTask ? () => onToggleTask(i, !isDoneTask) : void 0,
          sx: onToggleTask ? [taskToggleButtonSx, taskToggleColorSx(isDoneTask)] : [taskIconStaticSx, taskIconColorSx(isDoneTask)],
          children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            GiselleIcon,
            {
              icon: isDoneTask ? "solar:check-circle-bold" : "solar:record-minimalistic-outline",
              width: PHASE_TASK_ICON_SIZE
            }
          )
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Typography7.default, { variant: "body2", sx: taskTitleSx(isDoneTask), children: task.title })
    ] }, i);
  }) }) });
}

// src/components/timeline/two-column/phase-card/card-corner-alert-badge.tsx
var import_Box12 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip2 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography8 = __toESM(require("@mui/material/Typography"), 1);
var import_jsx_runtime16 = require("react/jsx-runtime");
function CardCornerAlertBadge({
  alerts,
  columnSide = "right",
  onClick,
  innerRef
}) {
  if (alerts.length === 0) return null;
  const hasError = alerts.some((a) => a.severity === "error");
  const { left, right, transform, tooltipPlacement } = resolveCornerBadgeAlign(columnSide);
  const tooltipContent = /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_Box12.default, { sx: tooltipAlertListSx, children: alerts.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_Box12.default, { sx: { display: "flex", alignItems: "flex-start", gap: 1 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      GiselleIcon,
      {
        icon: "solar:danger-triangle-bold",
        width: CORNER_ALERT_LIST_ICON_SIZE,
        "aria-hidden": true,
        style: { flexShrink: 0, marginTop: 2 }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      import_Typography8.default,
      {
        variant: "body2",
        sx: { lineHeight: 1.55, fontSize: "0.8rem", fontWeight: 500 },
        children: a.message
      }
    )
  ] }, i)) });
  const badgeCircle = /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_Box12.default,
    {
      ref: innerRef,
      role: onClick ? "button" : void 0,
      "aria-label": `${alerts.length} issue${alerts.length === 1 ? "" : "s"}`,
      tabIndex: 0,
      onClick,
      onKeyDown: onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : void 0,
      sx: cornerBadgeCircleSx({
        positionOverride: left === void 0 ? { right } : { left },
        transform,
        hasError,
        hasClickHandler: !!onClick,
        badgeSize: CORNER_ALERT_BADGE_SIZE
      }),
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(GiselleIcon, { icon: "solar:danger-triangle-bold", width: CORNER_ALERT_ICON_SIZE, "aria-hidden": true })
    }
  );
  if (onClick) return badgeCircle;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_Tooltip2.default,
    {
      title: tooltipContent,
      placement: tooltipPlacement,
      arrow: true,
      slotProps: { tooltip: { sx: cornerAlertTooltipSx } },
      children: badgeCircle
    }
  );
}

// src/components/timeline/two-column/phase-card/scenario-badge.tsx
var import_Typography9 = __toESM(require("@mui/material/Typography"), 1);
var import_jsx_runtime17 = require("react/jsx-runtime");
function ScenarioBadge({ color, scenarioLabel }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_Typography9.default, { variant: "overline", sx: scenarioBadgeSx(color), children: scenarioLabel });
}

// src/components/timeline/two-column/phase-card/card-status-badge.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function CardStatusBadge({ color, isScenario, scenarioLabel }) {
  if (!isScenario || !scenarioLabel) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ScenarioBadge, { color, scenarioLabel });
}

// src/components/timeline/two-column/phase-card/card-decoration.tsx
var import_Box13 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime19 = require("react/jsx-runtime");
function CardDecoration({ color, isOverduePending, icon }) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_jsx_runtime19.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_Box13.default, { "aria-hidden": true, sx: buildCardDecorationGradientSx(color, isOverduePending) }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_Box13.default, { "aria-hidden": "true", sx: phaseCardIconBoxSx(color, isOverduePending), children: icon })
  ] });
}

// src/components/timeline/two-column/phase-card/phase-card.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
function PhaseCard({
  phase,
  done,
  overdue,
  dateConflict = false,
  dateConflictLabel,
  isExpanded,
  onRequestExpand,
  suppressElevation = false,
  expandableIcon,
  isViewed = false,
  onMarkViewed,
  columnSide = "right",
  onPhasesChange,
  allPhases,
  taskDoneStates,
  onToggleTask,
  sx,
  ...other
}) {
  const badgeRef = (0, import_react7.useRef)(null);
  const [popoverOpen, setPopoverOpen] = (0, import_react7.useState)(false);
  const handleOpenPopover = (0, import_react7.useCallback)(() => setPopoverOpen(true), []);
  const handleClosePopover = (0, import_react7.useCallback)(() => setPopoverOpen(false), []);
  const popoverMode = Boolean(onPhasesChange && allPhases);
  const isDone = done ?? phase.done ?? false;
  const isOverdue = overdue ?? phase.overdue ?? false;
  const [internalExpanded, setInternalExpanded] = (0, import_react7.useState)(false);
  const [isHovered, setIsHovered] = (0, import_react7.useState)(false);
  const handleMouseEnter = (0, import_react7.useCallback)(() => setIsHovered(true), []);
  const handleMouseLeave = (0, import_react7.useCallback)(() => setIsHovered(false), []);
  const taskChildren = resolveTaskChildren2(phase);
  const hasDetails = taskChildren.length > 0;
  const isScenario = phase.variant === "scenario";
  const isHighlighted = isHighlightedVariant(phase.variant);
  const detailsId = `timeline-details-${String(phase.key).replace(".", "-")}`;
  const { expanded, toggle } = resolveCardExpansion(
    onRequestExpand,
    isExpanded,
    internalExpanded,
    setInternalExpanded
  );
  const displayTitle = expanded || isHovered ? phase.title : phase.shortTitle ?? phase.title;
  const handleClick = buildCardClickHandler(hasDetails, toggle);
  const handleKeyDown = buildCardKeyDownHandler(hasDetails, toggle);
  const cornerAlerts = [];
  if (isOverdue && !isDone) {
    cornerAlerts.push({ message: "Overdue \u2014 past due date", severity: "error" });
  }
  if (dateConflict) {
    cornerAlerts.push({
      message: dateConflictLabel ?? "Date overlap with another phase",
      severity: "warning"
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_Box14.default, { sx: [{ position: "relative" }, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      CardCornerAlertBadge,
      {
        alerts: cornerAlerts,
        columnSide,
        onClick: popoverMode ? handleOpenPopover : void 0,
        innerRef: popoverMode ? badgeRef : void 0
      }
    ),
    popoverMode && onPhasesChange && allPhases && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      PhaseWarningPopover,
      {
        open: popoverOpen,
        anchorEl: badgeRef.current,
        onClose: handleClosePopover,
        currentPhase: phase,
        allPhases,
        onPhasesChange
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
      import_Paper4.default,
      {
        role: hasDetails ? "button" : void 0,
        tabIndex: hasDetails ? 0 : void 0,
        "aria-expanded": hasDetails ? expanded : void 0,
        "aria-controls": hasDetails ? detailsId : void 0,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        sx: [
          buildPaperSx({
            hasDetails,
            isDone,
            color: phase.color ?? "primary",
            phaseSide: phase.side,
            isHighlighted,
            isScenario,
            isOverdue,
            suppressElevation,
            textAlign: phase.textAlign
          })
        ],
        children: [
          !isHighlighted && !phase.hideDecoration && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            CardDecoration,
            {
              color: phase.color ?? "primary",
              isOverduePending: isOverdue && !isDone,
              icon: phase.icon
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            CardStatusBadge,
            {
              color: phase.color ?? "primary",
              isScenario,
              scenarioLabel: phase.scenarioLabel
            }
          ),
          !phase.hideDate && phase.date && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            import_Typography10.default,
            {
              variant: "subtitle2",
              sx: buildDateTypographySx({
                isScenario,
                isHighlighted,
                hideDecoration: phase.hideDecoration,
                color: phase.color
              }),
              children: phase.date
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box14.default, { sx: { display: "flex", alignItems: "flex-start", gap: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_Box14.default, { sx: { flex: 1 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              import_Typography10.default,
              {
                variant: isScenario ? "h6" : "subtitle1",
                sx: { mb: hasDetails ? 0.5 : 1, pr: !isHighlighted && !phase.hideDecoration ? 6 : 0 },
                children: displayTitle
              }
            ),
            hasDetails && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
              import_Box14.default,
              {
                sx: detailCountPillSx,
                "aria-label": `${taskChildren.length} expandable detail${taskChildren.length === 1 ? "" : "s"}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box14.default, { component: "span", sx: pillIconBoxSx(PHASE_PILL_ICON_SIZE), children: expandableIcon ?? DEFAULT_EXPANDABLE_ICON }),
                  /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
                    import_Typography10.default,
                    {
                      component: "span",
                      variant: "caption",
                      sx: { fontWeight: 600, lineHeight: 1, fontSize: PHASE_PILL_TEXT_FONT_SIZE },
                      children: taskChildren.length
                    }
                  )
                ]
              }
            ),
            expanded && phase.description && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Typography10.default, { variant: "body2", sx: { color: "text.secondary", mt: 0.5 }, children: phase.description }),
            expanded && resolvePhotoSources(phase)?.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box14.default, { component: "img", src: p.src, alt: p.alt, sx: photoImgSx(i === 0) }, i)),
            expanded && phase.clients && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(LabeledIconStrip, { label: phase.clientsLabel, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box14.default, { sx: logoStripSx, children: phase.clients.map(({ name, logo }) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Tooltip3.default, { title: name, arrow: true, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box14.default, { component: "img", src: logo, alt: name, sx: clientLogoSx }) }, name)) }) }),
            expanded && phase.platforms && phase.platforms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(LabeledIconStrip, { label: phase.platformsLabel ?? "Tech Stack", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box14.default, { sx: platformStripSx, children: buildPlatformStripItems(phase.platforms) }) }),
            expanded && phase.projects && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(LabeledIconStrip, { label: phase.projectsLabel, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box14.default, { sx: logoStripSx, children: phase.projects.map(({ name, logo }) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box14.default, { component: "img", src: logo, alt: name, sx: projectLogoSx }, name)) }) }),
            expanded && phase.footer != null && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box14.default, { sx: { mt: 1 }, onClick: (e) => e.stopPropagation(), children: phase.footer })
          ] }) }),
          hasDetails && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            CardDetailBullets,
            {
              id: detailsId,
              details: taskChildren,
              in: expanded,
              taskDoneStates,
              onToggleTask
            }
          )
        ]
      }
    ),
    onMarkViewed && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      import_Tooltip3.default,
      {
        title: isViewed ? "Mark as not viewed" : "Mark as viewed",
        placement: columnSide === "left" ? "right" : "left",
        arrow: true,
        children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          import_Box14.default,
          {
            component: "button",
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onMarkViewed();
            },
            "aria-label": isViewed ? "Mark as not viewed" : "Mark as viewed",
            "aria-pressed": isViewed,
            sx: eyeButtonSx({ columnSide, isViewed, minSize: EYE_BUTTON_MIN_SIZE }),
            children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              GiselleIcon,
              {
                icon: isViewed ? "solar:eye-bold" : "solar:eye-outline",
                width: PHASE_EYE_ICON_SIZE,
                "aria-hidden": true
              }
            )
          }
        )
      }
    )
  ] });
}

// src/components/timeline/two-column/timeline-dot/timeline-dot.tsx
var import_Box16 = __toESM(require("@mui/material/Box"), 1);

// src/components/timeline/two-column/timeline-dot/timeline-dot.styles.ts
var doneCheckmarkSx = (iconSize) => ({
  width: iconSize,
  height: iconSize,
  flexShrink: 0,
  animation: `${checkPop} 0.36s cubic-bezier(0.34, 1.56, 0.64, 1)`
});
var timelineDotInnerSx = (done, dotBg, effectiveColor, isMilestone, hasClickHandler) => (theme) => ({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // All done dots: solid success-green fill with white icon (effectiveColor is already 'success').
  bgcolor: !done && dotBg ? dotBg : theme.vars.palette[effectiveColor]?.main ?? theme.vars.palette.primary.main,
  color: theme.vars.palette.common.white,
  // Milestone: white separator border + colored drop shadow.
  // boxSizing ensures padding + border are included in the 100%/100% dimensions
  // so the circle never exceeds the outer 34px container regardless of box model reset.
  ...isMilestone && {
    boxSizing: "border-box",
    padding: "2px",
    border: "2px solid",
    borderColor: "background.paper",
    boxShadow: `0 2px 8px rgba(${theme.vars.palette[effectiveColor]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.5)`
  },
  ...hasClickHandler && isMilestone && {
    "&:hover": {
      boxShadow: `0 6px 20px rgba(${theme.vars.palette[effectiveColor]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.6)`
    }
  }
});
var pulseRingAfterSx = (effectiveColor) => ({
  "&::after": {
    content: '""',
    position: "absolute",
    inset: "-5px",
    borderRadius: "50%",
    border: "2px solid",
    borderColor: `${effectiveColor}.main`,
    animation: `${pulseRing} 1.5s ease-in-out infinite`
  }
});

// src/components/timeline/two-column/timeline-dot/utils.ts
function resolveEffectiveColor(color, done) {
  return done ? "success" : color;
}
function getDotSize(isMilestone) {
  return isMilestone ? 34 : 42;
}
function getIconSize(isMilestone) {
  return isMilestone ? 17 : 23;
}
function normaliseSx(sx) {
  if (!sx) return [];
  return Array.isArray(sx) ? sx : [sx];
}

// src/components/timeline/two-column/timeline-dot/dot-inner.tsx
var import_Box15 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime21 = require("react/jsx-runtime");
function DotInner({ done, icon, animationKey, iconSize }) {
  if (done) {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      import_Box15.default,
      {
        component: "svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        sx: doneCheckmarkSx(iconSize),
        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("polyline", { points: "20 6 9 17 4 12" })
      },
      animationKey
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    import_Box15.default,
    {
      sx: {
        display: "flex",
        animation: animationKey > 0 ? `${checkPop} 0.36s cubic-bezier(0.34, 1.56, 0.64, 1)` : void 0
      },
      children: icon
    },
    animationKey
  );
}

// src/components/timeline/two-column/timeline-dot/timeline-dot.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
function TimelineDot({
  icon,
  color = "primary",
  size = "phase",
  active = false,
  done = false,
  animationKey = 0,
  dotBg,
  onClick,
  onKeyDown,
  role,
  "aria-checked": ariaChecked,
  "aria-label": ariaLabel,
  tabIndex,
  className,
  sx,
  ...other
}) {
  const isMilestone = size === "milestone";
  const dotSize = getDotSize(isMilestone);
  const iconSize = getIconSize(isMilestone);
  const effectiveColor = resolveEffectiveColor(color, done);
  return (
    // Outer Box: controls size, position context, pulsing ::after ring, interaction.
    // overflow: visible is mandatory — the ring extends 5 px outside via inset: -5
    // and would be clipped by overflow: hidden.
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      import_Box16.default,
      {
        className,
        role,
        "aria-checked": ariaChecked,
        "aria-label": ariaLabel,
        tabIndex,
        onClick,
        onKeyDown,
        "data-active": active && !isMilestone ? "true" : void 0,
        ...other,
        sx: [
          (theme) => ({
            position: "relative",
            width: dotSize,
            height: dotSize,
            flexShrink: 0,
            overflow: "visible",
            ...onClick && {
              cursor: "pointer",
              transition: "opacity 0.2s",
              "&:hover": { opacity: 0.75 }
            },
            ...tabIndex !== void 0 && {
              "&:focus-visible": {
                outline: "none",
                boxShadow: `0 0 0 3px ${theme.vars.palette[effectiveColor]?.main ?? theme.vars.palette.primary.main}`
              }
            }
          }),
          // Pulsing halo — phase dots only, active state, not done.
          ...active && !isMilestone && !done ? [pulseRingAfterSx(effectiveColor)] : [],
          ...normaliseSx(sx)
        ],
        children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_Box16.default, { sx: timelineDotInnerSx(done, dotBg, effectiveColor, isMilestone, !!onClick), children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(DotInner, { done, icon, animationKey, iconSize }) })
      }
    )
  );
}

// src/components/timeline/two-column/two-column.tsx
var import_react13 = require("react");
var import_Box27 = __toESM(require("@mui/material/Box"), 1);
var import_Timeline = __toESM(require("@mui/lab/Timeline"), 1);

// src/components/timeline/use-timeline-done-state.ts
var import_react8 = require("react");
function buildPhaseDoneRecord(phases) {
  return Object.fromEntries(phases.map((p) => [String(p.key), p.done ?? false]));
}
function buildMilestoneDoneRecord(phases, sortFn) {
  const m = {};
  phases.forEach((p) => {
    const sorted = p.milestones ? sortFn([...p.milestones]) : [];
    sorted.forEach((ms, i) => {
      m[`${p.key}-${i}`] = ms.done ?? false;
    });
  });
  return m;
}
function buildTaskDoneRecord(phases, sortFn) {
  const t = {};
  phases.forEach((p) => {
    resolveTaskChildren(p).forEach((task, ti) => {
      t[`${p.key}-t${ti}`] = task.done ?? false;
    });
    const sorted = p.milestones ? sortFn([...p.milestones]) : [];
    sorted.forEach((ms, mi) => {
      resolveTaskChildren(ms).forEach((task, ti) => {
        t[`${p.key}-m${mi}-t${ti}`] = task.done ?? false;
      });
    });
  });
  return t;
}
function useTimelineDoneState(phases, sortOrder) {
  const sortFn = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
  const [localPhaseDone, setLocalPhaseDone] = (0, import_react8.useState)(
    () => buildPhaseDoneRecord(phases)
  );
  const [localMilestoneDone, setLocalMilestoneDone] = (0, import_react8.useState)(
    () => buildMilestoneDoneRecord(phases, sortFn)
  );
  const [localTaskDoneMap, setLocalTaskDoneMap] = (0, import_react8.useState)(
    () => buildTaskDoneRecord(phases, sortFn)
  );
  (0, import_react8.useEffect)(() => {
    const fn = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
    setLocalPhaseDone(buildPhaseDoneRecord(phases));
    setLocalMilestoneDone(buildMilestoneDoneRecord(phases, fn));
    setLocalTaskDoneMap(buildTaskDoneRecord(phases, fn));
  }, [phases, sortOrder]);
  return {
    localPhaseDone,
    setLocalPhaseDone,
    localMilestoneDone,
    setLocalMilestoneDone,
    localTaskDoneMap,
    setLocalTaskDoneMap
  };
}

// src/components/timeline/compact/compact.tsx
var import_react11 = require("react");
var import_Box19 = __toESM(require("@mui/material/Box"), 1);

// src/components/timeline/compact/compact.const.ts
var COMPACT_PHASE_DOT_SIZE = 32;
var COMPACT_MILESTONE_DOT_SIZE = 24;
var COMPACT_PHASE_ICON_SIZE = 18;
var COMPACT_MILESTONE_ICON_SIZE = 14;
var COMPACT_MIN_PHASE_DOT_SIZE = 18;
var COMPACT_MIN_MILESTONE_DOT_SIZE = 18;

// src/components/timeline/compact/compact.styles.ts
var accordionDetailsSx = {
  pt: 0,
  pb: 2,
  px: 2
};
var phaseTitleSx = {
  flexGrow: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};
var dateSx = {
  color: "text.secondary",
  flexShrink: 0,
  ml: 0.5
};
var descriptionSx = {
  color: "text.secondary",
  mb: 1.5
};
var milestonesListSx = {
  m: 0,
  p: 0,
  mt: 1,
  listStyle: "none"
};
var milestoneItemSx = {
  display: "flex",
  alignItems: "flex-start",
  gap: 1.5,
  cursor: "pointer",
  "&:hover": {
    bgcolor: channelAlpha("var(--mui-palette-grey-500Channel)", 0.06),
    borderRadius: 1
  },
  transition: "background-color 150ms",
  py: 1,
  px: 0.5
};
var milestoneDotColumnSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexShrink: 0,
  width: COMPACT_MILESTONE_DOT_SIZE
};
var milestoneContentSx = {
  flexGrow: 1,
  overflow: "hidden",
  pb: 0.5
};
var milestoneTitleSx = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};
var milestoneDescriptionPreviewSx = {
  color: "text.secondary",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  mt: 0.25
};
var milestoneDateSx = {
  color: "text.secondary",
  flexShrink: 0,
  mt: 0.25
};
var phaseDotSx = (color) => (theme) => ({
  width: COMPACT_PHASE_DOT_SIZE,
  height: COMPACT_PHASE_DOT_SIZE,
  borderRadius: "50%",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  bgcolor: theme.vars?.palette[color].main ?? theme.palette[color].main,
  color: "common.white"
});
var milestoneDotSx = (color) => (theme) => ({
  width: COMPACT_MILESTONE_DOT_SIZE,
  height: COMPACT_MILESTONE_DOT_SIZE,
  borderRadius: "50%",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  bgcolor: theme.vars?.palette[color].main ?? theme.palette[color].main,
  color: "common.white"
});
var milestoneConnectorLineSx = {
  width: 2,
  flexGrow: 1,
  minHeight: 16,
  bgcolor: "divider",
  mt: 0.5
};
var accordionRootSx = (done) => ({
  border: "none",
  borderRadius: 2,
  boxShadow: "none",
  "&:before": { display: "none" },
  "&.Mui-expanded": {
    margin: 0,
    bgcolor: channelAlpha("var(--mui-palette-grey-500Channel)", 0.08)
  },
  "&:hover": {
    bgcolor: channelAlpha("var(--mui-palette-grey-500Channel)", 0.08)
  },
  opacity: done ? 0.65 : 1,
  transition: "opacity 300ms, background-color 300ms"
});

// src/components/timeline/compact/phase-accordion-row.tsx
var import_react10 = require("react");
var import_Box18 = __toESM(require("@mui/material/Box"), 1);
var import_SvgIcon2 = __toESM(require("@mui/material/SvgIcon"), 1);
var import_Typography13 = __toESM(require("@mui/material/Typography"), 1);

// src/utils/use-nested-checklist.ts
var import_react9 = require("react");
function useNestedChecklist(initialParentDone, initialChildrenDone) {
  const [parentDone, setParentDone] = (0, import_react9.useState)(initialParentDone);
  const [childrenDone, setChildrenDone] = (0, import_react9.useState)(initialChildrenDone);
  const indeterminate = (0, import_react9.useMemo)(
    () => childrenDone.some(Boolean) && !childrenDone.every(Boolean),
    [childrenDone]
  );
  const toggleParent = (0, import_react9.useCallback)(() => {
    const next = !parentDone;
    setParentDone(next);
    setChildrenDone((prev) => prev.map(() => next));
  }, [parentDone]);
  const toggleChild = (0, import_react9.useCallback)((index) => {
    setChildrenDone((prev) => {
      const next = prev.map((v, i) => i === index ? !v : v);
      setParentDone(next.every(Boolean));
      return next;
    });
  }, []);
  return { parentDone, indeterminate, childrenDone, toggleParent, toggleChild };
}

// src/components/timeline/task-list/task-list.tsx
var import_Checkbox2 = __toESM(require("@mui/material/Checkbox"), 1);
var import_Box17 = __toESM(require("@mui/material/Box"), 1);
var import_Typography11 = __toESM(require("@mui/material/Typography"), 1);

// src/components/timeline/task-list/task-list.styles.ts
var taskListBaseSx = {
  mt: 0,
  mb: 1.5,
  pl: 2,
  color: "text.secondary",
  listStyle: "none"
};
var taskListMilestoneSx = {
  mt: 0,
  mb: 1.5,
  pl: 3,
  color: "text.secondary",
  listStyle: "none"
};
var taskItemSx = {
  display: "flex",
  alignItems: "center",
  mb: 0.25
};
var taskCheckboxSx = {
  p: 0.5,
  mr: 0.5
};
var taskCaptionSx = (isDone) => () => ({
  color: "text.secondary",
  textDecoration: isDone ? "line-through" : "none"
});

// src/components/timeline/task-list/task-list.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
function TaskList({
  tasks,
  checklist = false,
  taskDoneState,
  onTaskToggle,
  indent = "phase",
  sx,
  ...other
}) {
  const listSx = indent === "milestone" ? taskListMilestoneSx : taskListBaseSx;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_Box17.default, { component: "ul", sx: [listSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: tasks.map((task, i) => {
    const isDone = taskDoneState?.[i] ?? task.done ?? false;
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_Box17.default, { component: "li", sx: taskItemSx, children: [
      checklist && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        import_Checkbox2.default,
        {
          size: "small",
          checked: isDone,
          onChange: () => onTaskToggle?.(i),
          sx: taskCheckboxSx,
          inputProps: { "aria-label": task.title }
        }
      ),
      !checklist && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        import_Typography11.default,
        {
          component: "span",
          variant: "body2",
          sx: { color: "text.disabled", mr: 0.75, flexShrink: 0 },
          children: "\u203A"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_Typography11.default, { variant: "body2", sx: taskCaptionSx(isDone), children: task.title })
    ] }, i);
  }) });
}

// src/components/timeline/compact/chevron-down-icon.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
function ChevronDownIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      focusable: "false",
      children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" })
    }
  );
}

// src/components/timeline/compact/milestone-modal.tsx
var import_Dialog = __toESM(require("@mui/material/Dialog"), 1);
var import_DialogContent = __toESM(require("@mui/material/DialogContent"), 1);
var import_DialogTitle = __toESM(require("@mui/material/DialogTitle"), 1);
var import_Divider2 = __toESM(require("@mui/material/Divider"), 1);
var import_IconButton3 = __toESM(require("@mui/material/IconButton"), 1);
var import_Typography12 = __toESM(require("@mui/material/Typography"), 1);
var import_useMediaQuery = __toESM(require("@mui/material/useMediaQuery"), 1);

// src/components/timeline/compact/milestone-modal.styles.ts
var dialogTitleSx = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1,
  pr: 1
};

// src/components/timeline/compact/utils.ts
function resolveCompactColor(color, done) {
  if (done) return "success";
  if (!color || color === "inherit" || color === "grey") return "primary";
  return color;
}

// src/components/timeline/compact/milestone-modal.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
function MilestoneModal({
  milestone,
  open,
  onClose,
  checklist = false,
  taskDoneState,
  onTaskToggle
}) {
  const fullScreen = (0, import_useMediaQuery.default)("(max-width:599.95px)");
  if (!milestone) return null;
  const tasks = resolveTaskChildren(milestone);
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
    import_Dialog.default,
    {
      open,
      onClose,
      fullWidth: true,
      maxWidth: "sm",
      fullScreen,
      scroll: "paper",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_DialogTitle.default, { sx: dialogTitleSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_Typography12.default, { variant: "h6", component: "span", children: milestone.title }),
            milestone.date && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              import_Typography12.default,
              {
                variant: "caption",
                display: "block",
                sx: { color: "text.secondary", mt: 0.25 },
                children: milestone.date
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
            import_IconButton3.default,
            {
              "aria-label": "close milestone details",
              onClick: onClose,
              edge: "end",
              size: "small",
              sx: { mt: 0.5, flexShrink: 0 },
              children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_Divider2.default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_DialogContent.default, { sx: { pt: 2 }, children: [
          milestone.description && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
            import_Typography12.default,
            {
              variant: "body2",
              sx: { color: "text.secondary", mb: tasks.length > 0 ? 2 : 0 },
              children: milestone.description
            }
          ),
          tasks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
            TaskList,
            {
              tasks,
              checklist,
              taskDoneState,
              onTaskToggle,
              indent: "milestone"
            }
          ),
          !milestone.description && tasks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_Typography12.default, { variant: "body2", sx: { color: "text.disabled" }, children: "No additional details." })
        ] })
      ]
    }
  );
}

// src/components/timeline/compact/phase-accordion-row.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
var CHECK_DONE_DOT = /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Box18.default, { sx: phaseDotSx("success"), "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
  "svg",
  {
    width: COMPACT_PHASE_ICON_SIZE,
    height: COMPACT_PHASE_ICON_SIZE,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" })
  }
) });
var CHECK_HOVER_DOT = /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_SvgIcon2.default, { sx: { color: "success.main", fontSize: COMPACT_PHASE_DOT_SIZE }, viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });
var MS_CHECK_DONE_DOT = /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
  import_Box18.default,
  {
    sx: phaseDotSx("success"),
    style: { width: COMPACT_MILESTONE_DOT_SIZE, height: COMPACT_MILESTONE_DOT_SIZE, flexShrink: 0 },
    "aria-hidden": "true",
    children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      "svg",
      {
        width: COMPACT_MILESTONE_ICON_SIZE,
        height: COMPACT_MILESTONE_ICON_SIZE,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
        children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" })
      }
    )
  }
);
var MS_CHECK_HOVER_DOT = /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_SvgIcon2.default, { sx: { color: "success.main", fontSize: COMPACT_MILESTONE_DOT_SIZE }, viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });
var accordionSummaryOverrideSx = {
  "& .MuiAccordionSummary-root": { minHeight: 56 },
  "& .MuiAccordionSummary-root.Mui-expanded": { minHeight: 56 },
  "& .MuiAccordionSummary-content": { display: "flex", alignItems: "center", gap: 1.5 },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "text.secondary",
    display: "flex",
    alignItems: "center",
    alignSelf: "center"
  }
};
function PhaseAccordionRow({
  phase,
  sortedMilestones,
  checklist,
  taskDoneMap,
  onTaskToggle,
  onMarkViewed,
  onTogglePhaseDone,
  onToggleMilestoneDone,
  expandedPhaseKey,
  onToggleExpanded
}) {
  const { parentDone, indeterminate, childrenDone, toggleParent, toggleChild } = useNestedChecklist(
    phase.done ?? false,
    sortedMilestones.map((ms) => ms.done ?? false)
  );
  const [modalMilestone, setModalMilestone] = (0, import_react10.useState)(null);
  const effectiveColor = resolveCompactColor(phase.color, parentDone);
  const taskChildren = resolveTaskChildren(phase);
  const hasDetails = Boolean(phase.description) || taskChildren.length > 0 || sortedMilestones.length > 0;
  const handleToggleParent = (0, import_react10.useCallback)(() => {
    toggleParent();
    onTogglePhaseDone?.(phase.key, !parentDone);
  }, [toggleParent, onTogglePhaseDone, phase.key, parentDone]);
  const handleAccordionChange = (0, import_react10.useCallback)(
    (_e, expanded) => {
      onToggleExpanded(phase.key);
      if (expanded) onMarkViewed?.(`phase-${phase.key}`);
    },
    [onMarkViewed, onToggleExpanded, phase.key]
  );
  const phaseDot = /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Box18.default, { sx: phaseDotSx(effectiveColor), "aria-hidden": "true", children: phase.icon });
  const titleContent = /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Typography13.default, { variant: "subtitle2", sx: phaseTitleSx, children: phase.shortTitle ?? phase.title });
  const dateLabel = phase.date ? /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Typography13.default, { variant: "caption", sx: dateSx, children: phase.date }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_jsx_runtime26.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      Accordion,
      {
        disableGutters: true,
        elevation: 0,
        checklist,
        checkIcon: checklist ? phaseDot : void 0,
        checkDoneIcon: checklist ? CHECK_DONE_DOT : void 0,
        checkHoverIcon: checklist ? CHECK_HOVER_DOT : void 0,
        leadingAction: !checklist ? phaseDot : void 0,
        done: parentDone,
        indeterminate,
        onDoneButtonClick: handleToggleParent,
        trailingContent: dateLabel,
        expandIcon: hasDetails ? /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(ChevronDownIcon, {}) : null,
        title: titleContent,
        expanded: expandedPhaseKey === phase.key,
        onChange: handleAccordionChange,
        sx: [accordionRootSx(parentDone), accordionSummaryOverrideSx],
        children: hasDetails && /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_Box18.default, { sx: accordionDetailsSx, children: [
          phase.description && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Typography13.default, { variant: "body2", sx: descriptionSx, children: phase.description }),
          taskChildren.length > 0 && sortedMilestones.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
            TaskList,
            {
              tasks: taskChildren,
              checklist,
              taskDoneState: taskChildren.map(
                (task, i) => taskDoneMap[`${phase.key}-t${i}`] ?? task.done ?? false
              ),
              onTaskToggle: (i) => onTaskToggle(phase.key, null, i)
            }
          ),
          sortedMilestones.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Box18.default, { component: "ul", sx: milestonesListSx, children: sortedMilestones.map((ms, idx) => {
            const isMsDone = childrenDone[idx] ?? false;
            const idleDotColor = resolveCompactColor(ms.color, false);
            const isLast = idx === sortedMilestones.length - 1;
            const msDotIdle = /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Box18.default, { sx: milestoneDotSx(idleDotColor), "aria-hidden": "true", children: ms.icon });
            return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
              import_Box18.default,
              {
                component: "li",
                sx: milestoneItemSx,
                onClick: () => setModalMilestone({ ms, idx }),
                role: "button",
                tabIndex: 0,
                "aria-label": `View details: ${ms.title}`,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setModalMilestone({ ms, idx });
                  }
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_Box18.default, { sx: milestoneDotColumnSx, children: [
                    checklist ? /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
                      CheckIconButton,
                      {
                        done: isMsDone,
                        checkIcon: msDotIdle,
                        checkDoneIcon: MS_CHECK_DONE_DOT,
                        checkHoverIcon: MS_CHECK_HOVER_DOT,
                        onDoneButtonClick: (newDone) => {
                          toggleChild(idx);
                          onToggleMilestoneDone?.(phase.key, idx, newDone);
                        }
                      }
                    ) : msDotIdle,
                    !isLast && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Box18.default, { "aria-hidden": "true", sx: milestoneConnectorLineSx })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_Box18.default, { sx: milestoneContentSx, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Typography13.default, { variant: "subtitle2", sx: milestoneTitleSx, children: ms.shortTitle ?? ms.title }),
                    ms.description && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Typography13.default, { variant: "body2", sx: milestoneDescriptionPreviewSx, children: ms.description })
                  ] }),
                  ms.date && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Typography13.default, { variant: "caption", sx: milestoneDateSx, children: ms.date })
                ]
              },
              `${phase.key}-ms-${idx}`
            );
          }) })
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      MilestoneModal,
      {
        milestone: modalMilestone?.ms ?? null,
        open: modalMilestone !== null,
        onClose: () => setModalMilestone(null),
        checklist,
        taskDoneState: modalMilestone ? resolveTaskChildren(modalMilestone.ms).map(
          (t, i) => taskDoneMap[`${phase.key}-m${modalMilestone.idx}-t${i}`] ?? t.done ?? false
        ) : void 0,
        onTaskToggle: modalMilestone ? (i) => onTaskToggle(phase.key, modalMilestone.idx, i) : void 0
      }
    )
  ] });
}

// src/components/timeline/compact/compact.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
function TimelineCompact({
  phases,
  checklist = false,
  sortOrder = "desc",
  viewedKeys: _viewedKeys,
  onMarkViewed,
  onTogglePhaseDone,
  onToggleMilestoneDone,
  onToggleTaskDone,
  sx,
  ...other
}) {
  const sortMilestones = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
  const sorted = (0, import_react11.useMemo)(() => sortPhasesByDate(phases, sortOrder), [phases, sortOrder]);
  const { localTaskDoneMap, setLocalTaskDoneMap } = useTimelineDoneState(phases, sortOrder);
  const handleTaskToggle = (0, import_react11.useCallback)(
    (phaseKey, milestoneIdx, taskIdx) => {
      const k = milestoneIdx === null ? `${phaseKey}-t${taskIdx}` : `${phaseKey}-m${milestoneIdx}-t${taskIdx}`;
      const next = !(localTaskDoneMap[k] ?? false);
      setLocalTaskDoneMap((prev) => ({ ...prev, [k]: next }));
      onToggleTaskDone?.(phaseKey, milestoneIdx, taskIdx, next);
    },
    [localTaskDoneMap, onToggleTaskDone, setLocalTaskDoneMap]
  );
  const [expandedPhaseKey, setExpandedPhaseKey] = (0, import_react11.useState)(null);
  const handleToggleExpanded = (0, import_react11.useCallback)((key) => {
    setExpandedPhaseKey((prev) => prev === key ? null : key);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_Box19.default, { sx: [accordionRootSx(false), ...Array.isArray(sx) ? sx : [sx]], ...other, children: sorted.map((phase) => {
    const sortedMilestones = phase.milestones ? sortMilestones([...phase.milestones]) : [];
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
      PhaseAccordionRow,
      {
        phase,
        sortedMilestones,
        checklist,
        taskDoneMap: localTaskDoneMap,
        onTaskToggle: handleTaskToggle,
        onMarkViewed,
        onTogglePhaseDone,
        onToggleMilestoneDone,
        expandedPhaseKey,
        onToggleExpanded: handleToggleExpanded
      },
      phase.key
    );
  }) });
}

// src/components/timeline/two-column/milestone-row.tsx
var import_Box21 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip5 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography15 = __toESM(require("@mui/material/Typography"), 1);

// src/components/timeline/two-column/milestone-badge/milestone-badge.tsx
var import_react12 = require("react");
var import_Box20 = __toESM(require("@mui/material/Box"), 1);
var import_Paper5 = __toESM(require("@mui/material/Paper"), 1);
var import_Collapse2 = __toESM(require("@mui/material/Collapse"), 1);
var import_Tooltip4 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography14 = __toESM(require("@mui/material/Typography"), 1);

// src/components/timeline/two-column/milestone-badge/milestone-badge.styles.ts
var pillIconBoxSx2 = (iconSize) => ({
  display: "inline-flex",
  flexShrink: 0,
  "& svg": { width: iconSize, height: iconSize }
});
var milestoneNewBadgeRowSx = (rightAlign) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  mb: 0.5,
  justifyContent: rightAlign ? "flex-end" : void 0
});
var milestoneNewDotSx = {
  width: 12,
  height: 12,
  borderRadius: "50%",
  bgcolor: "success.main",
  flexShrink: 0
};
var milestoneNewLabelSx = {
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "success.main",
  lineHeight: 1
};
var milestoneDateSx2 = (fontSize = "0.875rem") => ({
  color: "text.secondary",
  fontSize,
  display: "block",
  mb: 0.5
});
var milestoneTitleRowSx = (rightAlign) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  justifyContent: rightAlign ? "flex-end" : "flex-start"
});
var milestoneEyeButtonSx = (opts) => ({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: opts.minSize ?? 28,
  minHeight: opts.minSize ?? 28,
  background: "none",
  border: "none",
  cursor: "pointer",
  p: 0,
  color: opts.isViewed ? "success.main" : "text.secondary",
  transition: "color 0.15s",
  "&:hover": { color: opts.isViewed ? "success.dark" : "text.primary" },
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: opts.isViewed ? "success.main" : "primary.main",
    outlineOffset: 2,
    borderRadius: 0.5
  }
});
var milestoneDetailPillSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  mt: 0.5,
  mb: 0.25,
  px: 0.625,
  py: 0.2,
  borderRadius: 0.75,
  bgcolor: "action.hover",
  color: "text.secondary"
};
var milestoneDetailListSx = {
  mt: 1.5,
  pt: 1.5,
  borderTop: "1px solid",
  borderColor: "divider",
  display: "flex",
  flexDirection: "column",
  gap: 0.75
};
var taskRowSx2 = {
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  py: 0.25
};
var taskToggleButtonSx2 = {
  all: "unset",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  transition: "color 0.2s",
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: "primary.main",
    borderRadius: "50%"
  }
};
var taskIconStaticSx2 = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  transition: "color 0.2s"
};
var taskTitleSx2 = (isDone) => ({
  color: isDone ? "text.disabled" : "text.secondary",
  lineHeight: 1.6,
  textDecoration: isDone ? "line-through" : "none",
  transition: "color 0.2s, text-decoration 0.2s"
});
var taskToggleColorSx2 = (isDone) => ({
  color: isDone ? "success.main" : "text.disabled",
  "&:hover": { color: isDone ? "success.dark" : "text.secondary" }
});
var taskIconColorSx2 = (isDone) => ({
  color: isDone ? "success.main" : "text.disabled"
});
var milestonePaperSx = (opts) => (theme) => ({
  p: 2,
  overflow: "hidden",
  borderTop: "3px solid",
  borderTopColor: opts.isExpanded ? theme.vars.palette[opts.colorKey]?.main ?? theme.vars.palette.primary.main : "transparent",
  bgcolor: opts.isExpanded ? "background.paper" : "transparent",
  boxShadow: opts.isExpanded ? `0 4px 16px rgba(${theme.vars.palette[opts.colorKey]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.1)` : "none",
  transition: "box-shadow 0.22s, opacity 0.3s, filter 0.3s, background-color 0.22s, border-color 0.22s",
  ...opts.rightAlign && { textAlign: "right" },
  ...opts.done && {
    opacity: 0.45,
    filter: "grayscale(1)",
    pointerEvents: "auto"
  },
  ...!opts.isExpanded && {
    "&:hover": {
      bgcolor: "background.paper",
      borderTopColor: theme.vars.palette[opts.colorKey]?.main ?? theme.vars.palette.primary.main,
      boxShadow: `0 16px 40px rgba(${theme.vars.palette[opts.colorKey]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.22)`,
      ...opts.hasDetails && { cursor: "pointer" },
      ...opts.done && { opacity: 1, filter: "none" }
    }
  },
  ...opts.hasDetails && !opts.isExpanded && {
    "&:focus-visible": {
      bgcolor: "background.paper",
      borderTopColor: theme.vars.palette[opts.colorKey]?.main ?? theme.vars.palette.primary.main,
      outline: "2px solid",
      outlineColor: theme.vars.palette[opts.colorKey]?.main ?? theme.vars.palette.primary.main,
      outlineOffset: 3
    }
  },
  ...opts.suppressElevation && { boxShadow: "none" }
});

// src/components/timeline/two-column/milestone-badge/milestone-badge.const.ts
var MILESTONE_DATE_FONT_SIZE = "0.875rem";
var MILESTONE_PILL_ICON_SIZE = 16;
var MILESTONE_PILL_TEXT_FONT_SIZE = "0.75rem";
var MILESTONE_EYE_ICON_SIZE = 20;
var MILESTONE_EYE_BUTTON_MIN_SIZE = 28;
var MILESTONE_TASK_ICON_SIZE = 16;

// src/components/timeline/two-column/milestone-badge/milestone-badge.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
function MilestoneBadge({
  milestone: m,
  done = false,
  isExpanded,
  onRequestExpand,
  suppressElevation = false,
  expandableIcon,
  stableId,
  isViewed = false,
  onMarkViewed,
  columnSide = "right",
  taskDoneStates,
  onToggleTask,
  sx,
  ...other
}) {
  const rightAlign = columnSide === "left" && !isExpanded;
  const taskChildren = m.children?.length ? m.children : m.details?.map((title) => ({ title })) ?? [];
  const hasDetails = taskChildren.length > 0;
  const colorKey = m.color ?? "primary";
  const titleSlug = String(m.title).replace(/[^a-z0-9]/gi, "-").toLowerCase();
  const detailsId = stableId ? `ms-details-${stableId}` : `ms-details-${titleSlug}`;
  const [isHovered, setIsHovered] = (0, import_react12.useState)(false);
  const handleMouseEnter = (0, import_react12.useCallback)(() => setIsHovered(true), []);
  const handleMouseLeave = (0, import_react12.useCallback)(() => setIsHovered(false), []);
  const displayTitle = isExpanded || isHovered ? m.title : m.shortTitle ?? m.title;
  const handleClick = (0, import_react12.useCallback)(() => {
    if (hasDetails) onRequestExpand();
  }, [hasDetails, onRequestExpand]);
  const handleKeyDown = (0, import_react12.useCallback)(
    (e) => {
      if (hasDetails && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onRequestExpand();
      }
    },
    [hasDetails, onRequestExpand]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
    import_Paper5.default,
    {
      ...other,
      role: hasDetails ? "button" : void 0,
      tabIndex: hasDetails ? 0 : void 0,
      "aria-expanded": hasDetails ? isExpanded : void 0,
      "aria-controls": hasDetails ? detailsId : void 0,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      sx: [
        milestonePaperSx({ isExpanded, colorKey, rightAlign, done, hasDetails, suppressElevation }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      children: [
        m.new && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_Box20.default, { sx: milestoneNewBadgeRowSx(rightAlign), children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Box20.default, { sx: milestoneNewDotSx }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Typography14.default, { variant: "caption", sx: milestoneNewLabelSx, children: "New" })
        ] }),
        m.date && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Typography14.default, { variant: "caption", sx: milestoneDateSx2(MILESTONE_DATE_FONT_SIZE), children: m.date }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_Box20.default, { sx: milestoneTitleRowSx(rightAlign), children: [
          onMarkViewed && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
            import_Tooltip4.default,
            {
              title: isViewed ? "Mark as not viewed" : "Mark as viewed",
              placement: rightAlign ? "right" : "left",
              arrow: true,
              children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                import_Box20.default,
                {
                  component: "button",
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    onMarkViewed();
                  },
                  "aria-label": isViewed ? "Mark as not viewed" : "Mark as viewed",
                  "aria-pressed": isViewed,
                  sx: milestoneEyeButtonSx({
                    isViewed: !!isViewed,
                    minSize: MILESTONE_EYE_BUTTON_MIN_SIZE
                  }),
                  children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                    GiselleIcon,
                    {
                      icon: isViewed ? "solar:eye-bold" : "solar:eye-outline",
                      width: MILESTONE_EYE_ICON_SIZE,
                      "aria-hidden": true
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Typography14.default, { variant: "subtitle2", sx: { fontWeight: 700, lineHeight: 1.3 }, children: displayTitle })
        ] }),
        (isExpanded || isHovered) && m.description && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Typography14.default, { variant: "body2", sx: { color: "text.secondary", mt: 0.5 }, children: m.description }),
        hasDetails && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
          import_Box20.default,
          {
            sx: milestoneDetailPillSx,
            "aria-label": `${taskChildren.length} expandable detail${taskChildren.length === 1 ? "" : "s"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Box20.default, { component: "span", sx: pillIconBoxSx2(MILESTONE_PILL_ICON_SIZE), children: expandableIcon ?? DEFAULT_EXPANDABLE_ICON }),
              /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                import_Typography14.default,
                {
                  component: "span",
                  variant: "caption",
                  sx: { fontWeight: 600, lineHeight: 1, fontSize: MILESTONE_PILL_TEXT_FONT_SIZE },
                  children: taskChildren.length
                }
              )
            ]
          }
        ),
        hasDetails && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Collapse2.default, { in: isExpanded, timeout: 50, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Box20.default, { id: detailsId, sx: milestoneDetailListSx, children: taskChildren.map((task, i) => {
          const isDoneTask = taskDoneStates ? taskDoneStates[i] ?? false : task.done ?? false;
          const toggleLabel = isDoneTask ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`;
          return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_Box20.default, { sx: taskRowSx2, children: [
            /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
              import_Box20.default,
              {
                component: onToggleTask ? "button" : "span",
                "aria-label": onToggleTask ? toggleLabel : void 0,
                "aria-pressed": onToggleTask ? isDoneTask : void 0,
                onClick: onToggleTask ? () => onToggleTask(i, !isDoneTask) : void 0,
                sx: onToggleTask ? [taskToggleButtonSx2, taskToggleColorSx2(isDoneTask)] : [taskIconStaticSx2, taskIconColorSx2(isDoneTask)],
                children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                  GiselleIcon,
                  {
                    icon: isDoneTask ? "solar:check-circle-bold" : "solar:record-minimalistic-outline",
                    width: MILESTONE_TASK_ICON_SIZE
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Typography14.default, { variant: "body2", sx: taskTitleSx2(isDoneTask), children: task.title })
          ] }, i);
        }) }) })
      ]
    }
  );
}

// src/components/timeline/two-column/two-column.styles.ts
var timelineColumnSx = (columnSide, _hasContent, bottomPadding) => ({
  flex: 1,
  minWidth: 0,
  textAlign: columnSide === "left" ? "right" : "left",
  pr: columnSide === "left" ? 2 : 0,
  pl: columnSide === "right" ? 2 : 0,
  pt: 0.75,
  paddingBottom: `${bottomPadding}px`,
  // xs: left column hidden (all cards move to right slot on mobile).
  // md: BOTH columns always in layout — keeps the centre spine centred.
  display: {
    xs: columnSide === "left" ? "none" : "block",
    md: "block"
  }
});
var msRowSx = (topPercent) => ({
  position: "absolute",
  top: `${topPercent}%`,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start"
});
var msColumnBoxSx = (columnSide, _visible) => ({
  flex: 1,
  minWidth: 0,
  position: "relative",
  overflow: "visible",
  display: {
    xs: columnSide === "right" ? "block" : "none",
    md: "block"
  }
});
var msDotWrapperSx = (blurred) => ({
  position: "relative",
  display: "inline-flex",
  transition: "filter 0.2s ease, opacity 0.2s ease, transform 0.2s ease",
  ...blurred && {
    filter: "blur(1.5px)",
    opacity: 0.38,
    transform: "scale(0.97)",
    pointerEvents: "none"
  }
});
var floatingDatePillSx = {
  position: "absolute",
  bottom: "calc(100% + 4px)",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "0.875rem",
  fontWeight: 800,
  color: "common.white",
  bgcolor: "grey.700",
  px: 0.75,
  py: 0.125,
  borderRadius: 0.75,
  whiteSpace: "nowrap",
  pointerEvents: "none",
  zIndex: 2,
  display: "none"
};
var markerPhaseLiSx = {
  position: "relative",
  overflow: "visible",
  display: "flex",
  flexDirection: "column",
  zIndex: 1,
  minHeight: 40
};
var markerLabelSlotSx = (side) => ({
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  // xs: left slot hidden — label shifts to the right slot on mobile.
  // Right slot is always visible.
  display: side === "left" ? { xs: "none", md: "flex" } : "flex",
  justifyContent: side === "left" ? "flex-end" : "flex-start",
  alignItems: "center",
  pr: side === "left" ? 1.5 : 0,
  pl: side === "right" ? 1.5 : 0
});
var markerCenterSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexShrink: 0,
  position: "relative"
};
var markerRowInnerSx = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
};
var markerCaptionSx = {
  color: "text.secondary",
  fontWeight: 600,
  whiteSpace: "nowrap"
};
var markerDateSpanSx = {
  ml: 0.75,
  fontWeight: 400,
  opacity: 0.7
};
var phaseRowSx = (blurred) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  minWidth: 0,
  transition: "filter 0.2s ease, opacity 0.2s ease, transform 0.2s ease",
  ...blurred && {
    filter: "blur(1.5px)",
    opacity: 0.38,
    transform: "scale(0.97)",
    pointerEvents: "none"
  },
  flex: 1
});
var phaseLiSx = (opts) => ({
  position: "relative",
  overflow: "visible",
  display: "flex",
  flexDirection: "column",
  zIndex: opts.zIndex,
  // CSS :has() raises this <li> when any milestone card within it is hovered,
  // preventing the next <li>'s phase card from painting over the hovered card.
  // Supported: Chrome 121+, Firefox 121+, Safari 17+ (within browser support matrix).
  "&:has([data-ms-card]:hover)": { zIndex: 3 },
  ...opts.computedMinHeight !== void 0 && { minHeight: opts.computedMinHeight }
});
var msCardWrapperSx = (isExpanded, suppressElevation, side) => (theme) => ({
  position: "absolute",
  zIndex: isExpanded ? 1e3 : 1,
  transition: "filter 0.2s ease, opacity 0.2s ease, transform 0.2s ease",
  // Raise hovered card above adjacent phase cards so it is never overlapped.
  "&:hover": { zIndex: 999 },
  // translateY(-50%) centres the card vertically on its dot.
  transform: "translateY(-50%)",
  ...suppressElevation && {
    filter: "blur(1.5px)",
    opacity: 0.38,
    transform: "scale(0.97) translateY(-50%)",
    pointerEvents: "none"
  },
  top: "15px",
  left: side === "right" ? theme.spacing(2) : 0,
  right: side === "left" ? theme.spacing(2) : 0
});
var centerColumnSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexShrink: 0
};
var timelineRootSx = {
  p: 0,
  m: 0,
  overflowX: "hidden",
  "& .MuiTimelineItem-root:before": { flex: 0, padding: 0 }
};
var phaseDotWrapperSx = {
  position: "relative",
  display: "inline-flex"
};

// src/components/timeline/two-column/milestone-row.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
function MilestoneRow({ ms, mi, totalMilestones, ctx }) {
  const { msDone, msColor } = resolveMilestoneState(
    ms,
    mi,
    ctx.phaseKey,
    ctx.dotColor,
    ctx.checklist,
    ctx.localMilestoneDone
  );
  const { msDotClickAction, msDotKeyDown, msDotAriaLabel } = resolveMilestoneDotHandlers(
    ms,
    mi,
    ctx.phaseKey,
    msDone,
    ctx.checklist,
    ctx.handleToggleMilestone
  );
  const effectiveMsSide = ms.side ?? ctx.phaseSide;
  const isThisMsExpanded = ctx.expandedMiIdx === mi;
  const PHASE_CARD_RESERVE_SLOTS = 2;
  const topPercent = (PHASE_CARD_RESERVE_SLOTS + mi + 1) / (PHASE_CARD_RESERVE_SLOTS + totalMilestones + 1) * 100;
  const stopProp = (e) => e.stopPropagation();
  const suppressElevation = ctx.anyExpanded && !isThisMsExpanded;
  const dotChecklistProps = ctx.checklist ? {
    role: "checkbox",
    "aria-checked": msDone,
    "aria-label": msDotAriaLabel,
    tabIndex: 0
  } : {};
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_Box21.default, { sx: msRowSx(topPercent), children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Box21.default, { "data-col": "left", sx: msColumnBoxSx("left", effectiveMsSide === "left"), children: effectiveMsSide === "left" && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      import_Box21.default,
      {
        "data-ms-card": "true",
        ref: (el) => ctx.onMeasure(mi, el),
        onClick: stopProp,
        sx: msCardWrapperSx(isThisMsExpanded, suppressElevation, "left"),
        children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          MilestoneBadge,
          {
            milestone: ms,
            done: msDone,
            isExpanded: isThisMsExpanded,
            suppressElevation,
            stableId: `${ctx.phaseKey}-${mi}`,
            expandableIcon: ctx.expandableIcon,
            columnSide: "left",
            isViewed: ctx.viewedKeys.has(`ms-${ctx.phaseKey}-${mi}`),
            onMarkViewed: ctx.onMarkViewed ? () => ctx.onMarkViewed(`ms-${ctx.phaseKey}-${mi}`) : void 0,
            taskDoneStates: ms.children?.map(
              (task, ti) => ctx.localTaskDoneMap[`${ctx.phaseKey}-m${mi}-t${ti}`] ?? task.done ?? false
            ),
            onToggleTask: (taskIdx, _done) => ctx.handleToggleTask(ctx.phaseKey, mi, taskIdx),
            onRequestExpand: () => ctx.handleExpandMilestone(ctx.phaseKey, mi)
          }
        )
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Box21.default, { "data-col": "center", sx: centerColumnSx, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_Box21.default, { sx: msDotWrapperSx(suppressElevation), children: [
      ms.date && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Typography15.default, { variant: "caption", "aria-hidden": true, sx: floatingDatePillSx, children: ms.date }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
        import_Tooltip5.default,
        {
          title: resolveMilestoneTooltip(ctx.checklist, msColor, msDone, ms),
          placement: "top",
          arrow: true,
          children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
            TimelineDot,
            {
              icon: ms.icon,
              color: msColor,
              dotBg: ms.dotBg,
              size: "milestone",
              done: msDone,
              onClick: msDotClickAction,
              onKeyDown: msDotKeyDown,
              ...dotChecklistProps
            }
          ) })
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Box21.default, { "data-col": "right", sx: msColumnBoxSx("right", effectiveMsSide === "right"), children: effectiveMsSide === "right" && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      import_Box21.default,
      {
        "data-ms-card": "true",
        ref: (el) => ctx.onMeasure(mi, el),
        onClick: stopProp,
        sx: msCardWrapperSx(isThisMsExpanded, suppressElevation, "right"),
        children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          MilestoneBadge,
          {
            milestone: ms,
            done: msDone,
            isExpanded: isThisMsExpanded,
            suppressElevation,
            stableId: `${ctx.phaseKey}-${mi}`,
            expandableIcon: ctx.expandableIcon,
            isViewed: ctx.viewedKeys.has(`ms-${ctx.phaseKey}-${mi}`),
            onMarkViewed: ctx.onMarkViewed ? () => ctx.onMarkViewed(`ms-${ctx.phaseKey}-${mi}`) : void 0,
            taskDoneStates: ms.children?.map(
              (task, ti) => ctx.localTaskDoneMap[`${ctx.phaseKey}-m${mi}-t${ti}`] ?? task.done ?? false
            ),
            onToggleTask: (taskIdx, _done) => ctx.handleToggleTask(ctx.phaseKey, mi, taskIdx),
            onRequestExpand: () => ctx.handleExpandMilestone(ctx.phaseKey, mi)
          }
        )
      }
    ) })
  ] });
}

// src/components/timeline/two-column/marker-row.tsx
var import_Box24 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip6 = __toESM(require("@mui/material/Tooltip"), 1);

// src/components/timeline/two-column/marker-label.tsx
var import_Box22 = __toESM(require("@mui/material/Box"), 1);
var import_Typography16 = __toESM(require("@mui/material/Typography"), 1);
var import_jsx_runtime30 = require("react/jsx-runtime");
function MarkerLabel({ title, date }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_Typography16.default, { variant: "caption", sx: markerCaptionSx, children: [
    title,
    date && /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_Box22.default, { component: "span", sx: markerDateSpanSx, children: [
      "\xB7 ",
      date
    ] })
  ] });
}

// src/components/timeline/two-column/spine-connector/spine-connector.tsx
var import_Box23 = __toESM(require("@mui/material/Box"), 1);
var import_Typography17 = __toESM(require("@mui/material/Typography"), 1);

// src/components/timeline/two-column/spine-connector/spine-connector.styles.ts
var yearLabelSx = (marginBottom) => ({
  position: "absolute",
  bottom: `${marginBottom}px`,
  left: "50%",
  transform: "translateX(-50%)",
  whiteSpace: "nowrap",
  px: 1,
  py: 0.25,
  lineHeight: 1.6,
  borderRadius: 1,
  fontSize: "0.75rem",
  fontWeight: 800,
  letterSpacing: 0.5,
  bgcolor: "background.paper",
  color: "text.primary",
  border: "1px solid",
  borderColor: "divider",
  boxShadow: 1,
  zIndex: 1
});

// src/components/timeline/two-column/spine-connector/spine-connector.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
function SpineConnector({
  dotColor,
  yearMilestone,
  yearLabelMarginBottom = 50,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    import_Box23.default,
    {
      ...other,
      sx: [
        (theme) => ({
          display: "flex",
          flexGrow: 1,
          minHeight: 24,
          width: 2,
          position: "relative",
          bgcolor: `rgba(${theme.vars.palette[dotColor]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.3)`
        }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      children: yearMilestone && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_Typography17.default, { variant: "caption", sx: yearLabelSx(yearLabelMarginBottom), children: yearMilestone })
    }
  );
}

// src/components/timeline/two-column/marker-row.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
function MarkerRow({
  phase,
  isLastPhase,
  dotColor,
  isDone,
  checklist,
  yearLabelValue,
  isMobile,
  ...other
}) {
  const markerTooltip = resolvePhaseTooltip(checklist, dotColor, isDone, phase);
  const shouldShowRightLabel = phase.side !== "left" || isMobile;
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_Box24.default, { component: "li", "data-testid": "tl-item", sx: markerPhaseLiSx, ...other, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_Box24.default, { sx: markerRowInnerSx, children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_Box24.default, { sx: markerLabelSlotSx("left"), children: phase.side === "left" && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(MarkerLabel, { title: phase.shortTitle ?? phase.title, date: phase.date }) }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_Box24.default, { "data-col": "center", sx: markerCenterSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_Tooltip6.default, { title: markerTooltip, placement: "top", arrow: true, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(TimelineDot, { icon: phase.icon, color: dotColor, size: "milestone", done: isDone }) }) }),
      !isLastPhase && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(SpineConnector, { dotColor, yearMilestone: yearLabelValue })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_Box24.default, { sx: markerLabelSlotSx("right"), children: shouldShowRightLabel && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(MarkerLabel, { title: phase.shortTitle ?? phase.title, date: phase.date }) })
  ] }) });
}

// src/components/timeline/two-column/phase-row.tsx
var import_Box26 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip7 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography18 = __toESM(require("@mui/material/Typography"), 1);

// src/components/timeline/two-column/timeline-column.tsx
var import_Box25 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime33 = require("react/jsx-runtime");
function TimelineColumn({
  columnSide,
  hasContent,
  children,
  bottomPadding
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_Box25.default, { "data-col": columnSide, sx: timelineColumnSx(columnSide, hasContent, bottomPadding), children });
}

// src/components/timeline/two-column/phase-row.tsx
var import_jsx_runtime34 = require("react/jsx-runtime");
function PhaseRow({
  phase,
  isSuppressed,
  phaseCardGap,
  phaseCardNode,
  dotColor,
  isDone,
  isLastPhase,
  yearLabelValue,
  yearLabelMarginBottom,
  checklist,
  dotClickAction,
  dotKeyDownHandler,
  dotAriaLabel,
  phaseToggleCounts,
  selectedPhaseKey,
  isMobile
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_Box26.default, { sx: phaseRowSx(isSuppressed), children: [
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
      TimelineColumn,
      {
        columnSide: "left",
        hasContent: phase.side === "left",
        bottomPadding: phaseCardGap,
        children: !isMobile && phase.side === "left" && phaseCardNode
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_Box26.default, { "data-col": "center", sx: centerColumnSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_Box26.default, { sx: phaseDotWrapperSx, children: [
        !phase.hideDate && phase.date && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_Typography18.default, { variant: "caption", "aria-hidden": true, sx: floatingDatePillSx, children: phase.date }),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          import_Tooltip7.default,
          {
            title: resolvePhaseTooltip(checklist, dotColor, isDone, phase),
            placement: "top",
            arrow: true,
            children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
              TimelineDot,
              {
                icon: phase.icon,
                color: dotColor,
                size: "phase",
                ...buildPhaseDotTsxProps(
                  phase,
                  checklist,
                  isDone,
                  dotAriaLabel,
                  phaseToggleCounts,
                  selectedPhaseKey
                ),
                onClick: dotClickAction,
                onKeyDown: dotKeyDownHandler
              }
            ) })
          }
        )
      ] }),
      !isLastPhase && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
        SpineConnector,
        {
          dotColor,
          yearMilestone: yearLabelValue,
          yearLabelMarginBottom
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
      TimelineColumn,
      {
        columnSide: "right",
        hasContent: phase.side === "right",
        bottomPadding: phaseCardGap,
        children: (phase.side === "right" || isMobile) && phaseCardNode
      }
    )
  ] });
}

// src/components/timeline/two-column/two-column.tsx
var import_jsx_runtime35 = require("react/jsx-runtime");
var useIsomorphicLayoutEffect = globalThis.window === void 0 ? import_react13.useEffect : import_react13.useLayoutEffect;
var EMPTY_VIEWED_KEYS = /* @__PURE__ */ new Set();
function TimelineTwoColumn({
  phases,
  checklist = false,
  onTogglePhaseDone,
  onToggleMilestoneDone,
  onToggleTaskDone,
  selectedPhaseKey,
  onPhaseSelect,
  expandableIcon,
  viewedKeys,
  onMarkViewed,
  onPhasesChange,
  sortOrder = "desc",
  milestoneSlotHeight = 60,
  phaseCardGap = 90,
  yearLabelMarginBottom = 50,
  sx,
  ...other
}) {
  const {
    localPhaseDone,
    setLocalPhaseDone,
    localMilestoneDone,
    setLocalMilestoneDone,
    localTaskDoneMap,
    setLocalTaskDoneMap
  } = useTimelineDoneState(phases, sortOrder);
  const [phaseToggleCounts, setPhaseToggleCounts] = (0, import_react13.useState)({});
  const [expandedMilestoneMap, setExpandedMilestoneMap] = (0, import_react13.useState)(
    {}
  );
  const [expandedPhaseKey, setExpandedPhaseKey] = (0, import_react13.useState)(null);
  const handleExpandMilestone = (0, import_react13.useCallback)((phaseKey, milestoneIndex) => {
    const k = String(phaseKey);
    setExpandedPhaseKey(null);
    setExpandedMilestoneMap((prev) => ({
      ...prev,
      [k]: prev[k] === milestoneIndex ? null : milestoneIndex
    }));
  }, []);
  const handleExpandPhaseCard = (0, import_react13.useCallback)((phaseKey) => {
    setExpandedMilestoneMap({});
    setExpandedPhaseKey((prev) => prev === phaseKey ? null : phaseKey);
  }, []);
  const stopCardPropagation = (0, import_react13.useCallback)((e) => e.stopPropagation(), []);
  const handleTogglePhase = (0, import_react13.useCallback)(
    (key) => {
      setPhaseToggleCounts((prev) => ({ ...prev, [String(key)]: (prev[String(key)] ?? 0) + 1 }));
      const next = !localPhaseDone[String(key)];
      setLocalPhaseDone((prev) => ({ ...prev, [String(key)]: next }));
      onTogglePhaseDone?.(key, next);
    },
    [localPhaseDone, onTogglePhaseDone, setLocalPhaseDone, setPhaseToggleCounts]
  );
  const handleToggleMilestone = (0, import_react13.useCallback)(
    (phaseKey, milestoneIndex) => {
      const k = `${phaseKey}-${milestoneIndex}`;
      const next = !localMilestoneDone[k];
      const updated = { ...localMilestoneDone, [k]: next };
      setLocalMilestoneDone(updated);
      onToggleMilestoneDone?.(phaseKey, milestoneIndex, next);
      const phase = phases.find((p) => p.key === phaseKey);
      if (phase?.milestones?.length) {
        const allDone = phase.milestones.every((_, i) => updated[`${phaseKey}-${i}`] ?? false);
        const currentPhaseDone = localPhaseDone[String(phaseKey)] ?? false;
        if (allDone !== currentPhaseDone) {
          setPhaseToggleCounts((prev) => ({
            ...prev,
            [String(phaseKey)]: (prev[String(phaseKey)] ?? 0) + 1
          }));
          setLocalPhaseDone((prev) => ({ ...prev, [String(phaseKey)]: allDone }));
          onTogglePhaseDone?.(phaseKey, allDone);
        }
      }
    },
    [
      localMilestoneDone,
      phases,
      localPhaseDone,
      onToggleMilestoneDone,
      onTogglePhaseDone,
      setLocalMilestoneDone,
      setLocalPhaseDone,
      setPhaseToggleCounts
    ]
  );
  const handleToggleTask = (0, import_react13.useCallback)(
    (phaseKey, milestoneIdx, taskIdx) => {
      const k = milestoneIdx !== null ? `${phaseKey}-m${milestoneIdx}-t${taskIdx}` : `${phaseKey}-t${taskIdx}`;
      const next = !(localTaskDoneMap[k] ?? false);
      const updated = { ...localTaskDoneMap, [k]: next };
      setLocalTaskDoneMap(updated);
      onToggleTaskDone?.(phaseKey, milestoneIdx, taskIdx, next);
      if (milestoneIdx !== null && checklist) {
        const phase = phases.find((p) => p.key === phaseKey);
        const ms = phase?.milestones?.[milestoneIdx];
        if (ms?.children?.length) {
          const allTasksDone = ms.children.every(
            (_, ti) => updated[`${phaseKey}-m${milestoneIdx}-t${ti}`] ?? false
          );
          const currentMsDone = localMilestoneDone[`${phaseKey}-${milestoneIdx}`] ?? false;
          if (allTasksDone !== currentMsDone) {
            const msUpdated = {
              ...localMilestoneDone,
              [`${phaseKey}-${milestoneIdx}`]: allTasksDone
            };
            setLocalMilestoneDone(msUpdated);
            onToggleMilestoneDone?.(phaseKey, milestoneIdx, allTasksDone);
            if (phase?.milestones?.length) {
              const allMsDone = phase.milestones.every(
                (_, i) => msUpdated[`${phaseKey}-${i}`] ?? false
              );
              const currentPhaseDone = localPhaseDone[String(phaseKey)] ?? false;
              if (allMsDone !== currentPhaseDone) {
                setPhaseToggleCounts((prev) => ({
                  ...prev,
                  [String(phaseKey)]: (prev[String(phaseKey)] ?? 0) + 1
                }));
                setLocalPhaseDone((prev) => ({ ...prev, [String(phaseKey)]: allMsDone }));
                onTogglePhaseDone?.(phaseKey, allMsDone);
              }
            }
          }
        }
      }
    },
    [
      localTaskDoneMap,
      setLocalTaskDoneMap,
      onToggleTaskDone,
      checklist,
      phases,
      localMilestoneDone,
      setLocalMilestoneDone,
      onToggleMilestoneDone,
      localPhaseDone,
      setLocalPhaseDone,
      onTogglePhaseDone
    ]
  );
  const today = (0, import_react13.useMemo)(() => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const sortMilestones = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
  const sorted = (0, import_react13.useMemo)(
    () => sortPhasesByDate(phases, sortOrder).map((phase) => ({
      ...phase,
      milestones: phase.milestones ? sortMilestones(phase.milestones) : phase.milestones
    })),
    [phases, sortOrder, sortMilestones]
  );
  const overlappingKeys = (0, import_react13.useMemo)(() => detectPhaseOverlaps(phases), [phases]);
  const lastKey = sorted.at(-1)?.key;
  const anyExpanded = (0, import_react13.useMemo)(
    () => expandedPhaseKey !== null || Object.values(expandedMilestoneMap).some((v) => v !== null),
    [expandedPhaseKey, expandedMilestoneMap]
  );
  (0, import_react13.useEffect)(() => {
    if (!anyExpanded) return void 0;
    const handler = () => {
      setExpandedMilestoneMap({});
      setExpandedPhaseKey(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [anyExpanded]);
  const msHeightMapRef = (0, import_react13.useRef)({});
  const [msSlotHeights, setMsSlotHeights] = (0, import_react13.useState)({});
  useIsomorphicLayoutEffect(() => {
    const result = computeSlotHeights(sorted, msHeightMapRef.current);
    setMsSlotHeights((prev) => {
      const prevKeys = Object.keys(prev);
      const resultKeys = Object.keys(result);
      const changed = prevKeys.length !== resultKeys.length || resultKeys.some((k) => result[k] !== prev[k]);
      return changed ? result : prev;
    });
  }, [sorted]);
  const effectiveViewedKeys = viewedKeys ?? EMPTY_VIEWED_KEYS;
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_jsx_runtime35.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_Box27.default, { sx: { display: { xs: "block", md: "none" } }, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
      TimelineCompact,
      {
        phases,
        sx,
        checklist,
        sortOrder,
        viewedKeys,
        onMarkViewed,
        onTogglePhaseDone,
        onToggleMilestoneDone,
        onToggleTaskDone,
        ...other
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
      import_Box27.default,
      {
        sx: [
          { display: { xs: "none", md: "block" }, position: "relative" },
          ...Array.isArray(sx) ? sx : [sx]
        ],
        ...other,
        children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_Timeline.default, { sx: timelineRootSx, children: sorted.map((phase, i) => {
          const { isDone, isOverdue, dotColor, yearLabelValue, phaseMilestones, isLastPhase } = resolvePhaseState(phase, i, sorted, lastKey, checklist, localPhaseDone, today);
          if (phase.variant === "marker") {
            return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
              MarkerRow,
              {
                phase,
                isLastPhase,
                dotColor,
                isDone,
                checklist,
                yearLabelValue,
                isMobile: false
              },
              phase.key
            );
          }
          const { dotClickAction, dotKeyDownHandler, dotAriaLabel } = resolvePhaseDotHandlers(
            phase,
            isDone,
            checklist,
            handleTogglePhase,
            onPhaseSelect
          );
          const expandedMiIdx = expandedMilestoneMap[String(phase.key)] ?? null;
          const isThisPhaseExpanded = expandedPhaseKey === phase.key;
          const phaseViewKey = `phase-${phase.key}`;
          const phaseCardNode = /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { onClick: stopCardPropagation, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            PhaseCard,
            {
              phase,
              columnSide: phase.side,
              ...buildPhaseCardTsxProps(
                checklist,
                isDone,
                isOverdue,
                overlappingKeys.has(phase.key),
                overlappingKeys.get(phase.key),
                anyExpanded,
                isThisPhaseExpanded,
                expandableIcon
              ),
              isViewed: effectiveViewedKeys.has(phaseViewKey),
              onMarkViewed: onMarkViewed ? () => onMarkViewed(phaseViewKey) : void 0,
              onPhasesChange,
              allPhases: onPhasesChange ? phases : void 0,
              isExpanded: isThisPhaseExpanded,
              onRequestExpand: () => handleExpandPhaseCard(phase.key),
              taskDoneStates: phase.children?.map(
                (task, ti) => localTaskDoneMap[`${phase.key}-t${ti}`] ?? task.done ?? false
              ),
              onToggleTask: (taskIdx, _done) => handleToggleTask(phase.key, null, taskIdx)
            }
          ) });
          const milestoneCtx = {
            phaseKey: phase.key,
            phaseSide: phase.side,
            checklist,
            localMilestoneDone,
            localTaskDoneMap,
            expandedMiIdx,
            anyExpanded,
            dotColor,
            expandableIcon,
            viewedKeys: effectiveViewedKeys,
            onMarkViewed,
            handleToggleMilestone,
            handleToggleTask,
            handleExpandMilestone,
            onMeasure: (mi, el) => {
              if (el) {
                const h = el.offsetHeight;
                if (h > 0) {
                  msHeightMapRef.current[`${String(phase.key)}-${mi}`] = h;
                }
              }
            }
          };
          const rows = [];
          const PHASE_CARD_RESERVE_SLOTS = 2;
          const phaseMinHeight = phaseMilestones.length > 0 ? (PHASE_CARD_RESERVE_SLOTS + phaseMilestones.length + 1) * (yearLabelValue !== null ? Math.max(
            msSlotHeights[String(phase.key)] ?? milestoneSlotHeight,
            yearLabelMarginBottom + 80
          ) : Math.max(milestoneSlotHeight, msSlotHeights[String(phase.key)] ?? 0)) : void 0;
          rows.push(
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
              PhaseRow,
              {
                phase,
                isSuppressed: anyExpanded && expandedPhaseKey !== phase.key,
                phaseCardGap,
                phaseCardNode,
                dotColor,
                isDone,
                isLastPhase,
                yearLabelValue,
                yearLabelMarginBottom,
                checklist,
                dotClickAction,
                dotKeyDownHandler,
                dotAriaLabel,
                phaseToggleCounts,
                selectedPhaseKey,
                isMobile: false
              },
              "phase-row"
            )
          );
          phaseMilestones.forEach((ms, mi) => {
            rows.push(
              /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
                MilestoneRow,
                {
                  ms,
                  mi,
                  totalMilestones: phaseMilestones.length,
                  ctx: milestoneCtx,
                  isMobile: false
                },
                `ms-row-${mi}`
              )
            );
          });
          return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            import_Box27.default,
            {
              component: "li",
              "data-testid": "tl-item",
              sx: phaseLiSx({
                zIndex: expandedMiIdx === null ? 1 : 2,
                computedMinHeight: phaseMinHeight
              }),
              children: rows
            },
            phase.key
          );
        }) })
      }
    )
  ] });
}

// src/components/action-bar/icon/icon-action-bar.tsx
var import_Box28 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip8 = __toESM(require("@mui/material/Tooltip"), 1);
var import_IconButton4 = __toESM(require("@mui/material/IconButton"), 1);

// src/components/action-bar/icon/icon-action-bar.styles.ts
var iconActionBarRootSx = {
  gap: 1,
  width: 1,
  flexGrow: 1,
  display: "flex"
};

// src/components/action-bar/icon/icon-action-bar.defaults.tsx
var import_jsx_runtime36 = require("react/jsx-runtime");
var DEFAULT_ICON_ACTIONS = [
  { tooltip: "Edit", icon: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(GiselleIcon, { icon: "solar:pen-bold" }) },
  { tooltip: "View", icon: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(GiselleIcon, { icon: "solar:eye-bold" }) },
  {
    tooltip: "Print",
    icon: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(GiselleIcon, { icon: "solar:printer-minimalistic-bold" })
  },
  { tooltip: "Send", icon: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(GiselleIcon, { icon: "mdi:email" }) },
  { tooltip: "Share", icon: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(GiselleIcon, { icon: "solar:share-bold" }) }
];

// src/components/action-bar/icon/icon-action-bar.tsx
var import_jsx_runtime37 = require("react/jsx-runtime");
function IconActionBar({
  actions = DEFAULT_ICON_ACTIONS,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_Box28.default, { sx: [iconActionBarRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: actions.map((item, index) => {
    const label = item["aria-label"] ?? item.tooltip;
    const buttonProps = {
      onClick: item.onClick,
      disabled: item.disabled,
      "aria-label": label,
      ...item.component !== void 0 && { component: item.component },
      ...item.href !== void 0 && { href: item.href }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
      import_Tooltip8.default,
      {
        title: item.tooltip,
        placement: item.tooltipPlacement ?? "bottom",
        children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_IconButton4.default, { ...buttonProps, children: item.icon }) })
      },
      `${item.tooltip}-${index}`
    );
  }) });
}

// src/components/layout/two-column-showcase-row/two-column-showcase-row.tsx
var import_Box29 = __toESM(require("@mui/material/Box"), 1);
var import_Grid = __toESM(require("@mui/material/Grid"), 1);
var import_Stack2 = __toESM(require("@mui/material/Stack"), 1);
var import_Typography19 = __toESM(require("@mui/material/Typography"), 1);
var import_jsx_runtime38 = require("react/jsx-runtime");
function TwoColumnShowcaseRow({
  text,
  controls,
  orientation = "row",
  controlsAlign = "flex-start",
  textSx,
  controlsSx,
  sx,
  ...other
}) {
  const isVertical = orientation === "column" || orientation === "column-reverse";
  const itemSize = isVertical ? { xs: 12 } : { xs: 12, md: 6 };
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
    import_Grid.default,
    {
      container: true,
      columnSpacing: isVertical ? 0 : { xs: 0, md: 6 },
      rowSpacing: { xs: 4, md: isVertical ? 4 : 0 },
      direction: { xs: "column", md: orientation },
      sx: [{}, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        text && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_Grid.default, { size: itemSize, children: /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
          import_Stack2.default,
          {
            spacing: 2,
            sx: [{ maxWidth: 520 }, ...Array.isArray(textSx) ? textSx : [textSx]],
            children: [
              text.overline && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_Typography19.default, { variant: "overline", sx: { color: "text.secondary" }, children: text.overline }),
              text.heading && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_Typography19.default, { variant: "h4", children: text.heading }),
              text.description && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_Typography19.default, { variant: "body1", color: "text.secondary", children: text.description })
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_Grid.default, { size: itemSize, sx: { minWidth: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          import_Stack2.default,
          {
            spacing: 2,
            sx: [
              { alignItems: controlsAlign, width: 1, minWidth: 0 },
              ...Array.isArray(controlsSx) ? controlsSx : [controlsSx]
            ],
            children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_Box29.default, { sx: { width: 1, minWidth: 0 }, children: controls })
          }
        ) })
      ]
    }
  );
}

// src/components/layout/section-title/section-title.tsx
var import_Box31 = __toESM(require("@mui/material/Box"), 1);
var import_Typography20 = __toESM(require("@mui/material/Typography"), 1);

// src/components/layout/section-title/section-title.styles.ts
var txtGradientSpanSx = (theme) => ({
  opacity: 0.4,
  display: "inline-block",
  background: `linear-gradient(to right, ${theme.vars.palette.text.primary}, ${channelAlpha(theme.vars.palette.text.primaryChannel, 0.2)})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent"
});

// src/components/layout/section-title/section-caption.tsx
var import_Box30 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime39 = require("react/jsx-runtime");
function SectionCaption({ title, sx, ...other }) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    import_Box30.default,
    {
      component: "span",
      sx: [
        {
          typography: "overline",
          color: "text.disabled"
        },
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: title
    }
  );
}

// src/components/layout/section-title/section-title.tsx
var import_jsx_runtime40 = require("react/jsx-runtime");
function SectionTitle({
  sx,
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
    import_Box31.default,
    {
      sx: [
        {
          gap: 3,
          display: "flex",
          flexDirection: "column"
        },
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: [
        caption && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_Typography20.default, { component: "h2", variant: "h2", sx: slotProps?.title?.sx, children: [
          title,
          " ",
          txtGradient && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_Box31.default, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
        ] }),
        description && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
          import_Box31.default,
          {
            sx: [
              { color: "text.secondary", typography: "body1" },
              ...Array.isArray(slotProps?.description?.sx) ? slotProps.description.sx : [slotProps?.description?.sx]
            ],
            children: description
          }
        )
      ]
    }
  );
}

// src/components/nav/floating-sub-nav/floating-sub-nav.tsx
var import_react15 = require("react");
var import_framer_motion2 = require("framer-motion");
var import_Box32 = __toESM(require("@mui/material/Box"), 1);

// src/components/nav/floating-sub-nav/floating-sub-nav.styles.ts
var grey500Ch = (theme) => theme.vars.palette.grey["500Channel"];
var blackCh = (theme) => theme.vars.palette.common["blackChannel"];
var pillSx = (theme) => ({
  p: 0.5,
  borderRadius: 2,
  bgcolor: "background.paper",
  border: `1px solid ${channelAlpha(grey500Ch(theme), 0.14)}`,
  boxShadow: [
    `0 2px 8px 0 ${channelAlpha(grey500Ch(theme), 0.1)}`,
    `0 8px 32px -4px ${channelAlpha(grey500Ch(theme), 0.18)}`
  ].join(", "),
  ...theme.applyStyles("dark", {
    border: `1px solid ${channelAlpha(grey500Ch(theme), 0.08)}`,
    boxShadow: `0 1px 4px 0 ${channelAlpha(blackCh(theme), 0.12)}`
  })
});
var stickyWrapperSx = (theme) => ({
  position: "sticky",
  bottom: { xs: 32, sm: 32, md: 40 },
  height: 0,
  overflow: "visible",
  display: "flex",
  justifyContent: "center",
  zIndex: theme.zIndex.speedDial,
  pointerEvents: "none"
});
var stickyInnerSx = {
  transform: "translateY(-100%)",
  pointerEvents: "auto",
  pb: { xs: "23px", md: "31px" }
};
var fixedWrapperSx = (theme) => ({
  position: "fixed",
  bottom: { xs: 16, md: 24 },
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: theme.zIndex.speedDial
});
var subNavButtonSx = (isActive) => (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: { xs: 36, sm: 38, md: 42, lg: 44 },
  height: { xs: 36, sm: 38, md: 42, lg: 44 },
  p: 0,
  borderRadius: 1.5,
  border: `solid 1px transparent`,
  color: "text.disabled",
  outline: "none",
  transition: theme.transitions.create(
    ["background-color", "box-shadow", "border-color", "color", "opacity"],
    { duration: theme.transitions.duration.shorter }
  ),
  "&:focus-visible": {
    outline: `2px dashed ${theme.vars.palette.primary.main}`,
    outlineOffset: 2
  },
  "&:hover": {
    opacity: 0.72,
    color: "text.primary",
    bgcolor: channelAlpha(grey500Ch(theme), 0.08)
  },
  "&:active": {
    opacity: 0.56,
    bgcolor: channelAlpha(grey500Ch(theme), 0.12)
  },
  ...isActive && {
    color: "primary.main",
    bgcolor: channelAlpha(theme.vars.palette.primary.mainChannel, 0.08),
    borderColor: channelAlpha(theme.vars.palette.primary.mainChannel, 0.24),
    "&:hover": {
      opacity: 1,
      bgcolor: channelAlpha(theme.vars.palette.primary.mainChannel, 0.12)
    },
    "&:active": {
      opacity: 1,
      bgcolor: channelAlpha(theme.vars.palette.primary.mainChannel, 0.16)
    }
  }
});

// src/components/nav/floating-sub-nav/nav-pill.tsx
var import_framer_motion = require("framer-motion");
var import_Stack3 = __toESM(require("@mui/material/Stack"), 1);

// src/components/nav/floating-sub-nav/sub-nav-button.tsx
var import_react14 = require("react");
var import_Tooltip9 = __toESM(require("@mui/material/Tooltip"), 1);
var import_ButtonBase2 = __toESM(require("@mui/material/ButtonBase"), 1);
var import_jsx_runtime41 = require("react/jsx-runtime");
function SubNavButton({ item, isActive, onPress }) {
  const handleClick = (0, import_react14.useCallback)(() => onPress(item.id), [onPress, item.id]);
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_Tooltip9.default, { title: item.label, placement: "top", arrow: true, children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
    import_ButtonBase2.default,
    {
      disableRipple: true,
      component: "button",
      type: "button",
      "aria-label": item.label,
      "aria-pressed": isActive,
      onClick: handleClick,
      sx: subNavButtonSx(isActive),
      children: item.icon
    }
  ) });
}

// src/components/nav/floating-sub-nav/nav-pill.tsx
var import_jsx_runtime42 = require("react/jsx-runtime");
function NavPill({ items, activeId, onPress }) {
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
    import_framer_motion.motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 10 },
      transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
      children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
        import_Stack3.default,
        {
          direction: "column",
          alignItems: "center",
          role: "navigation",
          "aria-label": "Section navigation",
          sx: pillSx,
          children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_Stack3.default, { direction: "row", spacing: 0.5, children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
            SubNavButton,
            {
              item,
              isActive: activeId === item.id,
              onPress
            },
            item.id
          )) })
        }
      )
    }
  );
}

// src/components/nav/floating-sub-nav/floating-sub-nav.tsx
var import_jsx_runtime43 = require("react/jsx-runtime");
function FloatingSubNav({ items, activeId, onSelect, sticky = false }) {
  const handlePress = (0, import_react15.useCallback)((id) => onSelect(id), [onSelect]);
  if (sticky) {
    return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_Box32.default, { sx: stickyWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_Box32.default, { sx: stickyInnerSx, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_framer_motion2.AnimatePresence, { children: activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(NavPill, { items, activeId, onPress: handlePress }) }) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_framer_motion2.AnimatePresence, { children: activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_Box32.default, { sx: fixedWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(NavPill, { items, activeId, onPress: handlePress }) }) });
}

// src/components/layout/section-container/section-container.tsx
var import_Container = __toESM(require("@mui/material/Container"), 1);
var import_jsx_runtime44 = require("react/jsx-runtime");
function SectionContainer({
  children,
  maxWidth = "lg",
  py = { xs: 8, md: 12 },
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_Container.default, { maxWidth, sx: [{ py }, ...Array.isArray(sx) ? sx : [sx]], ...other, children });
}

// src/utils/maturity-utils.ts
function resolveMaturityColor(percent) {
  const clamped = Math.max(0, Math.min(100, percent));
  if (clamped >= 80) return "success";
  if (clamped >= 60) return "primary";
  if (clamped >= 40) return "info";
  if (clamped >= 20) return "warning";
  return "error";
}
function resolveMaturityLabel(percent) {
  const clamped = Math.max(0, Math.min(100, percent));
  if (clamped >= 80) return "Stable";
  if (clamped >= 60) return "Nearly ready";
  if (clamped >= 40) return "In progress";
  if (clamped >= 20) return "Early stage";
  return "Not started";
}

// src/utils/timeline-utils.ts
function assignMilestoneSidesByDone(phases) {
  return phases.map((phase) => ({
    ...phase,
    milestones: phase.milestones?.map((ms) => ({
      ...ms,
      side: ms.side ?? (ms.done ? "left" : "right")
    }))
  }));
}

// src/components/chart/radial-progress/radial-progress-card.tsx
var import_react16 = require("react");
var import_Card2 = __toESM(require("@mui/material/Card"), 1);
var import_CardContent = __toESM(require("@mui/material/CardContent"), 1);
var import_CardHeader = __toESM(require("@mui/material/CardHeader"), 1);
var import_Divider3 = __toESM(require("@mui/material/Divider"), 1);
var import_Box33 = __toESM(require("@mui/material/Box"), 1);
var import_Typography21 = __toESM(require("@mui/material/Typography"), 1);
var import_styles2 = require("@mui/material/styles");

// src/components/chart/radial-progress/radial-progress-card.styles.ts
function buildRadialProgressOptions(theme, labels, colors, total, totalLabel) {
  const textSecondary = theme.vars?.palette.text.secondary ?? theme.palette.text.secondary;
  const textPrimary = theme.vars?.palette.text.primary ?? theme.palette.text.primary;
  const trackBg = theme.vars?.palette.grey[200] ?? theme.palette.grey[200];
  return {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true }
    },
    colors,
    labels,
    stroke: { lineCap: "round" },
    fill: { type: "solid" },
    grid: { padding: { top: -20, bottom: -20 } },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 10,
          size: "40%"
        },
        track: {
          margin: 10,
          background: trackBg,
          strokeWidth: "100%"
        },
        dataLabels: {
          total: {
            show: true,
            label: totalLabel,
            color: textSecondary,
            fontSize: "13px",
            fontWeight: 400,
            formatter: () => `${total}`
          },
          value: {
            offsetY: 2,
            color: textPrimary,
            fontSize: "15px",
            fontWeight: 700,
            formatter: (val) => `${Math.round(val)}%`
          },
          name: {
            offsetY: -10,
            fontSize: "11px",
            color: textSecondary
          }
        }
      }
    }
  };
}
var chartWrapSx = {
  mx: "auto",
  overflow: "hidden"
};
var legendRowSx = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 2,
  mt: 1
};
var legendItemSx = {
  display: "flex",
  alignItems: "center",
  gap: 0.75
};
var legendValueSx = {
  color: "text.secondary",
  ml: 0.5
};
var LEGEND_DOT_SIZE = 12;
var legendDotSx = (color) => ({
  width: LEGEND_DOT_SIZE,
  height: LEGEND_DOT_SIZE,
  borderRadius: "50%",
  bgcolor: color,
  flexShrink: 0
});

// src/components/chart/radial-progress/radial-progress-card.tsx
var import_jsx_runtime45 = require("react/jsx-runtime");
var ReactApexChart = (0, import_react16.lazy)(() => import("react-apexcharts"));
function RadialProgressCard({
  title,
  subheader,
  total,
  totalLabel = "%",
  chartHeight = 280,
  series,
  sx,
  ...other
}) {
  const theme = (0, import_styles2.useTheme)();
  const resolvedColors = (0, import_react16.useMemo)(
    () => series.map((item) => theme.palette[item.color].main),
    [series, theme]
  );
  const chartSeries = (0, import_react16.useMemo)(() => series.map((s) => s.value), [series]);
  const chartLabels = (0, import_react16.useMemo)(() => series.map((s) => s.label), [series]);
  const chartOptions = (0, import_react16.useMemo)(
    () => buildRadialProgressOptions(theme, chartLabels, resolvedColors, total, totalLabel),
    [theme, chartLabels, resolvedColors, total, totalLabel]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(import_Card2.default, { sx: [{}, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    (title !== void 0 || subheader !== void 0) && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_CardHeader.default, { title, subheader }),
    /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(import_CardContent.default, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_Box33.default, { sx: chartWrapSx, children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_react16.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_Box33.default, { sx: { height: chartHeight } }), children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
        ReactApexChart,
        {
          type: "radialBar",
          series: chartSeries,
          options: chartOptions,
          width: "100%",
          height: chartHeight
        }
      ) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_Divider3.default, { sx: { my: 2 } }),
      /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_Box33.default, { sx: legendRowSx, children: series.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(import_Box33.default, { sx: legendItemSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_Box33.default, { sx: legendDotSx(resolvedColors[i] ?? theme.palette.primary.main) }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_Typography21.default, { variant: "subtitle2", children: item.label }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(import_Typography21.default, { variant: "caption", sx: legendValueSx, children: [
          item.value,
          "%"
        ] })
      ] }, item.label)) })
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACCORDION_CHECK_ICON_SIZE,
  ACCORDION_DONE_MIN_TOUCH_TARGET,
  ACCORDION_ICON_BUTTON_MIN_SIZE,
  Accordion,
  COMPACT_MILESTONE_DOT_SIZE,
  COMPACT_MIN_MILESTONE_DOT_SIZE,
  COMPACT_MIN_PHASE_DOT_SIZE,
  COMPACT_PHASE_DOT_SIZE,
  COMPACT_PHASE_ICON_SIZE,
  DEFAULT_ICON_ACTIONS,
  FloatingSubNav,
  GISELLE_PRIMARY_DARK_MAIN,
  GISELLE_PRIMARY_MAIN,
  GISELLE_SECONDARY_MAIN,
  GiselleIcon,
  IconActionBar,
  MetricCard,
  MetricCardDecoration,
  PhaseCard,
  QuoteCard,
  RadialProgressCard,
  STAT_CARD_SPARKLINE_OPTIONS,
  SectionCaption,
  SectionContainer,
  SectionTitle,
  SelectableCard,
  StatCard,
  TaskList,
  TimelineCompact,
  TimelineDot,
  TimelineTwoColumn,
  TwoColumnShowcaseRow,
  assignMilestoneSidesByDone,
  channelAlpha,
  createIconRegistrar,
  giselleTheme,
  hexToChannel,
  pxToRem,
  remToPx,
  resolveCompactColor,
  resolveMaturityColor,
  resolveMaturityLabel,
  useNestedChecklist
});
//# sourceMappingURL=index.cjs.map