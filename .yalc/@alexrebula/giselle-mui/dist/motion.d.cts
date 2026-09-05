import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { BoxProps } from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

/** A single FAQ entry. */
type FaqItem = {
    /** The question text, also used as the accordion panel key. */
    question: string;
    /** The answer content — any valid React node. */
    answer: ReactNode;
};
/** Props for the {@link FaqAccordion} component. */
type FaqAccordionProps = Omit<BoxProps, 'children'> & {
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
 * `FaqAccordion` renders a full FAQ section with scroll-triggered animated
 * accordions, decorative SVG elements (visible at ≥1440 px), and an optional
 * contact footer.
 *
 * Powered by `framer-motion` — import from `@alexrebula/giselle-mui/motion`.
 *
 * ## Usage
 *
 * ```tsx
 * import { FaqAccordion } from '@alexrebula/giselle-mui/motion';
 *
 * <FaqAccordion
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
 */
declare function FaqAccordion({ caption, title, txtGradient, faqs, contactTitle, contactDescription, contactHref, contactLabel, contactIcon, sx, ...other }: FaqAccordionProps): react_jsx_runtime.JSX.Element;

export { FaqAccordion, type FaqAccordionProps, type FaqItem };
