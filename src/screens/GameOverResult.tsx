// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Over (result)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Download, Home } from "lucide-react";


export type GameOverResultActionId = "play-again-1" | "main-menu-2" | "button-3-3" | "button-4-4";

export interface GameOverResultProps {
  actions?: Partial<Record<GameOverResultActionId, () => void>>;
  finalScore?: number;
  timeSurvivedMs?: number;
  multiplier?: string;
  isNewHighScore?: boolean;
}

export const formatResultScore = (score = 0) => Math.max(0, Math.floor(score)).toLocaleString();

export const formatResultElapsed = (ms = 0) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export function GameOverResult({
  actions,
  finalScore = 0,
  timeSurvivedMs = 0,
  multiplier = "x1.0",
  isNewHighScore = false,
}: GameOverResultProps) {
  return (
    <>
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 cyber-grid pointer-events-none z-0"></div>
      <div className="absolute inset-0 scanlines pointer-events-none z-0 opacity-50"></div>
      {/* Top Nav App Bar (Suppressed due to end-game state, focusing on content) */}
      <main className="relative z-10 w-full max-w-2xl px-margin flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
      <h1 className="font-display-lg text-display-lg md:font-display-lg md:text-display-lg text-secondary drop-shadow-[0_0_12px_#ffb0cd] italic mb-4">GAME OVER</h1>
      </div>
      {/* New High Score Badge */}
      <div className="mb-6 flex justify-center">
      <div className="bg-[#0e1416] border border-primary text-primary px-4 py-2 font-label-sm text-label-sm uppercase shadow-[0_0_8px_#4cd7f6] flex items-center gap-2">
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
                      {isNewHighScore ? "NEW HIGH SCORE" : "RUN COMPLETE"}
                      <Circle  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
      </div>
      </div>
      {/* Results Panel */}
      <div className="w-full bg-[#111827] border border-outline-variant p-8 relative mb-8 group">
      {/* Glow Effect on focus/hover simulator */}
      <div className="absolute inset-0 border border-primary opacity-20 pointer-events-none shadow-[0_0_15px_#4cd7f6] transition-opacity"></div>
      <div className="flex flex-col items-center gap-6 relative z-10">
      {/* Final Score */}
      <div className="text-center border-b border-outline-variant w-full pb-6">
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Final Score</p>
      <p className="font-headline-lg text-headline-lg md:font-display-lg md:text-display-lg text-primary drop-shadow-[0_0_8px_#4cd7f6]">{formatResultScore(finalScore)}</p>
      </div>
      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-2 gap-4 w-full text-center">
      <div className="p-4 border border-outline-variant bg-[#0e1416]">
      <p className="font-label-xs text-label-xs text-on-surface-variant uppercase mb-1">Time Survived</p>
      <p className="font-body-md text-body-md text-on-surface font-mono">{formatResultElapsed(timeSurvivedMs)}</p>
      </div>
      <div className="p-4 border border-outline-variant bg-[#0e1416]">
      <p className="font-label-xs text-label-xs text-on-surface-variant uppercase mb-1">Multiplier</p>
      <p className="font-body-md text-body-md text-secondary font-mono drop-shadow-[0_0_4px_#ffb0cd]">{multiplier}</p>
      </div>
      </div>
      </div>
      </div>
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center mb-8">
      <button className="flex-1 bg-primary border border-primary text-on-primary font-label-sm text-label-sm uppercase h-[44px] px-6 hover:shadow-[0_0_12px_#4cd7f6] transition-shadow flex items-center justify-center gap-2" type="button" data-action-id="play-again-1" onClick={actions?.["play-again-1"]}>
      <Circle aria-hidden={true} focusable="false" />
                      PLAY AGAIN
                  </button>
      <button className="flex-1 bg-transparent border border-primary text-primary font-label-sm text-label-sm uppercase h-[44px] px-6 hover:shadow-[0_0_12px_#4cd7f6] transition-shadow flex items-center justify-center gap-2" type="button" data-action-id="main-menu-2" onClick={actions?.["main-menu-2"]}>
      <Home aria-hidden={true} focusable="false" />
                      MAIN MENU
                  </button>
      </div>
      {/* Share */}
      <div className="flex gap-4 items-center">
      <button aria-label="Share result" className="w-[44px] h-[44px] border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors flex items-center justify-center" type="button" data-action-id="button-3-3" onClick={actions?.["button-3-3"]}>
      <Circle aria-hidden={true} focusable="false" />
      </button>
      <button aria-label="Save result" className="w-[44px] h-[44px] border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors flex items-center justify-center" type="button" data-action-id="button-4-4" onClick={actions?.["button-4-4"]}>
      <Download aria-hidden={true} focusable="false" />
      </button>
      </div>
      </main>
    </>
  );
}
