import { utilService } from "./util-service.js"

let bugs
utilService.readJSONFile('./data/bugs.json')
    .then(data => bugs = data)


export const bugService = {
    query,
}

function query(){
    return Promise.resolve(bugs)
}