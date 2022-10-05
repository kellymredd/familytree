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
/**
 *
 * delete this; a new method was created
 */
const updateEventw = async (req, res) => {
  // req.body contains `event` and `member`
  const memberPromise = events.update(req.body.event, {
    where: {
      id: req.params.id,
    },
  });

  // Only update spouse record for marriage and divorce
  if (
    req.body.event.typeOfEvent === '1' ||
    req.body.event.typeOfEvent === '2'
  ) {
    // just return memberPromise
    return (
      memberPromise
        .then(() => res.sendStatus(200))
        // how to send message also??
        .catch(() => res.sendStatus(500))
    );
  }

  // Only update the spouse record
  const { id, ...rest } = req.body.event;
  const spousePromise = req.body.spouseId
    ? events.update(
        { ...rest, memberId: req.body.spouseId },
        {
          where: {
            [Op.and]: [
              {
                memberId: {
                  [Op.eq]: req.body.spouseId,
                },
              },
              {
                typeOfEvent: {
                  [Op.eq]: req.body.event.typeOfEvent,
                },
              },
            ],
          },
        }
      )
    : Promise.resolve();

  Promise.all([memberPromise, spousePromise])
    .then(() => res.sendStatus(200))
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
  const events = await eventsService.updateEvent(req.body);

  // Multiple events possibly updated, only send back the event
  // that belongs to the member who updated it

  // do we need to send it back; optimistic updates the UI
  const ownerEvent = events?.find(
    (event) => event.memberId === req.body.memberId
  );

  return res.status(200).send(ownerEvent);
};

const deleteEvent = async (req, res) => {
  await eventsService.deleteEvent(req.body);

  return res.status(200); // .send(); // needed?
};

module.exports = {
  // viewMemberEvents,
  getEvent,
  updateEvent,
  createEvent,
  deleteEvent,
};
