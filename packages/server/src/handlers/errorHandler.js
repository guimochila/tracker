// Catch Error Handler
export const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

// Development Error Handler
export const developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };

  res.status(err.status || 500).json(errorDetails);
};

// Production Error handler
export const productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
};

// Not found handler
export const notFound = (req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};
