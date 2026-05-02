
const express = require("express");
const router = express.Router();
const { getAllTrips } = require("../controllers/tripsController");

router.get("/", getAllTrips); // GET /api/trips

module.exports = router;