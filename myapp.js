var express = require('express');
var cors = require('cors');
require('dotenv').config()
const bodyParser= require('body-parser')
const multer = require('multer');
const { response } = require('express');
var app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', multer({storage: multer.memoryStorage()}).single('upfile'), (request, response) => {
  let responseObject = {}
  responseObject['name'] = request.file.originalname
  responseObject['type'] = request.file.mimetype
  responseObject['size'] = request.file.size
  response.json(responseObject)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});


