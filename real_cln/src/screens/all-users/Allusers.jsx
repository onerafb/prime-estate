import React, { useEffect, useState } from "react";
import "./alluser.css";
import {
  useGetAllUsersMutation,
  useDeleteUserMutation,
} from "../../redux/slices/userApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import Ptrans from "../../components/page-tran/Ptrans";
const Allusers = () => {
  //!state
  const [user, setUser] = useState([]);
  const [loadingButtons, setLoadingButtons] = useState({});

  //!rtk
  const [getAllUsers, { isLoading: userLoading }] = useGetAllUsersMutation();
  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();
  //!effect
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getAllUsers().unwrap();
        setUser(res.users);
        console.log(user);
      } catch (err) {
        toast.error(err?.data?.message || err.error, {
          className: "toast-message",
        });
      }
    };
    fetchUser();
  }, [getAllUsers]);

  const handleDelete = async (id) => {
    try {
      setLoadingButtons((prev) => ({ ...prev, [id]: true }));
      const res = await deleteUser(id).unwrap();
      toast.success(res.message, {
        className: "toast-message",
      });
      setUser(user.filter((user) => user._id !== id));
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        className: "toast-message",
      });
    } finally {
      setLoadingButtons((prev) => ({ ...prev, [id]: false }));
    }
  };
  return (
    <div className="all-users-main">
      <div className="all-user-color-all-con">
        <div className="all-user-all-one"></div>
        <div className="all-user-all-two"></div>
      </div>
      {userLoading ? (
        <Loader />
      ) : (
        <div className="all-user-con">
          <h2>ALL USERS</h2>
          {user.map((item) => (
            <div key={item?._id}>
              <div className="all-user-info react-yt">
                <div className="all-user-info-text ">
                  <h2>NAME : {item?.username}</h2>
                  <h2>ID : {item?._id}</h2>
                </div>
                <div className="all-user-delete-bt ">
                  <button
                    onClick={() => handleDelete(item?._id)}
                    disabled={deleteUserLoading || loadingButtons[item?._id]}
                  >
                    {loadingButtons[item?._id] ? <Loader /> : "DELETE"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Ptrans/>
    </div>
  );
};

export default Allusers;
