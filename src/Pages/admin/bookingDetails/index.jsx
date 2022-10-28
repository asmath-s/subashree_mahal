// eslint-disable-next-line
import React, { useEffect, useState } from "react";
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
  orderBy,
  limit,
} from "firebase/firestore";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import moment from "moment";
import ModalForm from "components/popupform";
import PopupPdf from "components/popupPdf";

const AdminBooking = () => {
  const [registrationdata, setRegistrationData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalpdf, setModalpdf] = useState(false);
  const [selecteddata, setSelecteddata] = useState([]);
  const [selectedpdfdata, setSelectedpdfdata] = useState([]);

  useEffect(() => {
    regData();
  }, []);

  // get data in firestore (if event finished it will not show the data) and order by start date and limit to 20
  const regData = () => {
    const regsiterdata = collection(db, "registration");
    const q = query(
      regsiterdata,
      where("finished", "==", false),
      orderBy("registereddate", "desc"),
      limit(20)
    );
    onSnapshot(q, (snapshot) => {
      let regdata = [];
      snapshot.docs.forEach((doc) => {
        regdata.push({ ...doc.data(), id: doc.id });
      });

      setRegistrationData(regdata);
    });
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

  const DeleteFunction = (
    id,
    cstmrname,
    phnnum,
    altrphn,
    email,
    address,
    event,
    startDate,
    endDate,
    nmbrofdays,
    halls,
    rooms,
    rentalamnt,
    totalamnt,
    advncamnt
  ) => {
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
          customername: cstmrname,
          phonenumber: phnnum,
          alterphnnumber: altrphn,
          email: email,
          address: address,
          event: event,
          startdate: startDate,
          enddate: endDate,
          numberofdays: nmbrofdays,
          halls: halls,
          rooms: rooms,
          rentalamnt: rentalamnt,
          totalamount: totalamnt,
          advanceamount: advncamnt,
        });
        Swal.fire("Deleted!", "Your data has been deleted.", "success");

        deleteDoc(doc(db, "registration", id));
        regData();
      } else {
        Swal.fire("Cancelled", "Your file is safe :)", "error");
      }
    });
  };

  // pdf function

  const PdfFunction = (
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
    const selectedpdfdata = {
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
    setSelectedpdfdata(selectedpdfdata);
    setModalpdf(true);
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
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="table-responsive table-card"
                  style={{ marginTop: "30px" }}
                >
                  <table className="table table-nowrap mb-0">
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
                            onClick={() =>
                              DeleteFunction(
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
                            <i className="fa fa-trash"></i>
                          </td>
                          <td>
                            {" "}
                            <p
                              onClick={() =>
                                PdfFunction(
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
                              <i className="fa-solid fa-file-invoice"></i>
                            </p>
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

                  {/* modal pdf component */}
                  {modalpdf === true ? (
                    <PopupPdf
                      showpdf={modalpdf}
                      onHidepdf={() => setModalpdf(false)}
                      dataselectpdf={selectedpdfdata}
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

export default AdminBooking;
