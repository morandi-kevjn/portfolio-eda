import { io } from 'socket.io-client';
import { serverEventReceived } from './actions';

export const socketMiddleware = (store) => {
  const socket = io('http://localhost:3001');
  socket.on('event', (evt) => store.dispatch(serverEventReceived(evt)));
  return (next) => (action) => next(action);
};
