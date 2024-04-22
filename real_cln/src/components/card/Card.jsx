import React, { useEffect, useState } from "react";
import load from "../../assets/load.gif";
import { FaBath } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { motion } from "framer-motion";
import "./card.css";
import { Link } from "react-router-dom";
const Card = ({ listing }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  }, []);

  const animatem = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      variants={animatem}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="card-main"
    >
      <Link
        to={`/listing/${listing._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="card-img">
          <img
            src={
              loading
                ? load
                : listing?.imageUrls[0] ||
                  "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
            }
            alt=""
          />
        </div>
        <div className="card-wrapper">
          <div className="card-name">
            <h2>{listing?.name}</h2>
          </div>

          <div className="card-bath">
            <i>
              <FaBath className="icon" />
            </i>
            <span>
              {listing?.bathrooms > 1
                ? `${listing?.bathrooms} baths `
                : `${listing?.bathrooms} bath `}
            </span>
          </div>

          <div className="card-bed">
            <i>
              <FaBed className="icon" />
            </i>
            <span>
              {" "}
              {listing?.bedrooms > 1
                ? `${listing?.bedrooms} beds `
                : `${listing?.bedrooms} bed `}
            </span>
          </div>
        </div>

        <div className="card-price">
          <p>
            Rs. {listing?.regularPrice.toLocaleString("en-US")}
            {listing?.type === "rent" && " / month"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
