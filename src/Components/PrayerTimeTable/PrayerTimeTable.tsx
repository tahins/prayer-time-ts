import React, {useContext, useEffect, useState} from 'react';
import PrayerTimeRow from "./PrayerTimeRow";
import PrayerTimeService from "../../Services/prayertime.service";
import {
    WiDayCloudy,
    WiDayCloudyHigh,
    WiDayHaze,
    WiDaySunny,
    WiNightAltPartlyCloudy,
    WiNightClear,
    WiNightCloudy
} from "weather-icons-react";
import {SettingsContext} from "../../Contexts/settings.context";
import AppConfig from "../../AppConfig.json";

import "./PrayerTimeTable.css";

interface PrayerTimeTable {
    latitude: number,
    longitude: number,
}

function PrayerTimeTable(props: PrayerTimeTable) {

    const settingsContext = useContext(SettingsContext);
    const methodValue = settingsContext.userPreference.method || settingsContext.settings.method.defaultOptionKey;
    const madhabValue = settingsContext.userPreference.madhab || settingsContext.settings.madhab.defaultOptionKey;
    const updatedPrayerTimes = getPrayerTimesToDisplay(props.latitude, props.longitude,
        methodValue, madhabValue);
    const [prayerTimes, setPrayerTimes] = useState(updatedPrayerTimes);

    useEffect(() => {
        const [prayerTimeTimeout, prayerTimeInterval] =
            setupUpdatePrayerTimeInEveryMinute(updatedPrayerTimes, setPrayerTimes);

        return () => {
            clearTimeout(prayerTimeTimeout);
            clearInterval(prayerTimeInterval);
        };
    }, [updatedPrayerTimes]);

    if (!props.latitude || !props.longitude) return null;

    return (
        <ul id="prayerTimeTable" className="full-width">
            {prayerTimes.map((prayerTime, index: number) => (
                <PrayerTimeRow key={index} {...prayerTime} />
            ))}
        </ul>
    );
}

function setupUpdatePrayerTimeInEveryMinute(updatedPrayerTimes: any[],
                                            setPrayerTimes: { (value: React.SetStateAction<any[]>): void; (arg0: any): void; (arg0: any): void; }) {
    const now = new Date();
    const SECONDS_REMAINING_TILL_THIS_MINUTE = (60 - now.getSeconds()) * 1000;
    const ONE_MINUTE = 60 * 1000;

    let prayerTimeTimeout: number;
    let prayerTimeInterval: number = window.setInterval(() => {}, 0);
    prayerTimeTimeout = window.setTimeout(() => {
        setPrayerTimes(updatedPrayerTimes);

        prayerTimeInterval = window.setInterval(() => {
            setPrayerTimes(updatedPrayerTimes);
        }, ONE_MINUTE);
    }, SECONDS_REMAINING_TILL_THIS_MINUTE);

    return [prayerTimeTimeout, prayerTimeInterval];
}

function getPrayerTimesToDisplay(latitude: number, longitude: number, method: string, madhab: string): any[] {
    const prayerTimeService = new PrayerTimeService(latitude, longitude, method, madhab);
    let prayerTimes = prayerTimeService.getPrayerTimes();
    return AppConfig.prayerTimesToShow.map(timeKey => {
        let prayerTime = prayerTimes[timeKey];
        prayerTime.icon = getPrayerTimeIcon(timeKey, 38);
        return prayerTimes[timeKey];
    });
}

function getPrayerTimeIcon(prayerTimeKey: string, size: number) {
    switch (prayerTimeKey) {
        case "fajr":
            return <WiDayHaze size={size}/>;
        case "sunrise":
            return <WiDayCloudy size={size}/>;
        case "dhuhr":
            return <WiDaySunny size={size}/>;
        case "asr":
            return <WiDayCloudyHigh size={size}/>;
        case "maghrib":
            return <WiNightCloudy size={size}/>;
        case "isha":
            return <WiNightAltPartlyCloudy size={size}/>;
        case "midnight":
            return <WiNightClear size={size}/>;
        default:
            return <WiDaySunny size={size}/>;
    }
}

export default PrayerTimeTable;
