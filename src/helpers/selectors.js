export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(d => d.name === day);
  let appointments = [];

  if (filteredAppointments.length){
    appointments = filteredAppointments[0].appointments.map(x => state.appointments[x]);
  }
  return appointments;
}

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;

  for (const id in state.interviewers) {
    if (Number(id) === interviewerId) {
      return (
        {
          student: interview.student,
          interviewer: state.interviewers[id]
        }
      )
    }
  }
}


export function getInterviewersForDay(state, day) {
  const filteredAppointments = state.days.filter(d => d.name === day);
  let interviewers = [];

  if (filteredAppointments.length){
    interviewers = filteredAppointments[0].interviewers.map(x => state.interviewers[x]);
  }
  return interviewers;
}



