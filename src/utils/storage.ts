import type { Difficulty } from '../types/domain';

const HIGH_SCORE_KEY = 'vector-drift:high-score';
const DIFFICULTY_KEY = 'vector-drift:difficulty';

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
