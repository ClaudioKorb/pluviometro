const express = require('express');
const app = new express();
let data;

app.get('/update', function(request, response){
  response.sendFile('/serv/src/index.html');
  response.send(request.query.dia + " " + request.query.chuva);
  //response.send(request.query.chuva);
});
app.listen(8180);
