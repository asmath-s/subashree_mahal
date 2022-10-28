/* eslint-disable */
import React, { useEffect, useState } from "react";
import Header from "components/Header";
import db from "../../../firebase";
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

const AdminEvent = () => {
  const [registrationdata, setRegistrationData] = useState([]);
  const [selecteddata, setSelecteddata] = useState([]);
  const [modaleshow, setModaleshow] = useState(false);

  // get data in firestore
  const regData = () => {
    const regsiterdata = collection(db, "registration");
    const q = query(
      regsiterdata,
      where("finished", "==", true),
      orderBy("registereddate", "desc"),
      limit(20)
    );
    onSnapshot(q, (snapshot) => {
      let regdata = [];
      snapshot.docs.forEach((doc) => {
        regdata.push({ ...doc.data(), id: doc.id });
      });

      setRegistrationData(regdata);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    regData();
  }, []);

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

  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <h1 className="pageheading">Event Details</h1>
          <div className="row" style={{ marginTop: "20px", display: "flex" }}>
            <div className="col-lg-12 ">
              <div className="backcard">
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
                  <table className="table table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Entered at</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Event</th>
                        <th scope="col">Starting Date</th>
                        <th scope="col">Ending Date</th>
                        <th scope="col">Days</th>
                        <th scope="col">Start Unit</th>
                        <th scope="col">End Unit</th>
                        <th scope="col">charge Unit</th>
                        <th scope="col">metercost</th>
                        <th scope="col">cleaning people</th>
                        <th scope="col">cost per people</th>
                        <th scope="col">total Cleaning Cost</th>
                        <th scope="col">water Cost</th>
                        <th scope="col">Generator Cost</th>
                        <th scope="col">other Cost</th>
                        <th scope="col">Balance</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrationdata.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <i className="fa fa-user"></i>
                          </td>
                          <td>
                            {data.enteredat === ""
                              ? ""
                              : moment
                                  .unix(data.enteredat.seconds)
                                  .format("MM/DD/YYYY")}
                          </td>
                          <td>{data.customername}</td>
                          <td>{data.event}</td>
                          <td>
                            {moment
                              .unix(data.startdate.seconds)
                              .format("MM/DD/YYYY")}
                          </td>
                          <td>
                            {moment
                              .unix(data.enddate.seconds)
                              .format("MM/DD/YYYY")}
                          </td>
                          <td>{data.numberofdays}</td>
                          <td>{data.startunit}</td>
                          <td>{data.endunit}</td>
                          <td>{data.chargeunit}</td>
                          <td>{data.metercost}</td>
                          <td>{data.cleaningpeople}</td>
                          <td>{data.cleaningcostper}</td>
                          <td>{data.cleaningcost}</td>
                          <td>{data.watercost}</td>
                          <td>{data.Generatorcost}</td>
                          <td>
                            {data.otherco.map((data, index) => (
                              <div key={index}>
                                {data.otherfor}-{data.othercost}
                              </div>
                            ))}
                          </td>
                          <td>{data.Balance}</td>
                          <td
                            onClick={() =>
                              EditFunction(
                                data.id,
                                data.customername,
                                data.startunit,
                                data.endunit,
                                data.chargeunit,
                                data.metercost,
                                data.cleaningpeople,
                                data.cleaningcostper,
                                data.cleaningcost,
                                data.watercost,
                                data.Generatorcost,
                                data.otherco,
                                data.Balance,
                                data.totalamount,
                                data.advanceamount
                              )
                            }
                          >
                            <i className="fa fa-edit"></i>
                          </td>
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
};

export default AdminEvent;
