import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { App } from './App';

describe('App', () => {
  let container, fetcher;

  beforeEach(() => {
    container = document.createElement('div');
    fetcher = jest.fn(() => Promise.resolve(() => ({})));
    ReactDOM.render(<App fetcher={fetcher} />, container);
  });

  const form = () => container.querySelector('form');

  const element = name => container.querySelector(name);

  describe('submitting indicator', () => {
    it('displays indicator when form is submitting, and hides after', async () => {
      // your situation is a bit granular since you're testing
      // stuff happening in rapid succession.
      // so let's start with a sync act() to test the initial ui
      act(() => {
        ReactTestUtils.Simulate.submit(form());
      });
      expect(element('.submittingIndicator')).not.toBeNull();
      // now wait for a 'tick' and for ui to stabilize
      await act(async () => {
        // this might seem odd, but it matches user behaviour, to 'wait' a smidge.
        // similar tests could also, for eg, resolve the fetcher() mock inside this scope manually.
      });

      expect(element('.submittingIndicator')).toBeNull();
    });
  });
});
