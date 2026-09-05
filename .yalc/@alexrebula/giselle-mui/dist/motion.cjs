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

// src/motion-index.ts
var motion_index_exports = {};
__export(motion_index_exports, {
  FaqAccordion: () => FaqAccordion
});
module.exports = __toCommonJS(motion_index_exports);

// src/components/faq/accordion/faq-accordion.tsx
var import_react2 = require("react");
var import_framer_motion3 = require("framer-motion");
var import_Box5 = __toESM(require("@mui/material/Box"), 1);
var import_Stack = __toESM(require("@mui/material/Stack"), 1);
var import_Button = __toESM(require("@mui/material/Button"), 1);
var import_Container = __toESM(require("@mui/material/Container"), 1);
var import_Typography2 = __toESM(require("@mui/material/Typography"), 1);
var import_Accordion = __toESM(require("@mui/material/Accordion"), 1);
var import_AccordionDetails = __toESM(require("@mui/material/AccordionDetails"), 1);
var import_AccordionSummary = __toESM(require("@mui/material/AccordionSummary"), 1);

// src/components/icon/giselle/giselle-icon.tsx
var import_react = require("@iconify/react");
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
    import_react.Icon,
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

// src/components/layout/section-title/section-title.tsx
var import_Box3 = __toESM(require("@mui/material/Box"), 1);
var import_Typography = __toESM(require("@mui/material/Typography"), 1);

// src/utils/theme-utils.ts
function channelAlpha(channel, alpha) {
  return `rgba(${channel} / ${alpha})`;
}

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
var import_Box2 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
function SectionCaption({ title, sx, ...other }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_Box2.default,
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
var import_jsx_runtime3 = require("react/jsx-runtime");
function SectionTitle({
  sx,
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    import_Box3.default,
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
        caption && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_Typography.default, { component: "h2", variant: "h2", sx: slotProps?.title?.sx, children: [
          title,
          " ",
          txtGradient && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_Box3.default, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
        ] }),
        description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_Box3.default,
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

// src/components/faq/accordion/utils.ts
var transitionEnter = (override) => ({
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96],
  ...override
});
var transitionExit = (override) => ({
  duration: 0.48,
  ease: [0.43, 0.13, 0.23, 0.96],
  ...override
});
var varFade = (direction, distance = 120) => {
  const variants = {
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: transitionEnter() },
      exit: { opacity: 0, transition: transitionExit() }
    },
    inUp: {
      initial: { y: distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: transitionEnter() },
      exit: { y: distance, opacity: 0, transition: transitionExit() }
    },
    inDown: {
      initial: { y: -distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: transitionEnter() },
      exit: { y: -distance, opacity: 0, transition: transitionExit() }
    },
    inLeft: {
      initial: { x: -distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: transitionEnter() },
      exit: { x: -distance, opacity: 0, transition: transitionExit() }
    },
    inRight: {
      initial: { x: distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: transitionEnter() },
      exit: { x: distance, opacity: 0, transition: transitionExit() }
    }
  };
  return variants[direction];
};
var varContainer = () => ({
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
});
var svgLineTransition = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96]
};

// src/components/faq/accordion/faq-accordion.const.ts
var FAQ_CONTENT_MAX_WIDTH = 720;
var FAQ_FLOAT_LINE_LEFT = 80;
var FAQ_PLUS_ICON_LEFT = 72;

// src/components/faq/accordion/faq-accordion.styles.ts
var contentBoxSx = {
  mt: 8,
  gap: 1,
  mx: "auto",
  maxWidth: FAQ_CONTENT_MAX_WIDTH,
  display: "flex",
  mb: { xs: 5, md: 8 },
  flexDirection: "column"
};
var accordionItemSx = (theme) => ({
  transition: theme.transitions.create(["background-color"], {
    duration: theme.transitions.duration.shorter
  }),
  py: 1,
  px: 2.5,
  border: "none",
  borderRadius: 2,
  "&:hover": {
    bgcolor: channelAlpha("var(--mui-palette-grey-500Channel)", 0.08)
  },
  "&.MuiAccordion-expanded": {
    bgcolor: channelAlpha("var(--mui-palette-grey-500Channel)", 0.08)
  }
});
var contactSectionSx = {
  px: 3,
  py: 8,
  textAlign: "center",
  background: `linear-gradient(to left, ${channelAlpha("var(--mui-palette-grey-500Channel)", 0.08)}, transparent)`
};
var topTriangleStackSx = {
  top: 64,
  left: FAQ_FLOAT_LINE_LEFT,
  position: "absolute",
  transform: "translateX(-50%)"
};
var smallTriangleSx = {
  width: 30,
  height: 15,
  opacity: 0.24,
  position: "static"
};
var floatDecorationBase = (theme) => ({
  zIndex: 2,
  display: "none",
  color: "grey.500",
  position: "absolute",
  "& line": { strokeDasharray: 3, stroke: "currentColor" },
  "& path": { fill: "currentColor", stroke: "currentColor" },
  [theme.breakpoints.up(1440)]: { display: "block" }
});

// src/components/faq/accordion/faq-accordion-svg.tsx
var import_framer_motion = require("framer-motion");
var import_styles = require("@mui/material/styles");
var import_jsx_runtime4 = require("react/jsx-runtime");
var MotionSvg = (0, import_styles.styled)(import_framer_motion.motion.svg)``;
function FaqFloatLine({ sx, vertical, ...other }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    MotionSvg,
    {
      sx: [
        (theme) => ({
          ...floatDecorationBase(theme),
          width: 1,
          zIndex: 1,
          height: "1px",
          opacity: 0.24,
          ...vertical && { width: "1px", height: 1 }
        }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: vertical ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_framer_motion.motion.line,
        {
          x1: "0.5",
          x2: "0.5",
          y1: "0",
          y2: "100%",
          variants: {
            initial: { y2: "0%" },
            animate: { y2: "100%", transition: svgLineTransition }
          }
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_framer_motion.motion.line,
        {
          x1: "0",
          x2: "100%",
          y1: "0.5",
          y2: "0.5",
          variants: {
            initial: { x2: "0%" },
            animate: { x2: "100%", transition: svgLineTransition }
          }
        }
      )
    }
  );
}
function FaqFloatPlusIcon({ sx, ...other }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    MotionSvg,
    {
      variants: {
        initial: { scale: 0 },
        animate: { scale: 1, transition: svgLineTransition }
      },
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      sx: [
        (theme) => ({
          ...floatDecorationBase(theme),
          width: 16,
          height: 16
        }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M8 0V16M16 8.08889H0" })
    }
  );
}
function FaqFloatTriangleDownIcon({ sx, ...other }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    MotionSvg,
    {
      variants: {
        initial: { scaleX: 0 },
        animate: { scaleX: 1, transition: svgLineTransition }
      },
      width: "20",
      height: "10",
      viewBox: "0 0 20 10",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      sx: [
        (theme) => ({
          ...floatDecorationBase(theme),
          width: 20,
          height: 10
        }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M10 10L0 0H20L10 10Z" })
    }
  );
}

// src/components/faq/accordion/faq-motion-viewport.tsx
var import_framer_motion2 = require("framer-motion");
var import_Box4 = __toESM(require("@mui/material/Box"), 1);
var import_useMediaQuery = __toESM(require("@mui/material/useMediaQuery"), 1);
var import_jsx_runtime5 = require("react/jsx-runtime");
var MotionBox = (0, import_framer_motion2.motion)(import_Box4.default);
function FaqMotionViewport({ children, sx }) {
  const smDown = (0, import_useMediaQuery.default)((theme) => theme.breakpoints.down("sm"));
  if (smDown) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_Box4.default, { sx, children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    MotionBox,
    {
      initial: "initial",
      whileInView: "animate",
      variants: varContainer(),
      viewport: { once: true, amount: 0.3 },
      sx,
      children
    }
  );
}

// src/components/faq/accordion/faq-accordion.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var MotionAccordion = (0, import_framer_motion3.motion)(import_Accordion.default);
function FaqAccordion({
  caption = "FAQs",
  title = "Frequently Asked",
  txtGradient = "Questions",
  faqs,
  contactTitle = "Still have questions?",
  contactDescription = "Reach out directly \u2014 we respond within one business day.",
  contactHref,
  contactLabel = "Contact us",
  contactIcon,
  sx,
  ...other
}) {
  const [expanded, setExpanded] = (0, import_react2.useState)(faqs[0]?.question ?? false);
  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const resolvedIcon = typeof contactIcon === "string" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(GiselleIcon, { icon: contactIcon }) : contactIcon;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_Box5.default, { component: "section", sx, ...other, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(FaqMotionViewport, { sx: { pt: 10, position: "relative" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FaqTopLines, {}),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_Container.default, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        SectionTitle,
        {
          caption,
          title,
          txtGradient,
          sx: { textAlign: "center" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_Box5.default, { sx: contentBoxSx, children: faqs.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        MotionAccordion,
        {
          disableGutters: true,
          variants: varFade("inUp", 24),
          expanded: expanded === item.question,
          onChange: handleChange(item.question),
          sx: accordionItemSx,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              import_AccordionSummary.default,
              {
                id: `faq-panel${index}-header`,
                "aria-controls": `faq-panel${index}-content`,
                children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_Typography2.default, { component: "span", variant: "h6", children: item.question })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_AccordionDetails.default, { children: item.answer })
          ]
        },
        item.question
      )) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_Stack.default, { sx: { position: "relative" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FaqBottomLines, {}),
      contactHref && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_Box5.default, { sx: contactSectionSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_framer_motion3.motion.div, { variants: varFade("in"), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_Typography2.default, { variant: "h4", children: contactTitle }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_framer_motion3.motion.div, { variants: varFade("in"), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_Typography2.default, { sx: { mt: 2, mb: 3, color: "text.secondary" }, children: contactDescription }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_framer_motion3.motion.div, { variants: varFade("in"), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          import_Button.default,
          {
            color: "inherit",
            variant: "contained",
            href: contactHref,
            startIcon: resolvedIcon,
            children: contactLabel
          }
        ) })
      ] })
    ] })
  ] }) });
}
function FaqTopLines() {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_Stack.default, { spacing: 8, alignItems: "center", sx: topTriangleStackSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FaqFloatTriangleDownIcon, { sx: { position: "static", opacity: 0.12 } }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FaqFloatTriangleDownIcon, { sx: smallTriangleSx })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FaqFloatLine, { vertical: true, sx: { top: 0, left: FAQ_FLOAT_LINE_LEFT } })
  ] });
}
function FaqBottomLines() {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FaqFloatLine, { sx: { top: 0, left: 0 } }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FaqFloatLine, { sx: { bottom: 0, left: 0 } }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FaqFloatPlusIcon, { sx: { top: -8, left: FAQ_PLUS_ICON_LEFT } }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FaqFloatPlusIcon, { sx: { bottom: -8, left: FAQ_PLUS_ICON_LEFT } })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FaqAccordion
});
//# sourceMappingURL=motion.cjs.map