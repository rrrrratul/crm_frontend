import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CSidebar,
  CSidebarBrand,
  CNavItem,
  CBadge,
  CNavGroup,
  CSidebarNav,
  CNavTitle,
} from "@coreui/react";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    toast.success("You've Been Logged Out");
    navigate("/");
  }
  return (
    <>
      <CSidebar>
        <h2 className="text-center">Retex</h2>
        <CSidebarNav>
          <CNavTitle>A CRM APP FOR ALL YOUR NEEDS</CNavTitle>

          <CNavItem href="#" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left text-white m-2"></i>
            <div className="text-decoration-none text-white mx-3">Logout</div>
          </CNavItem>
        </CSidebarNav>
      </CSidebar>
    </>
  );
};

export default Sidebar;
