import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from '../cmps/BugFIlter.jsx'
import { utilService } from '../services/util.service.js'

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function BugIndex() {
    const [bugs, setBugs] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bugService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        loadBugs()
        setSearchParams(utilService.getTruthyValues(filterBy))
    }, [filterBy])

    function loadBugs() {
        bugService.query(filterBy)
            .then(setBugs)
            .catch(err => {
                showErrorMsg('Problem loading bugs')
                console.log(err)
            })
    }

    function onSetFilterBy(filterBy){
        setFilterBy(filterBy)
    }

    function onRemoveBug(bugId) {
        bugService
            .remove(bugId)
            .then(() => {
                console.log('Deleted Succesfully!')
                const bugsToUpdate = bugs.filter((bug) => bug._id !== bugId)
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug removed')
            })
            .catch((err) => {
                console.log('Error from onRemoveBug ->', err)
                showErrorMsg('Cannot remove bug')
            })
    }

    function onAddBug() {
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity?'),
            description: prompt('Bug description?')
        }
        bugService
            .save(bug)
            .then((savedBug) => {
                console.log('Added Bug', savedBug)
                setBugs([savedBug, ...bugs])
                showSuccessMsg('Bug added')
            })
            .catch((err) => {
                console.log('Error from onAddBug ->', err)
                showErrorMsg('Cannot add bug')
            })
    }

    function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        bugService
            .save(bugToSave)
            .then((savedBug) => {
                console.log('Updated Bug:', savedBug)
                const bugsToUpdate = bugs.map((currBug) =>
                    currBug._id === savedBug._id ? savedBug : currBug
                )
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug updated')
            })
            .catch((err) => {
                console.log('Error from onEditBug ->', err)
                showErrorMsg('Cannot update bug')
            })
    }

    return (
        <main>
            <section className='info-actions'>
                <h3>Bugs App</h3>
                <BugFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
                <button onClick={onAddBug}>Add Bug ⛐</button>
            </section>
            <main>
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
            </main>
        </main>
    )
}
