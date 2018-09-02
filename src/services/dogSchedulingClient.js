const axios = require('axios');

class DogSchedulingClient {
  constructor(dogSchedulingServiceUrl) {
    this.dogSchedulingServiceUrl = dogSchedulingServiceUrl;
  }

  async getSchedule(dogId, employeeId) {
    const response = await axios.get(`${this.dogSchedulingServiceUrl}/api/v1/schedule`, {
      params: {
        dogId,
        employeeId
      }
    });
    return response.data;
  }
}

module.exports = DogSchedulingClient;
