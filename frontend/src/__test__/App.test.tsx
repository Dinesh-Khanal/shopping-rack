import { screen } from '@testing-library/react';
import React from 'react';

import App from '../App';
import renderWithContext from '../test.utils';
describe('App component', () => {
  it('renders home component properly', async () => {
    renderWithContext(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: /Products/i }),
    ).toBeInTheDocument();
  });
});
