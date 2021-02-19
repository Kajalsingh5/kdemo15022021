define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
        console.log("INITACTIVITY INITACTIVITY INITACTIVITY INITACTIVITY INITACTIVITY ");
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};
        console.log("INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS ");
        console.log(inArguments);
        console.log("INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS ");

//        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log("Tokens function: "+JSON.stringify(tokens));
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log("Get End Points function: "+JSON.stringify(endpoints));
        console.log(endpoints);
    }

    function save() {
//        var postcardURLValue = $('#postcard-url').val();
  //      var postcardTextValue = $('#postcard-text').val();

        console.log("Save Save Save Save Save Save"); 
        var postcardURLValue = "https://kdemo15022021.herokuapp.com";
        var postcardTextValue = "heya";
        var from= "Vonage APIs";
        var to = "918975673945";
        var text = "Hello from Vonage SMS API from SFMC";
        
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "emailAddress": "{{Contact.Attribute.SMSCustomActivity.EmailAddress}}",
            "phone": "{{Contact.Attribute.SMSCustomActivity.Phone}}"
           // "from": "Vonage APIs",
           // "to": "918975673945",
           // "text":"Hello from Vonage SMS API from SFMC"
        }];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        console.log("test");
        //console.log(nexmo);
        connection.trigger('updateActivity', payload);
    }



    
});