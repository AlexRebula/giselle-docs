'use client';

// src/components/motion/variants/transition/transition.const.ts
var TRANSITION_ENTER_DURATION = 0.64;
var TRANSITION_EXIT_DURATION = 0.48;
var TRANSITION_EASE = [0.43, 0.13, 0.23, 0.96];

// src/components/motion/variants/transition/transition.ts
var transitionEnter = (opts) => ({
  duration: TRANSITION_ENTER_DURATION,
  ease: TRANSITION_EASE,
  ...opts
});
var transitionExit = (opts) => ({
  duration: TRANSITION_EXIT_DURATION,
  ease: TRANSITION_EASE,
  ...opts
});

// src/components/motion/variants/fade/fade.const.ts
var FADE_DEFAULT_DISTANCE = 120;

// src/components/motion/variants/fade/fade.ts
var fade = (direction, options) => {
  const distance = options?.distance ?? FADE_DEFAULT_DISTANCE;
  const tIn = options?.transitionIn;
  const tOut = options?.transitionOut;
  const map = {
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: transitionEnter(tIn) },
      exit: { opacity: 0, transition: transitionExit(tOut) }
    },
    inUp: {
      initial: { y: distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { y: distance, opacity: 0, transition: transitionExit(tOut) }
    },
    inDown: {
      initial: { y: -distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { y: -distance, opacity: 0, transition: transitionExit(tOut) }
    },
    inLeft: {
      initial: { x: -distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { x: -distance, opacity: 0, transition: transitionExit(tOut) }
    },
    inRight: {
      initial: { x: distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { x: distance, opacity: 0, transition: transitionExit(tOut) }
    },
    out: {
      initial: { opacity: 1 },
      animate: { opacity: 0, transition: transitionEnter(tIn) },
      exit: { opacity: 1, transition: transitionExit(tOut) }
    },
    outUp: {
      initial: { y: 0, opacity: 1 },
      animate: { y: -distance, opacity: 0, transition: transitionEnter(tIn) },
      exit: { y: 0, opacity: 1, transition: transitionExit(tOut) }
    },
    outDown: {
      initial: { y: 0, opacity: 1 },
      animate: { y: distance, opacity: 0, transition: transitionEnter(tIn) },
      exit: { y: 0, opacity: 1, transition: transitionExit(tOut) }
    },
    outLeft: {
      initial: { x: 0, opacity: 1 },
      animate: { x: -distance, opacity: 0, transition: transitionEnter(tIn) },
      exit: { x: 0, opacity: 1, transition: transitionExit(tOut) }
    },
    outRight: {
      initial: { x: 0, opacity: 1 },
      animate: { x: distance, opacity: 0, transition: transitionEnter(tIn) },
      exit: { x: 0, opacity: 1, transition: transitionExit(tOut) }
    }
  };
  return map[direction];
};

// src/components/motion/variants/container/container.const.ts
var CONTAINER_STAGGER_CHILDREN = 0.05;
var CONTAINER_DELAY_CHILDREN = 0.05;
var CONTAINER_EXIT_STAGGER_DIRECTION = -1;

// src/components/motion/variants/container/container.ts
var container = (options) => ({
  animate: {
    transition: {
      staggerChildren: CONTAINER_STAGGER_CHILDREN,
      delayChildren: CONTAINER_DELAY_CHILDREN,
      ...options?.transitionIn
    }
  },
  exit: {
    transition: {
      staggerChildren: CONTAINER_STAGGER_CHILDREN,
      staggerDirection: CONTAINER_EXIT_STAGGER_DIRECTION,
      ...options?.transitionOut
    }
  }
});

// src/components/motion/variants/slide/slide.const.ts
var SLIDE_DEFAULT_DISTANCE = 160;

// src/components/motion/variants/slide/slide.ts
var slide = (direction, options) => {
  const distance = options?.distance ?? SLIDE_DEFAULT_DISTANCE;
  const tIn = options?.transitionIn;
  const tOut = options?.transitionOut;
  const map = {
    inUp: {
      initial: { y: distance },
      animate: { y: 0, transition: transitionEnter(tIn) },
      exit: { y: distance, transition: transitionExit(tOut) }
    },
    inDown: {
      initial: { y: -distance },
      animate: { y: 0, transition: transitionEnter(tIn) },
      exit: { y: -distance, transition: transitionExit(tOut) }
    },
    inLeft: {
      initial: { x: -distance },
      animate: { x: 0, transition: transitionEnter(tIn) },
      exit: { x: -distance, transition: transitionExit(tOut) }
    },
    inRight: {
      initial: { x: distance },
      animate: { x: 0, transition: transitionEnter(tIn) },
      exit: { x: distance, transition: transitionExit(tOut) }
    },
    outUp: {
      initial: { y: 0 },
      animate: { y: -distance, transition: transitionEnter(tIn) },
      exit: { y: 0, transition: transitionExit(tOut) }
    },
    outDown: {
      initial: { y: 0 },
      animate: { y: distance, transition: transitionEnter(tIn) },
      exit: { y: 0, transition: transitionExit(tOut) }
    },
    outLeft: {
      initial: { x: 0 },
      animate: { x: -distance, transition: transitionEnter(tIn) },
      exit: { x: 0, transition: transitionExit(tOut) }
    },
    outRight: {
      initial: { x: 0 },
      animate: { x: distance, transition: transitionEnter(tIn) },
      exit: { x: 0, transition: transitionExit(tOut) }
    }
  };
  return map[direction];
};

// src/components/motion/variants/scale/scale.ts
var scale = (direction, options) => {
  const tIn = options?.transitionIn;
  const tOut = options?.transitionOut;
  const map = {
    in: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0, transition: transitionExit(tOut) }
    },
    inX: {
      initial: { scaleX: 0, opacity: 0 },
      animate: { scaleX: 1, opacity: 1, transition: transitionEnter(tIn) },
      exit: { scaleX: 0, opacity: 0, transition: transitionExit(tOut) }
    },
    inY: {
      initial: { scaleY: 0, opacity: 0 },
      animate: { scaleY: 1, opacity: 1, transition: transitionEnter(tIn) },
      exit: { scaleY: 0, opacity: 0, transition: transitionExit(tOut) }
    },
    out: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, transition: transitionEnter(tIn) },
      exit: { scale: 1, opacity: 1, transition: transitionExit(tOut) }
    },
    outX: {
      initial: { scaleX: 1, opacity: 1 },
      animate: { scaleX: 0, opacity: 0, transition: transitionEnter(tIn) },
      exit: { scaleX: 1, opacity: 1, transition: transitionExit(tOut) }
    },
    outY: {
      initial: { scaleY: 1, opacity: 1 },
      animate: { scaleY: 0, opacity: 0, transition: transitionEnter(tIn) },
      exit: { scaleY: 1, opacity: 1, transition: transitionExit(tOut) }
    }
  };
  return map[direction];
};

// src/components/motion/variants/bounce/bounce.const.ts
var BOUNCE_DEFAULT_DISTANCE = 720;
var BOUNCE_IN_SCALE_KEYFRAMES = [0.3, 1.1, 0.9, 1.03, 0.97, 1];
var BOUNCE_IN_OPACITY_KEYFRAMES = [0, 1, 1, 1, 1, 1];
var BOUNCE_IN_SCALE_Y_KEYFRAMES = [4, 0.9, 0.95, 0.985, 1];
var BOUNCE_IN_SCALE_X_KEYFRAMES = [3, 1, 0.98, 0.995, 1];
var BOUNCE_IN_DIRECTIONAL_OPACITY_KEYFRAMES = [0, 1, 1, 1, 1];
var BOUNCE_IN_UP_Y_KEYFRAMES = (distance) => [distance, -24, 12, -4, 0];
var BOUNCE_IN_DOWN_Y_KEYFRAMES = (distance) => [-distance, 24, -12, 4, 0];
var BOUNCE_IN_LEFT_X_KEYFRAMES = (distance) => [-distance, 24, -12, 4, 0];
var BOUNCE_IN_RIGHT_X_KEYFRAMES = (distance) => [distance, -24, 12, -4, 0];
var BOUNCE_OUT_SCALE_KEYFRAMES = [0.9, 1.1, 0.3];
var BOUNCE_OUT_OPACITY_KEYFRAMES = [1, 1, 0];
var BOUNCE_OUT_SCALE_Y_KEYFRAMES = [0.985, 0.9, 3];
var BOUNCE_OUT_SCALE_X_KEYFRAMES = [1, 0.9, 2];
var BOUNCE_OUT_UP_Y_KEYFRAMES = (distance) => [-12, 24, -distance];
var BOUNCE_OUT_DOWN_Y_KEYFRAMES = (distance) => [12, -24, distance];
var BOUNCE_OUT_LEFT_X_KEYFRAMES = (distance) => [0, 24, -distance];
var BOUNCE_OUT_RIGHT_X_KEYFRAMES = (distance) => [0, -24, distance];

// src/components/motion/variants/bounce/bounce.ts
var bounce = (direction, options) => {
  const distance = options?.distance ?? BOUNCE_DEFAULT_DISTANCE;
  const t = options?.transition;
  const map = {
    in: {
      initial: {},
      animate: {
        scale: [...BOUNCE_IN_SCALE_KEYFRAMES],
        opacity: [...BOUNCE_IN_OPACITY_KEYFRAMES],
        transition: transitionEnter(t)
      }
    },
    inUp: {
      initial: {},
      animate: {
        y: BOUNCE_IN_UP_Y_KEYFRAMES(distance),
        scaleY: [...BOUNCE_IN_SCALE_Y_KEYFRAMES],
        opacity: [...BOUNCE_IN_DIRECTIONAL_OPACITY_KEYFRAMES],
        transition: transitionEnter(t)
      }
    },
    inDown: {
      initial: {},
      animate: {
        y: BOUNCE_IN_DOWN_Y_KEYFRAMES(distance),
        scaleY: [...BOUNCE_IN_SCALE_Y_KEYFRAMES],
        opacity: [...BOUNCE_IN_DIRECTIONAL_OPACITY_KEYFRAMES],
        transition: transitionEnter(t)
      }
    },
    inLeft: {
      initial: {},
      animate: {
        x: BOUNCE_IN_LEFT_X_KEYFRAMES(distance),
        scaleX: [...BOUNCE_IN_SCALE_X_KEYFRAMES],
        opacity: [...BOUNCE_IN_DIRECTIONAL_OPACITY_KEYFRAMES],
        transition: transitionEnter(t)
      }
    },
    inRight: {
      initial: {},
      animate: {
        x: BOUNCE_IN_RIGHT_X_KEYFRAMES(distance),
        scaleX: [...BOUNCE_IN_SCALE_X_KEYFRAMES],
        opacity: [...BOUNCE_IN_DIRECTIONAL_OPACITY_KEYFRAMES],
        transition: transitionEnter(t)
      }
    },
    out: {
      animate: {
        scale: [...BOUNCE_OUT_SCALE_KEYFRAMES],
        opacity: [...BOUNCE_OUT_OPACITY_KEYFRAMES],
        transition: transitionExit(t)
      }
    },
    outUp: {
      animate: {
        y: BOUNCE_OUT_UP_Y_KEYFRAMES(distance),
        scaleY: [...BOUNCE_OUT_SCALE_Y_KEYFRAMES],
        opacity: [...BOUNCE_OUT_OPACITY_KEYFRAMES],
        transition: transitionExit(t)
      }
    },
    outDown: {
      animate: {
        y: BOUNCE_OUT_DOWN_Y_KEYFRAMES(distance),
        scaleY: [...BOUNCE_OUT_SCALE_Y_KEYFRAMES],
        opacity: [...BOUNCE_OUT_OPACITY_KEYFRAMES],
        transition: transitionExit(t)
      }
    },
    outLeft: {
      animate: {
        x: BOUNCE_OUT_LEFT_X_KEYFRAMES(distance),
        scaleX: [...BOUNCE_OUT_SCALE_X_KEYFRAMES],
        opacity: [...BOUNCE_OUT_OPACITY_KEYFRAMES],
        transition: transitionExit(t)
      }
    },
    outRight: {
      animate: {
        x: BOUNCE_OUT_RIGHT_X_KEYFRAMES(distance),
        scaleX: [...BOUNCE_OUT_SCALE_X_KEYFRAMES],
        opacity: [...BOUNCE_OUT_OPACITY_KEYFRAMES],
        transition: transitionExit(t)
      }
    }
  };
  return map[direction];
};

// src/components/motion/variants/rotate/rotate.const.ts
var ROTATE_DEFAULT_DEGREES = 360;

// src/components/motion/variants/rotate/rotate.ts
var rotate = (direction, options) => {
  const deg = options?.deg ?? ROTATE_DEFAULT_DEGREES;
  const tIn = options?.transitionIn;
  const tOut = options?.transitionOut;
  const map = {
    in: {
      initial: { opacity: 0, rotate: -deg },
      animate: { opacity: 1, rotate: 0, transition: transitionEnter(tIn) },
      exit: { opacity: 0, rotate: -deg, transition: transitionExit(tOut) }
    },
    out: {
      initial: { opacity: 1, rotate: 0 },
      animate: { opacity: 0, rotate: -deg, transition: transitionExit(tOut) }
    }
  };
  return map[direction];
};

// src/components/motion/variants/flip/flip.const.ts
var FLIP_IN_ROTATION = -180;
var FLIP_OUT_ROTATION = 70;

// src/components/motion/variants/flip/flip.ts
var flip = (direction, options) => {
  const tIn = options?.transitionIn;
  const tOut = options?.transitionOut;
  const map = {
    inX: {
      initial: { rotateX: FLIP_IN_ROTATION, opacity: 0 },
      animate: { rotateX: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { rotateX: FLIP_IN_ROTATION, opacity: 0, transition: transitionExit(tOut) }
    },
    inY: {
      initial: { rotateY: FLIP_IN_ROTATION, opacity: 0 },
      animate: { rotateY: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { rotateY: FLIP_IN_ROTATION, opacity: 0, transition: transitionExit(tOut) }
    },
    outX: {
      initial: { rotateX: 0, opacity: 1 },
      animate: { rotateX: FLIP_OUT_ROTATION, opacity: 0, transition: transitionExit(tOut) }
    },
    outY: {
      initial: { rotateY: 0, opacity: 1 },
      animate: { rotateY: FLIP_OUT_ROTATION, opacity: 0, transition: transitionExit(tOut) }
    }
  };
  return map[direction];
};

// src/components/motion/variants/zoom/zoom.const.ts
var ZOOM_DEFAULT_DISTANCE = 720;

// src/components/motion/variants/zoom/zoom.ts
var zoom = (direction, options) => {
  const distance = options?.distance ?? ZOOM_DEFAULT_DISTANCE;
  const tIn = options?.transitionIn;
  const map = {
    in: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0 }
    },
    inUp: {
      initial: { scale: 0, opacity: 0, translateY: distance },
      animate: { scale: 1, opacity: 1, translateY: 0, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0, translateY: distance }
    },
    inDown: {
      initial: { scale: 0, opacity: 0, translateY: -distance },
      animate: { scale: 1, opacity: 1, translateY: 0, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0, translateY: -distance }
    },
    inLeft: {
      initial: { scale: 0, opacity: 0, translateX: -distance },
      animate: { scale: 1, opacity: 1, translateX: 0, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0, translateX: -distance }
    },
    inRight: {
      initial: { scale: 0, opacity: 0, translateX: distance },
      animate: { scale: 1, opacity: 1, translateX: 0, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0, translateX: distance }
    },
    out: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, transition: transitionEnter(tIn) }
    },
    outUp: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateY: -distance, transition: transitionEnter(tIn) }
    },
    outDown: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateY: distance, transition: transitionEnter(tIn) }
    },
    outLeft: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateX: -distance, transition: transitionEnter(tIn) }
    },
    outRight: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateX: distance, transition: transitionEnter(tIn) }
    }
  };
  return map[direction];
};

// src/components/motion/variants/actions/actions.const.ts
var DEFAULT_HOVER_SCALE = 1.09;
var DEFAULT_TAP_SCALE = 0.9;
var TRANSITION_HOVER_DURATION = 0.32;
var TRANSITION_TAP_STIFFNESS = 400;
var TRANSITION_TAP_DAMPING = 18;
var TRANSITION_TAP_TYPE = "spring";

// src/components/motion/variants/actions/actions.ts
var hover = (value = DEFAULT_HOVER_SCALE) => ({ scale: value });
var tap = (value = DEFAULT_TAP_SCALE) => ({ scale: value });
var transitionTap = (props) => ({
  type: TRANSITION_TAP_TYPE,
  stiffness: TRANSITION_TAP_STIFFNESS,
  damping: TRANSITION_TAP_DAMPING,
  ...props
});
var transitionHover = (props) => ({
  duration: TRANSITION_HOVER_DURATION,
  ease: TRANSITION_EASE,
  ...props
});

// src/components/motion/container/motion-container.tsx
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import { jsx } from "react/jsx-runtime";
function MotionContainer({
  animate,
  children,
  action = false,
  ...other
}) {
  const animateValue = action && !animate ? "exit" : "animate";
  return /* @__PURE__ */ jsx(
    Box,
    {
      component: motion.div,
      variants: container(),
      initial: action ? false : "initial",
      animate: animateValue,
      exit: action ? void 0 : "exit",
      ...other,
      children
    }
  );
}

// src/components/motion/viewport/motion-viewport.tsx
import { motion as motion2 } from "framer-motion";
import Box2 from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { jsx as jsx2 } from "react/jsx-runtime";
function MotionViewport({
  children,
  viewport,
  sx,
  disableAnimateOnMobile = true,
  ...other
}) {
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  if (smDown && disableAnimateOnMobile) {
    return /* @__PURE__ */ jsx2(Box2, { sx, ...other, children });
  }
  return /* @__PURE__ */ jsx2(
    Box2,
    {
      component: motion2.div,
      initial: "initial",
      whileInView: "animate",
      variants: container(),
      viewport: { once: true, amount: 0.3, ...viewport },
      sx,
      ...other,
      children
    }
  );
}

// src/components/motion/use-scroll-parallax/use-scroll-parallax.ts
import { useRef } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

// src/components/motion/use-scroll-parallax/use-scroll-parallax.const.ts
var LAYER_MULTIPLIERS = [40, 80, 120, 160, 200];
var USE_SCROLL_PARALLAX_SPRING_MASS = 0.1;
var USE_SCROLL_PARALLAX_SPRING_DAMPING = 20;
var USE_SCROLL_PARALLAX_SPRING_STIFFNESS = 300;

// src/components/motion/use-scroll-parallax/use-scroll-parallax.ts
function useScrollParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const springConfig = {
    mass: USE_SCROLL_PARALLAX_SPRING_MASS,
    damping: USE_SCROLL_PARALLAX_SPRING_DAMPING,
    stiffness: USE_SCROLL_PARALLAX_SPRING_STIFFNESS
  };
  const t0 = useTransform(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[0], LAYER_MULTIPLIERS[0]]);
  const t1 = useTransform(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[1], LAYER_MULTIPLIERS[1]]);
  const t2 = useTransform(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[2], LAYER_MULTIPLIERS[2]]);
  const t3 = useTransform(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[3], LAYER_MULTIPLIERS[3]]);
  const t4 = useTransform(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[4], LAYER_MULTIPLIERS[4]]);
  const l0 = useSpring(t0, springConfig);
  const l1 = useSpring(t1, springConfig);
  const l2 = useSpring(t2, springConfig);
  const l3 = useSpring(t3, springConfig);
  const l4 = useSpring(t4, springConfig);
  return { ref, layers: [l0, l1, l2, l3, l4] };
}

// src/components/hero/interactive-logo/interactive-logo.tsx
import { useRef as useRef3, useMemo, useState as useState2, useEffect as useEffect2, useCallback } from "react";
import {
  motion as motion6,
  useSpring as useSpring2,
  useTransform as useTransform2,
  useMotionValue,
  useReducedMotion,
  useMotionTemplate
} from "framer-motion";
import Box6 from "@mui/material/Box";

// src/utils/use-image-preloader.ts
import { preload } from "react-dom";
function useImagePreloader(srcs, highPrioritySrc) {
  srcs.forEach((src) => {
    if (src) {
      preload(src, {
        as: "image",
        fetchPriority: src === highPrioritySrc ? "high" : "auto"
      });
    }
  });
}

// src/components/hero/interactive-logo/portrait-layer.tsx
import { motion as motion3 } from "framer-motion";
import Box3 from "@mui/material/Box";

// src/components/hero/interactive-logo/interactive-logo.styles.ts
var originalLayerSx = {
  position: "relative",
  zIndex: 1,
  width: 1,
  height: 1,
  willChange: "transform"
};
var artisticLogoSx = {
  inset: 0,
  zIndex: 2,
  width: 1,
  height: 1,
  objectFit: "contain",
  objectPosition: "center center",
  position: "absolute",
  pointerEvents: "none"
};
var portraitWrapperSx = {
  top: "50%",
  left: "50%",
  zIndex: 3,
  width: "100%",
  height: "100%",
  overflow: "visible",
  objectFit: "contain",
  objectPosition: "center center",
  position: "absolute",
  pointerEvents: "none",
  transform: "translate(-50%, -50%) scale(3.8)"
};
var portraitImageSx = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  objectPosition: "center center",
  display: "block"
};
var innerContainerSx = {
  position: "relative",
  display: "inline-flex",
  width: 1,
  height: 1,
  overflow: "visible",
  transformStyle: "preserve-3d",
  transition: "filter 240ms ease",
  mb: { xs: 0 }
};
var rootBoxSx = (cursor) => () => ({
  perspective: 1200,
  cursor,
  overflow: "visible"
});
var logoStack3dWrapperSx = {
  position: "relative",
  width: 1,
  height: 1
};

// src/components/hero/interactive-logo/portrait-layer.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function PortraitLayer({
  portraitSrc,
  portraitAlt,
  showPortrait,
  portraitFadeTransition
}) {
  if (!portraitSrc) {
    return null;
  }
  return /* @__PURE__ */ jsx3(Box3, { sx: portraitWrapperSx, children: /* @__PURE__ */ jsx3(
    Box3,
    {
      component: motion3.img,
      alt: portraitAlt,
      src: portraitSrc,
      initial: {
        opacity: 0,
        scale: 1.035,
        filter: "blur(10px)"
      },
      animate: {
        opacity: showPortrait ? 1 : 0,
        scale: showPortrait ? 1 : 1.035,
        filter: showPortrait ? "blur(0px)" : "blur(10px)"
      },
      transition: portraitFadeTransition,
      sx: portraitImageSx
    }
  ) });
}

// src/components/hero/interactive-logo/original-logo-layer.tsx
import { motion as motion4 } from "framer-motion";
import Box4 from "@mui/material/Box";
import { jsx as jsx4 } from "react/jsx-runtime";
function OriginalLogoLayer({
  hoverPhase,
  logoFadeTransition,
  activeFrame,
  logoAlt,
  children
}) {
  return /* @__PURE__ */ jsx4(
    Box4,
    {
      component: motion4.div,
      initial: {
        opacity: 0,
        scale: 1,
        filter: "blur(0px)"
      },
      animate: {
        opacity: hoverPhase === "artistic" ? 1 : 0,
        scale: hoverPhase === "artistic" ? 1 : 0.985,
        filter: hoverPhase === "artistic" ? "blur(0px)" : "blur(4px)"
      },
      transition: logoFadeTransition,
      sx: originalLayerSx,
      children: activeFrame ? /* @__PURE__ */ jsx4(
        Box4,
        {
          component: "img",
          alt: logoAlt ?? "Logo",
          src: activeFrame,
          sx: { width: 1, height: 1 }
        }
      ) : children
    }
  );
}

// src/components/hero/interactive-logo/artistic-logo-layer.tsx
import { motion as motion5 } from "framer-motion";
import Box5 from "@mui/material/Box";
import { jsx as jsx5 } from "react/jsx-runtime";
function ArtisticLogoLayer({
  artisticLogoSrc,
  showArtisticLogo,
  logoFadeTransition,
  logoAlt
}) {
  if (!artisticLogoSrc) {
    return null;
  }
  return /* @__PURE__ */ jsx5(
    Box5,
    {
      component: motion5.img,
      alt: logoAlt ?? "Logo",
      src: artisticLogoSrc,
      initial: {
        opacity: 1,
        scale: 1.03,
        filter: "blur(8px)"
      },
      animate: {
        opacity: showArtisticLogo ? 1 : 0,
        scale: showArtisticLogo ? 1 : 1.03,
        filter: showArtisticLogo ? "blur(0px)" : "blur(8px)"
      },
      transition: logoFadeTransition,
      sx: artisticLogoSx
    }
  );
}

// src/components/hero/interactive-logo/use-hover-phase-transition.ts
import { useRef as useRef2, useState, useEffect } from "react";

// src/components/hero/interactive-logo/interactive-logo.const.ts
var DEFAULT_PORTRAIT_DIRECTION = "forward";
var PORTRAIT_ACTIVATION_DELAY_MS = 500;

// src/components/hero/interactive-logo/use-hover-phase-transition.ts
function useHoverPhaseTransition({
  isHovered,
  hasPortrait,
  reducedMotion
}) {
  const [hoverPhase, setHoverPhase] = useState("idle");
  const [hasActivatedPortrait, setHasActivatedPortrait] = useState(false);
  const [activePortraitDirection, setActivePortraitDirection] = useState(DEFAULT_PORTRAIT_DIRECTION);
  const portraitTimeoutRef = useRef2(null);
  useEffect(() => {
    if (portraitTimeoutRef.current) {
      globalThis.clearTimeout(portraitTimeoutRef.current);
      portraitTimeoutRef.current = null;
    }
    if (!isHovered) {
      setActivePortraitDirection(DEFAULT_PORTRAIT_DIRECTION);
      setHoverPhase("idle");
      return void 0;
    }
    if (hasActivatedPortrait && hasPortrait) {
      setHoverPhase("portrait");
      return void 0;
    }
    setHoverPhase("artistic");
    if (!hasPortrait) {
      return void 0;
    }
    portraitTimeoutRef.current = globalThis.setTimeout(
      () => {
        setHasActivatedPortrait(true);
        setActivePortraitDirection(DEFAULT_PORTRAIT_DIRECTION);
        setHoverPhase("portrait");
      },
      reducedMotion ? 0 : PORTRAIT_ACTIVATION_DELAY_MS
    );
    return () => {
      if (portraitTimeoutRef.current) {
        globalThis.clearTimeout(portraitTimeoutRef.current);
        portraitTimeoutRef.current = null;
      }
    };
  }, [hasActivatedPortrait, hasPortrait, isHovered, reducedMotion]);
  return { hoverPhase, hasActivatedPortrait, activePortraitDirection, setActivePortraitDirection };
}

// src/components/hero/interactive-logo/interactive-logo.utils.ts
function getRandomPortraitSrc(src) {
  if (typeof src === "string") return src;
  if (src.length === 0) return "";
  return src[Math.floor(Math.random() * src.length)] ?? "";
}
function getPortraitDirectionFromAngle(angle) {
  const abs = Math.abs(angle);
  if (abs >= 157.5) return "left";
  if (angle >= 112.5) return "down-left";
  if (angle >= 67.5) return "down";
  if (angle >= 22.5) return "down-right";
  if (angle >= -22.5) return "right";
  if (angle >= -67.5) return "up-right";
  if (angle >= -112.5) return "up";
  if (angle >= -157.5) return "up-left";
  return "left";
}
function buildPortraitSourceMap(portraitSrc, portraitSources) {
  const map = {};
  if (portraitSrc) {
    map["forward"] = portraitSrc;
  }
  portraitSources?.forEach(({ direction, src }) => {
    const isEmpty = typeof src === "string" ? src === "" : src.length === 0;
    if (!isEmpty) {
      map[direction] = src;
    }
  });
  return map;
}
function getCursorStyle(reducedMotion, isPointerDown) {
  if (reducedMotion === true) return "default";
  return isPointerDown ? "grabbing" : "grab";
}

// src/components/hero/interactive-logo/interactive-logo.tsx
import { jsx as jsx6, jsxs } from "react/jsx-runtime";
function InteractiveHeroLogo({
  sx,
  rootSx,
  frameSources,
  artisticLogoSrc,
  logoAlt,
  portraitSrc,
  portraitSources,
  portraitAlt = "Portrait",
  children,
  ...other
}) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef3(null);
  const scrub = useMotionValue(0);
  const scrubSpring = useSpring2(scrub, { stiffness: 240, damping: 28, mass: 0.25 });
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const rotateX = useSpring2(tiltX, { stiffness: 220, damping: 13, mass: 0.24 });
  const rotateY = useSpring2(tiltY, { stiffness: 220, damping: 13, mass: 0.24 });
  const x = useSpring2(panX, { stiffness: 230, damping: 13, mass: 0.2 });
  const y = useSpring2(panY, { stiffness: 230, damping: 13, mass: 0.2 });
  const validFrames = useMemo(() => (frameSources ?? []).filter(Boolean), [frameSources]);
  const portraitSourceMap = useMemo(
    () => buildPortraitSourceMap(portraitSrc, portraitSources),
    [portraitSrc, portraitSources]
  );
  const hasPortrait = Object.values(portraitSourceMap).some(Boolean);
  const allPortraitSrcs = useMemo(
    () => Object.values(portraitSourceMap).flatMap(
      (src) => typeof src === "string" ? [src] : [...src ?? []]
    ),
    [portraitSourceMap]
  );
  useImagePreloader(allPortraitSrcs);
  const [activePortraitSrcResolved, setActivePortraitSrcResolved] = useState2("");
  const frameCount = validFrames.length;
  const [frameIndex, setFrameIndex] = useState2(0);
  const [isPointerDown, setIsPointerDown] = useState2(false);
  const [isHovered, setIsHovered] = useState2(false);
  const { hoverPhase, hasActivatedPortrait, activePortraitDirection, setActivePortraitDirection } = useHoverPhaseTransition({ isHovered, hasPortrait, reducedMotion });
  useEffect2(() => {
    if (hoverPhase !== "portrait") {
      return;
    }
    tiltX.set(0);
    tiltY.set(0);
    panX.set(0);
    panY.set(0);
  }, [hoverPhase, panX, panY, tiltX, tiltY]);
  useEffect2(() => {
    if (frameCount <= 1 || reducedMotion) {
      setFrameIndex(0);
      return;
    }
    const unsubscribe = scrubSpring.on("change", (value) => {
      const normalized = Math.min(1, Math.max(0, value));
      const nextIndex = Math.round(normalized * (frameCount - 1));
      setFrameIndex(nextIndex);
    });
    return unsubscribe;
  }, [frameCount, reducedMotion, scrubSpring]);
  const handlePointerDown = useCallback(() => setIsPointerDown(true), []);
  const handlePointerUp = useCallback(() => setIsPointerDown(false), []);
  const handlePointerEnter = useCallback(() => setIsHovered(true), []);
  const handleInnerPointerLeave = useCallback(() => setIsHovered(false), []);
  const handlePointerMove = useCallback(
    (event) => {
      if (reducedMotion) return;
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pointerX = (event.clientX - rect.left) / rect.width;
      const pointerY = (event.clientY - rect.top) / rect.height;
      const normalizedX = Math.min(1, Math.max(0, pointerX));
      const normalizedY = Math.min(1, Math.max(0, pointerY));
      if (hasActivatedPortrait) {
        const deltaX = event.clientX - (rect.left + rect.width / 2);
        const deltaY = event.clientY - (rect.top + rect.height / 2);
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        const nextDirection = getPortraitDirectionFromAngle(angle);
        setActivePortraitDirection(nextDirection);
        tiltX.set(0);
        tiltY.set(0);
        panX.set(0);
        panY.set(0);
        return;
      }
      scrub.set(normalizedX);
      tiltX.set((0.5 - normalizedY) * 40);
      tiltY.set((normalizedX - 0.5) * 48);
      panX.set((normalizedX - 0.5) * 44);
      panY.set((normalizedY - 0.5) * 32);
    },
    [
      hasActivatedPortrait,
      panX,
      panY,
      reducedMotion,
      scrub,
      setActivePortraitDirection,
      tiltX,
      tiltY
    ]
  );
  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setIsPointerDown(false);
    setActivePortraitDirection(DEFAULT_PORTRAIT_DIRECTION);
    scrub.set(0.5);
    tiltX.set(0);
    tiltY.set(0);
    panX.set(0);
    panY.set(0);
  }, [panX, panY, scrub, setActivePortraitDirection, tiltX, tiltY]);
  useEffect2(() => {
    const rawSrc = portraitSourceMap[activePortraitDirection] ?? portraitSourceMap[DEFAULT_PORTRAIT_DIRECTION];
    if (rawSrc) {
      setActivePortraitSrcResolved(getRandomPortraitSrc(rawSrc));
    }
  }, [activePortraitDirection, portraitSourceMap]);
  const activeFrame = validFrames[Math.min(frameIndex, Math.max(0, frameCount - 1))];
  const showArtisticLogo = artisticLogoSrc && hoverPhase === "idle";
  const showPortrait = activePortraitSrcResolved && hoverPhase === "portrait";
  const shadowX = useTransform2(panX, (value) => value * -0.3);
  const shadowY = useTransform2(panY, (value) => 10 + value * 0.45);
  const shadowBlur = isHovered ? 24 : 16;
  const shadowAlpha = isHovered ? 0.34 : 0.22;
  const logoStackFilter = useMotionTemplate`brightness(0.9) drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgb(var(--mui-palette-grey-900Channel) / ${shadowAlpha}))`;
  const logoFadeTransition = reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
  const portraitFadeTransition = reducedMotion ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] };
  const cursorStyle = getCursorStyle(reducedMotion, isPointerDown);
  return /* @__PURE__ */ jsx6(
    Box6,
    {
      ...other,
      ref: rootRef,
      component: motion6.div,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
      sx: [rootBoxSx(cursorStyle), ...Array.isArray(rootSx) ? rootSx : [rootSx]],
      children: /* @__PURE__ */ jsxs(
        Box6,
        {
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handleInnerPointerLeave,
          sx: [innerContainerSx, ...Array.isArray(sx) ? sx : [sx]],
          children: [
            /* @__PURE__ */ jsxs(
              Box6,
              {
                component: motion6.div,
                style: reducedMotion ? void 0 : {
                  rotateX,
                  rotateY,
                  x,
                  y,
                  filter: logoStackFilter
                },
                sx: logoStack3dWrapperSx,
                children: [
                  /* @__PURE__ */ jsx6(
                    OriginalLogoLayer,
                    {
                      hoverPhase,
                      logoFadeTransition,
                      activeFrame,
                      logoAlt,
                      children
                    }
                  ),
                  /* @__PURE__ */ jsx6(
                    ArtisticLogoLayer,
                    {
                      artisticLogoSrc,
                      showArtisticLogo: Boolean(showArtisticLogo),
                      logoFadeTransition,
                      logoAlt
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx6(
              PortraitLayer,
              {
                portraitSrc: activePortraitSrcResolved,
                portraitAlt,
                showPortrait: Boolean(showPortrait),
                portraitFadeTransition
              }
            )
          ]
        }
      )
    }
  );
}

// src/components/hero/buttons-row/hero-buttons-row.tsx
import { motion as motion7 } from "framer-motion";
import Box7 from "@mui/material/Box";
import Button from "@mui/material/Button";

// src/components/hero/buttons-row/hero-buttons-row.styles.ts
var rowSx = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: { xs: 1.25, sm: 1.5 }
};
var buttonSx = {
  minWidth: 156,
  height: 48,
  borderColor: "currentColor"
};

// src/components/hero/buttons-row/hero-buttons-row.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
function HeroButtonsRow({ items, motionProps, sx, ...other }) {
  return /* @__PURE__ */ jsx7(Box7, { sx: [rowSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: items.map((item) => /* @__PURE__ */ jsx7(motion7.div, { ...motionProps, children: /* @__PURE__ */ jsx7(
    Button,
    {
      href: item.href,
      color: "inherit",
      size: "large",
      variant: item.variant ?? "contained",
      sx: buttonSx,
      children: item.label
    }
  ) }, item.label)) });
}

// src/components/faq/accordion/faq-accordion.tsx
import { useState as useState3 } from "react";
import { motion as motion10 } from "framer-motion";
import Box12 from "@mui/material/Box";
import Stack2 from "@mui/material/Stack";
import Button2 from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography2 from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

// src/components/icon/giselle/giselle-icon.tsx
import { Icon } from "@iconify/react";
import Box8 from "@mui/material/Box";

// src/components/icon/giselle/giselle-icon.styles.ts
var giselleIconRootSx = (width, height) => ({
  lineHeight: 0,
  display: "inline-flex",
  flexShrink: 0,
  width,
  height
});

// src/components/icon/giselle/giselle-icon.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function GiselleIcon({
  icon,
  width = 20,
  height,
  sx,
  className,
  style,
  flip: flip2,
  rotate: rotate2,
  ...other
}) {
  const h = height ?? width;
  return /* @__PURE__ */ jsx8(
    Box8,
    {
      component: "span",
      sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ jsx8(
        Icon,
        {
          icon,
          width: "100%",
          height: "100%",
          flip: flip2,
          rotate: rotate2,
          className,
          style
        }
      )
    }
  );
}

// src/components/layout/section/title/section-title/section-title.tsx
import Box10 from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// src/utils/theme-utils.ts
function channelAlpha(channel, alpha) {
  return `rgba(${channel} / ${alpha})`;
}

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
import Box9 from "@mui/material/Box";
import { jsx as jsx9 } from "react/jsx-runtime";
function SectionCaption({ title, sx, ...other }) {
  return /* @__PURE__ */ jsx9(
    Box9,
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
import { jsx as jsx10, jsxs as jsxs2 } from "react/jsx-runtime";
function SectionTitle({
  sx,
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  ...other
}) {
  return /* @__PURE__ */ jsxs2(
    Box10,
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
        caption && /* @__PURE__ */ jsx10(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
        /* @__PURE__ */ jsxs2(Typography, { component: "h2", variant: "h2", sx: slotProps?.title?.sx, children: [
          title,
          " ",
          txtGradient && /* @__PURE__ */ jsx10(Box10, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
        ] }),
        description && /* @__PURE__ */ jsx10(
          Box10,
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

// src/components/faq/accordion/faq-motion-viewport.tsx
import { motion as motion8 } from "framer-motion";
import Box11 from "@mui/material/Box";
import useMediaQuery2 from "@mui/material/useMediaQuery";
import { jsx as jsx11 } from "react/jsx-runtime";
var MotionBox = motion8(Box11);
function FaqMotionViewport({ children, sx }) {
  const smDown = useMediaQuery2((theme) => theme.breakpoints.down("sm"));
  if (smDown) {
    return /* @__PURE__ */ jsx11(Box11, { sx, children });
  }
  return /* @__PURE__ */ jsx11(
    MotionBox,
    {
      initial: "initial",
      whileInView: "animate",
      variants: container(),
      viewport: { once: true, amount: 0.3 },
      sx,
      children
    }
  );
}

// src/components/faq/accordion/faq-top-lines.tsx
import Stack from "@mui/material/Stack";

// src/components/faq/accordion/faq-accordion-svg.tsx
import { motion as motion9 } from "framer-motion";
import { styled } from "@mui/material/styles";

// src/components/faq/accordion/utils.ts
var svgLineTransition = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96]
};

// src/components/faq/accordion/faq-accordion-svg.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var MotionSvg = styled(motion9.svg, {
  shouldForwardProp: (prop) => prop !== "vertical"
})``;
function FaqFloatLine({ sx, vertical, ...other }) {
  return /* @__PURE__ */ jsx12(
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
      children: vertical ? /* @__PURE__ */ jsx12(
        motion9.line,
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
      ) : /* @__PURE__ */ jsx12(
        motion9.line,
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
  return /* @__PURE__ */ jsx12(
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
      children: /* @__PURE__ */ jsx12("path", { d: "M8 0V16M16 8.08889H0" })
    }
  );
}
function FaqFloatTriangleDownIcon({ sx, ...other }) {
  return /* @__PURE__ */ jsx12(
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
      children: /* @__PURE__ */ jsx12("path", { d: "M10 10L0 0H20L10 10Z" })
    }
  );
}

// src/components/faq/accordion/faq-top-lines.tsx
import { Fragment, jsx as jsx13, jsxs as jsxs3 } from "react/jsx-runtime";
function FaqTopLines() {
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3(Stack, { spacing: 8, alignItems: "center", sx: topTriangleStackSx, children: [
      /* @__PURE__ */ jsx13(FaqFloatTriangleDownIcon, { sx: { position: "static", opacity: 0.12 } }),
      /* @__PURE__ */ jsx13(FaqFloatTriangleDownIcon, { sx: smallTriangleSx })
    ] }),
    /* @__PURE__ */ jsx13(FaqFloatLine, { vertical: true, sx: { top: 0, left: FAQ_FLOAT_LINE_LEFT } })
  ] });
}

// src/components/faq/accordion/faq-bottom-lines.tsx
import { Fragment as Fragment2, jsx as jsx14, jsxs as jsxs4 } from "react/jsx-runtime";
function FaqBottomLines() {
  return /* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx14(FaqFloatLine, { sx: { top: 0, left: 0 } }),
    /* @__PURE__ */ jsx14(FaqFloatLine, { sx: { bottom: 0, left: 0 } }),
    /* @__PURE__ */ jsx14(FaqFloatPlusIcon, { sx: { top: -8, left: FAQ_PLUS_ICON_LEFT } }),
    /* @__PURE__ */ jsx14(FaqFloatPlusIcon, { sx: { bottom: -8, left: FAQ_PLUS_ICON_LEFT } })
  ] });
}

// src/components/faq/accordion/faq-accordion.tsx
import { jsx as jsx15, jsxs as jsxs5 } from "react/jsx-runtime";
var MotionAccordion = motion10(Accordion);
function FaqSection({
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
  const [expanded, setExpanded] = useState3(faqs[0]?.question ?? false);
  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const resolvedIcon = typeof contactIcon === "string" ? /* @__PURE__ */ jsx15(GiselleIcon, { icon: contactIcon }) : contactIcon;
  return /* @__PURE__ */ jsx15(Box12, { component: "section", sx: [...Array.isArray(sx) ? sx : [sx]], ...other, children: /* @__PURE__ */ jsxs5(FaqMotionViewport, { sx: { pt: 10, position: "relative" }, children: [
    /* @__PURE__ */ jsx15(FaqTopLines, {}),
    /* @__PURE__ */ jsxs5(Container, { children: [
      /* @__PURE__ */ jsx15(
        SectionTitle,
        {
          caption,
          title,
          txtGradient,
          sx: { textAlign: "center" }
        }
      ),
      /* @__PURE__ */ jsx15(Box12, { sx: contentBoxSx, children: faqs.map((item, index) => /* @__PURE__ */ jsxs5(
        MotionAccordion,
        {
          disableGutters: true,
          variants: fade("inUp", { distance: 24 }),
          expanded: expanded === item.question,
          onChange: handleChange(item.question),
          sx: accordionItemSx,
          children: [
            /* @__PURE__ */ jsx15(
              AccordionSummary,
              {
                id: `faq-panel${index}-header`,
                "aria-controls": `faq-panel${index}-content`,
                children: /* @__PURE__ */ jsx15(Typography2, { component: "span", variant: "h6", children: item.question })
              }
            ),
            /* @__PURE__ */ jsx15(AccordionDetails, { children: item.answer })
          ]
        },
        item.question
      )) })
    ] }),
    /* @__PURE__ */ jsxs5(Stack2, { sx: { position: "relative" }, children: [
      /* @__PURE__ */ jsx15(FaqBottomLines, {}),
      contactHref && /* @__PURE__ */ jsxs5(Box12, { sx: contactSectionSx, children: [
        /* @__PURE__ */ jsx15(motion10.div, { variants: fade("in"), children: /* @__PURE__ */ jsx15(Typography2, { variant: "h4", children: contactTitle }) }),
        /* @__PURE__ */ jsx15(motion10.div, { variants: fade("in"), children: /* @__PURE__ */ jsx15(Typography2, { sx: { mt: 2, mb: 3, color: "text.secondary" }, children: contactDescription }) }),
        /* @__PURE__ */ jsx15(motion10.div, { variants: fade("in"), children: /* @__PURE__ */ jsx15(
          Button2,
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
export {
  FaqSection as FaqAccordion,
  FaqSection,
  HeroButtonsRow,
  InteractiveHeroLogo,
  MotionContainer,
  MotionViewport,
  bounce,
  container,
  fade,
  flip,
  hover,
  rotate,
  scale,
  slide,
  tap,
  transitionEnter,
  transitionExit,
  transitionHover,
  transitionTap,
  useScrollParallax,
  zoom
};
//# sourceMappingURL=motion.js.map