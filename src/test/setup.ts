import '@testing-library/jest-dom/vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { createElement } from 'react';
import App from '../App';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe('options screen settings', () => {
  it('toggles audio settings and persists them from the generated options screen', () => {
    render(createElement(App));

    act(() => {
      window.app?.actions.openSettings();
    });

    const backgroundMusic = screen.getByRole('button', { name: /toggle background music/i });
    const soundEffects = screen.getByRole('button', { name: /toggle sound effects/i });

    expect(backgroundMusic).toHaveAttribute('aria-pressed', 'true');
    expect(soundEffects).toHaveAttribute('aria-pressed', 'true');

    act(() => {
      backgroundMusic.click();
      soundEffects.click();
    });

    expect(window.app?.state.settings.backgroundMusic).toBe(false);
    expect(window.app?.state.settings.soundEffects).toBe(false);
    expect(window.localStorage.getItem('vector-drift:background-music')).toBe('false');
    expect(window.localStorage.getItem('vector-drift:sound-effects')).toBe('false');
  });

  it('updates difficulty without resetting audio preferences', () => {
    render(createElement(App));

    act(() => {
      window.app?.actions.openSettings();
    });

    act(() => {
      window.app?.actions.toggleBackgroundMusic();
      screen.getByRole('button', { name: 'HARD' }).click();
    });

    expect(window.app?.state.settings.difficulty).toBe('hard');
    expect(window.app?.state.settings.backgroundMusic).toBe(false);
    expect(window.app?.state.settings.soundEffects).toBe(true);
    expect(window.localStorage.getItem('vector-drift:difficulty')).toBe('hard');
  });
});

describe('paused movement guard', () => {
  it('keeps the player lane unchanged when pause controls or bridge movement are attempted', () => {
    render(createElement(App));

    act(() => {
      window.app?.actions.startGame();
      window.app?.actions.pauseGame();
    });

    expect(window.app?.state.status).toBe('paused');
    expect(screen.getByLabelText('Move to lane 3')).toBeDisabled();

    const pausedLane = window.app?.state.playerLane;

    act(() => {
      window.app?.actions.moveRight();
      window.app?.actions.moveToLane(2);
      screen.getByText('Right').click();
    });

    expect(window.app?.state.playerLane).toBe(pausedLane);
  });
});

describe('game loop regressions', () => {
  it('pauses active gameplay before opening settings or help from play', () => {
    render(createElement(App));

    act(() => {
      window.app?.actions.startGame();
      window.app?.actions.tick(16);
      window.app?.actions.openSettings();
    });

    const settingsScore = window.app?.state.score ?? 0;
    const settingsLane = window.app?.state.playerLane;

    expect(window.app?.state.screen).toBe('settings');
    expect(window.app?.state.status).toBe('paused');
    expect(window.app?.state.previousScreen).toBe('play');

    act(() => {
      window.app?.actions.tick(1000);
      window.app?.actions.moveToLane(2);
    });

    expect(window.app?.state.score).toBe(settingsScore);
    expect(window.app?.state.playerLane).toBe(settingsLane);

    act(() => {
      window.app?.actions.startGame();
      window.app?.actions.tick(16);
      window.app?.actions.openHelp();
    });

    const helpScore = window.app?.state.score ?? 0;

    expect(window.app?.state.screen).toBe('help');
    expect(window.app?.state.status).toBe('paused');
    expect(window.app?.state.previousScreen).toBe('play');

    act(() => {
      window.app?.actions.tick(1000);
    });

    expect(window.app?.state.score).toBe(helpScore);
  });

  it('accumulates score across animation-sized ticks', () => {
    render(createElement(App));

    let firstFrameScore = 0;

    act(() => {
      window.app?.actions.startGame();
      window.app?.actions.tick(16);
      firstFrameScore = window.app?.state.score ?? 0;
      for (let frame = 0; frame < 60; frame += 1) {
        window.app?.actions.tick(16);
      }
    });

    expect(firstFrameScore).toBeGreaterThan(0);
    expect(window.app?.state.score).toBeGreaterThan(0);
    expect(window.app?.state.score).toBeGreaterThan(firstFrameScore);
  });

  it('does not prevent default touch behavior on the lane controls', () => {
    render(createElement(App));

    act(() => {
      window.app?.actions.startGame();
    });

    const road = document.querySelector('.vd-road');
    expect(road).toBeInstanceOf(HTMLElement);

    const touchStart = new Event('touchstart', { bubbles: true, cancelable: true });
    road?.dispatchEvent(touchStart);

    expect(touchStart.defaultPrevented).toBe(false);
  });
});
