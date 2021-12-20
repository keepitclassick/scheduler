import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() { 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers:{}
  });

  const setDay = day => setState({ ...state, day });

  function calculateSpots(dayObj, appointments) {
    let spots = dayObj.appointments.length;
    for (const appointmentId of dayObj.appointments) {
      if (appointments[appointmentId].interview) {
        spots--;
      }
    }
    return spots;
  }

 // Adds an interview, updates db and state
 function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
 
    // Find which day the appointment was on
    const dayIndex = state.days.findIndex(day => day.appointments.includes(id));

    // Update the spots value and generate new days array
    const day = { ...state.days[dayIndex], spots: calculateSpots(state.days[dayIndex], appointments) };
    const days = [...state.days];
    days[dayIndex] = day;

  return axios.put(`/api/appointments/${id}`, { interview: interview })
  .then(response => setState(prev => ({ ...prev, appointments, days})));
};

// Cancels an interview, updates db and state
function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

    // Find which day the appointment was on
    const dayIndex = state.days.findIndex(day => day.appointments.includes(id));

    // Update the spots value and generate new days array
    const day = { ...state.days[dayIndex], spots: calculateSpots(state.days[dayIndex], appointments) };
    const days = [...state.days];
    days[dayIndex] = day;


  return axios.delete(`/api/appointments/${id}`)
    .then(response => setState(prev => ({ ...prev, appointments, days})));
}

useEffect(() => {
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
  ]).then(all => {
    setState(prev=> ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  })
}, []);

  return { state, setDay, bookInterview, cancelInterview }
};

