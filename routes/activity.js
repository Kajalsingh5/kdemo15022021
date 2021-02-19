'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');
//const Nexmo = require('nexmo');
//var axios = require('axios');
const Vonage = require('@vonage/server-sdk');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

    console.log("For Execute");	
    console.log("Executed: "+req);
    console.log("Executed: "+Object.keys(req.body));
    

    var requestBody = req.body.inArguments[0];

    const vonage = new Vonage({
        apiKey: '6196963b',
        apiSecret: 'H4VlS9fWBlDnuOzN'
      })

      let text = "Hello from Nexmo SFMC";

      vonage.message.sendSms("Nexmo", "918975673945", text, {
        type: "unicode"
      }, (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
          } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
          }
        }
      })

    /*const nexmo = new Nexmo({
        apiKey: '6196963b',
        apiSecret: 'H4VlS9fWBlDnuOzN',
      });
    const from = 'Vonage APIs';
    const to = '918975673945';
    const text = 'Hello from Vonage SMS API from SFMC';

    nexmo.message.sendSms(from, to, text);
    */

    /*const nexmo = new Nexmo({
        apiKey: '6196963b',
        apiSecret: 'H4VlS9fWBlDnuOzN',
      });
    var from = requestBody.from;
    var to = requestBody.to;
    var text = requestBody.text;
    */

    // example on how to decode JWT
    /*JWT(req.body, process.env.jwtSecret, (err, decoded) => {

        // verification error -> unauthorized request
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
            // decoded in arguments
            var decodedArgs = decoded.inArguments[0];
            
            logData(req);
            nexmo.message.sendSms(from, to, text);
            res.send(200, 'Execute');
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });

    */

//new code 19th feb 2021
console.log('new code 19th feb 2021');
console.log('email----------');
var emailAddress=requestBody.emailAddress;
console.log(emailAddress);

/*
const nexmo = new Nexmo({
    apiKey: '6196963b',
    apiSecret: 'H4VlS9fWBlDnuOzN',
  });

const from = 'Vonage APIs';
const to = '918975673945';
const text = 'Hello from Vonage SMS API SFMC';

console.log("nexmo-------");
console.log(nexmo);

console.log("from-------");
console.log(from);

console.log("to-------");
console.log(to);

console.log("text-------");
console.log(text);

nexmo.message.sendSms(from, to, text);
*/

/*let data = {
    "api_key": "6196963b",
    "api_secret": "H4VlS9fWBlDnuOzN",
    "from": "Vonage APIs",
    "to": "918975673945",
    "text": "Hello from Vonage SMS API"
 };*/
/*
 axios({
    method: 'post',
    url: "https://rest.nexmo.com/sms/json",
    data:  {
        "api_key": "6196963b",
        "api_secret": "H4VlS9fWBlDnuOzN",
        "from": "Vonage APIs",
        "to": "918975673945",
        "text": "Hello from Vonage SMS API"
     },
    headers: {'Content-Type': 'application/json'}
  }).then( (res) => {
      console.log("Success -->" , res);
  } )
  .catch( (error) => {
      console.log("Erro --> ", error);
  } );*/


  axios.post('https://rest.nexmo.com/sms/json', {
    api_key: "6196963b",
    api_secret: "H4VlS9fWBlDnuOzN",
    from: "Vonage APIs",
    to: "918975673945",
    text: "Hello from Vonage SMS API SFMC"
 }).then( 
    (response) => { 
        var result = response.data; 
        console.log("Success -->");
        console.log(result); 
    }, 
    (error) => { 
        console.log("error -->");
        console.log(error); 
    } 
); 

//logData(req);
//res.send(200, 'Execute');

};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};