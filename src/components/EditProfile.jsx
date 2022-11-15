import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { editUserService, getUserDetailsService } from "../service/user.services";
import {uploadImageService} from "../service/upload.services"

function EditProfile(props) {
  const navigate = useNavigate();

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");
  const [ageInput, setAgeInput] = useState(0);
  const [cityInput, setCityInput] = useState("");
  

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
     getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getUserDetailsService();
      console.log("USER DETAILS", response.data)
      setFirstNameInput(response.data.firstName);
      setLastNameInput(response.data.lastName);
      //setAvatarInput(response.data.avatar);
      setAgeInput(response.data.age);
      setCityInput(response.data.city);
    } catch (error) {
      navigate("/error");
    }
  };

  const firstNameChange = (event) => setFirstNameInput(event.target.value);
  const lastNameChange = (event) => setLastNameInput(event.target.value);
  //const avatarChange = (event) => setAvatarInput(event.target.value);
  const ageChange = (event) => setAgeInput(event.target.value);
  const cityChange = (event) => setCityInput(event.target.value);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const updateUser = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        //avatar: avatarInput,
        age: ageInput,
        city: cityInput,
      };

      await editUserService(updateUser);
      props.updateProfile()

    } catch (error) {
      navigate("/error");
    }
  };

  const handleUpdateAvatar = async(event)=> {

    const sendObj = new FormData()
    sendObj.append("avatar", event.target.files[0] )

    try {
      
      const response = await uploadImageService(sendObj)
      console.log(response.data.avatar);
      
    } catch (error) {
      console.log("error", error)
      navigate("/error")
      
    }


  }

  return (
    <div>
      <form>
        <label>Nombre: </label>
        <input
          type="text"
          name="firstName"
          value={firstNameInput}
          onChange={firstNameChange}
        />
        <br />
        <label>Apellidos: </label>
        <input
          type="text"
          name="lastName"
          value={lastNameInput}
          onChange={lastNameChange}
        />
        {/* <br />
        <label>Avatar: </label>
        <input
          type="file"
          name="avatar"
          value={avatarInput}
          onChange={handleUpdateAvatar}
        /> */}
        <br />
        <label>Edad: </label>
        <input type="number" name="age" value={ageInput} onChange={ageChange} />
        <br />
        <label>Ciudad: </label>
        <input
          type="text"
          name="city"
          value={cityInput}
          onChange={cityChange}
        />
        <br />
        <button onClick={handleUpdate}>Editar Perfil</button>
        {errorMessage !== "" && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default EditProfile;
