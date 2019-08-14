const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
})

client.ping({ requestTimeout: 30000 }, (error) => {
    if (error) {
        console.error('elasticsearch cluster is down!');
    }
    else {
        console.log('Everything is ok');
    }
});

module.exports = {
    //return true if indices exist
    async checkExistIndices(index) {
        return await client.indices.exists({ index: index });
    },

    //create indices
    async createIndices(index) {
        await client.indices.create({
            index: index,
            include_type_name: true,
            body: {
                "mappings": {
                    "training": {
                        "properties": {
                            "id": {
                                "type": 'text'
                            },
                            "entities": {
                                "type": 'object'
                            },
                            "params": {
                                "type": 'text'
                            },
                            "intent": {
                                "type": 'text'
                            },
                            "question": {
                                "type": 'text'
                            },
                            "default_answer": {
                                "type": 'text'
                            },
                            "answer": {
                                "type": 'text'
                            }
                        }
                    }
                }
            }
        }, err => {
            if (err) console.log(err)
            else console.log("Indices Created");
        })
    },
    createIdx(objData, ID) {
        return client.index({
            index: 'chatbot',
            type: 'training',
            id: ID,
            body: JSON.stringify(objData)
        })
            .then((result) => {
                return true;
            })
            .catch(() => {
                return false;
            })
    },

    searchParams(intent, params) {
        if (!Array.isArray(params)) {
            params = params.split(',');
            if (params.length > 1) params.sort();
            params = params.toString();
        };
        if(intent === undefined) return [];
        if(intent===undefined&&params==='') return [];
       
        if (params === '') {   
            return client.search({
                index: 'chatbot',
                type: 'training',
                body: {
                    query: {
                        "match": {
                            "intent": {
                                "query": intent,
                                "operator": "and"
                            }
                        }
                    }
                }


            })
                .then(result => result.hits.hits)
                .catch(err => console.log("ERROR " + err));
        }
       
        return client.search({
            index: 'chatbot',
            type: 'training',
            body: {
                query: {

                    bool: {
                        must: [
                            {
                                "match": {
                                    "intent": {
                                        "query": intent,
                                        "operator": "and"
                                    }
                                }
                            },
                            {
                                "match": {
                                    "params": {
                                        "query": params,
                                        "operator": "and"
                                    }
                                }
                            }
                        ]
                    }

                }
            }


        })
            .then(result => result.hits.hits)
            .catch(err => console.log("ERROR " + err));
    },

    async searchEntities(intent, params, entities) {
        let arrParams = params.split(',');
        let data = await this.searchParams(intent, params);
        for (let i = 0; i < data.length; i++) {
            let Equal = true;
            //compare entities & data[i].entities
            for (let j = 0; j < arrParams.length; j++) {
                if (data[i]._source.entities[arrParams[j]] !== entities[arrParams[j]])
                    Equal = false;
            }
            if (Equal) return [data[i]];
        }
        return [];
    },

    match_all() {
        return client.search({
            index: 'chatbot',
            type: 'training',
            body: {
                "size": 100,
                "query": { "match_all": {} }
            }
        })
            .then(result => result.hits.hits)
            .catch(err => console.log("ERROR+" + err))
    },

    async deleteQuestion(id) {
        return await client.delete({
            index: 'chatbot',
            type: 'training',
            id: id
        }).then(result => true)
            .catch(err => {
                console.log(err);
                return false;
            });
    },

    async existsIntent(intent) {
        return await client.search({
            index: 'chatbot',
            type: 'training',
            body: {
                query: {
                    match: {
                        "intent": intent
                    }

                }


            }
        })
            .then(result => result.hits.hits)
            .catch(err => console.log(err))
    },

    async existEntity(entity) {
        return await client.search({
            index: 'chatbot',
            type: 'training',
            body: {
                query: {
                    "match": {
                        "params": {
                            "query": entity,
                            "operator": "and"
                        }
                    }
                }
            }


        })
            .then(result => result.hits.hits)
            .catch(err => console.log("ERROR " + err));
    }
}

