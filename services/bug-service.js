import { utilService } from "./util-service.js"

let bugs
utilService.readJSONFile('./data/bugs.json')
    .then(data => bugs = data)


export const bugService = {
    query,
    get,
}

function query(){
    return Promise.resolve(bugs)
}

function get(bugId){
    const bug = bugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}