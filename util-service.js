import fs from 'fs'

export const utilService = {
    readJSONFile,
    writeToJSONFile
}

function readJSONFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) reject(err)
            else resolve(JSON.parse(data))
        })
    })
}

function writeToJSONFile(path, data) {
    return new Promise((resolve, reject) => {
        data = JSON.stringify(data)
        fs.writeFile(path, data, err => {
            if (err) reject(err)
            else resolve()
        })
    })
}