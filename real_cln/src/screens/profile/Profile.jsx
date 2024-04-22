import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser, updateUser } from "../../redux/slices/authSlice";
import {
  useLogoutMutation,
  useUpdateMutation,
} from "../../redux/slices/userApiSlice";
import { toast } from "react-toastify";
import "./profile.css";
import Loader from "../../components/loader/Loader";
import Ptrans from "../../components/page-tran/Ptrans";

const Profile = () => {
  //!state
  const [formdata, setFormData] = useState({});
  console.log(formdata);
  //!init
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //!selector
  const { currentUser } = useSelector((state) => state.user);
  //!rtk
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const [update, { isLoading }] = useUpdateMutation();
  //!function onchange
  const handleOnChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };
  //!function update
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await update({
        id: currentUser?.rest?._id,
        data: formdata,
      }).unwrap();
      console.log(res);
      dispatch(updateUser({ ...res }));
      toast.success(res.message, {
        className: "toast-message",
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        className: "toast-message",
      });
    }
  };
  //!function signout
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const res = await logout().unwrap();
      dispatch(signOutUser());
      toast.success(res.message, {
        className: "toast-message",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profile-main">
      <div className="profile-one"></div>
      <div className="profile-two"></div>
      <form onSubmit={submitHandler}>
        <h1>PROFILE</h1>
        <div>
          <label htmlFor="profile-name">
            <span>
              <FiUser className="icon" />
            </span>
          </label>
          <input
            defaultValue={currentUser?.rest?.username}
            id="username"
            type="text"
            placeholder="NAME . . "
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label htmlFor="profile-email">
            <span>
              <MdOutlineMailOutline className="icon" />
            </span>
          </label>
          <input
            defaultValue={currentUser?.rest?.email}
            id="email"
            type="email"
            placeholder="EMAIL . . "
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="profile-password">
            <span>
              <RiLock2Line className="icon" />
            </span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="UPDATE PASSWORD . . "
            onChange={handleOnChange}
          />
        </div>

        <button className="profile-bt" type="submit">
          {isLoading ? <Loader /> : "SAVE"}
        </button>
        <div className="hr"></div>
        <div className="signout-con">
          <button className="signout-bt" type="button" onClick={handleSignOut}>
            {logoutLoading ? <Loader /> : "SIGN-OUT"}
          </button>
        </div>
      </form>
      <Ptrans/>
    </div>
  );
};

export default Profile;
