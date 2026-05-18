import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  AppActions,
  AppSnapshot,
  Difficulty,
  GameState,
  Lane,
  Obstacle,
  WindowAppBridge,
} from '../types/domain';
import { loadDifficulty, loadHighScore, saveDifficulty, saveHighScore } from '../utils/storage';

const LANES = [0, 1, 2] as const;
const MAX_DELTA_MS = 80;

const difficultyConfig: Record<Difficulty, { speed: number; spawnEveryMs: number }> = {
  easy: { speed: 0.00034, spawnEveryMs: 1380 },
  normal: { speed: 0.00046, spawnEveryMs: 1120 },
  hard: { speed: 0.0006, spawnEveryMs: 880 },
};

const initialState = (): GameState => ({
  screen: 'menu',
  previousScreen: 'menu',
  status: 'idle',
  playerLane: 1,
  obstacles: [],
  score: 0,
  elapsedMs: 0,
  highScore: loadHighScore(),
  settings: { difficulty: loadDifficulty() },
  seed: 7,
  nextObstacleId: 1,
  lastTickAt: null,
});

const laneFromSeed = (seed: number): Lane => LANES[Math.abs(seed) % LANES.length];

const nextSeed = (seed: number) => (seed * 48271) % 0x7fffffff;

const toSnapshot = (state: GameState): AppSnapshot => ({
  ...state,
  lanes: LANES,
  ...difficultyConfig[state.settings.difficulty],
});

const clampLane = (lane: number): Lane => Math.max(0, Math.min(2, lane)) as Lane;

export function useAppState() {
  const [state, setState] = useState<GameState>(() => initialState());
  const listenersRef = useRef(new Set<(state: AppSnapshot) => void>());
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
    const snapshot = toSnapshot(state);
    listenersRef.current.forEach((listener) => listener(snapshot));
  }, [state]);

  const updateHighScore = useCallback((score: number, fallback: number) => {
    const highScore = Math.max(score, fallback);
    if (highScore !== fallback) {
      saveHighScore(highScore);
    }
    return highScore;
  }, []);

  const commit = useCallback((updater: (current: GameState) => GameState) => {
    const next = updater(stateRef.current);
    stateRef.current = next;
    setState(next);
    return next;
  }, []);

  const tick = useCallback(
    (deltaMs = 16) => {
      commit((current) => {
        if (current.status !== 'playing') return current;

        const delta = Math.max(0, Math.min(MAX_DELTA_MS, deltaMs));
        const config = difficultyConfig[current.settings.difficulty];
        const elapsedMs = current.elapsedMs + delta;
        const shouldSpawn =
          Math.floor(current.elapsedMs / config.spawnEveryMs) !== Math.floor(elapsedMs / config.spawnEveryMs);
        const seed = shouldSpawn ? nextSeed(current.seed) : current.seed;
        const spawned: Obstacle[] = shouldSpawn
          ? [{ id: current.nextObstacleId, lane: laneFromSeed(seed), y: 0 }]
          : [];
        const obstacles = [...current.obstacles, ...spawned]
          .map((obstacle) => ({ ...obstacle, y: obstacle.y + config.speed * delta }))
          .filter((obstacle) => obstacle.y < 1.15);
        const score = current.score + Math.floor(delta * (current.settings.difficulty === 'hard' ? 0.024 : 0.018));
        const crashed = obstacles.some(
          (obstacle) => obstacle.lane === current.playerLane && obstacle.y >= 0.78 && obstacle.y <= 0.98,
        );
        const highScore = crashed ? updateHighScore(score, current.highScore) : current.highScore;

        return {
          ...current,
          screen: crashed ? 'gameOver' : current.screen,
          status: crashed ? 'ended' : current.status,
          obstacles,
          score,
          elapsedMs,
          highScore,
          seed,
          nextObstacleId: shouldSpawn ? current.nextObstacleId + 1 : current.nextObstacleId,
        };
      });
    },
    [commit, updateHighScore],
  );

  useEffect(() => {
    if (state.status !== 'playing') return undefined;

    let frame = 0;
    let previous = performance.now();
    const loop = (now: number) => {
      tick(now - previous);
      previous = now;
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [state.status, tick]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        event.preventDefault();
        actions.moveLeft();
      }
      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
        event.preventDefault();
        actions.moveRight();
      }
      if (event.key === ' ' || event.key === 'Escape') {
        event.preventDefault();
        const current = stateRef.current;
        if (current.status === 'playing') actions.pauseGame();
        else if (current.status === 'paused') actions.resumeGame();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const actions = useMemo<AppActions>(
    () => ({
      startGame: () =>
        commit((current) => ({
          ...current,
          screen: 'play',
          previousScreen: 'play',
          status: 'playing',
          playerLane: 1,
          obstacles: [],
          score: 0,
          elapsedMs: 0,
          seed: 7,
          nextObstacleId: 1,
        })),
      pauseGame: () =>
        commit((current) =>
          current.status === 'playing'
            ? { ...current, screen: 'pause', previousScreen: 'play', status: 'paused' }
            : current,
        ),
      resumeGame: () =>
        commit((current) =>
          current.status === 'paused'
            ? { ...current, screen: 'play', previousScreen: 'play', status: 'playing' }
            : current,
        ),
      restartGame: () => actions.startGame(),
      endGame: () =>
        commit((current) => ({
          ...current,
          screen: 'gameOver',
          status: 'ended',
          highScore: updateHighScore(current.score, current.highScore),
        })),
      openMenu: () => commit((current) => ({ ...current, screen: 'menu', previousScreen: 'menu', status: 'idle' })),
      openSettings: () =>
        commit((current) => ({ ...current, screen: 'settings', previousScreen: current.screen })),
      openHelp: () => commit((current) => ({ ...current, screen: 'help', previousScreen: current.screen })),
      setDifficulty: (difficulty: Difficulty) =>
        commit((current) => {
          saveDifficulty(difficulty);
          return { ...current, settings: { difficulty } };
        }),
      moveLeft: () => actions.moveToLane(clampLane(stateRef.current.playerLane - 1)),
      moveRight: () => actions.moveToLane(clampLane(stateRef.current.playerLane + 1)),
      moveToLane: (lane: Lane) => commit((current) => ({ ...current, playerLane: clampLane(lane) })),
      tick,
    }),
    [commit, tick, updateHighScore],
  );

  useEffect(() => {
    const bridge: WindowAppBridge = {
      get state() {
        return toSnapshot(stateRef.current);
      },
      getState: () => toSnapshot(stateRef.current),
      actions,
      subscribe: (listener) => {
        listenersRef.current.add(listener);
        listener(toSnapshot(stateRef.current));
        return () => listenersRef.current.delete(listener);
      },
    };

    window.app = bridge;
    return () => {
      if (window.app === bridge) {
        delete window.app;
      }
    };
  }, [actions]);

  return { state, snapshot: toSnapshot(state), actions };
}
