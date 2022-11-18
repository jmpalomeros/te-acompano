import { createContext, useState, useEffect } from "react";
import { verifyService } from "../service/auth.services";
import PuffLoader from "react-spinners/PuffLoader";

const AuthContext = createContext();

function AuthWrapper(props) {
  //aqui iran los estados y funciones globales
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    authenticaUser();
  }, []);

  const authenticaUser = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      console.log(response);
      //el token ya estaría validado en FE
      setIsLoggedIn(true);
      setUser(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setUser(null);
      setIsFetching(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    user,
    authenticaUser,
    setIsLoggedIn,
    setUser,
  };

  if (isFetching === true) {
    return (
      <div id="spinner">
        <PuffLoader color={"blue"} size={50} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
