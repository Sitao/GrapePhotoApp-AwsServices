var formatter = require('resultFormatter.js');

var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var table = 'Photo';

exports.handler = (event, context, callback) => {
    var params = {
        TableName: table,
        Key:{
            "PhotoId": event.photoid
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            callback(null, formatter.getReultError("Unable to read item. " + err));
        } else {
            callback(null, formatter.getResultSingle(data));
            //callback(null, JSON.stringify(data, null, 2));
        }
    });
};