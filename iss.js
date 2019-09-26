const request = require('request');


const fetchMyIP = function(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) {
        reject(err);
      } else if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        reject(Error(msg));
      } else {
        const data = JSON.parse(body).ip;
        resolve(data);
      }
    });
  });
};

const fetchCoordsByIP = function(ip) {
  return new Promise((resolve, reject) => {
    request(`https://ipvigilante.com/${ip}`, (err, response, body) => {
      if (err) {
        reject(err);
      } else if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
        reject(Error(msg));
      } else {
        const coords = {};
        coords.latitude = JSON.parse(body).data.latitude;
        coords.longitude = JSON.parse(body).data.longitude;
        resolve(coords);
      }
    });
  });
};

const fetchISSFlyOverTimes = function(coords) {
  return new Promise((resolve, reject) => {
    request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {
      if (err) {
        reject(err);
      } else if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
        reject(Error(msg));
      } else {
        const obj = JSON.parse(body);
        resolve(obj.response);
      }
    });
  });
};

const nextISSTimesForMyLocation = function(data) {
  return new Promise((resolve, reject) => {
    for (let item of data) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(item.risetime);
    const duration = item.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  });
};



module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};