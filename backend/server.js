const express = require('express');
const app = express();
const PORT = 3000;

// --- Middleware imports ---
const logger = require('./middleware/logger');
const { roleCheck } = require('./middleware/roleCheck');

// --- Route imports ---
const usersRouter = require('./routes/usersRouter');
const itemsRouter = require('./routes/itemsRouter');

// ─── Global middleware ────────────────────────────────────────────
app.use(express.json());   // parse JSON request bodies
app.use(logger);           // log every incoming request

// ─── Routes ──────────────────────────────────────────────────────
app.use('/users', usersRouter);
app.use('/items', itemsRouter);

// ─── 404 handler (no route matched) ──────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    data: null,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} does not exist.`,
      details: {}
    }
  });
});

// ─── Global error handler (catches next(err) calls) ──────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    data: null,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.',
      details: {}
    }
  });
});

// ─── Start server ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`FreshKeeper API running on http://localhost:${PORT}`);
});

module.exports = app;