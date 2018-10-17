var express = require('express');
var router = express.Router();
const spawn = require('child_process').spawn;

let runPy = new Promise(function(success, nosuccess) {
  // -- specify function names, arguments in array;
  const pyprog = spawn('python', ['./python_scripts/test.py']);

  pyprog.stdout.on('data', res => {
    success(res.toString());
  });

  pyprog.stderr.on('data', err => {
    nosuccess(err.toString());
  });
});

router.get('/', (req, res, next) => {
  runPy
    .then(data => {
      return res.status(200).json({
        message: data,
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
