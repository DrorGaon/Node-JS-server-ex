import express from 'express'
import { bugService } from './services/bug-service.js'
import { loggerService } from './services/logger.service.js'
import cookieParser from 'cookie-parser'
import { userService } from './services/user.service.js'

const app = express()

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

app.get('/api/bug', (req, res) => {
    
    const filterBy = {
        text: req.query.text || '',
        minSeverity: req.query.minSeverity || 0,
        sortBy: req.query.sortBy || ''
    }

    bugService.query(filterBy)
        .then((bugs) => res.send(bugs))
        .catch(err => {
            loggerService.error(err)
            res.status(500).send('Problem getting bugs')
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

app.post('/api/bug/', (req, res) => {

    const bugToSave = req.body

    bugService.save(bugToSave)
        .then((bug) => res.send(bug))
        .catch(err => {
            loggerService.error(err)
            res.status(500).send('Problem adding bug')
        })
})

app.put('/api/bug/:bugId', (req, res) => {

    const bugToSave = req.body

    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
        .catch((err) => {
            loggerService.error('Cannot update bug', err)
            res.status(400).send('Cannot update bug', err)
        })
})

app.post('/api/auth/signup', (req, res) => {
    const credentials = req.body

    userService.save(credentials)
        .then(user => {
            res.cookie = ('loginToken',userService.getLoginToken(user))
            res.send(user)
        })
        .catch(err => res.status(400).send('Cannot sign up', err))
})

app.post('/api/auth/login', (req, res) => {
    const credentials = req.body

    userService.checkLogin(credentials)
        .then(user => {
            res.cookie = ('loginToken',userService.getLoginToken(user))
            res.send(user)
        })
        .catch(err => res.status(400).send('Cannot log in', err))
})

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie()
    res.send('logged out')
})

app.listen(3030, () => loggerService.info('Server listening on port http://127.0.0.1:3030/'))