var mongojs = require('mongojs');
var db = mongojs('test', ['userlist', 'messageslist']);

var bodyParser = require('body-parser');



app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


function(req, res) {
	console.log("GetByUsername")
	console.log(req.body.username);
	if (req.body.username) {
 		//console.log("GetByUsername find username: " + req.body.username)
         db.userlist.find({ username: req.body.username }, function (err, docs) {
         	console.log(JSON.stringify(docs));
             res.json(docs);
         });
     }
});