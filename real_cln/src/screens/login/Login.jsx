import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/slices/userApiSlice";
import { signInUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import "./login.css";
import Ptrans from "../../components/page-tran/Ptrans";
const Login = () => {
  //!state
  const [formData, setFormData] = useState({});
  //!init
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //!rtk
  const [login, { isLoading }] = useLoginMutation();
  //!selector
  const { currentUser } = useSelector((state) => state.user);
  //!function one
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  //!function two
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData).unwrap();
      dispatch(signInUser({ ...res }));
      toast.success(res.message, {
        className: "toast-message",
      });
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        className: "toast-message",
      });
    }
  };
  //!effect
  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
      toast.success("SIGN-OUT FIRST", {
        className: "toast-message",
      });
    }
  }, []);
  return (
    <div className="login-main">
      <div className="login-one"></div>
      <div className="login-two"></div>
      <form onSubmit={submitHandler}>
        <h1>LOGIN</h1>

        <div>
          <label htmlFor="email">
            <span>
              <MdOutlineMailOutline className="icon" />
            </span>
          </label>
          <input
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="EMAIL . . "
          />
        </div>

        <div>
          <label htmlFor="password">
            <span>
              <RiLock2Line className="icon" />
            </span>
          </label>
          <input
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="PASSWORD . . "
          />
        </div>

        <button className="log-bt" type="submit" disabled={isLoading}>
          {isLoading ? <Loader /> : "SIGN-IN"}
        </button>
        <div className="hr"></div>
        <p className="login-p">
          New user? Register{" "}
          <Link to="/register" className="t-hide-link">
            here
          </Link>
        </p>
      </form>
     <Ptrans/>
    </div>
  );
};

export default Login;
