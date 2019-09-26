const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

const url = 'https://api.ipify.org?format=json';

let p1 = fetchMyIP(url);


p1.
  then((ip) => {
    console.log('This is the IP', ip);
    let p2 = fetchCoordsByIP(ip);
    p2.then((coords) => {
      console.log('Here are the coords:', coords);
      let p3 = fetchISSFlyOverTimes(coords);
      p3.then((msg) => {
        console.log('Here are the times:', msg);
        let p4 = nextISSTimesForMyLocation(msg);
        p4.then((passTimes) => {
          console.log('Here are the next passTimes:', passTimes);
        })
        .catch((err) => {
          console.log('Error with the next passTimes:', err);
        });
      })
      .catch((err) => {
        console.log('Error getting fly over times:', err);
      });
    })
    .catch((err) => {
      console.log('Error with coords:', err);
    });
  })
  .catch((err) => {
    console.log('Error with IP:', err);
  });

