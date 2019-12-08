const express = require('express');
const app = new express();
const admin = require('firebase-admin');
var id_Sensor;
var data_Sensor;
var nivel_Sensor;

var validIds = ['ARA00', 'ARA01', 'ARA02', 'ARA03', 'TESTE01'];


var serviceAccount = require("../auth/admin.json");

var fire_app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://color-classifier-7f089.firebaseio.com"
});
var db = admin.database();

app.get('/view', function(request, response){
  response.sendFile('/home/pluviometro/pluviometro/src/table.html');
});

app.get('/date', function(request, response){
  var novaHora = new Date();
  response.send(JSON.stringfy(novaHora.getHours()));
});

app.get('/update', function(request, response){
  id_Sensor = request.query.id;
  nivel_Sensor = request.query.chuva;
  data_Sensor = request.query.dia;
  console.log("Query request: " + request.query.id + " " + request.query.chuva + " " + request.query.dia);
  if(isItIn(validIds, id_Sensor)){
    response.sendFile('/home/pluviometro/pluviometro/src/index.html');
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
  }else{
    response.send("SAI DO MEU SERVIDOR SEU OTARIO");
  }


});

isItIn = function(arr, value){
  for(let i = 0; i < arr.length; i++){
    if(arr[i] == value)return true;
  }
  return false;
}

app.listen(8180);
