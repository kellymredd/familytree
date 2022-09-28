const express = require('express');

const eventRouter = express.Router();
const eventsController = require('../controllers/events.controller');

// eventRouter.route("/events/:id").get(eventsController.viewMemberEvents);

eventRouter
  .route('/event/:id')
  .get(eventsController.getEvent)
  .put(eventsController.updateEvent);

eventRouter.route('/event').post(eventsController.createEvent);

// This is our DELETE route/method
eventRouter.route('/event/delete').post(eventsController.deleteEvent);

module.exports = eventRouter;
