const express = require('express');
const router = express.Router();
var q = require('q');
const db=require('../db/config');
var multer = require('multer');
var fs = require('fs');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
const spawn = require("child_process").spawn;

router.get('/bracscores',function(req,res){
  // console.log("hii");
function fun1(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_brac where status!=-1",defered.makeNodeResolver());
  return defered.promise;
}

function fun2(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_sac where status!=-1 ",defered.makeNodeResolver());
  return defered.promise;
}

function fun3(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_uam where status!=-1",defered.makeNodeResolver());
  return defered.promise;
}
function fun4(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_ur where status!=-1",defered.makeNodeResolver());
  return defered.promise;
}

q.all([fun1(),fun2(),fun3(),fun4()]).then(function(results){
  govall = results[0][0][0].score+results[1][0][0].score+results[2][0][0].score+results[3][0][0].score;
  // console.log(govall);
  all = results[0][0][0].total+results[1][0][0].total+results[2][0][0].total+results[3][0][0].total;
 // console.log(all);
  totalscore = Math.round((govall/all)*100);
  // console.log(totalscore);
  res.json({success:true ,data:totalscore});
}); });
/************************************   Second Graph Total Score *******************************************/

/************************************ EDUCATION AND GUIDANCE ************************************************/
router.get('/bracfourvalue',function(req,res){
  // console.log("hii");


function egfunction(){
  var defered = q.defer();
  db.query("select sum(score) as score, count(*) as total from  score_history where groupname = 'Access Control' ",defered.makeNodeResolver());
  return defered.promise;
}
q.all([egfunction()]).then(function(results){
  score = results[0][0][0].score;
  total = results[0][0][0].total;
egtotalscore = Math.round((score/total)*100);

  res.json({success:true ,egscore:egtotalscore});
    // console.log("hii");
});
});


/****************************************************  First Graph Values ***************************************************************/
router.get('/bracfirstvalue',function(req,res){
  // console.log("hii");
function access_brac(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_brac where status!=-1 ",defered.makeNodeResolver());
  return defered.promise;
}

function access_sac(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_sac where status!=-1  ",defered.makeNodeResolver());
  return defered.promise;
}

function access_uam(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from access_uam where status!=-1 ",defered.makeNodeResolver());
  return defered.promise;
}
function access_ur(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_ur where status!=-1 ",defered.makeNodeResolver());
  return defered.promise;
}
function fun1(){
  var defered = q.defer();
  db.query("select count(*) as total from  access_brac ",defered.makeNodeResolver());
  return defered.promise;
}

function fun2(){
  var defered = q.defer();
  db.query("select count(*) as total from  access_sac  ",defered.makeNodeResolver());
  return defered.promise;
}

function fun3(){
  var defered = q.defer();
  db.query("select count(*) as total from  access_uam ",defered.makeNodeResolver());
  return defered.promise;
}
function fun4(){
  var defered = q.defer();
  db.query("select count(*) as total from  access_ur ",defered.makeNodeResolver());
  return defered.promise;
}
q.all([access_brac(),access_sac(),access_uam(),access_ur(),fun1(),fun2(),fun3(),fun4()]).then(function(results){

  brac = results[0][0][0].score;
  sac = results[1][0][0].score;
  uam = results[2][0][0].score;
  ur = results[3][0][0].score;
  b = results[4][0][0].total;
 s = results[5][0][0].total;
 u = results[6][0][0].total;
 u2 = results[7][0][0].total;
 v1 = Math.round((brac/b)*100);
 v2 = Math.round((brac/s)*100);
 v3 = Math.round((brac/u)*100);
 v4 = Math.round((brac/u2)*100);
   res.json({success:true,brac:v1,sac:v2,uam:v3,ur:v4 });
 });

});
/************************************************* Second Graph Score ****************************************************/
router.get('/bracsecondvalue',function(req,res){
  // console.log("hii");
function brac_1(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_brac where compliance_section = 'A.9.1.1-Access control policy' ",defered.makeNodeResolver());
  return defered.promise;
}
function brac_2(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_brac where compliance_section = 'A.9.1.2-Access to networks and network services'",defered.makeNodeResolver());
  return defered.promise;
}

function sac_1(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_sac where compliance_section = 'A.9.4.1-Information access restriction'",defered.makeNodeResolver());
  return defered.promise;
}
function sac_2(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_sac where compliance_section = 'A.9.4.2-Secure log-on procedures'",defered.makeNodeResolver());
  return defered.promise;
}
function sac_3(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_sac where compliance_section = 'A.9.4.3-Password management system'",defered.makeNodeResolver());
  return defered.promise;
}
function sac_4(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_sac where compliance_section = 'A.9.4.4-Use of privileged utility programs'",defered.makeNodeResolver());
  return defered.promise;
}
function sac_5(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_sac where compliance_section = 'A.9.4.5-Access control to program source code'",defered.makeNodeResolver());
  return defered.promise;
}
function uam_1(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from access_uam where compliance_section = 'A.9.2.4-Management of secret authentication information of users' ",defered.makeNodeResolver());
  return defered.promise;
}
function uam_2(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from access_uam where compliance_section = 'A.9.2.5-Review of user access rights' ",defered.makeNodeResolver());
  return defered.promise;
}
function uam_3(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from access_uam where compliance_section = 'A.9.2.6-Removal or adjustment of access rights' ",defered.makeNodeResolver());
  return defered.promise;
}
function uam_4(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from access_uam where compliance_section = 'A.9.2.1-User registration and de-registration' ",defered.makeNodeResolver());
  return defered.promise;
}
function uam_5(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from access_uam where compliance_section = 'A.9.2.2-User access provisioning' ",defered.makeNodeResolver());
  return defered.promise;
}
function uam_6(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from access_uam where compliance_section = 'A.9.2.3-Management of privileged access rights' ",defered.makeNodeResolver());
  return defered.promise;
}

function ur_1(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  access_ur where compliance_section = 'A.9.3.1-Use of secret authentication information' ",defered.makeNodeResolver());
  return defered.promise;
}

q.all([brac_1(),brac_2(),sac_1(),sac_2(),sac_3(),sac_4(),sac_5(),uam_1(),uam_2(),uam_3(),uam_4(),uam_5(),uam_6(),ur_1()]).then(function(results){

  brac1 = results[0][0][0].score;
  brac2 = results[1][0][0].score;
  sac1 = results[2][0][0].score;
  sac2 = results[3][0][0].score;
  sac3 = results[4][0][0].score;
  sac4 = results[5][0][0].score;
  sac5 = results[6][0][0].score;
  uam1 = results[7][0][0].score;
  uam2 = results[8][0][0].score;
  uam3 = results[9][0][0].score;
  uam4 = results[10][0][0].score;
  uam5 = results[11][0][0].score;
  uam6 = results[12][0][0].score;
  ur1 = results[13][0][0].score;
    res.json({success:true,brac1:brac1,brac2:brac2,sac1:sac1,sac2:sac2,sac3:sac3,sac4:sac4,sac5:sac5,uam1:uam1,uam2:uam2,uam3:uam3,uam4:uam4,uam5:uam5,uam6:uam6,ur1:ur1});
 });

});

/***************************************************** Chart Three *******************************************************/
/**************************************************** SECURITY READINESS FACTOR ******************************************/

 router.get('/bracthirdvalue',function(req,res){
      // console.log("hii");
      function brac_yes(){
        var defered = q.defer();
        db.query("select count(*) as score from access_brac  where status = 1  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function brac_no(){
        var defered = q.defer();
        db.query("select count(*) as score from access_brac  where status = 0  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function sac_yes(){
        var defered = q.defer();
        db.query("select count(*) as score from access_sac  where status = 1  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function sac_no(){
        var defered = q.defer();
        db.query("select count(*) as score from access_sac  where status = 0  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function uam_yes(){
        var defered = q.defer();
        db.query("select count(*) as score from access_uam  where status = 1  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function uam_no(){
        var defered = q.defer();
        db.query("select count(*) as score from access_uam  where status = 0  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function ur_yes(){
        var defered = q.defer();
        db.query("select count(*) as score from access_ur  where status = 1  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function ur_no(){
        var defered = q.defer();
        db.query("select count(*) as score from access_ur  where status = 0  ",defered.makeNodeResolver());
        return defered.promise;
      }

      q.all([brac_yes(),brac_no(),sac_yes(),sac_no(),uam_yes(),uam_no(),ur_yes(),ur_no()]).then(function(results){

        brac_yes = (results[0][0][0].score/10);
        brac_no = (results[1][0][0].score/10);
        sac_yes = (results[2][0][0].score/10);
        sac_no = (results[3][0][0].score/10);
        uam_yes = (results[4][0][0].score/10);
        uam_no = (results[5][0][0].score/10);
        ur_yes = (results[6][0][0].score/10);
        ur_no = (results[7][0][0].score/10);
        res.json({success:true, brac_yes:brac_yes, brac_no: brac_no ,sac_yes: sac_yes,sac_no: sac_no,uam_yes:uam_yes,uam_no: uam_no,ur_yes: ur_yes,ur_no: ur_no});
      });
      });

/**************************************************** Edit Options In Table *************************************************/
/***********************************************  ACCESS-BRAC  **********************************/
router.get('/bracalltable',function(req,res){
  function vsamm(){
    var defered = q.defer();
    db.query("SELECT * FROM access_brac  ORDER BY iso_id ASC",defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([vsamm()]).then(function(results){
    all = results[0][0];
    res.json({success:true, "all": all});
  });
});

router.put('/braceditgoveg', function (req, res) {
  id=req.body.id;
  question=req.body.name;
  score=req.body.score;
  user=req.body.symbol;
  audit=req.body.auditor;
  csection = req.body.section;
  var scname;
  if(score=="No")
      {scname=0;}
  else if(score=="Yes")
      {scname=1;}
  else if(score=="Implementing")
      {scname=0.5;}
  else if(score=="NA")
      {scname=-1;}
  else if(score=="N/A")
      {scname=-1;}
  if(req.body.comment==undefined)
  {
      var c='';
      sql="update access_brac  set status="+scname+" where iso_id="+id+"";
      //sql1="INSERT INTO comment_history VALUES ('"+question+"','','Regulatory Compliance','Security Procedure and Policies','"+c+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
        sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACC-brac "+id+"','"+question+"','Access Control','User Access Management','"+scname+"','"+audit+"',NOW())";
     // console.log(sql2);
      db.query(sql,(err,results)=>
      {
          if(err) throw err;

              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });

      })
  }
  else if(req.body.score==undefined)
  {
      sql="update  access_brac  set comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Access Control','User Access Management','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACC-brac "+id+"','"+question+"','Access Control','User Access Management','"+scname+"','"+audit+"',NOW())";  db.query(sql,(err,results)=>
      {
          if(err) throw err;
          db.query(sql1,(err,result)=>
          {
              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });
          });
      })
  }
  else
  {
      sql="update  access_brac  set status="+scname+",comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Access Control','User Access Management','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACC-brac "+id+"','"+question+"','Access Control','User Access Management','"+scname+"','"+audit+"',NOW())";
      db.query(sql,(err,results)=>
      {
          if(err) throw err;
          db.query(sql1,(err,result)=>
          {
              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });
          });
      })
  }
//console.log(sql2);


});
router.put('/brachist_reg', function (req, res) {
  id = req.body.id;

  sql="SELECT COMMENT FROM `comment_history` WHERE qoid="+id+" and groupname='"+req.body.groupname+"' and secpractice='"+req.body.secpractice+"'";
 //console.log(sql);
  db.query(sql,(err,results)=>
  {
      if(err) throw err;

          res.json({success: true,values:results});

  })
 // res.json({sql:sql,id:req.body.id});
});
router.get('/bracreg_la_tab', function (req, res) {
  sql="SELECT * FROM access_brac  ORDER BY iso_id ASC ";
  db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true, values:results});
  })
});

///uploadreg_db
router.post("/bracuploadreg_db",function(req,res){
  //console.log(req.body);
 //sql="UPDATE `api_sm` SET `upload`='upload/',`filename`='"+req.body.files+"'  WHERE id='"+req.body.id+"'";
 //console.log(sql);
  if(req.body.groupname=="Access Control" && req.body.secpractice=="User Access Management")
  {
      //UPDATE `api_sm` SET `upload`='upload/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE id='"+req.body.id+"'
    //  sql="UPDATE `api_sm` SET `upload`='upload/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE id='"+req.body.id+"'";
      //console.log(sql);
      //console.log(sql);
      function doQuery_tab()
      {
          var defered = q.defer();
          db.query("UPDATE `access_brac` SET `upload`='upload/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE id='"+req.body.id+"'",defered.makeNodeResolver());
          return defered.promise;
      }
      function doQuery_upload()
      {
          var defered = q.defer();
          db.query("INSERT INTO `uploads`(`id`, `filename`, `groupname`, `secpractice`,`qoid`) VALUES ('','"+req.body.files+"','"+req.body.groupname+"','"+req.body.secpractice+"','"+req.body.id+"')",defered.makeNodeResolver());
          return defered.promise;
      }
  }
 q.all([ doQuery_tab(),doQuery_upload()
  ]).then(function(results)
  {

      res.json({success:true});
  });
 /*db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true});
  })*/
});

/***********************************************  ACCESS-UAM  **********************************/
router.get('/uamalltable',function(req,res){
  function vsamm(){
    var defered = q.defer();
    db.query("SELECT * FROM access_uam  ORDER BY iso_id ASC",defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([vsamm()]).then(function(results){
    all = results[0][0];
    res.json({success:true, "all": all});
  });
});

router.put('/uameditgoveg', function (req, res) {
  id=req.body.id;
  question=req.body.name;
  score=req.body.score;
  user=req.body.symbol;
  audit=req.body.auditor;
  csection = req.body.section;
  var scname;
  if(score=="No")
      {scname=0;}
  else if(score=="Yes")
      {scname=1;}
  else if(score=="Implementing")
      {scname=0.5;}
  else if(score=="NA")
      {scname=-1;}
  else if(score=="N/A")
      {scname=-1;}
  if(req.body.comment==undefined)
  {
      var c='';
      sql="update access_uam  set status="+scname+" where iso_id="+id+"";
      //sql1="INSERT INTO comment_history VALUES ('"+question+"','','Regulatory Compliance','Security Procedure and Policies','"+c+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
        sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACC-UAM "+id+"','"+question+"','Access Control','User Access Management','"+scname+"','"+audit+"',NOW())";
     // console.log(sql2);
      db.query(sql,(err,results)=>
      {
          if(err) throw err;

              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });

      })
  }
  else if(req.body.score==undefined)
  {
      sql="update  access_uam  set comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Access Control','User Access Management','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACC-UAM "+id+"','"+question+"','Access Control','User Access Management','"+scname+"','"+audit+"',NOW())";
     db.query(sql,(err,results)=>
      {
          if(err) throw err;
          db.query(sql1,(err,result)=>
          {
              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });
          });
      })
  }
  else
  {
      sql="update  access_uam  set status="+scname+",comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Access Control','User Access Management','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACC-UAM "+id+"','"+question+"','Access Control','User Access Management','"+scname+"','"+audit+"',NOW())";
      db.query(sql,(err,results)=>
      {
          if(err) throw err;
          db.query(sql1,(err,result)=>
          {
              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });
          });
      })
  }
//console.log(sql2);


});
router.put('/uamhist_reg', function (req, res) {
  id = req.body.id;

  sql="SELECT comment FROM `comment_history` WHERE qoid="+id+" and groupname='"+req.body.groupname+"' and secpractice='"+req.body.secpractice+"'";
  console.log(sql);
  db.query(sql,(err,results)=>
  {
      if(err) throw err;

          res.json({success: true,values:results});

  })
 // res.json({sql:sql,id:req.body.id});
});
router.get('/uamreg_la_tab', function (req, res) {
  sql="SELECT * FROM access_uam  ORDER BY iso_id ASC ";
  db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true, values:results});
  })
});
//to upload
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
var Dir='./uploads/';
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
      fs.exists(Dir + file.originalname, function(exists,res) {
          let uploadedFileName;
          if (exists) {
           uploadedFileName = Date.now() + '.' + file.originalname;
          //cb(new Error("Error:File already exist"), false);
           // console.log("file already exist");
          } else {
              uploadedFileName = file.originalname;

          }
          cb(null, uploadedFileName);
      });
      //cb(null,file.originalname);
  }
});

var upload = multer({ //multer settings
              storage: storage
}).array('file');
router.post('/upload',(req, res) => {
  upload(req,res,function(err){
     // console.log(req.file);

      if(err)
      {
           res.json({err:err});
           return;
      }
      res.json({error_code:0,err_desc:null,message:"File uploaded successfully",success:true});
  });
});
router.post('/download',function(req,res){
  filepath=path.join(__dirname,"../uploads")+'\\'+req.body.filename;
  console.log(filepath);
  res.sendFile(filepath);
});
//getupload
router.post('/getupload', function(req,res)
{
  sql="SELECT filename FROM `access_uam` WHERE iso_id='"+req.body.id+"'";
 console.log(sql);
  db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true,results:results});
  })
});

///uploadreg_db
router.post("/updatesss",function(req,res){

  if(req.body.groupname=="Access Control" && req.body.secpractice=="User Access Management")
  {
   sql="UPDATE `access_uam` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
  }
  else if(req.body.groupname=="Access Control" && req.body.secpractice=="User responsibilities")
  {
 sql="UPDATE `access_ur` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
    }
  else if(req.body.groupname=="Access Control" && req.body.secpractice=="Business requirements for access control")
  {
  sql="UPDATE `access_brac` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
         }
  else if(req.body.groupname=="Access Control" && req.body.secpractice=="System and application access control")
      {
   sql="UPDATE `access_sac` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
          }
  else if(req.body.groupname=="Asset management" && req.body.secpractice=="Responsibility for assets")
          {
 sql="UPDATE `asset_ra` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
              }
  else if(req.body.groupname=="Asset management" && req.body.secpractice=="Information classification")
              {
 sql="UPDATE `asset_ic` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                  }
 else if(req.body.groupname=="Asset management" && req.body.secpractice=="Media handling")
                  {
 sql="UPDATE `asset_mh` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                      }
   else if(req.body.groupname=="Cryptography" && req.body.secpractice=="Cryptographic controls")
                      {
 sql="UPDATE `cryptography_con` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                          }
    else if(req.body.groupname=="Physical and Environmental Security" && req.body.secpractice=="Secure areas")
                      {
   sql="UPDATE `physical_sa` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                          }
  else if(req.body.groupname=="Physical and Environmental Security" && req.body.secpractice=="Equipment")
                          {
 sql="UPDATE `physical_equ` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                              }
  else if(req.body.groupname=="Operations Security" && req.body.secpractice=="Operational procedures and responsibilities")
                          {
  sql="UPDATE `operations_opr` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                              }
  else if(req.body.groupname=="Operations Security" && req.body.secpractice=="Protection from malware")
                              {
  sql="UPDATE `operations_pm` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                  }
  else if(req.body.groupname=="Operations Security" && req.body.secpractice=="Backup")
                                  {
  sql="UPDATE `operations_backup` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                      }
  else if(req.body.groupname=="Operations Security" && req.body.secpractice=="Logging and monitoring")
                                      {
   sql="UPDATE `operations_lm` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                          }
   else if(req.body.groupname=="Operations Security" && req.body.secpractice=="Control of operational software")
                                          {
  sql="UPDATE `operations_cos` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                              }
   else if(req.body.groupname=="Operations Security" && req.body.secpractice=="Technical vulnerability management")
                                              {
 sql="UPDATE `operations_tvm` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                  }
 else if(req.body.groupname=="Operations Security" && req.body.secpractice=="IInformation systems audit considerations")
                                              {
  sql="UPDATE `operations_isac` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                  }
  else if(req.body.groupname=="Communications Security" && req.body.secpractice=="Network security management")
                                                  {
   sql="UPDATE `communications_nsm` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                      }
 else if(req.body.groupname=="Communications Security" && req.body.secpractice=="Information transfer")
                                                      {
  sql="UPDATE `communications_it` SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                          }
 else if(req.body.groupname=="System Acquisition, Development and Maintenance" && req.body.secpractice=="Security requirements of information systems")
                                                          {
 sql="UPDATE system_sris' SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                              }
  else if(req.body.groupname=="System Acquisition, Development and Maintenance" && req.body.secpractice=="Security in development and support processes")
                                                              {
  sql="UPDATE `system_sdsp`  SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                                  }
 else if(req.body.groupname=="System Acquisition, Development and Maintenance" && req.body.secpractice=="Test data")
                                                                  {
  sql="UPDATE system_td SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                                      }
  else if(req.body.groupname=="Supplier Relationships" && req.body.secpractice=="Information security in supplier relationships")
                                                                      {
 sql="UPDATE `supplier_isr`  SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                                          }
 else if(req.body.groupname=="Supplier Relationships" && req.body.secpractice=="Supplier service delivery management")
                                                                          {
  sql="UPDATE `supplier_sdm`  SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                                              }
 else if(req.body.groupname=="Information Security Incident Management " && req.body.secpractice=="Management of information security incidents and improvements")
                                                                              {
   sql="UPDATE information_mis SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                                                  }
  else if(req.body.groupname=="Information Security Policies" && req.body.secpractice=="Management direction for information securit")
                                                                                  {
  sql="UPDATE information_mdis SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                                                      }
  else if(req.body.groupname=="Information Security Aspects of Business Continuity Management" && req.body.secpractice=="Information security continuity")
                                                                                  {
  sql="UPDATE isecurity_isc SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                                                      }
  else if(req.body.groupname=="Information Security Aspects of Business Continuity Management" && req.body.secpractice=="Redundancies")
                                                                                      {
 sql="UPDATE isecurity_red SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                                                          }
 else if(req.body.groupname=="Compliance" && req.body.secpractice=="Compliance with legal and contractual requirements")
                                                                                          {
  sql="UPDATE `compliance_lcr SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                                                              }
else if(req.body.groupname=="Compliance" && req.body.secpractice=="Information security reviews")
                                                                                              {
   sql="UPDATE `compliance_isr SET `upload`='uploads/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'";
                                                                                                  }
  db.query(sql,(err,results)=>
  {
      if(err) throw err;

      res.json({success:true});
  });
 /*db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true});
  })*/
});

/*************************************************************   ASSET-SAC ************************************************/

router.get('/sacalltable',function(req,res){
  function vsamm(){
    var defered = q.defer();
    db.query("SELECT * FROM access_sac  ORDER BY iso_id ASC",defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([vsamm()]).then(function(results){
    all = results[0][0];
    res.json({success:true, "all": all});
  });
});

///uploadreg_db
router.post("/uploadreg_db",function(req,res){
  sql="UPDATE `access_sac` SET `upload`='upload/' WHERE id='"+req.body.id+"'";
 // console.log(sql);
 db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true});
  })
});

// edit score
router.put('/saceditgoveg', function (req, res) {
  id=req.body.id;
  question=req.body.name;
  score=req.body.score;
  user=req.body.symbol;
  audit=req.body.auditor;
  var scname;
  if(score=="No")
      {scname=0;}
  else if(score=="Yes")
      {scname=1;}
  else if(score=="Implementing")
      {scname=0.5;}
  else if(score=="NA")
      {scname=-1;}
  else if(score=="N/A")
      {scname=-1;}
  if(req.body.comment==undefined)
  {
      var c='';
      sql="update access_sac  set status="+scname+" where iso_id="+id+"";
     // console.log(sql);
      //sql1="INSERT INTO comment_history VALUES ('"+question+"','','Regulatory Compliance','Security Procedure and Policies','"+c+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACCESS-SAC "+id+"','"+question+"','Access control','System and application access control','"+scname+"','"+audit+"',NOW())";
     // console.log(sql2);
      db.query(sql,(err,results)=>
      {
        if(err) throw err;
              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });

      })
  }
  else if(req.body.score==undefined)
  {
      sql="update  access_sac  set comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Access control','System and application access control','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACCESS-SAC "+id+"','"+question+"','Access control','System and application access control','"+scname+"','"+audit+"',NOW())";
      db.query(sql,(err,results)=>
      {
          if(err) throw err;
          db.query(sql1,(err,result)=>
          {
              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });
          });
      })
  }
  else
  {
      sql="update  access_sac  set status="+scname+",comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Access control','System and application access control','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACCESS-SAC "+id+"','"+question+"','Access control','System and application access control','"+scname+"','"+audit+"',NOW())";
      db.query(sql,(err,results)=>
      {
          if(err) throw err;
          db.query(sql1,(err,result)=>
          {
              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });
          });
      })
  }
//console.log(sql2);


});
router.put('/sachist_reg', function (req, res) {
  id = req.body.id;

  sql="SELECT COMMENT FROM `comment_history` WHERE qoid="+id+" and groupname='"+req.body.groupname+"' and secpractice='"+req.body.secpractice+"'";
 //console.log(sql);
  db.query(sql,(err,results)=>
  {
      if(err) throw err;

          res.json({success: true,values:results});

  })
 // res.json({sql:sql,id:req.body.id});
});
router.get('/sacreg_la_tab', function (req, res) {
  sql="SELECT * FROM access_sac  ORDER BY iso_id ASC ";
  db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true, values:results});
  })
});
///uploadreg_db
router.post("/sacuploadreg_db",function(req,res){

  if(req.body.groupname=="Access Control" && req.body.secpractice=="System and application access control")
  {

      function doQuery_tab()
      {
          var defered = q.defer();
          db.query("UPDATE `access_sac` SET `upload`='upload/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE id='"+req.body.id+"'",defered.makeNodeResolver());
          return defered.promise;
      }

  }
 q.all([ doQuery_tab()]).then(function(results)
  {

      res.json({success:true});
  });
});


/*************************************************************   ASSET-UR ************************************************/
router.get('/uralltable',function(req,res){
  function vsamm(){
    var defered = q.defer();
    db.query("SELECT * FROM access_ur  ORDER BY iso_id ASC",defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([vsamm()]).then(function(results){
    all = results[0][0];
    res.json({success:true, "all": all});
  });
});
router.put('/ureditgoveg', function (req, res) {
  id=req.body.id;
  question=req.body.name;
  score=req.body.score;
  user=req.body.symbol;
  audit=req.body.auditor;
  csection = req.body.section;
  var scname;
  if(score=="No")
      {scname=0;}
  else if(score=="Yes")
      {scname=1;}
  else if(score=="Implementing")
      {scname=0.5;}
  else if(score=="NA")
      {scname=-1;}
  else if(score=="N/A")
      {scname=-1;}
  if(req.body.comment==undefined)
  {
      var c='';
      sql="update access_ur  set status="+scname+" where iso_id="+id+"";
      //sql1="INSERT INTO comment_history VALUES ('"+question+"','','Regulatory Compliance','Security Procedure and Policies','"+c+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
        sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACC-UR "+id+"','"+question+"','Access Control','User responsibilities','"+scname+"','"+audit+"',NOW())";
     // console.log(sql2);
      db.query(sql,(err,results)=>
      {
          if(err) throw err;

              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });

      })
  }
  else if(req.body.score==undefined)
  {
      sql="update  access_ur  set comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Access Control','User responsibilities','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACC-UR "+id+"','"+question+"','Access Control','User responsibilities','"+scname+"','"+audit+"',NOW())";
      db.query(sql,(err,results)=>
      {
          if(err) throw err;
          db.query(sql1,(err,result)=>
          {
              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });
          });
      })
  }
  else
  {
      sql="update  access_ur  set status="+scname+",comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Access Control','User responsibilities','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ACC-UR "+id+"','"+question+"','Access Control','User responsibilities','"+scname+"','"+audit+"',NOW())";
      db.query(sql,(err,results)=>
      {
          if(err) throw err;
          db.query(sql1,(err,result)=>
          {
              db.query(sql2,(err,resul)=>
              {
              res.json({success: true});
              });
          });
      })
  }
//console.log(sql2);


});
router.put('/urhist_reg', function (req, res) {
  id = req.body.id;

  sql="SELECT COMMENT FROM `comment_history` WHERE qoid="+id+" and groupname='"+req.body.groupname+"' and secpractice='"+req.body.secpractice+"'";
 //console.log(sql);
  db.query(sql,(err,results)=>
  {
      if(err) throw err;

          res.json({success: true,values:results});

  })
 // res.json({sql:sql,id:req.body.id});
});
router.get('/urreg_la_tab', function (req, res) {
  sql="SELECT * FROM access_ur  ORDER BY iso_id ASC ";
  db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true, values:results});
  })
});
///uploadreg_db
router.post("/uruploadreg_db",function(req,res){

  if(req.body.groupname=="Access Control" && req.body.secpractice=="User responsibilities")
  {

      function doQuery_tab()
      {
          var defered = q.defer();
          db.query("UPDATE `access_ur` SET `upload`='upload/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE id='"+req.body.id+"'",defered.makeNodeResolver());
          return defered.promise;
      }
      function doQuery_upload()
      {
          var defered = q.defer();
          db.query("INSERT INTO `uploads`(`id`, `filename`, `groupname`, `secpractice`,`qoid`) VALUES ('','"+req.body.files+"','"+req.body.groupname+"','"+req.body.secpractice+"','"+req.body.id+"')",defered.makeNodeResolver());
          return defered.promise;
      }
  }
 q.all([ doQuery_tab(),doQuery_upload()
  ]).then(function(results)
  {

      res.json({success:true});
  });
});

// Dova graph

router.get('/dovagraph', function (req, res) {
  // let d = Date.now();
  let d1 = new Date();
  var moment = require('moment');
var d2 = moment().subtract(1, 'days');
var d3 = moment().subtract(2, 'days');
var d4 = moment().subtract(3, 'days');
var d5 = moment().subtract(4, 'days');
var d6= moment().subtract(5, 'days');
var d7 = moment().subtract(6, 'days');
var d8 = moment().subtract(7, 'days');
var d9 = moment().subtract(8, 'days');
var d10 = moment().subtract(9, 'days');
var d11 = moment().subtract(10, 'days');
var d12 = moment().subtract(11, 'days');
var d13 = moment().subtract(12, 'days');
var d14 = moment().subtract(13, 'days');
var d15 = moment().subtract(14, 'days');
var d16 = moment().subtract(15, 'days');
var d17 = moment().subtract(16, 'days');
var d18 = moment().subtract(17, 'days');
var d19 = moment().subtract(18, 'days');
var d20 = moment().subtract(19, 'days');
var d21 = moment().subtract(20, 'days');
var d22 = moment().subtract(21, 'days');
var d23 = moment().subtract(22, 'days');
var d24 = moment().subtract(23, 'days');
var d25 = moment().subtract(24, 'days');
var d26 = moment().subtract(25, 'days');
var d27 = moment().subtract(26, 'days');
var d28 = moment().subtract(27, 'days');
var d29 = moment().subtract(28, 'days');
var d30 = moment().subtract(29, 'days');

    function k1(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW()) and  groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
  }
  function k2(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 1 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
  }
  function k3(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 2 DAY) and  groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k4(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 3 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function k5(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 4 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function k6() {
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 5 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k7(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 6 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k8(){
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 7 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k9(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 8 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k10(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 9 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k11(){


    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 10 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
    function k12(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 11 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k13(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 12 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k14(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 13 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k15(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 14 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k16(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 15 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function k17(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 16 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k18(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 17 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;;
    }
    function k19(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 18 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k20(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 19 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k21(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 20 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k22(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 21 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function k23(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 22 DAY)  and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k24(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 23 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k25(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 24 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k26(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 25 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function k27(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 26 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k28(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 27 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k29(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 28 DAY)  and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k30(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 29 DAY) and  groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k31(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE groupname= 'Access control' AND MONTH(created) = MONTH(CURRENT_DATE()) AND YEAR(created) = YEAR(CURRENT_DATE())",defered.makeNodeResolver());
      return defered.promise;
    }
    function k32(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE  score = -1 and groupname= 'Access control' AND MONTH(created) = MONTH(CURRENT_DATE()) AND YEAR(created) = YEAR(CURRENT_DATE())",defered.makeNodeResolver());
      return defered.promise;
    }
    function k33(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE  score = 1 and groupname= 'Access control' AND MONTH(created) = MONTH(CURRENT_DATE()) AND YEAR(created) = YEAR(CURRENT_DATE())",defered.makeNodeResolver());
      return defered.promise;
    }
    function k34(){
      var defered = q.defer();
      db.query("SELECT sum(score)+10 as count, MONTH(created) FROM score_history WHERE groupname= 'Access control' AND MONTH(created) = MONTH(CURRENT_DATE())-1 AND YEAR(created) = YEAR(CURRENT_DATE()) ",defered.makeNodeResolver());
      return defered.promise;
    }
    function y1(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW()) and  groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
  }
  function y2(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 1 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
  }
  function y3(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 2 DAY) and  groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y4(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE  score = 1 and DATE(created) = DATE(NOW() - INTERVAL 3 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function y5(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 4 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function y6() {
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 5 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y7(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and  DATE(created) = DATE(NOW() - INTERVAL 6 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y8(){
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 7 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y9(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 8 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y10(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and  DATE(created) = DATE(NOW() - INTERVAL 9 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y11(){


    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 10 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
    function y12(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 11 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y13(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 12 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y14(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 13 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y15(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and  DATE(created) = DATE(NOW() - INTERVAL 14 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y16(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and  DATE(created) = DATE(NOW() - INTERVAL 15 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function y17(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 16 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y18(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 17 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;;
    }
    function y19(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 18 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y20(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 19 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y21(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 20 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y22(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 21 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function y23(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 22 DAY)  and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y24(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 23 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y25(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 24 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y26(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and  DATE(created) = DATE(NOW() - INTERVAL 25 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function y27(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 26 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y28(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 27 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y29(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 28 DAY)  and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y30(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE  score = -1 and DATE(created) = DATE(NOW() - INTERVAL 29 DAY) and  groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n1(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW()) and  groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
  }
  function n2(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 1 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
  }
  function n3(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 2 DAY) and  groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n4(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE  score = -1 and DATE(created) = DATE(NOW() - INTERVAL 3 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function n5(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 4 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function n6() {
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 5 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n7(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and  DATE(created) = DATE(NOW() - INTERVAL 6 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n8(){
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 7 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n9(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 8 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n10(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and  DATE(created) = DATE(NOW() - INTERVAL 9 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n11(){


    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 10 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
    return defered.promise;
  }
    function n12(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 11 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n13(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 12 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n14(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 13 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n15(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and  DATE(created) = DATE(NOW() - INTERVAL 14 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n16(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and  DATE(created) = DATE(NOW() - INTERVAL 15 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function n17(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 16 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n18(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 17 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;;
    }
    function n19(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 18 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n20(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 19 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n21(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 20 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n22(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 21 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function n23(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 22 DAY)  and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n24(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 23 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n25(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 24 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n26(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and  DATE(created) = DATE(NOW() - INTERVAL 25 DAY) and groupname= 'Access control' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function n27(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 26 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n28(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 27 DAY) and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n29(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 28 DAY)  and groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n30(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE  score = -1 and DATE(created) = DATE(NOW() - INTERVAL 29 DAY) and  groupname= 'Access control'",defered.makeNodeResolver());
      return defered.promise;
    }
    q.all([ k1(),k2(),k3(),k4(),k5(),k6(),k7(),k8(),k9(),k10(),k11(),k12(),k13(),k14(),k15(),k16(),k17(),k18(),k19(),k20(),k21(),k22(),
    k23(),k24(),k25(),k26(),k27(),k28(),k29(),k30(),k31(),k32(),k33(),k34(),y1(),y2(),y3(),y4(),y5(),y6(),y7(),y8(),y9(),y10(),y11(),y12(),y13(),y14(),y15(),y16(),y17(),y18(),y19(),y20(),y21(),y22(),y23(),y24(),y25(),y26(),y27(),y28(),y29(),y30(),
    n1(),n2(),n3(),n4(),n5(),n6(),n7(),n8(),n9(),n10(),n11(),n12(),n13(),n14(),n15(),n16(),n17(),n18(),n19(),n20(),n21(),n22(),n23(),n24(),n25(),n26(),n27(),n28(),n29(),n30()]).then(function(results){


        res.json({ success: true, v1:results[0][0][0].count,v2:results[1][0][0].count, v3:results[2][0][0].count,v4:results[3][0][0].count,
          v5:results[4][0][0].count,v6:results[5][0][0].count, v7:results[6][0][0].count,v8:results[7][0][0].count,
          v9:results[8][0][0].count,v10:results[9][0][0].count, v11:results[10][0][0].count,v12:results[11][0][0].count,
          v13:results[12][0][0].count,v14:results[13][0][0].count, v15:results[14][0][0].count,v16:results[15][0][0].count,
          v17:results[16][0][0].count,v18:results[17][0][0].count, v19:results[18][0][0].count,v20:results[19][0][0].count,
          v21:results[20][0][0].count,v22:results[21][0][0].count, v23:results[22][0][0].count,v24:results[23][0][0].count,
          v25:results[24][0][0].count,v26:results[25][0][0].count, v27:results[26][0][0].count,v28:results[27][0][0].count,
          v29:results[28][0][0].count,v30:results[29][0][0].count,current_total: results[30][0][0].count , current_no: results[31][0][0].count ,
           current_yes: results[32][0][0].count,previous_month: results[33][0][0].count,y1: results[34][0][0].count,y2: results[35][0][0].count,y3: results[36][0][0].count,y4: results[37][0][0].count,y5: results[38][0][0].count,y6: results[39][0][0].count,y7: results[40][0][0].count,y8: results[41][0][0].count,y9: results[42][0][0].count,y10: results[43][0][0].count,y11: results[44][0][0].count,y12: results[45][0][0].count,y13: results[46][0][0].count,y14: results[47][0][0].count,y15: results[48][0][0].count,y16: results[49][0][0].count,y17: results[50][0][0].count,y18: results[51][0][0].count,y19: results[52][0][0].count,y20: results[53][0][0].count,y21: results[54][0][0].count,y22: results[55][0][0].count,y23: results[56][0][0].count,y24: results[57][0][0].count,y25: results[58][0][0].count,y26: results[59][0][0].count,y27: results[60][0][0].count,y28: results[61][0][0].count,y29: results[62][0][0].count,y30: results[63][0][0].count,
           n1: results[64][0][0].count,n2: results[65][0][0].count,n3: results[66][0][0].count,n4: results[67][0][0].count,n5: results[68][0][0].count,n6: results[69][0][0].count,n7: results[70][0][0].count,n8: results[71][0][0].count,n9: results[72][0][0].count,n10: results[73][0][0].count,n11: results[74][0][0].count,n12: results[75][0][0].count,n13: results[76][0][0].count,n14: results[77][0][0].count,n15: results[78][0][0].count,n16: results[79][0][0].count,n17: results[80][0][0].count,n18: results[81][0][0].count,n19: results[82][0][0].count,n20: results[83][0][0].count,n21: results[84][0][0].count,n22: results[85][0][0].count,n23: results[86][0][0].count,n24: results[87][0][0].count,n25: results[88][0][0].count,n26: results[89][0][0].count,n27: results[90][0][0].count,n28: results[91][0][0].count,n29: results[92][0][0].count,n30: results[93][0][0].count,
           d1: d1,d2:d2, d3:d3,d4:d4,d5:d5,d6:d6,d7:d7,d8:d8,d9:d9,d10:d10,d12:d12,d13:d13,d14:d14,d15:d15,d16:d16,d17:d17,d18:d18,d19:d19,d20,d20,d21:d21,d22:d22,d23:d23,d24:d24,d25:d25,d26:d26,d27:d27,d28:d28,d29:d29,d30:d30

        })
    });

});
module.exports = router;
