import express from 'express'

const app = express()

app.get('/', (req, res) => res.send('Hello there'))

app.listen(3030, () => console.log('Server listening on port http://127.0.0.1:3030/'))