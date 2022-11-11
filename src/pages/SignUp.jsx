import { useState } from 'react'
import { signupService } from "../service/auth.services"
import { useNavigate } from "react-router-dom"

function SignUp() {

  const navigate = useNavigate()

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const [ errorMessage, setErrorMessage ] = useState("")


const handleEmailChange = (e) => setEmail(e.target.value)
const handlePasswordChange = (e) => setPassword(e.target.value)





  const handleSignup = async (e) => {
    e.preventDefault()
    const newUser = { 
      email: email,
      password: password
    }
    try {
      
      await signupService(newUser)
      navigate("/login")
  
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
      <h2>SignUp</h2>

      <form onSubmit={handleSignup}>

      {/* <label htmlFor="firstName">Nombre: </label>
      <input type="text" name="firstName"/>
      <br />
      <label htmlFor="lastName">Apellidos: </label>
      <input type="text" name="lastName"/>
      <br /> */}
      <label>Email: </label>
      <input type="email" name="email" value={email} onChange={handleEmailChange}/>
      <br />
      <label htmlFor="password">Contraseña: </label>
      <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
      <br />
      {/* <label htmlFor="avatar">Avatar: </label>
      <input type="text" name="avatar"/>
      <br />
      <label htmlFor="age">Edad: </label>
      <input type="number" name="age"/>
      <br /><label htmlFor="city">Ciudad: </label>
      <input type="text" name="city"/>
      <br /> */}
      <button type="submit">Registrar</button>
      {errorMessage !== "" && <p>{errorMessage}</p> }
      </form>






    </div>
  )
}

export default SignUp