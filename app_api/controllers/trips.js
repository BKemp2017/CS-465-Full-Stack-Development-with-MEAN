const mongoose = require("mongoose");
const Model = mongoose.model("trips");

const tripsList = async (req, res) => {
  try {
    const trips = await Model.find({}).exec({ 
      bufferCommands: false, // Disable command buffering
      bufferTimeoutMS: 0,    // Set buffer timeout to 0 for no timeout
    });
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "trips not found" });
    } else {
      return res.status(200).json(trips);
    }
  } catch (err) {
    console.error("Error fetching trips:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const tripsFindCode = async (req, res) => {
  try {
    const trip = await Model.findOne({ code: req.params.tripCode }).exec({ 
      bufferCommands: false, // Disable command buffering
      bufferTimeoutMS: 0,    // Set buffer timeout to 0 for no timeout
    });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    return res.status(200).json(trip);
  } catch (error) {
    console.error("Error finding trip:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  tripsList,
  tripsFindCode,
};
