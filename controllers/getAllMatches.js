const { matchModel } = require("../model/model");

exports.getAllMAtches = async (req, res) => {
  try {
    // taking all matches from the database
    const allMatches = await matchModel.findAll();

    // Checking if there are any matches found
    if (!allMatches || allMatches.length === 0) {
      return res.status(404).json({ error: "No matches found" });
    }

    // Formating matches for response
    const formattedMatches = allMatches.map((match) => ({
      match_id: match.match_id,
      team_1: match.team1,
      team_2: match.team2,
      date: match.date,
      venue: match.venue,
    }));

    return res.status(200).json({ matches: formattedMatches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
