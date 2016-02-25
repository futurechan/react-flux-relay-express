'use strict'

import express from 'express'
import path from 'path'
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {MongoClient} from 'mongodb';

let app = express()

app.use(express.static(path.join(__dirname,'public')));

(async () => {
  let db = await MongoClient.connect(process.env.MONGO_URL)

  app.use('/graphql', GraphQLHTTP({
    schema: schema(db),
    graphiql: true
  }))

  app.listen(3000, () => console.log('listening on port 3000'));
})();
