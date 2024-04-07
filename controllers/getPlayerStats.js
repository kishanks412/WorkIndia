const playerModel = require("../model/model").playerModel;

exports.playerStats = async (req, res) => {
  const { player_id } = req.params;

  // Validating player_id to ensure it's a positive integer
  if (!player_id || isNaN(parseInt(player_id)) || parseInt(player_id) <= 0) {
    return res.status(400).json({ error: "Invalid player ID" });
  }

  try {
    // console.log(player_id);
    const playerDetails = await playerModel.findOne({
      where: { player_id },
      attributes:["player_id","name", "matches_played","runs","average","strike_rate"],
      raw: true,
    });
    if (!playerDetails) {
      return res.status(401).json({ error: "Player not found" });
    }

    // console.log(player_id);
    res.status(200).json(playerDetails);
  } catch (error) {
    // console.error("Database error:", error);
    return res.status(500).json({ error: "Error in giving player stat" });
  }
};
