/*eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import Header from "components/Header";
import YearPicker from "react-year-picker";
import Form from "react-bootstrap/Form";
import db from "../../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { DownloadTableExcel } from "react-export-table-to-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ExpenseReport = () => {
  const [selectedyear, setSelectedyear] = useState("");
  const [maintenancedata, setMaintenancedata] = useState([]);
  const [monmaintenancedata, setmonMaintenancedata] = useState([]);
  const [totalmaincost, setTotalmaincost] = useState("");
  const [totalmonmaincost, setTotalmonmaincost] = useState("");

  const [totalMaint, settotalMaint] = useState("");

  const [January, setJanuary] = useState(0);
  const [Feburary, setFeburary] = useState(0);
  const [March, setMarch] = useState(0);
  const [April, setApril] = useState(0);
  const [May, setMay] = useState(0);
  const [June, setJune] = useState(0);
  const [July, setJuly] = useState(0);
  const [August, setAugust] = useState(0);
  const [September, setSeptember] = useState(0);
  const [October, setOctober] = useState(0);
  const [November, setNovember] = useState(0);
  const [December, setDecember] = useState(0);

  const [janmcost, setjanmcost] = useState(0);
  const [janmmcost, setjanmmcost] = useState(0);
  const [janmfor, setjanmfor] = useState("");

  const [Febmcost, setFebmcost] = useState(0);
  const [Febmmcost, setFebmmcost] = useState(0);
  const [Febmfor, setFebmfor] = useState("");

  const [Marmcost, setMarmcost] = useState(0);
  const [Marmmcost, setMarmmcost] = useState(0);
  const [Marmfor, setMarmfor] = useState("");

  const [Aprmcost, setAprmcost] = useState(0);
  const [Aprmmcost, setAprmmcost] = useState(0);
  const [Aprmfor, setAprmfor] = useState("");

  const [Maycost, setMaycost] = useState(0);
  const [Maymmcost, setMaymmcost] = useState(0);
  const [Maymfor, setMaymfor] = useState("");

  const [Juncost, setJuncost] = useState(0);
  const [Junmmcost, setJunmmcost] = useState(0);
  const [Junmfor, setJunmfor] = useState("");

  const [Julcost, setJulcost] = useState(0);
  const [Julmmcost, setJulmmcost] = useState(0);
  const [Julmfor, setJulmfor] = useState("");

  const [Augcost, setAugcost] = useState(0);
  const [Augmmcost, setAugmmcost] = useState(0);
  const [Augmfor, setAugmfor] = useState("");

  const [Sepcost, setSepcost] = useState(0);
  const [Sepmmcost, setSepmmcost] = useState(0);
  const [Sepmfor, setSepmfor] = useState("");

  const [Octcost, setOctcost] = useState(0);
  const [Octmmcost, setOctmmcost] = useState(0);
  const [Octmfor, setOctmfor] = useState("");

  const [Novcost, setNovcost] = useState(0);
  const [Novmmcost, setNovmmcost] = useState(0);
  const [Novmfor, setNovmfor] = useState("");

  const [Deccost, setDeccost] = useState(0);
  const [Decmmcost, setDecmmcost] = useState(0);
  const [Decmfor, setDecmfor] = useState("");
  const [maintDataLength, setMaintDataLength] = useState("");

  const tableRef = useRef(null);

  const ExpenseTableValues = [
    {
      e1month: "January",
      e2maintenanceFor: janmfor,
      e3maintenanceCost: janmcost,
      e4monthlyMaintenanceCost: janmmcost,
      e5total: January,
    },
    {
      e1month: "Feburary",
      e2maintenanceFor: Febmfor,
      e3maintenanceCost: Febmcost,
      e4monthlyMaintenanceCost: Febmmcost,
      e5total: Feburary,
    },
    {
      e1month: "March",
      e2maintenanceFor: Marmfor,
      e3maintenanceCost: Marmcost,
      e4monthlyMaintenanceCost: Marmmcost,
      e5total: March,
    },

    {
      e1month: "April",
      e2maintenanceFor: Aprmfor,
      e3maintenanceCost: Aprmcost,
      e4monthlyMaintenanceCost: Aprmmcost,
      e5total: April,
    },

    {
      e1month: "May",
      e2maintenanceFor: Maymfor,
      e3maintenanceCost: Maycost,
      e4monthlyMaintenanceCost: Maymmcost,
      e5total: May,
    },
    {
      e1month: "June",
      e2maintenanceFor: Junmfor,
      e3maintenanceCost: Juncost,
      e4monthlyMaintenanceCost: Junmmcost,
      e5total: June,
    },
    {
      e1month: "July",
      e2maintenanceFor: Julmfor,
      e3maintenanceCost: Julcost,
      e4monthlyMaintenanceCost: Julmmcost,
      e5total: July,
    },
    {
      e1month: "August",
      e2maintenanceFor: Augmfor,
      e3maintenanceCost: Augcost,
      e4monthlyMaintenanceCost: Augmmcost,
      e5total: August,
    },
    {
      e1month: "September",
      e2maintenanceFor: Sepmfor,
      e3maintenanceCost: Sepcost,
      e4monthlyMaintenanceCost: Sepmmcost,
      e5total: September,
    },
    {
      e1month: "October",
      e2maintenanceFor: Octmfor,
      e3maintenanceCost: Octcost,
      e4monthlyMaintenanceCost: Octmmcost,
      e5total: October,
    },
    {
      e1month: "November",
      e2maintenanceFor: Novmfor,
      e3maintenanceCost: Novcost,
      e4monthlyMaintenanceCost: Novmmcost,
      e5total: November,
    },
    {
      e1month: "December",
      e2maintenanceFor: Decmfor,
      e3maintenanceCost: Deccost,
      e4monthlyMaintenanceCost: Decmmcost,
      e5total: December,
    },
    {
      e1month: "Total",
      e2maintenanceFor: "",
      e3maintenanceCost: totalmaincost,
      e4monthlyMaintenanceCost: totalmonmaincost,
      e5total: totalMaint,
    },
  ];

  // const printpdf = () => {
  //   const doc = new jsPDF();
  //   doc.autoTable({ html: "#my-table" });
  //   doc.save("table.pdf");
  // };

  console.log("selectedyear", selectedyear);
  console.log("maintDataLength", maintDataLength);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Expense Report";
    const headers = [
      [
        "Month",
        "Maintenance For",
        "Maintenance Cost",
        "Monthly Maintenance Cost",
        "Total",
      ],
    ];

    const data = ExpenseTableValues.map((elt) => [
      elt.e1month,
      elt.e2maintenanceFor,
      elt.e3maintenanceCost,
      elt.e4monthlyMaintenanceCost,
      elt.e5total,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
      theme: "grid",
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Expense Report.pdf");
  };

  // const pdfPrint = () => {
  //   var printContents = document.getElementById("printDiv").innerHTML;
  //   var originalContents = document.body.innerHTML;
  //   document.body.innerHTML = printContents;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  // };

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
        setMaintDataLength(regdata.length);

        // total maintenance cost
        if (regdata === "") {
          setTotalmaincost("");
        } else {
          let totalmacost = 0;
          regdata.forEach((data) => {
            totalmacost += parseInt(data.maintenancecost);
          });
          setTotalmaincost(totalmacost);
        }
      });

      const monregsiterdata = collection(db, "monthlymaintenance");
      const qu = query(monregsiterdata, where("year", "==", currentyear));
      onSnapshot(qu, (snapshot) => {
        let monregdata = [];
        snapshot.docs.forEach((doc) => {
          monregdata.push({ ...doc.data(), id: doc.id });
        });
        setmonMaintenancedata(monregdata);

        // total monthly maintenance cost
        if (monregdata === "") {
          setTotalmonmaincost("");
        } else {
          let totalmomacost = 0;
          monregdata.forEach((data) => {
            totalmomacost += parseInt(data.montlymaintenancecost);
          });
          setTotalmonmaincost(totalmomacost);
        }
      });
    } else {
      const regsiterdata = collection(db, "maintenance");
      const q = query(regsiterdata, where("year", "==", selectedyear));
      onSnapshot(q, (snapshot) => {
        const regdata = [];
        snapshot.docs.forEach((doc) => {
          regdata.push({ ...doc.data(), id: doc.id });
        });
        setMaintenancedata(regdata);
        // total maintenance cost
        if (regdata === "") {
          setTotalmaincost("");
        } else {
          let totalmacost = 0;
          regdata.forEach((data) => {
            totalmacost += parseInt(data.maintenancecost);
          });
          setTotalmaincost(totalmacost);
        }
      });
      const monregsiterdata = collection(db, "monthlymaintenance");
      const qu = query(monregsiterdata, where("year", "==", selectedyear));
      onSnapshot(qu, (snapshot) => {
        const monregdata = [];
        snapshot.docs.forEach((doc) => {
          monregdata.push({ ...doc.data(), id: doc.id });
        });
        setmonMaintenancedata(monregdata);
        if (monregdata === "") {
          setTotalmonmaincost("");
        } else {
          let totalmomacost = 0;
          monregdata.forEach((data) => {
            totalmomacost += parseInt(data.montlymaintenancecost);
          });
          setTotalmonmaincost(totalmomacost);
        }
      });
    }
  };
  const totalCal = () => {
    // ------------January-------------------
    //maintenance cost

    var Jan = [];
    maintenancedata.forEach((data) => {
      if ("January" === data.month) {
        Jan.push(data.maintenancecost);
        setjanmfor(data.maintenancefor);
      }
    });
    var Jantotalcost = 0;
    Jan.forEach((data) => {
      Jantotalcost += parseInt(data);
      setjanmcost(Jantotalcost);
    });

    // monthly maintenance cost
    var Jan1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("January" === data.month) {
        Jan1 = data.montlymaintenancecost;
        setjanmmcost(Jan1);
      }
    });

    //sum

    const sum1 = parseInt(Jantotalcost) + parseInt(Jan1);
    setJanuary(sum1);

    // ----------------January---------------

    // ------------Feburary-------------------
    //maintenance cost
    var Feb = [];
    maintenancedata.forEach((data) => {
      if ("Feburary" === data.month) {
        Feb.push(data.maintenancecost);
        setFebmfor(data.maintenancefor);
      }
    });
    var Febtotalcost = 0;
    Feb.forEach((data) => {
      Febtotalcost += parseInt(data);
      setFebmcost(Febtotalcost);
    });
    // monthly maintenance cost
    var Feb1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("Feburary" === data.month) {
        Feb1 = data.montlymaintenancecost;
        setFebmmcost(Feb1);
      }
    });
    //sum
    const febsum = parseInt(Febtotalcost) + parseInt(Feb1);
    setFeburary(febsum);
    // ----------------Feburary---------------

    // ------------March-------------------
    //maintenance cost
    var March = [];
    maintenancedata.forEach((data) => {
      if ("March" === data.month) {
        March.push(data.maintenancecost);
        setMarmfor(data.maintenancefor);
      }
    });
    var Marchtotalcost = 0;
    March.forEach((data) => {
      Marchtotalcost += parseInt(data);
      setMarmcost(Marchtotalcost);
    });
    // monthly maintenance cost
    var March1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("March" === data.month) {
        March1 = data.montlymaintenancecost;
        setMarmmcost(March1);
      }
    });

    //sum
    const marsum = parseInt(Marchtotalcost) + parseInt(March1);
    setMarch(marsum);

    // ----------------March---------------

    // ------------April-------------------
    //maintenance cost
    var April = [];
    maintenancedata.forEach((data) => {
      if ("April" === data.month) {
        April.push(data.maintenancecost);
        setAprmfor(data.maintenancefor);
      }
    });
    var Apriltotalcost = 0;
    April.forEach((data) => {
      Apriltotalcost += parseInt(data);
      setAprmcost(Apriltotalcost);
    });
    // monthly maintenance cost
    var April1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("April" === data.month) {
        April1 = data.montlymaintenancecost;
        setAprmmcost(April1);
      }
    });
    //sum
    const aprsum = parseInt(Apriltotalcost) + parseInt(April1);
    setApril(aprsum);

    // ----------------April---------------

    // ------------May-------------------
    //maintenance cost
    var May = [];
    maintenancedata.forEach((data) => {
      if ("May" === data.month) {
        May.push(data.maintenancecost);
        setMaymfor(data.maintenancefor);
      }
    });
    var Maytotalcost = 0;
    May.forEach((data) => {
      Maytotalcost += parseInt(data);
      setMaycost(Maytotalcost);
    });
    // monthly maintenance cost
    var May1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("May" === data.month) {
        May1 = data.montlymaintenancecost;
        setMaymmcost(May1);
      }
    });
    //sum
    const maysum = parseInt(Maytotalcost) + parseInt(May1);
    setMay(maysum);

    // ----------------May---------------

    // ------------June-------------------
    //maintenance cost
    var June = [];
    maintenancedata.forEach((data) => {
      if ("June" === data.month) {
        June.push(data.maintenancecost);
        setJunmfor(data.maintenancefor);
      }
    });
    var Junetotalcost = 0;
    June.forEach((data) => {
      Junetotalcost += parseInt(data);
      setJuncost(Junetotalcost);
    });
    // monthly maintenance cost
    var June1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("June" === data.month) {
        June1 = data.montlymaintenancecost;
        setJunmmcost(June1);
      }
    });
    //sum
    const junsum = parseInt(Junetotalcost) + parseInt(June1);
    setJune(junsum);

    // ----------------June---------------

    // ------------July-------------------
    //maintenance cost
    var July = [];
    maintenancedata.forEach((data) => {
      if ("July" === data.month) {
        July.push(data.maintenancecost);
        setJulmfor(data.maintenancefor);
      }
    });
    var Julytotalcost = 0;
    June.forEach((data) => {
      Julytotalcost += parseInt(data);
      setJulcost(Julytotalcost);
    });
    // monthly maintenance cost
    var July1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("July" === data.month) {
        July1 = data.montlymaintenancecost;
        setJulmmcost(July1);
      }
    });
    //sum
    const julsum = parseInt(Julytotalcost) + parseInt(July1);
    setJuly(julsum);

    // ----------------July---------------

    // ------------August-------------------
    //maintenance cost
    var aug = [];
    maintenancedata.forEach((data) => {
      if ("August" === data.month) {
        aug.push(data.maintenancecost);
        setAugmfor(data.maintenancefor);
      }
    });
    var augtotalcost = 0;
    aug.forEach((data) => {
      augtotalcost += parseInt(data);
      setAugcost(augtotalcost);
    });
    // monthly maintenance cost
    var aug1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("August" === data.month) {
        aug1 = data.montlymaintenancecost;
        setAugmmcost(aug1);
      }
    });

    //sum
    const augsum = parseInt(augtotalcost) + parseInt(aug1);
    setAugust(augsum);

    // ----------------August---------------

    // ------------September-------------------
    //maintenance cost
    var September = [];
    maintenancedata.forEach((data) => {
      if ("September" === data.month) {
        September.push(data.maintenancecost);
        setSepmfor(data.maintenancefor);
      }
    });
    var Septembertotalcost = 0;
    September.forEach((data) => {
      Septembertotalcost += parseInt(data);
      setSepcost(Septembertotalcost);
    });
    // monthly maintenance cost
    var September1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("September" === data.month) {
        September1 = data.montlymaintenancecost;
        setSepmmcost(September1);
      }
    });
    //sum
    const sepsum = parseInt(Septembertotalcost) + parseInt(September1);
    setSeptember(sepsum);

    // ----------------September---------------

    // ------------October-------------------
    //maintenance cost
    var October = [];
    maintenancedata.forEach((data) => {
      if ("October" === data.month) {
        October.push(data.maintenancecost);
        setOctmfor(data.maintenancefor);
      }
    });
    var Octobertotalcost = 0;
    October.forEach((data) => {
      Octobertotalcost += parseInt(data);
      setOctcost(Octobertotalcost);
    });
    // monthly maintenance cost
    var October1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("October" === data.month) {
        October1 = data.montlymaintenancecost;
        setOctmmcost(October1);
      }
    });
    //sum
    const octsum = parseInt(Octobertotalcost) + parseInt(October1);
    setOctober(octsum);

    // ----------------October---------------

    // ------------November-------------------
    //maintenance cost
    var November = [];
    maintenancedata.forEach((data) => {
      if ("November" === data.month) {
        November.push(data.maintenancecost);
        setNovmfor(data.maintenancefor);
      }
    });
    var Novembertotalcost = 0;
    November.forEach((data) => {
      Novembertotalcost += parseInt(data);
      setNovcost(Novembertotalcost);
    });
    // monthly maintenance cost
    var November1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("November" === data.month) {
        November1 = data.montlymaintenancecost;
        setNovmmcost(November1);
      }
    });
    //sum
    const novsum = parseInt(Novembertotalcost) + parseInt(November1);
    setNovember(novsum);

    // ----------------November---------------

    // ------------December-------------------
    //maintenance cost
    var December = [];
    maintenancedata.forEach((data) => {
      if ("December" === data.month) {
        December.push(data.maintenancecost);
        setDecmfor(data.maintenancefor);
      }
    });
    var Decembertotalcost = 0;
    December.forEach((data) => {
      Decembertotalcost += parseInt(data);
      setDeccost(Decembertotalcost);
    });
    // monthly maintenance cost
    var December1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("December" === data.month) {
        December1 = data.montlymaintenancecost;
        setDecmmcost(December1);
      }
    });
    //sum
    const decsum = parseInt(Decembertotalcost) + parseInt(December1);
    setDecember(decsum);

    // ----------------December---------------

    //total
    const total = totalmaincost + totalmonmaincost;
    settotalMaint(total);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    regData();
  }, [selectedyear]);

  useEffect(() => {
    totalCal();
  }, [selectedyear, maintenancedata, monmaintenancedata]);

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">Maintenance Report</h1>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-lg-12 ">
              <div className="backcard">
                <div className="exprtbtn">
                  {" "}
                  <DownloadTableExcel
                    filename="Expense Report"
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
                      Export Excel{" "}
                    </button>
                  </DownloadTableExcel>
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

                <div className="row">
                  <Form action="">
                    <div className="row ">
                      <div className="col-lg-8 maintenacedetails ">
                        <Form.Label>
                          {" "}
                          Please select the{" "}
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
                  <table className="table table-bordered gaptab" ref={tableRef}>
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Maintenance For</th>
                        <th>Maintenance Cost</th>
                        <th>Monthly Maintenance Cost</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* January */}
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
                          {monmaintenancedata.map((data) =>
                            data.month === "January" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td> {January === 0 ? null : January}</td>
                      </tr>
                      {/* Feburary */}
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
                          {monmaintenancedata.map((data) =>
                            data.month === "Feburary" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td> {Feburary === 0 ? null : Feburary}</td>
                      </tr>
                      {/* March */}
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
                          {monmaintenancedata.map((data) =>
                            data.month === "March" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td> {March === 0 ? null : March}</td>
                      </tr>
                      {/* April */}
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
                          {monmaintenancedata.map((data) =>
                            data.month === "April" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>{April === 0 ? null : April}</td>
                      </tr>
                      {/* May */}
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
                          {monmaintenancedata.map((data) =>
                            data.month === "May" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>{May === 0 ? null : May}</td>
                      </tr>
                      {/* June */}
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
                          {monmaintenancedata.map((data) =>
                            data.month === "June" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>{June === 0 ? null : June}</td>
                      </tr>
                      {/* July */}
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
                          {monmaintenancedata.map((data) =>
                            data.month === "July" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>{July === 0 ? null : July}</td>
                      </tr>
                      {/* August */}
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
                          {monmaintenancedata.map((data) =>
                            data.month === "August" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>{August === 0 ? null : August}</td>
                      </tr>
                      {/* september */}
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
                          {monmaintenancedata.map((data) =>
                            data.month === "September" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>{September === 0 ? null : September}</td>
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
                          {monmaintenancedata.map((data) =>
                            data.month === "October" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>{October === 0 ? null : October}</td>
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
                          {monmaintenancedata.map((data) =>
                            data.month === "November" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>

                        <td>{November === 0 ? null : November}</td>
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
                          {monmaintenancedata.map((data) =>
                            data.month === "December" ? (
                              <p>{data.montlymaintenancecost}</p>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>{December === 0 ? null : December}</td>
                      </tr>

                      {totalmonmaincost === 0 ? null : (
                        <tr className="totalcount">
                          <td>Total :</td>
                          <td></td>
                          <td>{totalmaincost}</td>
                          <td>{totalmonmaincost}</td>
                          <td>{totalMaint}</td>
                        </tr>
                      )}
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

export default ExpenseReport;
