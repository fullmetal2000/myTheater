
//http server
var fs = require('fs');
var httpServer = require('http');
var path = require('path');
var connect = require('connect');
//mongo server
var mongoose = require('mongoose/');
var restify = require('restify');  

var config = require('./config');

// localhost

var httpPort = process.env.PORT || 8080;
var mongodbPort = 8888;

/* 
 
 see README.md for a more detailed write up 

*/

//////////////////////////////////////////////////////// HTTP - sends html/js/css to the browswer 

var sendHTML = function( filePath, contentType, response ){

  console.log('sendHTML: ' + filePath) ;

  path.exists(filePath, function( exists ) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
}

var getFilePath = function(url) {

  var filePath = './app' + url;
  if (url == '/' ) filePath = './app/index.html';

 // console.log("url: " + url)

  return filePath;
}

var getContentType = function(filePath) {
   
   var extname = path.extname(filePath);
   var contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    return contentType;
}

var onHtmlRequestHandler = function(request, response) {

 // console.log('onHtmlRequestHandler... request.url: ' + request.url) ;

  /*
   when this is live, nodjitsu only listens on 1 port(80) so the httpServer will hear it first but
   we need to pass the request to the mongodbServer
   */
  if ( process.env.PORT && url === '/messages') {
    
    // pass the request to mongodbServer


    return; 
  } 

    //remove ?_=12399... cause by calendar lib.
    var myurl = request.url;
    var idx = myurl.indexOf("?_=");
    if (idx!==-1)
    {
        myurl = myurl.substring(0,idx);
    }

  var filePath = getFilePath(myurl);
  var contentType = getContentType(filePath);

 // console.log('onHtmlRequestHandler... getting: ' + filePath) ;

  sendHTML(filePath, contentType, response);


}

var httpsvr = httpServer.createServer(onHtmlRequestHandler).listen(httpPort,function(){

    console.log("HTTP server listeninging at "+httpPort);

});


////////////////////////////////////////////////////// MONGODB - saves data in the database and posts data to the browser

var mongoURI = ( process.env.PORT ) ? config.creds.mongoose_auth_jitsu : config.creds.mongoose_auth_local;

db = mongoose.connect(mongoURI),
Schema = mongoose.Schema;  

var mongodbServer = restify.createServer({
    formatters: {
        'application/json': function(req, res, body){
            if(req.params.callback){
                var callbackFunctionName = req.params.callback.replace(/[^A-Za-z0-9_\.]/g, '');
                return callbackFunctionName + "(" + JSON.stringify(body) + ");";
            } else {
                return JSON.stringify(body);
            }
        },
        'text/html': function(req, res, body){
            return body;
        }
    }
});

mongodbServer.use(restify.bodyParser());

// Create a schema for our data
var MessageSchema = new Schema({
//  message: String,
//  date: Date
    title:String,
    desc:String,
    date:Date,
    len:String,
    start:String,
    end:String

  //  img:String
});

// Use the schema to register a model
mongoose.model('Message', MessageSchema); 
var MessageMongooseModel = mongoose.model('Message'); // just to emphasize this isn't a Backbone Model


/*

this approach was recommended to remove the CORS restrictions instead of adding them to each request
but its not working right now?! Something is wrong with adding it to mongodbServer

// Enable CORS
mongodbServer.all( '/*', function( req, res, next ) {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, OPTIONS' );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-File-Name, Content-Type, Cache-Control' );
  if( 'OPTIONS' == req.method ) {
  res.send( 203, 'OK' );
  }
  next();
});


*/
var getParameterByName=function(url,name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// This function is responsible for returning all entries for the Message model
var getMessages = function(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to mongodbServer our response to any origin
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, OPTIONS' );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-File-Name, Content-Type, Cache-Control' );
  
  if( 'OPTIONS' == req.method ) {
    res.send( 203, 'OK' );
  }
    var time_range = getParameterByName(req.url,"timerange");
  
  console.log("mongodbServer getMessages");
//console.log('url='+req.url);

    var startday;
    var endday;

    var curr,first,last;

    curr = new Date;

    if (time_range=='thisweek')
    {

        var start = 1; //0=sunday, 1=monday etc.
        var d = curr.getDay(); //get the current day
         startday = new Date(curr.valueOf() - (d<=0 ? 7-start:d-start)*86400000); //rewind to start day
         endday = new Date(startday.valueOf() + 6*86400000); //add 6 days to get last day
        console.log('startday:'+startday);
        console.log('endday:'+endday);
    }

    else if (time_range=='thismonth')
    {

         startday = new Date(curr.getFullYear()-10, 1, 1);
         endday = new Date(curr.getFullYear()+10, 12, 0);
        console.log('startday:'+startday);
        console.log('endday:'+endday);
    }
    else if (time_range=='today')
    {

         first = curr.getDate() ;
         last = first+1 ;

        startday = new Date(curr.setDate(first)).toUTCString();
        endday = new Date(curr.setDate(last)).toUTCString();
        console.log('startday:'+startday);
        console.log('endday:'+endday);
    }
    else
      return;


  MessageMongooseModel.find({date: {$gte: startday, $lte: endday}}).execFind(function (arr,data) {
    res.send(data);
  });


}

var postMessage = function(req, res, next) {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, OPTIONS' );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-File-Name, Content-Type, Cache-Control' );
  
  if( 'OPTIONS' == req.method ) {
    res.send( 203, 'OK' );
  }
  
  // Create a new message model, fill it up and save it to Mongodb
  var message = new MessageMongooseModel(); 
  
  console.log("mongodbServer postMessage1: " + req.params.title);
  console.log("mongodbServer postMessage2: " + req.params.desc);
  console.log("mongodbServer postMessage3: " + req.params.date);
  console.log("mongodbServer postMessage4: " + req.params.len);
  console.log("mongodbServer postMessage5: " + req.params.hour);
  console.log("mongodbServer postMessage5: " + req.params.min);

//  message.message = req.params.message;
//  message.date = new Date();
  message.date = new Date(req.params.date .split(' ').join('T'));
  message.title = req.params.title;
  message.desc = req.params.desc;
  message.len = req.params.len;
  message.start = message.date.getTime().toString();
  message.end = (message.date.getTime()+parseInt(message.len) *1000 ).toString();

    message.save(function () {
    res.send(req.body);
  });
}


var deleteMessage = function(req, res, next) {
    res.header( 'Access-Control-Allow-Origin', '*' );
    res.header( 'Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, OPTIONS' );
    res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-File-Name, Content-Type, Cache-Control' );

    if( 'OPTIONS' == req.method ) {
        res.send( 203, 'OK' );
    }

    // Create a new message model, fill it up and save it to Mongodb
    var message = new MessageMongooseModel();

    console.log("mongodbServer deleteMessage: " + req.params.id);

//    message._id = req.params.id;
//
//    message.remove(function () {
//        res.send(req.body);
//    });
    message.find({ id:req.params.id }).remove();
    console.log("delete");
}

mongodbServer.listen(mongodbPort, function() {
  
  var consoleMessage =''
  consoleMessage += '\n +++++++++++++++++++++++++++++++++++++++++++++++++++++' 
  consoleMessage += '\n\n %s says your mongodbServer is listening at %s';
  consoleMessage += '\n great! now open your browser to http://localhost:8080';
  consoleMessage += '\n it will connect to your httpServer to get your static files';
  consoleMessage += '\n and talk to your mongodbServer to get and post your messages. \n\n';
  consoleMessage += '+++++++++++++++++++++++++++++++++++++++++++++++++++++ \n\n'  
 
  console.log(consoleMessage, mongodbServer.name, mongodbServer.url);

});
//routes:
mongodbServer.get('/messages', getMessages);
mongodbServer.post('/messages', postMessage);
mongodbServer.del('/messages', deleteMessage);







