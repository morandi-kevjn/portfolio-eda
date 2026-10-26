import express from 'express';
import cors from 'cors';
import http from 'node:http';
import { Server } from 'socket.io';
import { portfolioRouter } from './modules/portfolio/portfolio.routes.js';
import { registerPortfolioHandlers } from './modules/portfolio/portfolio.handlers.js';
import { registerPortfolioGateway } from './modules/portfolio/portfolio.gateway.js';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }), express.json());
app.use('/api/portfolio', portfolioRouter);

const server = http.createServer(app);
const io =
    new Server(server, { cors: { origin: 'http://localhost:5173' } });

registerPortfolioHandlers();
registerPortfolioGateway(io);

server.listen(3001, () => console.log('API + sockets on :3001'));
