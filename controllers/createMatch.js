const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const matchModel = require('../model/model').matchModel;

exports.createMatch = async(req,res) =>{
    
  const { team_1, team_2, date, venue } = req.body;

  try {
    
    const newMatch = await matchModel.create({
      team1: team_1,
      team2: team_2,
      date: date,
      venue: venue,
    });

    return res.status(200).json({ message: "Match created successfully", match_id: newMatch.match_id });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}