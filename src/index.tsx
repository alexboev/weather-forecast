import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// TODO https://material-ui.com/components/typography/#general 
/**
 * Be careful when using this approach. Make sure your bundler doesn't eager load
 *  all the font variations (100/300/400/500/700/900, italic/regular, SVG/woff). 
 * Fontsource can be configured to load specific subsets, weights and styles. 
 * Inlining all the font files can significantly increase the size of your bundle.
 *  Material-UI default typography configuration only relies on 300, 400, 500, 
 * and 700 font weights.
 *  */ 
import '@fontsource/roboto';
import { configureStore } from '@reduxjs/toolkit';
import { forecastSlice } from './store/store';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
      forecast: forecastSlice.reducer
  }
});

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
