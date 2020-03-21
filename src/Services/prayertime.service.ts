import Adhan from "adhan";
import moment from "moment";
import { getSunset } from "sunrise-sunset-js";
import UtilService from "./util.service";
import PrayerTime from "../Models/prayerTime.model";

export default class PrayerTimeService {
  private readonly _date: Date;
  private readonly _coordinates: Adhan.Coordinates;
  private readonly _params: Adhan.Parameter;
  private readonly _adhanPrayerTimes: Adhan.PrayerTimes;
  private readonly _prayerTimes: {fajr: Date, sunrise: Date, dhuhr: Date,
    asr: Date, maghrib: Date, isha: Date, midnight: Date, [key: string]: any,
    currentPrayer: () => number, nextPrayer: () => number};
  private readonly _timeKeys = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha", "midnight"];

  constructor(latitude: number, longitude: number, calculationMethod: string, madhab: string) {
    this._date = new Date();
    this._coordinates = new Adhan.Coordinates(latitude, longitude);
    this._params = this._getParams(calculationMethod, madhab);

    this._adhanPrayerTimes = new Adhan.PrayerTimes(
      this._coordinates,
      this._date,
      this._params
    );

    this._prayerTimes = {
      ...this._adhanPrayerTimes,
      midnight: this._getMidnight(this._adhanPrayerTimes.fajr),
      currentPrayer: () => 0,
      nextPrayer: () => 0,
    };
  }

  getPrayerTimes(hourMode: "12h"|"24h" = "12h", date = new Date()) {
    const UTCTimezoneOffsetInHours = date.getTimezoneOffset() / -60;
    const adhanFormattedTime = Adhan.Date.formattedTime;
    let currentTimeIndex = this._prayerTimes.currentPrayer();
    let nextTimeIndex = this._prayerTimes.nextPrayer();

    let prayerTimes: {[key: string]: any} = {};
    this._timeKeys.forEach((key, index) => {
      let name = UtilService.capitalize(key);
      let time = this._prayerTimes[key];
      let formattedTime = "";
      let nextIndex = index + 1;
      nextIndex = nextIndex !== this._timeKeys.length ? nextIndex : 0;
      let nextName = UtilService.capitalize(this._timeKeys[nextIndex]);

      if (key === "midnight") {
        formattedTime = moment(time).format("hh:mm A");
      } else {
        formattedTime = adhanFormattedTime(
          time,
          UTCTimezoneOffsetInHours,
          hourMode
        );
      }

      prayerTimes[key] = new PrayerTime(name, time, formattedTime, nextName);
    });

    if (new Date().getTime() > this._prayerTimes["midnight"].getTime()) {
      currentTimeIndex = (currentTimeIndex + 1) % this._timeKeys.length;
      nextTimeIndex = (nextTimeIndex + 1) % this._timeKeys.length;
    }
    const currentTimeKey = this._timeKeys[currentTimeIndex];
    const timeUntilNextPrayerInMillis = this._getTimeUntilNextPrayerInMillis(nextTimeIndex);
    const timeUntilNextPrayerInText = this._getTimeUntilNextPrayerInText(timeUntilNextPrayerInMillis);

    prayerTimes[currentTimeKey].setCurrent(true);
    prayerTimes[currentTimeKey].setTimeUntilNextPrayerInMillis(timeUntilNextPrayerInMillis);
    prayerTimes[currentTimeKey].setTimeUntilNextPrayerInText(timeUntilNextPrayerInText);

    return prayerTimes;
  }

  _getParams(calculationMethod: string, madhab: string) {
    let params;
    params = this._getCalculationMethodParam(calculationMethod);
    params.madhab = this._getMadhabParam(madhab);

    return params;
  }

  _getCalculationMethodParam(calculationMethod: string) {
    let param;
    switch (calculationMethod) {
      case "MuslimWorldLeague":
        param = Adhan.CalculationMethod.MuslimWorldLeague();
        break;
      case "Egyptian":
        param = Adhan.CalculationMethod.Egyptian();
        break;
      case "Karachi":
        param = Adhan.CalculationMethod.Karachi();
        break;
      case "UmmAlQura":
        param = Adhan.CalculationMethod.UmmAlQura();
        break;
      case "Dubai":
        param = Adhan.CalculationMethod.Dubai();
        break;
      case "Qatar":
        param = Adhan.CalculationMethod.Qatar();
        break;
      case "Kuwait":
        param = Adhan.CalculationMethod.Kuwait();
        break;
      case "MoonsightingCommittee":
        param = Adhan.CalculationMethod.MoonsightingCommittee();
        break;
      case "NorthAmerica":
        param = Adhan.CalculationMethod.NorthAmerica();
        break;

      default:
        param = Adhan.CalculationMethod.UmmAlQura();
        break;
    }
    return param;
  }

  _getMadhabParam(madhab: string) {
    let param;
    switch (madhab) {
      case "Shafi":
        param = Adhan.Madhab.Shafi;
        break;
      case "Hanafi":
        param = Adhan.Madhab.Hanafi;
        break;

      default:
        param = Adhan.Madhab.Shafi;
        break;
    }

    return param;
  }

  _getMidnight(fajrTime: Date) {
    let sunset = moment(
      getSunset(this._coordinates.latitude, this._coordinates.longitude)
    ).subtract(this._date.getTimezoneOffset(), "minutes");
    sunset =
      sunset.second() || sunset.millisecond()
        ? sunset.add(1, "minute").startOf("minute")
        : sunset.startOf("minute");

    let fajr = moment(fajrTime).add(1, "days");
    let midnightOffset = fajr.diff(sunset) / 2;
    let midnight = sunset.add(midnightOffset, "milliseconds");

    return midnight.toDate();
  }

  _getTimeUntilNextPrayerInMillis(nextTimeIndex: number) {
    let currentTime = moment(new Date());
    let nextPrayerTime = moment(this._prayerTimes[this._timeKeys[nextTimeIndex]]).add(1, "minutes");
    let timeDifference = nextPrayerTime.diff(currentTime);

    if (nextTimeIndex === 0 && timeDifference < 0) {
      nextPrayerTime.add(1, "days");
      timeDifference = nextPrayerTime.diff(currentTime);
    }

    return timeDifference;
  }

  _getTimeUntilNextPrayerInText(timeDifferenceInMillis: number) {
    let duration = moment.duration(timeDifferenceInMillis);
    let timeDifferenceInHours = duration.hours();
    let timeDifferenceInMinutes = duration.minutes();
    let timeUntilNextPrayer = [];
    if (timeDifferenceInHours > 0)
      timeUntilNextPrayer.push(UtilService.pluralize(timeDifferenceInHours, "hour"));
    if (timeDifferenceInMinutes > 0)
      timeUntilNextPrayer.push(UtilService.pluralize(timeDifferenceInMinutes, "minute"));

    return timeUntilNextPrayer.join(" ");
  }

}
