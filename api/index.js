var express = require("express");
var { list, get, put, post } = require("./services/members");
var router = express.Router();

router.get("/members", async (req, res, next) => {
  try {
    const data = await list();
    res.json(data);
  } catch (err) {
    console.error(`Error while getting members `, err.message);
    next(err);
  }
});

router.get("/member/:id", async (req, res, next) => {
  try {
    const data = await get(req.params.id);
    res.json(data);
  } catch (err) {
    console.error(`Error while getting member `, err.message);
    next(err);
  }
});

router.put("/member/:id", async (req, res, next) => {
  try {
    const data = await put({ data: req.body });
    res.json(data);
  } catch (err) {
    console.error(`Error while putting member `, err.message);
    next(err);
  }
});

router.post("/member", async (req, res, next) => {
  try {
    const data = await post({ data: req.body });
    res.json(data);
  } catch (err) {
    console.error(`Error while posting member `, err.message);
    next(err);
  }
});

router.get("/member/:id/family", async (req, res, next) => {
  try {
    const data = await get(req.params.id);
    res.json(data);
  } catch (err) {
    console.error(`Error while getting member `, err.message);
    next(err);
  }
});

module.exports = router;
