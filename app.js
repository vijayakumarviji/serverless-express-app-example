const express = require('express');
const Serverless = require('@vendia/serverless-express');
const serverlessExpress = require('@vendia/serverless-express');

const app = express();
const ServerPort = 3000;

app.get('/health', (req, res)=>{
    res.send({
        message: 'OK'
    })
});

app.get('/getinfo', (req, res)=>{
    res.send({
        message: 'I am from AWS Lambda'
    })
});

if(process.env.APP_ENV === 'LOCAL') {
    app.listen(ServerPort, () => {
        console.log(`Hey, I am running here 127.0.0.1:${ServerPort}`);
    });
} else {
    const server = Serverless.createServer(app);
    module.exports.handler = (event, context) => {
        Serverless.proxy(server, event, context);
    }
}
