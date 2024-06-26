import React from "react";
import "./style.css";
//<button type="button" className={green ? "btn btn-green": "green"} onClick={onClick}>{text}</button>
 
function Button({ text, onClick, green}) {
  return (
  <div className={green ? "btn btn-green" : "btn"} onClick={onClick}>
    {text}
  </div>
  );
}

export default Button;