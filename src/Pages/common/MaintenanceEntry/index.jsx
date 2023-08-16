import React, { useState } from "react";
import Header from "components/Header";
import Form from "react-bootstrap/Form";
import db from "../../../firebase";
import swal from "sweetalert2";
import { collection, addDoc } from "firebase/firestore";
import YearPicker from "react-year-picker";

const MaintanaceEnrty = () => {
  const [selectedyear, setSelectedyear] = useState("");
  const [selectedmonth, setSelectedmonth] = useState("");
  const [Maintenancefor, setMaintenancefor] = useState("");
  const [Maintenancecost, setMaintenancecost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedyear === "" && selectedmonth === "") {
      swal.fire("Please select Year & Month", "", "error");
    } else if (selectedyear === "") {
      swal.fire("Please select Year", "", "error");
    } else if (selectedmonth === "") {
      swal.fire("Please select Month", "", "error");
    } else {
      addDoc(collection(db, "maintenance"), {
        enteredat: new Date(),
        year: selectedyear,
        month: selectedmonth,
        maintenancefor: Maintenancefor,
        maintenancecost: Maintenancecost,
      });
      swal.fire("registered successfully", "", "success");
      setMaintenancefor("");
      setMaintenancecost("");
    }
  };

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="row">
            <div className="col-lg-12 ">
              <div className="backcard">
                <Form action="">
                  <div className="maintenacedetails">
                    <div className="mitem">
                      <Form.Label>
                        please select the <span className="redtext">year</span>
                      </Form.Label>
                      <YearPicker onChange={(date) => setSelectedyear(date)} />
                    </div>
                    <div className="mitem">
                      <Form.Label>
                        please select the <span className="redtext">month</span>
                      </Form.Label>

                      <Form.Select
                        defaultValue=""
                        aria-label="Default select example"
                        onChange={(e) => {
                          setSelectedmonth(e.target.value);
                        }}
                      >
                        <option value="" disabled>
                          select the Month
                        </option>
                        <option value="January">January</option>
                        <option value="Feburary">Feburary</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </Form.Select>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <h1 className="pageheading mt10">Maintenance Entry</h1>
              <div className="backcard">
                <Form action="" onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <Form.Label>Maintenance For </Form.Label>
                    </div>
                    <div className="col-lg-9">
                      <Form.Control
                        type="text"
                        placeholder="Enter Maintenance For"
                        value={Maintenancefor}
                        onChange={(e) => setMaintenancefor(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <Form.Label>
                        Maintenance cost <span style={{ color: "red" }}>₹</span>
                      </Form.Label>
                    </div>
                    <div className="col-lg-9">
                      <Form.Control
                        type="number"
                        placeholder="Enter Maintenance cost"
                        min="0"
                        value={Maintenancecost}
                        onChange={(e) => setMaintenancecost(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-lg-12" style={{ textAlign: "end" }}>
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
        </div>
      </div>
    </div>
  );
};

export default MaintanaceEnrty;
