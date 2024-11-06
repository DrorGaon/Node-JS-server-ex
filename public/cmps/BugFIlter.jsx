const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilterBy }){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    
    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
    
        switch (target.type) {
          case 'number':
          case 'range':
            value = +value
            break
    
          case 'checkbox':
            value = target.checked
            break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
      }
    
    function onSubmit(ev){
        ev.preventDefault()
    }

    return (
        <React.Fragment>
            <h1>Filter</h1>
            <form onSubmit={onSubmit} className="bug-filter">
                <label htmlFor="text">By title or description</label>
                <input onChange={handleChange} value={filterBy.text || ''} type="text" name="text" id="text" />
                <label htmlFor="minSeverity">By minimum severity</label>
                <input onChange={handleChange} value={filterBy.minSeverity || 1} type="range" name="minSeverity" id="minSeverity" min={1} max={5} step={1} />
            </form>
            <h2 className="filter-severity">{filterBy.minSeverity || 1}</h2>
        </React.Fragment>
    )
}