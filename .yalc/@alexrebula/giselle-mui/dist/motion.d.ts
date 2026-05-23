import { Transition, Variants, MotionProps, MotionValue } from 'framer-motion';
import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';
import { BoxProps } from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

/**
 * Default enter transition.
 *
 * Duration: **0.64 s**. Easing: `cubic-bezier(0.43, 0.13, 0.23, 0.96)` — smooth ease-in-out.
 * Override any property via `opts`.
 */
declare const transitionEnter: (opts?: Transition) => Transition;
/**
 * Default exit transition.
 *
 * Duration: **0.48 s**. Same easing as enter. Override any property via `opts`.
 */
declare const transitionExit: (opts?: Transition) => Transition;

type FadeDirection = 'in' | 'inUp' | 'inDown' | 'inLeft' | 'inRight' | 'out' | 'outUp' | 'outDown' | 'outLeft' | 'outRight';
type FadeOptions = {
    /** Distance in px for directional fade. @default 120 */
    distance?: number;
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Fade motion `Variants` factory.
 *
 * Supports 10 directions: `'in'`, `'inUp'`, `'inDown'`, `'inLeft'`, `'inRight'`,
 * `'out'`, `'outUp'`, `'outDown'`, `'outLeft'`, `'outRight'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={fade('inUp')} initial="initial" animate="animate" exit="exit" />
 * <motion.div variants={fade('inUp', { distance: 24 })} initial="initial" animate="animate" />
 * ```
 */
declare const fade: (direction: FadeDirection, options?: FadeOptions) => Variants;

type ContainerOptions = {
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Stagger container `Variants` factory.
 *
 * Children animate with a 50 ms stagger (`staggerChildren: 0.05`, `delayChildren: 0.05`).
 * On exit, children reverse-stagger (`staggerDirection: -1`).
 *
 * @example
 * ```tsx
 * <motion.div variants={container()} initial="initial" animate="animate" exit="exit">
 *   <motion.div variants={fade('inUp')}>Item 1</motion.div>
 *   <motion.div variants={fade('inUp')}>Item 2</motion.div>
 * </motion.div>
 * ```
 */
declare const container: (options?: ContainerOptions) => Variants;

type SlideDirection = 'inUp' | 'inDown' | 'inLeft' | 'inRight' | 'outUp' | 'outDown' | 'outLeft' | 'outRight';
type SlideOptions = {
    /** Distance in px. @default 160 */
    distance?: number;
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Slide motion `Variants` factory (no opacity — pure positional slide).
 *
 * Supports 8 directions: `'inUp'`, `'inDown'`, `'inLeft'`, `'inRight'`,
 * `'outUp'`, `'outDown'`, `'outLeft'`, `'outRight'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={slide('inLeft')} initial="initial" animate="animate" exit="exit" />
 * ```
 */
declare const slide: (direction: SlideDirection, options?: SlideOptions) => Variants;

type ScaleDirection = 'in' | 'inX' | 'inY' | 'out' | 'outX' | 'outY';
type ScaleOptions = {
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Scale motion `Variants` factory.
 *
 * Supports 6 directions: `'in'`, `'inX'`, `'inY'`, `'out'`, `'outX'`, `'outY'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={scale('in')} initial="initial" animate="animate" exit="exit" />
 * ```
 */
declare const scale: (direction: ScaleDirection, options?: ScaleOptions) => Variants;

type BounceDirection = 'in' | 'inUp' | 'inDown' | 'inLeft' | 'inRight' | 'out' | 'outUp' | 'outDown' | 'outLeft' | 'outRight';
type BounceOptions = {
    /** Distance in px for directional bounce. @default 720 */
    distance?: number;
    transition?: Transition;
};

/**
 * Bounce motion `Variants` factory.
 *
 * Supports 10 directions: `'in'`, `'inUp'`, `'inDown'`, `'inLeft'`, `'inRight'`,
 * `'out'`, `'outUp'`, `'outDown'`, `'outLeft'`, `'outRight'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={bounce('inUp')} initial="initial" animate="animate" />
 * ```
 */
declare const bounce: (direction: BounceDirection, options?: BounceOptions) => Variants;

type RotateDirection = 'in' | 'out';
type RotateOptions = {
    /** Rotation in degrees. @default 360 */
    deg?: number;
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Rotate motion `Variants` factory.
 *
 * Supports 2 directions: `'in'` (rotate in from negative angle) and `'out'` (rotate out).
 *
 * @example
 * ```tsx
 * <motion.div variants={rotate('in')} initial="initial" animate="animate" exit="exit" />
 * ```
 */
declare const rotate: (direction: RotateDirection, options?: RotateOptions) => Variants;

type FlipDirection = 'inX' | 'inY' | 'outX' | 'outY';
type FlipOptions = {
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Flip motion `Variants` factory (3-D rotation on the X or Y axis).
 *
 * Supports 4 directions: `'inX'`, `'inY'`, `'outX'`, `'outY'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={flip('inY')} initial="initial" animate="animate" exit="exit" />
 * ```
 */
declare const flip: (direction: FlipDirection, options?: FlipOptions) => Variants;

type ZoomDirection = 'in' | 'inUp' | 'inDown' | 'inLeft' | 'inRight' | 'out' | 'outUp' | 'outDown' | 'outLeft' | 'outRight';
type ZoomOptions = {
    /** Distance in px for directional zoom. @default 720 */
    distance?: number;
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Zoom motion `Variants` factory (scale + translate).
 *
 * Supports 10 directions: `'in'`, `'inUp'`, `'inDown'`, `'inLeft'`, `'inRight'`,
 * `'out'`, `'outUp'`, `'outDown'`, `'outLeft'`, `'outRight'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={zoom('inUp')} initial="initial" animate="animate" exit="exit" />
 * ```
 */
declare const zoom: (direction: ZoomDirection, options?: ZoomOptions) => Variants;

/**
 * Returns a `whileHover` scale target for a `motion.*` element.
 *
 * @param value - Scale on hover. @default 1.09
 *
 * @example
 * ```tsx
 * <motion.div whileHover={hover()}>Hover me</motion.div>
 * <motion.button whileHover={hover(1.05)} whileTap={tap()}>Click</motion.button>
 * ```
 */
declare const hover: (value?: number) => {
    scale: number;
};
/**
 * Returns a `whileTap` scale target for a `motion.*` element.
 *
 * @param value - Scale on press. @default 0.9
 */
declare const tap: (value?: number) => {
    scale: number;
};
/**
 * Spring transition for tap interactions.
 * Feels snappy: `stiffness: 400, damping: 18`.
 */
declare const transitionTap: (props?: Transition) => Transition;
/**
 * Ease transition for hover interactions.
 */
declare const transitionHover: (props?: Transition) => Transition;

type MotionContainerProps = Omit<BoxProps, 'animate' | 'children'> & Omit<MotionProps, 'children'> & {
    /**
     * When `action` is `false` (default), the container always animates in.
     * When `action` is `true`, use the `animate` prop to toggle between
     * the `'animate'` and `'exit'` states.
     * @default false
     */
    action?: boolean;
    /** Controls playback when `action` is `true`. @default false */
    animate?: boolean;
    children?: React.ReactNode;
};

/**
 * A stagger wrapper for framer-motion animations.
 *
 * Wraps children in a `motion.div` with `container()` variants.
 * Children should use `fade`, `slide`, or other variant factories
 * that respond to the `initial`/`animate`/`exit` keys.
 *
 * **Important:** uses `motion.div`, not `m.div`. The `m.*` API requires
 * `LazyMotion` in the consumer's tree — `motion.*` works without a provider.
 *
 * @example
 * ```tsx
 * <MotionContainer>
 *   <motion.div variants={fade('inUp')}>Item 1</motion.div>
 *   <motion.div variants={fade('inUp')}>Item 2</motion.div>
 * </MotionContainer>
 * ```
 */
declare function MotionContainer({ animate, children, action, ...other }: MotionContainerProps): react_jsx_runtime.JSX.Element;

type MotionViewportProps = Omit<BoxProps, 'animate' | 'children'> & Omit<MotionProps, 'children'> & {
    /**
     * Disable the scroll-triggered animation on `sm` and below.
     * On small screens the section is often already fully visible on mount,
     * making the stagger animation jarring rather than pleasant.
     * @default true
     */
    disableAnimateOnMobile?: boolean;
    children?: React.ReactNode;
};

/**
 * Scroll-triggered stagger container.
 *
 * Wraps children in a `motion.div` with `container()` variants that fire
 * once when the element enters the viewport. Children should use `fade`,
 * `slide`, or another variant factory that responds to the `initial`/`animate` keys.
 *
 * Animation is automatically disabled on `sm` and below when
 * `disableAnimateOnMobile` is `true` (default) — short mobile viewports
 * skip the stagger to avoid content appearing off-screen on first render.
 *
 * **Important:** uses `motion.div`, not `m.div`. The `m.*` API requires
 * `LazyMotion` in the consumer's tree — `motion.*` works without a provider.
 *
 * @example
 * ```tsx
 * <MotionViewport>
 *   <motion.div variants={fade('inUp')}>Title</motion.div>
 *   <motion.div variants={fade('inUp')}>Body</motion.div>
 * </MotionViewport>
 * ```
 */
declare function MotionViewport({ children, viewport, sx, disableAnimateOnMobile, ...other }: MotionViewportProps): react_jsx_runtime.JSX.Element;

interface UseScrollParallaxResult {
    /** Attach to the element whose scroll position drives the parallax. */
    ref: React.RefObject<HTMLDivElement | null>;
    /**
     * Five spring-smoothed `y` motion values, slowest → fastest
     * (`layers[0]` ±40px … `layers[4]` ±200px).
     *
     * Use only the layers you need — unused layers have no runtime cost.
     */
    layers: [
        MotionValue<number>,
        MotionValue<number>,
        MotionValue<number>,
        MotionValue<number>,
        MotionValue<number>
    ];
}

/**
 * Returns 5 spring-smoothed parallax `y` motion values driven by element scroll.
 *
 * Spring physics: `mass: 0.1, damping: 20, stiffness: 300`.
 * Each layer travels a different distance (±40 → ±200 px) as the element
 * scrolls through the viewport.
 *
 * @example
 * ```tsx
 * const { ref, layers } = useScrollParallax();
 * return (
 *   <div ref={ref}>
 *     <motion.div style={{ y: layers[0] }}>Back layer (slowest)</motion.div>
 *     <motion.div style={{ y: layers[2] }}>Mid layer</motion.div>
 *     <motion.div style={{ y: layers[4] }}>Front layer (fastest)</motion.div>
 *   </div>
 * );
 * ```
 */
declare function useScrollParallax(): UseScrollParallaxResult;

type HoverPhase = 'idle' | 'artistic' | 'portrait';
type PortraitDirection = 'forward' | 'left' | 'right' | 'up' | 'down' | 'up-left' | 'up-right' | 'down-left' | 'down-right';
type PortraitSource = {
    direction: PortraitDirection;
    src: string | readonly string[];
};
/** Shared transition descriptor used by all animated layers. */
type FadeTransition = {
    duration: number;
    ease?: readonly [number, number, number, number];
};
type FramerMotionConflictingEvents = 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragOver' | 'onDragEnter' | 'onDragLeave' | 'onDragExit' | 'onDrop';
type InteractiveHeroLogoProps = Omit<BoxProps, 'sx' | 'children' | 'ref' | FramerMotionConflictingEvents> & {
    /** sx applied to the inner content container (not the 3D-perspective root). */
    sx?: BoxProps['sx'];
    /** sx applied to the outermost perspective root Box. */
    rootSx?: BoxProps['sx'];
    frameSources?: readonly string[];
    artisticLogoSrc?: string;
    /**
     * Alt text shared by the original logo and artistic logo layers.
     * @default 'Logo'
     */
    logoAlt?: string;
    portraitSrc?: string;
    portraitSources?: readonly PortraitSource[];
    /** @default 'Portrait' */
    portraitAlt?: string;
    children?: ReactNode;
};

/**
 * An interactive logo component with three hover phases:
 *
 * - **idle** — logo at rest; artistic overlay is visible
 * - **artistic** — on first hover; original logo animation plays
 * - **portrait** — after the activation delay, a directional portrait fills
 *   the space and tracks pointer position around the logo
 *
 * Supports frame-scrub animation via `frameSources`, directional portraits via
 * `portraitSources`, and respects `prefers-reduced-motion` throughout.
 */
declare function InteractiveHeroLogo({ sx, rootSx, frameSources, artisticLogoSrc, logoAlt, portraitSrc, portraitSources, portraitAlt, children, ...other }: InteractiveHeroLogoProps): react_jsx_runtime.JSX.Element;

type HeroButtonItem = {
    /** Button label text. */
    label: string;
    /** Navigation target passed to MUI `Button` as `href`. */
    href: string;
    /**
     * MUI Button variant.
     * @default 'contained'
     */
    variant?: 'contained' | 'outlined' | 'text';
};
type HeroButtonsRowProps = Omit<BoxProps, 'children'> & {
    /** Ordered list of button items to render. */
    items: HeroButtonItem[];
    /**
     * framer-motion props forwarded to the `motion.div` wrapper around each button.
     * Use variant-based animation (`variants`, `initial`, `animate`) or explicit
     * spring values here.
     */
    motionProps?: MotionProps;
};

/**
 * An animated row of CTA buttons for hero sections.
 *
 * Each button is wrapped in a `motion.div` so entrance animations can be
 * applied via `motionProps`. Pass variant-based animation values via
 * `motionProps` to stagger or fade in each button independently.
 *
 * ```tsx
 * import { fade } from '@alexrebula/giselle-mui/motion';
 *
 * <HeroButtonsRow
 *   items={[
 *     { label: 'View work', href: '#work' },
 *     { label: 'Contact', href: '#contact', variant: 'outlined' },
 *   ]}
 *   motionProps={{ variants: fade('inUp', { distance: 24 }) }}
 * />
 * ```
 */
declare function HeroButtonsRow({ items, motionProps, sx, ...other }: HeroButtonsRowProps): react_jsx_runtime.JSX.Element;

/** A single FAQ entry. */
type FaqItem = {
    /** The question text, also used as the accordion panel key. */
    question: string;
    /** The answer content — any valid React node. */
    answer: ReactNode;
};
/** Props for the {@link FaqSection} component. */
type FaqSectionProps = Omit<BoxProps, 'children'> & {
    /** Overline caption above the heading. @default 'FAQs' */
    caption?: string;
    /** Main `h2` heading. @default 'Frequently Asked' */
    title?: string;
    /** Gradient-accent word appended after `title`. @default 'Questions' */
    txtGradient?: string;
    /** FAQ items rendered as animated accordions. */
    faqs: FaqItem[];
    /** Heading in the contact footer. @default 'Still have questions?' */
    contactTitle?: string;
    /** Body text below the contact heading. */
    contactDescription?: string;
    /**
     * `href` for the contact button.
     * When omitted, the entire contact footer section is hidden.
     */
    contactHref?: string;
    /** Label for the contact button. @default 'Contact us' */
    contactLabel?: string;
    /**
     * Icon for the contact button.
     * - `string` → rendered via `GiselleIcon` (e.g. `'solar:letter-bold'`).
     * - `ReactNode` → rendered as-is.
     */
    contactIcon?: ReactNode | string;
    sx?: SxProps<Theme>;
};

/**
 * `FaqSection` renders a full FAQ section with scroll-triggered animated
 * accordions, decorative SVG elements (visible at ≥1440 px), and an optional
 * contact footer.
 *
 * Powered by `framer-motion` — import from `@alexrebula/giselle-mui/motion`.
 *
 * ## Usage
 *
 * ```tsx
 * import { FaqSection } from '@alexrebula/giselle-mui/motion';
 *
 * <FaqSection
 *   caption="Support"
 *   title="Frequently Asked"
 *   txtGradient="Questions"
 *   faqs={[
 *     { question: 'How do I get started?', answer: <p>Create an account…</p> },
 *   ]}
 *   contactHref="/contact"
 *   contactLabel="Send a message"
 *   contactIcon="solar:letter-bold"
 * />
 * ```
 *
 * ## Contact footer
 * The footer is hidden unless `contactHref` is provided.
 *
 * ## Icon
 * Pass a Giselle icon string (e.g. `'solar:letter-bold'`) to `contactIcon`
 * and `GiselleIcon` renders it automatically. Pass a `ReactNode` to supply
 * any custom icon element instead.
 *
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function FaqSection({ caption, title, txtGradient, faqs, contactTitle, contactDescription, contactHref, contactLabel, contactIcon, sx, ...other }: FaqSectionProps): react_jsx_runtime.JSX.Element;

export { type FadeTransition, FaqSection as FaqAccordion, type FaqSectionProps as FaqAccordionProps, type FaqItem, FaqSection, type FaqSectionProps, type HeroButtonItem, HeroButtonsRow, type HeroButtonsRowProps, type HoverPhase, InteractiveHeroLogo, type InteractiveHeroLogoProps, MotionContainer, type MotionContainerProps, MotionViewport, type MotionViewportProps, type PortraitDirection, type PortraitSource, type UseScrollParallaxResult, bounce, container, fade, flip, hover, rotate, scale, slide, tap, transitionEnter, transitionExit, transitionHover, transitionTap, useScrollParallax, zoom };
