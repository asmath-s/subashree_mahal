import React, { useEffect, useState, useRef } from "react";
import Header from "components/Header";
import db from "../firebase";
import {
  collection,
  onSnapshot,
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
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function EBreport() {
  const [registrationdata, setRegistrationData] = useState([]);
  const [selecteddata, setSelecteddata] = useState([]);
  const [modaleshow, setModaleshow] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [role, setRole] = useState([]);

  const [customername, setcustomername] = useState("");
  const [event, setevent] = useState("");
  const [sDate, setsDate] = useState("");
  const [eDate, seteDate] = useState("");
  const [dayss, setdayss] = useState("");
  const [startunit, setstartunit] = useState("");
  const [endunit, setendunit] = useState("");
  const [constantunit, setconstantunit] = useState("");
  const [chargeunit, setchargeunit] = useState("");
  const [totalunit, settotalunit] = useState("");
  const [metercost, setmetercost] = useState("");

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
        setRegistrationData(regdata);

        setcustomername(regdata.map((data) => data.customername));
        setevent(regdata.map((data) => data.event));

        setsDate(
          regdata.map((data) =>
            moment.unix(data.startdate.seconds).format("DD/MM/YYYY")
          )
        );

        seteDate(
          regdata.map((data) =>
            moment.unix(data.enddate.seconds).format("DD/MM/YYYY")
          )
        );

        setdayss(regdata.map((data) => data.numberofdays));
        setstartunit(regdata.map((data) => data.startunit));

        setendunit(regdata.map((data) => data.endunit));

        setconstantunit(regdata.map((data) => data.constantunit));

        setchargeunit(regdata.map((data) => data.chargeunit));

        settotalunit(regdata.map((data) => data.totalunit));

        setmetercost(regdata.map((data) => data.metercost));
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
        setcustomername(regdata.map((data) => data.customername));
        setevent(regdata.map((data) => data.event));

        setsDate(
          regdata.map((data) =>
            moment.unix(data.startdate.seconds).format("MM/DD/YYYY")
          )
        );

        seteDate(
          regdata.map((data) =>
            moment.unix(data.enddate.seconds).format("MM/DD/YYYY")
          )
        );

        setdayss(regdata.map((data) => data.numberofdays));
        setstartunit(regdata.map((data) => data.startunit));

        setendunit(regdata.map((data) => data.endunit));

        setconstantunit(regdata.map((data) => data.constantunit));

        setchargeunit(regdata.map((data) => data.chargeunit));

        settotalunit(regdata.map((data) => data.totalunit));

        setmetercost(regdata.map((data) => data.metercost));
      });
    }
  };

  useEffect(() => {
    regData();
  }, [startDate, endDate]);

  // edit data in firestore
  const EditFunction = (
    id,
    customername,
    startunit,
    endunit,
    chargeunit,
    metercost,
    cleaningpeople,
    cleaningcostper,
    cleaningcost,
    watercost,
    Generatorcost,
    otherco,
    Balance,
    totalamount,
    advanceamount
  ) => {
    const selectededata = {
      id: id,
      customername: customername,
      startunit: startunit,
      endunit: endunit,
      chargeunit: chargeunit,
      metercost: metercost,
      cleaningpeople: cleaningpeople,
      cleaningcostper: cleaningcostper,
      cleaningcost: cleaningcost,
      watercost: watercost,
      Generatorcost: Generatorcost,
      otherco: otherco,
      Balance: Balance,
      totalamount: totalamount,
      advanceamount: advanceamount,
    };
    setSelecteddata(selectededata);
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

  const ExpenseTableValues = [
    {
      customerName: customername,
      event: event,
      sDate: sDate,
      eDate: eDate,
      dayss: dayss,
      startunit: startunit,
      endunit: endunit,
      constantunit: constantunit,
      chargeunit: chargeunit,
      totalunit: totalunit,
      metercost: metercost,
    },
  ];

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "EB Report";
    const headers = [
      "S.NO",
      "Customer Name",
      "Event",
      "Starting Date",
      "Ending Date",
      "Days",
      "Start Unit",
      "End Unit",
      "Constant Unit",
      "Charge Unit",
      "Total Unit",
      "Metercost",
      "Generator Cost",
    ];
    const tableRows = [];

    registrationdata.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.customername,
        item.event,
        moment.unix(item.startdate.seconds).format("DD/MM/YYYY"),
        moment.unix(item.enddate.seconds).format("DD/MM/YYYY"),
        item.numberofdays,
        item.startunit,
        item.endunit,

        item.constantunit,

        item.chargeunit,

        item.totalunit,

        item.metercost,
        item.Generatorcost,
      ];
      tableRows.push(rowData);
    });

    let content = {
      startY: 50,
      head: [headers],
      body: tableRows,
      theme: "grid",
    };

    doc.text(title, marginLeft, 20);
    doc.autoTable(content);
    doc.save("EB Report.pdf");
  };

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">EB Report</h1>
          <div className="row" style={{ marginTop: "20px", display: "flex" }}>
            <div className="col-lg-12 ">
              <div className="backcard">
                <div className="exprtbtn">
                  {role === "sadmin" ? (
                    <div>
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
                      </DownloadTableExcel>{" "}
                      &nbsp;
                      <button
                        style={{
                          backgroundColor: "#0a408f",
                          color: "#fff",
                          borderColor: "#0a408f",
                          border: "1px solid #0a408f",
                        }}
                        onClick={() => exportPDF()}
                      >
                        {" "}
                        Export PDF
                      </button>
                    </div>
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
                        <th scope="col">Start Unit</th>
                        <th scope="col">End Unit</th>
                        <th scope="col">Constant Unit</th>
                        <th scope="col">Charge Unit</th>
                        <th scope="col">Total Unit</th>
                        <th scope="col">Meter cost</th>
                        <th scope="col">Generator Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrationdata.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <i className="fa fa-user"></i>
                          </td>

                          <td>{data.customername}</td>
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
                          <td>{data.startunit}</td>
                          <td>{data.endunit}</td>
                          <td>{data.constantunit}</td>
                          <td>{data.chargeunit}</td>
                          <td>{data.totalunit}</td>
                          <td>{data.metercost}</td>
                          <td>{data.Generatorcost}</td>
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
}
