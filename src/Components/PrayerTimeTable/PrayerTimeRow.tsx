import React from 'react';
import {IconProp} from "react-icons-kit";

interface PrayerTimeRow {
  isCurrent: boolean,
  icon: IconProp,
  name: string,
  formattedTime: string,
  next: string,
  timeUntilNextPrayerInText: string
}

function PrayerTimeRow(props: PrayerTimeRow) {
  return (
    <li
      id="prayerTimeRow"
      className={props.isCurrent ? "current-prayer-time" : ""}
    >
      <div className="prayer-icon">{props.icon}</div>
      <div className="prayer-name">{props.name}</div>
      <div className="prayer-time">{props.formattedTime}</div>
      {props.isCurrent ? (
        <div className="prayer-time-remaining">
          Time until {props.next}: {props.timeUntilNextPrayerInText}
        </div>
      ) : null}
    </li>
  );
}

export default PrayerTimeRow;
