var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('104.131.46.241', 27017, {auto_reconnect: true});
db = new Db('boolsdb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'boolsdb' database");
        db.collection('questions', {strict:true}, function(err, collection) {

            if (err) {
                console.log("The 'questions' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

/*
RESTFUL API HEREEE
*/
exports.findAll = function(req, res) {
    db.collection('questions', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving question: ' + id);
    db.collection('questions', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.addQuestion = function(req, res) {
    var question = req.body;
    console.log('Adding question: ' + JSON.stringify(question));
    db.collection('questions', function(err, collection) {
        collection.insert(question, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.deleteQuestion = function(req, res) {
    var id = req.params.id;
    console.log('Deleting question: ' + id);
    db.collection('questions', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

exports.addVote = function(req, res) {
    var id = req.params.id;
    var user = req.user;
    var answer = req.body;
    var location = "answers."+user._id
    console.log("voting answer "+answer.answer+" for "+id);
    db.collection('questions', function(err, collection) {
        collection.update({ '_id': new BSON.ObjectID(id) }, {$set:{location:answer.answer}});
    })
    console.log(req.user);
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var questions = [
    {
        question: "Like hackathons?",
        optionA: "yes",
        optionB: "no",
        answersA: {
            "user1":"yes",
            "user2":"no"
        }
    },
    {
        question: "Cookies or ice cream?",
        optionA: "cookies",
        optionB: "ice cream",
        answers: {"user1":"cookies"}
    }];
 
    db.collection('questions', function(err, collection) {
        collection.insert(questions, {safe:true}, function(err, result) {});
    });
 
};