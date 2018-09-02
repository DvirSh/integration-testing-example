const uuid = require('uuid').v4;

async function registerDog({ name, employeeId }, clients) {
  const {
    dogSchedulingClient, employeesApiClient, emailSendingClient, dogDatabaseClient
  } = clients;
  const dogId = uuid();
  const schedule = await dogSchedulingClient.getSchedule(dogId, employeeId);
  console.info('got schedule for dog', schedule);
  const emailAddress = await employeesApiClient.getEmailAddress(employeeId);
  console.info('got email address of employee', emailAddress);
  const notificationId = await emailSendingClient.send(emailAddress, name, schedule);
  console.info('sent email to employee', notificationId);
  await dogDatabaseClient.save({
    _id: dogId, name, schedule, employeeId
  });
  return {
    dogId,
    schedule,
    notificationId
  };
}

module.exports = {
  registerDog
};
