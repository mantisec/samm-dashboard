const express = require('express');
const router = express.Router();
var q = require('q');
const db=require('../db/config');
var multer = require('multer');
var fs = require('fs');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
const spawn = require("child_process").spawn;

router.get('/icscore',function(req,res){
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
router.get('/icfourvalue',function(req,res){
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
router.get('/icfirstvalue',function(req,res){
  // console.log("hii");
function asset_ic(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  asset_ic where status!=-1 ",defered.makeNodeResolver());
  return defered.promise;
}

function asset_mh(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  asset_mh where status!=-1  ",defered.makeNodeResolver());
  return defered.promise;
}

function asset_ra(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from asset_ra where status!=-1 ",defered.makeNodeResolver());
  return defered.promise;
}
function fun1(){
  var defered = q.defer();
  db.query("select count(*) as total from  asset_ic ",defered.makeNodeResolver());
  return defered.promise;
}

function fun2(){
  var defered = q.defer();
  db.query("select count(*) as total from  asset_mh  ",defered.makeNodeResolver());
  return defered.promise;
}

function fun3(){
  var defered = q.defer();
  db.query("select count(*) as total from  asset_ra ",defered.makeNodeResolver());
  return defered.promise;
}
q.all([asset_ic(),asset_mh(),asset_ra(),fun1(),fun2(),fun3()]).then(function(results){

  ic = results[0][0][0].score;
  mh = results[1][0][0].score;
  ra = results[2][0][0].score;
  i = results[3][0][0].total;
 m = results[4][0][0].total;
 r = results[5][0][0].total;
 v1 = Math.round((ic/i)*100);
 v2 = Math.round((mh/m)*100);
 v3 = Math.round((ra/r)*100);
   res.json({success:true,brac:v1,sac:v2,uam:v3 });
 });

});
/************************************************* Second Graph Score ****************************************************/
router.get('/icsecondvalue',function(req,res){
  // console.log("hii");
function brac_1(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  asset_ic where compliance_section = 'A.8.2.1-Classification of information' ",defered.makeNodeResolver());
  return defered.promise;
}
function brac_2(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  asset_ic where compliance_section = 'A.8.2.2-Labelling of information'",defered.makeNodeResolver());
  return defered.promise;
}
function sac_1(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  asset_ic where compliance_section = 'A.8.2.3-Handling of assets'",defered.makeNodeResolver());
  return defered.promise;
}
function sac_2(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  asset_mh where compliance_section = 'A.8.3.1-Management of removable media'",defered.makeNodeResolver());
  return defered.promise;
}
function sac_3(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  asset_mh where compliance_section = 'A.8.3.2-Disposal of media'",defered.makeNodeResolver());
  return defered.promise;
}
function sac_4(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  asset_mh where compliance_section = 'A.8.3.3-Physical media transfer'",defered.makeNodeResolver());
  return defered.promise;
}
function sac_5(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from  asset_ra where compliance_section = 'A.8.1.1-Inventory of assets'",defered.makeNodeResolver());
  return defered.promise;
}
function uam_1(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from asset_ra where compliance_section = 'A.8.1.2-Ownership of assets' ",defered.makeNodeResolver());
  return defered.promise;
}
function uam_2(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from asset_ra where compliance_section = 'A.8.1.3-Acceptable use of assets' ",defered.makeNodeResolver());
  return defered.promise;
}
function uam_3(){
  var defered = q.defer();
  db.query("select sum(status) as score, count(*) as total from asset_ra where compliance_section = 'A.8.1.4-Return of assets' ",defered.makeNodeResolver());
  return defered.promise;
}

q.all([brac_1(),brac_2(),sac_1(),sac_2(),sac_3(),sac_4(),sac_5(),uam_1(),uam_2(),uam_3()]).then(function(results){

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

    res.json({success:true,brac1:brac1,brac2:brac2,sac1:sac1,sac2:sac2,sac3:sac3,sac4:sac4,sac5:sac5,uam1:uam1,uam2:uam2,uam3:uam3});
 });

});

/***************************************************** Chart Three *******************************************************/
/**************************************************** SECURITY READINESS FACTOR ******************************************/

 router.get('/icthirdvalue',function(req,res){
      // console.log("hii");
      function brac_yes(){
        var defered = q.defer();
        db.query("select count(*) as score from asset_ic where status = 1  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function brac_no(){
        var defered = q.defer();
        db.query("select count(*) as score from asset_ic  where status = 0  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function sac_yes(){
        var defered = q.defer();
        db.query("select count(*) as score from asset_mh where status = 1  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function sac_no(){
        var defered = q.defer();
        db.query("select count(*) as score from asset_mh  where status = 0  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function uam_yes(){
        var defered = q.defer();
        db.query("select count(*) as score from asset_ra  where status = 1  ",defered.makeNodeResolver());
        return defered.promise;
      }
      function uam_no(){
        var defered = q.defer();
        db.query("select count(*) as score from asset_ra  where status = 0  ",defered.makeNodeResolver());
        return defered.promise;
      }

      q.all([brac_yes(),brac_no(),sac_yes(),sac_no(),uam_yes(),uam_no()]).then(function(results){

        brac_yes = (results[0][0][0].score/10);
        brac_no = (results[1][0][0].score/10);
        sac_yes = (results[2][0][0].score/10);
        sac_no = (results[3][0][0].score/10);
        uam_yes = (results[4][0][0].score/10);
        uam_no = (results[5][0][0].score/10);
        res.json({success:true, brac_yes:brac_yes, brac_no: brac_no ,sac_yes: sac_yes,sac_no: sac_no,uam_yes:uam_yes,uam_no: uam_no});
      });
      });


/***********************************************  ASSET-IC  **********************************/
router.get('/icalltable',function(req,res){
  function vsamm(){
    var defered = q.defer();
    db.query("SELECT * FROM asset_ic  ORDER BY iso_id ASC",defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([vsamm()]).then(function(results){
    all = results[0][0];
    res.json({success:true, "all": all});
  });
});

router.put('/iceditgoveg', function (req, res) {
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
      sql="update asset_ic set status="+scname+" where iso_id="+id+"";
      //sql1="INSERT INTO comment_history VALUES ('"+question+"','','Regulatory Compliance','Security Procedure and Policies','"+c+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ASSET-IC "+id+"','"+question+"','Asset management','Information classification','"+scname+"','"+audit+"',NOW())";
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
      sql="update  asset_ic  set comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Asset management','Information classification','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ASSET-IC "+id+"','"+question+"','Asset management','Information classification','"+scname+"','"+audit+"',NOW())";
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
      sql="update  asset_ic  set status="+scname+",comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Asset management','Information classification','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ASSET-IC "+id+"','"+question+"','Asset management','Information classification','"+scname+"','"+audit+"',NOW())";
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
router.get('/icreg_la_tab', function (req, res) {
  sql="SELECT * FROM asset_ic  ORDER BY iso_id ASC ";
  db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true, values:results});
  })
});

router.put('/ichist_reg', function (req, res) {
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
router.get('/icreg_la_tab', function (req, res) {
  sql="SELECT * FROM asset_ic  ORDER BY iso_id ASC ";
  db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true, values:results});
  })
});

///uploadreg_db
router.post("/icuploadreg_db",function(req,res){
  //console.log(req.body);
 //sql="UPDATE `api_sm` SET `upload`='upload/',`filename`='"+req.body.files+"'  WHERE id='"+req.body.id+"'";
 //console.log(sql);
  if(req.body.groupname=="Asset management" && req.body.secpractice=="Information classification")
  {
      //UPDATE `api_sm` SET `upload`='upload/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE id='"+req.body.id+"'
    //  sql="UPDATE `api_sm` SET `upload`='upload/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE id='"+req.body.id+"'";
      //console.log(sql);
      //console.log(sql);
      function doQuery_tab()
      {
          var defered = q.defer();
          db.query("UPDATE `asset_ic` SET `upload`='upload/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE iso_id='"+req.body.id+"'",defered.makeNodeResolver());
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

/***********************************************  ASSET-MH  **********************************/

router.get('/mhalltable',function(req,res){
  function vsamm(){
    var defered = q.defer();
    db.query("SELECT * FROM asset_mh  ORDER BY iso_id ASC",defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([vsamm()]).then(function(results){
    all = results[0][0];
    res.json({success:true, "all": all});
  });
});

router.put('/mheditgoveg', function (req, res) {
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
      sql="update asset_mh set status="+scname+" where iso_id="+id+"";
      //sql1="INSERT INTO comment_history VALUES ('"+question+"','','Regulatory Compliance','Security Procedure and Policies','"+c+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ASSET-MH "+id+"','"+question+"','Asset management','Media handling','"+scname+"','"+audit+"',NOW())";
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
      sql="update  asset_mh  set comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Asset management','Media handling','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ASSET-MH "+id+"','"+question+"','Asset management','Media handling','"+scname+"','"+audit+"',NOW())";
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
      sql="update  asset_mh  set status="+scname+",comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Asset management','Media handling','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ASSET-MH "+id+"','"+question+"','Asset management','Media handling','"+scname+"','"+audit+"',NOW())";
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
router.get('/mhreg_la_tab', function (req, res) {
  sql="SELECT * FROM asset_mh  ORDER BY iso_id ASC ";
  db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true, values:results});
  })
});

router.put('/mhhist_reg', function (req, res) {
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
router.get('/mhreg_la_tab', function (req, res) {
  sql="SELECT * FROM asset_mh  ORDER BY iso_id ASC ";
  db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true, values:results});
  })
});

///uploadreg_db
router.post("/mhuploadreg_db",function(req,res){
  if(req.body.groupname=="Asset management" && req.body.secpractice=="Media handling")
  {

      function doQuery_tab()
      {
          var defered = q.defer();
          db.query("UPDATE `asset_mh` SET `upload`='upload/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE id='"+req.body.id+"'",defered.makeNodeResolver());
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

 /***********************************************  ASSET-RA **********************************/
 router.get('/raalltable',function(req,res){
  function vsamm(){
    var defered = q.defer();
    db.query("SELECT * FROM asset_ra  ORDER BY iso_id ASC",defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([vsamm()]).then(function(results){
    all = results[0][0];
    res.json({success:true, "all": all});
  });
});

router.put('/raeditgoveg', function (req, res) {
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
      sql="update asset_ra set status="+scname+" where iso_id="+id+"";
      //sql1="INSERT INTO comment_history VALUES ('"+question+"','','Regulatory Compliance','Security Procedure and Policies','"+c+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ASSECT-RA "+id+"','"+question+"','Asset management      ','Responibility for assets      ','"+scname+"','"+audit+"',NOW())";
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
      sql="update  asset_ra  set comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Asset management  ','Responibility for assets   ','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ASSECT-RA "+id+"','"+question+"','Asset management      ','Responibility for assets      ','"+scname+"','"+audit+"',NOW())";
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
      sql="update  asset_ra  set status="+scname+",comment='"+req.body.comment+"' where iso_id="+id+"";
      sql1="INSERT INTO comment_history VALUES ('"+question+"','','Asset management  ','Responibility for assets   ','"+req.body.comment+"','"+audit+"',CURRENT_TIMESTAMP,'"+scname+"',"+id+");"
      sql2="Insert into score_history(qoid,qoname,question,groupname, secpractice,score,uname,created) values("+id+",'ASSECT-RA "+id+"','"+question+"','Asset management      ','Responibility for assets      ','"+scname+"','"+audit+"',NOW())";
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
router.get('/rareg_la_tab', function (req, res) {
  sql="SELECT * FROM asset_ra  ORDER BY iso_id ASC ";
  db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true, values:results});
  })
});

router.put('/rahist_reg', function (req, res) {
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
router.get('/rareg_la_tab', function (req, res) {
  sql="SELECT * FROM asset_ra  ORDER BY iso_id ASC ";
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
           res.json({error_code:1,err_desc:err});
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
  sql="SELECT filename FROM `asset_ra` WHERE iso_id='"+req.body.id+"'";
 // console.log(sql);
  db.query(sql,(err,results)=>
  {
      if(err) throw err;
      res.json({success: true,results:results});
  })
});

///uploadreg_db
router.post("/rauploadreg_db",function(req,res){
  if(req.body.groupname=="Asset management  " && req.body.secpractice=="Responibility for assets  ")
  {
      function doQuery_tab()
      {
          var defered = q.defer();
          db.query("UPDATE `asset_ra` SET `upload`='upload/',filename=IF(`filename`!='',concat(filename,', "+req.body.files+"'),filename ),filename=IF(`filename`='',concat(filename,'"+req.body.files+"'),filename ) WHERE id='"+req.body.id+"'",defered.makeNodeResolver());
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
router.get('/dovagraph_ic', function (req, res) {
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
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW()) and  groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
  }
  function k2(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 1 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
  }
  function k3(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 2 DAY) and  groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k4(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 3 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function k5(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 4 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function k6() {
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 5 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k7(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 6 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k8(){
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 7 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k9(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 8 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k10(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 9 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function k11(){


    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 10 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
    function k12(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 11 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k13(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 12 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k14(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 13 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k15(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 14 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k16(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 15 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function k17(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 16 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k18(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 17 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;;
    }
    function k19(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 18 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k20(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 19 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k21(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 20 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k22(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 21 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function k23(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 22 DAY)  and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k24(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 23 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k25(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 24 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k26(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 25 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function k27(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 26 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k28(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 27 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k29(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 28 DAY)  and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k30(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE DATE(created) = DATE(NOW() - INTERVAL 29 DAY) and  groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function k31(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE groupname= 'Asset management' AND MONTH(created) = MONTH(CURRENT_DATE()) AND YEAR(created) = YEAR(CURRENT_DATE())",defered.makeNodeResolver());
      return defered.promise;
    }
    function k32(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE  score = -1 and groupname= 'Asset management' AND MONTH(created) = MONTH(CURRENT_DATE()) AND YEAR(created) = YEAR(CURRENT_DATE())",defered.makeNodeResolver());
      return defered.promise;
    }
    function k33(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE  score = 1 and groupname= 'Asset management' AND MONTH(created) = MONTH(CURRENT_DATE()) AND YEAR(created) = YEAR(CURRENT_DATE())",defered.makeNodeResolver());
      return defered.promise;
    }
    function k34(){
      var defered = q.defer();
      db.query("SELECT sum(score)+10 as count, MONTH(created) FROM score_history WHERE groupname= 'Asset management' AND MONTH(created) = MONTH(CURRENT_DATE())-1 AND YEAR(created) = YEAR(CURRENT_DATE()) ",defered.makeNodeResolver());
      return defered.promise;
    }
    function y1(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW()) and  groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
  }
  function y2(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 1 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
  }
  function y3(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 2 DAY) and  groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y4(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE  score = 1 and DATE(created) = DATE(NOW() - INTERVAL 3 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function y5(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 4 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function y6() {
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 5 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y7(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and  DATE(created) = DATE(NOW() - INTERVAL 6 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y8(){
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 7 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y9(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 8 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y10(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and  DATE(created) = DATE(NOW() - INTERVAL 9 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function y11(){


    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 10 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
    function y12(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 11 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y13(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 12 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y14(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 13 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y15(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and  DATE(created) = DATE(NOW() - INTERVAL 14 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y16(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and  DATE(created) = DATE(NOW() - INTERVAL 15 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function y17(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 16 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y18(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 17 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;;
    }
    function y19(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 18 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y20(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 19 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y21(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 20 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y22(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 21 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function y23(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 22 DAY)  and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y24(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 23 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y25(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 24 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y26(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and  DATE(created) = DATE(NOW() - INTERVAL 25 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function y27(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 26 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y28(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 27 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y29(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = 1 and DATE(created) = DATE(NOW() - INTERVAL 28 DAY)  and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function y30(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE  score = -1 and DATE(created) = DATE(NOW() - INTERVAL 29 DAY) and  groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n1(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW()) and  groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
  }
  function n2(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 1 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
  }
  function n3(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 2 DAY) and  groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n4(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE  score = -1 and DATE(created) = DATE(NOW() - INTERVAL 3 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function n5(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 4 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
    return defered.promise;
  }
  function n6() {
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 5 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n7(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and  DATE(created) = DATE(NOW() - INTERVAL 6 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n8(){
    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 7 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n9(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 8 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n10(){

    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and  DATE(created) = DATE(NOW() - INTERVAL 9 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
  function n11(){


    var defered = q.defer();
    db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 10 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
    return defered.promise;
  }
    function n12(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 11 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n13(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 12 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n14(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 13 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n15(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and  DATE(created) = DATE(NOW() - INTERVAL 14 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n16(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and  DATE(created) = DATE(NOW() - INTERVAL 15 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function n17(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 16 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n18(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 17 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;;
    }
    function n19(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 18 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n20(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 19 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n21(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 20 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n22(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 21 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function n23(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 22 DAY)  and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n24(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 23 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n25(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 24 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n26(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and  DATE(created) = DATE(NOW() - INTERVAL 25 DAY) and groupname= 'Asset management' ",defered.makeNodeResolver());
      return defered.promise;
    }
    function n27(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 26 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n28(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 27 DAY) and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n29(){

      var defered = q.defer();
      db.query("SELECT sum(score) as count  FROM score_history WHERE score = -1 and DATE(created) = DATE(NOW() - INTERVAL 28 DAY)  and groupname= 'Asset management'",defered.makeNodeResolver());
      return defered.promise;
    }
    function n30(){
      var defered = q.defer();
      db.query("SELECT sum(score) as count FROM score_history WHERE  score = -1 and DATE(created) = DATE(NOW() - INTERVAL 29 DAY) and  groupname= 'Asset management'",defered.makeNodeResolver());
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
