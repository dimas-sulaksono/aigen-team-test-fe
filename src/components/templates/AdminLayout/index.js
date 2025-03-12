import SideBarAdmin from "@/components/organism/SideBar";
import { hideNavbar } from "@/redux/navbarReduce";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideNavbar());
  }, [dispatch]);

  return <SideBarAdmin> {children} </SideBarAdmin>;
};

export default AdminLayout;
