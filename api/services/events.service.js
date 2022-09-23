const Models = require("../../models");

class EventService {
  constructor() {
    this.Models = Models;
  }

  async createEvent(event) {
    try {
      const { associatedMembers = null } = event;

      // handle single-member events w/ no associated members
      if (!associatedMembers) {
        const events = this.Models.event.create(event);
        return Promise.resolve([events]);
      }

      const events = await associatedMembers.map((am) =>
        this.Models.event.create({ ...event, memberId: am })
      );

      return await Promise.all(events);
    } catch (error) {
      return error;
    }
  }

  async deleteEvent(body) {
    const { associatedMembers, typeOfEvent } = body;

    const deletions = await associatedMembers.map((am) =>
      this.Models.event.destroy({
        where: {
          [Op.and]: [
            {
              memberId: {
                [Op.eq]: am,
              },
            },
            {
              typeOfEvent: {
                [Op.eq]: typeOfEvent,
              },
            },
          ],
        },
      })
    );

    return await Promise.all(deletions);
  }
}

module.exports = EventService;
