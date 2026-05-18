export type ScreenId = 'menu' | 'play' | 'settings' | 'help' | 'pause' | 'gameOver';

export type Difficulty = 'easy' | 'normal' | 'hard';

export type Lane = 0 | 1 | 2;

export interface Obstacle {
  id: number;
  lane: Lane;
  y: number;
}

export interface GameSettings {
  difficulty: Difficulty;
  backgroundMusic: boolean;
  soundEffects: boolean;
}

export interface GameState {
  screen: ScreenId;
  previousScreen: ScreenId;
  status: 'idle' | 'playing' | 'paused' | 'ended';
  playerLane: Lane;
  obstacles: Obstacle[];
  score: number;
  elapsedMs: number;
  highScore: number;
  settings: GameSettings;
  seed: number;
  nextObstacleId: number;
  lastTickAt: number | null;
}

export interface AppSnapshot extends GameState {
  lanes: readonly Lane[];
  speed: number;
  spawnEveryMs: number;
}

export interface AppActions {
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  endGame: () => void;
  openMenu: () => void;
  openSettings: () => void;
  openHelp: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  toggleBackgroundMusic: () => void;
  toggleSoundEffects: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveToLane: (lane: Lane) => void;
  tick: (deltaMs?: number) => void;
}

export interface WindowAppBridge {
  readonly state: AppSnapshot;
  getState: () => AppSnapshot;
  actions: AppActions;
  subscribe: (listener: (state: AppSnapshot) => void) => () => void;
}

declare global {
  interface Window {
    app?: WindowAppBridge;
  }
}
