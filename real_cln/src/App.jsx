import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Home from "./screens/home/Home";
import Register from "./screens/register/Register";
import Login from "./screens/login/Login";
import Navbar from "./components/nav/Navbar";
import CreateProperty from "./screens/create_prp/CreateProperty";
import UpdatePrp from "./screens/update_prp/UpdatePrp";
import Profile from "./screens/profile/Profile";
import Search from "./screens/search/Search";
import Info from "./screens/info/Info";
import All from "./screens/all/All";
import AdminAll from "./screens/admin-all/AdminAll";
import PrivateR from "./components/private-route/PrivateR";
import { AnimatePresence } from "framer-motion";
import Allusers from "./screens/all-users/Allusers";
import PrivateRt from "./components/private-route/PrivateRt";
import Contact from "./screens/contact/Contact";
const App = () => {
  // useEffect(() => {
  //   const showToastMessage = () => {
  //     toast.success("PLEASE ENTER ALL FIELDS!", {
  //       className: "toast-message",
  //     });
  //   };
  //   showToastMessage();
  // }, []);

  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="" element={<PrivateRt />}>
            <Route path="/create" element={<CreateProperty />} />
          </Route>

          <Route path="" element={<PrivateRt />}>
            <Route path="/update/:listingId" element={<UpdatePrp />} />
          </Route>

          <Route path="" element={<PrivateRt />}>
            <Route path="/all-user" element={<Allusers />} />
          </Route>

          <Route path="" element={<PrivateRt />}>
            <Route path="/show-listing" element={<AdminAll />} />
          </Route>

          <Route path="" element={<PrivateR />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:listingId" element={<Info />} />
          <Route path="/all" element={<All />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </AnimatePresence>
      <ToastContainer
        position="top-center"
        autoClose={2800}
        hideProgressBar={false}
        closeButton={false}
        icon={false}
      />
    </>
  );
};

export default App;
