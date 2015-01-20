var http = require('http'), 
    fs = require('fs'), //File system
    express = require('express'),// Using express module, makes writing POST and GET requests easier.
    bodyParser = require('body-parser')// Body parser requried for parsing POST request payload.
var cV = "none"; // Sahred variable used in post and get . For scaling up, use a Database.

var app = express(); // Initializing Express
app.use(bodyParser.urlencoded({
    extended: true
}));// Make the express object use body-parser module, so as to be able to handle url encoded POST requests.

// Add app.use(bodyPArser.json()) for handling POST requests with application/json as cntent-type.

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});  // Allow cross origin requests, as the client and server are not on the same domain.


app.post('/', function (req, res) { // Code to handle POST request on path '/'. read the Payload "value" and set it to curValue.
  console.log(req.body.value);
  cV = req.body.value;
  res.json("Got Request");
console.log("After Post : " + cV);
})

app.get('/', function (req, res) {// Handles all the get requests . 
console.log(cV)
  if(cV != "none"){ //Send the value if value is available ,else send none.
  res.send(cV);
  curValue = "none";
}
else
{
res.send("none");
}
})

app.use(bodyParser.json()); // For parsing throgh JSON.
//app.use(connect.bodyParser({strict: false}));
var server = app.listen(process.env.PORT || 3000, function () { // Listen at port created by the cloud or create a port to listen at in case of a local host.

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port) //Display the port be served on.

})
