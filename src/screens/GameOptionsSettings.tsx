// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Options (settings)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ArrowLeft, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import type { Difficulty, GameSettings } from "../types/domain";


export type GameOptionsSettingsActionId = "button-1-1" | "button-2-2" | "button-3-3" | "easy-4" | "normal-5" | "hard-6" | "main-menu-7";

export interface GameOptionsSettingsProps {
  actions?: Partial<Record<GameOptionsSettingsActionId, () => void>>;
  settings?: GameSettings;
}

const difficultyButtonClass = (difficulty: Difficulty, selectedDifficulty: Difficulty) =>
  difficulty === selectedDifficulty
    ? "bg-primary/20 py-2 font-label-sm text-label-sm text-primary border border-primary neon-glow-primary shadow-[0_0_8px_rgba(76,215,246,0.3)]"
    : "bg-surface-container-high py-2 font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors";

const toggleTrackClass = (enabled: boolean) =>
  enabled
    ? "w-12 h-6 border border-primary bg-primary/20 relative flex items-center p-[2px]"
    : "w-12 h-6 border border-outline-variant bg-surface-container relative flex items-center p-[2px]";

const toggleThumbClass = (enabled: boolean) =>
  enabled
    ? "w-5 h-full bg-primary neon-glow-primary ml-auto shadow-[0_0_4px_#4cd7f6]"
    : "w-5 h-full bg-outline-variant shadow-[0_0_4px_rgba(148,163,184,0.25)]";

export function GameOptionsSettings({ actions, settings }: GameOptionsSettingsProps) {
  const currentDifficulty = settings?.difficulty ?? "normal";
  const backgroundMusic = settings?.backgroundMusic ?? true;
  const soundEffects = settings?.soundEffects ?? true;

  return (
    <>
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none scanlines z-50 mix-blend-overlay opacity-30"></div>
      <div className="max-w-3xl mx-auto min-h-screen flex flex-col px-margin py-margin relative z-10">
      {/* Header */}
      <header className="flex items-center gap-4 mb-12 border-b border-primary/30 pb-4 relative">
      <button className="w-touch-target-min h-touch-target-min flex items-center justify-center border border-outline-variant hover:border-primary hover:neon-glow-primary hover:text-primary transition-colors text-on-surface-variant group" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]}>
      <ArrowLeft className="group-hover:-translate-x-1 transition-transform" aria-hidden={true} focusable="false" />
      </button>
      <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter drop-shadow-[0_0_8px_#4cd7f6]">
                      OPTIONS
                  </h1>
      </header>
      {/* Main Content */}
      <main className="flex-grow flex flex-col gap-8">
      {/* AUDIO CONFIGURATION */}
      <section className="bg-surface-container border border-outline-variant p-margin relative">
      <div className="absolute -top-[1px] left-0 w-1/3 border-t-2 border-secondary neon-glow-secondary shadow-[0_0_4px_#ffb0cd]"></div>
      <h2 className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-6 flex items-center gap-2">
      <Circle className="text-[16px]" aria-hidden={true} focusable="false" />
                          AUDIO CONFIGURATION
                      </h2>
      <div className="flex flex-col gap-4">
      {/* Background Music Toggle */}
      <div className="flex items-center justify-between p-unit bg-surface-container-high border border-outline-variant hover:border-primary/50 transition-colors">
      <span className="font-body-md text-body-md text-on-surface ml-2">Background Music</span>
      <button aria-label="Toggle background music" aria-pressed={backgroundMusic} className={toggleTrackClass(backgroundMusic)} type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]}>
      <div className={toggleThumbClass(backgroundMusic)}></div>
      </button>
      </div>
      {/* Sound Effects Toggle */}
      <div className="flex items-center justify-between p-unit bg-surface-container-high border border-outline-variant hover:border-primary/50 transition-colors">
      <span className="font-body-md text-body-md text-on-surface ml-2">Sound Effects</span>
      <button aria-label="Toggle sound effects" aria-pressed={soundEffects} className={toggleTrackClass(soundEffects)} type="button" data-action-id="button-3-3" onClick={actions?.["button-3-3"]}>
      <div className={toggleThumbClass(soundEffects)}></div>
      </button>
      </div>
      </div>
      </section>
      {/* GAMEPLAY PARAMETERS */}
      <section className="bg-surface-container border border-outline-variant p-margin relative">
      <div className="absolute -top-[1px] left-0 w-1/3 border-t-2 border-primary neon-glow-primary shadow-[0_0_4px_#4cd7f6]"></div>
      <h2 className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
      <Circle className="text-[16px]" aria-hidden={true} focusable="false" />
                          GAMEPLAY PARAMETERS
                      </h2>
      <div className="flex flex-col gap-8">
      {/* AI Difficulty */}
      <div className="flex flex-col gap-3">
      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">AI Difficulty</label>
      <div className="grid grid-cols-3 gap-[1px] bg-outline-variant border border-outline-variant">
      <button aria-pressed={currentDifficulty === "easy"} className={difficultyButtonClass("easy", currentDifficulty)} type="button" data-action-id="easy-4" onClick={actions?.["easy-4"]}>EASY</button>
      <button aria-pressed={currentDifficulty === "normal"} className={difficultyButtonClass("normal", currentDifficulty)} type="button" data-action-id="normal-5" onClick={actions?.["normal-5"]}>NORMAL</button>
      <button aria-pressed={currentDifficulty === "hard"} className={difficultyButtonClass("hard", currentDifficulty)} type="button" data-action-id="hard-6" onClick={actions?.["hard-6"]}>HARD</button>
      </div>
      </div>
      {/* Simulation Speed */}
      <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Simulation Speed</label>
      <span className="font-label-xs text-label-xs text-primary">1.0x</span>
      </div>
      <div className="h-8 flex items-center relative w-full">
      <div className="absolute w-full h-[2px] bg-outline-variant top-1/2 -translate-y-1/2"></div>
      <div className="absolute w-1/2 h-[2px] bg-primary top-1/2 -translate-y-1/2 shadow-[0_0_4px_#4cd7f6]"></div>
      <div className="absolute left-1/2 w-4 h-6 bg-primary border border-background -translate-x-1/2 cursor-pointer hover:neon-glow-primary shadow-[0_0_4px_#4cd7f6]"></div>
      </div>
      </div>
      {/* Steering Sensitivity */}
      <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Steering Sensitivity</label>
      <span className="font-label-xs text-label-xs text-secondary">HIGH</span>
      </div>
      <div className="flex gap-1 h-6">
      <div className="flex-1 bg-secondary border border-secondary neon-glow-secondary opacity-20"></div>
      <div className="flex-1 bg-secondary border border-secondary neon-glow-secondary opacity-40"></div>
      <div className="flex-1 bg-secondary border border-secondary neon-glow-secondary opacity-60"></div>
      <div className="flex-1 bg-secondary border border-secondary neon-glow-secondary shadow-[0_0_8px_#ffb0cd]"></div>
      <div className="flex-1 bg-surface-container-highest border border-outline-variant"></div>
      </div>
      </div>
      </div>
      </section>
      </main>
      {/* Footer */}
      <footer className="mt-12">
      <button className="w-full h-14 bg-surface border border-outline-variant hover:border-primary text-on-surface hover:text-primary font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg tracking-tighter uppercase transition-colors flex items-center justify-center gap-4 group hover:neon-glow-primary shadow-[0_4px_20px_rgba(76,215,246,0.05)] hover:shadow-[0_4px_20px_rgba(76,215,246,0.15)] active:scale-[0.98]" type="button" data-action-id="main-menu-7" onClick={actions?.["main-menu-7"]}>
      <ChevronLeft className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden={true} focusable="false" />
                      MAIN MENU
                      <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden={true} focusable="false" />
      </button>
      </footer>
      </div>
    </>
  );
}
