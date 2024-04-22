import React, { useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import { useSelector } from "react-redux";
const Navbar = () => {
  //!usestate
  const [nav, setNav] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  //!init
  const { currentUser } = useSelector((state) => state.user);
  //!toggle function
  const handleToggle = () => {
    setNav((prev) => !prev);
    setIsOpen(false);
  };
  //!function
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  //!effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setIsNavVisible(
        prevScrollPos > currentScrollPos || currentScrollPos < 10
      );

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <header
      style={{
        top: isNavVisible ? "0" : "-200px",
        transition: "600ms ease",
        backgroundColor: isNavVisible ? "transparent" : "transparent",
      }}
    >
      <div className="header-div">
        <nav className={nav ? "nav" : "nav nav-active"}>
          <ul>
            <li onClick={handleToggle}>
              <Link to="/" className="header-link">
                Home
              </Link>
            </li>

            <li onClick={handleToggle}>
              {currentUser ? (
                <Link to="/profile" className="header-link">
                  Profile
                </Link>
              ) : (
                <Link to="/login" className="header-link">
                  Sign-in
                </Link>
              )}
            </li>
            <li>
              <Link to="/all" className="header-link">
                ALL-properties
              </Link>
            </li>
            <li>
              <Link to="/search" className="header-link">
                search
              </Link>
            </li>
            {currentUser && currentUser?.rest?.role == "admin" ? (
              <li style={{ position: "relative" }}>
                <Link
                  // to="/show-listing"
                  className="header-link"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  Admin
                </Link>
                <dialog
                  open={isOpen}
                  style={{ position: "absolute", marginTop: "20px" }}
                >
                  <div className="dialog-con">
                    <div className="dialog-con-one">
                      <Link
                        to="/show-listing"
                        className="header-link"
                        onClick={() => setIsOpen((prev) => !prev)}
                      >
                        EDIT PROPERTY
                      </Link>
                    </div>
                    <div className="dialog-con-two">
                      <Link
                        to="/all-user"
                        className="header-link"
                        onClick={() => setIsOpen((prev) => !prev)}
                      >
                        ALL USERS
                      </Link>
                    </div>
                    <div className="dialog-con-two">
                      <Link
                        to="/create"
                        className="header-link"
                        onClick={() => setIsOpen((prev) => !prev)}
                      >
                        CREATE PROPERTY
                      </Link>
                    </div>
                  </div>
                </dialog>
              </li>
            ) : (
              ""
            )}
          </ul>
          <button className="close" onClick={handleToggle}>
            <FaWindowClose />
          </button>
        </nav>

        <div className="header-div-childOne">
          <Link to="/" className="header-link">
            <h2 className="logo">PRIME</h2>
          </Link>
          <form className="header-input" onSubmit={handleSubmit}></form>
        </div>

        <button className="bars" onClick={handleToggle}>
          <FaBarsStaggered />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
