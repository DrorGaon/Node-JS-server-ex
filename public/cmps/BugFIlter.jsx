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
    
    function handleRadioButtons({ target }){
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, sortBy: target.value }))
    }

    function onSubmit(ev){
        ev.preventDefault()
    }

    return (
        <React.Fragment>
            <h1>Filter bugs</h1>
            <form onSubmit={onSubmit} className="bug-filter">
                <label htmlFor="text">By title or description</label>
                <input onChange={handleChange} value={filterBy.text || ''} type="text" name="text" id="text" />
                <label htmlFor="minSeverity">By minimum severity</label>
                <input onChange={handleChange} value={filterBy.minSeverity || 1} type="range" name="minSeverity" id="minSeverity" min={1} max={5} step={1} />
            </form>
            <h2 className="filter-severity">{filterBy.minSeverity || 1}</h2>
            <section onChange={handleRadioButtons} className="sort-by">
                <h2>Sort bugs </h2>
                <input type="radio" id="title" value='title' name="sortBy" />
                <label htmlFor="title">By title</label>
                <input type="radio" id="severity" value='severity' name="sortBy" />
                <label htmlFor="severity">By severity</label>
                <input type="radio" id="createdAt" value='createdAt' name="sortBy" />
                <label htmlFor="createdAt">By creation time</label>
            </section>
        </React.Fragment>
    )
}