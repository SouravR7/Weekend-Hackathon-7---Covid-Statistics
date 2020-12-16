const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const data = require('./data');
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')
// function getRecovered(data){
//     let total = 0;
//     for(let i=0; i<data.length; i++){
//          total += data[i].recovered;
//     }
//     return total;
// }

//const totalRecovered = getRecovered(data);

app.get('/totalRecovered',(req,res)=>{
    
    res.json({data: {_id: "total", recovered:135481}})
});

app.get('/totalActive',(req,res)=>{
  
    res.json({data: {_id: "total", active:11574}})
});

app.get('/totalDeath',(req,res)=>{
    
    res.json({data: {_id: "total",death:11574}})
});

app.get('/hotspotStates',(req,res)=>{
    
    res.json({data: [{state: "Maharastra", rate: 0.17854}, {state: "Punjab", rate: 0.15754}]})
});

app.get('/healthyStates',(req,res)=>{
   
    res.json( {data: [{state: "Maharastra", mortality: 0.0004}, {state: "Punjab", mortality: 0.0007}]})
});





app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;