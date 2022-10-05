const { events } = require('../../models');

const EventsService = require('../services/events.service');

const eventsService = new EventsService();

const getEvent = async (req, res) => {
  events
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
};

const createEvent = async (req, res) => {
  const events = await eventsService.createEvent(req.body);

  // Multiple events possibly created, only send back the event
  // that belongs to the member who created it
  const ownerEvent = events?.find(
    (event) => event.memberId === req.body.memberId
  );

  return res.status(200).send(ownerEvent);
};

const updateEvent = async (req, res) => {
  await eventsService.updateEvent(req.body);

  return res.status(200).send(true);
};

const deleteEvent = async (req, res) => {
  await eventsService.deleteEvent(req.body);

  return res.status(200).send(true);
};

module.exports = {
  // viewMemberEvents,
  getEvent,
  updateEvent,
  createEvent,
  deleteEvent,
};
