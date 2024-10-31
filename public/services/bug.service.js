
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'

_createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
}

function query() {
    return storageService.query(STORAGE_KEY)
}
function getById(bugId) {
    return storageService.get(STORAGE_KEY, bugId)
}

function remove(bugId) {
    return storageService.remove(STORAGE_KEY, bugId)
}

function save(bug) {
    if (bug._id) {
        return storageService.put(STORAGE_KEY, bug)
    } else {
        return storageService.post(STORAGE_KEY, bug)
    }
}

function _createBugs() {
    let bugs = utilService.loadFromStorage(STORAGE_KEY)
    if (!bugs || !bugs.length) {
        bugs = [
            {
                title: 'Infinite Loop Detected',
                severity: 4,
                _id: '1NF1N1T3',
                description: 'Proccess went into infinite loop and was killed.',
            },
            {
                title: 'Keyboard Not Found',
                severity: 3,
                _id: 'K3YB0RD',
                description: 'User has no keyboard.',
            },
            {
                title: '404 Coffee Not Found',
                severity: 2,
                _id: 'C0FF33',
                description: 'Developer doesn\'t have coffee, major delays expected.',
            },
            {
                title: 'Unexpected Response',
                severity: 1,
                _id: 'G0053',
                description: 'What do you mean? omg this is so unexpected.',
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, bugs)
    }
}
