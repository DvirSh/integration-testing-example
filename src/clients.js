const nconf = require('nconf');
const DogSchedulingClient = require('./services/dogSchedulingClient');
const EmployeesApiClient = require('./services/employeesApiClient');
const EmailSendingClient = require('./services/emailSendingClient');
const DogDatabaseClient = require('./services/dogDatabaseClient');

nconf
  .env()
  .argv();

const dogSchedulingServiceUrl = nconf.get('dogSchedulingServiceUrl');
const employeesApiUrl = nconf.get('employeesApiUrl');
const emailSendingServiceUrl = nconf.get('emailSendingServiceUrl');
const dogDatabaseUrl = nconf.get('dogDatabaseUrl');

module.exports = {
  dogSchedulingClient: new DogSchedulingClient(dogSchedulingServiceUrl),
  employeesApiClient: new EmployeesApiClient(employeesApiUrl),
  emailSendingClient: new EmailSendingClient(emailSendingServiceUrl),
  dogDatabaseClient: new DogDatabaseClient(dogDatabaseUrl)
};
