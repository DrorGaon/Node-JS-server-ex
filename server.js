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
        _id: req.query._id || '',
        title: req.query.title || '',
        description: req.query.description || '',
        severity: +req.query.severity || 0,
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
    const second = 1000
    let visitedBugIds = req.cookies.visitedCount || []

    bugService.get(bugId)
        .then((bug) => {
            if (!visitedBugIds.includes(bug._id)) visitedBugIds.push(bug._id)
            if (visitedBugIds.length > 3) return res.status(401).send('Wait a sec')
            res.cookie('visitedCount', visitedBugIds, {maxAge: 7 * second})
            res.send(bug)
        })
        .catch(err => {
            loggerService.error(err)
            res.status(500).send('Problem getting bug')
        })
})

app.delete('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    bugService.remove(bugId)
        .then((bugs) => res.send(bugs))
        .catch(err => {
            loggerService.error(err)
            res.status(500).send('Problem removing bug')
        })
}) 

app.listen(3030, () => loggerService.info('Server listening on port http://127.0.0.1:3030/'))