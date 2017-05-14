var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors');
// gridfs for file storing to db
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

// ----------------- Custom Dependencies -----------------
Resume = require('./models/resume');
Cd = require('./models/cd');

const app = express();

// to handle Cross-origin resource sharing (CORS); using the same server
// on the machine
app.use(cors());

// ----------------- Client -----------------
// The directory which is going to be public (static)
// and to put Angular stuffs for client side
app.use(express.static(path.join(__dirname, 'client')));

// ----------------- Body Parser -----------------
// Initialise the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// ----------------- Connect to Server -----------------
mongoose.connect('mongodb://farzin:farzin@ds141401.mlab.com:41401/cdstore');
var conn = mongoose.connection;

// Routing
app.get('/', function(req, res){
  // res.send("Hello, I'm nodemon...");
  res.send("Please goto /api/cd or /api/resume");
});

// -------------------------- Upload File --------------------------

var fs = require('fs');
const busboyBodyParser = require('busboy-body-parser');
app.use(busboyBodyParser({ multi: true }));
var gfs = Grid(conn.db);

app.post('/api/resume', function(req, res){
  let part = req.files.file;
  // console.log(part);
  let writestream = gfs.createWriteStream({
    filename: part[0].name,
    mode: 'w',
    content_type: part[0].mimetype
  });

  // Add the resume in resumes collection of the db
  Resume.addResume({name: part[0].name}, function(err, newresume){
  if(err)
    throw err;
  res.json(newresume);
  });

  writestream.on('close', function (file) {
    return res.status(200).send({
        message: 'success',
        file: file
    });
  });

  //writestream.write(part.data);
  writestream.end();
});

// -------------------------- Listen to port --------------------------
var port = 4000;
app.listen(port, function(){
  console.log('Listening to port ' + port + '...');
});


// -------------------------- Cd --------------------------
app.get('/api/cd', function(req, res){
  Cd.getCd(function(err, cdList){
      if(err)
        throw err;
    res.json(cdList);
  });
});

// Add cd
app.post('/api/cd', function(req, res){
  // using body-parser to access whatever comes from forms
  var newcd = req.body;
  // console.log(newcd);
  Cd.addCd(newcd, function(err, newcd){
    if(err)
      throw err;
    res.json(newcd);
  });
});

// Update cd
app.put('/api/cd/:_id', function(req, res){
  // to get the id from URL; _id is in mongodb
  var id = req.params._id;
  var cd = req.body;
  // {} is empty options
  Cd.updateCd(id, cd, {}, function(err, cd){
    if(err)
      throw err;
    res.json(cd);
  });
});

// Delete cd
app.delete('/api/cd/:_id', function(req, res){
  var id = req.params._id;
  Cd.removeCd(id, function(err, cd){
    if(err)
      throw err;
  });
});

// -------------------------- Resume --------------------------
app.get('/api/resume', function(req, res){
  Resume.getResume(function(err, resumeList){
    if(err)
      throw err;
    res.json(resumeList);
  });
});

// Update resume
app.put('/api/resume/:_id', function(req, res){
  // to get the id from URL; _id is in mongodb
  var id = req.params._id;
  var resume = req.body;
  // {} is empty options
  Resume.updateResume(id, resume, {}, function(err, resume){
    if(err)
      throw err;
    res.json(resume);
  });
});

// Delete resume
app.delete('/api/resume/:_id', function(req, res){
  var id = req.params._id;
  Resume.removeResume(id, function(err, cd){
    if(err)
      throw err;
  });
});
