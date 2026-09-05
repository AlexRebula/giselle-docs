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
function channelAlpha(channel, alpha2) {
  return `rgba(${channel} / ${alpha2})`;
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

// src/utils/is-deep-equal.ts
function isDeepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isDeepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (typeof a === "object") {
    if (Array.isArray(b)) return false;
    const objA = a;
    const objB = b;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
      if (!isDeepEqual(objA[key], objB[key])) return false;
    }
    return true;
  }
  return false;
}

// src/utils/cookie.ts
function getCookieValue(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${encodeURIComponent(name)}=`));
  if (!match) return null;
  const raw = match.split("=").slice(1).join("=");
  try {
    return decodeURIComponent(raw);
  } catch {
    return null;
  }
}
function setCookieValue(name, value, options = {}) {
  if (typeof document === "undefined") return;
  const { maxAge, path = "/", sameSite = "Lax" } = options;
  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `path=${path}`,
    `SameSite=${sameSite}`
  ];
  if (maxAge !== void 0) parts.push(`max-age=${maxAge}`);
  if (sameSite === "None") parts.push("Secure");
  document.cookie = parts.join("; ");
}

// src/utils/use-local-storage.ts
import { useState, useEffect, useCallback } from "react";
function readFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeToStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}
function removeFromStorage(key) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
  }
}
function useLocalStorage(key, initialValue) {
  const [state, setStateInternal] = useState(initialValue);
  useEffect(() => {
    const stored = readFromStorage(key, initialValue);
    setStateInternal(stored);
  }, [key]);
  const setState = useCallback(
    (partial) => {
      setStateInternal((prev) => {
        const next = { ...prev, ...partial };
        writeToStorage(key, next);
        return next;
      });
    },
    [key]
  );
  const setField = useCallback(
    (field, value) => {
      setStateInternal((prev) => {
        const next = { ...prev, [field]: value };
        writeToStorage(key, next);
        return next;
      });
    },
    [key]
  );
  const resetState = useCallback(
    (defaults) => {
      removeFromStorage(key);
      setStateInternal(defaults);
    },
    [key]
  );
  return { state, setState, setField, resetState };
}

// src/utils/theme-preset.ts
import { extendTheme } from "@mui/material/styles";
var GISELLE_PRIMARY_MAIN = "#2E7D32";
var GISELLE_PRIMARY_DARK_MAIN = "#76C442";
var GISELLE_SECONDARY_MAIN = "#F5A623";
var giselleThemeOptions = {
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
};
var giselleTheme = extendTheme(giselleThemeOptions);

// src/components/theme-provider/giselle/giselle.tsx
import { useMemo } from "react";
import { ThemeProvider, extendTheme as extendTheme2 } from "@mui/material/styles";

// src/utils/deep-merge.ts
var DANGEROUS_KEYS = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
function deepMerge(base, override) {
  const result = { ...base };
  const src = override;
  for (const key of Object.keys(src)) {
    if (DANGEROUS_KEYS.has(key)) continue;
    const baseVal = result[key];
    const overrideVal = src[key];
    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = deepMerge(
        baseVal,
        overrideVal
      );
    } else if (overrideVal !== void 0) {
      result[key] = overrideVal;
    }
  }
  return result;
}
function isPlainObject(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val) && Object.getPrototypeOf(val) === Object.prototype;
}

// src/components/theme-provider/giselle/giselle.tsx
import { jsx } from "react/jsx-runtime";
function GiselleThemeProvider({
  children,
  themeOverrides,
  theme,
  defaultMode = "system"
}) {
  const resolvedTheme = useMemo(
    () => theme ?? (themeOverrides ? extendTheme2(deepMerge(giselleThemeOptions, themeOverrides)) : giselleTheme),
    [theme, themeOverrides]
  );
  return /* @__PURE__ */ jsx(ThemeProvider, { theme: resolvedTheme, defaultMode, children });
}

// src/components/settings-provider/settings-provider.tsx
import { useCallback as useCallback2, useEffect as useEffect2, useMemo as useMemo2, useRef, useState as useState2 } from "react";

// src/components/settings-provider/settings-context.ts
import { createContext, useContext } from "react";
var GiselleSettingsContext = createContext(null);
function useGiselleSettings() {
  const ctx = useContext(GiselleSettingsContext);
  if (ctx === null) {
    throw new Error("useGiselleSettings must be called within a <GiselleSettingsProvider>.");
  }
  return ctx;
}

// src/components/settings-provider/settings-provider.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var DEFAULT_STORAGE_KEY = "giselle-settings";
function buildLocalStorageAdapter(storageKey) {
  return {
    get: () => {
      if (typeof window === "undefined") return null;
      try {
        const raw = window.localStorage.getItem(storageKey);
        return raw !== null ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    },
    set: (value) => {
      if (typeof window === "undefined") return;
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(value));
      } catch {
      }
    },
    clear: () => {
      if (typeof window === "undefined") return;
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
      }
    }
  };
}
function buildCookieAdapter(storageKey) {
  return {
    get: () => {
      const raw = getCookieValue(storageKey);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    },
    set: (value) => {
      setCookieValue(storageKey, JSON.stringify(value), { path: "/", sameSite: "Lax" });
    },
    clear: () => {
      setCookieValue(storageKey, "", { maxAge: 0, path: "/" });
    }
  };
}
function resolveAdapter(storage, storageKey) {
  if (storage === "localStorage") return buildLocalStorageAdapter(storageKey);
  if (storage === "cookie") return buildCookieAdapter(storageKey);
  return storage;
}
function GiselleSettingsProvider({
  children,
  defaultSettings,
  initialState,
  storageKey = DEFAULT_STORAGE_KEY,
  storage = "localStorage"
}) {
  const adapterRef = useRef(resolveAdapter(storage, storageKey));
  adapterRef.current = resolveAdapter(storage, storageKey);
  const [state, setStateRaw] = useState2(initialState ?? defaultSettings);
  useEffect2(() => {
    if (initialState !== void 0) return;
    const stored = adapterRef.current.get();
    if (stored === null) return;
    if (stored.version !== defaultSettings.version) {
      adapterRef.current.clear();
      return;
    }
    setStateRaw(stored);
  }, []);
  const [openDrawer, setOpenDrawer] = useState2(false);
  const setState = useCallback2((partial) => {
    setStateRaw((prev) => {
      const next = { ...prev, ...partial };
      adapterRef.current.set(next);
      return next;
    });
  }, []);
  const setField = useCallback2((key, value2) => {
    setStateRaw((prev) => {
      const next = { ...prev, [key]: value2 };
      adapterRef.current.set(next);
      return next;
    });
  }, []);
  const onReset = useCallback2(() => {
    adapterRef.current.clear();
    setStateRaw(defaultSettings);
  }, [defaultSettings]);
  const onCloseDrawer = useCallback2(() => setOpenDrawer(false), []);
  const onToggleDrawer = useCallback2(() => setOpenDrawer((prev) => !prev), []);
  const canReset = useMemo2(() => !isDeepEqual(state, defaultSettings), [state, defaultSettings]);
  const value = useMemo2(
    () => ({
      state,
      setState,
      setField,
      canReset,
      onReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer
    }),
    [state, setState, setField, canReset, onReset, openDrawer, onCloseDrawer, onToggleDrawer]
  );
  return /* @__PURE__ */ jsx2(
    GiselleSettingsContext.Provider,
    {
      value,
      children
    }
  );
}

// src/components/settings-provider/theme-and-settings-provider.tsx
import { Fragment } from "react";

// src/components/settings-provider/settings-theme-bridge.tsx
import { useEffect as useEffect3 } from "react";
import { useColorScheme } from "@mui/material/styles";
function SettingsThemeBridge({
  getMode
}) {
  const { state } = useGiselleSettings();
  const { setMode } = useColorScheme();
  const mode = getMode?.(state);
  useEffect3(() => {
    if (mode !== void 0) {
      setMode(mode);
    }
  }, [mode, setMode]);
  return null;
}

// src/components/settings-provider/theme-and-settings-provider.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function GiselleThemeAndSettingsProvider({
  children,
  defaultSettings,
  initialState,
  storageKey,
  storage,
  themeOverrides,
  theme,
  defaultMode,
  getMode
}) {
  return /* @__PURE__ */ jsx3(GiselleThemeProvider, { themeOverrides, theme, defaultMode, children: /* @__PURE__ */ jsx3(
    GiselleSettingsProvider,
    {
      defaultSettings,
      initialState,
      storageKey,
      storage,
      children: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx3(SettingsThemeBridge, { getMode }),
        children
      ] })
    }
  ) });
}

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
import { jsx as jsx4 } from "react/jsx-runtime";
function GiselleIcon({
  icon,
  width = 20,
  height,
  sx,
  className,
  style,
  flip,
  rotate,
  ...other
}) {
  const h = height ?? width;
  return /* @__PURE__ */ jsx4(
    Box,
    {
      component: "span",
      sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ jsx4(
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
      )
    }
  );
}

// src/components/accordion/accordion.tsx
import { useId } from "react";
import Box2 from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

// src/components/inputs/button/toggle/icon/icon.tsx
import { useCallback as useCallback3 } from "react";
import IconButton from "@mui/material/IconButton";

// src/components/inputs/button/toggle/icon/icon.defaults.tsx
import SvgIcon from "@mui/material/SvgIcon";

// src/components/inputs/button/toggle/icon/icon.const.ts
var TOGGLE_ICON_SIZE = 20;
var TOGGLE_MIN_TOUCH_TARGET = 28;

// src/components/inputs/button/toggle/icon/icon.styles.ts
var rootSx = {
  padding: 0,
  flexShrink: 0,
  alignSelf: "center",
  minWidth: TOGGLE_MIN_TOUCH_TARGET,
  minHeight: TOGGLE_MIN_TOUCH_TARGET,
  // idle (not pressed)
  "& .ti-idle": { display: "flex", alignItems: "center" },
  "& .ti-pressed": { display: "none" },
  "& .ti-hover": { display: "none" },
  // pressed
  '&[aria-pressed="true"] .ti-idle': { display: "none" },
  '&[aria-pressed="true"] .ti-pressed': { display: "flex", alignItems: "center" },
  // hover (any pressed state)
  "&:hover .ti-idle": { display: "none" },
  "&:hover .ti-pressed": { display: "none" },
  "&:hover .ti-hover": { display: "flex", alignItems: "center" },
  // keyboard focus-visible
  "&:focus-visible .ti-idle": { display: "none" },
  "&:focus-visible .ti-pressed": { display: "none" },
  "&:focus-visible .ti-hover": { display: "flex", alignItems: "center" }
};
var defaultIconSvgSx = {
  color: "success.main",
  fontSize: TOGGLE_ICON_SIZE
};

// src/components/inputs/button/toggle/icon/icon.defaults.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var DEFAULT_PRESSED_ICON = /* @__PURE__ */ jsx5(SvgIcon, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx5("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
var DEFAULT_HOVER_ICON = /* @__PURE__ */ jsx5(SvgIcon, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx5("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });

// src/components/inputs/button/toggle/icon/icon.tsx
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
function ToggleIconButton({
  pressed,
  idleIcon,
  pressedIcon = DEFAULT_PRESSED_ICON,
  hoverIcon = DEFAULT_HOVER_ICON,
  onPressedChange,
  sx,
  ...other
}) {
  const handleClick = useCallback3(
    (e) => {
      e.stopPropagation();
      onPressedChange?.(!pressed);
    },
    [pressed, onPressedChange]
  );
  return /* @__PURE__ */ jsxs2(
    IconButton,
    {
      onClick: handleClick,
      "aria-pressed": pressed,
      size: "small",
      sx: [rootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        /* @__PURE__ */ jsx6("span", { className: "ti-idle", children: idleIcon }),
        /* @__PURE__ */ jsx6("span", { className: "ti-pressed", children: pressedIcon }),
        /* @__PURE__ */ jsx6("span", { className: "ti-hover", children: hoverIcon })
      ]
    }
  );
}

// src/components/accordion/accordion.styles.ts
var accordionRootSx = {};
var summaryRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5
};
var checkboxSx = {
  flexShrink: 0,
  alignSelf: "center"
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

// src/components/accordion/accordion.tsx
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
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
  const id = useId();
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
    leadingElement = checkIcon === void 0 ? /* @__PURE__ */ jsx7(
      Checkbox,
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
    ) : /* @__PURE__ */ jsx7(
      ToggleIconButton,
      {
        pressed: done,
        idleIcon: checkIcon,
        pressedIcon: checkDoneIcon,
        hoverIcon: checkHoverIcon,
        onPressedChange: onDoneButtonClick,
        "aria-label": done ? "Mark as not done" : "Mark as done"
      }
    );
  } else if (leadingAction === void 0) {
    leadingElement = /* @__PURE__ */ jsx7(Box2, { "aria-hidden": "true", sx: leadingIconSx, children: leadingIcon });
  } else {
    leadingElement = leadingAction;
  }
  const summaryContent = typeof title === "string" ? /* @__PURE__ */ jsx7(Typography, { component: "span", variant: "subtitle1", children: title }) : title;
  const accordionSummary = /* @__PURE__ */ jsxs3(
    AccordionSummary,
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
  return /* @__PURE__ */ jsxs3(MuiAccordion, { sx: [accordionRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    hasLeadingElement ? /* @__PURE__ */ jsxs3(Box2, { sx: summaryRowSx, children: [
      leadingElement,
      accordionSummary
    ] }) : accordionSummary,
    /* @__PURE__ */ jsx7(AccordionDetails, { id: detailsId, children })
  ] });
}

// src/components/accordion/accordion.const.ts
var ACCORDION_DONE_MIN_TOUCH_TARGET = 24;

// src/components/card/metric/metric-card.tsx
import Box4 from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography2 from "@mui/material/Typography";

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
import Box3 from "@mui/material/Box";
import { jsx as jsx8 } from "react/jsx-runtime";
function MetricCardDecoration({
  color = "primary",
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx8(Box3, { sx: [metricCardDecorationSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other });
}

// src/components/card/metric/metric-card.tsx
import { jsx as jsx9, jsxs as jsxs4 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs4(
    Paper,
    {
      elevation,
      sx: [metricCardPaperSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        decoration && /* @__PURE__ */ jsx9(Box4, { "aria-hidden": "true", sx: decorationOverlaySx, children: decoration }),
        /* @__PURE__ */ jsxs4(Box4, { sx: metricCardContentSx, children: [
          /* @__PURE__ */ jsx9(Box4, { sx: { typography: "h3" }, children: value }),
          /* @__PURE__ */ jsx9(Typography2, { noWrap: true, variant: "subtitle2", component: "div", sx: { color: "text.secondary" }, children: label }),
          sublabel && /* @__PURE__ */ jsx9(
            Typography2,
            {
              noWrap: true,
              variant: "caption",
              component: "div",
              sx: { color: "text.disabled", mt: 0.25 },
              children: sublabel
            }
          )
        ] }),
        icon && /* @__PURE__ */ jsx9(Box4, { "aria-hidden": "true", sx: metricCardIconBoxSx(color), children: icon })
      ]
    }
  );
}

// src/components/card/selectable/selectable-card.tsx
import ButtonBase from "@mui/material/ButtonBase";

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
import { jsx as jsx10 } from "react/jsx-runtime";
function SelectableCard({
  selected = false,
  disabled = false,
  children,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx10(
    ButtonBase,
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
import Box5 from "@mui/material/Box";
import Paper2 from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography3 from "@mui/material/Typography";

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
import { jsx as jsx11, jsxs as jsxs5 } from "react/jsx-runtime";
function QuoteCard({
  quote,
  author,
  source,
  color = "primary",
  elevation = 0,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx11(
    Paper2,
    {
      elevation,
      sx: [quoteCardPaperSx(color), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ jsxs5(Box5, { sx: { display: "flex", gap: 2 }, children: [
        /* @__PURE__ */ jsx11(Typography3, { "aria-hidden": true, sx: quoteMarkSx(color), children: "\u201C" }),
        /* @__PURE__ */ jsxs5(Box5, { sx: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx11(Typography3, { variant: "body1", sx: quoteTextSx, children: quote }),
          (author || source) && /* @__PURE__ */ jsxs5(
            Stack,
            {
              direction: "row",
              spacing: 0.75,
              alignItems: "center",
              sx: { mt: 2, color: "text.disabled" },
              children: [
                author && /* @__PURE__ */ jsx11(Typography3, { variant: "caption", sx: { fontWeight: "fontWeightMedium" }, children: author }),
                author && source && /* @__PURE__ */ jsx11(Typography3, { variant: "caption", "aria-hidden": true, sx: { opacity: 0.6 }, children: "\xB7" }),
                source && /* @__PURE__ */ jsx11(Typography3, { variant: "caption", sx: { opacity: 0.72 }, children: source })
              ]
            }
          )
        ] })
      ] })
    }
  );
}

// src/components/card/stat/stat-card.tsx
import Box6 from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography4 from "@mui/material/Typography";

// src/components/card/stat/stat-card.const.ts
var STAT_CARD_ICON_BOX_SIZE = 48;
var STAT_CARD_LABELS_MIN_WIDTH = 112;

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
  width: STAT_CARD_ICON_BOX_SIZE,
  height: STAT_CARD_ICON_BOX_SIZE,
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
  minWidth: STAT_CARD_LABELS_MIN_WIDTH
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
import { jsx as jsx12, jsxs as jsxs6 } from "react/jsx-runtime";
function StatCardShape() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      width: "120",
      height: "120",
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx12(
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
        /* @__PURE__ */ jsx12(
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
import { jsx as jsx13, jsxs as jsxs7 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs7(Card, { sx: [statCardRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ jsx13(Box6, { "aria-hidden": "true", sx: decorationSx, children: /* @__PURE__ */ jsx13(StatCardShape, {}) }),
    /* @__PURE__ */ jsx13(Box6, { sx: iconBoxSx, children: icon }),
    trend !== void 0 && /* @__PURE__ */ jsxs7(Box6, { sx: trendBoxSx, children: [
      /* @__PURE__ */ jsx13(GiselleIcon, { width: 20, icon: isUp ? "eva:trending-up-fill" : "eva:trending-down-fill" }),
      /* @__PURE__ */ jsxs7(Typography4, { component: "span", variant: "subtitle2", children: [
        isUp && "+",
        trend,
        "%"
      ] }),
      trendLabel && /* @__PURE__ */ jsx13(
        Typography4,
        {
          component: "span",
          variant: "caption",
          sx: { opacity: 0.72, ml: 0.5, fontWeight: 400 },
          children: trendLabel
        }
      )
    ] }),
    /* @__PURE__ */ jsxs7(Box6, { sx: contentRowSx, children: [
      /* @__PURE__ */ jsxs7(Box6, { sx: labelsBoxSx, children: [
        /* @__PURE__ */ jsx13(Typography4, { variant: "subtitle2", sx: { mb: 0.5 }, children: label }),
        /* @__PURE__ */ jsx13(Typography4, { variant: "h4", children: value })
      ] }),
      chart
    ] })
  ] });
}

// src/components/card/stat-row/stat-card-row.tsx
import Grid from "@mui/material/Grid";
import { jsx as jsx14 } from "react/jsx-runtime";
function StatCardRow({ items, renderChart, sx, ...other }) {
  return /* @__PURE__ */ jsx14(Grid, { container: true, spacing: 3, sx: [...Array.isArray(sx) ? sx : [sx]], ...other, children: items.map((item) => /* @__PURE__ */ jsx14(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ jsx14(
    StatCard,
    {
      label: item.label,
      value: item.value,
      trend: item.trend,
      trendLabel: item.trendLabel,
      color: item.color,
      icon: /* @__PURE__ */ jsx14(GiselleIcon, { icon: item.iconId, width: 28 }),
      chart: renderChart?.(item)
    }
  ) }, item.label)) });
}

// src/components/timeline/two-column/phase-card/phase-card.tsx
import { useState as useState4, useRef as useRef2, useCallback as useCallback5 } from "react";

// src/components/timeline/two-column/phase-warning-popover/phase-warning-popover.tsx
import { useState as useState3, useCallback as useCallback4, useMemo as useMemo3, useEffect as useEffect4 } from "react";
import Box8 from "@mui/material/Box";
import Paper3 from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Slider from "@mui/material/Slider";
import Typography5 from "@mui/material/Typography";
import IconButton2 from "@mui/material/IconButton";
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
function isTaskDetails(details) {
  return Boolean(details) && !Array.isArray(details);
}
function resolveTaskChildren(item) {
  if (item.children && item.children.length > 0) return item.children;
  if (item.milestones && item.milestones.length > 0) return item.milestones;
  if (isTaskDetails(item.details) && item.details.tasks && item.details.tasks.length > 0) {
    return item.details.tasks;
  }
  if (Array.isArray(item.details) && item.details.length > 0) {
    return item.details.map((title, index) => ({ key: `detail-${index}`, title }));
  }
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
import Box7 from "@mui/material/Box";

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
import { jsx as jsx15 } from "react/jsx-runtime";
function MiniGanttRuler({ axis, conflictingPhases, overrides }) {
  const span = axis.max - axis.min;
  if (span <= 0) return null;
  const rangeList = Array.from(overrides.entries());
  return /* @__PURE__ */ jsx15(Box7, { "aria-hidden": true, sx: ganttTrackSx, children: conflictingPhases.map((phase) => {
    const override = overrides.get(phase.key);
    if (!override) return null;
    const leftPct = (override.startIdx - axis.min) / span * 100;
    const widthPct = Math.max(1, (override.endIdx - override.startIdx) / span * 100);
    const sliderColor = resolveSliderColor(phase.color);
    const isOverlapping = rangeList.some(
      ([otherKey, other]) => otherKey !== phase.key && override.startIdx <= other.endIdx && other.startIdx <= override.endIdx
    );
    return /* @__PURE__ */ jsx15(Box7, { sx: ganttBarSx(leftPct, widthPct, isOverlapping, sliderColor) }, phase.key);
  }) });
}

// src/components/timeline/two-column/phase-warning-popover/phase-warning-popover.tsx
import { jsx as jsx16, jsxs as jsxs8 } from "react/jsx-runtime";
function PhaseWarningPopover({
  open,
  anchorEl,
  onClose,
  allPhases,
  currentPhase,
  onPhasesChange
}) {
  const conflictingPhases = useMemo3(
    () => getConnectedOverlapGroup(allPhases, currentPhase.key),
    [allPhases, currentPhase.key]
  );
  const [overrides, setOverrides] = useState3(() => /* @__PURE__ */ new Map());
  const [pendingApply, setPendingApply] = useState3(false);
  useEffect4(() => {
    if (!open) return;
    const initial = /* @__PURE__ */ new Map();
    for (const p of conflictingPhases) {
      const range = parsePhaseRange(p);
      if (range) initial.set(p.key, range);
    }
    setOverrides(initial);
    setPendingApply(false);
  }, [open, conflictingPhases]);
  const axis = useMemo3(() => computeAxis(overrides), [overrides]);
  const stillOverlapping = useMemo3(() => hasRemainingOverlaps(overrides), [overrides]);
  const handleSliderChange = useCallback4((phaseKey, value) => {
    if (!Array.isArray(value)) return;
    const [start, end] = value;
    setOverrides((prev) => {
      const next = new Map(prev);
      next.set(phaseKey, { startIdx: start, endIdx: end });
      return next;
    });
    setPendingApply(false);
  }, []);
  const handleMakeSequential = useCallback4(() => {
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
  const handleApply = useCallback4(() => {
    const withOverrides = applyOverrides(conflictingPhases, overrides);
    const merged = mergeIntoAll(allPhases, withOverrides);
    onPhasesChange(merged);
    onClose();
  }, [conflictingPhases, overrides, allPhases, onPhasesChange, onClose]);
  const handleCancel = useCallback4(() => {
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
  return /* @__PURE__ */ jsx16(
    Popper,
    {
      open,
      anchorEl,
      placement: "bottom-start",
      modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
      sx: { zIndex: (theme) => theme.zIndex.tooltip + 1 },
      children: /* @__PURE__ */ jsx16(ClickAwayListener, { onClickAway: onClose, children: /* @__PURE__ */ jsxs8(Paper3, { elevation: 8, sx: popoverPaperSx, children: [
        /* @__PURE__ */ jsxs8(Box8, { sx: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxs8(
            Typography5,
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
          /* @__PURE__ */ jsx16(
            IconButton2,
            {
              size: "small",
              onClick: onClose,
              "aria-label": "Close warning panel",
              sx: { ml: "auto" },
              children: "\xD7"
            }
          )
        ] }),
        /* @__PURE__ */ jsx16(Divider, {}),
        /* @__PURE__ */ jsxs8(Box8, { children: [
          /* @__PURE__ */ jsx16(Typography5, { variant: "body2", color: "warning.main", sx: { fontWeight: 500 }, children: `Overlap: ${conflictingPhases.map((p) => p.shortTitle ?? p.title).join(" \u2194 ")}` }),
          /* @__PURE__ */ jsxs8(Typography5, { variant: "caption", color: "text.secondary", sx: { mt: 0.5, display: "block" }, children: [
            currentPhase.shortTitle ?? currentPhase.title,
            " \u2014 adjust sliders or use Make sequential."
          ] })
        ] }),
        /* @__PURE__ */ jsx16(Divider, {}),
        /* @__PURE__ */ jsx16(Box8, { sx: { display: "flex", flexDirection: "column", gap: 1.5 }, children: conflictingPhases.map((phase) => {
          const override = overrides.get(phase.key);
          if (!override) return null;
          const sliderColor = resolveSliderColor(phase.color);
          return /* @__PURE__ */ jsxs8(Box8, { children: [
            /* @__PURE__ */ jsxs8(Box8, { sx: sliderRowHeaderSx, children: [
              /* @__PURE__ */ jsx16(Typography5, { variant: "caption", fontWeight: 600, children: phase.shortTitle ?? phase.title }),
              /* @__PURE__ */ jsxs8(Typography5, { variant: "caption", color: "text.secondary", children: [
                monthIndexToDate(override.startIdx),
                " \u2013 ",
                monthIndexToDate(override.endIdx)
              ] })
            ] }),
            /* @__PURE__ */ jsx16(
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
        /* @__PURE__ */ jsx16(MiniGanttRuler, { axis, conflictingPhases, overrides }),
        /* @__PURE__ */ jsx16(Divider, {}),
        /* @__PURE__ */ jsxs8(Box8, { sx: actionsRowSx, children: [
          /* @__PURE__ */ jsx16(
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
          pendingApply && /* @__PURE__ */ jsxs8(Box8, { sx: { display: "flex", gap: 1 }, children: [
            /* @__PURE__ */ jsx16(
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
            /* @__PURE__ */ jsx16(
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
import Box14 from "@mui/material/Box";
import Paper4 from "@mui/material/Paper";
import Tooltip3 from "@mui/material/Tooltip";
import Typography10 from "@mui/material/Typography";

// src/components/timeline/two-column/icons.tsx
import { jsx as jsx17, jsxs as jsxs9 } from "react/jsx-runtime";
var DEFAULT_EXPANDABLE_ICON = /* @__PURE__ */ jsx17(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    children: /* @__PURE__ */ jsx17("g", { children: /* @__PURE__ */ jsxs9("g", { fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd", children: [
      /* @__PURE__ */ jsx17("path", { d: "M8.308 5.148a3.15 3.15 0 0 1-3.154 3.148A3.15 3.15 0 0 1 2 5.148A3.15 3.15 0 0 1 5.154 2a3.15 3.15 0 0 1 3.154 3.148M5.154 6.296a1.15 1.15 0 0 0 1.154-1.148A1.15 1.15 0 0 0 5.154 4A1.15 1.15 0 0 0 4 5.148a1.15 1.15 0 0 0 1.154 1.148M21 18.924a3.15 3.15 0 0 1-3.154 3.147a3.15 3.15 0 0 1-3.154-3.148a3.15 3.15 0 0 1 3.154-3.147c1.732 0 3.154 1.4 3.154 3.148m-3.154 1.147A1.15 1.15 0 0 0 19 18.923c0-.633-.517-1.147-1.154-1.147a1.15 1.15 0 0 0-1.154 1.148a1.15 1.15 0 0 0 1.154 1.147M21 11.462a3.15 3.15 0 0 1-3.154 3.148a3.15 3.15 0 0 1-3.154-3.148a3.15 3.15 0 0 1 3.154-3.148A3.15 3.15 0 0 1 21 11.462m-3.154 1.148A1.15 1.15 0 0 0 19 11.462c0-.634-.517-1.148-1.154-1.148a1.15 1.15 0 0 0-1.154 1.148a1.15 1.15 0 0 0 1.154 1.148" }),
      /* @__PURE__ */ jsx17("path", { d: "M5.154 7.018a1 1 0 0 1 1 1v6.784a3.154 3.154 0 0 0 3.13 3.154l5.724.044a1 1 0 0 1-.016 2l-5.724-.044a5.154 5.154 0 0 1-5.114-5.154V8.018a1 1 0 0 1 1-1" }),
      /* @__PURE__ */ jsx17("path", { d: "M9.172 12.462a5.02 5.02 0 0 1-5.018-5.018h2a3.02 3.02 0 0 0 3.018 3.018H15a1 1 0 1 1 0 2z" })
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
  if (phase.details?.length) {
    return phase.details.map((title, index) => ({ key: `detail-${index}`, title }));
  }
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
import Box9 from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { jsx as jsx18 } from "react/jsx-runtime";
function buildPlatformStripItems(platforms) {
  return platforms.map((p, i) => {
    const { label, icon } = derivePlatformEntry(p);
    return /* @__PURE__ */ jsx18(Tooltip, { title: label, arrow: true, placement: "top", children: /* @__PURE__ */ jsx18(Box9, { sx: { display: "flex", alignItems: "center", justifyContent: "center" }, children: icon ?? /* @__PURE__ */ jsx18(Box9, { component: "span", sx: { fontSize: 11, px: 0.5 }, children: label }) }) }, `platform-${i}`);
  });
}

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
import Box10 from "@mui/material/Box";
import Typography6 from "@mui/material/Typography";
import { jsx as jsx19, jsxs as jsxs10 } from "react/jsx-runtime";
function LabeledIconStrip({ label, children }) {
  return /* @__PURE__ */ jsxs10(Box10, { sx: { mt: 2.5 }, children: [
    label && /* @__PURE__ */ jsx19(Typography6, { variant: "overline", sx: labeledIconStripLabelSx, children: label }),
    children
  ] });
}

// src/components/timeline/two-column/phase-card/card-detail-bullets.tsx
import Box11 from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography7 from "@mui/material/Typography";
import { jsx as jsx20, jsxs as jsxs11 } from "react/jsx-runtime";
function CardDetailBullets({
  id,
  details,
  in: expanded,
  taskDoneStates,
  onToggleTask
}) {
  return /* @__PURE__ */ jsx20(Collapse, { in: expanded, timeout: 50, children: /* @__PURE__ */ jsx20(Box11, { id, sx: detailBulletsContainerSx, children: details.map((task, i) => {
    const taskKey = String(task.key);
    const isDoneTask = taskDoneStates ? taskDoneStates[taskKey] ?? taskDoneStates[`idx-${i}`] ?? false : task.done ?? false;
    const toggleLabel = isDoneTask ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`;
    return /* @__PURE__ */ jsxs11(Box11, { sx: taskRowSx, children: [
      /* @__PURE__ */ jsx20(
        Box11,
        {
          component: onToggleTask ? "button" : "span",
          type: onToggleTask ? "button" : void 0,
          "aria-label": onToggleTask ? toggleLabel : void 0,
          "aria-pressed": onToggleTask ? isDoneTask : void 0,
          onClick: onToggleTask ? (e) => {
            e.stopPropagation();
            onToggleTask(i, !isDoneTask);
          } : void 0,
          sx: onToggleTask ? [taskToggleButtonSx, taskToggleColorSx(isDoneTask)] : [taskIconStaticSx, taskIconColorSx(isDoneTask)],
          children: /* @__PURE__ */ jsx20(
            GiselleIcon,
            {
              icon: isDoneTask ? "solar:check-circle-bold" : "solar:record-minimalistic-outline",
              width: PHASE_TASK_ICON_SIZE
            }
          )
        }
      ),
      /* @__PURE__ */ jsx20(Typography7, { variant: "body2", sx: taskTitleSx(isDoneTask), children: task.title })
    ] }, i);
  }) }) });
}

// src/components/timeline/two-column/phase-card/card-corner-alert-badge.tsx
import Box12 from "@mui/material/Box";
import Tooltip2 from "@mui/material/Tooltip";
import Typography8 from "@mui/material/Typography";
import { jsx as jsx21, jsxs as jsxs12 } from "react/jsx-runtime";
function CardCornerAlertBadge({
  alerts,
  columnSide = "right",
  onClick,
  innerRef
}) {
  if (alerts.length === 0) return null;
  const hasError = alerts.some((a) => a.severity === "error");
  const { left, right, transform, tooltipPlacement } = resolveCornerBadgeAlign(columnSide);
  const tooltipContent = /* @__PURE__ */ jsx21(Box12, { sx: tooltipAlertListSx, children: alerts.map((a, i) => /* @__PURE__ */ jsxs12(Box12, { sx: { display: "flex", alignItems: "flex-start", gap: 1 }, children: [
    /* @__PURE__ */ jsx21(
      GiselleIcon,
      {
        icon: "solar:danger-triangle-bold",
        width: CORNER_ALERT_LIST_ICON_SIZE,
        "aria-hidden": true,
        style: { flexShrink: 0, marginTop: 2 }
      }
    ),
    /* @__PURE__ */ jsx21(
      Typography8,
      {
        variant: "body2",
        sx: { lineHeight: 1.55, fontSize: "0.8rem", fontWeight: 500 },
        children: a.message
      }
    )
  ] }, i)) });
  const badgeCircle = /* @__PURE__ */ jsx21(
    Box12,
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
      children: /* @__PURE__ */ jsx21(GiselleIcon, { icon: "solar:danger-triangle-bold", width: CORNER_ALERT_ICON_SIZE, "aria-hidden": true })
    }
  );
  if (onClick) return badgeCircle;
  return /* @__PURE__ */ jsx21(
    Tooltip2,
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
import Typography9 from "@mui/material/Typography";
import { jsx as jsx22 } from "react/jsx-runtime";
function ScenarioBadge({ color, scenarioLabel }) {
  return /* @__PURE__ */ jsx22(Typography9, { variant: "overline", sx: scenarioBadgeSx(color), children: scenarioLabel });
}

// src/components/timeline/two-column/phase-card/card-status-badge.tsx
import { jsx as jsx23 } from "react/jsx-runtime";
function CardStatusBadge({ color, isScenario, scenarioLabel }) {
  if (!isScenario || !scenarioLabel) return null;
  return /* @__PURE__ */ jsx23(ScenarioBadge, { color, scenarioLabel });
}

// src/components/timeline/two-column/phase-card/card-decoration.tsx
import Box13 from "@mui/material/Box";
import { Fragment as Fragment2, jsx as jsx24, jsxs as jsxs13 } from "react/jsx-runtime";
function CardDecoration({ color, isOverduePending, icon }) {
  return /* @__PURE__ */ jsxs13(Fragment2, { children: [
    /* @__PURE__ */ jsx24(Box13, { "aria-hidden": true, sx: buildCardDecorationGradientSx(color, isOverduePending) }),
    /* @__PURE__ */ jsx24(Box13, { "aria-hidden": "true", sx: phaseCardIconBoxSx(color, isOverduePending), children: icon })
  ] });
}

// src/components/timeline/two-column/phase-card/phase-card.tsx
import { jsx as jsx25, jsxs as jsxs14 } from "react/jsx-runtime";
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
  const badgeRef = useRef2(null);
  const [popoverOpen, setPopoverOpen] = useState4(false);
  const handleOpenPopover = useCallback5(() => setPopoverOpen(true), []);
  const handleClosePopover = useCallback5(() => setPopoverOpen(false), []);
  const popoverMode = Boolean(onPhasesChange && allPhases);
  const isDone = done ?? phase.done ?? false;
  const isOverdue = overdue ?? phase.overdue ?? false;
  const [internalExpanded, setInternalExpanded] = useState4(false);
  const [isHovered, setIsHovered] = useState4(false);
  const handleMouseEnter = useCallback5(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback5(() => setIsHovered(false), []);
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
  return /* @__PURE__ */ jsxs14(Box14, { sx: [{ position: "relative" }, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ jsx25(
      CardCornerAlertBadge,
      {
        alerts: cornerAlerts,
        columnSide,
        onClick: popoverMode ? handleOpenPopover : void 0,
        innerRef: popoverMode ? badgeRef : void 0
      }
    ),
    popoverMode && onPhasesChange && allPhases && /* @__PURE__ */ jsx25(
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
    /* @__PURE__ */ jsxs14(
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
          !isHighlighted && !phase.hideDecoration && /* @__PURE__ */ jsx25(
            CardDecoration,
            {
              color: phase.color ?? "primary",
              isOverduePending: isOverdue && !isDone,
              icon: phase.icon
            }
          ),
          /* @__PURE__ */ jsx25(
            CardStatusBadge,
            {
              color: phase.color ?? "primary",
              isScenario,
              scenarioLabel: phase.scenarioLabel
            }
          ),
          !phase.hideDate && phase.date && /* @__PURE__ */ jsx25(
            Typography10,
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
          /* @__PURE__ */ jsx25(Box14, { sx: { display: "flex", alignItems: "flex-start", gap: 1 }, children: /* @__PURE__ */ jsxs14(Box14, { sx: { flex: 1 }, children: [
            /* @__PURE__ */ jsx25(
              Typography10,
              {
                variant: isScenario ? "h6" : "subtitle1",
                sx: { mb: hasDetails ? 0.5 : 1, pr: !isHighlighted && !phase.hideDecoration ? 6 : 0 },
                children: displayTitle
              }
            ),
            hasDetails && /* @__PURE__ */ jsxs14(
              Box14,
              {
                sx: detailCountPillSx,
                "aria-label": `${taskChildren.length} expandable detail${taskChildren.length === 1 ? "" : "s"}`,
                children: [
                  /* @__PURE__ */ jsx25(Box14, { component: "span", sx: pillIconBoxSx(PHASE_PILL_ICON_SIZE), children: expandableIcon ?? DEFAULT_EXPANDABLE_ICON }),
                  /* @__PURE__ */ jsx25(
                    Typography10,
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
            expanded && phase.description && /* @__PURE__ */ jsx25(Typography10, { variant: "body2", sx: { color: "text.secondary", mt: 0.5 }, children: phase.description }),
            expanded && resolvePhotoSources(phase)?.map((p, i) => /* @__PURE__ */ jsx25(Box14, { component: "img", src: p.src, alt: p.alt, sx: photoImgSx(i === 0) }, i)),
            expanded && phase.clients && /* @__PURE__ */ jsx25(LabeledIconStrip, { label: phase.clientsLabel, children: /* @__PURE__ */ jsx25(Box14, { sx: logoStripSx, children: phase.clients.map(({ name, logo }) => /* @__PURE__ */ jsx25(Tooltip3, { title: name, arrow: true, children: /* @__PURE__ */ jsx25(Box14, { component: "img", src: logo, alt: name, sx: clientLogoSx }) }, name)) }) }),
            expanded && phase.platforms && phase.platforms.length > 0 && /* @__PURE__ */ jsx25(LabeledIconStrip, { label: phase.platformsLabel ?? "Tech Stack", children: /* @__PURE__ */ jsx25(Box14, { sx: platformStripSx, children: buildPlatformStripItems(phase.platforms) }) }),
            expanded && phase.projects && /* @__PURE__ */ jsx25(LabeledIconStrip, { label: phase.projectsLabel, children: /* @__PURE__ */ jsx25(Box14, { sx: logoStripSx, children: phase.projects.map(({ name, logo }) => /* @__PURE__ */ jsx25(Box14, { component: "img", src: logo, alt: name, sx: projectLogoSx }, name)) }) }),
            expanded && phase.footer != null && /* @__PURE__ */ jsx25(Box14, { sx: { mt: 1 }, onClick: (e) => e.stopPropagation(), children: phase.footer })
          ] }) }),
          hasDetails && /* @__PURE__ */ jsx25(
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
    onMarkViewed && /* @__PURE__ */ jsx25(
      Tooltip3,
      {
        title: isViewed ? "Mark as not viewed" : "Mark as viewed",
        placement: columnSide === "left" ? "right" : "left",
        arrow: true,
        children: /* @__PURE__ */ jsx25(
          Box14,
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
            children: /* @__PURE__ */ jsx25(
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

// src/components/timeline/two-column/milestone-badge/milestone-badge.tsx
import { useCallback as useCallback6, useState as useState5 } from "react";
import Box15 from "@mui/material/Box";
import Paper5 from "@mui/material/Paper";
import Collapse2 from "@mui/material/Collapse";
import Tooltip4 from "@mui/material/Tooltip";
import Typography11 from "@mui/material/Typography";

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
import { jsx as jsx26, jsxs as jsxs15 } from "react/jsx-runtime";
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
  const taskChildren = m.children?.length ? m.children : m.details?.map((title, index) => ({
    key: `detail-${index}`,
    title
  })) ?? [];
  const hasDetails = taskChildren.length > 0;
  const colorKey = m.color ?? "primary";
  const titleSlug = String(m.title).replace(/[^a-z0-9]/gi, "-").toLowerCase();
  const detailsId = stableId ? `ms-details-${stableId}` : `ms-details-${titleSlug}`;
  const [isHovered, setIsHovered] = useState5(false);
  const handleMouseEnter = useCallback6(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback6(() => setIsHovered(false), []);
  const displayTitle = isExpanded || isHovered ? m.title : m.shortTitle ?? m.title;
  const handleClick = useCallback6(() => {
    if (hasDetails) onRequestExpand();
  }, [hasDetails, onRequestExpand]);
  const handleKeyDown = useCallback6(
    (e) => {
      if (hasDetails && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onRequestExpand();
      }
    },
    [hasDetails, onRequestExpand]
  );
  return /* @__PURE__ */ jsxs15(
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
        milestonePaperSx({ isExpanded, colorKey, rightAlign, done, hasDetails, suppressElevation }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      children: [
        m.new && /* @__PURE__ */ jsxs15(Box15, { sx: milestoneNewBadgeRowSx(rightAlign), children: [
          /* @__PURE__ */ jsx26(Box15, { sx: milestoneNewDotSx }),
          /* @__PURE__ */ jsx26(Typography11, { variant: "caption", sx: milestoneNewLabelSx, children: "New" })
        ] }),
        m.date && /* @__PURE__ */ jsx26(Typography11, { variant: "caption", sx: milestoneDateSx(MILESTONE_DATE_FONT_SIZE), children: m.date }),
        /* @__PURE__ */ jsxs15(Box15, { sx: milestoneTitleRowSx(rightAlign), children: [
          onMarkViewed && /* @__PURE__ */ jsx26(
            Tooltip4,
            {
              title: isViewed ? "Mark as not viewed" : "Mark as viewed",
              placement: rightAlign ? "right" : "left",
              arrow: true,
              children: /* @__PURE__ */ jsx26(
                Box15,
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
                  children: /* @__PURE__ */ jsx26(
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
          /* @__PURE__ */ jsx26(Typography11, { variant: "subtitle2", sx: { fontWeight: 700, lineHeight: 1.3 }, children: displayTitle })
        ] }),
        (isExpanded || isHovered) && m.description && /* @__PURE__ */ jsx26(Typography11, { variant: "body2", sx: { color: "text.secondary", mt: 0.5 }, children: m.description }),
        hasDetails && /* @__PURE__ */ jsxs15(
          Box15,
          {
            sx: milestoneDetailPillSx,
            "aria-label": `${taskChildren.length} expandable detail${taskChildren.length === 1 ? "" : "s"}`,
            children: [
              /* @__PURE__ */ jsx26(Box15, { component: "span", sx: pillIconBoxSx2(MILESTONE_PILL_ICON_SIZE), children: expandableIcon ?? DEFAULT_EXPANDABLE_ICON }),
              /* @__PURE__ */ jsx26(
                Typography11,
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
        hasDetails && /* @__PURE__ */ jsx26(Collapse2, { in: isExpanded, timeout: 50, children: /* @__PURE__ */ jsx26(Box15, { id: detailsId, sx: milestoneDetailListSx, children: taskChildren.map((task, i) => {
          const taskKey = String(task.key);
          const isDoneTask = taskDoneStates ? taskDoneStates[taskKey] ?? taskDoneStates[`idx-${i}`] ?? false : task.done ?? false;
          const toggleLabel = isDoneTask ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`;
          return /* @__PURE__ */ jsxs15(Box15, { sx: taskRowSx2, children: [
            /* @__PURE__ */ jsx26(
              Box15,
              {
                component: onToggleTask ? "button" : "span",
                type: onToggleTask ? "button" : void 0,
                "aria-label": onToggleTask ? toggleLabel : void 0,
                "aria-pressed": onToggleTask ? isDoneTask : void 0,
                onClick: onToggleTask ? (e) => {
                  e.stopPropagation();
                  onToggleTask(i, !isDoneTask);
                } : void 0,
                sx: onToggleTask ? [taskToggleButtonSx2, taskToggleColorSx2(isDoneTask)] : [taskIconStaticSx2, taskIconColorSx2(isDoneTask)],
                children: /* @__PURE__ */ jsx26(
                  GiselleIcon,
                  {
                    icon: isDoneTask ? "solar:check-circle-bold" : "solar:record-minimalistic-outline",
                    width: MILESTONE_TASK_ICON_SIZE
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx26(Typography11, { variant: "body2", sx: taskTitleSx2(isDoneTask), children: task.title })
          ] }, i);
        }) }) })
      ]
    }
  );
}

// src/components/timeline/two-column/timeline-dot/timeline-dot.tsx
import Box17 from "@mui/material/Box";

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
import Box16 from "@mui/material/Box";
import { jsx as jsx27 } from "react/jsx-runtime";
function DotInner({ done, icon, animationKey, iconSize }) {
  if (done) {
    return /* @__PURE__ */ jsx27(
      Box16,
      {
        component: "svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        sx: doneCheckmarkSx(iconSize),
        children: /* @__PURE__ */ jsx27("polyline", { points: "20 6 9 17 4 12" })
      },
      animationKey
    );
  }
  return /* @__PURE__ */ jsx27(
    Box16,
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
import { jsx as jsx28 } from "react/jsx-runtime";
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
    /* @__PURE__ */ jsx28(
      Box17,
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
        children: /* @__PURE__ */ jsx28(Box17, { sx: timelineDotInnerSx(done, dotBg, effectiveColor, isMilestone, !!onClick), children: /* @__PURE__ */ jsx28(DotInner, { done, icon, animationKey, iconSize }) })
      }
    )
  );
}

// src/components/timeline/two-column/two-column.tsx
import {
  useMemo as useMemo6,
  useState as useState10,
  useEffect as useEffect6,
  useCallback as useCallback10,
  useRef as useRef3,
  useLayoutEffect
} from "react";
import Box28 from "@mui/material/Box";
import Timeline from "@mui/lab/Timeline";

// src/components/timeline/use-timeline-done-state.ts
import { useEffect as useEffect5, useState as useState6 } from "react";
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
    const sortedMilestones = p.milestones ? sortFn([...p.milestones]) : [];
    const childTasks = p.children && p.children.length > 0 ? p.children : sortedMilestones;
    childTasks.forEach((task, childIndex) => {
      resolveTaskChildren(task).forEach((nestedTask, taskIndex) => {
        t[`${p.key}-c${childIndex}-t${taskIndex}`] = nestedTask.done ?? false;
      });
    });
  });
  return t;
}
function useTimelineDoneState(phases, sortOrder) {
  const sortFn = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
  const [localPhaseDone, setLocalPhaseDone] = useState6(
    () => buildPhaseDoneRecord(phases)
  );
  const [localMilestoneDone, setLocalMilestoneDone] = useState6(
    () => buildMilestoneDoneRecord(phases, sortFn)
  );
  const [localTaskDoneMap, setLocalTaskDoneMap] = useState6(
    () => buildTaskDoneRecord(phases, sortFn)
  );
  useEffect5(() => {
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
import { useCallback as useCallback9, useMemo as useMemo5, useState as useState9 } from "react";
import Box21 from "@mui/material/Box";

// src/components/timeline/compact/compact.styles.ts
import { alpha } from "@mui/material/styles";

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
var milestoneItemSx = (interactive, done) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: 1.5,
  cursor: interactive ? "pointer" : "default",
  borderRadius: 1,
  opacity: done ? 0.72 : 1,
  ...interactive ? {
    "&:hover": {
      bgcolor: channelAlpha("var(--mui-palette-grey-500Channel)", 0.06)
    }
  } : null,
  transition: "background-color 150ms, opacity 150ms",
  py: 1,
  px: 0.5
});
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
var milestoneDateSx2 = {
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
var accordionRootSx2 = (done, active = false, expanded = false, color = "primary") => (theme) => {
  const neutralColor = typeof theme.palette.grey?.[500] === "string" ? theme.palette.grey[500] : "#919eab";
  const activeColor = theme.palette[color].main;
  const neutralBg = alpha(neutralColor, 0.08);
  const activeBg = alpha(activeColor, 0.12);
  const activeBorder = alpha(activeColor, 0.24);
  const isActiveExpanded = active && expanded;
  const transitionDuration = theme.transitions?.duration?.shorter ?? 250;
  const colorTransition = theme.transitions?.create ? theme.transitions.create(["background-color", "border-color"], {
    duration: transitionDuration
  }) : "background-color 250ms, border-color 250ms";
  return {
    py: 1,
    px: 2.5,
    border: isActiveExpanded ? `1px solid ${activeBorder}` : "none",
    borderRadius: 2,
    boxShadow: "none",
    backgroundColor: isActiveExpanded ? activeBg : "transparent",
    "&:before": { display: "none" },
    "&.Mui-expanded": {
      margin: 0,
      bgcolor: isActiveExpanded ? activeBg : neutralBg,
      border: isActiveExpanded ? `1px solid ${activeBorder}` : "none"
    },
    "&:hover": {
      bgcolor: neutralBg
    },
    opacity: done ? 0.65 : 1,
    transition: `${colorTransition}, opacity 300ms`
  };
};

// src/components/timeline/compact/phase-accordion-row.tsx
import { useCallback as useCallback8, useState as useState8 } from "react";
import Box20 from "@mui/material/Box";
import SvgIcon2 from "@mui/material/SvgIcon";
import Typography15 from "@mui/material/Typography";

// src/utils/use-nested-checklist.ts
import { useCallback as useCallback7, useMemo as useMemo4, useState as useState7 } from "react";
function useNestedChecklist(initialParentDone, initialChildrenDone) {
  const [parentDone, setParentDone] = useState7(initialParentDone);
  const [childrenDone, setChildrenDone] = useState7(initialChildrenDone);
  const indeterminate = useMemo4(
    () => childrenDone.some(Boolean) && !childrenDone.every(Boolean),
    [childrenDone]
  );
  const toggleParent = useCallback7(() => {
    const next = !parentDone;
    setParentDone(next);
    setChildrenDone((prev) => prev.map(() => next));
  }, [parentDone]);
  const toggleChild = useCallback7((index) => {
    setChildrenDone((prev) => {
      const next = prev.map((v, i) => i === index ? !v : v);
      setParentDone(next.every(Boolean));
      return next;
    });
  }, []);
  return { parentDone, indeterminate, childrenDone, toggleParent, toggleChild };
}

// src/components/timeline/compact/chevron-down-icon.tsx
import { jsx as jsx29 } from "react/jsx-runtime";
function ChevronDownIcon() {
  return /* @__PURE__ */ jsx29(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      focusable: "false",
      children: /* @__PURE__ */ jsx29("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" })
    }
  );
}

// src/components/timeline/compact/milestone-modal.tsx
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider2 from "@mui/material/Divider";
import IconButton3 from "@mui/material/IconButton";
import Typography14 from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// src/components/timeline/compact/milestone-modal.styles.ts
var dialogTitleSx = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1,
  pr: 1
};
var dialogDateSx = {
  color: "text.secondary",
  mt: 0.25
};

// src/components/timeline/compact/task-details-renderer.tsx
import Box19 from "@mui/material/Box";
import Typography13 from "@mui/material/Typography";

// src/components/timeline/task-list/task-list.tsx
import Checkbox2 from "@mui/material/Checkbox";
import Box18 from "@mui/material/Box";
import Typography12 from "@mui/material/Typography";

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
import { jsx as jsx30, jsxs as jsxs16 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx30(Box18, { component: "ul", sx: [listSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: tasks.map((task, i) => {
    const isDone = taskDoneState?.[i] ?? task.done ?? false;
    return /* @__PURE__ */ jsxs16(Box18, { component: "li", sx: taskItemSx, children: [
      checklist && /* @__PURE__ */ jsx30(
        Checkbox2,
        {
          size: "small",
          checked: isDone,
          onChange: () => onTaskToggle?.(i),
          sx: taskCheckboxSx,
          slotProps: { input: { "aria-label": task.title } }
        }
      ),
      /* @__PURE__ */ jsx30(Typography12, { variant: "caption", sx: taskCaptionSx(isDone), children: task.title })
    ] }, i);
  }) });
}

// src/components/timeline/compact/task-details-renderer.styles.ts
var taskDetailsSummarySx = {
  color: "text.secondary",
  mb: 2
};
var taskDetailsContentSx = {
  display: "grid",
  gap: 2
};
var taskDetailsEmptyStateSx = {
  color: "text.disabled"
};

// src/components/timeline/compact/utils.ts
function resolveCompactColor(color, done) {
  if (done) return "success";
  if (!color || color === "inherit" || color === "grey") return "primary";
  return color;
}

// src/components/timeline/compact/task-details-renderer.tsx
import { jsx as jsx31, jsxs as jsxs17 } from "react/jsx-runtime";
function renderDetailsNode(node) {
  if (!node) return null;
  if (typeof node === "string") {
    return /* @__PURE__ */ jsx31(Typography13, { variant: "body2", sx: taskDetailsSummarySx, children: node });
  }
  return node;
}
function TaskDetailsRenderer({
  task,
  checklist = false,
  taskDoneState,
  onTaskToggle,
  emptyState = "No additional details.",
  sx,
  ...other
}) {
  const nestedTasks = resolveTaskChildren(task);
  const hasInlineDescription = Boolean(task.description);
  const hasSummary = Boolean(task.details?.summary);
  const hasContent = Boolean(task.details?.content);
  const hasTasks = nestedTasks.length > 0;
  return /* @__PURE__ */ jsxs17(Box19, { sx: [taskDetailsContentSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    hasInlineDescription && /* @__PURE__ */ jsx31(Typography13, { variant: "body2", sx: taskDetailsSummarySx, children: task.description }),
    !hasInlineDescription && renderDetailsNode(task.details?.summary),
    hasContent && renderDetailsNode(task.details?.content),
    hasTasks && /* @__PURE__ */ jsx31(
      TaskList,
      {
        tasks: nestedTasks,
        checklist,
        taskDoneState,
        onTaskToggle,
        indent: "milestone"
      }
    ),
    !hasInlineDescription && !hasSummary && !hasContent && !hasTasks && /* @__PURE__ */ jsx31(Typography13, { variant: "body2", sx: taskDetailsEmptyStateSx, children: emptyState })
  ] });
}

// src/components/timeline/compact/milestone-modal.tsx
import { jsx as jsx32, jsxs as jsxs18 } from "react/jsx-runtime";
function TaskDetailsModal({
  task,
  open,
  onClose,
  checklist = false,
  taskDoneState,
  onTaskToggle
}) {
  const fullScreen = useMediaQuery("(max-width:599.95px)");
  if (!task) return null;
  return /* @__PURE__ */ jsxs18(
    Dialog,
    {
      open,
      onClose,
      fullWidth: true,
      maxWidth: "sm",
      fullScreen,
      scroll: "paper",
      children: [
        /* @__PURE__ */ jsxs18(DialogTitle, { sx: dialogTitleSx, children: [
          /* @__PURE__ */ jsxs18("div", { children: [
            /* @__PURE__ */ jsx32(Typography14, { variant: "h6", component: "span", children: task.title }),
            task.date && /* @__PURE__ */ jsx32(Typography14, { variant: "caption", display: "block", sx: dialogDateSx, children: task.date })
          ] }),
          /* @__PURE__ */ jsx32(IconButton3, { "aria-label": "Close details", onClick: onClose, sx: { mt: 0.5, flexShrink: 0 }, children: /* @__PURE__ */ jsx32("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx32("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) }) })
        ] }),
        /* @__PURE__ */ jsx32(Divider2, {}),
        /* @__PURE__ */ jsx32(DialogContent, { sx: { pt: 2 }, children: /* @__PURE__ */ jsx32(
          TaskDetailsRenderer,
          {
            task,
            checklist,
            taskDoneState,
            onTaskToggle
          }
        ) })
      ]
    }
  );
}

// src/components/timeline/compact/phase-accordion-row.tsx
import { Fragment as Fragment3, jsx as jsx33, jsxs as jsxs19 } from "react/jsx-runtime";
var CHECK_DONE_DOT = /* @__PURE__ */ jsx33(Box20, { sx: phaseDotSx("success"), "aria-hidden": "true", children: /* @__PURE__ */ jsx33(
  "svg",
  {
    width: COMPACT_PHASE_ICON_SIZE,
    height: COMPACT_PHASE_ICON_SIZE,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx33("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" })
  }
) });
var CHECK_HOVER_DOT = /* @__PURE__ */ jsx33(SvgIcon2, { sx: { color: "success.main", fontSize: COMPACT_PHASE_DOT_SIZE }, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx33("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });
var MS_CHECK_DONE_DOT = /* @__PURE__ */ jsx33(
  Box20,
  {
    sx: phaseDotSx("success"),
    style: { width: COMPACT_MILESTONE_DOT_SIZE, height: COMPACT_MILESTONE_DOT_SIZE, flexShrink: 0 },
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx33(
      "svg",
      {
        width: COMPACT_MILESTONE_ICON_SIZE,
        height: COMPACT_MILESTONE_ICON_SIZE,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsx33("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" })
      }
    )
  }
);
var MS_CHECK_HOVER_DOT = /* @__PURE__ */ jsx33(SvgIcon2, { sx: { color: "success.main", fontSize: COMPACT_MILESTONE_DOT_SIZE }, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx33("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });
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
  const [modalTask, setModalTask] = useState8(null);
  const effectiveColor = resolveCompactColor(phase.color, parentDone);
  const childTasks = phase.children && phase.children.length > 0 ? phase.children : sortedMilestones;
  const usesMilestoneChildren = !(phase.children && phase.children.length > 0);
  const hasDetails = Boolean(phase.description) || childTasks.length > 0;
  const handleToggleParent = useCallback8(() => {
    toggleParent();
    onTogglePhaseDone?.(phase.key, !parentDone);
  }, [toggleParent, onTogglePhaseDone, phase.key, parentDone]);
  const handleAccordionChange = useCallback8(
    (_e, expanded) => {
      onToggleExpanded(phase.key);
      if (expanded) onMarkViewed?.(`phase-${phase.key}`);
    },
    [onMarkViewed, onToggleExpanded, phase.key]
  );
  const phaseDot = /* @__PURE__ */ jsx33(Box20, { sx: phaseDotSx(effectiveColor), "aria-hidden": "true", children: phase.icon });
  const leadingAction = checklist ? void 0 : phaseDot;
  const checkIcon = checklist ? phaseDot : void 0;
  const checkDoneIcon = checklist ? CHECK_DONE_DOT : void 0;
  const checkHoverIcon = checklist ? CHECK_HOVER_DOT : void 0;
  const titleContent = /* @__PURE__ */ jsx33(Typography15, { variant: "subtitle2", sx: phaseTitleSx, children: phase.shortTitle ?? phase.title });
  const dateLabel = phase.date ? /* @__PURE__ */ jsx33(Typography15, { variant: "caption", sx: dateSx, children: phase.date }) : null;
  const isExpanded = expandedPhaseKey === phase.key;
  return /* @__PURE__ */ jsxs19(Fragment3, { children: [
    /* @__PURE__ */ jsx33(
      Accordion,
      {
        disableGutters: true,
        elevation: 0,
        checklist,
        checkIcon,
        checkDoneIcon,
        checkHoverIcon,
        leadingAction,
        done: parentDone,
        indeterminate,
        onDoneButtonClick: handleToggleParent,
        trailingContent: dateLabel,
        expandIcon: hasDetails ? /* @__PURE__ */ jsx33(ChevronDownIcon, {}) : null,
        title: titleContent,
        expanded: isExpanded,
        onChange: handleAccordionChange,
        sx: [
          accordionRootSx2(parentDone, Boolean(phase.active), isExpanded, effectiveColor),
          accordionSummaryOverrideSx
        ],
        children: hasDetails && /* @__PURE__ */ jsxs19(Box20, { sx: accordionDetailsSx, children: [
          phase.description && /* @__PURE__ */ jsx33(Typography15, { variant: "body2", sx: descriptionSx, children: phase.description }),
          childTasks.length > 0 && /* @__PURE__ */ jsx33(Box20, { component: "ul", sx: milestonesListSx, children: childTasks.map((task, idx) => {
            const isDone = usesMilestoneChildren ? childrenDone[idx] ?? false : task.done ?? false;
            const idleDotColor = resolveCompactColor(task.color ?? phase.color, isDone);
            const isLast = idx === childTasks.length - 1;
            const nestedTasks = resolveTaskChildren(task);
            const canOpen = Boolean(task.description) || Boolean(task.details?.summary) || Boolean(task.details?.content) || nestedTasks.length > 0;
            const dotNode = /* @__PURE__ */ jsx33(Box20, { sx: milestoneDotSx(idleDotColor), "aria-hidden": "true", children: task.icon });
            const rowButtonProps = canOpen ? {
              onClick: () => setModalTask({ task, idx }),
              role: "button",
              tabIndex: 0,
              "aria-label": `View details: ${task.title}`,
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setModalTask({ task, idx });
                }
              }
            } : {};
            return /* @__PURE__ */ jsxs19(
              Box20,
              {
                component: "li",
                sx: milestoneItemSx(canOpen, isDone),
                ...rowButtonProps,
                children: [
                  /* @__PURE__ */ jsxs19(Box20, { sx: milestoneDotColumnSx, children: [
                    checklist && usesMilestoneChildren ? /* @__PURE__ */ jsx33(
                      ToggleIconButton,
                      {
                        pressed: isDone,
                        idleIcon: dotNode,
                        pressedIcon: MS_CHECK_DONE_DOT,
                        hoverIcon: MS_CHECK_HOVER_DOT,
                        onPressedChange: (newDone) => {
                          toggleChild(idx);
                          onToggleMilestoneDone?.(phase.key, idx, newDone);
                        },
                        "aria-label": isDone ? "Mark as not done" : "Mark as done"
                      }
                    ) : dotNode,
                    !isLast && /* @__PURE__ */ jsx33(Box20, { "aria-hidden": "true", sx: milestoneConnectorLineSx })
                  ] }),
                  /* @__PURE__ */ jsxs19(Box20, { sx: milestoneContentSx, children: [
                    /* @__PURE__ */ jsx33(Typography15, { variant: "subtitle2", sx: milestoneTitleSx, children: task.shortTitle ?? task.title }),
                    task.description && /* @__PURE__ */ jsx33(Typography15, { variant: "body2", sx: milestoneDescriptionPreviewSx, children: task.description })
                  ] }),
                  task.date && /* @__PURE__ */ jsx33(Typography15, { variant: "caption", sx: milestoneDateSx2, children: task.date })
                ]
              },
              `${phase.key}-child-${task.key}`
            );
          }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx33(
      TaskDetailsModal,
      {
        task: modalTask?.task ?? null,
        open: modalTask !== null,
        onClose: () => setModalTask(null),
        checklist,
        taskDoneState: modalTask ? resolveTaskChildren(modalTask.task).map(
          (task, i) => taskDoneMap[`${phase.key}-c${modalTask.idx}-t${i}`] ?? task.done ?? false
        ) : void 0,
        onTaskToggle: modalTask ? (i) => onTaskToggle(phase.key, modalTask.idx, i) : void 0
      }
    )
  ] });
}

// src/components/timeline/compact/compact.tsx
import { jsx as jsx34 } from "react/jsx-runtime";
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
  const sorted = useMemo5(() => sortPhasesByDate(phases, sortOrder), [phases, sortOrder]);
  const { localTaskDoneMap, setLocalTaskDoneMap } = useTimelineDoneState(phases, sortOrder);
  const handleTaskToggle = useCallback9(
    (phaseKey, childIdx, taskIdx) => {
      const k = childIdx === null ? `${phaseKey}-t${taskIdx}` : `${phaseKey}-c${childIdx}-t${taskIdx}`;
      const next = !(localTaskDoneMap[k] ?? false);
      setLocalTaskDoneMap((prev) => ({ ...prev, [k]: next }));
      onToggleTaskDone?.(phaseKey, childIdx, taskIdx, next);
    },
    [localTaskDoneMap, onToggleTaskDone, setLocalTaskDoneMap]
  );
  const [expandedPhaseKey, setExpandedPhaseKey] = useState9(null);
  const handleToggleExpanded = useCallback9((key) => {
    setExpandedPhaseKey((prev) => prev === key ? null : key);
  }, []);
  return /* @__PURE__ */ jsx34(Box21, { sx: [accordionRootSx2(false), ...Array.isArray(sx) ? sx : [sx]], ...other, children: sorted.map((phase) => {
    const sortedMilestones = phase.milestones ? sortMilestones([...phase.milestones]) : [];
    return /* @__PURE__ */ jsx34(
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
import Box22 from "@mui/material/Box";
import Tooltip5 from "@mui/material/Tooltip";
import Typography16 from "@mui/material/Typography";

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
import { jsx as jsx35, jsxs as jsxs20 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs20(Box22, { sx: msRowSx(topPercent), children: [
    /* @__PURE__ */ jsx35(Box22, { "data-col": "left", sx: msColumnBoxSx("left", effectiveMsSide === "left"), children: effectiveMsSide === "left" && /* @__PURE__ */ jsx35(
      Box22,
      {
        "data-ms-card": "true",
        ref: (el) => ctx.onMeasure(mi, el),
        onClick: stopProp,
        sx: msCardWrapperSx(isThisMsExpanded, suppressElevation, "left"),
        children: /* @__PURE__ */ jsx35(
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
            taskDoneStates: resolveTaskChildren(ms).reduce(
              (acc, task, ti) => {
                const done = ctx.localTaskDoneMap[`${ctx.phaseKey}-c${mi}-t${ti}`] ?? task.done ?? false;
                acc[String(task.key)] = done;
                acc[`idx-${ti}`] = done;
                return acc;
              },
              {}
            ),
            onToggleTask: (taskIdx, _done) => ctx.handleToggleTask(ctx.phaseKey, mi, taskIdx),
            onRequestExpand: () => ctx.handleExpandMilestone(ctx.phaseKey, mi)
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx35(Box22, { "data-col": "center", sx: centerColumnSx, children: /* @__PURE__ */ jsxs20(Box22, { sx: msDotWrapperSx(suppressElevation), children: [
      ms.date && /* @__PURE__ */ jsx35(Typography16, { variant: "caption", "aria-hidden": true, sx: floatingDatePillSx, children: ms.date }),
      /* @__PURE__ */ jsx35(
        Tooltip5,
        {
          title: resolveMilestoneTooltip(ctx.checklist, msColor, msDone, ms),
          placement: "top",
          arrow: true,
          children: /* @__PURE__ */ jsx35("span", { children: /* @__PURE__ */ jsx35(
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
    /* @__PURE__ */ jsx35(Box22, { "data-col": "right", sx: msColumnBoxSx("right", effectiveMsSide === "right"), children: effectiveMsSide === "right" && /* @__PURE__ */ jsx35(
      Box22,
      {
        "data-ms-card": "true",
        ref: (el) => ctx.onMeasure(mi, el),
        onClick: stopProp,
        sx: msCardWrapperSx(isThisMsExpanded, suppressElevation, "right"),
        children: /* @__PURE__ */ jsx35(
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
            taskDoneStates: resolveTaskChildren(ms).reduce(
              (acc, task, ti) => {
                const done = ctx.localTaskDoneMap[`${ctx.phaseKey}-c${mi}-t${ti}`] ?? task.done ?? false;
                acc[String(task.key)] = done;
                acc[`idx-${ti}`] = done;
                return acc;
              },
              {}
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
import Box25 from "@mui/material/Box";
import Tooltip6 from "@mui/material/Tooltip";

// src/components/timeline/two-column/marker-label.tsx
import Box23 from "@mui/material/Box";
import Typography17 from "@mui/material/Typography";
import { jsxs as jsxs21 } from "react/jsx-runtime";
function MarkerLabel({ title, date }) {
  return /* @__PURE__ */ jsxs21(Typography17, { variant: "caption", sx: markerCaptionSx, children: [
    title,
    date && /* @__PURE__ */ jsxs21(Box23, { component: "span", sx: markerDateSpanSx, children: [
      "\xB7 ",
      date
    ] })
  ] });
}

// src/components/timeline/two-column/spine-connector/spine-connector.tsx
import Box24 from "@mui/material/Box";
import Typography18 from "@mui/material/Typography";

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
import { jsx as jsx36 } from "react/jsx-runtime";
function SpineConnector({
  dotColor,
  yearMilestone,
  yearLabelMarginBottom = 50,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx36(
    Box24,
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
      children: yearMilestone && /* @__PURE__ */ jsx36(Typography18, { variant: "caption", sx: yearLabelSx(yearLabelMarginBottom), children: yearMilestone })
    }
  );
}

// src/components/timeline/two-column/marker-row.tsx
import { jsx as jsx37, jsxs as jsxs22 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx37(Box25, { component: "li", "data-testid": "tl-item", sx: markerPhaseLiSx, ...other, children: /* @__PURE__ */ jsxs22(Box25, { sx: markerRowInnerSx, children: [
    /* @__PURE__ */ jsx37(Box25, { sx: markerLabelSlotSx("left"), children: phase.side === "left" && /* @__PURE__ */ jsx37(MarkerLabel, { title: phase.shortTitle ?? phase.title, date: phase.date }) }),
    /* @__PURE__ */ jsxs22(Box25, { "data-col": "center", sx: markerCenterSx, children: [
      /* @__PURE__ */ jsx37(Tooltip6, { title: markerTooltip, placement: "top", arrow: true, children: /* @__PURE__ */ jsx37("span", { children: /* @__PURE__ */ jsx37(TimelineDot, { icon: phase.icon, color: dotColor, size: "milestone", done: isDone }) }) }),
      !isLastPhase && /* @__PURE__ */ jsx37(SpineConnector, { dotColor, yearMilestone: yearLabelValue })
    ] }),
    /* @__PURE__ */ jsx37(Box25, { sx: markerLabelSlotSx("right"), children: shouldShowRightLabel && /* @__PURE__ */ jsx37(MarkerLabel, { title: phase.shortTitle ?? phase.title, date: phase.date }) })
  ] }) });
}

// src/components/timeline/two-column/phase-row.tsx
import Box27 from "@mui/material/Box";
import Tooltip7 from "@mui/material/Tooltip";
import Typography19 from "@mui/material/Typography";

// src/components/timeline/two-column/timeline-column.tsx
import Box26 from "@mui/material/Box";
import { jsx as jsx38 } from "react/jsx-runtime";
function TimelineColumn({
  columnSide,
  hasContent,
  children,
  bottomPadding
}) {
  return /* @__PURE__ */ jsx38(Box26, { "data-col": columnSide, sx: timelineColumnSx(columnSide, hasContent, bottomPadding), children });
}

// src/components/timeline/two-column/phase-row.tsx
import { jsx as jsx39, jsxs as jsxs23 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs23(Box27, { sx: phaseRowSx(isSuppressed), children: [
    /* @__PURE__ */ jsx39(
      TimelineColumn,
      {
        columnSide: "left",
        hasContent: phase.side === "left",
        bottomPadding: phaseCardGap,
        children: !isMobile && phase.side === "left" && phaseCardNode
      }
    ),
    /* @__PURE__ */ jsxs23(Box27, { "data-col": "center", sx: centerColumnSx, children: [
      /* @__PURE__ */ jsxs23(Box27, { sx: phaseDotWrapperSx, children: [
        !phase.hideDate && phase.date && /* @__PURE__ */ jsx39(Typography19, { variant: "caption", "aria-hidden": true, sx: floatingDatePillSx, children: phase.date }),
        /* @__PURE__ */ jsx39(
          Tooltip7,
          {
            title: resolvePhaseTooltip(checklist, dotColor, isDone, phase),
            placement: "top",
            arrow: true,
            children: /* @__PURE__ */ jsx39("span", { children: /* @__PURE__ */ jsx39(
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
      !isLastPhase && /* @__PURE__ */ jsx39(
        SpineConnector,
        {
          dotColor,
          yearMilestone: yearLabelValue,
          yearLabelMarginBottom
        }
      )
    ] }),
    /* @__PURE__ */ jsx39(
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
import { Fragment as Fragment4, jsx as jsx40, jsxs as jsxs24 } from "react/jsx-runtime";
var useIsomorphicLayoutEffect = globalThis.window === void 0 ? useEffect6 : useLayoutEffect;
var EMPTY_VIEWED_KEYS = /* @__PURE__ */ new Set();
function makeTaskStateKey(phaseKey, childIdx, taskIdx) {
  return childIdx === null ? `${phaseKey}-t${taskIdx}` : `${phaseKey}-c${childIdx}-t${taskIdx}`;
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
  const {
    localPhaseDone,
    setLocalPhaseDone,
    localMilestoneDone,
    setLocalMilestoneDone,
    localTaskDoneMap,
    setLocalTaskDoneMap
  } = useTimelineDoneState(phases, sortOrder);
  const [phaseToggleCounts, setPhaseToggleCounts] = useState10({});
  const [expandedMilestoneMap, setExpandedMilestoneMap] = useState10(
    {}
  );
  const [expandedPhaseKey, setExpandedPhaseKey] = useState10(null);
  const sortMilestones = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
  const handleExpandMilestone = useCallback10((phaseKey, milestoneIndex) => {
    const k = String(phaseKey);
    setExpandedPhaseKey(null);
    setExpandedMilestoneMap((prev) => ({
      ...prev,
      [k]: prev[k] === milestoneIndex ? null : milestoneIndex
    }));
  }, []);
  const handleExpandPhaseCard = useCallback10((phaseKey) => {
    setExpandedMilestoneMap({});
    setExpandedPhaseKey((prev) => prev === phaseKey ? null : phaseKey);
  }, []);
  const stopCardPropagation = useCallback10((e) => e.stopPropagation(), []);
  const handleTogglePhase = useCallback10(
    (key) => {
      setPhaseToggleCounts((prev) => ({ ...prev, [String(key)]: (prev[String(key)] ?? 0) + 1 }));
      const next = !localPhaseDone[String(key)];
      setLocalPhaseDone((prev) => ({ ...prev, [String(key)]: next }));
      onTogglePhaseDone?.(key, next);
    },
    [localPhaseDone, onTogglePhaseDone, setLocalPhaseDone, setPhaseToggleCounts]
  );
  const handleToggleMilestone = useCallback10(
    (phaseKey, milestoneIndex) => {
      const k = `${phaseKey}-${milestoneIndex}`;
      const next = !localMilestoneDone[k];
      const updated = { ...localMilestoneDone, [k]: next };
      setLocalMilestoneDone(updated);
      onToggleMilestoneDone?.(phaseKey, milestoneIndex, next);
      const phase = phases.find((p) => p.key === phaseKey);
      const sortedMilestones = phase?.milestones ? sortMilestones([...phase.milestones]) : [];
      if (sortedMilestones.length > 0) {
        const allDone = sortedMilestones.every((_, i) => updated[`${phaseKey}-${i}`] ?? false);
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
      sortMilestones,
      localPhaseDone,
      onToggleMilestoneDone,
      onTogglePhaseDone,
      setLocalMilestoneDone,
      setLocalPhaseDone,
      setPhaseToggleCounts
    ]
  );
  const handleToggleTask = useCallback10(
    (phaseKey, childIdx, taskIdx) => {
      const k = makeTaskStateKey(phaseKey, childIdx, taskIdx);
      const next = !(localTaskDoneMap[k] ?? false);
      const updated = { ...localTaskDoneMap, [k]: next };
      setLocalTaskDoneMap(updated);
      onToggleTaskDone?.(phaseKey, childIdx, taskIdx, next);
      if (childIdx !== null && checklist) {
        const phase = phases.find((p) => p.key === phaseKey);
        const sortedMilestones = phase?.milestones ? sortMilestones([...phase.milestones]) : [];
        const milestone = sortedMilestones[childIdx];
        const milestoneTasks = milestone ? resolveTaskChildren(milestone) : [];
        if (milestoneTasks.length > 0) {
          const allTasksDone = milestoneTasks.every(
            (_, ti) => updated[makeTaskStateKey(phaseKey, childIdx, ti)] ?? false
          );
          const currentMsDone = localMilestoneDone[`${phaseKey}-${childIdx}`] ?? false;
          if (allTasksDone !== currentMsDone) {
            const msUpdated = {
              ...localMilestoneDone,
              [`${phaseKey}-${childIdx}`]: allTasksDone
            };
            setLocalMilestoneDone(msUpdated);
            onToggleMilestoneDone?.(phaseKey, childIdx, allTasksDone);
            if (sortedMilestones.length > 0) {
              const allMsDone = sortedMilestones.every(
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
      sortMilestones,
      localMilestoneDone,
      setLocalMilestoneDone,
      onToggleMilestoneDone,
      localPhaseDone,
      setLocalPhaseDone,
      onTogglePhaseDone
    ]
  );
  const today = useMemo6(() => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const sorted = useMemo6(
    () => sortPhasesByDate(phases, sortOrder).map((phase) => ({
      ...phase,
      milestones: phase.milestones ? sortMilestones(phase.milestones) : phase.milestones
    })),
    [phases, sortOrder, sortMilestones]
  );
  const overlappingKeys = useMemo6(() => detectPhaseOverlaps(phases), [phases]);
  const lastKey = sorted.at(-1)?.key;
  const anyExpanded = useMemo6(
    () => expandedPhaseKey !== null || Object.values(expandedMilestoneMap).some((v) => v !== null),
    [expandedPhaseKey, expandedMilestoneMap]
  );
  useEffect6(() => {
    if (!anyExpanded) return void 0;
    const handler = () => {
      setExpandedMilestoneMap({});
      setExpandedPhaseKey(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [anyExpanded]);
  const msHeightMapRef = useRef3({});
  const [msSlotHeights, setMsSlotHeights] = useState10({});
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
  return /* @__PURE__ */ jsxs24(Fragment4, { children: [
    /* @__PURE__ */ jsx40(Box28, { sx: { display: { xs: "block", md: "none" } }, children: /* @__PURE__ */ jsx40(
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
    /* @__PURE__ */ jsx40(
      Box28,
      {
        sx: [
          { display: { xs: "none", md: "block" }, position: "relative" },
          ...Array.isArray(sx) ? sx : [sx]
        ],
        ...other,
        children: /* @__PURE__ */ jsx40(Timeline, { sx: timelineRootSx, children: sorted.map((phase, i) => {
          const { isDone, isOverdue, dotColor, yearLabelValue, phaseMilestones, isLastPhase } = resolvePhaseState(phase, i, sorted, lastKey, checklist, localPhaseDone, today);
          if (phase.variant === "marker") {
            return /* @__PURE__ */ jsx40(
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
          const phaseCardNode = /* @__PURE__ */ jsx40("div", { onClick: stopCardPropagation, children: /* @__PURE__ */ jsx40(
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
              taskDoneStates: resolveTaskChildren(phase).reduce(
                (acc, task, ti) => {
                  const done = localTaskDoneMap[makeTaskStateKey(phase.key, null, ti)] ?? task.done ?? false;
                  acc[String(task.key)] = done;
                  acc[`idx-${ti}`] = done;
                  return acc;
                },
                {}
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
            /* @__PURE__ */ jsx40(
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
              /* @__PURE__ */ jsx40(
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
          return /* @__PURE__ */ jsx40(
            Box28,
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
import Box29 from "@mui/material/Box";
import Tooltip8 from "@mui/material/Tooltip";
import IconButton4 from "@mui/material/IconButton";

// src/components/action-bar/icon/icon-action-bar.styles.ts
var iconActionBarRootSx = {
  gap: 1,
  width: 1,
  flexGrow: 1,
  display: "flex"
};

// src/components/action-bar/icon/icon-action-bar.defaults.tsx
import { jsx as jsx41 } from "react/jsx-runtime";
var DEFAULT_ICON_ACTIONS = [
  { tooltip: "Edit", icon: /* @__PURE__ */ jsx41(GiselleIcon, { icon: "solar:pen-bold" }) },
  { tooltip: "View", icon: /* @__PURE__ */ jsx41(GiselleIcon, { icon: "solar:eye-bold" }) },
  {
    tooltip: "Print",
    icon: /* @__PURE__ */ jsx41(GiselleIcon, { icon: "solar:printer-minimalistic-bold" })
  },
  { tooltip: "Send", icon: /* @__PURE__ */ jsx41(GiselleIcon, { icon: "mdi:email" }) },
  { tooltip: "Share", icon: /* @__PURE__ */ jsx41(GiselleIcon, { icon: "solar:share-bold" }) }
];

// src/components/action-bar/icon/icon-action-bar.tsx
import { jsx as jsx42 } from "react/jsx-runtime";
function IconActionBar({
  actions = DEFAULT_ICON_ACTIONS,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx42(Box29, { sx: [iconActionBarRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: actions.map((item, index) => {
    const label = item["aria-label"] ?? item.tooltip;
    const buttonProps = {
      onClick: item.onClick,
      disabled: item.disabled,
      "aria-label": label,
      ...item.component !== void 0 && { component: item.component },
      ...item.href !== void 0 && { href: item.href }
    };
    return /* @__PURE__ */ jsx42(
      Tooltip8,
      {
        title: item.tooltip,
        placement: item.tooltipPlacement ?? "bottom",
        children: /* @__PURE__ */ jsx42("span", { children: /* @__PURE__ */ jsx42(IconButton4, { ...buttonProps, children: item.icon }) })
      },
      `${item.tooltip}-${index}`
    );
  }) });
}

// src/components/layout/showcase/row/two-column/two-column-showcase-row.tsx
import Box30 from "@mui/material/Box";
import Grid2 from "@mui/material/Grid";
import Stack2 from "@mui/material/Stack";
import Typography20 from "@mui/material/Typography";
import { jsx as jsx43, jsxs as jsxs25 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs25(
    Grid2,
    {
      container: true,
      columnSpacing: isVertical ? 0 : { xs: 0, md: 6 },
      rowSpacing: { xs: 4, md: isVertical ? 4 : 0 },
      direction: { xs: "column", md: orientation },
      sx: [{}, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        text && /* @__PURE__ */ jsx43(Grid2, { size: itemSize, children: /* @__PURE__ */ jsxs25(
          Stack2,
          {
            spacing: 2,
            sx: [{ maxWidth: 520 }, ...Array.isArray(textSx) ? textSx : [textSx]],
            children: [
              text.overline && /* @__PURE__ */ jsx43(Typography20, { variant: "overline", sx: { color: "text.secondary" }, children: text.overline }),
              text.heading && /* @__PURE__ */ jsx43(Typography20, { variant: "h4", children: text.heading }),
              text.description && /* @__PURE__ */ jsx43(Typography20, { variant: "body1", color: "text.secondary", children: text.description })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx43(Grid2, { size: itemSize, sx: { minWidth: 0 }, children: /* @__PURE__ */ jsx43(
          Stack2,
          {
            spacing: 2,
            sx: [
              { alignItems: controlsAlign, width: 1, minWidth: 0 },
              ...Array.isArray(controlsSx) ? controlsSx : [controlsSx]
            ],
            children: /* @__PURE__ */ jsx43(Box30, { sx: { width: 1, minWidth: 0 }, children: controls })
          }
        ) })
      ]
    }
  );
}

// src/components/layout/section/title/section-title/section-title.tsx
import Box32 from "@mui/material/Box";
import Typography21 from "@mui/material/Typography";

// src/components/layout/section/title/section-title/section-title.styles.ts
var txtGradientSpanSx = (theme) => ({
  opacity: 0.4,
  display: "inline-block",
  background: `linear-gradient(to right, ${theme.vars.palette.text.primary}, ${channelAlpha(theme.vars.palette.text.primaryChannel, 0.2)})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent"
});

// src/components/layout/section/title/section-title/section-caption.tsx
import Box31 from "@mui/material/Box";
import { jsx as jsx44 } from "react/jsx-runtime";
function SectionCaption({ title, sx, ...other }) {
  return /* @__PURE__ */ jsx44(
    Box31,
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

// src/components/layout/section/title/section-title/section-title.tsx
import { jsx as jsx45, jsxs as jsxs26 } from "react/jsx-runtime";
function SectionTitle({
  sx,
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  ...other
}) {
  return /* @__PURE__ */ jsxs26(
    Box32,
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
        caption && /* @__PURE__ */ jsx45(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
        /* @__PURE__ */ jsxs26(Typography21, { component: "h2", variant: "h2", sx: slotProps?.title?.sx, children: [
          title,
          " ",
          txtGradient && /* @__PURE__ */ jsx45(Box32, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
        ] }),
        description && /* @__PURE__ */ jsx45(
          Box32,
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
import { useCallback as useCallback12 } from "react";
import { AnimatePresence } from "framer-motion";
import Box33 from "@mui/material/Box";

// src/components/nav/floating-sub-nav/floating-sub-nav.const.ts
var SUB_NAV_BUTTON_SIZE = {
  xs: 36,
  sm: 38,
  md: 42,
  lg: 44
};
var PILL_BUTTON_ROW_SPACING = 0.5;

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
  width: SUB_NAV_BUTTON_SIZE,
  height: SUB_NAV_BUTTON_SIZE,
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
import { motion } from "framer-motion";
import Stack3 from "@mui/material/Stack";

// src/components/nav/floating-sub-nav/floating-sub-nav.animations.ts
var PILL_EASING = [0.4, 0, 0.2, 1];
var PILL_TRANSITION_DURATION = 0.28;
var pillTransition = {
  duration: PILL_TRANSITION_DURATION,
  ease: PILL_EASING
};
var pillVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 }
};

// src/components/nav/floating-sub-nav/sub-nav-button.tsx
import { useCallback as useCallback11 } from "react";
import Tooltip9 from "@mui/material/Tooltip";
import ButtonBase2 from "@mui/material/ButtonBase";
import { jsx as jsx46 } from "react/jsx-runtime";
function SubNavButton({ item, isActive, onPress }) {
  const handleClick = useCallback11(() => onPress(item.id), [onPress, item.id]);
  return /* @__PURE__ */ jsx46(Tooltip9, { title: item.label, placement: "top", arrow: true, children: /* @__PURE__ */ jsx46(
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

// src/components/nav/floating-sub-nav/nav-pill.tsx
import { jsx as jsx47 } from "react/jsx-runtime";
function NavPill({ items, activeId, onPress }) {
  return /* @__PURE__ */ jsx47(
    motion.div,
    {
      variants: pillVariants,
      initial: "initial",
      animate: "animate",
      exit: "exit",
      transition: pillTransition,
      children: /* @__PURE__ */ jsx47(
        Stack3,
        {
          component: "nav",
          direction: "column",
          alignItems: "center",
          "aria-label": "Section navigation",
          sx: pillSx,
          children: /* @__PURE__ */ jsx47(Stack3, { direction: "row", spacing: PILL_BUTTON_ROW_SPACING, children: items.map((item) => /* @__PURE__ */ jsx47(
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
import { jsx as jsx48 } from "react/jsx-runtime";
function FloatingSubNav({ items, activeId, onSelect, sticky = false }) {
  const handlePress = useCallback12((id) => onSelect(id), [onSelect]);
  if (sticky) {
    return /* @__PURE__ */ jsx48(Box33, { sx: stickyWrapperSx, children: /* @__PURE__ */ jsx48(Box33, { sx: stickyInnerSx, children: /* @__PURE__ */ jsx48(AnimatePresence, { children: activeId !== null && /* @__PURE__ */ jsx48(NavPill, { items, activeId, onPress: handlePress }) }) }) });
  }
  return /* @__PURE__ */ jsx48(AnimatePresence, { children: activeId !== null && /* @__PURE__ */ jsx48(Box33, { sx: fixedWrapperSx, children: /* @__PURE__ */ jsx48(NavPill, { items, activeId, onPress: handlePress }) }) });
}

// src/components/layout/section/container/section-container.tsx
import Container from "@mui/material/Container";
import { jsx as jsx49 } from "react/jsx-runtime";
function SectionContainer({
  children,
  maxWidth = "lg",
  py = { xs: 8, md: 12 },
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx49(Container, { maxWidth, sx: [{ py }, ...Array.isArray(sx) ? sx : [sx]], ...other, children });
}

// src/components/layout/section/hero/hero-section.tsx
import Box34 from "@mui/material/Box";
import Container2 from "@mui/material/Container";

// src/components/layout/section/hero/hero-section.styles.ts
var heroRootSx = (color) => (theme) => ({
  width: "100%",
  backgroundColor: channelAlpha(theme.vars.palette[color].mainChannel, 0.08)
});
var heroInnerSx = {
  py: { xs: 10, md: 14 },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 3
};
var heroActionsRowSx = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 2,
  mt: 1
};

// src/components/layout/section/hero/hero-section.tsx
import { jsx as jsx50, jsxs as jsxs27 } from "react/jsx-runtime";
function HeroSection({
  headline,
  subtitle,
  actions,
  color = "primary",
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx50(Box34, { sx: [heroRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: /* @__PURE__ */ jsxs27(Container2, { maxWidth: "lg", sx: heroInnerSx, children: [
    headline,
    subtitle,
    actions && /* @__PURE__ */ jsx50(Box34, { sx: heroActionsRowSx, children: actions })
  ] }) });
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

// src/components/animated-gradient-text/animated-gradient-text.tsx
import Box35 from "@mui/material/Box";

// src/components/animated-gradient-text/animated-gradient-text.const.ts
var ANIMATED_GRADIENT_DEFAULT_COLOR1 = "primary";
var ANIMATED_GRADIENT_DEFAULT_COLOR2 = "secondary";
var ANIMATED_GRADIENT_DEFAULT_DURATION = 3;

// src/components/animated-gradient-text/animated-gradient-text.styles.ts
var gradientTextSx = (color1, color2, duration) => ({
  background: `linear-gradient(135deg, var(--mui-palette-${color1}-main), var(--mui-palette-${color2}-main), var(--mui-palette-${color1}-main))`,
  backgroundSize: "200% 200%",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
  animation: `animatedGradientText ${duration}s ease infinite`,
  "@keyframes animatedGradientText": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" }
  }
});

// src/components/animated-gradient-text/animated-gradient-text.tsx
import { jsx as jsx51 } from "react/jsx-runtime";
function AnimatedGradientText({
  children,
  color1 = ANIMATED_GRADIENT_DEFAULT_COLOR1,
  color2 = ANIMATED_GRADIENT_DEFAULT_COLOR2,
  duration = ANIMATED_GRADIENT_DEFAULT_DURATION,
  component = "span",
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx51(
    Box35,
    {
      component,
      sx: [gradientTextSx(color1, color2, duration), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children
    }
  );
}

// src/components/tech-icon-strip/tech-icon-strip.tsx
import Box36 from "@mui/material/Box";
import Typography22 from "@mui/material/Typography";

// src/components/tech-icon-strip/tech-icon-strip.const.ts
var TECH_ICON_STRIP_ICON_SIZE = 32;
var TECH_ICON_STRIP_LABEL_FONT_SIZE = "0.75rem";

// src/components/tech-icon-strip/tech-icon-strip.styles.ts
var titleSx = {
  display: "block",
  mb: 2,
  color: "text.secondary",
  letterSpacing: "0.08em",
  textTransform: "uppercase"
};
var stripWrapperSx = (centered) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 3,
  justifyContent: centered ? "center" : "flex-start",
  alignItems: "flex-start"
});
var itemSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0.5,
  minWidth: 56
};
var iconSlotSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    width: TECH_ICON_STRIP_ICON_SIZE,
    height: TECH_ICON_STRIP_ICON_SIZE
  }
};

// src/components/tech-icon-strip/tech-icon-strip.tsx
import { jsx as jsx52, jsxs as jsxs28 } from "react/jsx-runtime";
function TechIconStrip({
  items,
  title,
  centeredWrap = false,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsxs28(Box36, { sx: [...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    title && /* @__PURE__ */ jsx52(Typography22, { component: "span", sx: titleSx, variant: "overline", children: title }),
    /* @__PURE__ */ jsx52(Box36, { sx: stripWrapperSx(centeredWrap), children: items.map((item) => /* @__PURE__ */ jsxs28(Box36, { sx: itemSx, children: [
      /* @__PURE__ */ jsx52(Box36, { "aria-hidden": true, sx: iconSlotSx, children: item.icon }),
      /* @__PURE__ */ jsx52(Typography22, { sx: { fontSize: TECH_ICON_STRIP_LABEL_FONT_SIZE }, variant: "caption", children: item.label })
    ] }, item.label)) })
  ] });
}
export {
  TOGGLE_ICON_SIZE as ACCORDION_CHECK_ICON_SIZE,
  ACCORDION_DONE_MIN_TOUCH_TARGET,
  TOGGLE_MIN_TOUCH_TARGET as ACCORDION_ICON_BUTTON_MIN_SIZE,
  Accordion,
  AnimatedGradientText,
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
  GiselleSettingsProvider,
  GiselleThemeAndSettingsProvider,
  GiselleThemeProvider,
  HeroSection,
  IconActionBar,
  MetricCard,
  MetricCardDecoration,
  MilestoneBadge,
  PhaseCard,
  QuoteCard,
  STAT_CARD_SPARKLINE_OPTIONS,
  SectionCaption,
  SectionContainer,
  SectionTitle,
  SelectableCard,
  StatCard,
  StatCardRow,
  TOGGLE_ICON_SIZE,
  TOGGLE_MIN_TOUCH_TARGET,
  TaskDetailsRenderer,
  TaskList,
  TechIconStrip,
  TimelineCompact,
  TimelineDot,
  TimelineTwoColumn,
  ToggleIconButton,
  TwoColumnShowcaseRow,
  assignMilestoneSidesByDone,
  channelAlpha,
  createIconRegistrar,
  getCookieValue,
  giselleTheme,
  giselleThemeOptions,
  hexToChannel,
  isDeepEqual,
  pxToRem,
  remToPx,
  resolveCompactColor,
  resolveMaturityColor,
  resolveMaturityLabel,
  setCookieValue,
  useGiselleSettings,
  useLocalStorage,
  useNestedChecklist
};
//# sourceMappingURL=index.js.map