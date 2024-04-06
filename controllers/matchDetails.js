const match = require("../model/match");

const playerModel = require("../model/model").playerModel;

const matchModel = require("../model/model").matchModel;

const team_id = {
  "United States": 1,
  China: 2,
  India: 5,
  Brazil: 4,
  Pakistan: 3,
  Nigeria: 6,
  Bangladesh: 7,
  Australia: 8,
  Mexico: 9,
  Japan: 10,
};

exports.getMatchDetails = async (req, res) => {
  const { match_id } = req.params;

  try {
    const matchData = await matchModel.findOne({
      where: { match_id },
      attributes: ["match_id", "team1", "team2", "date", "venue"],
      raw: true,
    });
    if (!matchData) {
      return res.status(401).json({ error: "Match Details not found" });
    }

    const team1Code = team_id[matchData.team1];
    const team2Code = team_id[matchData.team2];

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

    const matchDate = new Date(matchData.date);

    const currentDate = new Date();

    if (matchDate < currentDate) {
      matchStatus = "Completed";
    } else if (matchDate.getDate() === currentDate.getDate()) {
      matchStatus = "Ongoing";
    } else {
      matchStatus = "Upcoming";
    }

    const squads = {
      team_1: squad1,
      team_2: squad2,
    };

    // Combine all information into final output format
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
