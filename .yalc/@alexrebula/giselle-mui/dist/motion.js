'use client';

// src/components/faq/accordion/faq-accordion.tsx
import { useState } from "react";
import { motion as motion3 } from "framer-motion";
import Box5 from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography2 from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

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

// src/components/layout/section-title/section-title.tsx
import Box3 from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
import Box2 from "@mui/material/Box";
import { jsx as jsx2 } from "react/jsx-runtime";
function SectionCaption({ title, sx, ...other }) {
  return /* @__PURE__ */ jsx2(
    Box2,
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
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function SectionTitle({
  sx,
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  ...other
}) {
  return /* @__PURE__ */ jsxs(
    Box3,
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
        caption && /* @__PURE__ */ jsx3(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
        /* @__PURE__ */ jsxs(Typography, { component: "h2", variant: "h2", sx: slotProps?.title?.sx, children: [
          title,
          " ",
          txtGradient && /* @__PURE__ */ jsx3(Box3, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
        ] }),
        description && /* @__PURE__ */ jsx3(
          Box3,
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
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { jsx as jsx4 } from "react/jsx-runtime";
var MotionSvg = styled(motion.svg)``;
function FaqFloatLine({ sx, vertical, ...other }) {
  return /* @__PURE__ */ jsx4(
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
      children: vertical ? /* @__PURE__ */ jsx4(
        motion.line,
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
      ) : /* @__PURE__ */ jsx4(
        motion.line,
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
  return /* @__PURE__ */ jsx4(
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
      children: /* @__PURE__ */ jsx4("path", { d: "M8 0V16M16 8.08889H0" })
    }
  );
}
function FaqFloatTriangleDownIcon({ sx, ...other }) {
  return /* @__PURE__ */ jsx4(
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
      children: /* @__PURE__ */ jsx4("path", { d: "M10 10L0 0H20L10 10Z" })
    }
  );
}

// src/components/faq/accordion/faq-motion-viewport.tsx
import { motion as motion2 } from "framer-motion";
import Box4 from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { jsx as jsx5 } from "react/jsx-runtime";
var MotionBox = motion2(Box4);
function FaqMotionViewport({ children, sx }) {
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  if (smDown) {
    return /* @__PURE__ */ jsx5(Box4, { sx, children });
  }
  return /* @__PURE__ */ jsx5(
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
import { Fragment, jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
var MotionAccordion = motion3(Accordion);
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
  const [expanded, setExpanded] = useState(faqs[0]?.question ?? false);
  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const resolvedIcon = typeof contactIcon === "string" ? /* @__PURE__ */ jsx6(GiselleIcon, { icon: contactIcon }) : contactIcon;
  return /* @__PURE__ */ jsx6(Box5, { component: "section", sx, ...other, children: /* @__PURE__ */ jsxs2(FaqMotionViewport, { sx: { pt: 10, position: "relative" }, children: [
    /* @__PURE__ */ jsx6(FaqTopLines, {}),
    /* @__PURE__ */ jsxs2(Container, { children: [
      /* @__PURE__ */ jsx6(
        SectionTitle,
        {
          caption,
          title,
          txtGradient,
          sx: { textAlign: "center" }
        }
      ),
      /* @__PURE__ */ jsx6(Box5, { sx: contentBoxSx, children: faqs.map((item, index) => /* @__PURE__ */ jsxs2(
        MotionAccordion,
        {
          disableGutters: true,
          variants: varFade("inUp", 24),
          expanded: expanded === item.question,
          onChange: handleChange(item.question),
          sx: accordionItemSx,
          children: [
            /* @__PURE__ */ jsx6(
              AccordionSummary,
              {
                id: `faq-panel${index}-header`,
                "aria-controls": `faq-panel${index}-content`,
                children: /* @__PURE__ */ jsx6(Typography2, { component: "span", variant: "h6", children: item.question })
              }
            ),
            /* @__PURE__ */ jsx6(AccordionDetails, { children: item.answer })
          ]
        },
        item.question
      )) })
    ] }),
    /* @__PURE__ */ jsxs2(Stack, { sx: { position: "relative" }, children: [
      /* @__PURE__ */ jsx6(FaqBottomLines, {}),
      contactHref && /* @__PURE__ */ jsxs2(Box5, { sx: contactSectionSx, children: [
        /* @__PURE__ */ jsx6(motion3.div, { variants: varFade("in"), children: /* @__PURE__ */ jsx6(Typography2, { variant: "h4", children: contactTitle }) }),
        /* @__PURE__ */ jsx6(motion3.div, { variants: varFade("in"), children: /* @__PURE__ */ jsx6(Typography2, { sx: { mt: 2, mb: 3, color: "text.secondary" }, children: contactDescription }) }),
        /* @__PURE__ */ jsx6(motion3.div, { variants: varFade("in"), children: /* @__PURE__ */ jsx6(
          Button,
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
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsxs2(Stack, { spacing: 8, alignItems: "center", sx: topTriangleStackSx, children: [
      /* @__PURE__ */ jsx6(FaqFloatTriangleDownIcon, { sx: { position: "static", opacity: 0.12 } }),
      /* @__PURE__ */ jsx6(FaqFloatTriangleDownIcon, { sx: smallTriangleSx })
    ] }),
    /* @__PURE__ */ jsx6(FaqFloatLine, { vertical: true, sx: { top: 0, left: FAQ_FLOAT_LINE_LEFT } })
  ] });
}
function FaqBottomLines() {
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx6(FaqFloatLine, { sx: { top: 0, left: 0 } }),
    /* @__PURE__ */ jsx6(FaqFloatLine, { sx: { bottom: 0, left: 0 } }),
    /* @__PURE__ */ jsx6(FaqFloatPlusIcon, { sx: { top: -8, left: FAQ_PLUS_ICON_LEFT } }),
    /* @__PURE__ */ jsx6(FaqFloatPlusIcon, { sx: { bottom: -8, left: FAQ_PLUS_ICON_LEFT } })
  ] });
}
export {
  FaqAccordion
};
//# sourceMappingURL=motion.js.map