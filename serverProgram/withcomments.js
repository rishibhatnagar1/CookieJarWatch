var express = require('express'), // Express node module, Helps to write GET and POST calls in a easy way.
    bodyParser = require('body-parser') // body parser module , Required for parsing POST request Payload.
var curValue = "none"; // Shared Variable used to share data between GET and POST Request. Not ideal. Should use a DB.

var app = express(); // Init express.
app.use(bodyParser.urlencoded({
    extended: true
})); // Make the express object use body-parser module, so as to be able to handle url encoded POST requests.

// Add app.use(bodyPArser.json()) for handling POST requests with application/json as cntent-type.

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // Allow cross rigin requests, as the client and server arenot on the same domain.

app.post('/', function (req, res) {

  console.log(req.body.value);
  curValue = req.body.value;
  res.json("Got Request");

})// Code to handle POST request on path '/'. read the Payload "value" and set it to curValue.

app.get('/', function (req, res) {

  if(curValue != "none"){
  res.send(curValue);
  curValue = "none";
}
else
{
res.send("none");
}
}) // Code to handle get Request. Return the curValue if nt none. else return none.

app.use(bodyParser.json()); // or handling POST requests with application/json as content-type.
//app.use(connect.bodyParser({strict: false}));
var server = app.listen(3000, function () { //  Start the server on port 3000.

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port) // Fo displaing which port server is running on.

})