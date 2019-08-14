const express = require('express');
const businessRoutes = express.Router();
const controller = require('../method/controller')
const Business = require('../model/trainingModel');
const request = require('request');

// elastic Search
// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({ node: 'http://localhost:9200' })
// Require Business model in our routes module
// Defined store route

controller.createTable('chatbot');
///////////////////////////////////////////////////////////////////////////////////////////
//Router wit elasticSearch
businessRoutes.route('/add').post(async (req, res) => {
    let reqData = req.body;
    let witBot = await controller.trainingBot(reqData);
    console.log(witBot)
    if (witBot.sent) {
        let bool = await controller.createIndex(reqData);
        if (bool) res.status(200).json({ 'status': 'true', 'message': 'business in added successfully' })
        else res.status(400).json({ 'status': 'false', 'message': 'business not added successfully' })
    }
    else {
        res.status(500).json({ 'status': 'false', 'message': 'can not send data to wit.ai' })
    }
}),

//get answer from enity and intent from client
businessRoutes.route('/getAnswer').post(async (req,res)=>{
    let intent = req.body.intent;
    let objEntity = req.body.objEntity;
    let data = await controller.detectQuestionFromElastic(intent,objEntity);
    res.json(data);
}),

businessRoutes.route('/test').get(async (req,res)=>{
    let a = await controller.getQuestion();
    res.json(a);
})

///////////////////////////////////////////////////////////////////////////////////////////////

// businessRoutes.route('/add').post(async function (req, res) {
//     let reqData = new Business(req.body);
//     let isSuccess = await controller.trainingBot(reqData);
//     if (isSuccess.sent) {
//         // luu vao database
//         controller.deleteDocumentDB(reqData.question);
//         reqData.save()
//             .then(() => res.status(200).json({ 'status': 'true', 'message': 'business in added successfully' }))
//             .catch(() => res.status(400).json({ 'status': 'false', 'message': 'business not added successfully' }))
//     }
//     else {
//         res.status(400).json({ 'status': 'false', 'message': 'can not send data to wit.ai' })
//     }
// })

//recieve message and bot reply
businessRoutes.route('/send').post(async (req, res) => {
    let data = await controller.reciveToReply(req.body.question);
    res.json(data);
})

// Gui intents va entities len client
businessRoutes.route('/').get(async function (req, res) {
    let data = await controller.sendIntentEntityToClient();
    res.json(data);
});

//gui {entity,intent,answer,default answer} khi nhap cau hoi
businessRoutes.route('/getEntity').post(async (req, res) => {
    let data = await controller.detectQuestionFromWit(req.body.question);
    res.json(data);
})

//Create Entity on wit.ai
businessRoutes.route('/createEntity').post(async (req, res) => {
    let id = req.body.id;
    let data = await controller.createEntity(id);
    res.json(data);
})

//Delete Entity on wit.ai
businessRoutes.route('/deleteEntity').delete(async (req, res) => {
    let id = req.body.id;
    let data = await controller.deleteEntity(id);
    res.json(data);
})

businessRoutes.route('/createIntent').post(async (req, res) => {

    let id = req.body.values;
    let data = await controller.createIntent(id);
    res.json(data);
})
//test
businessRoutes.route('/deleteIntent').delete(async (req, res) => {
    //let id = Object.keys(req.body)[0];
    let id = req.body.values;
    let data = await controller.deleteIntent(id);
    //console.log(data);
    res.json(data);
})

businessRoutes.route('/samples').get(async (req, res) => {
    let data = await controller.getQuestion();
    res.json(data);
})

businessRoutes.route('/deleteSamples').delete(async (req,res)=>{
    let data = await controller.deleteSamples(req.body.questions);
    res.json(data);
})
// businessRoutes.route('/deleteSamples').delete(async (req, res) => {
//     let data = await controller.deleteSamples(req.body.questions);
//     res.json(data);
// })

businessRoutes.route('/webhook').get((req, res) => {
    if (req.query['hub.verify_token'] === '12345678') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

businessRoutes.route('/webhook').post(async function (req, res) {
    var entries = req.body.entry;
    for (var entry of entries) {
        var messaging = entry.messaging;
        for (var message of messaging) {
            var senderId = message.sender.id;
            if (message.message) {
                // If user send text
                if (message.message.text) {
                    var text = message.message.text;

                    let tempres = await controller.reciveToReply(text);
                    sendMessage(senderId, tempres);
                }
            }
        }
    }

    res.status(200).send("OK");
});

function sendMessage(senderId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: process.env.FB_TOKEN, //"EAAGvgiCMDAsBAII22Ub9d6fZC16GmKZApCxy3Y6UhN3iDrcEFo6atMrXtSvqUPtnGzcJ4Ai5UsHIH5gduJjAJrVTEjlUOmOsjevSpRbu5dXilNrVuZBkelnXzW5uVfmCtqQTjrTc5iMTBejnE727UiPXL2EceZCxPRwTpAi8Bk1SCbetIaSD4qihRwysMBUZD",
        },
        method: 'POST',
        json: {
            recipient: {
                id: senderId
            },
            message: {
                text: message
            },
        }
    });
}
// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Business.findById(id, function (err, business) {
        res.json(business);
    });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findById(req.params.id, function (err, business) {
        if (!business)
            res.status(404).send("data is not found");
        else {
            business.fullname = req.body.fullname;
            business.age = req.body.age;
            business.email = req.body.email;

            business.save().then(business => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({ _id: req.params.id }, function (err, business) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;

// await elastic.indices.create({
//     index: 'chatbot2',
//     include_type_name: true,
//     body: {
//         "mappings": {
//             "training": {
//                 "properties": {
//                     "id": {
//                         "type": 'text'
//                     },
//                     "entities": {
//                         "type": 'text'
//                     },
//                     "params": {
//                         "type": 'text'
//                     },
//                     "intent": {
//                         "type": 'text'
//                     },
//                     "question": {
//                         "type": 'text'
//                     },
//                     "default_answer": {
//                         "type": 'keyword'
//                     },
//                     "answer": {
//                         "type": 'keyword'
//                     }
//                 }
//             }
//         }
//     }
// }
// )
//     }