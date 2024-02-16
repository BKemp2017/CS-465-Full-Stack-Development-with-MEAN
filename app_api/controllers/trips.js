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

const addTrip = async (req, res) => {
  try {
    const newTrip = new Model(req.body); // Assuming req.body contains trip data
    await newTrip.save();
    return res.status(201).json(newTrip);
  } catch (error) {
    console.error("Error adding trip:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateTrip = async (req, res) => {
  const tripCode = req.params.tripCode;
  const updatedTripData = req.body; // Assuming req.body contains updated trip data

  try {
    // Find the trip by code and update it with the new data
    const updatedTrip = await Model.findOneAndUpdate(
      { code: tripCode }, // Filter by trip code
      updatedTripData, // Updated trip data
      { new: true } // Return the updated trip after the update
    );

    if (!updatedTrip) {
      // If no trip is found for the given code, return 404 Not Found
      return res.status(404).json({ message: `No trip found for code: ${tripCode}` });
    }

    // If the trip is successfully updated, return it in the response
    return res.status(200).json(updatedTrip);
  } catch (error) {
    // If an error occurs during the update operation, return 500 Internal Server Error
    console.error("Error updating trip:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  tripsList,
  tripsFindCode,
  addTrip,
  updateTrip,
};