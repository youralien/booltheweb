var resultsLimit = 1;

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
        collection.find().sort( { timestamp : -1 } ).limit(resultsLimit).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findAllFromTime = function(req, res) {
    var timestamp = req.params.time;
    db.collection('questions', function(err, collection) {
        collection.find({ timestamp: { $lt: parseInt(timestamp) }}).sort({ timestamp : -1 }).limit(resultsLimit).toArray(function(err, items) {
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
    question["poster"] = req.user._id;
    question["timestamp"] = new Date().getTime();
    console.log(JSON.stringify(question));
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

exports.addAnswer = function(req, res) {
    var id = req.params.id;
    var user = req.user;
    var answer = req.body;
    db.collection('questions', function(err, collection) {
        if (answer.answer=="A") {
            collection.update({ '_id': new BSON.ObjectID(id) }, {$push:{answersA:user._id}});
        } else {
            collection.update({ '_id': new BSON.ObjectID(id) }, {$push:{answersB:user._id}});
        }
    });
}

exports.deleteAll = function(req, res) {
    db.collection('questions', function(err, collection) {
        collection.remove({});
    });
    populateDB();
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
        answersA: [
            "user1",
            "user2"
        ], 
        answersB: [
            "user3",
            "user5"
        ], 
        poster: "user4", 
        timestamp: new Date().getTime()
    },
    {
        question: "Cookies or ice cream?",
        optionA: "cookies",
        optionB: "ice cream",
        answersA: [
            "user1",
            "user2"
        ], 
        answersB: [
            "user3",
            "user5"
        ], 
        poster: "user4",
        timestamp: new Date().getTime()
    }];
 
    db.collection('questions', function(err, collection) {
        collection.insert(questions, {safe:true}, function(err, result) {});
    });
 
};