import React, { useState, useEffect, useRef } from "react";
import Header from "components/Header";
import db from "../../../firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { DownloadTableExcel } from "react-export-table-to-excel";
import moment from "moment/moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RevenueReport = () => {
  const [registrationdata, setRegistrationData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [count, setCount] = useState("");
  const [revenue, setrevenue] = useState("");
  const [days, setDays] = useState("");

  const [totalgenerator, setTotalgenerator] = useState("");

  const [totalCost, setTotalcost] = useState("");
  const [totalrerm, settotalrerm] = useState("");

  const [pdfCount, setPdfCount] = useState("");
  const val = "";

  const [Read, setRead] = useState("");

  const tableRef = useRef(null);

  const [cname, setCname] = useState("");
  const [events, setevents] = useState("");
  const [sDate, setsDate] = useState("");
  const [eDate, seteDate] = useState("");
  const [dayss, setdayss] = useState("");
  const [rentalAmount, setrentalAmount] = useState("");
  const [roomCost, setroomCost] = useState("");
  const [unit, setunit] = useState("");
  const [unitCost, setunitCost] = useState("");
  const [cleaningPeople, setcleaningPeople] = useState("");
  const [costPerPeople, setcostPerPeople] = useState("");
  const [cleaningCost, setcleaningCost] = useState("");
  const [waterCost, setwaterCost] = useState("");
  const [generatorCost, setgeneratorCost] = useState("");
  const [otherCost, setotherCost] = useState("");
  const [totalAmount, settotalAmount] = useState("");

  const regData = () => {
    if (startDate === "" && endDate === "") {
      const regsiterdata = collection(db, "registration");
      const q = query(regsiterdata, where("finished", "==", true));
      onSnapshot(q, (snapshot) => {
        let regdata = [];
        snapshot.docs.forEach((doc) => {
          regdata.push({ ...doc.data(), id: doc.id });
        });
        const regstrationdata = regdata.reverse();
        setRegistrationData(regstrationdata);
        regdata.map(
          (data) => (
            setCname(data.customername),
            setevents(data.event),
            setsDate(moment.unix(data.startdate.seconds).format("DD/MM/YYYY")),
            seteDate(moment.unix(data.enddate.seconds).format("DD/MM/YYYY")),
            setdayss(data.numberofdays),
            setrentalAmount(data.rentalamnt)
          )
        );

        // setCname(regdata.map((data) => data.customername));
        // setevents(regdata.map((data) => data.event));

        // setsDate(regdata.map((data) => data.startdate.seconds));

        // seteDate(regdata.map((data) => data.enddate.seconds));

        // setdayss(regdata.map((data) => data.numberofdays));

        // setrentalAmount(regdata.map((data) => data.rentalamnt));

        setroomCost(
          regdata.map((data) =>
            data.rooms.map((data) => data.room + "-" + data.roomcost)
          )
        );

        setunit(regdata.map((data) => data.totalunit));

        setunitCost(regdata.map((data) => data.metercost));

        setcleaningPeople(regdata.map((data) => data.cleaningpeople));

        setcostPerPeople(regdata.map((data) => data.cleaningcostper));

        setcleaningCost(regdata.map((data) => data.cleaningcost));

        setwaterCost(regdata.map((data) => data.watercost));

        setgeneratorCost(regdata.map((data) => data.Generatorcost));

        setotherCost(
          regdata.map((cost) =>
            cost.otherco.map((data) => data.otherfor + "-" + data.othercost)
          )
        );

        settotalAmount(regdata.map((data) => data.totalamount));

        let totalrevenue = 0;
        let totaldays = 0;
        let totalrero = 0;
        regdata.forEach((data) => {
          totalrevenue += parseInt(data.rentalamnt);
          data.rooms.forEach((room) => {
            if (room.roomcost !== "") {
              totalrero += parseInt(room.roomcost);
            }
          });
          totaldays += parseInt(data.numberofdays);
        });

        const totalcalc = totalrevenue + totalrero;

        setTotalcost(totalcalc);
        settotalrerm(totalrero);
        setCount(regdata.length);
        setrevenue(totalrevenue);
        setDays(totaldays);
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
        let totalrevenue = 0;
        let totaldays = 0;
        let totalgeneratorcost = 0;
        let totalothercost = 0;
        let totalrero = 0;

        regdata.forEach((data) => {
          data.otherco.forEach((data) => {
            if (data.othercost !== "") {
              totalothercost += parseInt(data.othercost);
            }
          });

          totalrevenue += parseInt(data.rentalamnt);
          totalrero += parseInt(data.totalamount);

          totaldays += parseInt(data.numberofdays);

          totalgeneratorcost += parseInt(data.Generatorcost);
        });

        const totalcalc = totalrevenue + totalothercost;

        setTotalcost(totalcalc);
        settotalrerm(totalrero);
        setCount(regdata.length);
        setrevenue(totalrevenue);
        setDays(totaldays);
        setTotalgenerator(totalgeneratorcost);
      });
    }
  };
  const handleClear = () => {
    setStartDate("");
    setendDate("");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    regData();
  }, [startDate, endDate]);

  const ff = (re, ro, ot) => {
    const sum1 = parseInt(re);
    let sum2 = 0;
    ro.forEach((room) => {
      if (room.roomcost !== "") {
        sum2 += parseInt(room.roomcost);
      }
    });

    return <>{sum2 + sum1}</>;
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

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);

    const title = "Revenue Report";
    const tableColumn = [
      "S.NO",
      "Customer Name",
      "Event",
      "Start Date",
      "End Date",
      "Days",
      "Rental Amount",
      "Room Cost",

      "Generator Cost",

      "Total Amount",
    ];
    const tableRows = [];
    const test = [
      "Total",
      count,
      "",
      "",

      "",

      days,

      revenue,

      totalrerm,

      "",
      totalCost,

      // item.age.toString(),
    ];

    registrationdata.forEach((item, index) => {
      const amount = ff(item.rentalamnt, item.rooms);

      const rowData = [
        index + 1,
        item.customername,
        item.event,
        moment.unix(item.startdate.seconds).format("DD/MM/YYYY"),

        moment.unix(item.enddate.seconds).format("DD/MM/YYYY"),

        item.numberofdays,

        item.rentalamnt,
        item.rooms.map((room, index) => room.room + "-" + room.roomcost),

        item.Generatorcost,

        amount.props.children,

        // item.age.toString(),
      ];

      tableRows.push(rowData);
      console.log("rowData", rowData);
    });

    tableRows.push(test);
    let content = {
      startY: 50,
      head: [tableColumn],
      body: tableRows,

      theme: "grid",
    };

    doc.autoTable(content);
    doc.text(title, marginLeft, 40);
    doc.save("Expense Report.pdf");
  };

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">Revenue Report</h1>
          <div className="row" style={{ marginTop: "20px", display: "flex" }}>
            <div className="col-lg-12 ">
              <div className="backcard">
                <div className="exprtbtn">
                  <DownloadTableExcel
                    filename="Revenue Report"
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
                  <button
                    style={{
                      backgroundColor: "#0a408f",
                      color: "#fff",
                      borderColor: "#0a408f",
                      border: "1px solid #0a408f",
                    }}
                    onClick={() => generatePDF()}
                  >
                    {" "}
                    Export PDF
                  </button>
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
                  <table className="table table-bordered" ref={tableRef}>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Customer Name</th>
                        <th>Event</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Days</th>
                        <th>Rental Amount</th>
                        <th>room Cost</th>
                        <th>Generator Cost</th>
                        <th>Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrationdata.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
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
                          <td>{data.rentalamnt}</td>
                          <td>
                            {data.rooms.map((room, index) => (
                              <div key={index}>
                                {room.room}-{room.roomcost}
                              </div>
                            ))}
                          </td>

                          <td>{data.Generatorcost}</td>
                          <td>{ff(data.rentalamnt, data.rooms)}</td>
                        </tr>
                      ))}
                      <tr className="totalcount">
                        <td>Total :</td>
                        <td>{count}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{days}</td>
                        <td>{revenue}</td>
                        <td>{totalrerm}</td>
                        <td></td>
                        <td>{totalCost}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;
