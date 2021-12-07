import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const {selected, spots} = props
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected" : selected,
    "day-list__item--full": spots === 0
  })
  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}