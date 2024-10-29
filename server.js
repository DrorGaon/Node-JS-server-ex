import express from 'express'
import { utilService } from './util-service.js'

const app = express()

app.get('/', (req, res) => res.send('Hello there'))

app.get('/api/bug', (req, res) => {
    utilService.readJSONFile('./data/bugs.json')
        .then((data) => res.send(data))
})

app.listen(3030, () => console.log('Server listening on port http://127.0.0.1:3030/'))