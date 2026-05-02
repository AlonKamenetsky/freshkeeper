function logger(req, res, next) {
  const start = Date.now();

  // Run after the response is sent to capture status code
  res.on('finish', () => {
    const duration = Date.now() - start;
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
  });

  next();
}

module.exports = logger;