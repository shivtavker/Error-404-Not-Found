var express = require('express');
var router = express.Router();
var request = require('request');
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

  var url = `https://api.darksky.net/forecast/9191d936fc03d4c50faebb90012b5400/${location}?exclude=currently,minutely,hourly,flags`;
  request(url, { json: true }, (err, apiRes, body) => {
    if (err) {
      return res.status(500).json({
        err: err,
      });
    }
    return res.status(200).json(body);
  });
});

module.exports = router;
