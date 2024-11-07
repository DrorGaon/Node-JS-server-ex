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
        .delete(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => {throw err.response.data})
}

function save(bug) {
    if (bug._id) {
        return axios
            .put(BASE_URL + bug._id, bug)
            .then(res => res.data) 
            .catch(err => {throw err.response.data})
    } else {
        return axios
        .post(BASE_URL, bug)
        .then(res => res.data) 
        .catch(err => {throw err.response.data})
    }
}

function getFilterFromSearchParams(searchParams){
    
    const text = searchParams.get('text') || ''
    const minSeverity = searchParams.get('minSeverity') || 0

    return {
        text,
        minSeverity,
    }
}