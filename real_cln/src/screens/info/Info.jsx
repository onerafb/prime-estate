import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import seven from "../../assets/seven.jpeg";
import { useSelector } from "react-redux";
import { useGetInfoPropertyMutation } from "../../redux/slices/userApiSlice";
import { useParams } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { FaMap } from "react-icons/fa";
import "swiper/css/bundle";
import "./info.css";
import { Link } from "react-router-dom";
import Ptrans from "../../components/page-tran/Ptrans";

const Info = () => {
  //!state
  const [listing, setListing] = useState();
  //!selector
  const { currentUser } = useSelector((state) => state.user);
  //!rtk
  const [getInfoProperty] = useGetInfoPropertyMutation();
  //!init
  SwiperCore.use([Navigation]);
  const params = useParams();
  //!effect
  useEffect(() => {
    const fetchListing = async () => {
      const id = params.listingId;
      console.log(id);
      const res = await getInfoProperty(id).unwrap();
      console.log(res);
      setListing(res);
      console.log(listing);
    };
    fetchListing();
  }, []);
  return (
    <div className="info-main">
      <div className="info-one"></div>
      <div className="info-image-slider">
        <Swiper navigation={true} pagination={true}>
          {listing?.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="info-image-div"
                style={{
                  background: `url(${url}) center no-repeat `,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="info-textinfo">
        <p className="info-name">
          {listing?.name} - Rs {listing?.regularPrice.toLocaleString("en-US")}
          {listing?.type === "rent" && " / month"}
        </p>
        <p className="info-address">
          <span>
            <FaMap className="icon" />
          </span>
          <span>{listing?.address}</span>
        </p>
        <div className="info-bt">
          <p>{listing?.type === "rent" ? "For Rent" : "For Sale"}</p>
        </div>
        <p className="info-desc">
          <span style={{ fontWeight: "bold" }}>ABOUT : </span>
          <span>{listing?.description}</span>
        </p>
        <ul className="info-ul">
          <li>
            <FaBed className="text-lg" />
            {listing?.bedrooms > 1
              ? `${listing?.bedrooms} Beds `
              : `${listing?.bedrooms} Bed `}
          </li>
          <li>
            <FaBath />
            {listing?.bathrooms > 1
              ? `${listing?.bathrooms} Baths `
              : `${listing?.bathrooms} Bath `}
          </li>
          <li>
            <FaParking />
            {listing?.parking ? "Car Space" : "No Parking"}
          </li>
          <li>
            <FaChair />
            {listing?.furnished ? "Renewed" : "Unfurnished"}
          </li>
        </ul>
        {currentUser &&
        currentUser?.rest?.role!=="admin"?
           (
           <Link to="/contact">CONTACT</Link>
          ):("")}
      </div>
      <Ptrans/>
    </div>
  );
};

export default Info;
