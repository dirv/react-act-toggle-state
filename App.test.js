import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { App } from './App';

describe('App', () => {
  let container, fetcher;

  beforeEach(() => {
    container = document.createElement('div');
    fetcher = jest.fn(() => Promise.resolve(() => ({ })));
    ReactDOM.render(<App fetcher={fetcher}/>, container);
  });

  const form = () => container.querySelector('form');

  const element = name => container.querySelector(name);

  describe('submitting indicator', () => {
    it('displays indicator when form is submitting', async () => {
      ReactTestUtils.Simulate.submit(form());
      await act(async () => {
        expect(element('.submittingIndicator')).not.toBeNull();
      });
    });

    it('initially does not display the submitting indicator', () => {
      expect(element('.submittingIndicator')).toBeNull();
    });

    it('hides indicator when form has submitted', async () => {
      await act(async () => {
        ReactTestUtils.Simulate.submit(form());
      });
      expect(element('.submittingIndicator')).toBeNull();
    });
  });
});
