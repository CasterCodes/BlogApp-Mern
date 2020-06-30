import React from "react";

const Alert = ({ alert }) => {
  if (alert !== null) {
    return <div className={`alert alert-${alert.type}`}>{alert.message}</div>;
  } else {
    return "";
  }
};

export default Alert;
