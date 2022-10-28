/* eslint-disable */
import React, { useState, createRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Pdf from "react-to-pdf";
import moment from "moment";

const PopupPdf = (props) => {
  const [dataselect, setdataselect] = useState([]);
  const ref = createRef();
  const options = {
    orientation: "potrait",
    format: "A4",
    border: {
      top: "0.5in",
      right: "0.5in",
      bottom: "0.5in",
      left: "0.5in",
    },
  };
  useEffect(() => {
    setdataselect([props.dataselectpdf]);
  }, []);

  return (
    <div>
      <Modal show={props.showpdf} onHide={props.onHidepdf} animation={false}>
        {dataselect.map((data, index) => {
          return (
            <div key={index}>
              <Modal.Header closeButton>
                <Modal.Title>{data.customername}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div ref={ref}>
                  <div style={{ textAlign: "center" }}>
                    <h3> Sri Subashree Mahal</h3>
                  </div>

                  <table className="table table-nowrap mb-0">
                    <tbody>
                      <tr>
                        <td>Customer Name</td>
                        <td>{data.customername}</td>
                      </tr>
                      <tr>
                        <td>Event</td>
                        <td>{data.event}</td>
                      </tr>
                      <tr>
                        <td>Starting Date</td>
                        <td>
                          {moment
                            .unix(data.startdate.seconds)
                            .format("DD/MM/YYYY")}
                        </td>
                      </tr>
                      <tr>
                        <td>Ending Date</td>
                        <td>
                          {moment
                            .unix(data.enddate.seconds)
                            .format("DD/MM/YYYY")}
                        </td>
                      </tr>
                      <tr>
                        <td>Days</td>
                        <td>{data.numberofdays}</td>
                      </tr>
                      <tr>
                        <td>Needed halls</td>
                        <td>
                          {data.halls.map((hall, index) => (
                            <div key={index}>{hall}</div>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td>Rooms needed</td>
                        <td>
                          {data.rooms.map((room, index) => (
                            <div key={index}>
                              {room.room} - {room.roomcost}
                            </div>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td>Rental Amount</td>
                        <td>{data.rentalamnt}</td>
                      </tr>
                      <tr>
                        <td>Total Amount</td>
                        <td>{data.totalamount}</td>
                      </tr>
                      <tr>
                        <td>Advance Amount</td>
                        <td>{data.advanceamount}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    After event over electric cost and cleaning cost will be
                    added to total amount.
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div variant="primary">
                  <Pdf
                    options={options}
                    targetRef={ref}
                    filename={`${data.customername}.pdf`}
                    x={0.5}
                    y={0.5}
                    scale={0.8}
                  >
                    {({ toPdf }) => (
                      <p onClick={toPdf} style={{ cursor: "pointer" }}>
                        <i className="fa fa-download"></i> Download
                      </p>
                    )}
                  </Pdf>
                </div>
              </Modal.Footer>
            </div>
          );
        })}
      </Modal>
    </div>
  );
};

export default PopupPdf;
