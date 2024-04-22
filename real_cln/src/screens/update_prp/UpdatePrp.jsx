import React, { useEffect, useState } from "react";
import { RiUser3Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { FiFileText } from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { MdBathroom } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import {
  useGetUpdateInfoPropertyMutation,
  useUpdatePropertyMutation,
} from "../../redux/slices/userApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/Loader"
import "./updateprp.css";
//!firebase import
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import Ptrans from "../../components/page-tran/Ptrans";

const UpdatePrp = () => {
  //!state
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    city: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 5000,
    parking: false,
    furnished: false,
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);

  //!init
  const params = useParams();
  const navigate = useNavigate();

  //!selector
  const { currentUser } = useSelector((state) => state.user);
  //!rtk
  const [updateProperty, { isLoading }] = useUpdatePropertyMutation();
  const [getUpdateInfoProperty] = useGetUpdateInfoPropertyMutation();
  //!function storeimage
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  //!function handle image submit
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
          toast.success("IMAGE SAVED", {
            className: "toast-message",
          });
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("Can only upload 1 or 6 images ");
      setUploading(false);
    }
  };
  //!function onchange
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (e.target.id === "parking" || e.target.id === "furnished") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  //!handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        setError("You must upload at least one image");
        return;
      }
      setError(false);

      // Prepare formDataToSend with userRef
      const userRef = currentUser?.rest?._id;
      const formDataToSend = {
        ...formData,
        userRef: userRef,
      };
      const id = params.listingId;
      const res = await updateProperty({ formDataToSend, id }).unwrap();
      navigate(`/listing/${res.updatedListing._id}`);
      console.log(res);
      toast.success(res.message, {
        className: "toast-message",
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        className: "toast-message",
      });
      setError(err.message);
    }
  };
  //!effect to be
  useEffect(() => {
    const fetchListing = async () => {
      const id = params.listingId;
      const res = await getUpdateInfoProperty(id).unwrap();
      console.log(res);
      setFormData(res);
    };
    fetchListing();
  }, []);
  return (
    <div className="update-main">
      <div className="update-one"></div>
      <div className="update-two"></div>
      <div className="update-con">
        <h1 className="update-heading">EDIT PROPERTY</h1>
        <form onSubmit={handleSubmit} className="update-form">
          <div className="update-input-div">
            <div className="update-name-icon-div">
              <RiUser3Fill className="icon" />
              <input
                type="text"
                id="name"
                className="update-input"
                placeholder="NAME.."
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            <div className="update-name-icon-div">
              <GoHomeFill className="icon" />
              <input
                type="text"
                id="address"
                className="update-input"
                placeholder="ADDRESS.."
                onChange={handleChange}
                value={formData.address}
                required
              />
            </div>
          </div>
          <div className="update-name-icon-div">
            <FiFileText className="icon" />
            <textarea
              id="description"
              className="update-input"
              placeholder="DESCRIPTION.."
              onChange={handleChange}
              value={formData.description}
              required
            ></textarea>
          </div>
          <div className="update-input-div">
            <div className="update-name-icon-div">
              <FaCity className="icon" />
              <input
                type="text"
                id="city"
                className="update-input"
                placeholder="CITY.."
                onChange={handleChange}
                value={formData.city}
                required
              />
            </div>
            <div className="update-name-icon-div">
              <FaMoneyBillWave className="icon" />
              <input
                type="text"
                id="regularPrice"
                min="5000"
                max="10000000"
                placeholder="PRICE.."
                className="update-input"
                onChange={handleChange}
                value={formData.regularPrice}
                required
              />
            </div>
          </div>
          <div>
            <div className="update-name-icon-div">
              <FaImage className="icon" />
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  className="update-input update-input-image-select"
                />
                <button
                  type="button"
                  className="create-prp-bt"
                  onClick={handleImageSubmit}
                >
                  {uploading ? <Loader /> : "UPLOAD"}
                </button>
              </div>
            </div>
          </div>
          <div className="update-input-div">
            <div className="update-name-icon-div">
              <MdBathroom className="icon" />
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="20"
                className="update-input"
                placeholder="BATHS.."
                onChange={handleChange}
                value={formData.bathrooms}
                required
              />
            </div>
            <div className="update-name-icon-div">
              <IoBed className="icon" />
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="20"
                className="update-input"
                placeholder="BEDS.."
                onChange={handleChange}
                value={formData.bedrooms}
                required
              />
            </div>
          </div>
          <div className="update-checkbox-div">
            <div className="update-checkbox-div-sub">
              <input
                type="checkbox"
                id="sale"
                className="update-checkbox"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="update-checkbox-div-sub">
              <input
                type="checkbox"
                id="rent"
                className="update-checkbox"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="update-checkbox-div-sub">
              <input
                type="checkbox"
                id="parking"
                className="update-checkbox"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Car space</span>
            </div>
            <div className="update-checkbox-div-sub">
              <input
                type="checkbox"
                id="furnished"
                className="update-checkbox"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <button type="submit">{isLoading ? <Loader /> : "SAVE"}</button>
        </form>
        {imageUploadError && <p>{imageUploadError}</p>}
      </div>
      <Ptrans/>
    </div>
  );
};

export default UpdatePrp;
