import React from "react";
import "./styles.scss";




export default function Appointment(props) {
  const appointmentVal = props.time ? "Appointment at " : "No appointments"
  return (
    <article className="appointment">{appointmentVal}{props.time}</article>
  )
};