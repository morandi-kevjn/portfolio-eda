# Portfolio publisher (React + Redux, Express + Socket.IO, event-driven)

    npm run install:all
    npm run dev:server   # :3001
    npm run dev:client   # :5173

Flow: POST /api/portfolio/publish -> 202 + publishId -> events on the server bus
(requested -> validated -> built -> published | failed) -> Socket.IO -> Redux `serverEventReceived`.
The "database" is server/data/portfolio.json behind portfolio.repository.js.
