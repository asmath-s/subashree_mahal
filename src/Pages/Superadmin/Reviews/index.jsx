/* eslint-disable */
import React, { useState, useEffect } from "react";

import Footer from "components/Footer";
import Form from "react-bootstrap/Form";
import StarsRating from "stars-rating";
import db from "../../../firebase";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import swal from "sweetalert2";

const Reviews = () => {
  const [Rating, setRating] = useState("");
  const [cname, setcname] = useState("");
  const [phnnum, setPhnnum] = useState("");
  const [feedback, setfeedback] = useState("");
  const [q1, setq1] = useState("");
  const [q2, setq2] = useState("");
  const [q3, setq3] = useState("");
  const [todayDate, settodayDate] = useState("");

  // const [feedback, setfeedback] = useState("");

  const question1 = (e) => {
    setq1(e.target.value);
  };

  const question2 = (e) => {
    setq2(e.target.value);
  };

  const question3 = (e) => {
    setq3(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (Rating === "" || q1 === "" || q2 === "" || q3 === "") {
      swal.fire("Please enter all the fields", "", "error");
    } else {
      addDoc(collection(db, "reviews"), {
        Rating: Rating,
        cname: cname,
        phnnum: phnnum,
        feedback: feedback,
        q1: q1,
        q2: q2,
        q3: q3,
        todayDate: todayDate,
      });

      setRating("");
      setcname("");
      setPhnnum("");
      setfeedback("");

      document.getElementById("reviewForm").reset();
      swal.fire("registered successfully", "", "success");
    }
  };

  useEffect(() => {
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    console.log("date", date);
    settodayDate(date);
  }, []);

  return (
    <div>
      <div className="auth-page-wrapper pt-5">
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>
          <div className="shape"></div>
        </div>
      </div>
      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <a href="index.html" className="d-inline-block auth-logo">
                    <img src="" alt="" height="20" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="logintext">Reviews</h5>
                  </div>
                  <div className="p-2 mt-4">
                    <Form id="reviewForm" action="" onSubmit={handleChange}>
                      <div className="mb-3">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Your Name"
                          value={cname}
                          onChange={(e) => setcname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
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
                      <div className="mb-3">
                        <Form.Label style={{ marginBottom: "0px" }}>
                          Rating
                        </Form.Label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <StarsRating
                            count={5}
                            onChange={(newRating) => setRating(newRating)}
                            size={30}
                            color2={"#ffd700"}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <Form.Label>Share Experience</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Share Your Experience"
                          value={feedback}
                          onChange={(e) => setfeedback(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <Form.Label>
                          Does Mahal Maintained Properly ?
                        </Form.Label>
                        <div className="selector">
                          <div className="selecotr-item">
                            <Form.Check
                              reverse
                              label="Good"
                              name="group1"
                              type="radio"
                              id="radio1"
                              value="Good"
                              onChange={question1}
                            />
                          </div>
                          <div className="selecotr-item">
                            <Form.Check
                              reverse
                              label="Bad"
                              name="group1"
                              type="radio"
                              id="radio2"
                              value="Bad"
                              onChange={question1}
                            />
                          </div>
                          <div className="selecotr-item">
                            <Form.Check
                              reverse
                              label="Excelent"
                              name="group1"
                              type="radio"
                              id="radio3"
                              value="Excelent"
                              onChange={question1}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <Form.Label>Does Mahal Cleaned Properly ?</Form.Label>
                        <div className="selector">
                          <div className="selecotr-item">
                            <Form.Check
                              reverse
                              label="Yes"
                              name="group2"
                              type="radio"
                              id="yes"
                              value="Yes"
                              onChange={question2}
                            />
                          </div>
                          <div className="selecotr-item">
                            <Form.Check
                              reverse
                              label="No"
                              name="group2"
                              type="radio"
                              id="no"
                              value="No"
                              onChange={question2}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <Form.Label>
                          Does Mahal Maintained Properly ?
                        </Form.Label>
                        <div className="selector">
                          <div className="selecotr-item">
                            <Form.Check
                              reverse
                              label="Good"
                              name="group3"
                              type="radio"
                              id="gud"
                              value="Good"
                              onChange={question3}
                            />
                          </div>
                          <div className="selecotr-item">
                            <Form.Check
                              reverse
                              label="Bad"
                              name="group3"
                              type="radio"
                              id="bad"
                              value="Bad"
                              onChange={question3}
                            />
                          </div>
                          <div className="selecotr-item">
                            <Form.Check
                              reverse
                              label="Excelent"
                              name="group3"
                              type="radio"
                              id="excelent"
                              value="Excelent"
                              onChange={question3}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-success w-100 loginbtn"
                          type="submit"
                          //   onClick={loginBtn}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
