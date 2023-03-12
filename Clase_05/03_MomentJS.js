const moment = require('moment')

const today = moment()
console.log(today)

const myBirthday = moment("28-06-2002", "DD-MM-YYYY")

myBirthday.isValid() ? console.log(`Desde mi nacimiento en ${myBirthday}, han pasado ${today.diff(myBirthday, "days")} dias`) : console.log("Fecha invalida.");


