const express = require("express")
const router = express.Router();

const { signup, login } = require('../controllers/auth');
const { createMatch } = require("../controllers/createMatch");
const { verifyToken } = require("../middleware/auth");
const { getAllMAtches } = require("../controllers/getAllMatches");
const { createPlayer } = require("../controllers/creratePlayer");
const { getMatchDetails } = require("../controllers/matchDetails");
const { playerStats } = require("../controllers/getPlayerStats");


router.post("/admin/signup",signup);
router.post("/admin/login",login);
router.post("/matches",verifyToken,createMatch);
router.get("/matches",getAllMAtches)
router.get("/matches/:match_id",getMatchDetails)
router.post("/teams/:team_id/squad",verifyToken,createPlayer)
router.get("/players/:player_id/stats",verifyToken,playerStats)

module.exports = router;