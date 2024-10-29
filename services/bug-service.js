import { utilService } from "./util-service.js"

let bugs
utilService.readJSONFile('./data/bugs.json')
    .then(data => bugs = data)


export const bugService = {
    query,
    get,
    save,
    remove,
}

function query(){
    return Promise.resolve(bugs)
}

function get(bugId){
    const bug = bugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function save(bugToSave){
    if(bugToSave._id){
        const bugIdx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs.splice(bugIdx, 1, bugToSave)
    } else {
        bugToSave._id = utilService.makeId()
        bugToSave.createdAt = Date.now()
        bugs.unshift(bugToSave)
    }

    return _saveToFile().then(() => bugToSave)
}

function remove(bugId){
    const bugIdx = bugs.findIndex(bug => bug._id === bugId)
    if(bugIdx < 0) return Promise.reject(`Cannot find bug with id ${bugId}`)
    bugs.splice(bugIdx, 1)
    return _saveToFile().then(() => bugs)
}

function _saveToFile(){
    return utilService.writeToJSONFile('./data/bugs.json', bugs)
}