const mongoose = require("mongoose");
const Model = mongoose.model("trips");
const User = mongoose.model("users");


const getUser = async (req, res, callback) => {
  if (req.payload && req.payload.email) {
    try {
      const user = await User.findOne({ email: req.payload.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Proceed with the callback, passing the user's name or any other needed info
      callback(req, res, user.name);
    } catch (err) {
      console.error(err);
      return res.status(404).json(err);
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

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

const addTrip = (req, res) => {
  getUser(req, res, async (req, res, userName) => {
    try {
      const newTrip = new Model(req.body);
      await newTrip.save();
      res.status(201).json(newTrip);
    } catch (error) {
      console.error("Error adding trip:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};


const updateTrip = (req, res) => {
  getUser(req, res, async (req, res, userName) => {
    try {
      const updatedTrip = await Model.findOneAndUpdate(
        { code: req.params.tripCode },
        req.body,
        { new: true }
      );
      if (!updatedTrip) {
        return res.status(404).json({ message: `No trip found for code: ${req.params.tripCode}` });
      }
      res.status(200).json(updatedTrip);
    } catch (error) {
      console.error("Error updating trip:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};




module.exports = {
  tripsList,
  tripsFindCode,
  addTrip,
  updateTrip,
};