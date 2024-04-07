const playerModel = require("../model/model").playerModel;

exports.playerStats = async (req, res) => {
  const { player_id } = req.params;
  try {
    // console.log(player_id);
    const playerDetails = await playerModel.findOne({
      where: { player_id },
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
