const BASE_URL = '/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getFilterFromSearchParams,
}

function query(filterBy) {
    return axios
        .get(BASE_URL)
        .then(res => res.data)
        .then(bugs => {
            if(filterBy.text){
                const regExp = new RegExp(filterBy.text, 'i')
                bugs = bugs.filter(bug => (regExp.test(bug.title) || regExp.test(bug.description)))
            }
            if (filterBy.minSeverity){
                bugs = bugs.filter(bug => bug.severity >= filterBy.minSeverity)
            }
            return bugs
        })
        .catch(err => {throw err.response.data})
}
function getById(bugId) {
    return axios
        .get(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => {throw err.response.data})
}

function remove(bugId) {
    return axios
        .get(BASE_URL + bugId + '/remove')
        .then(res => res.data)
        .catch(err => {throw err.response.data})
}

function save(bug) {
    const url = BASE_URL + 'save'
    let queryParams = `?title=${bug.title}&description=${bug.description}&severity=${bug.severity}`
    if (bug._id) queryParams += `&_id=${bug._id}`
    return axios
        .get(url + queryParams)
        .then(res => res.data) 
        .catch(err => {throw err.response.data})
}

function getFilterFromSearchParams(){
    return {
        text: '',
        minSeverity: 0,
    }
}