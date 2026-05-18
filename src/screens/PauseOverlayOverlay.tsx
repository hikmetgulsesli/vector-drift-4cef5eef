// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Pause Overlay (overlay)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Menu, Play, RefreshCw } from "lucide-react";
import { formatResultElapsed, formatResultScore } from "./GameOverResult";


export type PauseOverlayOverlayActionId = "resume-1" | "restart-2" | "main-menu-3";

export interface PauseOverlayOverlayProps {
  actions?: Partial<Record<PauseOverlayOverlayActionId, () => void>>;
  score?: number;
  elapsedMs?: number;
  difficulty?: string;
}

export function PauseOverlayOverlay({
  actions,
  score = 0,
  elapsedMs = 0,
  difficulty = "normal",
}: PauseOverlayOverlayProps) {
  return (
    <>
      {/* Simulated Gameplay Background */}
      <div className="absolute inset-0 bg-cover bg-center z-0" data-alt="A high-speed, neon-drenched cyber-grid race track viewed from a cockpit perspective. The scene features glowing cyan grid lines stretching into the distance against a pitch-black background. Sharp, angular geometric structures line the track, emitting intense pink and blue neon light. The overall aesthetic is a cold, digital, retro-arcade racing environment with high contrast and stark digital lines." style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmkPUZkhImn8InMD80cnoaJU1hxD1F0dsVJfZoZ4YG-kcXk7a67AWq8fqX1UK6Qcua_mDQ7Cd2SI7crLaF2hXJ2gg-aTsDRu4thbn4AHes9hZBnxEYZ5bzpZ-QlElbOfGVIxG6XK34VPdPOv9K7QdFirNQ5sXEODuuNPuauImquEXDELBh7KKN9FeEOvbj14raiFI8RLiHMM0UYuuzb8IGCw5oyTEKTsUFNDvC_vZ_OrWuoWxe2afyqel38THVM1HKsIic6BssQi4')"}}>
      <div className="absolute inset-0 scanlines z-10 pointer-events-none"></div>
      </div>
      {/* Pause Overlay Canvas */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md">
      {/* Central Pause Modal */}
      <div className="bg-surface-container border border-primary p-margin flex flex-col drop-shadow-[0_0_12px_rgba(76,215,246,0.5)] w-full max-w-sm mx-margin relative">
      {/* Corner Accents (Decals) */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-[1px] -translate-y-[1px]"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary translate-x-[1px] -translate-y-[1px]"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -translate-x-[1px] translate-y-[1px]"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-[1px] translate-y-[1px]"></div>
      {/* Header section */}
      <div className="text-center border-b border-primary/30 pb-gutter mb-margin">
      <h1 className="font-display-lg text-display-lg font-bold italic text-primary drop-shadow-[0_0_8px_#4cd7f6] tracking-tighter">PAUSED</h1>
      <p className="font-label-xs text-label-xs text-on-surface-variant uppercase mt-unit">Score {formatResultScore(score)} / Time {formatResultElapsed(elapsedMs)}</p>
      </div>
      {/* Action Buttons Grid */}
      <div className="flex flex-col gap-gutter">
      {/* Primary Action: RESUME */}
      <button className="group relative w-full bg-primary text-on-primary py-3 px-4 flex items-center justify-center gap-3 border border-primary hover:drop-shadow-[0_0_8px_#4cd7f6] active:scale-[0.98] transition-colors min-h-[touch-target-min]" type="button" data-action-id="resume-1" onClick={actions?.["resume-1"]}>
      <Play  style={{fontVariationSettings: "'FILL' 1"}} className="text-[20px]" aria-hidden={true} focusable="false" />
      <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">RESUME</span>
      </button>
      {/* Secondary Action: RESTART */}
      <button className="group w-full bg-transparent text-primary py-3 px-4 flex items-center justify-center gap-3 border border-primary hover:bg-primary/10 hover:drop-shadow-[0_0_4px_#4cd7f6] active:scale-[0.98] transition-colors min-h-[touch-target-min]" type="button" data-action-id="restart-2" onClick={actions?.["restart-2"]}>
      <RefreshCw className="text-[20px]" aria-hidden={true} focusable="false" />
      <span className="font-label-sm text-label-sm uppercase tracking-widest">RESTART</span>
      </button>
      {/* Secondary Action: MAIN MENU */}
      <button className="group w-full bg-transparent text-primary py-3 px-4 flex items-center justify-center gap-3 border border-primary hover:bg-primary/10 hover:drop-shadow-[0_0_4px_#4cd7f6] active:scale-[0.98] transition-colors min-h-[touch-target-min]" type="button" data-action-id="main-menu-3" onClick={actions?.["main-menu-3"]}>
      <Menu className="text-[20px]" aria-hidden={true} focusable="false" />
      <span className="font-label-sm text-label-sm uppercase tracking-widest">MAIN MENU</span>
      </button>
      </div>
      {/* Status Line Footer */}
      <div className="mt-margin pt-gutter border-t border-outline-variant flex items-center justify-between">
      <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-primary drop-shadow-[0_0_4px_#4cd7f6]"></div>
      <span className="font-label-xs text-label-xs text-primary uppercase">{difficulty} MODE</span>
      </div>
      <div className="flex items-center gap-2 text-on-surface-variant">
      <Circle className="text-[14px]" aria-hidden={true} focusable="false" />
      </div>
      </div>
      </div>
      </div>
    </>
  );
}
