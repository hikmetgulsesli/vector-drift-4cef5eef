import type { Difficulty } from '../types/domain';

const HIGH_SCORE_KEY = 'vector-drift:high-score';
const DIFFICULTY_KEY = 'vector-drift:difficulty';
const BACKGROUND_MUSIC_KEY = 'vector-drift:background-music';
const SOUND_EFFECTS_KEY = 'vector-drift:sound-effects';

const isDifficulty = (value: string | null | undefined): value is Difficulty =>
  value === 'easy' || value === 'normal' || value === 'hard';

const getStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export function loadHighScore(): number {
  const storage = getStorage();
  const value = storage?.getItem(HIGH_SCORE_KEY);
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
}

export function saveHighScore(score: number): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(HIGH_SCORE_KEY, String(Math.max(0, Math.floor(score))));
}

export function loadDifficulty(): Difficulty {
  const storage = getStorage();
  const value = storage?.getItem(DIFFICULTY_KEY);
  return isDifficulty(value) ? value : 'normal';
}

export function saveDifficulty(difficulty: Difficulty): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(DIFFICULTY_KEY, difficulty);
}

export function loadBooleanSetting(key: string, fallback: boolean): boolean {
  const storage = getStorage();
  const value = storage?.getItem(key);
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

export function saveBooleanSetting(key: string, value: boolean): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(key, String(value));
}

export function loadBackgroundMusic(): boolean {
  return loadBooleanSetting(BACKGROUND_MUSIC_KEY, true);
}

export function saveBackgroundMusic(value: boolean): void {
  saveBooleanSetting(BACKGROUND_MUSIC_KEY, value);
}

export function loadSoundEffects(): boolean {
  return loadBooleanSetting(SOUND_EFFECTS_KEY, true);
}

export function saveSoundEffects(value: boolean): void {
  saveBooleanSetting(SOUND_EFFECTS_KEY, value);
}
