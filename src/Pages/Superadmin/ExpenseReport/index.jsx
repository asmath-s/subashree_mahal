import React, { useState, useEffect, useRef } from "react";
import Header from "components/Header";
import YearPicker from "react-year-picker";
import Form from "react-bootstrap/Form";
import db from "../../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { DownloadTableExcel } from "react-export-table-to-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

const ExpenseReport = () => {
  const [selectedyear, setSelectedyear] = useState("");
  const [maintenancedata, setMaintenancedata] = useState([]);
  const [registrationdata, setRegistrationData] = useState([]);

  const [totalmaincost, setTotalmaincost] = useState("");
  const [totalmonmaincost, setTotalmonmaincost] = useState("");

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

  const [janmfor, setjanmfor] = useState("");

  const [Febmcost, setFebmcost] = useState(0);

  const [Febmfor, setFebmfor] = useState("");

  const [Marmcost, setMarmcost] = useState(0);

  const [Marmfor, setMarmfor] = useState("");

  const [Aprmcost, setAprmcost] = useState(0);

  const [Aprmfor, setAprmfor] = useState("");

  const [Maycost, setMaycost] = useState(0);

  const [Maymfor, setMaymfor] = useState("");

  const [Juncost, setJuncost] = useState(0);

  const [Junmfor, setJunmfor] = useState("");

  const [Julcost, setJulcost] = useState(0);

  const [Julmfor, setJulmfor] = useState("");

  const [Augcost, setAugcost] = useState(0);

  const [Augmfor, setAugmfor] = useState("");

  const [Sepcost, setSepcost] = useState(0);

  const [Sepmfor, setSepmfor] = useState("");

  const [Octcost, setOctcost] = useState(0);

  const [Octmfor, setOctmfor] = useState("");

  const [Novcost, setNovcost] = useState(0);

  const [Novmfor, setNovmfor] = useState("");

  const [Deccost, setDeccost] = useState(0);

  const [Decmfor, setDecmfor] = useState("");
  const [maintDataLength, setMaintDataLength] = useState("");

  const tableRef = useRef(null);

  const ExpenseTableValues = [
    {
      e1month: "January",
      e2maintenanceFor: janmfor,
      e3maintenanceCost: janmcost,

      e5total: January,
    },
    {
      e1month: "Feburary",
      e2maintenanceFor: Febmfor,
      e3maintenanceCost: Febmcost,

      e5total: Feburary,
    },
    {
      e1month: "March",
      e2maintenanceFor: Marmfor,
      e3maintenanceCost: Marmcost,

      e5total: March,
    },

    {
      e1month: "April",
      e2maintenanceFor: Aprmfor,
      e3maintenanceCost: Aprmcost,

      e5total: April,
    },

    {
      e1month: "May",
      e2maintenanceFor: Maymfor,
      e3maintenanceCost: Maycost,

      e5total: May,
    },
    {
      e1month: "June",
      e2maintenanceFor: Junmfor,
      e3maintenanceCost: Juncost,

      e5total: June,
    },
    {
      e1month: "July",
      e2maintenanceFor: Julmfor,
      e3maintenanceCost: Julcost,

      e5total: July,
    },
    {
      e1month: "August",
      e2maintenanceFor: Augmfor,
      e3maintenanceCost: Augcost,

      e5total: August,
    },
    {
      e1month: "September",
      e2maintenanceFor: Sepmfor,
      e3maintenanceCost: Sepcost,

      e5total: September,
    },
    {
      e1month: "October",
      e2maintenanceFor: Octmfor,
      e3maintenanceCost: Octcost,

      e5total: October,
    },
    {
      e1month: "November",
      e2maintenanceFor: Novmfor,
      e3maintenanceCost: Novcost,

      e5total: November,
    },
    {
      e1month: "December",
      e2maintenanceFor: Decmfor,
      e3maintenanceCost: Deccost,

      e5total: December,
    },
    {
      e1month: "Total",
      e2maintenanceFor: "",
      e3maintenanceCost: totalmaincost,
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
      const regsiterationdata = collection(db, "registration");
      const req = query(
        regsiterationdata,
        where("finished", "==", true),
        where("year", "==", currentyear)
      );
      onSnapshot(req, (snapshot) => {
        let regdata = [];
        snapshot.docs.forEach((doc) => {
          regdata.push({ ...doc.data(), id: doc.id });
        });
        console.log(regdata);
        setRegistrationData(regdata);
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
      const regsiterationdata = collection(db, "registration");
      const req = query(
        regsiterationdata,
        where("finished", "==", true),
        where("year", "==", selectedyear)
      );
      onSnapshot(req, (snapshot) => {
        let regdata = [];
        snapshot.docs.forEach((doc) => {
          regdata.push({ ...doc.data(), id: doc.id });
        });
        console.log(regdata);
        setRegistrationData(regdata);
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
    var regjan = [];
    var regwatjan = [];
    var regcleanjan = [];

    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "January") {
        data.otherco.map((d) => {
          regjan.push(d.othercost);
        });
        regwatjan.push(data.watercost);
        regcleanjan.push(data.cleaningcost);
      }
    });

    var Jantotalcost = 0;
    Jan.forEach((data) => {
      Jantotalcost += parseInt(data);
      setjanmcost(Jantotalcost);
    });
    var regjancost = 0;
    regjan.forEach((data) => {
      regjancost += parseInt(data);
    });

    //sum
    const jansum =
      parseInt(Jantotalcost) +
      parseInt(regjancost) +
      parseInt(regwatjan[0]) +
      parseInt(regcleanjan[0]);
    setJanuary(jansum);

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

    var regfeb = [];
    var regwatfeb = [];
    var regcleanfeb = [];
    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "February") {
        data.otherco.map((d) => {
          regfeb.push(d.othercost);
        });
        regwatfeb.push(data.watercost);
        regcleanfeb.push(data.cleaningcost);
      }
    });

    var Febtotalcost = 0;
    Feb.forEach((data) => {
      Febtotalcost += parseInt(data);
      setFebmcost(Febtotalcost);
    });

    var regfebcost = 0;
    regfeb.forEach((data) => {
      regfebcost += parseInt(data);
    });

    //sum
    const febsum =
      parseInt(Febtotalcost) +
      parseInt(regfebcost) +
      parseInt(regwatfeb[0]) +
      parseInt(regcleanfeb[0]);
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
    var regmar = [];
    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "March") {
        data.otherco.map((d) => {
          regmar.push(d.othercost);
        });
      }
    });

    var Marchtotalcost = 0;
    March.forEach((data) => {
      Marchtotalcost += parseInt(data);
      setMarmcost(Marchtotalcost);
    });

    var regmarcost = 0;
    regmar.forEach((data) => {
      regmarcost += parseInt(data);
    });

    //sum
    const marsum = parseInt(Marchtotalcost) + parseInt(regmarcost);
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
    var regapr = [];
    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "April") {
        data.otherco.map((d) => {
          regapr.push(d.othercost);
        });
      }
    });
    var Apriltotalcost = 0;
    April.forEach((data) => {
      Apriltotalcost += parseInt(data);
      setAprmcost(Apriltotalcost);
    });
    var regaprcost = 0;
    regapr.forEach((data) => {
      regaprcost += parseInt(data);
    });

    //sum
    const aprsum = parseInt(Apriltotalcost) + parseInt(regaprcost);
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
    var regmay = [];
    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "May") {
        data.otherco.map((d) => {
          regmay.push(d.othercost);
        });
      }
    });
    var Maytotalcost = 0;
    May.forEach((data) => {
      Maytotalcost += parseInt(data);
      setMaycost(Maytotalcost);
    });
    var regmaycost = 0;
    regmay.forEach((data) => {
      regmaycost += parseInt(data);
    });

    //sum
    const maysum = parseInt(Maytotalcost) + parseInt(regmaycost);
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
    var regjune = [];
    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "June") {
        data.otherco.map((d) => {
          regjune.push(d.othercost);
        });
      }
    });
    var Junetotalcost = 0;
    June.forEach((data) => {
      Junetotalcost += parseInt(data);
      setJuncost(Junetotalcost);
    });

    var regjunecost = 0;
    regjune.forEach((data) => {
      regjunecost += parseInt(data);
    });
    //sum
    const junsum = parseInt(Junetotalcost) + parseInt(regjunecost);
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
    var regjuly = [];
    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "July") {
        data.otherco.map((d) => {
          regjuly.push(d.othercost);
        });
      }
    });
    var Julytotalcost = 0;
    June.forEach((data) => {
      Julytotalcost += parseInt(data);
      setJulcost(Julytotalcost);
    });
    var regjulycost = 0;
    regjuly.forEach((data) => {
      regjulycost += parseInt(data);
    });

    //sum
    const julsum = parseInt(Julytotalcost) + parseInt(regjulycost);
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
    var regaug = [];
    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "August") {
        data.otherco.map((d) => {
          regaug.push(d.othercost);
        });
      }
    });
    var augtotalcost = 0;
    aug.forEach((data) => {
      augtotalcost += parseInt(data);
      setAugcost(augtotalcost);
    });
    var regaugcost = 0;
    regaug.forEach((data) => {
      regaugcost += parseInt(data);
    });

    //sum
    const augsum = parseInt(augtotalcost) + parseInt(regaugcost);
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
    var regsep = [];
    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "September") {
        data.otherco.map((d) => {
          regsep.push(d.othercost);
        });
      }
    });
    var Septembertotalcost = 0;
    September.forEach((data) => {
      Septembertotalcost += parseInt(data);
      setSepcost(Septembertotalcost);
    });
    var regsepcost = 0;
    regsep.forEach((data) => {
      regsepcost += parseInt(data);
    });

    //sum
    const sepsum = parseInt(Septembertotalcost) + parseInt(regsepcost);
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
    var regoct = [];
    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "October") {
        data.otherco.map((d) => {
          regoct.push(d.othercost);
        });
      }
    });
    var Octobertotalcost = 0;
    October.forEach((data) => {
      Octobertotalcost += parseInt(data);
      setOctcost(Octobertotalcost);
    });
    var regoctcost = 0;
    regoct.forEach((data) => {
      regoctcost += parseInt(data);
    });

    //sum
    const octsum = parseInt(Octobertotalcost) + parseInt(regoctcost);
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
    var regnov = [];
    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "November") {
        data.otherco.map((d) => {
          regnov.push(d.othercost);
        });
      }
    });
    var Novembertotalcost = 0;
    November.forEach((data) => {
      Novembertotalcost += parseInt(data);
      setNovcost(Novembertotalcost);
    });
    var regnovcost = 0;
    regnov.forEach((data) => {
      regnovcost += parseInt(data);
    });

    //sum
    const novsum = parseInt(Novembertotalcost) + parseInt(regnovcost);
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
    var regdec = [];
    registrationdata.forEach((data) => {
      if (moment.unix(data.startdate.seconds).format("MMMM") === "December") {
        data.otherco.map((d) => {
          regdec.push(d.othercost);
        });
      }
    });
    var Decembertotalcost = 0;
    December.forEach((data) => {
      Decembertotalcost += parseInt(data);
      setDeccost(Decembertotalcost);
    });
    var regdeccost = 0;
    regdec.forEach((data) => {
      regdeccost += parseInt(data);
    });

    //sum
    const decsum = parseInt(Decembertotalcost) + parseInt(regdeccost);
    setDecember(decsum);

    // ----------------December---------------
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
  }, [selectedyear, maintenancedata]);

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
                      Export Excel
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
                    Export PDF
                  </button>
                </div>

                <div className="row">
                  <Form action="">
                    <div className="row ">
                      <div className="col-lg-8 maintenacedetails ">
                        <Form.Label>
                          Please select the
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

                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "January" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "January" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "February" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "February" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "March" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "March" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "April" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "April" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "May" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "May" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "June" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "June" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "July" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "July" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "August" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "August" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "September" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "September" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "October" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "October" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "November" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "November" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "December" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.otherfor}</p>
                                ))}
                                <p>Water Cost</p>
                                <p>
                                  Cleaning({data.cleaningpeople} people)
                                  {data.cleaningcostper}/people
                                </p>
                              </>
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
                          {registrationdata.map((data) =>
                            moment
                              .unix(data.startdate.seconds)
                              .format("MMMM") === "December" ? (
                              <>
                                {data.otherco.map((d, index) => (
                                  <p key={index}>{d.othercost}</p>
                                ))}
                                <p>{data.watercost}</p>
                                <p>{data.cleaningcost}</p>
                              </>
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
                          <td></td>
                          <td>{totalmaincost}</td>
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
