const express = require("express");
const { events } = require("../../models");
const eventRouter = express.Router();

eventRouter.get("/events", async (req, res, next) => {
  events
    .findAll()
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => console.log(err));
});

eventRouter.get("/event/:id", async (req, res, next) => {
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
});

eventRouter.put("/event/:id", async (req, res, next) => {
  events
    .update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => console.log(err));
});

eventRouter.post("/event", async (req, res, next) => {
  events
    .create(req.body)
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => console.log(err));
});

module.exports = eventRouter;
