import React, {useContext} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import HijrahDate from "hijrah-date";
import PrayerTimeTable from "../PrayerTimeTable/PrayerTimeTable";
import UtilService from "../../Services/util.service";
import {PositionContext} from "../../Contexts/position.context";
import {PlaceContext} from "../../Contexts/place.context";

import {Icon} from 'react-icons-kit';
import {settings} from 'react-icons-kit/feather/settings';
import "./PrayerTime.css";
import {SettingsContext} from "../../Contexts/settings.context";

function PrayerTime() {
    const positionContext = useContext(PositionContext);
    const settingsContext = useContext(SettingsContext);
    const coords = positionContext.coords;
    const settingsUrl = UtilService.getBaseUrl() + "/settings";
    const hijriDateAdjustment: number = parseInt(settingsContext.userPreference.hijriDateAdjustment ||
        settingsContext.settings.hijriDateAdjustment.defaultOptionKey);

    return (
        <div id="prayerTime">
            <div className="flex-center information-container">
                <div className="full-width datetime-information">
                    <SettingsIcon settingsUrl={settingsUrl}/>
                    <Calendar adjustmentInDays={hijriDateAdjustment}/>
                    <Place/>
                </div>
            </div>
            <div className="flex-center timetable-container">
                <PrayerTimeTable latitude={coords.latitude} longitude={coords.longitude}/>
            </div>
        </div>
    );
}

export default PrayerTime;


interface ISettingsIconProps {
    settingsUrl: string
}

const SettingsIcon = (props: ISettingsIconProps) => (
    <Link to={props.settingsUrl} className="settings-icon pull-right">
        <Icon icon={settings} size={32}/>
    </Link>
);

interface ICalender {
    adjustmentInDays: number
}

const Calendar = ({adjustmentInDays}: ICalender) => {
    const adjustedDay = new Date();
    adjustedDay.setDate(adjustedDay.getDate() + adjustmentInDays);
    const hijrahDate = new HijrahDate(adjustedDay);

    const formattedHijriDate = hijrahDate.format("d MMMM yyyy");
    const formattedDate = moment(new Date()).format("DD MMM YYYY");

    return (
        <div id="calendar">
            {formattedHijriDate} / {formattedDate}
        </div>
    );
};

const Place = () => {
    const placeContext = useContext(PlaceContext);
    const placeName = placeContext.isPlaceSet() ? placeContext.getPlaceName() : "";

    return (
        <div id="location">
            {placeName}
        </div>
    );
};
