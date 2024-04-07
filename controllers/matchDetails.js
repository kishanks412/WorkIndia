const match = require("../model/match").match;
const playerModel = require("../model/model").playerModel;
const matchModel = require("../model/model").matchModel;

const team_id = {
  "India": 1,
  "Australia": 2,
  "South Africa": 5,
  "New Zealand": 4,
  "West Indies": 3,
  "Bangladesh": 6,
  "Pakistan": 7,
  "Afghanistan": 8,
  "Zimbabwe": 9,
  "Sri Lanka": 10,
  "EngLand": 11,
  "Netherland": 12,
  "Scotland": 13,
};

function checkMatchStatus(matchDateStr) {
    const matchDate = new Date(matchDateStr);
    const currentDate = new Date();
  
    if (matchDate < currentDate) {
      return "Completed";
    } else if (matchDate.getDate() === currentDate.getDate()) {
      return "Ongoing";
    } else {
      return "Upcoming";
    }
  }

exports.getMatchDetails = async (req, res) => {

  const { match_id } = req.params;

  // Validating match_id to ensure it's a positive integer
  if (!match_id || isNaN(parseInt(match_id)) || parseInt(match_id) <= 0) {
    return res.status(400).json({ error: "Invalid match ID" });
  }

  try {
    // fetched match details from the match table
    const matchData = await matchModel.findOne({
      where: { match_id },
      attributes: ["match_id", "team1", "team2", "date", "venue"],
      raw: true,
    });

    // checking match details
    if (!matchData) {
      return res.status(401).json({ error: "Match Details not found" });
    }

    // finding team code for both teams throgh team name
    const team1Code = team_id[matchData.team1];
    const team2Code = team_id[matchData.team2];
    
    // fetching squad for both the teams
    const squad1 = await playerModel.findAll({
      where: { team_id: team1Code },
      attributes: ["player_id", "name"],
      raw: true,
    });

    const squad2 = await playerModel.findAll({
      where: { team_id: team2Code },
      attributes: ["player_id", "name"],
      raw: true,
    });

    // checking match status whether it is completed, ongoing, upcoming by the current date
    const matchStatus = checkMatchStatus(matchData.date)

    const squads = {
      team_1: squad1,
      team_2: squad2,
    };

    // Combining all information into final output format
    const matchDetails = {
      match_id: matchData.match_id,
      team_1: matchData.team1,
      team_2: matchData.team2,
      date: matchData.date,
      venue: matchData.venue,
      status: matchStatus,
      squads: squads,
    };

    // console.dir(matchDetails, { depth: null })

    res.status(200).json({ matchDetails });
  } catch (error) {
    console.error("Match Details error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
