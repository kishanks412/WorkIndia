const playerModel = require("../model/model").playerModel;

exports.createPlayer = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { name, role } = req.body;

    // Checking if all required fields are provided or not
    if (!name || !role) {
      return res
        .status(400)
        .json({ error: "Name and role are required fields" });
    }

    const newPlayer = await playerModel.create({
      name,
      role,
      team_id: team_id,
    });

    return res.status(201).json({
      message: "Player added to squad successfully",
      player_id: newPlayer.player_id,
    });
  } catch (error) {
    console.error("Error creating player:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
