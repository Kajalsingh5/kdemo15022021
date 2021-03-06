'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');
//const Nexmo = require('nexmo');
//var axios = require('axios');
//const Vonage = require('@vonage/server-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
//const socketio = require('socket.io');


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
    //res.send(200, 'Edit');
    res.status(200).send('Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    console.log( req.body );
    logData(req);
    //res.send(200, 'Save');
    res.status(200).send('Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

    console.log("For Execute");	
    
  
        //new code 19th feb 2021
console.log('new code 22nd feb 2021');
console.log('email----------');
//var emailAddress=requestBody.emailAddress;
//console.log(emailAddress);
JWT(req.body, process.env.jwtSecret, (err, decoded) => {
  if (err) {
    console.error(err);
    return res.status(401).end();
  }
  if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
    var decodedArgs = decoded.inArguments[0];
    console.log("inside jwt");
    logData(req);
    // do something
  }else {
    console.error('inArguments invalid.');
    return res.status(400).end();
  }
});




    
    console.log("Executed: "+Object.keys(req));

    var vals = Object.keys(req).map(function(key) {
      return req[key];
    });

    console.log("req.body: ");
    console.log(vals);
    
    /*
    console.log("req.body: ");
    console.log(Object.values(req.body));
    
    console.log("req.res: ");
    console.log(Object.values(req.res));
    
    console.log("req.params: ");
    console.log(Object.values(req.params));
    
    console.log("req.query: ");
    console.log(Object.values(req.query));
    
    console.log("req.complete: ");
    console.log(Object.values(req.complete));
    

    console.log("data view-----");
    
    var keys = Object.keys(req);
    for (var i = 0; i < keys.length; i++) {
      console.log("val---"+req[keys[i]]);
    }

*/
    //console.log("Executed entries: "+Object.entries(req));
    
    //Object.keys(req).forEach(e=>console.log(e+"="+req[e]));

    console.log("Executed---: "+Object.keys(req.body.inArguments[0]));
    
    //var requestBody = req.body.inArguments[0];

    
    // Init Nexmo
    const nexmo = new Nexmo({
      apiKey: '6196963b',
      apiSecret: 'H4VlS9fWBlDnuOzN'
    }, { debug: true });

    //const number='918975673945';
    //const text="heya SFMC -JB";

    const { number, text } = { number: '918975673945', text: 'heya SFMC -JB 20th' };

    nexmo.message.sendSms(
      '+918975673945', number, text, { type: 'unicode' },
      (err, responseData) => {
        if(err) {
          console.log(err);
        } else {
          const { messages } = responseData;
          const { ['message-id']: id, ['to']: number, ['error-text']: error  } = messages[0];
          console.dir(responseData);
         
        }
      }
    );    

    logData(req);
    res.status(200).send('Execute');

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
   /* JWT(req.body, process.env.jwtSecret, (err, decoded) => {

        // verification error -> unauthorized request
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
            // decoded in arguments
            var decodedArgs = decoded.inArguments[0];
            
            logData(req);
            //res.send(200, 'Execute');
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });

    
*/

};

/*
exports.post = function (req, res) {

  console.log("For Execute");	
  console.log("Executed: "+req);
  console.log("Executed: "+Object.keys(req.body));
  

  var requestBody = req.body.inArguments[0];  
  // Init Nexmo
  const nexmo = new Nexmo({
    apiKey: '6196963b',
    apiSecret: 'H4VlS9fWBlDnuOzN'
  }, { debug: true });

  const number='918975673945';
  const text="heya SFMC -JB";

  nexmo.message.sendSms(
    '918975673945', number, text, { type: 'unicode' },
    (err, responseData) => {
      if(err) {
        console.log(err);
      } else {
        const { messages } = responseData;
        //const { ['message-id']: id, ['to']: number, ['error-text']: error  } = messages[0];
        console.dir(responseData);
        // Get data from response
        
        // Emit to the client
       // io.emit('smsStatus', data);
      }
    }
  );    

  logData(req);
  res.send(200, 'Execute');

//new code 19th feb 2021
console.log('new code 19th feb 2021');
console.log('email----------');
var emailAddress=requestBody.emailAddress;
console.log(emailAddress);

};
*/

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    //res.send(200, 'Publish');
    res.status(200).send('Publish');

};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    //res.send(200, 'Validate');
    res.status(200).send('Validate');
};