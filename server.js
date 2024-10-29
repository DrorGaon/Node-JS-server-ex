import express from 'express'
import { bugService } from './services/bug-service.js'

const app = express()

app.get('/', (req, res) => res.send('Hello there'))

app.get('/api/bug', (req, res) => {
    bugService.query()
        .then((data) => res.send(data))
})

app.listen(3030, () => console.log('Server listening on port http://127.0.0.1:3030/'))