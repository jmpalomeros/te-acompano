import {useState} from 'react'

function Search(props) {

  const[searchInput, setSearchInput] = useState("")
  const [searchTypeServiceInput, setSearchTypeServiceInput] = useState("")

  const handleServiceChange = (event) => {

    setSearchInput(event.target.value)
    props.list(event.target.value)
  }

  const handleTypeServiceChange = (event) =>{

    setSearchTypeServiceInput(event.target.value)
    props.typeService(event.target.value)
  }




  return (
    <div>
    
      <label htmlFor="search">Buscar servicios disponibles </label>
      <input value={searchInput} type="text" placeholder='Buscar servicios' onChange={handleServiceChange}/>
      

      
      <label htmlFor="typeService">Buscar por tipo de servicio </label>
      <select name="typeService" onChange={handleTypeServiceChange}>
            <option value="">Elige una opción</option>
            <option value="Ocio">Ocio</option>
            <option value="Ayuda">Ayuda</option>
            <option value="Otros">Otros</option>
            </select>
      {/* <input value={searchInput} type="text" placeholder='Buscar servicios' onChange={handleChange}/> */}

    </div>
  )
}

export default Search