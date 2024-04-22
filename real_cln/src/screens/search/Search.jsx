import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import "./search.css";
import Loader from "../../components/loader/Loader";
import Ptrans from "../../components/page-tran/Ptrans";

const Search = () => {
  // const a = ["a", "b", "c", "d"];
  //!init
  const navigate = useNavigate();
  //!state
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  // console.log(sidebardata);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  //!effect
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    // const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      // offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        // offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setLoading(true);
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
      console.log(listings);
    };

    fetchListings();
  }, [location.search]);

  //!function onchange
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };
  //!function submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    // urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  //!function showmore
  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="search-main">
        <div className="search-color-all-con">
        <div className="search-all-one"></div>
        <div className="search-all-two"></div>
      </div>
      <div className="search-con">
        <div className="search-section-one">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="searchTerm"
              placeholder="TYPE TO SEARCH"
              className="search-search-bar"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />

            <div className="search-checkbox-div-con">
              <div className="search-checkbox">
                <input
                  type="checkbox"
                  id="all"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <span>Sale & Rent</span>
              </div>

              <div className="search-checkbox">
                <input
                  type="checkbox"
                  id="rent"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span>Rent</span>
              </div>

              <div className="search-checkbox">
                <input
                  type="checkbox"
                  id="sale"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                />
                <span>Sale</span>
              </div>

              <div className="search-checkbox">
                <input
                  type="checkbox"
                  id="parking"
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <span>Carspace</span>
              </div>

              <div className="search-checkbox">
                <input
                  type="checkbox"
                  id="furnished"
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <span>Renewed</span>
              </div>

              <div className="search-checkbox">
                <span>Sort:</span>
                <select
                  onChange={handleChange}
                  defaultValue={"created_at_desc"}
                  id="sort_order"
                  className="search-select"
                >
                  <option value="regularPrice_desc">Price high to low</option>
                  <option value="regularPrice_asc">Price low to hight</option>
                  <option value="createdAt_desc">Latest</option>
                  <option value="createdAt_asc">Oldest</option>
                </select>
              </div>
            </div>
            <div className="search-bt-con">
              <button className="search-bt" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="search-hr"></div>
        <div style={{ width: "100%" }}>
          {loading || listings.length === 0 ? (
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
            <div className="search-section-two">
              {listings.map((listing) => (
                <Card key={listing._id} listing={listing} />
              ))}

              {showMore && (
                <button onClick={onShowMoreClick} type="button" className="search-show-more">
                  Show more
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <Ptrans/>
    </div>
  );
};

export default Search;
