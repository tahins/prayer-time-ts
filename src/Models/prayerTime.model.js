export default class PrayerTime {
  constructor(name, time, formattedTime, next, isCurrent = false,
    timeUntilNextPrayerInMillis = null, timeUntilNextPrayerInText = null) {

    this.name = name;
    this.time = time;
    this.formattedTime = formattedTime;
    this.next = next;
    this.isCurrent = isCurrent;
    this.timeUntilNextPrayerInText = timeUntilNextPrayerInText;
    this.timeUntilNextPrayerInMillis = timeUntilNextPrayerInMillis;
  }

  setCurrent(status) {
    this.isCurrent = status;
  }

  setTimeUntilNextPrayerInText(timeUntilNextPrayerInText) {
    this.timeUntilNextPrayerInText = timeUntilNextPrayerInText;
  }

  setTimeUntilNextPrayerInMillis(timeUntilNextPrayerInMillis) {
    this.timeUntilNextPrayerInMillis = timeUntilNextPrayerInMillis;
  }

  getTimeUntilNextPrayer() {
    return this.timeUntilNextPrayer;
  }
}
