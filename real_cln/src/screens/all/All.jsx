import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import "./all.css";
import Loader from "../../components/loader/Loader";
import Ptrans from "../../components/page-tran/Ptrans";
const All = () => {
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(false);
  //effect
  useEffect(() => {
    setLoading(true);

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRentListings();
    setLoading(false);
  }, []);
  return (
    <div className="all-main">
      <div className="color-all-con">
        <div className="all-one"></div>
        <div className="all-two"></div>
      </div>
      {loading || saleListings.length === 0 || rentListings.length === 0 ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="all-con">
          <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
            FOR RENT
          </h1>
          <div className="all-one-grid">
            {rentListings.map((listing) => (
              <Card listing={listing} key={listing._id} />
            ))}
          </div>
          <Link to={"/search?offer=true"}>
            <p style={{ textAlign: "center" }}>SHOW MORE</p>
          </Link>
          <div className="hr" style={{ marginTop: "4rem" }}></div>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            FOR SALE
          </h1>
          <div className="all-one-grid">
            {saleListings.map((listing) => (
              <Card listing={listing} key={listing._id} />
            ))}
          </div>
          <Link to={"/search?offer=true"}>
            <p style={{ textAlign: "center" }}>SHOW MORE</p>
          </Link>
        </div>
      )}
      <Ptrans/>
    </div>
  );
};

export default All;
