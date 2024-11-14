import { utilService } from "./util-service.js"
import Cryptr from "cryptr"

const cryptr = new Cryptr(process.env.SECRET1 || 'bugs-bunny')

let users
utilService.readJSONFile('./data/users.json')
    .then(data => users = data)

export const userService = {
    save,
    getLoginToken,
}

function save(user){
    user._id = utilService.makeId()
    users.push(user)

    return _saveToFile()    
        .then(() => ({
            _id: user._id,
            fullname: user.fullname,
        }))
}

function getLoginToken(user){
    const userStr = JSON.stringify(user)
    const userToken = cryptr.encrypt(userStr)
    return userToken
}

function _saveToFile(){
    return utilService.writeToJSONFile('./data/users.json', users)
}