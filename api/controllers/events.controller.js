const { events } = require("../../models");

const EventsService = require("../services/events.service");
const eventsService = new EventsService();

const getEvent = async (req, res, next) => {
  events
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => console.log(err));
};

const updateEvent = async (req, res, next) => {
  // req.body contains `event` and `member`
  const memberPromise = events.update(req.body.event, {
    where: {
      id: req.params.id,
    },
  });

  // Only update spouse record for marriage and divorce
  if (
    req.body.event.typeOfEvent === "1" ||
    req.body.event.typeOfEvent === "2"
  ) {
    // just return memberPromise
    return (
      memberPromise
        .then(() => {
          return res.sendStatus(200);
        })
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
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => console.log(err));
};

const createEvent = async (req, res, next) => {
  const event = await eventsService.createEvent(req.body);

  // only add spouse event for marriage and divorce
  const { typeOfEvent, spouseId } = req.body;
  if ((typeOfEvent === "1" || typeOfEvent === "2") && spouseId) {
    await eventsService.createEvent({
      ...req.body,
      memberId: req.body.spouseId,
    });

    return res.status(200).send(event);
  } else {
    return res.status(200).send(event);
  }
};

// This is our DELETE route/method
const deleteEvent = async (req, res, next) => {
  const memberPromise = events.destroy({
    where: {
      id: req.body.eventId,
    },
  });

  // only delete spouse event for marriage and divorce
  if (
    req.body.typeOfEvent === "1" ||
    req.body.typeOfEvent === "2" ||
    !req.body.spouseId
  ) {
    // just return memberPromise
    return (
      memberPromise
        .then(() => {
          return res.sendStatus(200);
        })
        // todo: how to send message also??
        .catch(() => res.sendStatus(500))
    );
  }

  const spousePromise = events.destroy({
    where: {
      [Op.and]: [
        {
          memberId: {
            [Op.eq]: req.body.spouseId,
          },
        },
        {
          typeOfEvent: {
            [Op.eq]: req.body.typeOfEvent,
          },
        },
      ],
    },
  });

  Promise.all([memberPromise, spousePromise])
    .then((promises) => {
      // return one of the created events
      return res.send(promises[0]);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  // viewMemberEvents,
  getEvent,
  updateEvent,
  createEvent,
  deleteEvent,
};
