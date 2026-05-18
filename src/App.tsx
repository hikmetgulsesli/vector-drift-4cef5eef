import { AppProvider, useAppContext } from './contexts/AppContext';
import type { Lane } from './types/domain';
import {
  ControlsHelpHelp,
  GameBoardPlay,
  GameOptionsSettings,
  GameOverResult,
  MainMenuMenu,
  PauseOverlayOverlay,
} from './screens';
import './App.css';

function formatTime(ms: number) {
  return `${Math.floor(ms / 1000)}s`;
}

function multiplierFor(difficulty: string) {
  if (difficulty === 'hard') return 'x2.0';
  if (difficulty === 'easy') return 'x1.0';
  return 'x1.5';
}

function resultText(score: number, elapsedMs: number, highScore: number) {
  return `Vector Drift result: score ${Math.floor(score)}, time ${formatTime(elapsedMs)}, best ${Math.floor(highScore)}`;
}

function Playfield() {
  const { state, actions } = useAppContext();
  const controlsDisabled = state.status !== 'playing';

  return (
    <section className="vd-playfield" aria-label="Vector Drift playfield">
      <div className="vd-road">
        {[0, 1, 2].map((lane) => (
          <button
            aria-label={`Move to lane ${lane + 1}`}
            className="vd-lane"
            disabled={controlsDisabled}
            key={lane}
            type="button"
            onClick={() => actions.moveToLane(lane as Lane)}
          />
        ))}
        {state.obstacles.map((obstacle) => (
          <span
            aria-hidden="true"
            className="vd-obstacle"
            key={obstacle.id}
            style={{ '--lane': obstacle.lane, '--y': `${obstacle.y * 100}%` } as React.CSSProperties}
          />
        ))}
        <span
          aria-label={`Player in lane ${state.playerLane + 1}`}
          className="vd-player"
          style={{ '--lane': state.playerLane } as React.CSSProperties}
        />
      </div>
      <div className="vd-touch-controls" aria-label="Touch controls">
        <button type="button" disabled={controlsDisabled} onClick={actions.moveLeft}>
          Left
        </button>
        <button type="button" disabled={controlsDisabled} onClick={actions.moveRight}>
          Right
        </button>
      </div>
    </section>
  );
}

function GameHud() {
  const { state } = useAppContext();

  return (
    <aside className="vd-hud" aria-label="Game status">
      <span>Score {Math.floor(state.score)}</span>
      <span>Time {formatTime(state.elapsedMs)}</span>
      <span>Best {Math.floor(state.highScore)}</span>
      <span>{state.settings.difficulty.toUpperCase()}</span>
    </aside>
  );
}

function ScreenBridge() {
  const { state, actions } = useAppContext();

  if (state.screen === 'settings') {
    return (
      <GameOptionsSettings
        actions={{
          'button-1-1': actions.openMenu,
          'button-2-2': actions.openHelp,
          'button-3-3': actions.startGame,
          'easy-4': () => actions.setDifficulty('easy'),
          'normal-5': () => actions.setDifficulty('normal'),
          'hard-6': () => actions.setDifficulty('hard'),
          'main-menu-7': actions.openMenu,
        }}
      />
    );
  }

  if (state.screen === 'help') {
    return <ControlsHelpHelp actions={{ 'main-menu-1': actions.openMenu }} />;
  }

  if (state.screen === 'pause') {
    return (
      <>
        <GameBoardPlay
          actions={{
            'button-1-1': actions.openSettings,
            'button-2-2': actions.openHelp,
            'button-3-3': actions.pauseGame,
          }}
        />
        <Playfield />
        <PauseOverlayOverlay
          score={state.score}
          elapsedMs={state.elapsedMs}
          difficulty={state.settings.difficulty}
          actions={{
            'resume-1': actions.resumeGame,
            'restart-2': actions.restartGame,
            'main-menu-3': actions.openMenu,
          }}
        />
      </>
    );
  }

  if (state.screen === 'gameOver') {
    const result = resultText(state.score, state.elapsedMs, state.highScore);
    return (
      <GameOverResult
        finalScore={state.score}
        timeSurvivedMs={state.elapsedMs}
        multiplier={multiplierFor(state.settings.difficulty)}
        isNewHighScore={Math.floor(state.score) >= Math.floor(state.highScore) && state.score > 0}
        actions={{
          'play-again-1': actions.restartGame,
          'main-menu-2': actions.openMenu,
          'button-3-3': () => void navigator.clipboard?.writeText(result),
          'button-4-4': () => {
            const blob = new Blob([result], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'vector-drift-result.txt';
            link.click();
            URL.revokeObjectURL(url);
          },
        }}
      />
    );
  }

  if (state.screen === 'play') {
    return (
      <>
        <GameBoardPlay
          actions={{
            'button-1-1': actions.openSettings,
            'button-2-2': actions.openHelp,
            'button-3-3': actions.pauseGame,
          }}
        />
        <Playfield />
      </>
    );
  }

  return (
    <MainMenuMenu
      actions={{
        'start-game-1': actions.startGame,
        'resume-2': state.status === 'paused' ? actions.resumeGame : actions.startGame,
        'options-3': actions.openSettings,
        'help-4': actions.openHelp,
      }}
    />
  );
}

function AppShell() {
  return (
    <div data-setfarm-root="vector-drift" className="vd-app">
      <ScreenBridge />
      <GameHud />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
