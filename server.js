var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('test', ['userlist', 'messageslist']);

var bodyParser = require('body-parser');

var http = require('http').Server(app);
var io = require('socket.io')(http);








app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




app.post('/api/users/GetByUsername', function(req, res) {
	//console.log("GetByUsername")
	//console.log(req.body.username);
	if (req.body.username) {
 		//console.log("GetByUsername find username: " + req.body.username)
         db.userlist.find({ username: req.body.username }, function (err, docs) {
         	//console.log(JSON.stringify(docs));
             res.json(docs);
         });
     }
});


app.post('/api/users/update', function(req, res) {
	//console.log("update")
	//console.log(req.body.user.username);
	var user = req.body.user;
	if (user) {
        db.userlist.update({'username': user.username }, 
        				 {
        				 	"id":user.id,
				 			"username": user.username,
				 			"password": user.password,
				 			"firstname": user.firstname,
				 			"lastname": user.lastname,
				 			"email" : user.email,
				 			"phone": user.phone,
				 			"location": user.location,
				 			"avatar": user.avatar
        				 }, function (err, docs) {
         	console.log(JSON.stringify(docs));
             res.json(docs);
         });
     }
});


app.post('/api/users/create', function(req, res) {
	console.log("create");
	var user = req.body.user;
	if (user) {
		db.userlist.find({}, function(err, docs) {
			var length = docs.length;
		})
		db.userlist.find({ username: user.username}, function (err, docs) {
         	if(docs.length == 0) {
         		        db.userlist.insert({
				 			"username": user.username,
				 			"password": user.password,
				 			"firstname": user.firstname,
				 			"lastname": user.lastname,
				 			"email" : user.email,
				 			"phone": user.phone,
				 			"location": user.location,
				 			"avatar": user.avatar
		        }, function (err, docs) {
		         	console.log(JSON.stringify(docs));
		         	if(err) {
		         		res.json({success: false});
		         	} else {
		         		res.json({success: true });
		         	}
		        });
         	} else {
         		res.json({success: false, message: 'Username "' + user.username + '" is already taken' });
         	}
        })
     }
});



app.post('/api/messages/getAll', function(req, res) {
    db.messageslist.find({}, function (err, docs) {
    	//console.log(JSON.stringify(docs));
    	res.json(docs);
    });
});


app.post('/api/messages/insertMessage', function(req, res) {
	var message = req.body;
	if (message) {
		db.messageslist.insert(message, function (err, docs) {
			res.json(docs);
		});     	
     }
});


app.post('/api/messages/getMessageById', function(req, res) {
	var id = parseInt(req.body.id);
	if (id) {
         db.messageslist.find({id:id}, function (err, docs) {
         	//console.log(docs);
         	//console.log("return value = " + JSON.stringify(docs));
            res.json(docs);
         });
     }
});


app.post('/api/messages/deleteMessageById', function(req, res) {
	//console.log("delete message");
	var id = parseInt(req.body.id);
	if (req.body.id) {
 		//console.log("GetByUsername find username: " + req.body.username)
         db.messageslist.remove({id:id}, function (err, docs) {
         	//console.log("return value = " + JSON.stringify(docs));
             res.json(docs);
         });
     }
});



app.post('/api/messages/updateMessage', function(req, res) {
	//console.log("update")

	//console.log(req.body.user.username);
	var message = req.body;
	//console.log("update" + message);
	if (message) {
		//console.log("update" + message);
        db.messageslist.update({'id': message.id }, 
        				 {
        				 	"id":message.id,
				 			"recipient": message.recipient,
				 			"recipient_img": message.recipient_img,
				 			"sender": message.sender,
				 			"sender_img": message.sender_img,
				 			"title" : message.title,
				 			"description": message.description,
				 			"created_at": message.created_at,
				 			"important": message.important,
				 			"comments": message.comments
        				 }, function (err, docs) {
             res.json(docs);
         });
     }
});



app.post('/api/messages/insertComment', function(req, res) {
	//console.log("add messages");
	var message = req.body;
	if (message) {
		db.messageslist.insert(message, function (err, docs) {
			res.json(docs);
		});     	
     }
});

io.on('connection', function(socket){
  console.log('a user connected');
});




app.listen(3000)
console.log("server running on port 3000");