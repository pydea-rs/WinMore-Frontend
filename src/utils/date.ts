import * as moment from 'moment-timezone'

/**
 * This class is a date generation helper, to generate dates based on selected timezone,
 * Specially some specific dates such as month/week/day start and end.
 */
export default class DatePlus {
  private moment: moment.Moment

  constructor(private timezoneName: string = 'UTC') {
    this.moment = timezoneName.toLowerCase() !== 'utc' ? moment.tz(this.timezoneName) : moment.utc()
  }

  set timezone(newTimezone: string) {
    this.timezoneName = newTimezone
    this.moment = newTimezone && newTimezone.toLowerCase() !== 'utc' ? moment.tz(newTimezone) : moment.utc()
  }

  get timezone(): { title: string; timezone: moment.Moment } {
    return { title: this.timezoneName, timezone: this.moment }
  }

  get today(): Date {
    return this.moment.clone().startOf('day').toDate()
  }

  get endOfToday(): Date {
    const date = this.moment.clone().endOf('day').toDate()
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }

  get thisWeek(): Date {
    return this.moment.clone().startOf('isoWeek').toDate()
  }

  get endOfThisWeek(): Date {
    const date = this.moment.clone().endOf('isoWeek').toDate()
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }

  get thisMonth(): Date {
    return this.moment.clone().startOf('month').toDate()
  }

  get endOfThisMonth(): Date {
    const date = this.moment.clone().endOf('month').toDate()
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }

  get nextDay(): Date {
    return this.moment.clone().startOf('day').add(1, 'days').toDate()
  }

  get endOfNextDay(): Date {
    const date = this.moment.clone().endOf('day').add(1, 'days').toDate()
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }

  get nextWeek(): Date {
    return this, this.moment.clone().startOf('isoWeek').add(1, 'weeks').toDate()
  }

  get endOfNextWeek(): Date {
    const date = this.moment.clone().endOf('isoWeek').add(1, 'weeks').toDate()
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }

  get nextMonth(): Date {
    return this.moment.clone().startOf('month').add(1, 'months').toDate()
  }

  get endOfNextMonth(): Date {
    const date = this.moment.clone().endOf('month').add(1, 'months').toDate()
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }

  get now() {
    return this.moment.toDate()
  }

  createDate(year: number, month: number, day: number, hour: number = 0, minute: number = 0, second: number = 0): Date {
    return moment.tz({ year, month: month - 1, day, hour, minute, second }, this.timezoneName).toDate()
  }

  dateInTimezone(date: Date) {
    return moment.tz(date, this.timezoneName)
  }

  startOfSpecificDay(date: Date) {
    return moment.tz(date, this.timezoneName).startOf('day').toDate()
  }
  startOfSpecificWeek(date: Date) {
    return moment.tz(date, this.timezoneName).startOf('week').toDate()
  }
  startOfSpecificMonth(date: Date) {
    return moment.tz(date, this.timezoneName).startOf('month').toDate()
  }

  endOfSpecificDay(date: Date) {
    const d = moment.tz(date, this.timezoneName).endOf('day').toDate()
    d.setSeconds(0)
    d.setMilliseconds(0)
    return d
  }
  endOfSpecificWeek(date: Date) {
    const d = moment.tz(date, this.timezoneName).endOf('week').toDate()
    d.setSeconds(0)
    d.setMilliseconds(0)
    return d
  }
  endOfSpecificMonth(date: Date) {
    const d = moment.tz(date, this.timezoneName).endOf('month').toDate()
    d.setSeconds(0)
    d.setMilliseconds(0)
    return d
  }

  daysPassedFrom(date: Date) {
    return this.moment.clone().startOf('day').diff(this.dateInTimezone(date).startOf('day'), 'days')
  }

  weeksPassedFrom(date: Date) {
    return this.moment.clone().startOf('week').diff(this.dateInTimezone(date).startOf('week'), 'weeks')
  }

  monthsPassedFrom(date: Date) {
    const now = this.now,
      originDate = this.dateInTimezone(date).toDate()
    return (now.getFullYear() - originDate.getFullYear()) * 12 + now.getMonth() - originDate.getMonth()
  }

  getRemainingSecondsTillHourlyPeriod(period: number = 1) {
    if (period !== (period | 0)) {
      throw new Error('Period must be integer')
    }
    const nextHourlyPeriod = this.now
    const hour = nextHourlyPeriod.getHours()
    nextHourlyPeriod.setHours(hour + (period - (hour % period)))
    nextHourlyPeriod.setMinutes(0)
    nextHourlyPeriod.setSeconds(0)
    nextHourlyPeriod.setMilliseconds(0)

    return (nextHourlyPeriod.getTime() - this.now.getTime()) / 1000
  }
}

export const getTimePassed = (startTime: Date) => {
  let time = (Date.now() - startTime.getTime()) / 1e3
  const units = [
    { symbol: 's', max: 60 },
    { symbol: 'm', max: 60 },
    { symbol: 'h', max: 24 },
    { symbol: 'd', max: 30 },
    { symbol: 'M', max: 12 },
    { symbol: 'y', max: 0 },
  ]
  let unitIndex = 0
  for (; unitIndex < units.length && units[unitIndex].max && time >= units[unitIndex].max; time /= units[unitIndex++].max);
  return `${time | 0}${units[unitIndex].symbol} ago`
}
