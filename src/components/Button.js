import React from "react";

import "components/Button.scss";

export default function Button(props) {
const { confirm, danger, clickable, disabled} = props
let buttonClass = "button";
  
if (confirm) {
   buttonClass += " button--confirm";
 } 

if (danger) {
   buttonClass += " button--danger";
};

return (
   <button
     className={buttonClass}
     onClick={props.onClick}
     disabled={props.disabled}
   >
     {props.children}
   </button>
 );
}

