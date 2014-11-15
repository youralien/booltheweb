var express = require('express'),
	question = require('./routes/questions');
 
var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/', function (req, res) {
  res.send('Hello Bool!')
});

app.get('/questions', question.findAll);
app.get('/questions/:id', question.findById);
app.post('/questions', question.addQuestion);
app.delete('/questions/:id', question.deleteQuestion);

app.listen(3000);
console.log('Listening on port 3000...');