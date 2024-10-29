import express from 'express'
import { bugService } from './services/bug-service.js'
import { loggerService } from './services/logger.service.js'

const app = express()

app.get('/', (req, res) => res.send('Hello there'))

app.get('/api/bug', (req, res) => {
    bugService.query()
        .then((bugs) => res.send(bugs))
        .catch(err => {
            loggerService.error(err)
            res.status(500).send('Problem getting bugs')
        })
})

app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    bugService.get(bugId)
        .then((bug) => res.send(bug))
        .catch(err => {
            loggerService.error(err)
            res.status(500).send('Problem getting bug')
        })
})

app.listen(3030, () => loggerService.info('Server listening on port http://127.0.0.1:3030/'))