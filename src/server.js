const express = require('express');
const app = new express();
const admin = require('firebase-admin');
const axios = require('axios');
var id_Sensor;
var data_Sensor;
var nivel_Sensor;
var timeToSend = {
  hours: 6,
  minutes: 0,
  seconds: 0
};
var validIds = ['ARA00', 'ARA01', 'ARA02', 'ARA03', 'TESTE01'];


var serviceAccount = require("../auth/admin.json");

var fire_app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://color-classifier-7f089.firebaseio.com"
});
var db = admin.database();

//Local
//app.get('/view', function(request, response){
//  response.sendFile('/home/claudiokorb/Documents/pluviometro/pluviometro/src/table.html');

//SERVER
app.get('/view', function(request, response){
  response.sendFile('/home/pluviometro/pluviometro/src/table.html');
});

app.get('/date', function(request, response){
  let currentTime;
  axios.get('http://worldclockapi.com/api/json/est/now')
    .then(function(response){
      console.log(response.data);
      currentTime = response;
    });


});

app.get('/update', function(request, response){
  id_Sensor = request.query.id;
  nivel_Sensor = request.query.chuva;
  data_Sensor = request.query.dia;
  console.log("Query request: " + request.query.id + " " + request.query.chuva + " " + request.query.dia);
  if(isItIn(validIds, id_Sensor)){
    //LOCAL
    //response.sendFile('/home/claudiokorb/Documents/pluviometro/pluviometro/src/index.html');
    //SERVER
    response.sendFile('/home/pluviometro/pluviometro/src/index.html');

    var ref = db.ref("dados-chuva");
    var agora = new Date();
    ref.push(
      {
          Data: {
            Dia: agora.getDate(),
            Mes: agora.getMonth() + 1,
            Ano: agora.getFullYear(),
            Hora: agora.getHours(),
            Minuto: agora.getMinutes(),
            Segundo: agora.getSeconds()
          },

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
