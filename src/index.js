const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')



app.get('/totalRecovered',(req,res) => {
    connection.aggregate(([
        {$group:
            {_id: null,
                totalRecovered: { $sum:"$recovered"} 
            }
        }  
            
    ]))
    .then((result)=>{
            
            let response = {
                            "data":
                            {
                                "_id":"total",
                                "recovered" : result[0].totalRecovered
                            }
                        }

            res.json(response);
    })
    .catch((err)=>{
        res.status(404).send(err);
    })

})

app.get('/totalActive',(req,res) => {

    connection.aggregate(([
        {$group:
            {
                _id: null,
                totalActive: {$sum:{$subtract:["$infected","$recovered"]}}}  
            
        }
    ]))
    .then((result)=>{

            let response = {
                            "data":
                            {
                                "_id":"total",
                                "active" : result[0].totalActive
                            }
                        }


            res.json(response);
    })
    .catch((err)=>{
        res.status(404).send(err);
    })


})

app.get('/totalDeath',(req,res) => {
    connection.aggregate(([
        {$group:
            {
                _id:null,
                totalDeath: {$sum : "$death"} }  
            
        }
    ]))
    .then((result)=>{

            // let totalDeath = result.reduce((result,death)=>{
            //     return result + death.total;
            // },0);
            let response = {
                            "data":
                            {
                                "_id":"total",
                                "death" : result[0].totalDeath
                            }
                        }

            res.json(response);
    })
    .catch((err)=>{
        res.status(404).send(err);
    })

})

// app.get('/hotspotStates',(req,res) => {

//         connection.aggregate(([
//             {$project: 
                
//                 {
//                     state : 1,
//                     rate: 
//                     { $round : 
//                         [{ $divide: 
//                             [ {$subtract: ["$infected","$recovered"]}, "$infected" ] 
//                         },5]
//                     }
//                 }
                
//             },
//             {
//                 $match: { rate: {$gt : 0.1} }
//             }
//         ]))
//         .then((result)=>{
//                 //console.log(result);
//                 let hotspots = result.map((hotspot)=>{
//                     return {"state": hotspot.state,"rate": hotspot.rate}
//                 })
//                 let response = {
//                     "data": hotspots
//                 }
    
//                 res.json(response);
//         })
//         .catch((err)=>{
//             res.status(404).send(err);
//         })

//     })


// app.get('/healthyStates',(req,res) => {

//     connection.aggregate(([
//         {$project: 
            
//                 {state : 1,
//                     mortality: 
//                     { $round : 
//                         [
//                             { $divide:[ "$death","$infected" ] },5
//                         ]
//                     }
//                 }
            
//         },{
//             $match: { mortality: {$lt : 0.005} }
//         }
//     ]))
//     .then((result)=>{
            
//             let healthyStates = result.map((healthyState)=>{
//                 return {"state": healthyState.state,"mortality": healthyState.mortality}
//             })
//             let response = {
//                 "data": healthyStates
//             }

//             res.json(response);
//     })
//     .catch((err)=>{
//         res.status(404).send(err);
//     })

// })



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;