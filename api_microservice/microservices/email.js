import schedule from 'node-schedule'

// const job = 
// })
const job = () => {
    schedule.scheduleJob('1 * * * *', () => {
        console.log("Schedule Job")
    }
}

module.exports = { job }
// const rule = new schedule.RecurrenceRule()