const { isCelebrate } = require('celebrate');
const EscapeHtml = require('escape-html');
/* eslint-disable no-underscore-dangle */

const errors = () => (err, req, res, next) => {
  if (isCelebrate(err)) {
    const error = {
      statusCode: 400,
      error: 'Bad Request',
      message: err.message,
      validation: {
        source: err._meta.source,
        keys: [],
      },
    };

    if (err.details) {
      for (let i = 0; i < err.details.length; i += 1) {
        const path = err.details[i].path.join('.');
        error.validation.keys.push(EscapeHtml(path));
      }
    }
    console.warn('Invalid request to the service', { ...error, path: req.path });
    return res.status(400).send(error);
  }

  // If this isn't a Celebrate error, send it to the next error handler
  return next(err);
};

module.exports = {
  errors
};
