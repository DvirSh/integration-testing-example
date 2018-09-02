const axios = require('axios');

class EmailSendingClient {
  constructor(emailSendingServiceUrl) {
    this.emailSendingServiceUrl = emailSendingServiceUrl;
  }

  async send(emailAddress, dogName, schedule) {
    const response = await axios.post(`${this.emailSendingServiceUrl}/api/v1/sendDogSchedule`, {
      emailAddress,
      dogName,
      schedule
    });
    return response.data;
  }
}

module.exports = EmailSendingClient;
