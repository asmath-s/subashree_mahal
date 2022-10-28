import React from "react";
import Form from "react-bootstrap/Form";

// text field
const FormtextComp = (props) => {
  return (
    <div>
      {" "}
      <div className="row mb-3">
        <div className="col-lg-3">
          <Form.Label>{props.label}</Form.Label>
        </div>
        <div className="col-lg-9">
          <Form.Control
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default FormtextComp;

// number field

export const FormnumComp = (props) => {
  return (
    <div>
      {" "}
      <div className="row mb-3">
        <div className="col-lg-3">
          <Form.Label>{props.label}</Form.Label>
        </div>
        <div className="col-lg-9">
          <Form.Control
            type={props.type}
            placeholder={props.placeholder}
            min={props.mins}
            step={props.steps}
            value={props.value}
            onChange={props.onChange}
            required
          />
        </div>
      </div>
    </div>
  );
};
