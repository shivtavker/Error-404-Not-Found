const async = require('async');
var express = require('express');
var router = express.Router();
var request = require('request');

function proc(jdata) {
  var alert = '';
  if ('alerts' in jdata) {
    alert = jdata.alerts;
  }
  var precipint = 0.0; //max is 25
  var i;
  for (i = 0; i < 7; i++) {
    precipint += jdata.daily.data[i].precipIntensityMax;
  }
  var flood = precipint > 50;
  return {
    alert: alert,
    precipint: precipint,
    flood: flood,
    Lat: jdata.latitude,
    Lng: jdata.longitude,
  };
}

function httpGet(url, callback) {
  const options = {
    url: url,
    json: true,
  };
  request(options, (err, apiRes, body) => {
    callback(err, proc(body));
  });
}

// const spawn = require('child_process').spawn;

// let runPy = new Promise(function(success, nosuccess) {
// ------- specify function names, arguments in array--------
//   const pyprog = spawn('python', ['./python_scripts/test.py']);

//   pyprog.stdout.on('data', res => {
//     success(res.toString());
//   });

//   pyprog.stderr.on('data', err => {
//     nosuccess(err.toString());
//   });
// });

router.get('/', (req, res, next) => {
  // runPy
  //   .then(data => {
  //     return res.status(200).json({
  //       message: data,
  //     });
  //   })
  //   .catch(err => {
  //     return res.status(500).json({
  //       error: err,
  //     });
  //   });
  var location = req.query['location'];
  if (!location) {
    return res.status(400).json({
      err: 'Please Specify a Location',
    });
  }
  var locs = location.split(',');
  var locations = [
    parseFloat(locs[0]).toString() + ',' + parseFloat(locs[1]).toString(),
    (parseFloat(locs[0]) + 0.02).toString() +
      ',' +
      parseFloat(locs[1]).toString(),
    parseFloat(locs[0]).toString() +
      ',' +
      (parseFloat(locs[1]) + 0.02).toString(),
    (parseFloat(locs[0]) - 0.02).toString() +
      ',' +
      parseFloat(locs[1]).toString(),
    parseFloat(locs[0]).toString() +
      ',' +
      (parseFloat(locs[1]) - 0.02).toString(),
    (parseFloat(locs[0]) + 0.02).toString() +
      ',' +
      (parseFloat(locs[1]) + 0.02).toString(),
    (parseFloat(locs[0]) + 0.02).toString() +
      ',' +
      (parseFloat(locs[1]) - 0.02).toString(),
    (parseFloat(locs[0]) - 0.02).toString() +
      ',' +
      (parseFloat(locs[1]) + 0.02).toString(),
    (parseFloat(locs[0]) - 0.02).toString() +
      ',' +
      (parseFloat(locs[1]) - 0.02).toString(),
  ];
  var urls = [];
  for (var i = 0; i < locations.length; i++) {
    var url = `https://api.darksky.net/forecast/9191d936fc03d4c50faebb90012b5400/${locations[
      i
    ]}?exclude=currently,minutely,hourly,flags`;
    urls.push(url);
  }

  async.map(urls, httpGet, (err, body) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    return res.status(200).json(body);
  });
});

module.exports = router;
