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
