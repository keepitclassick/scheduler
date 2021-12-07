import React from 'react';
import "components/InterviewerListItem.scss";
import classnames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "iterviewers__item--selected": props.selected,
  })

  return (
  <li className={interviewerClass} onclick={()=>props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  )
}