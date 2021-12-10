import React, { useState, useEffect } from "react";


import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"
import useVisualMode from "hooks/useVisualMode"



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers:{}
  })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(state => ({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

const setDay = day => setState({ ...state, day });

console.log("state",state.interviewers)

const appointmentsForDay = getAppointmentsForDay(state, state.day);

  const appointmentList = appointmentsForDay.map( appointment => {
    const interview = getInterview(state, appointment.interview);

    const interviewersForDay = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForDay}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu"><DayList
  days={state.days}
  value={state.day}
  onChange={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
         {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
