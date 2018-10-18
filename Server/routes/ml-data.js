var express = require('express');
var router = express.Router();
var request = require('request');

function proc(jdata) {
	var alert="";
	if('alerts' in jdata)
	{
		alert = jdata.alerts;
	}
	var precipint = 0.0;	//max is 25
	var i;
	for(i=0;i<7;i++)
	{
		precipint+=jdata.daily.data[i].precipIntensityMax;
	}
	var flood = precipint>50;
	return {'alert':alert,'precipint':precipint,'flood':flood}
	
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
  var locations = [parseFloat(locs[0]).toString()+","+parseFloat(locs[1]).toString(),
  			(parseFloat(locs[0])+0.02).toString()+","+parseFloat(locs[1]).toString(), 
  			parseFloat(locs[0]).toString()+","+(parseFloat(locs[1])+0.02).toString(), 
  			(parseFloat(locs[0])-0.02).toString()+","+parseFloat(locs[1]).toString(), 
  			parseFloat(locs[0]).toString()+","+(parseFloat(locs[1])-0.02).toString(), 
  			(parseFloat(locs[0])+0.02).toString()+","+(parseFloat(locs[1])+0.02).toString(), 
  			(parseFloat(locs[0])+0.02).toString()+","+(parseFloat(locs[1])-0.02).toString(), 
  			(parseFloat(locs[0])-0.02).toString()+","+(parseFloat(locs[1])+0.02).toString(), 
  			(parseFloat(locs[0])-0.02).toString()+","+(parseFloat(locs[1])-0.02).toString()]; 			
  var i;
  var arr = []
  for(i=0;i<locations.length;i++)
  {
  	var url = `https://api.darksky.net/forecast/9191d936fc03d4c50faebb90012b5400/${locations[i]}?exclude=currently,minutely,hourly,flags`;
  	request(url, { json: true }, (err, apiRes, body) => {
    	if (err) {
      	return res.status(500).json({
        	err: err,
      	});
    	}
    	console.log(proc(body));
  	});
  }
  	return res.status(200).json('DONE');
  });


module.exports = router;
