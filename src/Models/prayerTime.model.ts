export default class PrayerTime {
  private readonly name: string;
  private readonly time: string;
  private readonly formattedTime: string;
  private readonly next: string;
  private isCurrent: boolean;
  private timeUntilNextPrayerInText: string;
  private timeUntilNextPrayerInMillis: number;

  constructor(name: string, time: string, formattedTime: string, next: string, isCurrent: boolean = false,
    timeUntilNextPrayerInMillis: number = 0, timeUntilNextPrayerInText: string = "") {

    this.name = name;
    this.time = time;
    this.formattedTime = formattedTime;
    this.next = next;
    this.isCurrent = isCurrent;
    this.timeUntilNextPrayerInText = timeUntilNextPrayerInText;
    this.timeUntilNextPrayerInMillis = timeUntilNextPrayerInMillis;
  }

  setCurrent(status: boolean) {
    this.isCurrent = status;
  }

  setTimeUntilNextPrayerInText(timeUntilNextPrayerInText: string) {
    this.timeUntilNextPrayerInText = timeUntilNextPrayerInText;
  }

  setTimeUntilNextPrayerInMillis(timeUntilNextPrayerInMillis: number) {
    this.timeUntilNextPrayerInMillis = timeUntilNextPrayerInMillis;
  }

  // getTimeUntilNextPrayer() {
  //   return this.timeUntilNextPrayer;
  // }
}
