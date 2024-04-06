const { matchModel } = require("../model/model");


exports.getAllMAtches = async (req, res) => {
    try {
      const allMatches = await matchModel.findAll();
  
      const formattedMatches = allMatches.map(match => ({
        match_id: match.match_id,
        team_1: match.team1,
        team_2: match.team2,
        date: match.date,
        venue: match.venue
      }));
  
      return res.status(200).json({ matches: formattedMatches });
    } catch (error) {
      console.error("Error fetching matches:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }