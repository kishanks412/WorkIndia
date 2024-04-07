const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const matchModel = require('../model/model').matchModel;
const moment = require('moment');

exports.createMatch = async(req,res) =>{
    
  const { team_1, team_2, date, venue } = req.body;

  try {

    // Checking if all required fields are provided or not
    if (!team_1 || !team_2 || !date || !venue) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate date format
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
      return res.status(400).json({ error: "Invalid date format. Date should be in YYYY-MM-DD format" });
    }
    
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