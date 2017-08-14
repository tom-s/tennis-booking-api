import scheduler from 'node-schedule'
import { dbGet, dbAddJob, dbDeleteJob } from './api'
import { runBooking } from './nightmare'
import { EMAIL_TEMPLATES, formatEmail, sendEmail } from './email'
import { MS_PER_HOUR } from './utils'

const canBookNow = (date) => {
  const now = new Date()
  const isWeekend = (date.getDay() == 6) || (date.getDay() == 0)
  const hoursDifference = (date.getTime() - now.getTime()) / MS_PER_HOUR

  return isWeekend
    ? hoursDifference <= 6
    : hoursDifference <= 48
}

async function doBooking(data) {
  try {
    await runBooking(data)
    await sendEmail(formatEmail(data, EMAIL_TEMPLATES['SUCCESS']['BOOKING_DONE']))
    return true
  } catch(e) {
    await sendEmail(formatEmail(data, EMAIL_TEMPLATES['ERROR']))
  }
}

async function scheduleBooking(data, date) {
  try {
    const isWeekend = (date.getDay() == 6) || (date.getDay() == 0)
    const executionTime = isWeekend
      ? date.getTime() - MS_PER_HOUR * 6
      : date.getTime() - MS_PER_HOUR * 48
    const job = { ...data, executionTime }
    await dbAddJob(job)
    await sendEmail(formatEmail(job, EMAIL_TEMPLATES['SUCCESS']['BOOKING_PLANNED']))
    return true
  } catch(e) {
    await sendEmail(formatEmail(data, EMAIL_TEMPLATES['ERROR']))
  }
}

const scheduleJob = (timestamp, job) => {
  return new Promise((resolve) => {
    const date = new Date(timestamp)
    scheduler.scheduleJob(date, () => {
      resolve(job)
    })
  })
}

async function runJobs() {
  try {
    // Retrieve list of jobs
    const jobs = await dbGet('jobs')

    const now = new Date()
    const pastJobs = jobs.items.filter(job => job.executionTime <= now.getTime())
    const futureJobs = jobs.items.filter(job => job.executionTime > now.getTime())

    // Do past jobs that should have been done before
    pastJobs.forEach(async function(job) {
      console.log("handle past job", job)
      await doBooking(job)
      console.log("now unplan")
      await dbDeleteJob(job)
    })

    // Schedule future jobs
    futureJobs.forEach(async function(job) {
      console.log("handle future job", job)
      await scheduleJob(job.executionTime, job) // wait for job to be triggered
      await doBooking(job)
      await dbDeleteJob(job)
    })
  } catch(e) {
    console.log('error', e)
  }
}


/** Public methods  **/
export function initScheduler() {
  runJobs()
}

export const book = async function(data, cb) {
  const { startTime, date } = data
  const date =  new Date(year, month-1, day, startTime) // month start at 0
  const isBookable = canBookNow(date)
  const success = (isBookable)
    ? await doBooking(data)
    : await scheduleBooking(data, date)
  cb({ success, ...data })
  runJobs()
}
