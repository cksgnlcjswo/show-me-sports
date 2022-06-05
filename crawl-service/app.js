import express from 'express'
import {registerWithEureka} from './eureka.js';

const app = express();

const server = app.listen(0,()=>{
    console.log("sport-service is running on port ",server.address().port);
});

app.get('/', (req,res,next) => {
    res.send("hellw wolrd!");
});

app.get('/health_check', (req,res,next) => {
    res.send("status good");
});

registerWithEureka('sports-service',server.address.port);
