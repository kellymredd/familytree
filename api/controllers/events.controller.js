const {
  events,
  Sequelize: { Op },
} = require("../../models");

const viewMemberEvents = async (req, res, next) => {
  events
    .findAll({
      where: {
        memberId: req.params.id,
      },
    })
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => console.log(err));
};

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

  // Only update the spouse record
  const { id, ...rest } = req.body.event;
  const spousePromise = req.body.member.spouseId
    ? events.update(
        { ...rest, memberId: req.body.member.spouseId },
        {
          where: {
            [Op.and]: [
              {
                memberId: {
                  [Op.eq]: req.body.member.spouseId,
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
      // NOTE: Return value isn't useful and we'd need to do a new query
      // to get updated row so since we aren't versioning anything
      // let's just return 200 and the UI will use the updated form values
      return res.sendStatus(200);
    })
    .catch((err) => console.log(err));
};

const createEvent = async (req, res, next) => {
  const memberPromise = events.create(req.body.event);
  const spousePromise = req.body.member.spouseId
    ? events.create({
        ...req.body.event,
        memberId: req.body.member.spouseId,
      })
    : Promise.resolve();

  Promise.all([memberPromise, spousePromise])
    .then((promises) => {
      // return one of the created events
      return res.send(promises[0]);
    })
    .catch((err) => console.log(err));
};

// This is our DELETE route/method
const deleteEvent = async (req, res, next) => {
  // req.body contains `event` and `member`
  const memberPromise = events.destroy({
    where: {
      id: req.body.eventId,
    },
  });

  // Only update the spouse record
  const spousePromise = req.body.member.spouseId
    ? events.destroy({
        where: {
          [Op.and]: [
            {
              memberId: {
                [Op.eq]: req.body.member.spouseId,
              },
            },
            {
              typeOfEvent: {
                [Op.eq]: req.body.event.typeOfEvent,
              },
            },
          ],
        },
      })
    : Promise.resolve();

  Promise.all([memberPromise, spousePromise])
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  viewMemberEvents,
  getEvent,
  updateEvent,
  createEvent,
  deleteEvent,
};
