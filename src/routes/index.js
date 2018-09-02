const express = require('express');
const bodyParser = require('body-parser');
const { celebrate } = require('celebrate');
const { registerDog } = require('../services/dogsRegistration');
const { errors } = require('./schemas/validationErrorsReporter');
const dogRegistrationSchema = require('./schemas/dogRegistrationSchema');
const clients = require('../clients');

const app = express();
app.use(bodyParser.json());

app.get('/isAlive', (req, res) => {
  res.send(true);
});

app.put('/api/v1/dog', celebrate(dogRegistrationSchema), async (req, res) => {
  const newDogData = await registerDog(req.body, clients);
  res.send(newDogData);
});
app.use(errors());

module.exports = app;
