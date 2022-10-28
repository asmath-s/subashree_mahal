/* eslint-disable */
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Header from "components/Header";
import db from "../../../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { v4 } from "uuid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

const DynamicFields = () => {
  const [dynamicdata, setDynamicdata] = useState([]);
  const [dynamichdata, setDynamichdata] = useState([]);
  const [dynamicrdata, setDynamicrdata] = useState([]);

  const [Eventname, setEventname] = useState("");
  const [Hallname, setHallname] = useState("");
  const [Roomname, setRoomname] = useState("");

  const [modalShow, setModalShow] = useState(false);
  // const [editname, setEditname] = useState("");

  const regData = () => {
    const dynamicdata = collection(db, "dynamicfields");
    const q = query(dynamicdata);
    onSnapshot(q, (snapshot) => {
      let dyndata = [];
      snapshot.docs.forEach((doc) => {
        dyndata.push({ ...doc.data() });
      });
      setDynamicdata(dyndata[0].eventData);
      setDynamichdata(dyndata[1].hallData);
      setDynamicrdata(dyndata[2].roomData);
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    regData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pid = v4();

    const eventData = [...dynamicdata, { id: pid, Eventname: Eventname }];
    updateDoc(doc(db, "dynamicfields", "eventnames"), {
      eventData,
    });

    setEventname("");
  };

  const handlehallsubmit = (e) => {
    e.preventDefault();
    const pid = v4();

    const hallData = [
      ...dynamichdata,
      { id: pid, label: Hallname, value: Hallname },
    ];

    updateDoc(doc(db, "dynamicfields", "hallnames"), {
      hallData,
    });
    setHallname("");
  };
  const handleroomsubmit = (e) => {
    e.preventDefault();
    const pid = v4();

    const roomData = [...dynamicrdata, { id: pid, Roomname: Roomname }];

    updateDoc(doc(db, "dynamicfields", "roomnames"), {
      roomData,
    });
    setRoomname("");
  };
  // event delete
  const DeleteFunction = (data) => {
    const filtered = dynamicdata.filter((item) => item.id !== data.id);
    setDoc(doc(db, "dynamicfields", "eventnames"), {
      eventData: filtered,
    });

    Swal.fire("Deleted successfully", "", "success");
    regData();
  };
  // room delete
  const DeleterFunction = (data) => {
    const filtered = dynamicrdata.filter((item) => item.id !== data.id);
    setDoc(doc(db, "dynamicfields", "roomnames"), {
      roomData: filtered,
    });

    Swal.fire("Deleted successfully", "", "success");
    regData();
  };
  // Hall delete
  const DeletehFunction = (data) => {
    const filtered = dynamichdata.filter((item) => item.id !== data.id);
    setDoc(doc(db, "dynamicfields", "hallnames"), {
      hallData: filtered,
    });

    Swal.fire("Deleted successfully", "", "success");
    regData();
  };
  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">Dynamic Fields</h1>
          <div className="row" style={{ marginTop: "20px", display: "flex" }}>
            <div className="col-lg-4 mb20">
              <div className="backcard">
                <Form onSubmit={handleSubmit}>
                  <div
                    className="table-responsive table-card"
                    style={{ marginTop: "30px" }}
                  >
                    <table className="table table-nowrap mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">S.No</th>
                          <th scope="col">Event Name</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {dynamicdata.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.Eventname}</td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => DeleteFunction(data)}
                            >
                              <i className="fa fa-trash"></i>
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={3}>
                            {" "}
                            <Form.Control
                              name="event"
                              type="text"
                              placeholder="Enter event Name"
                              value={Eventname}
                              onChange={(e) => setEventname(e.target.value)}
                              required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row ">
                    <div
                      className="col-lg-12"
                      style={{ textAlign: "end", marginTop: "10px" }}
                    >
                      <input
                        className="button savebtn"
                        name="submit"
                        type="submit"
                        value="submit"
                      />
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-lg-4 mb20">
              <div className="backcard">
                <Form onSubmit={handlehallsubmit}>
                  <div
                    className="table-responsive table-card"
                    style={{ marginTop: "30px" }}
                  >
                    <table className="table table-nowrap mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">S.No</th>
                          <th scope="col">Hall Name</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {dynamichdata.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.label}</td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => DeletehFunction(data)}
                            >
                              <i className="fa fa-trash"></i>
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan={3}>
                            {" "}
                            <Form.Control
                              name="hall"
                              type="text"
                              placeholder="Enter Hall Name"
                              value={Hallname}
                              onChange={(e) => setHallname(e.target.value)}
                              required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row ">
                    <div
                      className="col-lg-12"
                      style={{ textAlign: "end", marginTop: "10px" }}
                    >
                      <input
                        className="button savebtn"
                        name="submit"
                        type="submit"
                        value="submit"
                      />
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-lg-4 mb20">
              <div className="backcard">
                <Form onSubmit={handleroomsubmit}>
                  <div
                    className="table-responsive table-card"
                    style={{ marginTop: "30px" }}
                  >
                    <table className="table table-nowrap mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">S.No</th>
                          <th scope="col">Room Name</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {dynamicrdata.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.Roomname}</td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => DeleterFunction(data)}
                            >
                              <i className="fa fa-trash"></i>
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan={3}>
                            {" "}
                            <Form.Control
                              name="room"
                              type="text"
                              placeholder="Enter Room Name"
                              value={Roomname}
                              onChange={(e) => setRoomname(e.target.value)}
                              required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row ">
                    <div
                      className="col-lg-12"
                      style={{ textAlign: "end", marginTop: "10px" }}
                    >
                      <input
                        className="button savebtn"
                        name="submit"
                        type="submit"
                        value="submit"
                      />
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          {/* <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <Form.Control
                name="event"
                type="text"
                placeholder="Enter event Name"
                value={editname}
                onChange={(e) => setEditname(e.target.value)}
                required
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleEditsave}>save</Button>
            </Modal.Footer>
          </Modal> */}
        </div>
      </div>
    </div>
  );
};

export default DynamicFields;
