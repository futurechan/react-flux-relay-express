'use strict'

import express from 'express'
import path from 'path'

let app = express()

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => res.send('hello'))

app.listen(3000, () => console.log('listening'));
