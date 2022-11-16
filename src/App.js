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
import Reviews from "./pages/Reviews";
import ReviewDetails from "./components/ReviewDetails";
import IsPrivate from "./components/IsPrivate"

function App() {
  return (
    <div className="App">

      <NavBar />
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />

        <Route path="/service-list" element={<IsPrivate> <ServiceList /> </IsPrivate>} />
        <Route path="/service/:serviceId" element={<IsPrivate> <ServiceDetails /> </IsPrivate>} />
        <Route path="/profile" element={<IsPrivate> <Profile /> </IsPrivate>} />
        <Route path="/volunteer/:volunteerId/details" element={<IsPrivate> <VolunteerDetails /> </IsPrivate>} />
        <Route path="/reviews" element={<IsPrivate> <Reviews /> </IsPrivate>} />
        <Route path="/review/:reviewId" element={<IsPrivate> <ReviewDetails/> </IsPrivate>}/>

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      
    </div>
  );
}

export default App;
