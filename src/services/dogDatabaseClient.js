const { MongoClient } = require('mongodb');

class DogDatabaseClient {
  constructor(dogDatabaseUrl) {
    this.dogDatabaseUrl = dogDatabaseUrl;
  }

  async save(dog) {
    const dogsMongoClient = await MongoClient.connect(this.dogDatabaseUrl);
    await dogsMongoClient
      .db('Soluto')
      .collection('Dogs')
      .save(dog);
  }
}

module.exports = DogDatabaseClient;
