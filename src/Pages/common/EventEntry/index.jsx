/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import Header from "components/Header";
import db from "../../../firebase";
import { storage } from "../../../firebase";

import {
  collection,
  query,
  orderBy,
  getDocs,
  where,
  limit,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FormnumComp } from "components/form";
import Form from "react-bootstrap/Form";
import swal from "sweetalert2";
import moment from "moment";
import { v4 } from "uuid";
import { listAll, uploadBytesResumable } from "firebase/storage";
import { Line, Circle } from "rc-progress";

const EventEntry = () => {
  const [selectedid, setSelectedid] = useState("");
  const [selectedmonth, setSelectedmonth] = useState("");
  const [registrationdata, setRegistrationData] = useState([]);
  const [particulardata, setParticulardata] = useState([]);
  const [startunit, setStartunit] = useState();
  const [endunit, setEndunit] = useState();
  const [constunit, setConstunit] = useState();
  const [chargeunit, setChargeunit] = useState();
  const [metercost, setMetercost] = useState(0);
  const [totalunit, setTotalunit] = useState();
  const [cleaningpeople, setCleaningpeople] = useState();
  const [cleaningcostper, setCleaningcostper] = useState();
  const [cleaningcost, setCleaningcost] = useState(0);
  const [watercost, setWatercost] = useState("");
  const [Generatorcost, setGeneratorcost] = useState("");
  const [additionalcost, setAdditionalcost] = useState(0);
  const [Balance, setBalance] = useState(0);
  const [totalamnt, setTotalamnt] = useState(0);
  const [advanceamnt, setAdvanceamnt] = useState(0);
  const [totalmetercost, setTotalmetercost] = useState(0);
  const [totaladditcost, setTotaladditcost] = useState(0);
  const [invoicecopy, setInvoicecopy] = useState("");

  const [rfinished, setRfinished] = useState(false);
  const [afinished, setAfinished] = useState(false);
  const [ifinished, setifinished] = useState(false);

  const [filedata, setfiledata] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [readFish, setreadFish] = useState(false);
  const [addFish, setaddFish] = useState(false);
  const [invoiceFish, setinvoiceFish] = useState(false);

  // dynamic input fields
  const [Inputfields, setInputfields] = useState([
    {
      otherfor: "",
      othercost: "",
    },
  ]);
  const [othercost, setOthercost] = useState(0);
  const imageFieldRef = useRef(null);
  const selectFieldRef = useRef("");
  const monthFieldRef = useRef("");

  // handle input
  const handleInputChange = (index, e) => {
    const values = [...Inputfields];
    values[index][e.target.name] = e.target.value;
    setInputfields(values);
  };
  // add input fields
  const handleAddfields = () => {
    setInputfields([...Inputfields, { otherfor: "", othercost: "" }]);
  };
  // remove input fields
  const handleRemovefields = (index) => {
    if (Inputfields.length > 1) {
      const values = [...Inputfields];
      values.splice(index, 1);
      setInputfields(values);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    regData();
    CustomerData();
  }, [selectedid]);

  useEffect(() => {
    calculateunit(startunit, endunit, chargeunit, constunit);
    calculatecleaning(cleaningpeople, cleaningcostper);
    extracost(Inputfields);
    additioncost(cleaningcost, watercost, Generatorcost, othercost);
    totalcost(totalmetercost, totaladditcost, totalamnt, advanceamnt);

    console.log("selectedid", selectedid);
  }, [
    rfinished,
    afinished,
    ifinished,
    Inputfields,
    startunit,
    endunit,
    constunit,
    chargeunit,
    cleaningpeople,
    cleaningcostper,
    metercost,
    cleaningcost,
    watercost,
    Generatorcost,
    totalamnt,
    advanceamnt,
    totalmetercost,
    totaladditcost,
    othercost,
    selectedmonth,
  ]);

  // registration data order by startdate, limit to 20
  const regData = () => {
    const regsiterdata = collection(db, "registration");
    const q = query(
      regsiterdata,
      where("finished", "==", false),
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

  // get particular user data
  const CustomerData = async () => {
    if (selectedid === "") {
    } else {
      onSnapshot(doc(db, "registration", selectedid), (doc) => {
        setParticulardata([doc.data()]);
        const totalamount = doc.data().totalamount;
        setTotalamnt(totalamount);
        const advanceamnt = doc.data().advanceamount;
        setAdvanceamnt(advanceamnt);
        const metercost = doc.data().metercost;
        setTotalmetercost(metercost);
        const additcost = doc.data().additionalcost;
        setTotaladditcost(additcost);
        const rdfinished = doc.data().readingfinished;
        setRfinished(rdfinished);
        const adfinished = doc.data().additionalfinished;
        setAfinished(adfinished);
        const infinished = doc.data().invoicefinished;

        setifinished(infinished);
      });
    }
  };

  // calculation of electricity cost
  const calculateunit = (startunit, endunit, chargeunit, constunit) => {
    if (startunit && endunit && chargeunit && constunit) {
      const sum1 = constunit * startunit;
      const sum2 = constunit * endunit;
      const sum3 = sum2 - sum1;
      console.log(sum3);
      setTotalunit(sum3);
      const total = sum3 * chargeunit;
      setMetercost(total);
    }
  };

  // calculation of cleaning cost

  const calculatecleaning = (cleaningpeople, cleaningcostper) => {
    if (cleaningpeople && cleaningcostper) {
      const total = cleaningpeople * cleaningcostper;
      setCleaningcost(total);
    } else {
      setCleaningcost(0);
    }
  };

  // calculation of extra cost
  const extracost = () => {
    let total = 0;
    Inputfields.forEach((item) => {
      total += parseInt(item.othercost);
    });

    setOthercost(total);
  };

  // additional cost
  const additioncost = (cleaningcost, watercost, Generatorcost, othercost) => {
    if (cleaningcost && watercost && Generatorcost && othercost) {
      const total =
        parseInt(cleaningcost) +
        parseInt(watercost) +
        parseInt(Generatorcost) +
        parseInt(othercost);
      setAdditionalcost(total);
    } else if (cleaningcost && watercost && Generatorcost && !othercost) {
      const total =
        parseInt(cleaningcost) + parseInt(watercost) + parseInt(Generatorcost);
      setAdditionalcost(total);
    } else {
      setAdditionalcost(0);
    }
  };

  // total cost calculation
  const totalcost = (
    totalmetercost,
    totaladditcost,
    totalamnt,
    advanceamnt
  ) => {
    if (totalmetercost && totaladditcost && totalamnt && advanceamnt) {
      const sum1 = parseInt(totalmetercost) + parseInt(totaladditcost);
      const sum2 = parseInt(totalamnt) - parseInt(advanceamnt);
      const total = sum1 + sum2;
      setBalance(total);
    } else if (totalmetercost && !totaladditcost && totalamnt && advanceamnt) {
      const sum1 = parseInt(totalamnt) - parseInt(advanceamnt);
      const total = parseInt(totalmetercost) + sum1;
      setBalance(total);
    } else if (!totalmetercost && totaladditcost && totalamnt && advanceamnt) {
      const sum1 = parseInt(totalamnt) - parseInt(advanceamnt);
      const total = parseInt(totaladditcost) + sum1;
      setBalance(total);
    } else if (totalamnt && advanceamnt) {
      const total = parseInt(totalamnt) - parseInt(advanceamnt);
      setBalance(total);
    } else {
      setBalance(0);
    }
  };

  // submit data
  const submitData = async (e) => {
    e.preventDefault();
    if (selectedid !== "" && selectedmonth !== "") {
      const sum1 = parseInt(totalamnt) - parseInt(advanceamnt);
      const total = parseInt(metercost) + sum1;

      const value = true;
      setRfinished(value);

      await updateDoc(doc(db, "registration", selectedid), {
        startunit: startunit,
        endunit: endunit,
        constantunit: constunit,
        chargeunit: chargeunit,
        totalunit: totalunit,
        metercost: metercost,
        Balance: total,
        readingfinished: true,
      });
      setStartunit("");
      setEndunit("");
      setConstunit("");
      setChargeunit("");
      setMetercost("");

      if (value === true && afinished === true && ifinished === true) {
        updateDoc(doc(db, "registration", selectedid), {
          finished: true,
        });
        setSelectedmonth("");
        setSelectedid("");
        selectFieldRef.current.value = "";
        monthFieldRef.current.value = "";
      }
      swal.fire("uploaded successfully", "", "success");
    } else {
      swal.fire("", "Please select Month and Customer", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedid !== "" && selectedmonth !== "") {
      const sum1 = parseInt(totalmetercost) + parseInt(additionalcost);
      const sum2 = parseInt(totalamnt) - parseInt(advanceamnt);
      const total = sum1 + sum2;

      const avalue = true;
      setAfinished(avalue);

      updateDoc(doc(db, "registration", selectedid), {
        cleaningpeople: cleaningpeople,
        cleaningcostper: cleaningcostper,
        cleaningcost: cleaningcost,
        watercost: watercost,
        Generatorcost: Generatorcost,
        otherco: Inputfields,
        additionalcost: additionalcost,
        additionalfinished: true,
        Balance: total,
      });
      setCleaningcostper("");
      setCleaningpeople("");
      setCleaningcost("");
      setGeneratorcost("");
      setWatercost("");
      setOthercost("");
      setInputfields([{ otherfor: "", othercost: "" }]);

      if (rfinished === true && avalue === true && ifinished === true) {
        updateDoc(doc(db, "registration", selectedid), {
          finished: true,
        });
        setSelectedmonth("");
        setSelectedid("");
        selectFieldRef.current.value = "";
        monthFieldRef.current.value = "";
      }

      swal.fire("uploaded successfully", "", "success");
    } else {
      swal.fire("", "Please select Month and Customer", "error");
    }
  };

  const handleUpload = (e) => {
    totalcost(totalmetercost, totaladditcost, totalamnt, advanceamnt);

    e.preventDefault();
    const file = e.target[0].files[0];

    uploadFiles(file);
    setUploading(true);
  };
  const uploadFiles = (file) => {
    if (selectedid !== "" && selectedmonth !== "") {
      const listRef = ref(storage, "Invoice/");
      // Find all the prefixes and items.
      listAll(listRef)
        .then((res) => {
          let filedata = [];
          res.items.forEach((itemRef) => {
            // All the items under listRef.
            filedata.push(itemRef);
          });
          setfiledata(filedata);
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
      const metadata = {
        contentType: "image/png",
      };
      if (!file) return;
      const storageRef = ref(
        storage,
        "Invoice/" + filedata.length + "-" + `${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updatefun(downloadURL);
          });
        }
      );
    } else {
      swal.fire("", "Please select Month and Customer", "error");
      setUploading(false);
      setInvoicecopy("");
    }
  };

  const updatefun = (downloadURL) => {
    const invoiceURL = downloadURL;
    console.log("invoiceURL", invoiceURL);

    console.log("invoicecopy", invoicecopy);

    updateDoc(doc(db, "registration", selectedid), {
      invoicecopy: invoiceURL,
      Balance: Balance,
      invoicefinished: true,
    });
    const ivalue = true;
    setifinished(ivalue);
    if (rfinished === true && afinished === true && ivalue === true) {
      updateDoc(doc(db, "registration", selectedid), {
        finished: true,
      });
      setSelectedmonth("");
      setSelectedid("");
      selectFieldRef.current.value = "";
      monthFieldRef.current.value = "";
    }
    swal.fire("uploaded successfully", "", "success").then((result) => {
      setUploading(false), (imageFieldRef.current.value = null);
    });
  };
  return (
    <div id="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="row">
            <div className="col-lg-12 ">
              <h1 className="pageheading">Event Details</h1>
              <div className="backcard">
                <p>
                  please select the <span className="redtext">month</span> first
                  and then select the
                  <span className="redtext"> customer Name</span> then fill the
                  details.
                </p>
                <Form action="">
                  <div className="row ">
                    <div className="col-lg-5 eventdetails mb20">
                      <Form.Label>Month:</Form.Label>
                      <Form.Select
                        defaultValue=""
                        aria-label="Default select example"
                        onChange={(e) => {
                          setSelectedmonth(e.target.value);
                          setSelectedid("");
                          selectFieldRef.current.value = "";
                        }}
                        ref={monthFieldRef}
                      >
                        <option value="" disabled>
                          select the Month
                        </option>
                        <option value="01">January</option>
                        <option value="02">Feburary</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </Form.Select>
                    </div>
                    <div className="col-lg-7 eventdetails eventcstmr ">
                      <Form.Label>Customer Name:</Form.Label>

                      <Form.Select
                        defaultValue=""
                        aria-label="Default select example"
                        onChange={(e) => setSelectedid(e.target.value)}
                        ref={selectFieldRef}
                      >
                        <option value="" disabled>
                          select the Customer Name
                        </option>
                        {registrationdata?.map(
                          (data, index) =>
                            selectedmonth ===
                              moment
                                .unix(data.startdate.seconds)
                                .format("MM") &&
                            !data.finished && (
                              <option key={index} value={data.id}>
                                {data.customername}
                              </option>
                            )
                        )}
                      </Form.Select>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-lg-12 ">
              <h1 className="pageheading mt10">Event Details </h1>
              <div className="backcard">
                {/* {selectedid ? " " : ""} */}

                {selectedid == "" ? (
                  <p>
                    Details will automatically generate after select the
                    Customer Name
                  </p>
                ) : (
                  particulardata?.map((particulardatas, index) => (
                    <div className="row " key={index}>
                      <div className="col-lg-3 eventdetails ">
                        <h5>Customer Name:</h5>
                        <p className="redtext">
                          {particulardatas.customername}
                        </p>
                      </div>
                      <div className="col-lg-3 eventdetails ">
                        <h5>Event Name:</h5>
                        <p className="redtext">{particulardatas.event}</p>
                      </div>
                      <div className="col-lg-3 eventdetails">
                        <h5>Starting Date:</h5>
                        <p className="redtext">
                          {moment
                            .unix(particulardatas.startdate.seconds)
                            .format("DD/MM/YYYY")}
                        </p>
                      </div>
                      <div className="col-lg-3 eventdetails">
                        <h5>Ending Date:</h5>
                        <p className="redtext">
                          {" "}
                          {moment
                            .unix(particulardatas.enddate.seconds)
                            .format("DD/MM/YYYY")}
                        </p>
                      </div>
                      <div className="col-lg-3 eventdetails">
                        <h5>Total Amount:</h5>
                        <p className="redtext">{totalamnt}</p>
                      </div>
                      <div className="col-lg-3 eventdetails">
                        <h5>Advance Amount:</h5>
                        <p className="redtext">{advanceamnt}</p>
                      </div>
                      <div className="col-lg-3 eventdetails">
                        <h5>Reading Cost:</h5>
                        <p className="redtext">{particulardatas.metercost}</p>
                      </div>
                      <div className="col-lg-3 eventdetails">
                        <h5>Additional cost:</h5>
                        <p className="redtext">
                          {particulardatas.additionalcost}
                        </p>
                      </div>
                      <div className="col-lg-3 eventdetails">
                        <h5>Balance:</h5>
                        <p className="redtext">{Balance}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: "20px" }}>
            {rfinished == true ? (
              ""
            ) : (
              <div className="col-lg-6 ">
                <h1 className="pageheading">Reading Entry</h1>
                <div className="backcard">
                  <Form action="" onSubmit={submitData}>
                    <FormnumComp
                      label={"Starting Unit"}
                      type={"number"}
                      placeholder={"Enter Starting Unit"}
                      value={startunit}
                      mins={0}
                      steps={0.01}
                      onChange={(e) => setStartunit(e.target.value)}
                    />
                    <FormnumComp
                      label={"Ending Unit"}
                      type={"number"}
                      placeholder={"Enter Ending Unit"}
                      value={endunit}
                      mins={0}
                      steps={0.01}
                      onChange={(e) => setEndunit(e.target.value)}
                    />
                    <FormnumComp
                      label={"constant unit"}
                      type={"number"}
                      placeholder={"constant unit"}
                      value={constunit}
                      mins={0}
                      steps={0.01}
                      onChange={(e) => setConstunit(e.target.value)}
                    />

                    <FormnumComp
                      label={"Enter Charge per unit"}
                      type={"number"}
                      placeholder={"Enter Charge per Unit"}
                      value={chargeunit}
                      mins={0}
                      steps={0.01}
                      onChange={(e) => setChargeunit(e.target.value)}
                    />
                    <div className="row ">
                      <div className="col-lg-12" style={{ textAlign: "end" }}>
                        <input
                          className="button savebtn"
                          name="submit"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            )}
            {afinished == true ? (
              ""
            ) : (
              <div className="col-lg-6 ">
                <h1 className="pageheading mt10">Additional Charges</h1>
                <div className="backcard">
                  <Form action="" onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-lg-3 mb10">
                        <Form.Label>Cleaning People</Form.Label>
                      </div>
                      <div className="col-lg-3 mb10">
                        <Form.Control
                          type="number"
                          placeholder="How many Cleaning People worked"
                          min={0}
                          value={cleaningpeople}
                          onChange={(e) => setCleaningpeople(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-lg-3 mb10">
                        <Form.Control
                          type="number"
                          placeholder="Enter Cleaning Cost per Person"
                          min={0}
                          value={cleaningcostper}
                          onChange={(e) => setCleaningcostper(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-lg-3 ">
                        <p className="autocalc"> {cleaningcost}</p>
                      </div>
                    </div>

                    <FormnumComp
                      label={"Enter Water Cost"}
                      type={"number"}
                      placeholder={"Enter water cost"}
                      value={watercost}
                      mins={0}
                      onChange={(e) => setWatercost(e.target.value)}
                      required
                    />

                    <FormnumComp
                      label={"Enter Generator Cost"}
                      type={"number"}
                      placeholder={"Enter Generator cost"}
                      value={Generatorcost}
                      mins={0}
                      onChange={(e) => setGeneratorcost(e.target.value)}
                      required
                    />

                    <div className="row mb-3">
                      <div className="col-lg-3">
                        <Form.Label>Other cost</Form.Label>
                      </div>
                      <div className="col-lg-9 inputfields">
                        {Inputfields.map((Inputfield, index) => (
                          <div className="inputfields" key={index}>
                            <div className="inputfieldsitem mb10">
                              <Form.Control
                                name="otherfor"
                                type="text"
                                placeholder="Enter other for"
                                value={Inputfield.otherfor}
                                onChange={(e) => handleInputChange(index, e)}
                              />
                            </div>
                            <div className="inputfieldsitem ">
                              <Form.Control
                                name="othercost"
                                type="text"
                                placeholder="Enter other cost "
                                value={Inputfield.othercost}
                                onChange={(e) => handleInputChange(index, e)}
                              />
                            </div>
                            <div
                              className="inputfieldsitem"
                              onClick={() => handleAddfields()}
                            >
                              <i className="fas fa-plus-circle"></i>
                            </div>
                            <div
                              className="inputfieldsitem"
                              onClick={() => handleRemovefields(index)}
                            >
                              <i className="fas fa-minus-circle"></i>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-lg-12" style={{ textAlign: "end" }}>
                        <input
                          className="button savebtn"
                          name="submit"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            )}
            {ifinished === true ? (
              ""
            ) : (
              <div className="col-lg-6 ">
                <h1 className="pageheading">Invoice Copy</h1>
                <div className="backcard">
                  <Form action="" onSubmit={handleUpload}>
                    <div className="row mb-3">
                      <div className="col-lg-3">
                        <Form.Label>Invoice Copy</Form.Label>
                      </div>
                      <div className="col-lg-9">
                        <Form.Control
                          type="file"
                          placeholder="Upload Invoice Copy"
                          onChange={(e) => setInvoicecopy(e.target.files[0])}
                          ref={imageFieldRef}
                          required
                        />
                      </div>
                      {uploading === true ? (
                        <>
                          <br></br>
                          <h5 style={{ color: "#f73164", fontStyle: "italic" }}>
                            Uploading {progress}%
                          </h5>
                          <Line
                            percent={progress}
                            strokeWidth={4}
                            strokeColor="#a30813"
                          />

                          <br></br>
                        </>
                      ) : null}
                    </div>
                    <div className="row ">
                      <div className="col-lg-12" style={{ textAlign: "end" }}>
                        <input
                          className="button savebtn"
                          name="submit"
                          type="submit"
                          value="upload"
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventEntry;
