import {useState, useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import {editUserService} from "../service/user.services"
import {getUserDetailsService} from "../service/user.services"



function EditProfile() {

  const { authenticaUser, user} = useContext(AuthContext);
  const navigate = useNavigate()

  const [ firstNameInput, setFirstNameInput ] = useState("")
  const [ lastNameInput, setLastNameInput ] = useState("")
  const [ emailInput, setEmailInput ] = useState("")
 const [ passwordInput, setPasswordInput ] = useState("")
  const [ avatarInput, setAvatarInput ] = useState("")
  const [ ageInput, setAgeInput ] = useState("")
  const [ cityInput, setCityInput ] = useState("")

  const [errorMessage, setErrorMessage] = useState("")

useEffect(() => {
getData()
}, [])

  const getData = async () => {

    try {

      const response = await getUserDetailsService(user._id)
      setFirstNameInput(response.data.firstName)
      setLastNameInput(response.data.lastName)
      setEmailInput(response.data.email)
      setPasswordInput(response.data.password)
      setAvatarInput(response.data.avatar)
      setAgeInput(response.data.age)
      setCityInput(response.data.city)

    } catch (error) {
      if(error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      }
      else {
        navigate("/error")
      }
    }

  }

  const firstNameChange = (event) => setFirstNameInput(event.target.value)
  const lastNameChange = (event) => setLastNameInput(event.target.value)
  const emailChange = (event) => setEmailInput(event.target.value)
  const passwordChange = (event) => setPasswordInput(event.target.value)
  const avatarChange = (event) => setAvatarInput(event.target.value)
  const ageChange = (event) => setAgeInput(event.target.value)
  const cityChange = (event) => setCityInput(event.target.value)


const handleUpdate = async (event) => {
  event.preventDefault()

  try {
    
const updateUser = {
  firstName: firstNameInput,
  lastName: lastNameInput,
  email: emailInput,
  password: passwordInput,
  avatar: avatarInput,
  age: ageInput,
  city: cityInput
}

  await editUserService(user._id, updateUser)

  } catch (error) {
    if(error.response && error.response.status === 400) {
      setErrorMessage(error.response.data.errorMessage)
    }
    else {
      navigate("/error")
    } 
  }
}

  return (
    <div>

<form onSubmit={handleUpdate}>

<label htmlFor='firstName'>Nombre: </label>
<input type="text" name="firstName" value={firstNameInput} onChange={firstNameChange}/>
<br />
<label htmlFor='lastName'>Apellidos: </label>
<input type="text" name="lastName" value={lastNameInput} onChange={lastNameChange}/>
<br />
<label htmlFor='email'>Email: </label>
<input type="email" name="email" value={emailInput} onChange={emailChange}/>
<br />
<label htmlFor="password">Contraseña: </label>
<input type="password" name="password" value={passwordInput} onChange={passwordChange}/>
<br />
<label htmlFor='avatar'>Avatar: </label>
<input type="text" name="avatar" value={avatarInput} onChange={avatarChange}/>
<br />
<label htmlFor='age'>Edad: </label>
<input type="number" name="age" value={ageInput} onChange={ageChange}/>
<br />
<label htmlFor='city'>Ciudad: </label>
<input type="text" name="city" value={cityInput} onChange={cityChange}/>
<br />
<button>Editar Perfil</button>
{errorMessage !== "" && <p>{errorMessage}</p> }
</form>





    </div>
  )
}

export default EditProfile