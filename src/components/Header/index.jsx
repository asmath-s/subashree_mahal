import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import db from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setusername] = useState(true);
  const [user, setuser] = useState([]);
  const [dashboard, setdashboard] = useState(false);
  const [bookingDetails, setbookingDetails] = useState(false);
  const [bookingEntry, setbookingEntry] = useState(false);
  const [eventDetail, seteventDetail] = useState(false);
  const [eventEntry, seteventEntry] = useState(false);
  const [maintenanceDetails, setmaintenanceDetails] = useState(false);
  const [maintenanceEntry, setmaintenanceEntry] = useState(false);

  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    setusername(localStorage.getItem("username"));
    getUser();
  }, []);

  const getUser = () => {
    const name = localStorage.getItem("username");
    const todoRef = collection(db, "admins");
    const q = query(todoRef, where("username", "==", name));
    onSnapshot(q, (snapshot) => {
      let userdata = [];
      snapshot.docs.forEach((doc) => {
        userdata.push({ ...doc.data(), id: doc.id });
      });
      setuser(userdata);
      setdashboard(userdata[0].dashboard);
      setbookingDetails(userdata[0].bookingDetails);
      setbookingEntry(userdata[0].bookingEntry);
      seteventDetail(userdata[0].eventDetail);
      seteventEntry(userdata[0].eventEntry);
      setmaintenanceDetails(userdata[0].maintenanceDetails);
      setmaintenanceEntry(userdata[0].maintenanceEntry);
    });
  };

  const logout = () => {
    localStorage.clear("token");
    nav("/");
  };

  if (loggedIn === false) {
    return <Navigate to="/" />;
  }

  if (token == null) {
    return setLoggedIn(false);
  }

  const showNav = () => {
    document.getElementById("enablenav").classList.toggle("navenabled");
  };
  const hideNav = () => {
    document.getElementById("enablenav").classList.remove("navenabled");
  };
  const showFunction = () => {
    document.getElementById("sidebarDashboards").classList.toggle("show");
  };

  const showFunction2 = () => {
    document.getElementById("details").classList.toggle("show");
  };

  const showFunction3 = () => {
    document.getElementById("report").classList.toggle("show");
  };

  const showFunction4 = () => {
    document.getElementById("settings").classList.toggle("show");
  };

  const showFunction5 = () => {
    document.getElementById("reviews").classList.toggle("show");
  };

  return (
    <div>
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <button
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger "
                id="topnav-hamburger-icon"
                onClick={showNav}
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>

            <div className="d-flex align-items-center">
              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn usernamebtn"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center username">
                    <span className="text-start ms-xl-2">
                      <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                        {username}
                      </span>
                    </span>
                  </span>
                  <span className="usernameicon" onClick={logout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div id="enablenav">
        {" "}
        <div className="app-menu navbar-menu">
          <div className="navbar-brand-box">
            <Link className="logo logo-dark" to="/dashboard">
              <span className="logo-sm">
                <img
                  className="img-fluid for-light"
                  src="assets/images/logo.png"
                  alt=""
                />
              </span>
            </Link>
          </div>
          <div id="scrollbar">
            <div className="container-fluid">
              <div id="two-column-menu"></div>

              {role === "admin" ? (
                <ul className="navbar-nav" id="navbar-nav">
                  <li className="menu-title">
                    <span data-key="t-menu">Menu</span>
                  </li>
                  {dashboard === true ? (
                    <li className="nav-item" onClick={hideNav}>
                      <Link className="nav-link menu-link" to="/dashboard">
                        <i className="fa-solid fa-gauge"></i>
                        <span data-key="t-widgets">Dashboard</span>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {bookingEntry === true ? (
                    <li className="nav-item" onClick={hideNav}>
                      <Link className="nav-link menu-link" to="/bookingentry">
                        <i className="fa-solid fa-address-card"></i>
                        <span data-key="t-widgets">Booking Entry</span>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {bookingDetails === true ? (
                    <li className="nav-item" onClick={hideNav}>
                      <Link className="nav-link menu-link" to="/bookingreport">
                        <i className="fa-solid fa-clipboard-list"></i>
                        <span data-key="t-widgets">Booking Details</span>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {eventEntry === true ? (
                    <li className="nav-item" onClick={hideNav}>
                      <Link className="nav-link menu-link" to="/evententry">
                        <i className="fa-solid fa-calendar-plus"></i>
                        <span data-key="t-widgets">Event Entry</span>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {eventDetail === true ? (
                    <li className="nav-item" onClick={hideNav}>
                      <Link className="nav-link menu-link" to="/eventreport">
                        <i className="fa-solid fa-calendar"></i>
                        <span data-key="t-widgets">Event Details</span>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {maintenanceEntry === true ? (
                    <li className="nav-item" onClick={hideNav}>
                      <Link
                        className="nav-link menu-link"
                        to="/maintenanceentry"
                      >
                        <i className="fa-solid fa-gears"></i>
                        <span data-key="t-widgets">Maintenance Entry</span>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {maintenanceDetails === true ? (
                    <li className="nav-item" onClick={hideNav}>
                      <Link
                        className="nav-link menu-link"
                        to="/maintenancereport"
                      >
                        <i className="fa-solid fa-sliders"></i>
                        <span data-key="t-widgets">Maintenance Details</span>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              ) : (
                <ul className="navbar-nav" id="navbar-nav">
                  <li className="nav-item" onClick={hideNav}>
                    <Link className="nav-link menu-link" to="/dashboard">
                      <i className="fa-solid fa-gauge"></i>
                      <span data-key="t-widgets">Dashboard</span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <ul
                      className="nav-link menu-link"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarDashboards"
                      onClick={showFunction}
                    >
                      <i className="fa-solid fa-address-card"></i>

                      <span data-key="t-dashboards">Entry</span>
                    </ul>
                    <div
                      className="collapse menu-dropdown"
                      id="sidebarDashboards"
                    >
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/bookingentry"
                            className="nav-link"
                            data-key="t-analytics"
                          >
                            Booking Entry
                          </Link>
                        </li>
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/evententry"
                            className="nav-link"
                            data-key="t-crm"
                          >
                            Event Entry
                          </Link>
                        </li>
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/maintenanceentry"
                            className="nav-link"
                            data-key="t-crm"
                          >
                            Maintenance Entry
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <ul
                      className="nav-link menu-link"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="report"
                      onClick={showFunction2}
                    >
                      <i className="fa-solid fa-clipboard-list"></i>
                      <span data-key="t-dashboards">Entry Details</span>
                    </ul>
                    <div className="collapse menu-dropdown" id="details">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/bookingreport"
                            className="nav-link"
                            data-key="t-analytics"
                          >
                            Booking Details
                          </Link>
                        </li>
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/eventreport"
                            className="nav-link"
                            data-key="t-analytics"
                          >
                            Event Details
                          </Link>
                        </li>
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/maintenancereport"
                            className="nav-link"
                            data-key="t-crm"
                          >
                            Maintenance Details
                          </Link>
                        </li>
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/deleteddetails"
                            className="nav-link"
                            data-key="t-crm"
                          >
                            Deleted Event
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <ul
                      className="nav-link menu-link"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="report"
                      onClick={showFunction3}
                    >
                      <i className="fa-solid fa-clipboard-list"></i>
                      <span data-key="t-dashboards">Report</span>
                    </ul>
                    <div className="collapse menu-dropdown" id="report">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/revenuereport"
                            className="nav-link"
                            data-key="t-crm"
                          >
                            Revenue Report
                          </Link>
                        </li>
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/expensereport"
                            className="nav-link"
                            data-key="t-crm"
                          >
                            Maintenance Report
                          </Link>
                        </li>
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/ebentry"
                            className="nav-link"
                            data-key="t-crm"
                          >
                            EB Report
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/chart">
                      <i className="fa-solid fa-gauge"></i>
                      <span data-key="t-widgets">Chart</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/reviewdetails">
                      <i className="fa-solid fa-face-smile"></i>
                      <span data-key="t-widgets">Customer Reviews</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <ul
                      className="nav-link menu-link"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarDashboards"
                      onClick={showFunction4}
                    >
                      <i className="fa-solid fa-gears"></i>

                      <span data-key="t-dashboards">Settings</span>
                    </ul>
                    <div className="collapse menu-dropdown" id="settings">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/admindetails"
                            className="nav-link"
                            data-key="t-analytics"
                          >
                            Admin setup
                          </Link>
                        </li>
                        <li className="nav-item" onClick={hideNav}>
                          <Link
                            to="/dynamicfields"
                            className="nav-link"
                            data-key="t-crm"
                          >
                            Add Dynamic Fields
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="sidebar-background"></div>
        </div>
        <div className="vertical-overlay" onClick={hideNav}></div>
      </div>
    </div>
  );
};

export default Header;
