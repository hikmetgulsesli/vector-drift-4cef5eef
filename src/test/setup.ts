import '@testing-library/jest-dom/vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { createElement } from 'react';
import App from '../App';

afterEach(() => {
  cleanup();
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
