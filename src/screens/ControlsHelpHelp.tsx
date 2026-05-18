// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Controls Help (help)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, MousePointerClick, Pause, Settings, TriangleAlert } from "lucide-react";


export type ControlsHelpHelpActionId = "main-menu-1";

export interface ControlsHelpHelpProps {
  actions?: Partial<Record<ControlsHelpHelpActionId, () => void>>;
}

export function ControlsHelpHelp({ actions }: ControlsHelpHelpProps) {
  return (
    <>
      {/* Top Navigation Placeholder (Hidden for this specific screen per instructions for transactional/focused pages, but TopAppBar requested in context usually implies some header. Will use a minimal header for Title.) */}
      <header className="w-full flex justify-between items-center px-margin py-4 border-b border-primary/30 shadow-[0_4px_20px_rgba(76,215,246,0.15)] bg-background/90 backdrop-blur-sm z-50">
      <div className="font-display-lg text-display-lg font-bold italic text-primary drop-shadow-[0_0_8px_#4cd7f6]">
                  VECTOR DRIFT
              </div>
      <div className="flex gap-4">
      <Settings className="text-primary hover:text-secondary hover:drop-shadow-[0_0_10px_#ffb0cd] transition-colors cursor-pointer" aria-hidden={true} focusable="false" />
      <Circle className="text-primary hover:text-secondary hover:drop-shadow-[0_0_10px_#ffb0cd] transition-colors cursor-pointer" aria-hidden={true} focusable="false" />
      <Pause className="text-primary hover:text-secondary hover:drop-shadow-[0_0_10px_#ffb0cd] transition-colors cursor-pointer" aria-hidden={true} focusable="false" />
      </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-margin gap-8 max-w-5xl mx-auto w-full relative z-10">
      {/* Header Section */}
      <div className="text-center mb-8">
      <h1 className="font-display-lg text-display-lg text-primary drop-shadow-[0_0_8px_#4cd7f6] uppercase tracking-tighter mb-2">SYSTEM INSTRUCTIONS</h1>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto">Master the controls to navigate the grid.</p>
      </div>
      {/* Interfaces Container (Bento-style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full">
      {/* Hardware Interface Card */}
      <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col items-center gap-6 relative group overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
      <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary border-b border-outline-variant w-full text-center pb-4 tracking-widest">HARDWARE INTERFACE</h2>
      <div className="flex flex-col items-center gap-4 py-8">
      <div className="grid grid-cols-3 gap-2">
      <div className="col-start-2 w-12 h-12 border border-outline flex items-center justify-center font-label-sm text-label-sm bg-surface-container hover:border-primary hover:text-primary transition-colors cursor-default">W</div>
      <div className="col-start-1 row-start-2 w-12 h-12 border border-outline flex items-center justify-center font-label-sm text-label-sm bg-surface-container hover:border-primary hover:text-primary transition-colors cursor-default">A</div>
      <div className="col-start-2 row-start-2 w-12 h-12 border border-outline flex items-center justify-center font-label-sm text-label-sm bg-surface-container hover:border-primary hover:text-primary transition-colors cursor-default">S</div>
      <div className="col-start-3 row-start-2 w-12 h-12 border border-outline flex items-center justify-center font-label-sm text-label-sm bg-surface-container hover:border-primary hover:text-primary transition-colors cursor-default">D</div>
      </div>
      <div className="flex gap-4 mt-4">
      <div className="px-6 py-2 border border-outline flex items-center justify-center font-label-sm text-label-sm bg-surface-container hover:border-secondary hover:text-secondary transition-colors cursor-default">ESC</div>
      </div>
      </div>
      </div>
      {/* Tactile Interface Card */}
      <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col items-center gap-6 relative group overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
      <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary border-b border-outline-variant w-full text-center pb-4 tracking-widest">TACTILE INTERFACE</h2>
      <div className="flex-grow flex items-center justify-center w-full relative py-8">
      {/* Stylized touch zones */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-24 h-24 border border-dashed border-outline-variant rounded-full flex items-center justify-center opacity-50 group-hover:border-primary group-hover:opacity-100 transition-colors">
      <Circle  style={{fontSize: "32px"}} className="text-outline-variant group-hover:text-primary" aria-hidden={true} focusable="false" />
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 border border-dashed border-outline-variant rounded-full flex items-center justify-center opacity-50 group-hover:border-primary group-hover:opacity-100 transition-colors">
      <MousePointerClick  style={{fontSize: "32px"}} className="text-outline-variant group-hover:text-primary" aria-hidden={true} focusable="false" />
      </div>
      <div className="w-full h-full border border-outline-variant/30 bg-surface-container/30 flex items-center justify-center p-4">
      <p className="font-label-sm text-label-sm text-on-surface-variant text-center opacity-70">LEFT/RIGHT SCREEN ZONES</p>
      </div>
      </div>
      </div>
      </div>
      {/* Rules Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter w-full mt-4">
      {/* Rule 1: Hazard */}
      <div className="bg-surface-container border border-outline-variant p-6 flex flex-col items-center text-center gap-4">
      <div className="w-16 h-16 rounded-full border border-secondary flex items-center justify-center bg-secondary/10">
      <TriangleAlert  style={{fontSize: "32px"}} className="text-secondary" aria-hidden={true} focusable="false" />
      </div>
      <div>
      <h3 className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-1">Avoid pink hazards</h3>
      <span className="inline-block bg-secondary text-on-secondary px-2 py-1 font-label-xs text-label-xs uppercase">Lethal</span>
      </div>
      </div>
      {/* Rule 2: Survive */}
      <div className="bg-surface-container border border-outline-variant p-6 flex flex-col items-center text-center gap-4">
      <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center bg-primary/10">
      <Circle  style={{fontSize: "32px"}} className="text-primary" aria-hidden={true} focusable="false" />
      </div>
      <div>
      <h3 className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">Survive as long as possible</h3>
      <span className="inline-block border border-primary text-primary px-2 py-1 font-label-xs text-label-xs uppercase">Endurance</span>
      </div>
      </div>
      {/* Rule 3: Objective */}
      <div className="bg-surface-container border border-outline-variant p-6 flex flex-col items-center text-center gap-4">
      <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center bg-primary/10">
      <Circle  style={{fontSize: "32px"}} className="text-primary" aria-hidden={true} focusable="false" />
      </div>
      <div>
      <h3 className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">Reach high scores</h3>
      <span className="inline-block border border-primary text-primary px-2 py-1 font-label-xs text-label-xs uppercase">Objective</span>
      </div>
      </div>
      </div>
      {/* Action Button */}
      <div className="mt-8 w-full flex justify-center">
      <button className="bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-widest px-12 py-4 glow-border hover:bg-primary-fixed-dim transition-colors min-h-[44px]" type="button" data-action-id="main-menu-1" onClick={actions?.["main-menu-1"]}>
                      MAIN MENU
                  </button>
      </div>
      </main>
    </>
  );
}
