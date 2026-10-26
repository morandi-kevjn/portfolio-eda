import { subscribe } from '../../shared/eventBus.js';
import { Events } from './portfolio.events.js';

// Bridges domain events -> Socket.IO. The gateway knows nothing about business rules.
export function registerPortfolioGateway(io) {
  Object.values(Events).forEach((type) => subscribe(type, (evt) => io.emit('event', evt)));
}
