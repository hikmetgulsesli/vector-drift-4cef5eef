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
          elapsedMs={state.elapsedMs}
          highScore={state.highScore}
          obstacles={state.obstacles}
          playerLane={state.playerLane}
          score={state.score}
          actions={{
            'button-1-1': actions.openSettings,
            'button-2-2': actions.openHelp,
            'button-3-3': actions.pauseGame,
          }}
        />
        <Playfield />
        <PauseOverlayOverlay
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
    return (
      <GameOverResult
        actions={{
          'play-again-1': actions.restartGame,
          'main-menu-2': actions.openMenu,
          'button-3-3': actions.openHelp,
          'button-4-4': () => undefined,
        }}
      />
    );
  }

  if (state.screen === 'play') {
    return (
      <>
        <GameBoardPlay
          elapsedMs={state.elapsedMs}
          highScore={state.highScore}
          obstacles={state.obstacles}
          playerLane={state.playerLane}
          score={state.score}
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
      highScore={state.highScore}
      resumeAvailable={state.status === 'paused'}
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
