import React, { useEffect, useState, useRef } from "react";
import Header from "components/Header";
import db from "../../../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
  query,
  where,
  limit,
} from "firebase/firestore";
import moment from "moment";
import { EvntmodalForm } from "components/popupform";
import Form from "react-bootstrap/Form";

import DatePicker from "react-datepicker";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Swal from "sweetalert2";

const EventReport = () => {
  const [registrationdata, setRegistrationData] = useState([]);
  const [selecteddata, setSelecteddata] = useState([]);
  const [modaleshow, setModaleshow] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [role, setRole] = useState([]);

  const tableRef = useRef(null);

  // get data in firestore

  useEffect(() => {
    window.scrollTo(0, 0);
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  const regData = () => {
    if (startDate === "" && endDate === "") {
      const regsiterdata = collection(db, "registration");
      const q = query(
        regsiterdata,
        where("finished", "==", true),
        where("year", "==", new Date().getFullYear())
      );
      onSnapshot(q, (snapshot) => {
        let regdata = [];
        snapshot.docs.forEach((doc) => {
          regdata.push({ ...doc.data(), id: doc.id });
        });
        setRegistrationData(regdata.reverse());
      });
    } else {
      const regsiterdata = collection(db, "registration");
      const q = query(
        regsiterdata,
        where("startdate", ">=", startDate),
        where("startdate", "<=", endDate),
        where("finished", "==", true)
      );
      onSnapshot(q, (snapshot) => {
        let regdata = [];
        snapshot.docs.forEach((doc) => {
          regdata.push({ ...doc.data(), id: doc.id });
        });
        setRegistrationData(regdata);
      });
    }
  };

  useEffect(() => {
    regData();
  }, [startDate, endDate]);

  // edit data in firestore
  const EditFunction = (data) => {
    setSelecteddata(data);
    setModaleshow(true);
  };
  // search data in table
  const search = (e) => {
    const search = e.target.value.toLowerCase();
    if (search === "") {
      regData();
    } else {
      const filterdata = registrationdata.filter((data) => {
        return data.customername.toLowerCase().indexOf(search) !== -1;
      });

      setRegistrationData(filterdata);
    }
  };
  const handleClear = () => {
    setStartDate("");
    setendDate("");
  };

  const DeleteFunction = (data) => {
    Swal.fire({
      title: "Permanently Delete",
      text: "You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteDoc(doc(db, "registration", data.id));
        Swal.fire("Deleted!", "Your data has been deleted.", "success");

        regData();
      } else {
        Swal.fire("Cancelled", "Your file is safe :)", "error");
      }
    });
  };

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">Event Details</h1>
          <div className="row" style={{ marginTop: "20px", display: "flex" }}>
            <div className="col-lg-12 ">
              <div className="backcard">
                <div className="exprtbtn">
                  {role === "sadmin" ? (
                    <DownloadTableExcel
                      filename="Event Report Details"
                      sheet="users"
                      currentTableRef={tableRef.current}
                    >
                      <button
                        style={{
                          backgroundColor: "#0a408f",
                          color: "#fff",
                          borderColor: "#0a408f",
                          border: "1px solid #0a408f",
                        }}
                      >
                        {" "}
                        Export excel{" "}
                      </button>
                    </DownloadTableExcel>
                  ) : (
                    ""
                  )}
                </div>
                <div className="filterdatas">
                  <div className="filtitem">
                    <Form.Label>From Date:</Form.Label>
                    <DatePicker
                      selected={startDate}
                      placeholderText="From Date"
                      onChange={(date) => {
                        setStartDate(date);
                      }}
                    />
                  </div>
                  <div className="filtitem">
                    <Form.Label>to Date:</Form.Label>
                    <DatePicker
                      selected={endDate}
                      placeholderText="To Date"
                      onChange={(date) => {
                        setendDate(date);
                      }}
                    />
                  </div>

                  {startDate === "" ? (
                    ""
                  ) : (
                    <i className="fa-solid fa-xmark" onClick={handleClear}></i>
                  )}
                </div>

                <div className="row">
                  <div
                    className="col-lg-12"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div style={{ width: "250px" }}>
                      <input
                        onChange={(e) => search(e)}
                        type="search"
                        className="form-control"
                        placeholder="search by customer name"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="table-responsive table-card"
                  style={{ marginTop: "30px" }}
                >
                  <table
                    className="table table-nowrap mb-0 table-bordered"
                    ref={tableRef}
                  >
                    <thead className="table-light">
                      <tr>
                        <th scope="col"></th>

                        <th scope="col">Customer Name</th>
                        <th scope="col">Event</th>
                        <th scope="col">Starting Date</th>
                        <th scope="col">Ending Date</th>
                        <th scope="col">Days</th>
                        <th scope="col">Total Amnt </th>
                        <th scope="col">advance Amnt </th>
                        <th scope="col">Start Unit</th>
                        <th scope="col">End Unit</th>
                        <th scope="col">constant Unit</th>
                        <th scope="col">charge Unit</th>
                        <th scope="col">Total Unit</th>
                        <th scope="col">metercost</th>
                        <th scope="col">cleaning people</th>
                        <th scope="col">cost per people</th>
                        <th scope="col">total Cleaning Cost</th>
                        <th scope="col">water Cost</th>
                        <th scope="col">Generator Cost</th>
                        <th scope="col">other Cost</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Invoice Copy</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrationdata.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <i className="fa fa-user"></i>
                          </td>

                          <td> {data.customername}</td>
                          <td>{data.event}</td>
                          <td>
                            {moment
                              .unix(data.startdate.seconds)
                              .format("DD/MM/YYYY")}
                          </td>
                          <td>
                            {moment
                              .unix(data.enddate.seconds)
                              .format("DD/MM/YYYY")}
                          </td>
                          <td>{data.numberofdays}</td>
                          <td>{data.totalamount}</td>
                          <td>{data.advanceamount}</td>
                          <td>{data.startunit}</td>
                          <td>{data.endunit}</td>
                          <td>{data.constantunit}</td>
                          <td>{data.chargeunit}</td>
                          <td>{data.totalunit}</td>
                          <td>{data.metercost}</td>
                          <td>{data.cleaningpeople}</td>
                          <td>{data.cleaningcostper}</td>
                          <td>{data.cleaningcost}</td>
                          <td>{data.watercost}</td>
                          <td>{data.Generatorcost}</td>
                          <td>
                            {data.otherco.map((data, index) => (
                              <div key={index}>
                                {data.otherfor}-{data.othercost}
                              </div>
                            ))}
                          </td>
                          <td>{data.Balance}</td>
                          <td>
                            <div style={{ display: "none" }}>
                              {data.invoicecopy}
                            </div>

                            <a target="_blank" href={data.invoicecopy}>
                              <i className="fa-solid fa-image"></i>
                            </a>
                          </td>
                          <td onClick={() => EditFunction(data)}>
                            <i className="fa fa-edit"></i>
                          </td>
                          <td onClick={() => DeleteFunction(data)}>
                            <i className="fa fa-trash"></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* popup form component */}
                  {modaleshow === true ? (
                    <EvntmodalForm
                      show={modaleshow}
                      onHide={() => setModaleshow(false)}
                      dataselect={selecteddata}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventReport;
