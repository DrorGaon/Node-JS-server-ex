import express from 'express'
import { bugService } from './services/bug-service.js'
import { loggerService } from './services/logger.service.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.static('public'))
app.use(cookieParser())

app.get('/api/bug', (req, res) => {
    bugService.query()
        .then((bugs) => res.send(bugs))
        .catch(err => {
            loggerService.error(err)
            res.status(500).send('Problem getting bugs')
        })
})

app.get('/api/bug/save', (req, res) => {
    
    const bugToSave = {
        _id: req.query._id,
        title: req.query.title,
        description: req.query.description,
        severity: req.query.severity,
    }

    bugService.save(bugToSave)
        .then((bug) => res.send(bug))
        .catch(err => {
            loggerService.error(err)
            res.status(500).send('Problem saving bug')
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

app.get('/api/bug/:bugId/remove', (req, res) => {
    const { bugId } = req.params
    bugService.remove(bugId)
        .then((bugs) => res.send(bugs))
        .catch(err => {
            loggerService.error(err)
            res.status(500).send('Problem removing bug')
        })
})

app.listen(3030, () => loggerService.info('Server listening on port http://127.0.0.1:3030/'))