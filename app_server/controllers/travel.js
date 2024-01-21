const fs = require('fs');
const path = require('path');

// Absolute paths to the JSON data files
const tripsDataPath = path.join(__dirname, '../../data/trips.json');
const titleDataPath = path.join(__dirname, '../../data/title.json');

// Initialize variables to store data
let trips = [];
let title = { '1': { 'title': 'Default Title' } };

try {
    // Attempt to read and parse trips data
    const tripsData = fs.readFileSync(tripsDataPath, 'utf8');
    trips = JSON.parse(tripsData);
} catch (error) {
    // Handle errors while reading or parsing trips data
    console.error('Error reading or parsing trips data:', error);
}

try {
    // Attempt to read and parse title data
    const titleData = fs.readFileSync(titleDataPath, 'utf8');
    title = JSON.parse(titleData);
} catch (error) {
    // Handle errors while reading or parsing title data
    console.error('Error reading or parsing title data:', error);
}

/* GET travel view */
const travel = (req, res) => {
    // Get the page title from the title data
    const pageTitle = title['1']['title'];
    res.render('travel', {
        title: pageTitle,
        trips: trips,
    });
};

module.exports = { travel };

