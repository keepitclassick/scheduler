import React from 'react';
import "components/InterviewerList.scss";
import classNames from "classnames";
import InterviewerListItem from './InterviewerListItem';

export default function InterviewList(props) {

  return (
    <section className="interviewers" onClick={()=>props.setInterviewer}>
    <h4 className="interviewers__header text--light">{props.name}</h4>
    <ul className="interviewers__list">
      {props.interviewers.map(interviewer => 
        <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}    
      />
        )}</ul>
  </section>
  )
};