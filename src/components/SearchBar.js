import React , { useContext, useState }from 'react'
import { SearchContext } from '../context/SearchContext'

function SearchBar() {
    const { term, handleSearch } = useContext(SearchContext)

    // Declaring style variable
    const styledButton = {
        fontSize: '25px',
        fontWeight: 'bold',
        margin: '5px',
        padding: '10px'
    }

    const styledInput = {
        fontSize: '25px',
        fontWeight: 'bold',
        margin: '5px',
        padding: '10px'
    }

    return(
        <form>
            <input style= { styledInput } ref={ term } type="text" placeholder="Search Here" />
            <button style={ styledButton } onClick={(e) => handleSearch(e, term.current.value)}>Submit</button>
        </form>
    )
}

export default SearchBar