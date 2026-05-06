import React, { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/material/styles';
import { giselleTheme, TimelineTwoColumn } from '@alexrebula/giselle-mui';
import type { TimelinePhase } from '@alexrebula/giselle-mui';

interface RoadmapTimelineProps {
  phases: TimelinePhase[];
  sortOrder?: 'asc' | 'desc';
}

/**
 * Renders a `TimelineTwoColumn` wrapped in a `CssVarsProvider` scoped to the
 * Giselle brand theme. Safe to embed in any Docusaurus MDX page.
 *
 * The `isMounted` guard prevents execution during Docusaurus SSR pre-render —
 * MUI v7 CSS vars context requires a real DOM and React tree, which isn't
 * available server-side.
 */
export function RoadmapTimeline({ phases, sortOrder = 'asc' }: RoadmapTimelineProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <CssVarsProvider theme={giselleTheme}>
      <TimelineTwoColumn phases={phases} sortOrder={sortOrder} />
    </CssVarsProvider>
  );
}
