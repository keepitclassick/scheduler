import React from "react";

export default function Header(props) {
  const appointmentVal = props.time ? "Appointment at " : "No appointments"

  return (
  <header className="appointment__time">
    <h4 className="text--semi-bold">{props.time}</h4>
    <hr className="appointment__separator" />
  </header>
  )
}