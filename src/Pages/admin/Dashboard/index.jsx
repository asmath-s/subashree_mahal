/* eslint-disable */
import React, { useState, useEffect } from "react";
import Header from "components/Header";
import db from "../../../firebase";
import moment from "moment";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import Calendar from "react-awesome-calendar";

const Dashboard = () => {
  const [event, setEvent] = useState([]);

  const regData = async () => {
    const regRef = collection(db, "registration");
    const q = query(
      regRef,
      orderBy("startdate"),
      where("finished", "==", false)
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
  useEffect(() => {
    window.scrollTo(0, 0);
    regData();
  }, []);

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">Booked Dates</h1>
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

export default Dashboard;
