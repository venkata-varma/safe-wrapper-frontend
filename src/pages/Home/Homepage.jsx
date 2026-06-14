import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import './Homepage.css'
import {socket} from '../../socket'
import { useDispatch } from "react-redux";
import { setOnlineUsers } from "../../redux/Chat/onlineUsersSlice";

const Homepage = () => {
  let dispatch=useDispatch()
   useEffect(() => {

    const accountDetails = JSON.parse(
      localStorage.getItem("accountDetails")
    );

    const handleConnect = () => {

      console.log("Connected:", socket.id);

      socket.emit(
        "registerUser",
        accountDetails._id
      );

    };

    if (socket.connected) {
      handleConnect();
    }

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };

  }, []);

  useEffect(() => {

  socket.on("onlineUsers", (users) => {
    console.log("ONLINE USERS:", users);
    dispatch(
        setOnlineUsers(users)
      );
  });
   
  return () => {
    socket.off("onlineUsers");
  };

}, []);



  return (
    <div className="main-layout">
      <Navbar />

      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Homepage;
