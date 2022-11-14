import {useState} from 'react'

function Search(props) {

  const[searchInput, setSearchInput] = useState("")

  const handleChange = (event) => {

    setSearchInput(event.target.value)
    props.list(event.target.value)
  }
  return (

    <div>
    <label htmlFor="search">Search</label>
    <input value={searchInput} type="text" placeholder='Busca los servicios disponibles' onChange={handleChange}/>
    </div>
  )
}

export default Search