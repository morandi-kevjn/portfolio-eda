import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { publish } from '../../shared/eventBus.js';
import { Events } from './portfolio.events.js';
import { portfolioRepository } from './portfolio.repository.js';

export const portfolioRouter = Router();

portfolioRouter.get('/',
    async (_req, res) =>
        res.json(await portfolioRepository.getPublished()));

// Command endpoint: accept, emit event, answer 202. Progress arrives over the socket.
portfolioRouter.post('/publish',
    (req, res) => {
      const publishId = randomUUID();
      res.status(202).json({ publishId });
    publish(Events.PublishRequested, { publishId, portfolio: req.body });
});
