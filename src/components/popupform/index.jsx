/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormtextComp from "components/form";
import { FormnumComp } from "components/form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert2";
import moment from "moment";
import db from "../../firebase";

import {
  doc,
  updateDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

const ModalForm = (props) => {
  const [modalShow, setModalShow] = useState(false);
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
  const [totalamnt, setTotalamnt] = useState("");
  const [advncamnt, setAdvncamnt] = useState("");
  const [dynamicdata, setDynamicdata] = useState([]);
  const [dynamichdata, setDynamichdata] = useState([]);
  const [dynamicrdata, setDynamicrdata] = useState([]);

  const dropdownref = useRef(null);
  const selectRef = useRef(null);
  const selectroomRef = useRef(null);

  const optionss = dynamichdata;

  // dynamic input fields
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

  // select event on change
  const handleEventChange = (e) => {
    if (e.target.value === "other") {
      document.getElementById("otherevent").style.display = "flex";
      setEvent("");
    } else {
      document.getElementById("otherevent").style.display = "none";
      setEvent(e.target.value);
    }
  };

  // multiple select fields for halls
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
      setNmbrofdays("");
    }
  };

  useEffect(() => {
    setModalShow(props.show);
    setCstmrname(props.dataselect.customername);
    setPhnnum(props.dataselect.phonenumber);
    setAltrphn(props.dataselect.alterphnnumber);
    setEmail(props.dataselect.email);
    setAddress(props.dataselect.address);
    setEvent(props.dataselect.event);
    setStartDate(
      new Date(
        moment.unix(props.dataselect.startdate.seconds).format("MM/DD/YYYY")
      )
    );
    setendDate(
      new Date(
        moment.unix(props.dataselect.enddate.seconds).format("MM/DD/YYYY")
      )
    );
    setNmbrofdays(props.dataselect.numberofdays);
    setHalls(props.dataselect.halls);
    console.log(props.dataselect.halls);
    setInputfields(props.dataselect.rooms);
    setRentalamnt(props.dataselect.rentalamnt);
    setTotalamnt(props.dataselect.totalamount);
    setAdvncamnt(props.dataselect.advanceamount);
  }, [props.dataselect]);

  useEffect(() => {
    DateChange(startDate, endDate);
    Addroomcost(Inputfields);
    Addtotalcost(totalroomcost, rentalamnt);
  }, [startDate, endDate, Inputfields, totalroomcost, rentalamnt]);
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

  // update fields data in firestore
  const saveFunc = (id) => {
    updateDoc(doc(db, "registration", id), {
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
    });

    // store data in local

    setCstmrname("");
    setPhnnum("");
    setAltrphn("");
    setEmail("");
    setAddress("");
    setEvent("");
    selectRef.current.value = "Select the Event";
    setHalls([]);
    dropdownref.current.clearValue();
    setRentalamnt("");
    setInputfields([{ room: "", roomcost: "" }]);
    selectroomRef.current.value = "Select the rooms";
    setTotalamnt(0);
    setAdvncamnt("");
    setStartDate("");
    setendDate("");

    // clear select options after submit
    // document.getElementById("otherevent").style.display = "none";
    swal.fire("updated successfully", "", "success");
    setModalShow(false);
  };

  return (
    <div>
      <Modal
        show={modalShow}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action="">
            <FormtextComp
              name="customername"
              type={"text"}
              label={"Customer Name"}
              placeholder={"Enter Customer Name"}
              value={cstmrname}
              onChange={(e) => setCstmrname(e.target.value)}
            />
            <FormtextComp
              name="phonenumber"
              label={"Phone Number"}
              type={"tel"}
              placeholder={"Enter Phone Number"}
              value={phnnum}
              onChange={(e) => setPhnnum(e.target.value)}
            />
            <FormtextComp
              name="alterphnnumber"
              label={"Alternative Number"}
              type={"tel"}
              placeholder={"Enter Alternative Phone Number"}
              value={altrphn}
              onChange={(e) => setAltrphn(e.target.value)}
            />
            <FormtextComp
              name="email"
              label={"Email Address"}
              type={"email"}
              placeholder={"Enter Email Address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormtextComp
              name="address"
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
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  required
                  ref={selectRef}
                >
                  <option value="" disabled>
                    Select the Event
                  </option>
                  {dynamicdata.map((ddata) => (
                    <option value={ddata.Eventname}>{ddata.Eventname}</option>
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
              <div className="col-lg-3">
                <h3 className="diffdate">{nmbrofdays}</h3>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-3">
                <Form.Label>Halls Needed</Form.Label>
              </div>
              <div className="col-lg-9">
                <Select
                  defaultInputValue={halls}
                  displayValue="label"
                  style={{ width: "max-content" }}
                  isMulti
                  closeMenuOnSelect={false}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  options={optionss}
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
                      <Form.Select
                        name="room"
                        value={Inputfield.room}
                        aria-label="Select the room"
                        onChange={(e) => handleRoomChange(index, e)}
                        required
                        ref={selectroomRef}
                      >
                        {dynamicrdata.map((dt) => (
                          <option value={dt.Roomname}>{dt.Roomname}</option>
                        ))}
                      </Form.Select>
                    </div>
                    <div className="inputfieldsitem">
                      <Form.Control
                        name="roomcost"
                        type="text"
                        placeholder="Enter cost per night"
                        value={Inputfield.roomcost}
                        onChange={(e) => handleInputChange(index, e)}
                        required
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

            <FormnumComp
              label={"Rental Amount"}
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
              label={"Advance Amount"}
              type={"number"}
              placeholder={"Enter advance Amount"}
              value={advncamnt}
              mins={0}
              onChange={(e) => setAdvncamnt(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => saveFunc(props.dataselect.id)}>save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalForm;

export const EvntmodalForm = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [startunit, setStartunit] = useState();
  const [endunit, setEndunit] = useState();
  const [chargeunit, setChargeunit] = useState();
  const [constantunit, setConstantunit] = useState();

  const [metercost, setMetercost] = useState(0);
  const [cleaningpeople, setCleaningpeople] = useState();
  const [cleaningcostper, setCleaningcostper] = useState();
  const [cleaningcost, setCleaningcost] = useState(0);
  const [watercost, setWatercost] = useState(0);
  const [Generatorcost, setGeneratorcost] = useState(0);
  const [Balance, setBalance] = useState(0);

  const [totalamnt, setTotalamnt] = useState(0);
  const [advanceamnt, setAdvanceamnt] = useState(0);
  // dynamic input fields
  const [Inputfields, setInputfields] = useState([
    {
      otherfor: "",
      othercost: "",
    },
  ]);
  const [othercost, setOthercost] = useState(0);

  useEffect(() => {
    setModalShow(props.show);
    setStartunit(props.dataselect.startunit);
    setEndunit(props.dataselect.endunit);
    setConstantunit(props.dataselect.constantunit);
    setChargeunit(props.dataselect.chargeunit);
    setCleaningpeople(props.dataselect.cleaningpeople);
    setCleaningcostper(props.dataselect.cleaningcostper);
    setCleaningcost(props.dataselect.cleaningcost);
    setWatercost(props.dataselect.watercost);
    setGeneratorcost(props.dataselect.Generatorcost);
    setInputfields(props.dataselect.otherco);
    setBalance(props.dataselect.balance);
    setAdvanceamnt(props.dataselect.advanceamount);
    setTotalamnt(props.dataselect.totalamount);
    setMetercost(props.dataselect.metercost);
  }, [props.dataselect]);
  useEffect(() => {
    calculateunit(startunit, endunit, constantunit, chargeunit);
    calculatecleaning(cleaningpeople, cleaningcostper);
    extracost(Inputfields);
    totalcost(
      metercost,
      cleaningcost,
      watercost,
      Generatorcost,
      totalamnt,
      advanceamnt,
      othercost
    );
  }, [
    Inputfields,
    startunit,
    endunit,
    constantunit,
    chargeunit,
    cleaningpeople,
    cleaningcostper,
    metercost,
    cleaningcost,
    watercost,
    Generatorcost,
    totalamnt,
    advanceamnt,
    othercost,
  ]);

  // calculation of electricity cost
  const calculateunit = (startunit, endunit, chargeunit) => {
    if (startunit && endunit && chargeunit) {
      const unit = endunit - startunit;
      const cost = unit * chargeunit;
      setMetercost(cost);
    } else if (startunit && endunit) {
      setMetercost("Enter charge per unit");
    } else if (startunit && chargeunit) {
      setMetercost("Enter End unit");
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

  // calculation of extra cost
  const extracost = () => {
    let total = 0;
    Inputfields.forEach((item) => {
      total += parseInt(item.othercost);
    });

    setOthercost(total);
  };

  // total cost calculation
  const totalcost = (
    metercost,
    cleaningcost,
    watercost,
    Generatorcost,
    totalamnt,
    advanceamnt,
    othercost
  ) => {
    if (
      metercost &&
      cleaningcost &&
      watercost &&
      Generatorcost &&
      totalamnt &&
      advanceamnt &&
      !othercost
    ) {
      const sum1 =
        parseInt(metercost) +
        parseInt(cleaningcost) +
        parseInt(watercost) +
        parseInt(Generatorcost);
      const sum2 = parseInt(totalamnt) - parseInt(advanceamnt);
      const total = sum1 + sum2;

      setBalance(total);
    } else if (
      metercost &&
      cleaningcost &&
      watercost &&
      Generatorcost &&
      totalamnt &&
      advanceamnt &&
      othercost
    ) {
      const sum1 =
        parseInt(metercost) +
        parseInt(cleaningcost) +
        parseInt(watercost) +
        parseInt(Generatorcost);
      const sum2 = parseInt(totalamnt) - parseInt(advanceamnt);
      const total = sum1 + sum2 + parseInt(othercost);

      setBalance(total);
    } else {
      setBalance(0);
    }
  };

  // update fields data in firestore
  const handleSave = async (id) => {
    await updateDoc(doc(db, "registration", id), {
      startunit: startunit,
      endunit: endunit,
      constantunit: constantunit,
      chargeunit: chargeunit,
      metercost: metercost,
      cleaningpeople: cleaningpeople,
      cleaningcostper: cleaningcostper,
      cleaningcost: cleaningcost,
      watercost: watercost,
      Generatorcost: Generatorcost,
      otherco: Inputfields,
      Balance: Balance,
    });

    // store data in local

    setStartunit("");
    setEndunit("");
    setConstantunit("");
    setChargeunit("");
    setCleaningcostper("");
    setCleaningpeople("");
    setCleaningcost("");
    setGeneratorcost("");
    setMetercost("");
    setWatercost("");
    setOthercost("");
    setInputfields([{ otherfor: "", othercost: "" }]);
    setBalance("");
    setModalShow(false);
    swal.fire("updated successfully", "", "success");
  };

  return (
    <Modal
      show={modalShow}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <Form action="">
          {" "}
          <FormnumComp
            label={"Starting Unit"}
            type={"number"}
            placeholder={"Enter Starting Unit"}
            value={startunit}
            mins={0}
            onChange={(e) => setStartunit(e.target.value)}
          />
          <FormnumComp
            label={"Ending Unit"}
            type={"number"}
            placeholder={"Enter Ending Unit"}
            value={endunit}
            mins={0}
            onChange={(e) => setEndunit(e.target.value)}
          />
          <FormnumComp
            label={"Enter constant unit"}
            type={"number"}
            placeholder={"Enter constant Unit"}
            value={constantunit}
            mins={0}
            onChange={(e) => setConstantunit(e.target.value)}
          />
          <FormnumComp
            label={"Enter Charge per unit"}
            type={"number"}
            placeholder={"Enter Charge per Unit"}
            value={chargeunit}
            mins={0}
            onChange={(e) => setChargeunit(e.target.value)}
          />
          <div className="row mb-3">
            <div className="col-lg-3">
              <Form.Label>Meter Reading Cost</Form.Label>
            </div>
            <div className="col-lg-9 ">
              {" "}
              <p className="autocalc">{metercost}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-3">
              <Form.Label>Cleaning People</Form.Label>
            </div>
            <div className="col-lg-3">
              <Form.Control
                type="number"
                placeholder="How many Cleaning People worked"
                min={0}
                value={cleaningpeople}
                onChange={(e) => setCleaningpeople(e.target.value)}
              />
            </div>
            <div className="col-lg-3">
              <Form.Control
                type="number"
                placeholder="Enter Cleaning Cost per Person"
                min={0}
                value={cleaningcostper}
                onChange={(e) => setCleaningcostper(e.target.value)}
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
          />
          <FormnumComp
            label={"Enter Generator Cost"}
            type={"number"}
            placeholder={"Enter Generator cost"}
            value={Generatorcost}
            mins={0}
            onChange={(e) => setGeneratorcost(e.target.value)}
          />
          <div className="row mb-3">
            <div className="col-lg-3">
              <Form.Label>Other cost</Form.Label>
            </div>
            <div className="col-lg-9 inputfields">
              {Inputfields.map((Inputfield, index) => (
                <div className="inputfields" key={index}>
                  <div className="inputfieldsitem">
                    <Form.Control
                      name="otherfor"
                      type="text"
                      placeholder="Enter other for"
                      value={Inputfield.otherfor}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </div>
                  <div className="inputfieldsitem">
                    <Form.Control
                      name="othercost"
                      type="text"
                      placeholder="Enter other cost"
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
          <div className="row mb-3">
            <div className="col-lg-3">
              <Form.Label>Balance Amount</Form.Label>
            </div>
            <div className="col-lg-9">
              <p className="autocalc"> {Balance}</p>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSave(props.dataselect.id)}>save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export const Maintenancemodal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [Maintenancefor, setMaintenancefor] = useState("");
  const [Maintenancecost, setMaintenancecost] = useState("");
  const [Id, setId] = useState("");

  useEffect(() => {
    setModalShow(props.show);
    setId(props.dataselect.id);
    setMaintenancefor(props.dataselect.maintenancefor);
    setMaintenancecost(props.dataselect.maintenancecost);
  }, [props.dataselect]);

  const handleSave = () => {
    updateDoc(doc(db, "maintenance", Id), {
      maintenancefor: Maintenancefor,
      maintenancecost: Maintenancecost,
    });
    setMaintenancefor("");
    setMaintenancecost("");
    swal.fire("updated successfully", "", "success");
    setModalShow(false);
  };

  return (
    <Modal
      show={modalShow}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form action="">
          {" "}
          <div className="row mb-3">
            <div className="col-lg-3">
              <Form.Label>Maintenance For </Form.Label>
            </div>
            <div className="col-lg-9">
              <Form.Control
                type="text"
                placeholder="Enter Maintenance For"
                value={Maintenancefor}
                onChange={(e) => setMaintenancefor(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-3">
              <Form.Label>Maintenance cost </Form.Label>
            </div>
            <div className="col-lg-9">
              <Form.Control
                type="number"
                placeholder="Enter Maintenance cost"
                value={Maintenancecost}
                min="0"
                onChange={(e) => setMaintenancecost(e.target.value)}
                required
              />
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSave(props.dataselect.id)}>save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export const Monmaintenancemodal = (props) => {
  const [modalpopup, setModalpopup] = useState(false);

  const [montlymaintenancecost, setMontlymaintenancecost] = useState("");
  const [Id, setId] = useState("");

  useEffect(() => {
    setModalpopup(props.show);
    setId(props.dataselect.id);
    setMontlymaintenancecost(props.dataselect.montlymaintenancecost);
  }, [props.dataselect]);

  const handleSave = () => {
    updateDoc(doc(db, "monthlymaintenance", Id), {
      montlymaintenancecost: montlymaintenancecost,
    });
    setMontlymaintenancecost("");

    swal.fire("updated successfully", "", "success");
    setModalpopup(false);
  };

  return (
    <Modal
      show={modalpopup}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form action="">
          {" "}
          <div className="row mb-3">
            <div className="col-lg-3">
              <Form.Label>Monthly Maintenance cost </Form.Label>
            </div>
            <div className="col-lg-9">
              <Form.Control
                type="text"
                placeholder="Enter Maintenance For"
                value={montlymaintenancecost}
                onChange={(e) => setMontlymaintenancecost(e.target.value)}
                required
              />
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSave(props.dataselect.id)}>save</Button>
      </Modal.Footer>
    </Modal>
  );
};
