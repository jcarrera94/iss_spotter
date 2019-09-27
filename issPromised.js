const request = require('request-promise-native');

const getMyIP = function(url){
  return request(url)
    .then(body => {
      const ip = JSON.parse(body).ip;
      const urlWithIP = `https://ipvigilante.com/${ip}`;
      return urlWithIP;
    })
};

const fetchCoordsByIP = function(urlWithIP) {
  return request(urlWithIP)
    .then((coords) => {
      const coordsObj = {};
      coordsObj.latitude = JSON.parse(coords).data.latitude;
      coordsObj.longitude = JSON.parse(coords).data.longitude;
      urlWithCoords = `http://api.open-notify.org/iss-pass.json?lat=${coordsObj.latitude}&lon=${coordsObj.longitude}`;
      return urlWithCoords;
    })
};

const fetchISSFlyOverTimes = function(urlWithData) {
  return request(urlWithData)
    .then(passTimesInfo => {
    const nextPassTimes = JSON.parse(passTimesInfo).response;
    return nextPassTimes;
  })
};

const nextISSTimesForMyLocation = function(passTimes) {
  let mapped = passTimes.map(each => {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(each.risetime);
    const duration = each.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }); 
  return mapped;
};

module.exports = {
  getMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
}