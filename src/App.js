import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ServiceList from "./pages/ServiceList";
import ServiceDetails from "./pages/ServiceDetails";
import Profile from "./pages/Profile";
import VolunteerDetails from "./pages/VolunteerDetails";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">

      <NavBar />
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/service-list" element={<ServiceList />} />
        <Route path="/service/:id/details" element={<ServiceDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/volunteer/:id/details" element={<VolunteerDetails />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      
    </div>
  );
}

export default App;
