/* eslint-disable */
import React, { useEffect, useState } from "react";
import Header from "components/Header";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import db from "../../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  query,
  onSnapshot,
  where,
  addDoc,
} from "firebase/firestore";
import swal from "sweetalert2";
import StarsRating from "stars-rating";

const ReviewDetails = () => {
  const [reviewsData, setreviewsData] = useState([]);

  const reviewData = () => {
    const reviewdata = collection(db, "reviews");
    const q = query(reviewdata);
    onSnapshot(q, (snapshot) => {
      let revdata = [];
      snapshot.docs.forEach((doc) => {
        revdata.push({ ...doc.data(), id: doc.id });
      });

      setreviewsData(revdata);
    });
  };

  const DeleteFunction = (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to recover this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.value) {
          swal.fire("Deleted!", "Your data has been deleted.", "success");
          deleteDoc(doc(db, "reviews", id));
          reviewData();
        } else {
          swal.fire("Cancelled", "Your file is safe :)", "error");
        }
      });
  };

  useEffect(() => {
    reviewData();
  }, []);

  return (
    <div id="layout-wrapper">
      <Header />

      <div className="main-content">
        <div className="page-content">
          <div>
            <Link
              className="button-52"
              to="/reviews"
              style={{ float: "right" }}
            >
              Review Form
            </Link>
          </div>

          <br />

          <h1 className="pageheading">Reviews</h1>
          <div className="gallery-item" style={{ marginTop: "20px" }}>
            {reviewsData.map((data, index) => (
              <div className="item revcard" key={index}>
                <Card>
                  <Card.Body>
                    <div className="rhead">
                      <div>
                        <h5> {data.cname}</h5>
                        <p>{data.phnnum}</p>
                      </div>

                      <div>
                        <button
                          className="btn btn-danger"
                          onClick={() => DeleteFunction(data.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    <hr></hr>
                    {/* <Card.Title>{data.cname}</Card.Title> */}

                    <div className="position-relative auth-pass-inputgroup mb-3">
                      <StarsRating
                        count={5}
                        // onChange={(newRating) => setRating(newRating)}
                        size={30}
                        color2={"#ffd700"}
                        value={data.Rating}
                      />
                    </div>
                    {/* <Card.Subtitle className="mb-2 text-muted">
                      {data.Rating} Stars
                    </Card.Subtitle> */}
                    {/* <Card.Text>{data.phnnum}</Card.Text> */}
                    <h5>Feedback</h5>
                    <Card.Text>{data.feedback}</Card.Text>
                    <Card.Text>
                      Maintenance -{" "}
                      <span style={{ color: "#a30813" }}>{data.q1}</span>{" "}
                    </Card.Text>

                    <Card.Text>
                      cleanliness -{" "}
                      <span style={{ color: "#a30813" }}>{data.q2}</span>{" "}
                    </Card.Text>

                    <Card.Text>
                      Maintenance -{" "}
                      <span style={{ color: "#a30813" }}>{data.q3}</span>{" "}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
