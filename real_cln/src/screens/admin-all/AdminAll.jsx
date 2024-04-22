import React, { useEffect, useState } from "react";
import {
  useDeletePropertyMutation,
  useShowEDPropertyMutation,
} from "../../redux/slices/userApiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./adminall.css";
import { toast } from "react-toastify";
import Ptrans from "../../components/page-tran/Ptrans";
import Loader from "../../components/loader/Loader";
import load from "../../assets/load.gif";
import { motion } from "framer-motion";

const AdminAll = () => {
  //!motion
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
  //!state
  const [userListings, setUserListings] = useState([]);
  const [loadingButtons, setLoadingButtons] = useState({});
  const [loading, setLoading] = useState(false);

  //!selector
  const { currentUser } = useSelector((state) => state.user);

  //!rtk
  const [showEDProperty, { isLoading }] = useShowEDPropertyMutation();
  const [deleteProperty, { isLoading: deleteLoading }] =
    useDeletePropertyMutation();
  //!function
  const handleListingDelete = async (listingId) => {
    try {
      setLoadingButtons((prev) => ({ ...prev, [listingId]: true }));
      const res = await deleteProperty(listingId).unwrap();
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      toast.success(res.message, {
        className: "toast-message",
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        className: "toast-message",
      });
    } finally {
      setLoadingButtons((prev) => ({ ...prev, [listingId]: false }));
    }
  };
  //!effect
  useEffect(() => {
    const fetch = async () => {
      const id = currentUser?.rest?._id;
      // console.log(currentUser?.rest?._id);
      try {
        const res = await showEDProperty(id).unwrap();
        // console.log(res);
        setUserListings(res);
      } catch (err) {
        toast.error(err?.data?.message || err.error, {
          className: "toast-message",
        });
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, [900]);
  }, []);
  return (
    <div className="admin-all-main">
      <div className="admin-all-color-all-con">
        <div className="admin-all-all-one"></div>
        <div className="admin-all-all-two"></div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="admin-all-con">
          {userListings && userListings.length > 0 ? (
            <div className="admin-all-grid">
              {userListings.map((listing) => (
                <motion.div
                  variants={animatem}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="admin-all-card-con"
                  key={listing._id}
                >
                  <div className="img-div-admin-all">
                    <Link to={`/listing/${listing._id}`}>
                      <img src={loading ? load : listing.imageUrls[0]} alt="" />
                    </Link>
                  </div>
                  <div className="admin-all-listing-name">
                    <span className="admin-all-listing-name">
                      {listing.name}
                    </span>
                  </div>
                  <div className="admin-bt-div">
                    <Link
                      to={`/update/${listing?._id}`}
                      className="admin-all-bt-link"
                    >
                      <button className="admin-all-bt">UPDATE</button>
                    </Link>
                    <button
                      className="admin-all-bt"
                      onClick={() => handleListingDelete(listing?._id)}
                      disabled={deleteLoading || loadingButtons[listing?._id]}
                    >
                      {loadingButtons[listing?._id] ? <Loader /> : "DELETE"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              NO PROPERTY
            </div>
          )}
        </div>
      )}

      <Ptrans />
    </div>
  );
};

export default AdminAll;
