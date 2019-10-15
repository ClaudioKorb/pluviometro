const express = require('express');
const app = new express();
const admin = require('firebase-admin');
var id_Sensor;
var data_Sensor;
var nivel_Sensor;


var serviceAccount = require("../auth/admin.json");

var fire_app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://color-classifier-7f089.firebaseio.com"
});
var db = admin.database();

app.get('/view', function(request, response){
  response.sendFile('home/pluviometro/pluviometro/src/table.html');
});


app.get('/update', function(request, response){
  response.sendFile('home/pluviometro/pluviometro/src/index.html');
  id_Sensor = request.query.id;
  nivel_Sensor = request.query.chuva;
  data_Sensor = request.query.dia;
  var ref = db.ref("dados-chuva");
  var agora = new Date();

  ref.push(
    {
        Data: agora.getTime(),
        Id: id_Sensor,
        Nivel: nivel_Sensor
    },
        function(error){
        if(error){
          console.log("Data could not be saved: " +error);
        }else{
          console.log("Data saved successfully.");
        }
  });


});

app.listen(8180);
