const { Op } = require('sequelize');
const Models = require('../../models');

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

  async updateEvent(event) {
    try {
      const data = await this.Models.event.update(
        {
          city: event.city,
          country: event.country,
          county: event.county,
          stateProvince: event.stateProvince,
          typeOfEvent: event.typeOfEvent,
          dateOfEvent: event.dateOfEvent,
        },
        {
          where: { id: event.id },
        }
      );

      return data;
    } catch (error) {
      return error;
    }
  }

  async updateEvents(event) {
    try {
      const { associatedMembers } = event;

      const events = await associatedMembers.map((am) =>
        this.Models.event.update(
          {
            city: event.city,
            country: event.country,
            county: event.county,
            stateProvince: event.stateProvince,
            typeOfEvent: event.typeOfEvent,
            dateOfEvent: event.dateOfEvent,
          },
          {
            where: { typeOfEvent: event.typeOfEvent, memberId: am },
          }
        )
      );

      return Promise.all(events);
    } catch (error) {
      return error;
    }
  }

  async deleteEvent(event) {
    const deletions = await this.Models.event.destroy({
      where: { id: event.eventId },
    });

    return deletions;
  }

  async deleteEvents(event) {
    const { associatedMembers, typeOfEvent } = event;

    // we only have the eventId of the contextmember so we
    // jump through some hoops to get all related events deleted
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
