import React from "react";

export const CustomInput = ({
  label,
  placeholder,
  id,
  type,
  onChange,
  value
}) => (
  <div className="form-group">
    <label className="customLabel">{label}</label>
    <input
      type={type ? type : "text"}
      className="form-control"
      id={id}
      placeholder={placeholder}
      name={id}
      onChange={onChange}
      value={value}
    />
  </div>
);

export const CustomTextArea = ({ label, placeholder, id, onChange, value }) => (
  <div className="form-group">
    <label className="customLabel">{label}</label>
    <textarea
      type="text"
      className="form-control"
      id={id}
      placeholder={placeholder}
      name={id}
      rows={5}
      onChange={onChange}
      value={value}
    />
  </div>
);
