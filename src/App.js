import "./App.css";
// import { DataBoard } from './Component/DataBoard';
import Hero from "./Component/Hero";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginAsOwner from "./Screen/LoginAsOwner";
import Aboutus from "./Component/Aboutus";
import RegisterAsStudent from "./Screen/RegisterAsStudent";
import LoginAsStudent from "./Screen/LoginAsStudent";
import RegisterAsOwner from "./Screen/RegisterAsOwner";
import Flatpage from "./Component/Flatpage";
import Contactus from "./Component/Contactus";
import OwnerStudentLogin from "./Screen/OwnerStudentLogin";
import OwnerStudentRegister from "./Screen/OwnerStudentRegister";
import BookingPage from "./Component/BookingPage";
import PropertyDetails from "./Component/PropertyDetails";
import PropertyLists from "./Component/PropertyLists";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
import OwnerHome from "./Component/OwnerHome";
import UploadProperty from "./Component/UploadProperty";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = [
    "/LoginAsOwner",
    "/LoginAsStudent",
    "/RegisterAsOwner",
    "/RegisterAsStudent",
    "/OwnerStudentLogin",
    "/OwnerStudentRegister",
  ];
  const hideFooterRoutes = [
    "/LoginAsOwner",
    "/LoginAsStudent",
    "/RegisterAsOwner",
    "/RegisterAsStudent",
    "/OwnerStudentLogin",
    "/OwnerStudentRegister",
    "/owner/home",
    "/owner/upload",
  ];
  return (
    <div>
      {/* {
        location.pathname !== "/LoginAsOwner" &&
        location.pathname !== "/LoginAsStudent" &&
        location.pathname !== "/RegisterAsOwner" &&
        location.pathname !== "/RegisterAsStudent" &&
        location.pathname !== "/OwnerStudentLogin" &&
        location.pathname !== "/OwnerStudentRegister" ? (
          <Navbar />
        ) : null

        /* <Nav /> */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        {/*  */}
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contactus />} />

        <Route path="/LoginAsOwner" element={<LoginAsOwner />} />
        <Route path="/LoginAsStudent" element={<LoginAsStudent />} />
        <Route path="/RegisterAsOwner" element={<RegisterAsOwner />} />
        <Route path="/RegisterAsStudent" element={<RegisterAsStudent />} />
        <Route path="/OwnerStudentLogin" element={<OwnerStudentLogin />} />
        <Route
          path="/OwnerStudentRegister"
          element={<OwnerStudentRegister />}
        />

        {/* Property Routes */}
        <Route path="/flat" element={<Flatpage />} />
        <Route path="/properties/:type" element={<PropertyLists />} />
        <Route path="/property/:id" element={<PropertyDetails />} />

        {/* Owner Routes */}
        <Route path="/owner/home" element={<OwnerHome />} />
        <Route path="/owner/upload" element={<UploadProperty />} />

        {/* Booking */}
        <Route path="/BookingPage" element={<BookingPage />} />
      </Routes>
      {/* <Footer /> */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
