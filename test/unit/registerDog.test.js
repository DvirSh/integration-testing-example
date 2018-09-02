const chai = require('chai');
const { registerDog } = require('../../src/services/dogsRegistration');

chai.should();

describe('dogsRegistration', async () => {
  describe('registerDog', async () => {
    const defaultClients = {
      dogDatabaseClient: {
        save: () => new Promise(resolve => resolve())
      },
      dogSchedulingClient: {
        getSchedule: () => new Promise(resolve => resolve(['Sunday']))
      },
      employeesApiClient: {
        getEmailAddress: () => new Promise(resolve => resolve('test@soluto.com'))
      },
      emailSendingClient: {
        send: () => new Promise(resolve => resolve('notification-id'))
      }
    };

    it('should register a new dog and return its id and schedule', async () => {
      const registeredDog = await registerDog({ name: 'Pikachu', employeeId: '42' }, defaultClients);
      registeredDog.should.have.property('dogId');
      registeredDog.should.have.property('schedule');
      registeredDog.should.have.property('notificationId');
    });
  });
});
