import express from 'express';
import {registerWithEureka} from './eureka.js';
import sportRouter from './crawler.js';

const app = express();

app.use(express.json());
app.use('/',sportRouter);

const server = app.listen(0,()=>{
    console.log("sport-service is running on port ",server.address().port);
});

registerWithEureka('sport-service',server.address().port);
