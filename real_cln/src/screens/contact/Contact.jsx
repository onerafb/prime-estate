import React, { useRef, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiMessageRoundedDots } from "react-icons/bi";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import Ptrans from "../../components/page-tran/Ptrans";
import Loader from "../../components/loader/Loader";
import "./contact.css";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm("service_kfstvlk", "template_fxwt1dt", form.current, {
        publicKey: "PkNDvuQ7XFSuWl7-2",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("EMAIL SENT", {
            className: "toast-message",
          });
          setLoading(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );

    e.target.reset();
  };
  return (
    <div className="contact-main">
      <div className="contact-one"></div>
      <div className="contact-two"></div>
      <form onSubmit={sendEmail} ref={form}>
        <h1>Contact</h1>

        <div>
          <label htmlFor="email">
            <span>
              <MdOutlineMailOutline className="icon" />
            </span>
          </label>
          <input
            id="email"
            name="user_email"
            type="email"
            placeholder="EMAIL . . "
          />
        </div>

        <div>
          <label htmlFor="password">
            <span>
              <BiMessageRoundedDots className="icon" />
            </span>
          </label>
          <textarea
            name="message"
            id=""
            cols="30"
            rows="3"
            className="contact-textarea"
            placeholder="MESSAGE. ."
          ></textarea>
        </div>

        <button className="contact-bt" type="submit">
          {loading ? <Loader /> : "SEND"}
        </button>
      </form>
      <Ptrans />
    </div>
  );
};

export default Contact;
