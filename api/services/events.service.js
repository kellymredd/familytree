const Models = require("../../models");

class EventService {
  constructor() {
    this.Models = Models;
  }

  async createEvent(event) {
    try {
      const data = await this.Models.event.create(event);

      return data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = EventService;
