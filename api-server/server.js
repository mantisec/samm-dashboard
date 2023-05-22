var env = require('./config/env')
var express = require('express');
var app = express();
var db=require('./db/config');
const rtsIndex = require('./router/index.router');
const bodyParser = require('body-parser');
const cors = require('cors');
const allscores = require('./router/allscores.router')
const report = require('./router/indexreport.router');
const usermanage = require('./router/usermanage.router');
const home = require('./router/home.router');
// middleware
const Users = require('./routes/Users');
const vsamm = require('./router/vsamm.router');
const profile=require('./router/Profile')
// app.use('/users', Users);
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended:false
  })
)
app.use(cors());
app.use('/api', rtsIndex ,allscores, report , usermanage, home,vsamm,profile);

// app.use('/api',accuam);
app.listen(env.app_port);

console.log('api-server started on: ' + env.app_port);
