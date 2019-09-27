const {
  getMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation } = require('./issPromised');

const url = 'https://api.ipify.org?format=json';

getMyIP(url)
.then(urlWithIp => {
 return fetchCoordsByIP(urlWithIp);
})
.then(urlWithPassTimes => {
  return fetchISSFlyOverTimes(urlWithPassTimes);
})
.then(nextPassTimes => {
  return nextISSTimesForMyLocation(nextPassTimes);
})
.catch(err => console.log(err, err.message));