import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { giselleTheme, TimelineCompact } from '@alexrebula/giselle-mui';
import type { TimelinePhase } from '@alexrebula/giselle-mui';

interface RoadmapTimelineProps {
  phases: TimelinePhase[];
  sortOrder?: 'asc' | 'desc';
}

/**
 * Renders the compact timeline variant wrapped in a `CssVarsProvider` scoped
 * to the Giselle brand theme. This docs site embeds the timeline beside prose
 * inside a constrained article column, so the compact accordion is always the
 * correct variant here.
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
    <ThemeProvider theme={giselleTheme}>
      <div>
        <TimelineCompact phases={phases} sortOrder={sortOrder} />
      </div>
    </ThemeProvider>
  );
}

export default RoadmapTimeline;
