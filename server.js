import express from 'express'
import { bugService } from './services/bug-service.js'

const app = express()

app.get('/', (req, res) => res.send('Hello there'))

app.get('/api/bug', (req, res) => {
    bugService.query()
        .then((bugs) => res.send(bugs))
})

app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    bugService.get(bugId)
        .then((bug) => res.send(bug))
})

app.listen(3030, () => console.log('Server listening on port http://127.0.0.1:3030/'))