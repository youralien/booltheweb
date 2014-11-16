var resultsLimit = 20;

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
            collection.find({poster:{$ne:id}}).sort( { timestamp : -1 } ).limit(resultsLimit).toArray(function(err, items) {
                outputItems = []
                for (i=0;i<items.length;i++) {
                    add = true;
                    if (items[i].answersA.indexOf(String(id)) > -1) {
                        add = false;
                    }
                    if (items[i].answersB.indexOf(String(id)) > -1) {
                        add = false;
                    }
                    if (add) {
                        outputItems.push(items[i]);
                    }
                }
                res.send(outputItems);
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

exports.findQuestionsByUser = function(req, res) {
    var id = req.params.userid;
    db.collection('questions', function(err, collection) {
        collection.find({'poster':new BSON.ObjectID(id)}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addQuestion = function(req, res) {
    var question = req.body;
    console.log(question);
    try {
        question["poster"] = req.user._id;
    } catch(err) {
        console.log('is mobile, posts id by itself');
    }
    question["timestamp"] = new Date().getTime();
    question["answersA"] = [];
    question["answersB"] = [];
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
    console.log("putting");
    var id = req.params.id;
    console.log(id);
    try {
        var userid = req.user._id;
    } catch(err) {
        var userid = req.body.userid; // for mobile
    }
    console.log(userid);
    var answer = req.body.answer;
    console.log(answer);
    db.collection('questions', function(err, collection) {
        if (answer=="A") {
            console.log('a');
            collection.update({ '_id': new BSON.ObjectID(id) }, {$push:{answersA:userid}});
        } else {
            console.log('b');
            collection.update({ '_id': new BSON.ObjectID(id) }, {$push:{answersB:userid}});
        }
        res.send();
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
        poster: "54670c66de802fa05f003992", 
        timestamp: new Date().getTime()
    },
    {
        question: "Like hackathons?",
        optionA: "yes",
        optionB: "no",
        answersA: [
            "user1",
            "user2"
        ], 
        answersB: [
            "54670c66de802fa05f003992",
            "user5"
        ], 
        poster: "user4", 
        timestamp: new Date().getTime()
    },
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
            "54670c66de802fa05f003992",
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