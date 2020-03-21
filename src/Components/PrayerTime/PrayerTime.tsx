import React, { useContext } from "react";
import { Link } from "react-router-component";
import moment from "moment";
import HijrahDate from "hijrah-date";
import PrayerTimeTable from "../PrayerTimeTable/PrayerTimeTable";
import UtilService from "../../Services/util.service";
import { PositionContext } from "../../Contexts/position.context";
import { PlaceContext } from "../../Contexts/place.context";

import { Icon } from 'react-icons-kit';
import { settings } from 'react-icons-kit/feather/settings';
import "./PrayerTime.css";

function PrayerTime() {
  const positionContext = useContext(PositionContext);
  const coords = positionContext.coords;
  const settingsUrl = UtilService.getBaseUrl() + "/settings";

  return (
    <div id="prayerTime">
      <div className="flex-center information-container">
      <div className="full-width datetime-information">
        <SettingsIcon settingsUrl={settingsUrl} />
        <Calendar />
        <Place />
      </div>
      </div>
      <div className="flex-center timetable-container">
        <PrayerTimeTable latitude={coords.latitude} longitude={coords.longitude} />
      </div>
    </div>
  );
}

export default PrayerTime;


interface ISeetingsIconProps {
    settingsUrl: string
}

const SettingsIcon = (props: ISeetingsIconProps) => (
  <Link href={props.settingsUrl} className="settings-icon pull-right">
    <Icon icon={settings} size={32} />
  </Link>
);

const Calendar = () => {
  let hijrahDate = new HijrahDate(new Date());
  const formattedHijriDate = hijrahDate.format("d MMMM yyyy");
  const formattedDate = moment(new Date()).format("DD MMM YYYY");

  return (
    <div id="calendar">
      {formattedHijriDate} / {formattedDate}
    </div>
  );
}

const Place = () => {
  const placeContext = useContext(PlaceContext);
  const placeName = placeContext.isPlaceSet() ? placeContext.getPlaceName() : "";

  return (
    <div id="location">
      {placeName}
    </div>
  );
}
