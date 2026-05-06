'use client';

// src/utils/create-icon-registrar.ts
import { addCollection } from "@iconify/react";
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
    collections.forEach((collection) => addCollection(collection));
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
import { extendTheme } from "@mui/material/styles";
var GISELLE_PRIMARY_MAIN = "#2E7D32";
var GISELLE_PRIMARY_DARK_MAIN = "#76C442";
var GISELLE_SECONDARY_MAIN = "#F5A623";
var giselleTheme = extendTheme({
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
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";

// src/components/icon/giselle/giselle-icon.styles.ts
var giselleIconRootSx = (width, height) => ({
  lineHeight: 0,
  display: "inline-flex",
  flexShrink: 0,
  width,
  height
});

// src/components/icon/giselle/giselle-icon.tsx
import { jsx } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx(Box, { component: "span", sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]], children: /* @__PURE__ */ jsx(
    Icon,
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

// src/components/card/metric/metric-card.tsx
import Box2 from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
var metricCardIconBoxSx = (color) => (theme) => ({
  top: 24,
  right: 20,
  width: 36,
  height: 36,
  position: "absolute",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.vars.palette[color]?.main
});

// src/components/card/metric/metric-card.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs(
    Paper,
    {
      elevation,
      sx: [metricCardPaperSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        decoration && /* @__PURE__ */ jsx2(Box2, { "aria-hidden": "true", sx: decorationOverlaySx, children: decoration }),
        /* @__PURE__ */ jsxs(Box2, { sx: { position: "relative", zIndex: 1, flexGrow: 1 }, children: [
          /* @__PURE__ */ jsx2(Box2, { sx: { typography: "h3" }, children: value }),
          /* @__PURE__ */ jsx2(Typography, { noWrap: true, variant: "subtitle2", component: "div", sx: { color: "text.secondary" }, children: label }),
          sublabel && /* @__PURE__ */ jsx2(
            Typography,
            {
              noWrap: true,
              variant: "caption",
              component: "div",
              sx: { color: "text.disabled", mt: 0.25 },
              children: sublabel
            }
          )
        ] }),
        icon && /* @__PURE__ */ jsx2(Box2, { "aria-hidden": "true", sx: metricCardIconBoxSx(color), children: icon })
      ]
    }
  );
}
function MetricCardDecoration({
  color = "primary",
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx2(
    Box2,
    {
      sx: [
        (theme) => ({
          top: -40,
          right: -56,
          width: 140,
          height: 140,
          opacity: 0.1,
          borderRadius: 4,
          position: "absolute",
          transform: "rotate(40deg)",
          background: `linear-gradient(to right, ${theme.vars.palette[color].main}, transparent)`
        }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other
    }
  );
}

// src/components/card/selectable/selectable-card.tsx
import ButtonBase from "@mui/material/ButtonBase";
import { jsx as jsx3 } from "react/jsx-runtime";
function SelectableCard({
  selected = false,
  disabled = false,
  children,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx3(
    ButtonBase,
    {
      disabled,
      "aria-pressed": selected,
      focusRipple: true,
      sx: [
        (theme) => ({
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
        }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children
    }
  );
}

// src/components/card/quote/quote-card.tsx
import Box3 from "@mui/material/Box";
import Paper2 from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography2 from "@mui/material/Typography";

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

// src/components/card/quote/quote-card.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function QuoteCard({
  quote,
  author,
  source,
  color = "primary",
  elevation = 0,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx4(
    Paper2,
    {
      elevation,
      sx: [
        (theme) => ({
          p: 3,
          borderRadius: 2,
          bgcolor: `rgba(${theme.vars.palette[color].mainChannel} / 0.06)`,
          border: `1px solid rgba(${theme.vars.palette[color].mainChannel} / 0.12)`
        }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: /* @__PURE__ */ jsxs2(Box3, { sx: { display: "flex", gap: 2 }, children: [
        /* @__PURE__ */ jsx4(Typography2, { "aria-hidden": true, sx: quoteMarkSx(color), children: "\u201C" }),
        /* @__PURE__ */ jsxs2(Box3, { sx: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx4(Typography2, { variant: "body1", sx: quoteTextSx, children: quote }),
          (author || source) && /* @__PURE__ */ jsxs2(
            Stack,
            {
              direction: "row",
              spacing: 0.75,
              alignItems: "center",
              sx: { mt: 2, color: "text.disabled" },
              children: [
                author && /* @__PURE__ */ jsx4(Typography2, { variant: "caption", sx: { fontWeight: "fontWeightMedium" }, children: author }),
                author && source && /* @__PURE__ */ jsx4(Typography2, { variant: "caption", "aria-hidden": true, sx: { opacity: 0.6 }, children: "\xB7" }),
                source && /* @__PURE__ */ jsx4(Typography2, { variant: "caption", sx: { opacity: 0.72 }, children: source })
              ]
            }
          )
        ] })
      ] })
    }
  );
}

// src/components/card/stat/stat-card.tsx
import Box4 from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography3 from "@mui/material/Typography";

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

// src/components/card/stat/stat-card.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function StatCardShape() {
  return /* @__PURE__ */ jsxs3(
    "svg",
    {
      width: "120",
      height: "120",
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx5(
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
        /* @__PURE__ */ jsx5(
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
  return /* @__PURE__ */ jsxs3(Card, { sx: [statCardRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ jsx5(Box4, { "aria-hidden": "true", sx: decorationSx, children: /* @__PURE__ */ jsx5(StatCardShape, {}) }),
    /* @__PURE__ */ jsx5(Box4, { sx: iconBoxSx, children: icon }),
    trend !== void 0 && /* @__PURE__ */ jsxs3(Box4, { sx: trendBoxSx, children: [
      /* @__PURE__ */ jsx5(GiselleIcon, { width: 20, icon: isUp ? "eva:trending-up-fill" : "eva:trending-down-fill" }),
      /* @__PURE__ */ jsxs3(Typography3, { component: "span", variant: "subtitle2", children: [
        isUp && "+",
        trend,
        "%"
      ] }),
      trendLabel && /* @__PURE__ */ jsx5(
        Typography3,
        {
          component: "span",
          variant: "caption",
          sx: { opacity: 0.72, ml: 0.5, fontWeight: 400 },
          children: trendLabel
        }
      )
    ] }),
    /* @__PURE__ */ jsxs3(Box4, { sx: contentRowSx, children: [
      /* @__PURE__ */ jsxs3(Box4, { sx: labelsBoxSx, children: [
        /* @__PURE__ */ jsx5(Typography3, { variant: "subtitle2", sx: { mb: 0.5 }, children: label }),
        /* @__PURE__ */ jsx5(Typography3, { variant: "h4", children: value })
      ] }),
      chart
    ] })
  ] });
}

// src/components/timeline/two-column/phase-card/phase-card.tsx
import {
  useState as useState2,
  useRef,
  useCallback as useCallback2
} from "react";

// src/components/timeline/two-column/phase-warning-popover/phase-warning-popover.tsx
import { useState, useCallback, useMemo, useEffect } from "react";
import Box5 from "@mui/material/Box";
import Paper3 from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Slider from "@mui/material/Slider";
import Typography4 from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";

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

// src/components/timeline/two-column/phase-warning-popover/phase-warning-popover.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
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
function MiniGanttRuler({
  axis,
  conflictingPhases,
  overrides
}) {
  const span = axis.max - axis.min;
  if (span <= 0) return null;
  const rangeList = Array.from(overrides.entries());
  return /* @__PURE__ */ jsx6(Box5, { "aria-hidden": true, sx: ganttTrackSx, children: conflictingPhases.map((phase) => {
    const override = overrides.get(phase.key);
    if (!override) return null;
    const leftPct = (override.startIdx - axis.min) / span * 100;
    const widthPct = Math.max(1, (override.endIdx - override.startIdx) / span * 100);
    const sliderColor = resolveSliderColor(phase.color);
    const isOverlapping = rangeList.some(
      ([otherKey, other]) => otherKey !== phase.key && override.startIdx <= other.endIdx && other.startIdx <= override.endIdx
    );
    return /* @__PURE__ */ jsx6(Box5, { sx: ganttBarSx(leftPct, widthPct, isOverlapping, sliderColor) }, phase.key);
  }) });
}
function PhaseWarningPopover({
  open,
  anchorEl,
  onClose,
  allPhases,
  currentPhase,
  onPhasesChange
}) {
  const conflictingPhases = useMemo(
    () => getConnectedOverlapGroup(allPhases, currentPhase.key),
    [allPhases, currentPhase.key]
  );
  const [overrides, setOverrides] = useState(() => /* @__PURE__ */ new Map());
  const [pendingApply, setPendingApply] = useState(false);
  useEffect(() => {
    if (!open) return;
    const initial = /* @__PURE__ */ new Map();
    for (const p of conflictingPhases) {
      const range = parsePhaseRange(p);
      if (range) initial.set(p.key, range);
    }
    setOverrides(initial);
    setPendingApply(false);
  }, [open, conflictingPhases]);
  const axis = useMemo(() => computeAxis(overrides), [overrides]);
  const stillOverlapping = useMemo(() => hasRemainingOverlaps(overrides), [overrides]);
  const handleSliderChange = useCallback((phaseKey, value) => {
    if (!Array.isArray(value)) return;
    const [start, end] = value;
    setOverrides((prev) => {
      const next = new Map(prev);
      next.set(phaseKey, { startIdx: start, endIdx: end });
      return next;
    });
    setPendingApply(false);
  }, []);
  const handleMakeSequential = useCallback(() => {
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
  const handleApply = useCallback(() => {
    const withOverrides = applyOverrides(conflictingPhases, overrides);
    const merged = mergeIntoAll(allPhases, withOverrides);
    onPhasesChange(merged);
    onClose();
  }, [conflictingPhases, overrides, allPhases, onPhasesChange, onClose]);
  const handleCancel = useCallback(() => {
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
  return /* @__PURE__ */ jsx6(
    Popper,
    {
      open,
      anchorEl,
      placement: "bottom-start",
      modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
      sx: { zIndex: (theme) => theme.zIndex.tooltip + 1 },
      children: /* @__PURE__ */ jsx6(ClickAwayListener, { onClickAway: onClose, children: /* @__PURE__ */ jsxs4(Paper3, { elevation: 8, sx: popoverPaperSx, children: [
        /* @__PURE__ */ jsxs4(Box5, { sx: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxs4(
            Typography4,
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
          /* @__PURE__ */ jsx6(
            IconButton,
            {
              size: "small",
              onClick: onClose,
              "aria-label": "Close warning panel",
              sx: { ml: "auto" },
              children: "\xD7"
            }
          )
        ] }),
        /* @__PURE__ */ jsx6(Divider, {}),
        /* @__PURE__ */ jsxs4(Box5, { children: [
          /* @__PURE__ */ jsx6(Typography4, { variant: "body2", color: "warning.main", sx: { fontWeight: 500 }, children: `Overlap: ${conflictingPhases.map((p) => p.shortTitle ?? p.title).join(" \u2194 ")}` }),
          /* @__PURE__ */ jsxs4(Typography4, { variant: "caption", color: "text.secondary", sx: { mt: 0.5, display: "block" }, children: [
            currentPhase.shortTitle ?? currentPhase.title,
            " \u2014 adjust sliders or use Make sequential."
          ] })
        ] }),
        /* @__PURE__ */ jsx6(Divider, {}),
        /* @__PURE__ */ jsx6(Box5, { sx: { display: "flex", flexDirection: "column", gap: 1.5 }, children: conflictingPhases.map((phase) => {
          const override = overrides.get(phase.key);
          if (!override) return null;
          const sliderColor = resolveSliderColor(phase.color);
          return /* @__PURE__ */ jsxs4(Box5, { children: [
            /* @__PURE__ */ jsxs4(Box5, { sx: sliderRowHeaderSx, children: [
              /* @__PURE__ */ jsx6(Typography4, { variant: "caption", fontWeight: 600, children: phase.shortTitle ?? phase.title }),
              /* @__PURE__ */ jsxs4(Typography4, { variant: "caption", color: "text.secondary", children: [
                monthIndexToDate(override.startIdx),
                " \u2013 ",
                monthIndexToDate(override.endIdx)
              ] })
            ] }),
            /* @__PURE__ */ jsx6(
              Slider,
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
        /* @__PURE__ */ jsx6(MiniGanttRuler, { axis, conflictingPhases, overrides }),
        /* @__PURE__ */ jsx6(Divider, {}),
        /* @__PURE__ */ jsxs4(Box5, { sx: actionsRowSx, children: [
          /* @__PURE__ */ jsx6(
            Button,
            {
              size: "small",
              variant: "outlined",
              color: "warning",
              disabled: !stillOverlapping,
              onClick: handleMakeSequential,
              children: "Make sequential"
            }
          ),
          pendingApply && /* @__PURE__ */ jsxs4(Box5, { sx: { display: "flex", gap: 1 }, children: [
            /* @__PURE__ */ jsx6(
              Button,
              {
                size: "small",
                variant: "contained",
                color: "success",
                onClick: handleApply,
                "aria-label": "Apply date changes",
                children: "Apply"
              }
            ),
            /* @__PURE__ */ jsx6(
              Button,
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
import Box6 from "@mui/material/Box";
import Paper4 from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Typography5 from "@mui/material/Typography";

// src/components/timeline/two-column/icons.tsx
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var DEFAULT_EXPANDABLE_ICON = /* @__PURE__ */ jsx7(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    children: /* @__PURE__ */ jsx7("g", { children: /* @__PURE__ */ jsxs5("g", { fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd", children: [
      /* @__PURE__ */ jsx7("path", { d: "M8.308 5.148a3.15 3.15 0 0 1-3.154 3.148A3.15 3.15 0 0 1 2 5.148A3.15 3.15 0 0 1 5.154 2a3.15 3.15 0 0 1 3.154 3.148M5.154 6.296a1.15 1.15 0 0 0 1.154-1.148A1.15 1.15 0 0 0 5.154 4A1.15 1.15 0 0 0 4 5.148a1.15 1.15 0 0 0 1.154 1.148M21 18.924a3.15 3.15 0 0 1-3.154 3.147a3.15 3.15 0 0 1-3.154-3.148a3.15 3.15 0 0 1 3.154-3.147c1.732 0 3.154 1.4 3.154 3.148m-3.154 1.147A1.15 1.15 0 0 0 19 18.923c0-.633-.517-1.147-1.154-1.147a1.15 1.15 0 0 0-1.154 1.148a1.15 1.15 0 0 0 1.154 1.147M21 11.462a3.15 3.15 0 0 1-3.154 3.148a3.15 3.15 0 0 1-3.154-3.148a3.15 3.15 0 0 1 3.154-3.148A3.15 3.15 0 0 1 21 11.462m-3.154 1.148A1.15 1.15 0 0 0 19 11.462c0-.634-.517-1.148-1.154-1.148a1.15 1.15 0 0 0-1.154 1.148a1.15 1.15 0 0 0 1.154 1.148" }),
      /* @__PURE__ */ jsx7("path", { d: "M5.154 7.018a1 1 0 0 1 1 1v6.784a3.154 3.154 0 0 0 3.13 3.154l5.724.044a1 1 0 0 1-.016 2l-5.724-.044a5.154 5.154 0 0 1-5.114-5.154V8.018a1 1 0 0 1 1-1" }),
      /* @__PURE__ */ jsx7("path", { d: "M9.172 12.462a5.02 5.02 0 0 1-5.018-5.018h2a3.02 3.02 0 0 0 3.018 3.018H15a1 1 0 1 1 0 2z" })
    ] }) })
  }
);

// src/components/timeline/two-column/animations.ts
import { keyframes } from "@emotion/react";
var pulseRing = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.6); opacity: 0; }
`;
var pulseDot = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;
var checkPop = keyframes`
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

// src/components/timeline/two-column/phase-card/phase-card.tsx
import { Fragment, jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
var CORNER_ALERT_BADGE_SIZE = 26;
var CORNER_ALERT_ICON_SIZE = 16;
var CORNER_ALERT_LIST_ICON_SIZE = 16;
var PHASE_EYE_ICON_SIZE = 20;
var EYE_BUTTON_MIN_SIZE = 28;
var PHASE_PILL_ICON_SIZE = 16;
var PHASE_PILL_TEXT_FONT_SIZE = "0.75rem";
var PHASE_TASK_ICON_SIZE = 16;
function resolveCornerBadgeAlign(columnSide) {
  if (columnSide === "left") {
    return { left: 0, transform: "translate(-50%, -50%)", tooltipPlacement: "top-start" };
  }
  return { right: 0, transform: "translate(50%, -50%)", tooltipPlacement: "top-end" };
}
function resolvePhotoSources(phase) {
  return phase.photos ?? (phase.photo ? [phase.photo] : null);
}
function LabeledIconStrip({ label, children }) {
  return /* @__PURE__ */ jsxs6(Box6, { sx: { mt: 2.5 }, children: [
    label && /* @__PURE__ */ jsx8(Typography5, { variant: "overline", sx: labeledIconStripLabelSx, children: label }),
    children
  ] });
}
function CardDetailBullets({
  id,
  details,
  in: expanded,
  taskDoneStates,
  onToggleTask
}) {
  return /* @__PURE__ */ jsx8(Collapse, { in: expanded, timeout: 50, children: /* @__PURE__ */ jsx8(Box6, { id, sx: detailBulletsContainerSx, children: details.map((task, i) => {
    const isDoneTask = taskDoneStates ? taskDoneStates[i] ?? false : task.done ?? false;
    const toggleLabel = isDoneTask ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`;
    return /* @__PURE__ */ jsxs6(Box6, { sx: taskRowSx, children: [
      /* @__PURE__ */ jsx8(
        Box6,
        {
          component: onToggleTask ? "button" : "span",
          "aria-label": onToggleTask ? toggleLabel : void 0,
          "aria-pressed": onToggleTask ? isDoneTask : void 0,
          onClick: onToggleTask ? () => onToggleTask(i, !isDoneTask) : void 0,
          sx: onToggleTask ? [taskToggleButtonSx, taskToggleColorSx(isDoneTask)] : [taskIconStaticSx, taskIconColorSx(isDoneTask)],
          children: /* @__PURE__ */ jsx8(
            GiselleIcon,
            {
              icon: isDoneTask ? "solar:check-circle-bold" : "solar:circle-line-duotone",
              width: PHASE_TASK_ICON_SIZE
            }
          )
        }
      ),
      /* @__PURE__ */ jsx8(Typography5, { variant: "body2", sx: taskTitleSx(isDoneTask), children: task.title })
    ] }, i);
  }) }) });
}
function CardCornerAlertBadge({
  alerts,
  columnSide = "right",
  onClick,
  innerRef
}) {
  if (alerts.length === 0) return null;
  const hasError = alerts.some((a) => a.severity === "error");
  const { left, right, transform, tooltipPlacement } = resolveCornerBadgeAlign(columnSide);
  const tooltipContent = /* @__PURE__ */ jsx8(Box6, { sx: tooltipAlertListSx, children: alerts.map((a, i) => /* @__PURE__ */ jsxs6(Box6, { sx: { display: "flex", alignItems: "flex-start", gap: 1 }, children: [
    /* @__PURE__ */ jsx8(
      GiselleIcon,
      {
        icon: "solar:danger-triangle-bold",
        width: CORNER_ALERT_LIST_ICON_SIZE,
        "aria-hidden": true,
        style: { flexShrink: 0, marginTop: 2 }
      }
    ),
    /* @__PURE__ */ jsx8(
      Typography5,
      {
        variant: "body2",
        sx: { lineHeight: 1.55, fontSize: "0.8rem", fontWeight: 500 },
        children: a.message
      }
    )
  ] }, i)) });
  const badgeCircle = /* @__PURE__ */ jsx8(
    Box6,
    {
      ref: innerRef,
      role: onClick ? "button" : void 0,
      "aria-label": `${alerts.length} issue${alerts.length !== 1 ? "s" : ""}`,
      tabIndex: 0,
      onClick,
      onKeyDown: onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : void 0,
      sx: cornerBadgeCircleSx({
        positionOverride: left !== void 0 ? { left } : { right },
        transform,
        hasError,
        hasClickHandler: !!onClick,
        badgeSize: CORNER_ALERT_BADGE_SIZE
      }),
      children: /* @__PURE__ */ jsx8(GiselleIcon, { icon: "solar:danger-triangle-bold", width: CORNER_ALERT_ICON_SIZE, "aria-hidden": true })
    }
  );
  if (onClick) return badgeCircle;
  return /* @__PURE__ */ jsx8(
    Tooltip,
    {
      title: tooltipContent,
      placement: tooltipPlacement,
      arrow: true,
      slotProps: {
        tooltip: {
          sx: {
            maxWidth: 320,
            px: 1.75,
            py: 1.25,
            bgcolor: "grey.900",
            "& .MuiTooltip-arrow": { color: "grey.900" }
          }
        }
      },
      children: badgeCircle
    }
  );
}
function ScenarioBadge({ color, scenarioLabel }) {
  return /* @__PURE__ */ jsx8(Typography5, { variant: "overline", sx: scenarioBadgeSx(color), children: scenarioLabel });
}
function CardStatusBadge({
  isActive,
  isDone,
  activeLabel: _activeLabel,
  color,
  isScenario,
  scenarioLabel,
  isNew: _isNew
}) {
  const showActive = isActive && !isDone;
  const showScenario = !showActive && isScenario && Boolean(scenarioLabel);
  if (!showScenario) return null;
  return /* @__PURE__ */ jsx8(Box6, { sx: { display: "flex", flexDirection: "column", alignItems: "flex-start" }, children: showScenario && /* @__PURE__ */ jsx8(ScenarioBadge, { color, scenarioLabel }) });
}
function isHighlightedVariant(variant) {
  return variant === "scenario" || variant === "life-event";
}
function CardDecoration({ color, isOverduePending, icon }) {
  return /* @__PURE__ */ jsxs6(Fragment, { children: [
    /* @__PURE__ */ jsx8(
      Box6,
      {
        "aria-hidden": true,
        sx: [
          (theme) => ({
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
          })
        ]
      }
    ),
    /* @__PURE__ */ jsx8(Box6, { "aria-hidden": "true", sx: phaseCardIconBoxSx(color, isOverduePending), children: icon })
  ] });
}
function buildPaperSx(p) {
  return (theme) => ({
    p: 2.5,
    position: "relative",
    overflow: "hidden",
    textAlign: p.textAlign ?? "left",
    bgcolor: `rgba(${theme.vars.palette.grey["500Channel"]} / 0.08)`,
    // Single composed transition — covers opacity/filter (always) + box-shadow (when interactive).
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
    // Overdue last — always overrides side/highlighted borders when active
    ...p.isOverdue && !p.isDone && {
      border: "2px solid",
      borderColor: "error.main",
      boxShadow: `0 0 0 2px rgba(${theme.vars.palette.error.mainChannel} / 0.2), 0 8px 32px rgba(${theme.vars.palette.error.mainChannel} / 0.18)`
    },
    // Flatten elevation on all sibling cards when another is expanded
    ...p.suppressElevation && { boxShadow: "none" }
  });
}
function resolveTaskChildren(phase) {
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
function derivePlatformEntry(p) {
  const isString = typeof p === "string";
  const label = isString ? p : p.label;
  const icon = isString ? null : p.icon;
  return { label, icon, hasTextFallback: isString };
}
function buildPlatformStripItems(platforms) {
  return platforms.map((p, i) => {
    const { label, icon } = derivePlatformEntry(p);
    return /* @__PURE__ */ jsx8(Tooltip, { title: label, arrow: true, placement: "top", children: /* @__PURE__ */ jsx8(Box6, { sx: { display: "flex", alignItems: "center", justifyContent: "center" }, children: icon ?? /* @__PURE__ */ jsx8(Box6, { component: "span", sx: { fontSize: 11, px: 0.5 }, children: label }) }) }, `platform-${i}`);
  });
}
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
  const badgeRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState2(false);
  const handleOpenPopover = useCallback2(() => setPopoverOpen(true), []);
  const handleClosePopover = useCallback2(() => setPopoverOpen(false), []);
  const popoverMode = Boolean(onPhasesChange && allPhases);
  const isDone = done ?? phase.done ?? false;
  const isOverdue = overdue ?? phase.overdue ?? false;
  const [internalExpanded, setInternalExpanded] = useState2(false);
  const [isHovered, setIsHovered] = useState2(false);
  const handleMouseEnter = useCallback2(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback2(() => setIsHovered(false), []);
  const taskChildren = resolveTaskChildren(phase);
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
  return /* @__PURE__ */ jsxs6(Box6, { sx: [{ position: "relative" }, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ jsx8(
      CardCornerAlertBadge,
      {
        alerts: cornerAlerts,
        columnSide,
        onClick: popoverMode ? handleOpenPopover : void 0,
        innerRef: popoverMode ? badgeRef : void 0
      }
    ),
    popoverMode && onPhasesChange && allPhases && /* @__PURE__ */ jsx8(
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
    /* @__PURE__ */ jsxs6(
      Paper4,
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
          !isHighlighted && !phase.hideDecoration && /* @__PURE__ */ jsx8(
            CardDecoration,
            {
              color: phase.color ?? "primary",
              isOverduePending: isOverdue && !isDone,
              icon: phase.icon
            }
          ),
          /* @__PURE__ */ jsx8(
            CardStatusBadge,
            {
              isActive: Boolean(phase.active),
              isDone,
              activeLabel: phase.activeLabel,
              color: phase.color ?? "primary",
              isScenario,
              scenarioLabel: phase.scenarioLabel,
              isNew: Boolean(phase.new)
            }
          ),
          !phase.hideDate && phase.date && /* @__PURE__ */ jsx8(
            Typography5,
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
          /* @__PURE__ */ jsx8(Box6, { sx: { display: "flex", alignItems: "flex-start", gap: 1 }, children: /* @__PURE__ */ jsxs6(Box6, { sx: { flex: 1 }, children: [
            /* @__PURE__ */ jsx8(
              Typography5,
              {
                variant: isScenario ? "h6" : "subtitle1",
                sx: { mb: hasDetails ? 0.5 : 1, pr: !isHighlighted && !phase.hideDecoration ? 6 : 0 },
                children: displayTitle
              }
            ),
            hasDetails && /* @__PURE__ */ jsxs6(
              Box6,
              {
                sx: detailCountPillSx,
                "aria-label": `${taskChildren.length} expandable detail${taskChildren.length === 1 ? "" : "s"}`,
                children: [
                  /* @__PURE__ */ jsx8(
                    Box6,
                    {
                      component: "span",
                      sx: {
                        display: "inline-flex",
                        flexShrink: 0,
                        "& svg": { width: PHASE_PILL_ICON_SIZE, height: PHASE_PILL_ICON_SIZE }
                      },
                      children: expandableIcon ?? DEFAULT_EXPANDABLE_ICON
                    }
                  ),
                  /* @__PURE__ */ jsx8(
                    Typography5,
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
            expanded && phase.description && /* @__PURE__ */ jsx8(Typography5, { variant: "body2", sx: { color: "text.secondary", mt: 0.5 }, children: phase.description }),
            expanded && resolvePhotoSources(phase)?.map((p, i) => /* @__PURE__ */ jsx8(Box6, { component: "img", src: p.src, alt: p.alt, sx: photoImgSx(i === 0) }, i)),
            expanded && phase.clients && /* @__PURE__ */ jsx8(LabeledIconStrip, { label: phase.clientsLabel, children: /* @__PURE__ */ jsx8(Box6, { sx: logoStripSx, children: phase.clients.map(({ name, logo }) => /* @__PURE__ */ jsx8(Tooltip, { title: name, arrow: true, children: /* @__PURE__ */ jsx8(Box6, { component: "img", src: logo, alt: name, sx: clientLogoSx }) }, name)) }) }),
            expanded && phase.platforms && phase.platforms.length > 0 && /* @__PURE__ */ jsx8(LabeledIconStrip, { label: phase.platformsLabel ?? "Tech Stack", children: /* @__PURE__ */ jsx8(Box6, { sx: platformStripSx, children: buildPlatformStripItems(phase.platforms) }) }),
            expanded && phase.projects && /* @__PURE__ */ jsx8(LabeledIconStrip, { label: phase.projectsLabel, children: /* @__PURE__ */ jsx8(Box6, { sx: logoStripSx, children: phase.projects.map(({ name, logo }) => /* @__PURE__ */ jsx8(Box6, { component: "img", src: logo, alt: name, sx: projectLogoSx }, name)) }) }),
            expanded && phase.footer != null && /* @__PURE__ */ jsx8(Box6, { sx: { mt: 1 }, onClick: (e) => e.stopPropagation(), children: phase.footer })
          ] }) }),
          hasDetails && /* @__PURE__ */ jsx8(
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
    onMarkViewed && /* @__PURE__ */ jsx8(
      Tooltip,
      {
        title: isViewed ? "Mark as not viewed" : "Mark as viewed",
        placement: columnSide === "left" ? "right" : "left",
        arrow: true,
        children: /* @__PURE__ */ jsx8(
          Box6,
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
            children: /* @__PURE__ */ jsx8(
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
import Box7 from "@mui/material/Box";

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

// src/components/timeline/two-column/timeline-dot/timeline-dot.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
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
function DotInner({
  done,
  icon,
  animationKey,
  iconSize
}) {
  if (done) {
    return /* @__PURE__ */ jsx9(
      Box7,
      {
        component: "svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        sx: doneCheckmarkSx(iconSize),
        children: /* @__PURE__ */ jsx9("polyline", { points: "20 6 9 17 4 12" })
      },
      animationKey
    );
  }
  return /* @__PURE__ */ jsx9(
    Box7,
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
function resolveEffectiveColor(color, done) {
  return done ? "success" : color;
}
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
    /* @__PURE__ */ jsx9(
      Box7,
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
                outline: "2px solid",
                outlineColor: theme.vars.palette[effectiveColor]?.main ?? theme.vars.palette.primary.main,
                outlineOffset: 3
              }
            }
          }),
          // Pulsing halo — phase dots only, active state, not done.
          ...active && !isMilestone && !done ? [
            {
              "&::after": {
                content: '""',
                position: "absolute",
                inset: -5,
                borderRadius: "50%",
                border: "2px solid",
                borderColor: `${effectiveColor}.main`,
                animation: `${pulseRing} 1.5s ease-in-out infinite`
              }
            }
          ] : [],
          ...normaliseSx(sx)
        ],
        children: /* @__PURE__ */ jsx9(Box7, { sx: timelineDotInnerSx(done, dotBg, effectiveColor, isMilestone, !!onClick), children: /* @__PURE__ */ jsx9(DotInner, { done, icon, animationKey, iconSize }) })
      }
    )
  );
}

// src/components/timeline/two-column/two-column.tsx
import {
  useMemo as useMemo2,
  useState as useState4,
  useEffect as useEffect2,
  useCallback as useCallback4,
  useRef as useRef2,
  useLayoutEffect
} from "react";
import Box10 from "@mui/material/Box";
import Timeline from "@mui/lab/Timeline";
import Tooltip3 from "@mui/material/Tooltip";
import Typography8 from "@mui/material/Typography";

// src/components/timeline/two-column/milestone-badge/milestone-badge.tsx
import { useCallback as useCallback3, useState as useState3 } from "react";
import Box8 from "@mui/material/Box";
import Paper5 from "@mui/material/Paper";
import Collapse2 from "@mui/material/Collapse";
import Tooltip2 from "@mui/material/Tooltip";
import Typography6 from "@mui/material/Typography";

// src/components/timeline/two-column/milestone-badge/milestone-badge.styles.ts
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
var milestoneDateSx = (fontSize = "0.875rem") => ({
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

// src/components/timeline/two-column/milestone-badge/milestone-badge.tsx
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var MILESTONE_DATE_FONT_SIZE = "0.875rem";
var MILESTONE_PILL_ICON_SIZE = 16;
var MILESTONE_PILL_TEXT_FONT_SIZE = "0.75rem";
var MILESTONE_EYE_ICON_SIZE = 20;
var MILESTONE_EYE_BUTTON_MIN_SIZE = 28;
var MILESTONE_TASK_ICON_SIZE = 16;
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
  const [isHovered, setIsHovered] = useState3(false);
  const handleMouseEnter = useCallback3(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback3(() => setIsHovered(false), []);
  const displayTitle = isExpanded || isHovered ? m.title : m.shortTitle ?? m.title;
  const handleClick = useCallback3(() => {
    if (hasDetails) onRequestExpand();
  }, [hasDetails, onRequestExpand]);
  const handleKeyDown = useCallback3(
    (e) => {
      if (hasDetails && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onRequestExpand();
      }
    },
    [hasDetails, onRequestExpand]
  );
  return /* @__PURE__ */ jsxs7(
    Paper5,
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
        (theme) => ({
          p: 2,
          overflow: "hidden",
          // Default (collapsed): transparent — no background, border colour set to transparent
          // so the 3px top border slot is reserved for a smooth colour transition on hover.
          borderTop: "3px solid",
          borderTopColor: isExpanded ? theme.vars.palette[colorKey]?.main ?? theme.vars.palette.primary.main : "transparent",
          bgcolor: isExpanded ? "background.paper" : "transparent",
          boxShadow: isExpanded ? `0 4px 16px rgba(${theme.vars.palette[colorKey]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.1)` : "none",
          transition: "box-shadow 0.22s, opacity 0.3s, filter 0.3s, background-color 0.22s, border-color 0.22s",
          ...rightAlign && { textAlign: "right" },
          ...done && {
            opacity: 0.45,
            filter: "grayscale(1)",
            // Override parent msCardWrapperSx pointerEvents:none (applied when another
            // card is expanded/blurred). Done milestone cards must always be hoverable
            // so the reader can temporarily restore full colour by hovering.
            pointerEvents: "auto"
          },
          // Hover reveals the styled card for ALL milestones (title preview),
          // but cursor:pointer only for expandable ones.
          // Done cards also restore full opacity/filter on hover so the opaque
          // background.paper is fully visible and doesn't bleed through.
          ...!isExpanded && {
            "&:hover": {
              bgcolor: "background.paper",
              borderTopColor: theme.vars.palette[colorKey]?.main ?? theme.vars.palette.primary.main,
              boxShadow: `0 16px 40px rgba(${theme.vars.palette[colorKey]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.22)`,
              ...hasDetails && { cursor: "pointer" },
              ...done && { opacity: 1, filter: "none" }
            }
          },
          ...hasDetails && !isExpanded && {
            "&:focus-visible": {
              bgcolor: "background.paper",
              borderTopColor: theme.vars.palette[colorKey]?.main ?? theme.vars.palette.primary.main,
              outline: "2px solid",
              outlineColor: theme.vars.palette[colorKey]?.main ?? theme.vars.palette.primary.main,
              outlineOffset: 3
            }
          },
          // Flatten elevation when another card is expanded
          ...suppressElevation && { boxShadow: "none" }
        }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      children: [
        m.new && /* @__PURE__ */ jsxs7(Box8, { sx: milestoneNewBadgeRowSx(rightAlign), children: [
          /* @__PURE__ */ jsx10(Box8, { sx: milestoneNewDotSx }),
          /* @__PURE__ */ jsx10(Typography6, { variant: "caption", sx: milestoneNewLabelSx, children: "New" })
        ] }),
        m.date && /* @__PURE__ */ jsx10(Typography6, { variant: "caption", sx: milestoneDateSx(MILESTONE_DATE_FONT_SIZE), children: m.date }),
        /* @__PURE__ */ jsxs7(Box8, { sx: milestoneTitleRowSx(rightAlign), children: [
          onMarkViewed && rightAlign && /* @__PURE__ */ jsx10(
            Tooltip2,
            {
              title: isViewed ? "Mark as not viewed" : "Mark as viewed",
              placement: "right",
              arrow: true,
              children: /* @__PURE__ */ jsx10(
                Box8,
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
                  children: /* @__PURE__ */ jsx10(
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
          /* @__PURE__ */ jsx10(Typography6, { variant: "subtitle2", sx: { fontWeight: 700, lineHeight: 1.3 }, children: displayTitle }),
          onMarkViewed && !rightAlign && /* @__PURE__ */ jsx10(
            Tooltip2,
            {
              title: isViewed ? "Mark as not viewed" : "Mark as viewed",
              placement: "left",
              arrow: true,
              children: /* @__PURE__ */ jsx10(
                Box8,
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
                  children: /* @__PURE__ */ jsx10(
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
          )
        ] }),
        (isExpanded || isHovered) && m.description && /* @__PURE__ */ jsx10(Typography6, { variant: "body2", sx: { color: "text.secondary", mt: 0.5 }, children: m.description }),
        hasDetails && /* @__PURE__ */ jsxs7(
          Box8,
          {
            sx: milestoneDetailPillSx,
            "aria-label": `${taskChildren.length} expandable detail${taskChildren.length === 1 ? "" : "s"}`,
            children: [
              /* @__PURE__ */ jsx10(
                Box8,
                {
                  component: "span",
                  sx: {
                    display: "inline-flex",
                    flexShrink: 0,
                    "& svg": { width: MILESTONE_PILL_ICON_SIZE, height: MILESTONE_PILL_ICON_SIZE }
                  },
                  children: expandableIcon ?? DEFAULT_EXPANDABLE_ICON
                }
              ),
              /* @__PURE__ */ jsx10(
                Typography6,
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
        hasDetails && /* @__PURE__ */ jsx10(Collapse2, { in: isExpanded, timeout: 50, children: /* @__PURE__ */ jsx10(Box8, { id: detailsId, sx: milestoneDetailListSx, children: taskChildren.map((task, i) => {
          const isDoneTask = taskDoneStates ? taskDoneStates[i] ?? false : task.done ?? false;
          const toggleLabel = isDoneTask ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`;
          return /* @__PURE__ */ jsxs7(Box8, { sx: taskRowSx2, children: [
            /* @__PURE__ */ jsx10(
              Box8,
              {
                component: onToggleTask ? "button" : "span",
                "aria-label": onToggleTask ? toggleLabel : void 0,
                "aria-pressed": onToggleTask ? isDoneTask : void 0,
                onClick: onToggleTask ? () => onToggleTask(i, !isDoneTask) : void 0,
                sx: onToggleTask ? [taskToggleButtonSx2, taskToggleColorSx2(isDoneTask)] : [taskIconStaticSx2, taskIconColorSx2(isDoneTask)],
                children: /* @__PURE__ */ jsx10(
                  GiselleIcon,
                  {
                    icon: isDoneTask ? "solar:check-circle-bold" : "solar:circle-line-duotone",
                    width: MILESTONE_TASK_ICON_SIZE
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx10(Typography6, { variant: "body2", sx: taskTitleSx2(isDoneTask), children: task.title })
          ] }, i);
        }) }) })
      ]
    }
  );
}

// src/components/timeline/two-column/spine-connector/spine-connector.tsx
import Box9 from "@mui/material/Box";
import Typography7 from "@mui/material/Typography";

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
import { jsx as jsx11 } from "react/jsx-runtime";
function SpineConnector({
  dotColor,
  yearMilestone,
  yearLabelMarginBottom = 50,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx11(
    Box9,
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
      children: yearMilestone && /* @__PURE__ */ jsx11(Typography7, { variant: "caption", sx: yearLabelSx(yearLabelMarginBottom), children: yearMilestone })
    }
  );
}

// src/components/timeline/two-column/two-column.styles.ts
var timelineColumnSx = (columnSide, hasContent, bottomPadding) => ({
  flex: 1,
  textAlign: columnSide === "left" ? "right" : "left",
  pr: columnSide === "left" ? 2 : 0,
  pl: columnSide === "right" ? 2 : 0,
  pt: 0.75,
  paddingBottom: `${bottomPadding}px`,
  display: { xs: hasContent ? "block" : "none", md: "block" }
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
var msColumnBoxSx = (visible) => ({
  flex: 1,
  position: "relative",
  overflow: "visible",
  display: { xs: visible ? "block" : "none", md: "block" }
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
var markerLeftLabelSx = {
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  pr: 1.5
};
var markerCenterSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative"
};
var markerRightLabelSx = {
  flex: 1,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  pl: 1.5
};
var phaseRowSx = (blurred) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
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
  alignItems: "center"
};
var timelineRootSx = {
  p: 0,
  m: 0,
  "& .MuiTimelineItem-root:before": { flex: 0, padding: 0 }
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

// src/components/timeline/two-column/two-column.tsx
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect2;
function TimelineColumn({ columnSide, hasContent, children, bottomPadding }) {
  return /* @__PURE__ */ jsx12(Box10, { "data-col": columnSide, sx: timelineColumnSx(columnSide, hasContent, bottomPadding), children });
}
var EMPTY_VIEWED_KEYS = /* @__PURE__ */ new Set();
function buildMilestoneRow(ms, mi, totalMilestones, ctx) {
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
  const topPercent = (mi + 1) / (totalMilestones + 1) * 100;
  const stopProp = (e) => e.stopPropagation();
  const suppressElevation = ctx.anyExpanded && !isThisMsExpanded;
  const msDoneForBadge = msDone;
  const dotChecklistProps = ctx.checklist ? {
    role: "checkbox",
    "aria-checked": msDone,
    "aria-label": msDotAriaLabel,
    tabIndex: 0
  } : {};
  return /* @__PURE__ */ jsxs8(Box10, { sx: msRowSx(topPercent), children: [
    /* @__PURE__ */ jsx12(Box10, { "data-col": "left", sx: msColumnBoxSx(effectiveMsSide === "left"), children: effectiveMsSide === "left" && /* @__PURE__ */ jsx12(
      Box10,
      {
        "data-ms-card": "true",
        ref: (el) => ctx.onMeasure(mi, el),
        onClick: stopProp,
        sx: msCardWrapperSx(isThisMsExpanded, suppressElevation, "left"),
        children: /* @__PURE__ */ jsx12(
          MilestoneBadge,
          {
            milestone: ms,
            done: msDoneForBadge,
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
    /* @__PURE__ */ jsx12(Box10, { "data-col": "center", sx: centerColumnSx, children: /* @__PURE__ */ jsxs8(Box10, { sx: msDotWrapperSx(suppressElevation), children: [
      ms.date && /* @__PURE__ */ jsx12(Typography8, { variant: "caption", "aria-hidden": true, sx: floatingDatePillSx, children: ms.date }),
      /* @__PURE__ */ jsx12(
        Tooltip3,
        {
          title: resolveMilestoneTooltip(ctx.checklist, msColor, msDone, ms),
          placement: "top",
          arrow: true,
          children: /* @__PURE__ */ jsx12("span", { children: /* @__PURE__ */ jsx12(
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
    /* @__PURE__ */ jsx12(Box10, { "data-col": "right", sx: msColumnBoxSx(effectiveMsSide === "right"), children: effectiveMsSide === "right" && /* @__PURE__ */ jsx12(
      Box10,
      {
        "data-ms-card": "true",
        ref: (el) => ctx.onMeasure(mi, el),
        onClick: stopProp,
        sx: msCardWrapperSx(isThisMsExpanded, suppressElevation, "right"),
        children: /* @__PURE__ */ jsx12(
          MilestoneBadge,
          {
            milestone: ms,
            done: msDoneForBadge,
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
  ] }, `ms-row-${mi}`);
}
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
  const [localPhaseDone, setLocalPhaseDone] = useState4(
    () => Object.fromEntries(phases.map((p) => [String(p.key), p.done ?? false]))
  );
  const [localMilestoneDone, setLocalMilestoneDone] = useState4(() => {
    const sortFn = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
    const m = {};
    phases.forEach((p) => {
      const sortedMs = p.milestones ? sortFn([...p.milestones]) : [];
      sortedMs.forEach((ms, i) => {
        m[`${p.key}-${i}`] = ms.done ?? false;
      });
    });
    return m;
  });
  const [localTaskDoneMap, setLocalTaskDoneMap] = useState4(() => {
    const sortFn = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
    const t = {};
    phases.forEach((p) => {
      p.children?.forEach((task, ti) => {
        t[`${p.key}-t${ti}`] = task.done ?? false;
      });
      const sortedMs = p.milestones ? sortFn([...p.milestones]) : [];
      sortedMs.forEach((ms, mi) => {
        ms.children?.forEach((task, ti) => {
          t[`${p.key}-m${mi}-t${ti}`] = task.done ?? false;
        });
      });
    });
    return t;
  });
  useEffect2(() => {
    const sortFn = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
    setLocalPhaseDone(Object.fromEntries(phases.map((p) => [String(p.key), p.done ?? false])));
    const m = {};
    phases.forEach((p) => {
      const sortedMs = p.milestones ? sortFn([...p.milestones]) : [];
      sortedMs.forEach((ms, i) => {
        m[`${p.key}-${i}`] = ms.done ?? false;
      });
    });
    setLocalMilestoneDone(m);
    const t = {};
    phases.forEach((p) => {
      p.children?.forEach((task, ti) => {
        t[`${p.key}-t${ti}`] = task.done ?? false;
      });
      const sortedMs = p.milestones ? sortFn([...p.milestones]) : [];
      sortedMs.forEach((ms, mi) => {
        ms.children?.forEach((task, ti) => {
          t[`${p.key}-m${mi}-t${ti}`] = task.done ?? false;
        });
      });
    });
    setLocalTaskDoneMap(t);
  }, [phases, sortOrder]);
  const [phaseToggleCounts, setPhaseToggleCounts] = useState4({});
  const [expandedMilestoneMap, setExpandedMilestoneMap] = useState4(
    {}
  );
  const [expandedPhaseKey, setExpandedPhaseKey] = useState4(null);
  const handleExpandMilestone = useCallback4((phaseKey, milestoneIndex) => {
    const k = String(phaseKey);
    setExpandedPhaseKey(null);
    setExpandedMilestoneMap((prev) => ({
      ...prev,
      [k]: prev[k] === milestoneIndex ? null : milestoneIndex
    }));
  }, []);
  const handleExpandPhaseCard = useCallback4((phaseKey) => {
    setExpandedMilestoneMap({});
    setExpandedPhaseKey((prev) => prev === phaseKey ? null : phaseKey);
  }, []);
  const stopCardPropagation = useCallback4((e) => e.stopPropagation(), []);
  const handleTogglePhase = useCallback4(
    (key) => {
      setPhaseToggleCounts((prev) => ({ ...prev, [String(key)]: (prev[String(key)] ?? 0) + 1 }));
      const next = !localPhaseDone[String(key)];
      setLocalPhaseDone((prev) => ({ ...prev, [String(key)]: next }));
      onTogglePhaseDone?.(key, next);
    },
    [localPhaseDone, onTogglePhaseDone]
  );
  const handleToggleMilestone = useCallback4(
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
    [localMilestoneDone, phases, localPhaseDone, onToggleMilestoneDone, onTogglePhaseDone]
  );
  const handleToggleTask = useCallback4(
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
      localMilestoneDone,
      localPhaseDone,
      phases,
      checklist,
      onToggleTaskDone,
      onToggleMilestoneDone,
      onTogglePhaseDone
    ]
  );
  const today = useMemo2(() => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const sortMilestones = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
  const sorted = useMemo2(
    () => sortPhasesByDate(phases, sortOrder).map((phase) => ({
      ...phase,
      milestones: phase.milestones ? sortMilestones(phase.milestones) : phase.milestones
    })),
    [phases, sortOrder, sortMilestones]
  );
  const overlappingKeys = useMemo2(() => detectPhaseOverlaps(phases), [phases]);
  const lastKey = sorted.at(-1)?.key;
  const anyExpanded = useMemo2(
    () => expandedPhaseKey !== null || Object.values(expandedMilestoneMap).some((v) => v !== null),
    [expandedPhaseKey, expandedMilestoneMap]
  );
  useEffect2(() => {
    if (!anyExpanded) return void 0;
    const handler = () => {
      setExpandedMilestoneMap({});
      setExpandedPhaseKey(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [anyExpanded]);
  const msHeightMapRef = useRef2({});
  const [msSlotHeights, setMsSlotHeights] = useState4({});
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
  return /* @__PURE__ */ jsx12(Box10, { sx: [{ position: "relative" }, ...Array.isArray(sx) ? sx : [sx]], ...other, children: /* @__PURE__ */ jsx12(Timeline, { sx: timelineRootSx, children: sorted.map((phase, i) => {
    const { isDone, isOverdue, dotColor, yearLabelValue, phaseMilestones, isLastPhase } = resolvePhaseState(phase, i, sorted, lastKey, checklist, localPhaseDone, today);
    if (phase.variant === "marker") {
      const markerTooltip = resolvePhaseTooltip(checklist, dotColor, isDone, phase);
      return /* @__PURE__ */ jsx12(Box10, { component: "li", "data-testid": "tl-item", sx: markerPhaseLiSx, children: /* @__PURE__ */ jsxs8(Box10, { sx: markerRowInnerSx, children: [
        /* @__PURE__ */ jsx12(Box10, { sx: markerLeftLabelSx, children: phase.side === "left" && /* @__PURE__ */ jsxs8(Typography8, { variant: "caption", sx: markerCaptionSx, children: [
          phase.shortTitle ?? phase.title,
          phase.date && /* @__PURE__ */ jsxs8(Box10, { component: "span", sx: markerDateSpanSx, children: [
            "\xB7 ",
            phase.date
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs8(Box10, { "data-col": "center", sx: markerCenterSx, children: [
          /* @__PURE__ */ jsx12(Tooltip3, { title: markerTooltip, placement: "top", arrow: true, children: /* @__PURE__ */ jsx12("span", { children: /* @__PURE__ */ jsx12(
            TimelineDot,
            {
              icon: phase.icon,
              color: dotColor,
              size: "milestone",
              done: isDone
            }
          ) }) }),
          !isLastPhase && /* @__PURE__ */ jsx12(SpineConnector, { dotColor, yearMilestone: yearLabelValue })
        ] }),
        /* @__PURE__ */ jsx12(Box10, { sx: markerRightLabelSx, children: phase.side !== "left" && /* @__PURE__ */ jsxs8(Typography8, { variant: "caption", sx: markerCaptionSx, children: [
          phase.shortTitle ?? phase.title,
          phase.date && /* @__PURE__ */ jsxs8(Box10, { component: "span", sx: markerDateSpanSx, children: [
            "\xB7 ",
            phase.date
          ] })
        ] }) })
      ] }) }, phase.key);
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
    const phaseCardNode = /* @__PURE__ */ jsx12(Box10, { onClick: stopCardPropagation, children: /* @__PURE__ */ jsx12(
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
    const phaseMinHeight = phaseMilestones.length > 0 ? (phaseMilestones.length + 1) * (yearLabelValue !== null ? Math.max(
      msSlotHeights[String(phase.key)] ?? milestoneSlotHeight,
      yearLabelMarginBottom + 80
    ) : Math.max(milestoneSlotHeight, msSlotHeights[String(phase.key)] ?? 0)) : void 0;
    rows.push(
      /* @__PURE__ */ jsxs8(Box10, { sx: phaseRowSx(anyExpanded && expandedPhaseKey !== phase.key), children: [
        /* @__PURE__ */ jsx12(
          TimelineColumn,
          {
            columnSide: "left",
            hasContent: phase.side === "left",
            bottomPadding: phaseCardGap,
            children: phase.side === "left" && phaseCardNode
          }
        ),
        /* @__PURE__ */ jsxs8(Box10, { "data-col": "center", sx: centerColumnSx, children: [
          /* @__PURE__ */ jsxs8(Box10, { sx: { position: "relative", display: "inline-flex" }, children: [
            !phase.hideDate && phase.date && /* @__PURE__ */ jsx12(Typography8, { variant: "caption", "aria-hidden": true, sx: floatingDatePillSx, children: phase.date }),
            /* @__PURE__ */ jsx12(
              Tooltip3,
              {
                title: resolvePhaseTooltip(checklist, dotColor, isDone, phase),
                placement: "top",
                arrow: true,
                children: /* @__PURE__ */ jsx12("span", { children: /* @__PURE__ */ jsx12(
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
          !isLastPhase && /* @__PURE__ */ jsx12(
            SpineConnector,
            {
              dotColor,
              yearMilestone: yearLabelValue,
              yearLabelMarginBottom
            }
          )
        ] }),
        /* @__PURE__ */ jsx12(
          TimelineColumn,
          {
            columnSide: "right",
            hasContent: phase.side === "right",
            bottomPadding: phaseCardGap,
            children: phase.side === "right" && phaseCardNode
          }
        )
      ] }, "phase-row")
    );
    phaseMilestones.forEach((ms, mi) => {
      rows.push(buildMilestoneRow(ms, mi, phaseMilestones.length, milestoneCtx));
    });
    return /* @__PURE__ */ jsx12(
      Box10,
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
  }) }) });
}

// src/components/action-bar/icon/icon-action-bar.tsx
import Box11 from "@mui/material/Box";
import Tooltip4 from "@mui/material/Tooltip";
import IconButton2 from "@mui/material/IconButton";

// src/components/action-bar/icon/icon-action-bar.styles.ts
var iconActionBarRootSx = {
  gap: 1,
  width: 1,
  flexGrow: 1,
  display: "flex"
};

// src/components/action-bar/icon/icon-action-bar.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
var DEFAULT_ICON_ACTIONS = [
  { tooltip: "Edit", icon: /* @__PURE__ */ jsx13(GiselleIcon, { icon: "solar:pen-bold" }) },
  { tooltip: "View", icon: /* @__PURE__ */ jsx13(GiselleIcon, { icon: "solar:eye-bold" }) },
  { tooltip: "Print", icon: /* @__PURE__ */ jsx13(GiselleIcon, { icon: "solar:printer-minimalistic-bold" }) },
  { tooltip: "Send", icon: /* @__PURE__ */ jsx13(GiselleIcon, { icon: "mdi:email" }) },
  { tooltip: "Share", icon: /* @__PURE__ */ jsx13(GiselleIcon, { icon: "solar:share-bold" }) }
];
function IconActionBar({
  actions = DEFAULT_ICON_ACTIONS,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx13(Box11, { sx: [iconActionBarRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: actions.map((item, index) => {
    const label = item["aria-label"] ?? item.tooltip;
    const buttonProps = {
      onClick: item.onClick,
      disabled: item.disabled,
      "aria-label": label,
      ...item.component !== void 0 && { component: item.component },
      ...item.href !== void 0 && { href: item.href }
    };
    return /* @__PURE__ */ jsx13(
      Tooltip4,
      {
        title: item.tooltip,
        placement: item.tooltipPlacement ?? "bottom",
        children: /* @__PURE__ */ jsx13("span", { children: /* @__PURE__ */ jsx13(IconButton2, { ...buttonProps, children: item.icon }) })
      },
      `${item.tooltip}-${index}`
    );
  }) });
}

// src/components/layout/two-column-showcase-row/two-column-showcase-row.tsx
import Box12 from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack2 from "@mui/material/Stack";
import Typography9 from "@mui/material/Typography";
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs9(
    Grid,
    {
      container: true,
      columnSpacing: isVertical ? 0 : { xs: 0, md: 6 },
      rowSpacing: { xs: 4, md: isVertical ? 4 : 0 },
      direction: { xs: "column", md: orientation },
      sx: [{}, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        text && /* @__PURE__ */ jsx14(Grid, { size: itemSize, children: /* @__PURE__ */ jsxs9(
          Stack2,
          {
            spacing: 2,
            sx: [{ maxWidth: 520 }, ...Array.isArray(textSx) ? textSx : [textSx]],
            children: [
              text.overline && /* @__PURE__ */ jsx14(Typography9, { variant: "overline", sx: { color: "text.secondary" }, children: text.overline }),
              text.heading && /* @__PURE__ */ jsx14(Typography9, { variant: "h4", children: text.heading }),
              text.description && /* @__PURE__ */ jsx14(Typography9, { variant: "body1", color: "text.secondary", children: text.description })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx14(Grid, { size: itemSize, sx: { minWidth: 0 }, children: /* @__PURE__ */ jsx14(
          Stack2,
          {
            spacing: 2,
            sx: [
              { alignItems: controlsAlign, width: 1, minWidth: 0 },
              ...Array.isArray(controlsSx) ? controlsSx : [controlsSx]
            ],
            children: /* @__PURE__ */ jsx14(Box12, { sx: { width: 1, minWidth: 0 }, children: controls })
          }
        ) })
      ]
    }
  );
}

// src/components/layout/section-title/section-title.tsx
import Box13 from "@mui/material/Box";
import Typography10 from "@mui/material/Typography";

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

// src/components/layout/section-title/section-title.tsx
import { jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
function SectionTitle({
  sx,
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  ...other
}) {
  return /* @__PURE__ */ jsxs10(
    Box13,
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
        caption && /* @__PURE__ */ jsx15(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
        /* @__PURE__ */ jsxs10(Typography10, { component: "h2", variant: "h2", sx: slotProps?.title?.sx, children: [
          title,
          " ",
          txtGradient && /* @__PURE__ */ jsx15(Box13, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
        ] }),
        description && /* @__PURE__ */ jsx15(
          Box13,
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
function SectionCaption({ title, sx, ...other }) {
  return /* @__PURE__ */ jsx15(
    Box13,
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

// src/components/nav/floating-sub-nav/floating-sub-nav.tsx
import { useCallback as useCallback5 } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Box14 from "@mui/material/Box";
import Stack3 from "@mui/material/Stack";
import Tooltip5 from "@mui/material/Tooltip";
import ButtonBase2 from "@mui/material/ButtonBase";

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

// src/components/nav/floating-sub-nav/floating-sub-nav.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
function NavPill({
  items,
  activeId,
  onPress
}) {
  return /* @__PURE__ */ jsx16(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 10 },
      transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
      children: /* @__PURE__ */ jsx16(
        Stack3,
        {
          direction: "column",
          alignItems: "center",
          role: "navigation",
          "aria-label": "Section navigation",
          sx: pillSx,
          children: /* @__PURE__ */ jsx16(Stack3, { direction: "row", spacing: 0.5, children: items.map((item) => /* @__PURE__ */ jsx16(
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
function FloatingSubNav({ items, activeId, onSelect, sticky = false }) {
  const handlePress = useCallback5((id) => onSelect(id), [onSelect]);
  if (sticky) {
    return /* @__PURE__ */ jsx16(Box14, { sx: stickyWrapperSx, children: /* @__PURE__ */ jsx16(Box14, { sx: stickyInnerSx, children: /* @__PURE__ */ jsx16(AnimatePresence, { children: activeId !== null && /* @__PURE__ */ jsx16(NavPill, { items, activeId, onPress: handlePress }) }) }) });
  }
  return /* @__PURE__ */ jsx16(AnimatePresence, { children: activeId !== null && /* @__PURE__ */ jsx16(Box14, { sx: fixedWrapperSx, children: /* @__PURE__ */ jsx16(NavPill, { items, activeId, onPress: handlePress }) }) });
}
function SubNavButton({ item, isActive, onPress }) {
  const handleClick = useCallback5(() => onPress(item.id), [onPress, item.id]);
  return /* @__PURE__ */ jsx16(Tooltip5, { title: item.label, placement: "top", arrow: true, children: /* @__PURE__ */ jsx16(
    ButtonBase2,
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

// src/components/layout/section-container/section-container.tsx
import Container from "@mui/material/Container";
import { jsx as jsx17 } from "react/jsx-runtime";
function SectionContainer({
  children,
  maxWidth = "lg",
  py = { xs: 8, md: 12 },
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx17(Container, { maxWidth, sx: [{ py }, ...Array.isArray(sx) ? sx : [sx]], ...other, children });
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
import { lazy, Suspense, useMemo as useMemo3 } from "react";
import Card2 from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider2 from "@mui/material/Divider";
import Box15 from "@mui/material/Box";
import Typography11 from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

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
import { jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
var ReactApexChart = lazy(() => import("react-apexcharts"));
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
  const theme = useTheme();
  const resolvedColors = useMemo3(
    () => series.map((item) => theme.palette[item.color].main),
    [series, theme]
  );
  const chartSeries = useMemo3(() => series.map((s) => s.value), [series]);
  const chartLabels = useMemo3(() => series.map((s) => s.label), [series]);
  const chartOptions = useMemo3(
    () => buildRadialProgressOptions(theme, chartLabels, resolvedColors, total, totalLabel),
    [theme, chartLabels, resolvedColors, total, totalLabel]
  );
  return /* @__PURE__ */ jsxs11(Card2, { sx: [{}, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    (title !== void 0 || subheader !== void 0) && /* @__PURE__ */ jsx18(CardHeader, { title, subheader }),
    /* @__PURE__ */ jsxs11(CardContent, { children: [
      /* @__PURE__ */ jsx18(Box15, { sx: chartWrapSx, children: /* @__PURE__ */ jsx18(Suspense, { fallback: /* @__PURE__ */ jsx18(Box15, { sx: { height: chartHeight } }), children: /* @__PURE__ */ jsx18(
        ReactApexChart,
        {
          type: "radialBar",
          series: chartSeries,
          options: chartOptions,
          width: "100%",
          height: chartHeight
        }
      ) }) }),
      /* @__PURE__ */ jsx18(Divider2, { sx: { my: 2 } }),
      /* @__PURE__ */ jsx18(Box15, { sx: legendRowSx, children: series.map((item, i) => /* @__PURE__ */ jsxs11(Box15, { sx: legendItemSx, children: [
        /* @__PURE__ */ jsx18(Box15, { sx: legendDotSx(resolvedColors[i] ?? theme.palette.primary.main) }),
        /* @__PURE__ */ jsx18(Typography11, { variant: "subtitle2", children: item.label }),
        /* @__PURE__ */ jsxs11(Typography11, { variant: "caption", sx: legendValueSx, children: [
          item.value,
          "%"
        ] })
      ] }, item.label)) })
    ] })
  ] });
}
export {
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
  resolveMaturityColor,
  resolveMaturityLabel
};
//# sourceMappingURL=index.js.map