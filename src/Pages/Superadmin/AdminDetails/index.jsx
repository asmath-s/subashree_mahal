/* eslint-disable */
import React, { useState, useEffect, Fragment } from "react";
import Header from "components/Header";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormtextComp from "components/form";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../../../firebase";
import swal from "sweetalert2";

const Users = () => {
  const [modalShow, setModalShow] = useState(false);
  const [emodalShow, seteModalShow] = useState(false);
  const [eusername, seteUsername] = useState("");
  const [epassword, setepassword] = useState("");
  const [edashboard, setedashboard] = useState(false);
  const [ebookingDetails, setebookingDetails] = useState(false);
  const [ebookingEntry, setebookingEntry] = useState(false);
  const [eeventDetail, seteeventDetail] = useState(false);
  const [eeventEntry, seteeventEntry] = useState(false);
  const [emaintenanceDetails, setemaintenanceDetails] = useState(false);
  const [emaintenanceEntry, setemaintenanceEntry] = useState(false);
  const [Id, setId] = useState("");

  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [admindata, setAdminData] = useState([]);
  const [dashboard, setdashboard] = useState(false);
  const [bookingDetails, setbookingDetails] = useState(false);
  const [bookingEntry, setbookingEntry] = useState(false);
  const [eventDetail, seteventDetail] = useState(false);
  const [eventEntry, seteventEntry] = useState(false);
  const [maintenanceDetails, setmaintenanceDetails] = useState(false);
  const [maintenanceEntry, setmaintenanceEntry] = useState(false);

  const handlesubmit = (e) => {
    e.preventDefault();

    if (admindata.find((d) => d.username === username)) {
      console.log("username", username);
      swal.fire("Admin name already exists", "", "error");
    } else {
      addDoc(collection(db, "admins"), {
        username: username,
        password: password,
        role: "admin",
        dashboard: dashboard,
        bookingDetails: bookingDetails,
        bookingEntry: bookingEntry,
        eventDetail: eventDetail,
        eventEntry: eventEntry,
        maintenanceDetails: maintenanceDetails,
        maintenanceEntry: maintenanceEntry,
      });
      setModalShow(false);
      swal.fire("registered successfully", "", "success");
      setUsername("");
      setpassword("");
      setdashboard("");
      setbookingDetails("");
      setbookingEntry("");
      seteventEntry("");
      seteventDetail("");
      setmaintenanceDetails("");
      setmaintenanceEntry("");
    }
  };

  const regData = () => {
    const regsiterdata = collection(db, "admins");
    const q = query(regsiterdata);
    onSnapshot(q, (snapshot) => {
      let regdata = [];
      snapshot.docs.forEach((doc) => {
        regdata.push({ ...doc.data(), id: doc.id });
      });

      setAdminData(regdata);
      console.log("setAdminData", regdata);
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    regData();
  }, []);

  const DeleteFunction = (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to recover this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.value) {
          swal.fire("Deleted!", "Your data has been deleted.", "success");
          deleteDoc(doc(db, "admins", id));
          regData();
        } else {
          swal.fire("Cancelled", "Your file is safe :)", "error");
        }
      });
  };

  const EditFunction = (data) => {
    seteModalShow(true);
    setId(data.id);
    seteUsername(data.username);
    setepassword(data.password);
    setedashboard(data.dashboard);
    setebookingDetails(data.bookingDetails);
    setebookingEntry(data.bookingEntry);
    seteeventDetail(data.eventDetail);
    seteeventEntry(data.eventEntry);
    setemaintenanceDetails(data.maintenanceDetails);
    setemaintenanceEntry(data.maintenanceEntry);
  };
  const handleesubmit = (e) => {
    e.preventDefault();

    updateDoc(doc(db, "admins", Id), {
      username: eusername,
      password: epassword,
      role: "admin",
      dashboard: edashboard,
      bookingDetails: ebookingDetails,
      bookingEntry: ebookingEntry,
      eventDetail: eeventDetail,
      eventEntry: eeventEntry,
      maintenanceDetails: emaintenanceDetails,
      maintenanceEntry: emaintenanceEntry,
    });
    seteModalShow(false);
    swal.fire("registered successfully", "", "success");
    seteUsername("");
    setepassword("");
    setedashboard("");
    setebookingDetails("");
    setebookingEntry("");
    seteeventEntry("");
    seteeventDetail("");
    setemaintenanceDetails("");
    setemaintenanceEntry("");
  };

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="row">
            <h1 className="pageheading">Admin Details</h1>
            <div className="col-lg-12 ">
              <div className="backcard">
                <div
                  className="table-responsive table-card"
                  style={{ marginTop: "30px" }}
                >
                  <table className="table-bordered table table-nowrap ">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                        <th scope="col">Menus</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admindata.map((data, index) =>
                        data.role === "admin" ? (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.username}</td>
                            <td>{data.password}</td>

                            <td className="adminmenus">
                              <p>
                                {data.dashboard === true ? "Dashboard" : ""}
                              </p>
                              <p>
                                {data.bookingEntry === true
                                  ? "Booking Entry"
                                  : ""}
                              </p>
                              <p>
                                {data.bookingDetails === true
                                  ? "Booking Details"
                                  : ""}
                              </p>
                              <p>
                                {data.eventEntry === true ? "Event Entry" : ""}
                              </p>
                              <p>
                                {data.eventDetail === true
                                  ? "Event Details"
                                  : ""}
                              </p>
                              <p>
                                {data.maintenanceEntry === true
                                  ? "Maintenance Entry"
                                  : ""}
                              </p>
                              <p>
                                {data.maintenanceDetails === true
                                  ? "Maintenance Details"
                                  : ""}
                              </p>
                            </td>

                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => EditFunction(data)}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => DeleteFunction(data.id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ) : null
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="row ">
                  <div className="col-lg-12" style={{ textAlign: "end" }}>
                    <Button
                      className="btn btn-primary"
                      onClick={() => setModalShow(true)}
                    >
                      <i className="fa fa-plus"></i> Add admin
                    </Button>
                    {/* adding user */}
                    <Modal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Add Admin
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={handlesubmit}>
                          <FormtextComp
                            label={"Username"}
                            type={"text"}
                            placeholder={"Enter username"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <FormtextComp
                            label={"Password"}
                            type={"text"}
                            placeholder={"Enter password"}
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                          />
                          <div className="row mb-3">
                            <div className="col-lg-3">
                              <Form.Label>Menus</Form.Label>
                            </div>

                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={dashboard}
                                    onChange={(e) =>
                                      setdashboard(e.target.checked)
                                    }
                                  />
                                </span>
                                &nbsp;
                                <label>dashboard</label>
                              </div>
                              {/* <Form.Check
                                // checked={false}
                                type="switch"
                                label="Dashboard"
                                value={dashboard}
                                onChange={dashboardChange}
                              /> */}
                            </div>

                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={bookingDetails}
                                    onChange={(e) =>
                                      setbookingDetails(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Booking Details</label>
                              </div>
                            </div>

                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={bookingEntry}
                                    onChange={(e) =>
                                      setbookingEntry(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Booking Entry</label>
                              </div>
                            </div>

                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={eventEntry}
                                    onChange={(e) =>
                                      seteventEntry(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Event Entry</label>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={eventDetail}
                                    onChange={(e) =>
                                      seteventDetail(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Event Details</label>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={maintenanceEntry}
                                    onChange={(e) =>
                                      setmaintenanceEntry(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Maintenance Entry</label>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={maintenanceDetails}
                                    onChange={(e) =>
                                      setmaintenanceDetails(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Maintenance Details</label>
                              </div>
                            </div>
                          </div>
                          <div className="row ">
                            <div
                              className="col-lg-12 footermodal"
                              style={{ textAlign: "end" }}
                            >
                              <input
                                className="button savebtn "
                                name="submit"
                                type="submit"
                                value="add"
                              />
                            </div>
                          </div>
                        </Form>
                      </Modal.Body>
                    </Modal>
                    {/* editing user */}
                    <Modal
                      show={emodalShow}
                      onHide={() => seteModalShow(false)}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Add Admin
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={handleesubmit}>
                          <FormtextComp
                            label={"Username"}
                            type={"text"}
                            placeholder={"Enter username"}
                            value={eusername}
                            onChange={(e) => seteUsername(e.target.value)}
                          />
                          <FormtextComp
                            label={"Password"}
                            type={"text"}
                            placeholder={"Enter password"}
                            value={epassword}
                            onChange={(e) => setepassword(e.target.value)}
                          />
                          <div className="row mb-3">
                            <div className="col-lg-3">
                              <Form.Label>Menus</Form.Label>
                            </div>

                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={edashboard}
                                    onChange={(e) =>
                                      setedashboard(e.target.checked)
                                    }
                                  />
                                </span>
                                &nbsp;
                                <label>dashboard</label>
                              </div>
                              {/* <Form.Check
                                // checked={false}
                                type="switch"
                                label="Dashboard"
                                value={dashboard}
                                onChange={dashboardChange}
                              /> */}
                            </div>

                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={ebookingDetails}
                                    onChange={(e) =>
                                      setebookingDetails(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Booking Details</label>
                              </div>
                            </div>

                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={ebookingEntry}
                                    onChange={(e) =>
                                      setebookingEntry(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Booking Entry</label>
                              </div>
                            </div>

                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={eeventEntry}
                                    onChange={(e) =>
                                      seteeventEntry(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Event Entry</label>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={eeventDetail}
                                    onChange={(e) =>
                                      seteeventDetail(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Event Details</label>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={emaintenanceEntry}
                                    onChange={(e) =>
                                      setemaintenanceEntry(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Maintenance Entry</label>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div>
                                <span>
                                  <input
                                    type="checkbox"
                                    id="toggleInput"
                                    checked={emaintenanceDetails}
                                    onChange={(e) =>
                                      setemaintenanceDetails(e.target.checked)
                                    }
                                  />
                                </span>{" "}
                                &nbsp;
                                <label>Maintenance Details</label>
                              </div>
                            </div>
                          </div>
                          <div className="row ">
                            <div
                              className="col-lg-12 footermodal"
                              style={{ textAlign: "end" }}
                            >
                              <input
                                className="button savebtn "
                                name="submit"
                                type="submit"
                                value="add"
                              />
                            </div>
                          </div>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
