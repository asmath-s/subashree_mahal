/* eslint-disable */
import React, { useEffect, useState } from "react";
import Header from "components/Header";
import {
  collection,
  deleteDoc,
  doc,
  query,
  onSnapshot,
  addDoc,
  where,
} from "firebase/firestore";
import db from "../../../firebase";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function YearlyChart() {
  const [year, setyear] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    regData();
  }, []);

  function toDateYear(secs) {
    var epoch = new Date(0);
    epoch.setSeconds(parseInt(secs));
    var date = epoch.getFullYear();
    return date;
  }

  const regData = () => {
    const regsiterdata = collection(db, "registration");
    const q = query(regsiterdata, where("finished", "==", true));
    onSnapshot(q, (snapshot) => {
      let regdata = [];
      snapshot.docs.forEach((doc) => {
        regdata.push({ ...doc.data(), id: doc.id });
      });
      console.log("Data", regdata.length);
      const Sdate = regdata.map((date) => toDateYear(date.startdate.seconds));
      const unique = Array.from(new Set(Sdate));
      setyear(unique);
      // console.log("startdate", Sdate);
    });
  };

  console.log("year", year);

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

  const labels = year;

  const data = {
    labels,
    datasets: [
      {
        label: "Booking Event Total",
        // data: labels.map(() => faker.datatype.number({ labels: 0, labels: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [20, 20, 30, 40, 50, 10],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
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
}
