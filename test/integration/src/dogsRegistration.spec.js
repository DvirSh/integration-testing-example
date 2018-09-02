const axios = require('axios');
const nconf = require('nconf');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { MongoClient } = require('mongodb');

chai.should();
chai.use(chaiAsPromised);
nconf.argv().env();
const dogsApiUrl = nconf.get('dogsApiUrl');
const dogDatabaseUrl = nconf.get('dogDatabaseUrl');

describe('dogs-api', () => {
  describe('PUT /dog', () => {
    let dogDatabaseClient;
    before(async () => {
      dogDatabaseClient = await MongoClient.connect(dogDatabaseUrl);
    });

    beforeEach(async () => {
      await dogDatabaseClient
        .db('Soluto')
        .collection('Dogs')
        .remove({});
    });

    after(async () => {
      await dogDatabaseClient.close();
    });

    it('should insert a dog to the database and notify the owner', async () => {
      const response = await axios.put(
        `${dogsApiUrl}/api/v1/dog`,
        {
          name: 'Pikachu',
          employeeId: '11'
        }
      );
      response.data.should.have.property('dogId');
      response.data.should.have.property('schedule');
      response.data.schedule.should.eql(['Monday', 'Tuesday']);
      response.data.should.have.property('notificationId');
      response.data.notificationId.should.eql('test-notification-id');
      const dogInDatabase = await dogDatabaseClient
        .db('Soluto')
        .collection('Dogs')
        .findOne({});
      dogInDatabase.name.should.eql('Pikachu');
    });

    it('should not allow invalid input', async () => {
      await axios.put(
        `${dogsApiUrl}/api/v1/dog`,
        {
          employeeId: '11'
        }
      ).should.be.rejectedWith('Request failed with status code 400');
    });
  });
});
