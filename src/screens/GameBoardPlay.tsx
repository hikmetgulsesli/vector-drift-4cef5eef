// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Board (play)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop

import type { CSSProperties } from "react";
import { HelpCircle, Pause, Settings } from "lucide-react";
import type { Lane, Obstacle } from "../types/domain";


export type GameBoardPlayActionId = "button-1-1" | "button-2-2" | "button-3-3";

export interface GameBoardPlayProps {
  actions?: Partial<Record<GameBoardPlayActionId, () => void>>;
  elapsedMs?: number;
  highScore?: number;
  obstacles?: Obstacle[];
  playerLane?: Lane;
  score?: number;
}

const formatScore = (score = 0) =>
  Math.max(0, Math.floor(score)).toLocaleString("en-US", {
    minimumIntegerDigits: 6,
    useGrouping: true,
  });

const formatTime = (elapsedMs = 0) => {
  const totalTenths = Math.max(0, Math.floor(elapsedMs / 100));
  const minutes = Math.floor(totalTenths / 600);
  const seconds = Math.floor((totalTenths % 600) / 10);
  const tenths = totalTenths % 10;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${tenths}`;
};

const laneLeft = (lane: Lane) => `${16.666 + lane * 33.333}%`;

const obstacleVariants = [
  { height: "2rem", rotation: 12, width: "4rem" },
  { height: "3rem", rotation: -8, width: "2rem" },
  { height: "2.5rem", rotation: 45, width: "2.5rem" },
] as const;

export function GameBoardPlay({
  actions,
  elapsedMs = 0,
  highScore = 0,
  obstacles = [],
  playerLane = 1,
  score = 0,
}: GameBoardPlayProps) {
  return (
    <>
      <div className="crt-overlay"></div>
      {/* Main Game Container */}
      <div className="relative w-full max-w-5xl h-full mx-auto cyber-grid flex flex-col shadow-[0_0_40px_rgba(76,215,246,0.1)_inset]">
      {/* TopAppBar (from JSON) */}
      <header className="bg-background/90 backdrop-blur-sm font-headline-lg text-headline-lg tracking-tighter docked full-width top-0 z-50 border-b border-primary/30 shadow-[0_4px_20px_rgba(76,215,246,0.15)] flex justify-between items-center px-margin py-4 w-full">
      {/* Brand / HUD Left */}
      <div className="flex items-center gap-6">
      {/* Brand Logo (Vector Drift) hidden on mobile, HUD visible */}
      <h1 className="hidden md:block font-display-lg text-display-lg font-bold italic text-primary drop-shadow-[0_0_8px_#4cd7f6] uppercase tracking-tighter">
                          VECTOR DRIFT
                      </h1>
      {/* HUD: Score & Time */}
      <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
      <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Score</span>
      <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary drop-shadow-[0_0_4px_#4cd7f6]">{formatScore(score)}</span>
      </div>
      <div className="flex items-center gap-2">
      <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Time</span>
      <span className="font-body-md text-body-md text-on-background">{formatTime(elapsedMs)}</span>
      </div>
      </div>
      </div>
      {/* HUD Right & Actions */}
      <div className="flex items-center gap-8">
      {/* High Score Indicator */}
      <div className="hidden md:flex flex-col items-end gap-1">
      <span className="font-label-sm text-label-sm uppercase text-secondary">High Score</span>
      <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface drop-shadow-[0_0_2px_#ffb0cd]">{formatScore(highScore)}</span>
      </div>
      {/* Trailing Icon Actions */}
      <div className="flex items-center gap-4">
      <button aria-label="Settings" className="text-on-surface-variant hover:text-secondary hover:drop-shadow-[0_0_10px_#ffb0cd] transition-colors active:scale-95 duration-100 flex items-center justify-center w-touch-target-min h-touch-target-min" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]}>
      <Settings className="text-[24px]" aria-hidden={true} focusable="false" />
      </button>
      <button aria-label="Help" className="text-on-surface-variant hover:text-secondary hover:drop-shadow-[0_0_10px_#ffb0cd] transition-colors active:scale-95 duration-100 flex items-center justify-center w-touch-target-min h-touch-target-min" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]}>
      <HelpCircle className="text-[24px]" aria-hidden={true} focusable="false" />
      </button>
      <button aria-label="Pause" className="text-on-surface-variant hover:text-secondary hover:drop-shadow-[0_0_10px_#ffb0cd] transition-colors active:scale-95 duration-100 flex items-center justify-center w-touch-target-min h-touch-target-min" type="button" data-action-id="button-3-3" onClick={actions?.["button-3-3"]}>
      <Pause className="text-[24px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </div>
      </header>
      {/* Playfield Area */}
      <main className="flex-grow relative w-full h-full overflow-hidden border-x border-outline-variant/30">
      {/* Dynamic Obstacles (Simulated) */}
      {obstacles.map((obstacle) => {
        const variant = obstacleVariants[obstacle.id % obstacleVariants.length];

        return (
      <div
        className="absolute bg-secondary/20 border border-secondary obstacle transform"
        key={obstacle.id}
        style={
          {
            height: variant.height,
            left: laneLeft(obstacle.lane),
            top: `${Math.min(94, Math.max(0, obstacle.y * 100))}%`,
            transform: `translateX(-50%) rotate(${variant.rotation}deg)`,
            width: variant.width,
          } as CSSProperties
        }
      ></div>
        );
      })}
      {/* Player Ship */}
      <div
        className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 player-ship"
        style={{ left: laneLeft(playerLane) } as CSSProperties}
      ></div>
      {/* Visual Feedback / HUD Elements within playfield */}
      <div className="absolute bottom-margin right-margin flex flex-col gap-2 opacity-50">
      <div className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-widest text-right">Thruster Temp</div>
      <div className="flex gap-1 h-2 w-32">
      <div className="bg-primary flex-1"></div>
      <div className="bg-primary flex-1"></div>
      <div className="bg-primary flex-1"></div>
      <div className="bg-primary/30 flex-1"></div>
      <div className="bg-primary/30 flex-1"></div>
      </div>
      </div>
      <div className="absolute bottom-margin left-margin flex flex-col gap-2 opacity-50">
      <div className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-widest">Energy Core</div>
      <div className="flex gap-1 h-2 w-32">
      <div className="bg-secondary flex-1"></div>
      <div className="bg-secondary flex-1"></div>
      <div className="bg-secondary/30 flex-1"></div>
      <div className="bg-secondary/30 flex-1"></div>
      <div className="bg-secondary/30 flex-1"></div>
      </div>
      </div>
      </main>
      </div>
    </>
  );
}
