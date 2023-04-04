import React, { useState, useEffect } from "react";
import Header from "components/Header";
// import Swal from "sweetalert2";
import YearPicker from "react-year-picker";
import Form from "react-bootstrap/Form";
import db from "../../../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { Maintenancemodal } from "components/popupform";

const MaintenanceDetails = () => {
  const [selectedyear, setSelectedyear] = useState("");
  const [maintenancedata, setMaintenancedata] = useState([]);

  const [selecteddata, setSelecteddata] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const regData = async () => {
    const currentyear = new Date().getFullYear();
    if (selectedyear === "") {
      const regsiterdata = collection(db, "maintenance");
      const q = query(regsiterdata, where("year", "==", currentyear));
      onSnapshot(q, (snapshot) => {
        let regdata = [];
        snapshot.docs.forEach((doc) => {
          regdata.push({ ...doc.data(), id: doc.id });
        });
        setMaintenancedata(regdata);
      });
    } else {
      const regsiterdata = collection(db, "maintenance");
      const q = query(regsiterdata, where("year", "==", selectedyear));
      onSnapshot(q, (snapshot) => {
        let regdata = [];
        snapshot.docs.forEach((doc) => {
          regdata.push({ ...doc.data(), id: doc.id });
        });
        setMaintenancedata(regdata);
      });
    }
  };

  useEffect(() => {
    regData();
  });

  const EditFunction = (data) => {
    setSelecteddata(data);
    setModalShow(true);
  };
  const DeleteFunction = (data) => {
    deleteDoc(doc(db, "maintenance", data.id));
  };

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">Maintenance Details</h1>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-lg-12 ">
              <div className="backcard">
                {" "}
                <div className="row">
                  <Form action="">
                    <div className="row ">
                      <div className="col-lg-3 maintenacedetails ">
                        <Form.Label>
                          {" "}
                          please select the{" "}
                          <span className="redtext">year</span>
                        </Form.Label>
                        <YearPicker
                          onChange={(date) => setSelectedyear(date)}
                        />
                      </div>
                    </div>
                  </Form>
                </div>
                <div
                  className="table-responsive table-card"
                  style={{ marginTop: "30px" }}
                >
                  <table className="table table-bordered gaptab table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Month</th>
                        <th scope="col">Maintenance For</th>
                        <th scope="col">Maintenance Cost</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>January</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "January" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "January" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "January" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "January" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Feburary</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "Feburary" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "Feburary" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "Feburary" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>
                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "Feburary" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>March</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "March" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "March" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "March" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>
                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "March" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>April</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "April" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "April" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "April" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>
                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "April" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>May</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "May" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "May" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "May" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>
                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "May" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>June</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "June" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "June" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "June" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>
                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "June" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>July</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "July" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "July" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "July" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>
                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "July" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>August</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "August" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "August" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "August" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>
                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "August" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>September</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "September" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "September" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "September" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>
                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "September" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>October</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "October" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "October" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "October" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>
                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "October" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>November</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "November" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "November" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "November" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>
                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "November" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>December</td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "December" ? (
                              <p>{data.maintenancefor}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "December" ? (
                              <p>{data.maintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "December" ? (
                              <>
                                <i
                                  className="fa fa-edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => EditFunction(data)}
                                ></i>
                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {maintenancedata.map((data) =>
                            data.month === "December" ? (
                              <>
                                <i
                                  className="fa fa-trash"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => DeleteFunction(data)}
                                ></i>

                                <br />
                              </>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {modalShow === true ? (
                    <Maintenancemodal
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

export default MaintenanceDetails;
