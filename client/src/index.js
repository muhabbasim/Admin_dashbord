import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// redux toolkit setup
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "./state"
import { Provider } from 'react-redux';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

// redux toolkit setup
const store = configureStore({
  reducer : {
    global: globalReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
   {/* <React.StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>
   {/* </React.StrictMode> */}
  </QueryClientProvider>

);

