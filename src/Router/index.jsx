import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../LoginScreen/index";
import AdminBooking from "Pages/admin/bookingDetails";
import AdminEvent from "Pages/admin/EventDetails";
import MaintenanceDetails from "Pages/admin/MaintenanceDetails";
// superadmin
import SaDashboard from "Pages/Superadmin/Dashboard";
import BookingReport from "Pages/Superadmin/bookingDetails";
import EventReport from "Pages/Superadmin/EventDetails";
import Expenses from "Pages/Superadmin/MaintenanceDetails";
import Users from "Pages/Superadmin/AdminDetails";
import RevenueReport from "Pages/Superadmin/RevenueDetails";
import ExpenseReport from "Pages/Superadmin/ExpenseReport";
import DynamicFields from "Pages/Superadmin/DynamicFields";
import DeletedDetails from "Pages/Superadmin/DeletedDetails";
import Reviews from "Pages/Superadmin/Reviews";
import ReviewDetails from "Pages/Superadmin/reviewDetails";

// common
import BookingEntry from "Pages/common/BookingEntry";
import EventEntry from "Pages/common/EventEntry";
import MaintanaceEnrty from "Pages/common/MaintenanceEntry";
import PageNotFound from "Pages/common/PageNotFound/index";
import Chart from "Pages/Superadmin/Chart";
import Yearchart from "Pages/Superadmin/Chart/yearchart";

import AuthContext from "../auth";
import EBreport from "EbReport";
// import { useNavigate } from "react-router-dom";

function RequireAuth({ children }) {
  const authCtx = useContext(AuthContext);

  // const { user } = useAuth();

  return authCtx.isLoggedIn === true ? children : <Navigate to="/" replace />;
}

const Alrlogin = () => {
  const authCtx = useContext(AuthContext);
  return authCtx.isLoggedIn === true ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Login />
  );
};

export default function Router() {
  // const nav = useNavigate();
  const [role, setRole] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    // console.log("token", token);

    // if (token == "" || token == null || token == undefined) {
    //   // nav("/");
    //   window.location.replace("/");
    // }

    setRole(role);
  }, []);

  return (
    <div>
      {role === "admin" ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* admin */}
            <Route path="/dashboard" element={<SaDashboard />} />
            {/* <Route path="/bookingdetails" element={<AdminBooking />} />
            <Route path="/eventdetails" element={<AdminEvent />} />
            <Route
              path="/maintenancedetails"
              element={<MaintenanceDetails />}
            /> */}
            {/* common */}
            <Route path="/bookingentry" element={<BookingEntry />} />
            <Route path="/evententry" element={<EventEntry />} />
            <Route path="/maintenanceentry" element={<MaintanaceEnrty />} />
            <Route path="/bookingreport" element={<BookingReport />} />
            <Route path="/eventreport" element={<EventReport />} />
            <Route path="/maintenancereport" element={<Expenses />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* superadmin */}
            <Route path="/dashboard" element={<SaDashboard />} />
            <Route path="/bookingreport" element={<BookingReport />} />
            <Route path="/eventreport" element={<EventReport />} />
            <Route path="/maintenancereport" element={<Expenses />} />
            <Route path="/revenuereport" element={<RevenueReport />} />
            <Route path="/expensereport" element={<ExpenseReport />} />
            <Route path="/admindetails" element={<Users />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/yearchart" element={<Yearchart />} />
            <Route path="/dynamicfields" element={<DynamicFields />} />
            <Route path="/deleteddetails" element={<DeletedDetails />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reviewdetails" element={<ReviewDetails />} />

            {/* common */}
            <Route path="/bookingentry" element={<BookingEntry />} />
            <Route path="/evententry" element={<EventEntry />} />
            <Route path="/maintenanceentry" element={<MaintanaceEnrty />} />
            <Route path="/ebentry" element={<EBreport />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}
