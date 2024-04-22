import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import { useRegisterMutation } from "../../redux/slices/userApiSlice";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import Ptrans from "../../components/page-tran/Ptrans";
const Register = () => {
  //!state
  const [formdata, setFormData] = useState({});
  //!init
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //!selector
  const { currentUser } = useSelector((state) => state.user);
  //!rtk
  const [register, { isLoading }] = useRegisterMutation();
  //!onchange function
  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  //!submit function
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formdata).unwrap();
      toast.success(res.message, {
        className: "toast-message",
      });
      navigate("/login");
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
    <div className="register-main">
      <div className="register-one"></div>
      <div className="register-two"></div>
      <form onSubmit={submitHandler}>
        <h1>REGISTER</h1>
        <div>
          <label htmlFor="name">
            <span>
              <FiUser className="icon" />
            </span>
          </label>
          <input
            onChange={handleChange}
            id="username"
            type="text"
            placeholder="NAME . . "
          />
        </div>

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

        <button className="reg-bt" type="submit" disabled={isLoading}>
          {isLoading ? <Loader /> : "SIGN-UP"}
        </button>
        <div className="hr"></div>
        <p className="register-p">
          Already have an account? Login{" "}
          <Link to="/login" className="t-hide-link">
            here
          </Link>
        </p>
      </form>
      <Ptrans />
    </div>
  );
};

export default Register;
