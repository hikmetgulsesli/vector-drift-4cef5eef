// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Main Menu (menu)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop

import { Circle, HelpCircle, Settings } from "lucide-react";


export type MainMenuMenuActionId = "start-game-1" | "resume-2" | "options-3" | "help-4";

export interface MainMenuMenuProps {
  actions?: Partial<Record<MainMenuMenuActionId, () => void>>;
  highScore?: number;
  resumeAvailable?: boolean;
}

const formatScore = (score = 0) =>
  Math.max(0, Math.floor(score)).toLocaleString("en-US", {
    minimumIntegerDigits: 6,
    useGrouping: true,
  });

export function MainMenuMenu({ actions, highScore = 0, resumeAvailable = false }: MainMenuMenuProps) {
  return (
    <>
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid z-0 pointer-events-none"></div>
      <div className="absolute inset-0 scanlines z-0 pointer-events-none opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,215,246,0.15)_0%,rgba(14,20,22,1)_70%)] z-0 pointer-events-none"></div>
      {/* Top App Bar (Suppressed for immersive Main Menu per JSON guidelines, but adding header for structure if needed. Leaving out full nav cluster) */}
      <header className="w-full flex justify-between items-center px-margin py-4 z-50 relative pointer-events-none hidden md:flex">
      <div className="font-headline-lg text-headline-lg tracking-tighter text-primary font-bold italic drop-shadow-[0_0_8px_#4cd7f6] hidden">VECTOR DRIFT</div>
      </header>
      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-margin w-full max-w-md mx-auto gap-8">
      {/* Brand Title */}
      <div className="text-center mb-8">
      <h1 className="font-display-lg text-display-lg md:text-[72px] md:leading-[80px] font-bold italic text-primary drop-shadow-[0_0_12px_#4cd7f6] tracking-tighter uppercase">
                      VECTOR DRIFT
                  </h1>
      </div>
      {/* Menu Buttons Stack */}
      <div className="flex flex-col w-full gap-4">
      {/* START GAME: Primary Fill */}
      <button className="w-full min-h-touch-target-min flex items-center justify-center bg-primary text-on-primary border border-primary font-label-sm text-label-sm uppercase tracking-widest px-6 py-4 hover:drop-shadow-[0_0_10px_#4cd7f6] transition-colors duration-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="start-game-1" onClick={actions?.["start-game-1"]}>
                      START GAME
                  </button>
      {/* RESUME: Outline */}
      <button className="w-full min-h-touch-target-min flex items-center justify-center bg-transparent text-primary border border-primary font-label-sm text-label-sm uppercase tracking-widest px-6 py-4 hover:drop-shadow-[0_0_10px_#4cd7f6] transition-colors duration-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="resume-2" onClick={actions?.["resume-2"]} disabled={!resumeAvailable} aria-disabled={!resumeAvailable}>
                      RESUME
                  </button>
      {/* OPTIONS: Outline with Icon */}
      <button className="w-full min-h-touch-target-min flex items-center justify-center gap-3 bg-transparent text-primary border border-primary font-label-sm text-label-sm uppercase tracking-widest px-6 py-4 hover:drop-shadow-[0_0_10px_#4cd7f6] transition-colors duration-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="options-3" onClick={actions?.["options-3"]}>
      <Settings  style={{fontVariationSettings: "'FILL' 0"}} aria-hidden={true} focusable="false" />
                      OPTIONS
                  </button>
      {/* HELP: Outline with Icon */}
      <button className="w-full min-h-touch-target-min flex items-center justify-center gap-3 bg-transparent text-primary border border-primary font-label-sm text-label-sm uppercase tracking-widest px-6 py-4 hover:drop-shadow-[0_0_10px_#4cd7f6] transition-colors duration-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="help-4" onClick={actions?.["help-4"]}>
      <HelpCircle  style={{fontVariationSettings: "'FILL' 0"}} aria-hidden={true} focusable="false" />
                      HELP
                  </button>
      </div>
      </main>
      {/* Footer High Score Badge */}
      <footer className="w-full flex justify-center pb-margin pt-8 relative z-10">
      <div className="bg-surface-container-highest border border-outline-variant px-4 py-2 flex items-center gap-2 drop-shadow-[0_0_4px_#4cd7f6]">
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} className="text-primary text-sm" aria-hidden={true} focusable="false" />
      <span className="font-label-xs text-label-xs text-primary uppercase tracking-widest">HIGH SCORE: {formatScore(highScore)}</span>
      </div>
      </footer>
    </>
  );
}
