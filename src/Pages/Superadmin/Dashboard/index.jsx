// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Header from "components/Header";
import db from "../../../firebase";
import moment from "moment";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import Calendar from "react-awesome-calendar";

const SaDashboard = () => {
  const [event, setEvent] = useState([]);
  const [role, setRole] = useState([]);
  const [count, setCount] = useState("");
  const [expense, setExpense] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [revenuePerYear, setRevenuePerYear] = useState(0);

  const [totalmaincost, setTotalmaincost] = useState("");
  const [montotalmaincost, setTotalmonmaincost] = useState("");
  const [reviewsData, setreviewsData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const role = localStorage.getItem("role");
    setRole(role);
    regData();
    getData();
    reviewData();
  }, []);
  useEffect(() => {
    totalcal();
  });
  const reviewData = () => {
    const reviewdata = collection(db, "reviews");
    const q = query(reviewdata);
    onSnapshot(q, (snapshot) => {
      let revdata = [];
      snapshot.docs.forEach((doc) => {
        revdata.push({ ...doc.data(), id: doc.id });
      });

      setreviewsData(revdata.length);
    });
  };
  const totalcal = () => {
    //total
    const total = totalmaincost + montotalmaincost;
    setExpense(total);
  };

  const regData = () => {
    const regRef = collection(db, "registration");
    const q = query(
      regRef,
      where("finished", "==", false),
      orderBy("startdate")
    );
    onSnapshot(q, (snapshot) => {
      let regdata = [];
      snapshot.docs.forEach((doc) => {
        regdata.push({ ...doc.data(), id: doc.id });
      });

      const eventdata = regdata.map((data) => {
        return {
          id: data.id,
          color: "#a30813",
          from:
            moment.unix(data.startdate.seconds).format("YYYY-MM-DD") +
            "T00:00:00+00:00",
          to:
            moment.unix(data.enddate.seconds).format("YYYY-MM-DD") +
            "T24:00:00+00:00",
          title: data.customername + "-" + data.event,
        };
      });
      setEvent(eventdata);
    });
  };
  const getData = () => {
    const currentyear = new Date().getFullYear();
    // registration
    const regsiterdata = collection(db, "registration");
    const q = query(
      regsiterdata,
      where("year", "==", currentyear),
      where("finished", "==", true)
    );
    onSnapshot(q, (snapshot) => {
      let regdata = [];
      snapshot.docs.forEach((doc) => {
        regdata.push({ ...doc.data(), id: doc.id });
      });
      // total count and total cost

      let totalunit = 0;
      let totalcleaningcost = 0;
      let totalwatercost = 0;
      let totalgeneratorcost = 0;
      let totalothercost = 0;
      let totalrero = 0;

      // const tAmt = regdata.map((data) => data.totalamount);
      // const sum = tAmt.reduce(
      //   (accumulator, currentValue) => accumulator + currentValue,
      //   0
      // );
      console.log("regdata", regdata);

      const roomCost = regdata.map((data) => {
        const cost = data.rooms[0].roomcost;
        return cost === "" ? 0 : parseInt(cost);
      });

      console.log("roomCost", roomCost);

      const roomCostTotal = roomCost.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const tAmt = regdata.map((data) => parseInt(data.totalamount)); // Convert strings to integers

      const total = tAmt.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const revenueData = total + roomCostTotal;
      setRevenuePerYear(revenueData);

      console.log("total", total);

      console.log("roomCostTotal", roomCostTotal);

      regdata.forEach((data) => {
        data.otherco.forEach((data) => {
          totalothercost += parseInt(data.othercost);
        });
        totalrero += parseInt(data.totalamount);
        totalunit += parseInt(data.metercost);
        totalcleaningcost += parseInt(data.cleaningcost);
        totalwatercost += parseInt(data.watercost);
        totalgeneratorcost += parseInt(data.Generatorcost);
      });

      const totalcalc =
        totalrero +
        totalunit +
        totalcleaningcost +
        totalwatercost +
        totalgeneratorcost +
        totalothercost;

      setRevenue(totalcalc);
      setCount(regdata.length);
    });
    // maintenance
    const maintenancedata = collection(db, "maintenance");
    const mq = query(maintenancedata, where("year", "==", currentyear));
    onSnapshot(mq, (snapshot) => {
      let maindata = [];
      snapshot.docs.forEach((doc) => {
        maindata.push({ ...doc.data(), id: doc.id });
      });
      // total maintenance cost
      let totalmacost = 0;
      maindata.forEach((data) => {
        totalmacost += parseInt(data.maintenancecost);
      });

      setTotalmaincost(totalmacost);
    });
    // monthlymaintenance
    const monregsiterdata = collection(db, "monthlymaintenance");
    const qu = query(monregsiterdata, where("year", "==", currentyear));
    onSnapshot(qu, (snapshot) => {
      let monregdata = [];
      snapshot.docs.forEach((doc) => {
        monregdata.push({ ...doc.data(), id: doc.id });
      });
      // total monthly maintenance cost
      let totalmomacost = 0;
      monregdata.forEach((data) => {
        totalmomacost += parseInt(data.montlymaintenancecost);
      });
      setTotalmonmaincost(totalmomacost);
    });
  };

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          {role === "sadmin" ? (
            <div>
              {" "}
              <h1 className="pageheading">General Report</h1>
              <div className="row equalh">
                <div className="col-lg-3 col-sm-6 mb20">
                  <div
                    className="backcard generalflex"
                    style={{ padding: "25px" }}
                  >
                    <div className="generalbox "></div>
                    <div className="leftspace">
                      <h6>Total Event Finished /yr</h6>
                      <h1 className="redtext">{count}</h1>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 mb20">
                  <div
                    className="backcard generalflex"
                    style={{ padding: "25px" }}
                  >
                    <div className="generalbox "></div>
                    <div className="leftspace">
                      <h6>Total Revenue Income /yr</h6>
                      <h1 className="redtext">{revenuePerYear}</h1>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 mb20">
                  <div
                    className="backcard generalflex"
                    style={{ padding: "25px" }}
                  >
                    <div className="generalbox "></div>
                    <div className="leftspace">
                      <h6>Total Maintenance Amount/yr</h6>
                      <h1 className="redtext">{expense}</h1>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div
                    className="backcard generalflex"
                    style={{ padding: "25px" }}
                  >
                    <div className="generalbox "></div>
                    <div className="leftspace">
                      <h6>Total Reviews /yr</h6>
                      <h1 className="redtext">{reviewsData}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <h1 className="pageheading mt20 ">Booked Dates</h1>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-lg-12 ">
              <div className="backcard">
                <Calendar events={event} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaDashboard;
