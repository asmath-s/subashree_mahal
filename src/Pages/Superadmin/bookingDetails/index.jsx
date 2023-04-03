/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import Header from "components/Header";
import db from "../../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  query,
  onSnapshot,
  where,
  addDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import moment from "moment";
import ModalForm from "components/popupform";
import PopupPdf from "components/popupPdf";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { DownloadTableExcel } from "react-export-table-to-excel";

const BookingReport = () => {
  const [registrationdata, setRegistrationData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalpdf, setModalpdf] = useState(false);
  const [selecteddata, setSelecteddata] = useState([]);
  const [selectedpdfdata, setSelectedpdfdata] = useState([]);
  const [role, setRole] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("");

  const tableRef = useRef(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    regData();
  }, [startDate, endDate]);

  // get data in firestore (if event finished it will not show the data) and order by start date and limit to 20

  const regData = () => {
    if (startDate === "" && endDate === "") {
      const regsiterdata = collection(db, "registration");
      const q = query(regsiterdata, where("finished", "==", false));
      onSnapshot(q, (snapshot) => {
        let regdata = [];
        snapshot.docs.forEach((doc) => {
          regdata.push({ ...doc.data(), id: doc.id });
        });
        console.log(regdata.length, "total");

        setRegistrationData(regdata.reverse());
      });
    } else {
      const regsiterdata = collection(db, "registration");
      const q = query(
        regsiterdata,
        where("startdate", ">=", startDate),
        where("startdate", "<=", endDate),
        where("finished", "==", false)
      );
      onSnapshot(q, (snapshot) => {
        let regdata = [];
        snapshot.docs.forEach((doc) => {
          regdata.push({ ...doc.data(), id: doc.id });
        });
        setRegistrationData(regdata.reverse());
      });
    }
  };

  // search data in the table
  const search = (e) => {
    const search = e.target.value.toLowerCase();
    if (search === "") {
      regData();
    } else {
      const filterdata = registrationdata.filter((data) => {
        return (
          data.customername.toLowerCase().indexOf(search) !== -1 ||
          data.phonenumber.toLowerCase().indexOf(search) !== -1 ||
          data.alterphnnumber.toLowerCase().indexOf(search) !== -1
        );
      });
      setRegistrationData(filterdata);
    }
  };

  // edit data in firestore

  const EditFunction = (
    id,
    customername,
    phonenumber,
    alterphnnumber,
    email,
    address,
    event,
    startdate,
    enddate,
    numberofdays,
    halls,
    rooms,
    rentalamnt,
    totalamount,
    advanceamount
  ) => {
    const selecteddata = {
      id: id,
      customername: customername,
      phonenumber: phonenumber,
      alterphnnumber: alterphnnumber,
      email: email,
      address: address,
      event: event,
      startdate: startdate,
      enddate: enddate,
      numberofdays: numberofdays,
      halls: halls,
      rooms: rooms,
      rentalamnt: rentalamnt,
      totalamount: totalamount,
      advanceamount: advanceamount,
    };
    setSelecteddata(selecteddata);
    setModalShow(true);
  };

  // delete data in firestore and store in another collection

  const DeleteFunction = (data) => {
    console.log(data);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        addDoc(collection(db, "deleted"), {
          deletedat: new Date(),
          year: data.year,
          customername: data.customername,
          phonenumber: data.phonenumber,
          alterphnnumber: data.alterphnnumber,
          email: data.email,
          address: data.address,
          event: data.event,
          startdate: data.startdate,
          enddate: data.enddate,
          numberofdays: data.numberofdays,
          halls: data.halls,
          rooms: data.rooms,
          rentalamnt: data.rentalamnt,
          totalamount: data.totalamount,
          advanceamount: data.advanceamount,
        });
        Swal.fire("Deleted!", "Your data has been deleted.", "success");

        deleteDoc(doc(db, "registration", data.id));
        regData();
      } else {
        Swal.fire("Cancelled", "Your file is safe :)", "error");
      }
    });
  };

  const handleClear = () => {
    setStartDate("");
    setendDate("");
  };
  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">Registration Details</h1>
          <div className="row" style={{ marginTop: "20px", display: "flex" }}>
            <div className="col-lg-12 ">
              <div className="backcard">
                <div className="exprtbtn">
                  {role === "sadmin" ? (
                    <DownloadTableExcel
                      filename="Registration Details"
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

                <div
                  className="col-lg-12"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <div style={{ width: "250px" }}>
                    <input
                      onChange={(e) => search(e)}
                      type="search"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <div
                  className="table-responsive table-card"
                  style={{ marginTop: "30px" }}
                >
                  <table className="table table-nowrap mb-0" ref={tableRef}>
                    <thead className="table-light">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Registered at</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Alter Phone Number</th>
                        <th scope="col">Event</th>
                        <th scope="col">Starting Date</th>
                        <th scope="col">Ending Date</th>
                        <th scope="col">Days</th>
                        <th scope="col">Halls</th>
                        <th scope="col">Rooms</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col">Advance Amount</th>
                        <th scope="col"></th>
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
                          <td>
                            {moment
                              .unix(data.registereddate.seconds)
                              .format("DD/MM/YYYY")}
                          </td>
                          <td>{data.customername}</td>
                          <td>{data.phonenumber}</td>
                          <td>{data.alterphnnumber}</td>
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

                          <td>
                            {data.halls.map((hall, index) => (
                              <div key={index}>{hall}</div>
                            ))}
                          </td>
                          <td>
                            {data.rooms.map((room, index) => (
                              <div key={index}>
                                {room.room}-{room.roomcost}
                              </div>
                            ))}
                          </td>
                          <td>{data.totalamount}</td>
                          <td>{data.advanceamount}</td>

                          {/* Edit function calling */}
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              EditFunction(
                                data.id,
                                data.customername,
                                data.phonenumber,
                                data.alterphnnumber,
                                data.email,
                                data.address,
                                data.event,
                                data.startdate,
                                data.enddate,
                                data.numberofdays,
                                data.halls,
                                data.rooms,
                                data.rentalamnt,
                                data.totalamount,
                                data.advanceamount
                              )
                            }
                          >
                            <i className="fa fa-edit"></i>
                          </td>

                          {/* delete function calling*/}
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() => DeleteFunction(data)}
                          >
                            <i className="fa fa-trash"></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* popup form component */}
                  {modalShow === true ? (
                    <ModalForm
                      show={modalShow}
                      onHide={() => setModalShow(false)}
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

export default BookingReport;
