'use strict'

import fs from 'fs';
import express from 'express'
import path from 'path'
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {MongoClient} from 'mongodb';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities'

let app = express()

app.use(express.static(path.join(__dirname,'public')));

(async () => {

  try {
    let db = await MongoClient.connect(process.env.MONGO_URL)

    let schema = Schema(db)

    app.use('/graphql', GraphQLHTTP({
      schema,
      graphiql: true
    }))

    app.listen(3000, () => console.log('listening on port 3000'));

    let json = await graphql(schema, introspectionQuery);

    fs.writeFile(
      path.join(__dirname, './data/schema.json'),
      JSON.stringify(json, null, 2),
      err => {
        if(err) throw err;

        console.log('JSON schema created');
      });
  }catch(ex){
    console.log(ex)
  }
})();
