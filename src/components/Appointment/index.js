import React from "react";
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETING = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDITING = "EDITING";

  const { mode, transition, back } = useVisualMode( props.interview? SHOW : EMPTY );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }


  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  } 


 


  return (
    <article className="appointment">
      <Header time={ props.time } />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={ props.interview.student } interviewer={ props.interview.interviewer } onDelete={()=>transition(CONFIRM)} onEdit={()=>transition(EDITING)}/>}    
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={ back } onSave={ save }/>}
      {mode === CONFIRM && <Confirm message= 'Are you sure you would like to delete?' onCancel={back} onConfirm={deleteInterview} />}
      {mode === EDITING && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => transition(SHOW)} onSave={save} />}
      {mode === SAVING && <Status message= 'Saving'/>}
      {mode === DELETING && <Status message= 'Deleting' />}
      
  
    </article>
  )
};