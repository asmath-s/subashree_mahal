/* eslint-disable */
import React, { useEffect, useState } from "react";
import Header from "components/Header";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Form from "react-bootstrap/Form";
import YearPicker from "react-year-picker";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  where,
} from "firebase/firestore";
import db from "../../../firebase";
import { Bar } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const [registrationdata, setRegistrationData] = useState([]);
  const [regGetdata, setregGetdata] = useState([]);
  const [Data, setData] = useState("");
  const [year, setyear] = useState([]);

  const [startDate, setstartDate] = useState([]);
  const [selectedyear, setSelectedyear] = useState([]);
  const [tt, settt] = useState([]);
  const [Jan, setJan] = useState("");
  const [Feb, setFeb] = useState("");

  const [Mar, setMar] = useState("");

  const [Apr, setApr] = useState("");

  const [May, setMay] = useState("");

  const [June, setJune] = useState("");

  const [July, setJuly] = useState("");

  const [Aug, setAug] = useState("");

  const [Sept, setSept] = useState("");

  const [Oct, setOct] = useState("");

  const [Nov, setNov] = useState("");

  const [Dec, setDec] = useState("");

  const [janCost, setJancost] = useState("");
  const [febCost, setFebcost] = useState("");
  const [marCost, setMarcost] = useState("");
  const [aprCost, setAprcost] = useState("");
  const [mayCost, setMaycost] = useState("");
  const [junCost, setJuncost] = useState("");
  const [julCost, setJulcost] = useState("");
  const [augcost, setAugcost] = useState("");
  const [sepCost, setSepcost] = useState("");
  const [octCost, setOctcost] = useState("");
  const [novCost, setNovcost] = useState("");
  const [decCost, setDeccost] = useState("");

  const [selectedyears, setSelectedyears] = useState("");
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
  const [may, setmay] = useState("");
  const [june, setjune] = useState("");
  const [july, setjuly] = useState("");
  const [August, setAugust] = useState("");
  const [September, setSeptember] = useState("");
  const [October, setOctober] = useState("");
  const [November, setNovember] = useState("");
  const [December, setDecember] = useState("");

  useEffect(() => {
    // regExpenseTotalData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    totalCal();
  });

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [Jan, Feb, Mar, Apr, May, June, July, Aug, Sept, Oct, Nov, Dec],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          " #efbef3",
          "#f99090",
          "#3bffda",
          "#c7f185",
          "#fbdb8e",
          "#d1c3c3",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "#8c4091",
          "#f76666",
          "#2ac7a9",
          "#91b15f",
          "#bda365",
          "#917f7f",
        ],
        borderWidth: 1,
      },
    ],
  };

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

  const options1 = {
    responsive: true,
    // maintainAspectRatio: true,
    aspectRatio: 2,

    maintainAspectRatio: false,

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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data1 = {
    labels,
    datasets: [
      {
        label: "Revenue Amount ",
        data: [
          janCost,
          febCost,
          marCost,
          aprCost,
          mayCost,
          junCost,
          julCost,
          augcost,
          sepCost,
          octCost,
          novCost,
          decCost,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Maintenance Amount",
        data: [
          January,
          Feburary,
          March,
          April,
          may,
          june,
          july,
          August,
          September,
          October,
          November,
          December,
        ],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  function toDateTime(secs) {
    var epoch = new Date(0);
    epoch.setSeconds(parseInt(secs));
    var date = epoch.getMonth();
    date = date + 1;
    return date;
  }

  function toDateYear(secs) {
    var epoch = new Date(0);
    epoch.setSeconds(parseInt(secs));
    var date = epoch.getFullYear();
    return date;
  }

  const handleBookingEvent = (e) => {
    setSelectedyear(e);

    const regsiterdata = collection(db, "registration");
    const q = query(
      regsiterdata,
      where("year", "==", e),
      where("finished", "==", true)
    );
    onSnapshot(q, (snapshot) => {
      let regdata = [];
      snapshot.docs.forEach((doc) => {
        regdata.push({ ...doc.data(), id: doc.id });
      });
      console.log("Data", regdata.length);
      setregGetdata(regdata);
      setData(regdata.length);

      const Sdate = regdata.map((date) => toDateTime(date.startdate.seconds));
      setstartDate(Sdate);
      console.log("startdate", Sdate);

      const one = Sdate.filter((element) => element === 1);
      setJan(one.length);
      // console.log("one", one.length);

      const two = Sdate.filter((element) => element === 2);
      setFeb(two.length);
      // console.log("two", two.length);

      const three = Sdate.filter((element) => element === 3);
      setMar(three.length);
      // console.log("three", three.length);

      const four = Sdate.filter((element) => element === 4);
      setApr(four.length);
      // console.log("four", four.length);

      const five = Sdate.filter((element) => element === 5);
      setMay(five.length);
      // console.log("five", five.length);

      const six = Sdate.filter((element) => element === 6);
      setJune(six.length);
      // console.log("six", six.length);

      const seven = Sdate.filter((element) => element === 7);
      setJuly(seven.length);
      // console.log("seven", seven.length);

      const eight = Sdate.filter((element) => element === 8);
      setAug(eight.length);
      // console.log("eight", eight.length);

      const nine = Sdate.filter((element) => element === 9);
      setSept(nine.length);
      // console.log("nine", nine.length);

      const ten = Sdate.filter((element) => element === 10);
      setOct(ten.length);
      // console.log("ten", ten.length);

      const eleven = Sdate.filter((element) => element === 11);
      setNov(eleven.length);
      // console.log("eleven", eleven.length);

      const twelve = Sdate.filter((element) => element === 12);
      setDec(twelve.length);
      // console.log("twelve", twelve.length);

      // ------Revenue Amount Calculation Start-------
      // jan
      var Jan = [];
      regdata.forEach((data) => {
        if ("01" === moment.unix(data.startdate.seconds).format("MM")) {
          Jan.push(data.Balance);
        }
      });
      var jantotalcost = 0;
      Jan.forEach((data) => {
        jantotalcost += parseInt(data);
      });
      setJancost(jantotalcost);

      // feb
      var feb = [];
      regdata.forEach((data) => {
        if ("02" === moment.unix(data.startdate.seconds).format("MM")) {
          feb.push(data.Balance);
        }
      });
      var febtotalcost = 0;
      feb.forEach((data) => {
        febtotalcost += parseInt(data);
      });
      setFebcost(febtotalcost);
      // mar
      var mar = [];
      regdata.forEach((data) => {
        if ("03" === moment.unix(data.startdate.seconds).format("MM")) {
          mar.push(data.Balance);
        }
      });
      var martotalcost = 0;
      mar.forEach((data) => {
        martotalcost += parseInt(data);
      });
      setMarcost(martotalcost);
      // apr
      var apr = [];
      regdata.forEach((data) => {
        if ("04" === moment.unix(data.startdate.seconds).format("MM")) {
          apr.push(data.Balance);
        }
      });
      var aprtotalcost = 0;
      apr.forEach((data) => {
        aprtotalcost += parseInt(data);
      });
      setAprcost(aprtotalcost);
      // may
      var may = [];
      regdata.forEach((data) => {
        if ("05" === moment.unix(data.startdate.seconds).format("MM")) {
          may.push(data.Balance);
        }
      });
      var maytotalcost = 0;
      may.forEach((data) => {
        maytotalcost += parseInt(data);
      });
      setMaycost(maytotalcost);
      //jun
      var jun = [];
      regdata.forEach((data) => {
        if ("06" === moment.unix(data.startdate.seconds).format("MM")) {
          jun.push(data.Balance);
        }
      });
      var juntotalcost = 0;
      jun.forEach((data) => {
        juntotalcost += parseInt(data);
      });
      setJuncost(juntotalcost);
      //jul
      var jul = [];
      regdata.forEach((data) => {
        if ("07" === moment.unix(data.startdate.seconds).format("MM")) {
          jul.push(data.Balance);
        }
      });
      var jultotalcost = 0;
      jul.forEach((data) => {
        jultotalcost += parseInt(data);
      });
      setJulcost(jultotalcost);
      // aug
      var Aug = [];
      regdata.forEach((data) => {
        if ("08" === moment.unix(data.startdate.seconds).format("MM")) {
          Aug.push(data.Balance);
        }
      });
      var Augtotalcost = 0;
      Aug.forEach((data) => {
        Augtotalcost += parseInt(data);
      });
      setAugcost(Augtotalcost);
      //sep
      var sep = [];
      regdata.forEach((data) => {
        if ("09" === moment.unix(data.startdate.seconds).format("MM")) {
          sep.push(data.Balance);
        }
      });
      var septotalcost = 0;
      sep.forEach((data) => {
        septotalcost += parseInt(data);
      });
      setSepcost(septotalcost);
      //oct
      var oct = [];
      regdata.forEach((data) => {
        if ("10" === moment.unix(data.startdate.seconds).format("MM")) {
          oct.push(data.Balance);
        }
      });
      var octtotalcost = 0;
      oct.forEach((data) => {
        octtotalcost += parseInt(data);
      });
      setOctcost(octtotalcost);
      //nov
      var nov = [];
      regdata.forEach((data) => {
        if ("11" === moment.unix(data.startdate.seconds).format("MM")) {
          nov.push(data.Balance);
        }
      });
      var novtotalcost = 0;
      nov.forEach((data) => {
        novtotalcost += parseInt(data);
      });
      setNovcost(novtotalcost);
      //dec
      var dec = [];
      regdata.forEach((data) => {
        if ("12" === moment.unix(data.startdate.seconds).format("MM")) {
          console.log(data.Balance);
          dec.push(data.Balance);
        }
      });
      var dectotalcost = 0;
      dec.forEach((data) => {
        dectotalcost += parseInt(data);
      });
      console.log(dectotalcost);
      setDeccost(dectotalcost);

      // ------Revenue Amount Calculation End-------

      const regsiterdata = collection(db, "maintenance");
      const q = query(regsiterdata, where("year", "==", selectedyears));
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
      const qu = query(monregsiterdata, where("year", "==", e));
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
      totalCal();
    });
  };

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
    setmay(parseInt(parseInt(May1) + parseInt(Maytotalcost)));
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
    setjune(parseInt(parseInt(June1) + parseInt(Junetotalcost)));
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
    setjuly(parseInt(parseInt(July1) + parseInt(Julytotalcost)));
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

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">Chart</h1>
          <div className="row" style={{ marginTop: "20px", display: "flex" }}>
            <div className="col-lg-12 ">
              <Form action="">
                <div className="row ">
                  <div
                    className="col-lg-3 eventdetails "
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <Form.Label>
                      {" "}
                      Select the <span className="redtext">year</span>&nbsp;
                    </Form.Label>
                    <YearPicker onChange={handleBookingEvent} />
                  </div>
                </div>
              </Form>
              <br />
              <div className="row">
                <div className="col-lg-6 chartspace">
                  <div className="backcard">
                    {Data === 0 || Data === "" ? (
                      <h3>
                        Please select year , it does not have any data to show
                      </h3>
                    ) : (
                      <div className="col-lg-6">
                        <h4>Total event count in month wise </h4>{" "}
                        <Doughnut data={data} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="backcard">
                    {" "}
                    <Bar
                      options={options1}
                      data={data1}
                      style={{ height: "350px", width: "200px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">Yearly Chart</h1>
          <div className="row">
            <div className="col-lg-12 ">
              <div className="backcard">
                <Bar options={options} data={data1} />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
