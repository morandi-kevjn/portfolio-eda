import { configureStore } from '@reduxjs/toolkit';
import portfolio from '../features/portfolio/portfolioSlice';
import publish from '../features/publish/publishSlice';
import { socketMiddleware } from './socketMiddleware';

export const store = configureStore({
  reducer: { portfolio, publish },
  middleware: (getDefault) => getDefault().concat(socketMiddleware),
});
