/* eslint-disable */
import React, { useEffect, useState } from "react";
import Header from "components/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import db from "../../../firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Yearchart = () => {
  const [selectedyear, setSelectedyear] = useState("");
  const [maintenancedata, setMaintenancedata] = useState([]);
  const [monmaintenancedata, setmonMaintenancedata] = useState([]);
  const [totalmaincost, setTotalmaincost] = useState("");
  const [totalmonmaincost, setTotalmonmaincost] = useState("");
  const [JanuaryMaint, setJanuaryMaint] = useState("");
  const [totalMaint, settotalMaint] = useState("");
  const [January, setJanuary] = useState("");
  const [Feburary, setFeburary] = useState("");
  const [March, setMarch] = useState("");
  const [April, setApril] = useState("");
  const [May, setMay] = useState("");
  const [June, setJune] = useState("");
  const [July, setJuly] = useState("");
  const [August, setAugust] = useState("");
  const [September, setSeptember] = useState("");
  const [October, setOctober] = useState("");
  const [November, setNovember] = useState("");
  const [December, setDecember] = useState("");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [
          January,
          Feburary,
          March,
          April,
          May,
          June,
          July,
          August,
          September,
          October,
          November,
          December,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

  const regData = () => {
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
        // console.log("regdata", regdata);

        // total maintenance cost
        let totalmacost = 0;
        regdata.forEach((data) => {
          totalmacost += parseInt(data.maintenancecost);
        });
        // console.log("totalmacost", totalmacost);

        setTotalmaincost(totalmacost);
      });
      const monregsiterdata = collection(db, "monthlymaintenance");
      const qu = query(monregsiterdata, where("year", "==", currentyear));
      onSnapshot(qu, (snapshot) => {
        let monregdata = [];
        snapshot.docs.forEach((doc) => {
          monregdata.push({ ...doc.data(), id: doc.id });
        });
        setmonMaintenancedata(monregdata);
        // console.log("monregdata", monregdata);

        // total monthly maintenance cost
        let totalmomacost = 0;
        monregdata.forEach((data) => {
          totalmomacost += parseInt(data.montlymaintenancecost);
        });
        setTotalmonmaincost(totalmomacost);
        // console.log("totalmomacost", totalmomacost);

        // console.log("expense amount", totalmomacost + totalmaincost);
      });
    } else {
      const regsiterdata = collection(db, "maintenance");
      const q = query(regsiterdata, where("year", "==", selectedyear));
      onSnapshot(q, (snapshot) => {
        const regdata = [];
        snapshot.docs.forEach((doc) => {
          regdata.push({ ...doc.data(), id: doc.id });
        });
        // setMaintenancedata(regdata);
        console.log("regdata", regdata);

        // total maintenance cost
        const totalmacost = 0;
        regdata.forEach((data) => {
          totalmacost += parseInt(data.maintenancecost);
        });
        setTotalmonmaincost(totalmacost);
        // console.log("totalmacost", totalmacost);
      });
      const monregsiterdata = collection(db, "monthlymaintenance");
      const qu = query(monregsiterdata, where("year", "==", selectedyear));
      onSnapshot(qu, (snapshot) => {
        const monregdata = [];
        snapshot.docs.forEach((doc) => {
          monregdata.push({ ...doc.data(), id: doc.id });
        });
        setmonMaintenancedata(monregdata);
        // total monthly maintenance cost
        const totalmomacost = 0;
        monregdata.forEach((data) => {
          totalmomacost += parseInt(data.montlymaintenancecost);
        });
        setTotalmonmaincost(totalmomacost);
      });
    }
    totalCal();
  };

  console.log("maintenancedata", maintenancedata);

  const totalCal = () => {
    // ------------January-------------------
    //maintenance cost
    var Jan = [];
    maintenancedata.forEach((data) => {
      if ("January" === data.month) {
        Jan.push(data.maintenancecost);
      }
    });
    var Jantotalcost = 0;
    Jan.forEach((data) => {
      Jantotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var Jan1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("January" === data.month) {
        Jan1 = data.montlymaintenancecost;
      }
    });
    //sum
    setJanuary(parseInt(parseInt(Jan1) + parseInt(Jantotalcost)));
    // console.log("first", parseInt(parseInt(Jan1) + parseInt(Jantotalcost)));
    // ----------------January---------------

    // ------------Feburary-------------------
    //maintenance cost
    var Feb = [];
    maintenancedata.forEach((data) => {
      if ("Feburary" === data.month) {
        Feb.push(data.maintenancecost);
      }
    });
    var Febtotalcost = 0;
    Feb.forEach((data) => {
      Febtotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var Feb1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("Feburary" === data.month) {
        Feb1 = data.montlymaintenancecost;
      }
    });
    //sum
    setFeburary(parseInt(parseInt(Feb1) + parseInt(Febtotalcost)));
    // ----------------Feburary---------------

    // ------------March-------------------
    //maintenance cost
    var March = [];
    maintenancedata.forEach((data) => {
      if ("Feburary" === data.month) {
        March.push(data.maintenancecost);
      }
    });
    var Marchtotalcost = 0;
    March.forEach((data) => {
      Marchtotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var March1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("Feburary" === data.month) {
        March1 = data.montlymaintenancecost;
      }
    });
    //sum
    setMarch(parseInt(parseInt(March1) + parseInt(Marchtotalcost)));
    // ----------------March---------------

    // ------------April-------------------
    //maintenance cost
    var April = [];
    maintenancedata.forEach((data) => {
      if ("April" === data.month) {
        April.push(data.maintenancecost);
      }
    });
    var Apriltotalcost = 0;
    April.forEach((data) => {
      Apriltotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var April1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("April" === data.month) {
        April1 = data.montlymaintenancecost;
      }
    });
    //sum
    setApril(parseInt(parseInt(April1) + parseInt(Apriltotalcost)));
    // ----------------April---------------

    // ------------May-------------------
    //maintenance cost
    var May = [];
    maintenancedata.forEach((data) => {
      if ("May" === data.month) {
        May.push(data.maintenancecost);
      }
    });
    var Maytotalcost = 0;
    May.forEach((data) => {
      Maytotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var May1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("May" === data.month) {
        May1 = data.montlymaintenancecost;
      }
    });
    //sum
    setMay(parseInt(parseInt(May1) + parseInt(Maytotalcost)));
    // ----------------May---------------

    // ------------June-------------------
    //maintenance cost
    var June = [];
    maintenancedata.forEach((data) => {
      if ("June" === data.month) {
        June.push(data.maintenancecost);
      }
    });
    var Junetotalcost = 0;
    June.forEach((data) => {
      Junetotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var June1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("June" === data.month) {
        June1 = data.montlymaintenancecost;
      }
    });
    //sum
    setJune(parseInt(parseInt(June1) + parseInt(Junetotalcost)));
    // ----------------June---------------

    // ------------July-------------------
    //maintenance cost
    var July = [];
    maintenancedata.forEach((data) => {
      if ("July" === data.month) {
        July.push(data.maintenancecost);
      }
    });
    var Julytotalcost = 0;
    June.forEach((data) => {
      Julytotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var July1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("July" === data.month) {
        July1 = data.montlymaintenancecost;
      }
    });
    //sum
    setJuly(parseInt(parseInt(July1) + parseInt(Julytotalcost)));
    // ----------------July---------------

    // ------------August-------------------
    //maintenance cost
    var aug = [];
    maintenancedata.forEach((data) => {
      if ("August" === data.month) {
        aug.push(data.maintenancecost);
      }
    });
    var augtotalcost = 0;
    aug.forEach((data) => {
      augtotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var aug1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("August" === data.month) {
        aug1 = data.montlymaintenancecost;
      }
    });
    //sum
    setAugust(parseInt(parseInt(aug1) + parseInt(augtotalcost)));
    // ----------------August---------------

    // ------------September-------------------
    //maintenance cost
    var September = [];
    maintenancedata.forEach((data) => {
      if ("September" === data.month) {
        September.push(data.maintenancecost);
      }
    });
    var Septembertotalcost = 0;
    September.forEach((data) => {
      Septembertotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var September1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("September" === data.month) {
        September1 = data.montlymaintenancecost;
      }
    });
    //sum
    setSeptember(parseInt(parseInt(September1) + parseInt(Septembertotalcost)));
    // ----------------September---------------

    // ------------October-------------------
    //maintenance cost
    var October = [];
    maintenancedata.forEach((data) => {
      if ("October" === data.month) {
        October.push(data.maintenancecost);
      }
    });
    var Octobertotalcost = 0;
    October.forEach((data) => {
      Octobertotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var October1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("October" === data.month) {
        October1 = data.montlymaintenancecost;
      }
    });
    //sum
    setOctober(parseInt(parseInt(October1) + parseInt(Octobertotalcost)));
    // ----------------October---------------

    // ------------November-------------------
    //maintenance cost
    var November = [];
    maintenancedata.forEach((data) => {
      if ("November" === data.month) {
        November.push(data.maintenancecost);
      }
    });
    var Novembertotalcost = 0;
    November.forEach((data) => {
      Novembertotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var November1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("November" === data.month) {
        November1 = data.montlymaintenancecost;
      }
    });
    //sum
    setNovember(parseInt(parseInt(November1) + parseInt(Novembertotalcost)));
    // ----------------November---------------

    // ------------December-------------------
    //maintenance cost
    var December = [];
    maintenancedata.forEach((data) => {
      if ("December" === data.month) {
        December.push(data.maintenancecost);
      }
    });
    var Decembertotalcost = 0;
    December.forEach((data) => {
      Decembertotalcost += parseInt(data);
    });
    // monthly maintenance cost
    var December1 = 0;
    monmaintenancedata.forEach((data) => {
      if ("December" === data.month) {
        December1 = data.montlymaintenancecost;
      }
    });
    //sum
    setDecember(parseInt(parseInt(December1) + parseInt(Decembertotalcost)));
    // ----------------December---------------

    //total
    const total = totalmaincost + totalmonmaincost;
    settotalMaint(total);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    regData();
  }, []);

  useEffect(() => {
    totalCal();
  });
  // options

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">Yearly Chart</h1>
          <div className="row" style={{ marginTop: "20px", display: "flex" }}>
            <div className="col-lg-12 ">
              <div className="backcard">
                <Bar options={options} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yearchart;
