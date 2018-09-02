const axios = require('axios');

class EmployeesApiClient {
  constructor(employeesApiUrl) {
    this.employeesApiUrl = employeesApiUrl;
  }

  async getEmailAddress(employeeId) {
    const response = await axios.get(`${this.employeesApiUrl}/api/v1/employee/${employeeId}/emailAddress`);
    return response.data;
  }
}

module.exports = EmployeesApiClient;
