const request = require('request');
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

const apiOptions = {
    server: "http://localhost:3000"
};

/* GET travel list */
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    console.info(`>> travelList calling ${requestOptions.url}`);

    request(
        requestOptions,
        (err, response, body) => {
            if (err) {
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    );
};

const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = title['1']['title']; 

    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in database';
        }
    }
    res.render('travel', {
        title: pageTitle,
        trips: responseBody,
        message
    });
};

module.exports = {
    travelList
};

module.exports = {
    travelList
};
