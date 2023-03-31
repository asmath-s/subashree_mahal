/* eslint-disable */
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Header from "components/Header";
import db from "../../../firebase";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Select from "react-select";
import FormtextComp from "components/form";
import { FormnumComp } from "components/form";
import swal from "sweetalert2";

export default function BookingEntry() {
  const [cstmrname, setCstmrname] = useState("");
  const [phnnum, setPhnnum] = useState("");
  const [altrphn, setAltrphn] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [event, setEvent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [nmbrofdays, setNmbrofdays] = useState("");
  const [halls, setHalls] = useState("");
  const [totalroomcost, setTotalroomcost] = useState("");
  const [rentalamnt, setRentalamnt] = useState("");
  const [totalamnt, setTotalamnt] = useState(0);
  const [advncamnt, setAdvncamnt] = useState("");
  const [year, setyear] = useState("");
  const [dynamicdata, setDynamicdata] = useState([]);
  const [dynamichdata, setDynamichdata] = useState([]);
  const [dynamicrdata, setDynamicrdata] = useState([]);
  const [showrm, setshowrm] = useState(false);

  const dropdownref = useRef(null);
  const selectRef = useRef("");
  const selectroomRef = useRef("");

  const options = dynamichdata;

  //  <---- dynamic input fields start --->
  const [Inputfields, setInputfields] = useState([
    {
      room: "",
      roomcost: "",
    },
  ]);
  // select fields
  const handleRoomChange = (index, e) => {
    const selectedvalue = e.target.value;
    handleInputChange(index, {
      target: { name: "room", value: selectedvalue },
    });
  };
  // handle input
  const handleInputChange = (index, e) => {
    const values = [...Inputfields];
    values[index][e.target.name] = e.target.value;
    setInputfields(values);
  };
  // add input fields
  const handleAddfields = () => {
    setInputfields([...Inputfields, { room: "", roomcost: "" }]);
  };
  // remove input fields
  const handleRemovefields = (index) => {
    if (Inputfields.length > 1) {
      const values = [...Inputfields];
      values.splice(index, 1);
      setInputfields(values);
    }
  };
  // <---- dynamic input fields end --->

  // multiple select fields for halls and then map them to array
  const handleHallsChange = (e) => {
    setHalls(Array.isArray(e) ? e.map((x) => x.label) : []);
  };

  // Date Change
  const DateChange = () => {
    if (startDate && endDate) {
      setNmbrofdays(
        Math.floor(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24) + 1)
      );
    } else if (startDate && !endDate) {
      setNmbrofdays("Please select end date");
    } else if (!startDate && endDate) {
      setNmbrofdays("Please select start date");
    } else {
      setNmbrofdays(0);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    DateChange(startDate, endDate);
    Addroomcost(Inputfields);
    Addtotalcost(totalroomcost, rentalamnt, advncamnt);
  }, [startDate, endDate, Inputfields, totalroomcost, rentalamnt, advncamnt]);

  useEffect(() => {
    dyndata();
  }, []);

  const dyndata = () => {
    const dynamicdata = collection(db, "dynamicfields");
    const q = query(dynamicdata);
    onSnapshot(q, (snapshot) => {
      let dydata = [];
      snapshot.docs.forEach((doc) => {
        dydata.push({ ...doc.data() });
      });
      setDynamicdata(dydata[0].eventData);
      setDynamichdata(dydata[1].hallData);
      setDynamicrdata(dydata[2].roomData);
    });
  };

  // add room cost
  const Addroomcost = () => {
    let total = 0;
    Inputfields.forEach((item) => {
      total += parseInt(item.roomcost);
    });
    setTotalroomcost(total);
  };

  // add total cost

  const Addtotalcost = (totalroomcost, rentalamnt) => {
    if (totalroomcost && rentalamnt) {
      const total = parseInt(totalroomcost) + parseInt(rentalamnt);
      setTotalamnt(total);
    } else if (!totalroomcost && rentalamnt) {
      setTotalamnt(rentalamnt);
    } else if (totalroomcost && !rentalamnt) {
      setTotalamnt(totalroomcost);
    } else {
      setTotalamnt(0);
    }
  };

  // submit to store data in firebase database collection

  const handleSubmit = (e) => {
    e.preventDefault();
    if (advncamnt > totalamnt) {
      swal.fire("", "Please Enter Correct Advance Amount", "error");
      setAdvncamnt("");
    } else {
      addDoc(collection(db, "registration"), {
        registereddate: new Date(),
        year: year,
        customername: cstmrname,
        phonenumber: phnnum,
        alterphnnumber: altrphn,
        email: email,
        address: address,
        event: event,
        startdate: startDate,
        enddate: endDate,
        numberofdays: nmbrofdays,
        halls: halls,
        rooms: Inputfields,
        rentalamnt: rentalamnt,
        totalamount: totalamnt,
        advanceamount: advncamnt,
        // event entry
        enteredat: "",
        startunit: "",
        endunit: "",
        chargeunit: "",
        metercost: "",
        totalunit: "",
        cleaningpeople: "",
        cleaningcostper: "",
        cleaningcost: "",
        watercost: "",
        Generatorcost: "",
        otherco: [
          {
            otherfor: "",
            othercost: "",
          },
        ],
        additionalcost: "",
        Balance: "",

        invoicefinished: false,
        readingfinished: false,
        additionalfinished: false,
        finished: false,

        // invoice
        invoicecopy: "",
      });
      // store data in local

      setCstmrname("");
      setPhnnum("");
      setAltrphn("");
      setEmail("");
      setAddress("");
      setEvent("");
      selectRef.current.value = "";
      setHalls([]);
      dropdownref.current.clearValue();
      setRentalamnt("");
      setInputfields([{ room: "", roomcost: "" }]);
      selectroomRef.current.value = "";
      setTotalamnt(0);
      setAdvncamnt("");
      setStartDate("");
      setendDate("");

      swal.fire("registered successfully", "", "success");
    }
  };

  return (
    <div id="layout-wrapper">
      {" "}
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="row">
            <h1 className="pageheading">Registration Entry</h1>
            <div className="col-lg-12 ">
              <div className="backcard">
                {" "}
                <Form action="" onSubmit={handleSubmit}>
                  <FormtextComp
                    label={"Customer Name"}
                    type={"text"}
                    placeholder={"Enter Customer Name"}
                    value={cstmrname}
                    onChange={(e) => setCstmrname(e.target.value)}
                  />
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <Form.Label>Phone Number</Form.Label>
                    </div>
                    <div className="col-lg-9">
                      <Form.Control
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern="[0-9]{5}[0-9]{5}"
                        placeholder="Example: 1234567890"
                        value={phnnum}
                        onChange={(e) => setPhnnum(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <Form.Label>Alternative Number</Form.Label>
                    </div>
                    <div className="col-lg-9">
                      <Form.Control
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern="[0-9]{5}[0-9]{5}"
                        placeholder="Example: 1234567890"
                        value={altrphn}
                        onChange={(e) => setAltrphn(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <Form.Label>Email</Form.Label>
                    </div>
                    <div className="col-lg-9">
                      <Form.Control
                        type="email"
                        placeholder="Enter Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <FormtextComp
                    label={"Address"}
                    type={"text"}
                    placeholder={"Enter Address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <Form.Label>Select the Event</Form.Label>
                    </div>
                    <div className="col-lg-9">
                      <Form.Select
                        defaultValue=""
                        aria-label="Select the Event"
                        onChange={(e) => setEvent(e.target.value)}
                        required
                        ref={selectRef}
                      >
                        <option value="" disabled>
                          Select the Event
                        </option>
                        {dynamicdata.map((ddata) => (
                          <option value={ddata.Eventname}>
                            {ddata.Eventname}
                          </option>
                        ))}

                        <option value="other">Other</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <Form.Label>Booking Date</Form.Label>
                    </div>
                    <div className="col-lg-3 mb10">
                      <DatePicker
                        selected={startDate}
                        placeholderText="Select the Booking Date"
                        onChange={(date) => {
                          setStartDate(date);
                          const regYear = date.getFullYear();

                          setyear(regYear);
                          DateChange();
                        }}
                        required
                      />
                    </div>
                    <div className="col-lg-3 mb10">
                      <DatePicker
                        selected={endDate}
                        placeholderText="Select End Date"
                        onChange={(date) => {
                          setendDate(date);
                          DateChange();
                        }}
                        required
                      />
                    </div>
                    <div className="col-lg-3 ">
                      <h3 className="diffdate">{nmbrofdays}</h3>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <Form.Label>Halls Needed</Form.Label>
                    </div>
                    <div className="col-lg-9">
                      <Select
                        selectedvalues={halls}
                        style={{ width: "max-content" }}
                        isMulti
                        closeMenuOnSelect={false}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        options={options}
                        onChange={handleHallsChange}
                        ref={dropdownref}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <Form.Label>Select Rooms</Form.Label>
                    </div>
                    <div className="col-lg-9 inputfields">
                      {Inputfields.map((Inputfield, index) => (
                        <div className="inputfields" key={index}>
                          <div className="inputfieldsitem">
                            <p>Room:</p>
                            <Form.Select
                              defaultValue=""
                              name="room"
                              aria-label="Select the room"
                              onChange={(e) => {
                                handleRoomChange(index, e), setshowrm(true);
                              }}
                              ref={selectroomRef}
                            >
                              <option value="" disabled>
                                Select the Rooms
                              </option>
                              {dynamicrdata.map((dt) => (
                                <option value={dt.Roomname}>
                                  {dt.Roomname}
                                </option>
                              ))}
                            </Form.Select>
                          </div>
                          {showrm === true ? (
                            <div className="inputfieldsitem">
                              <p>₹:</p>
                              <Form.Control
                                name="roomcost"
                                type="text"
                                placeholder="Enter cost per night"
                                value={Inputfield.roomcost}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                              />
                            </div>
                          ) : (
                            ""
                          )}

                          <div onClick={() => handleAddfields()}>
                            <i className="fas fa-plus-circle"></i>
                          </div>
                          <div onClick={() => handleRemovefields(index)}>
                            <i className="fas fa-minus-circle"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <FormnumComp
                    label={
                      <div>
                        <span>Rental Amount&nbsp;</span>
                        <span style={{ color: "red" }}>₹</span>
                      </div>
                    }
                    type={"number"}
                    placeholder={"Enter Rental Amount"}
                    value={rentalamnt}
                    mins={0}
                    onChange={(e) => setRentalamnt(e.target.value)}
                  />
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <Form.Label>Total Amount</Form.Label>
                    </div>
                    <div className="col-lg-9">{totalamnt}</div>
                  </div>
                  <FormnumComp
                    label={
                      <div>
                        <span>Advance Amount&nbsp;</span>
                        <span style={{ color: "red" }}>₹</span>
                      </div>
                    }
                    type={"number"}
                    placeholder={"Enter advance Amount"}
                    value={advncamnt}
                    mins={0}
                    onChange={(e) => setAdvncamnt(e.target.value)}
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
          </div>
        </div>
      </div>
    </div>
  );
}
