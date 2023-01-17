import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './redux/store';

const renderWithContext = (element: React.ReactElement) =>
  render(
    <Provider store={store}>
      <Router>{element}</Router>
    </Provider>,
  );
export default renderWithContext;
