


//for default
window.onload = function(){

    document.getElementById("year_result").textContent = "--";
    document.getElementById("month_result").textContent = "--";
    document.getElementById("day_result").textContent = "--";

}

function calcYear(parsedYear, yyyytoday, parsedMonth, mmtoday){
var yearAge;
yearAge = yyyytoday - parsedYear;

if(parsedMonth > mmtoday){
    yearAge--;
}

return yearAge;
}

function calcMonth(parsedMonth, mmtoday, inputDate, ddtoday){
    var monthAge = mmtoday - parsedMonth;

    if(inputDate > ddtoday){
        monthAge--;
    }
    
    if(monthAge >= 0){
        monthAge = monthAge
    }
    else{
        monthAge = monthAge + 12;
    }

    return monthAge;
}

function calcDay(inputDate, today){
    var monthAge;
    
    const adjustedBirthday = new Date(today.getFullYear(), today.getMonth(), inputDate.getDate());
    monthAge = adjustedBirthday.getMonth();
    if(adjustedBirthday > today){

        //eg. 17/2/2025 today , 22/2/2025
        adjustedBirthday.setMonth(monthAge-1);
    }

    const diffTime = today - adjustedBirthday;
    const dayAge = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return dayAge;

}

function resetError(){

    document.getElementById("day").classList.remove("error");
    document.getElementById("month").classList.remove("error");
    document.getElementById("year").classList.remove("error");

    document.getElementById("day-label").classList.remove("labelError");
    document.getElementById("month-label").classList.remove("labelError");
    document.getElementById("year-label").classList.remove("labelError");

    document.getElementById("day-error").textContent = "";
    document.getElementById("month-error").textContent = "";
    document.getElementById("year-error").textContent = "";

    document.getElementById("year_result").innerHTML = "--";
    document.getElementById("month_result").innerHTML = "--";    
    document.getElementById("day_result").innerHTML = "--";
}


function main(){

    ////--------------------declare everything---

    //get today date
let today = new Date();
let ddtoday = today.getDate();
let mmtoday = today.getMonth() + 1;
let yyyytoday = today.getFullYear();

//input date
var inputDay = document.getElementById("day").value;
var inputMonth = document.getElementById("month").value;
var inputYear = document.getElementById("year").value;

var daybox = document.getElementById("day");
var monthbox = document.getElementById("month");
var yearbox = document.getElementById("year");

var dayLabel = document.getElementById("day-label");
var monthLabel = document.getElementById("month-label");    
var yearLabel = document.getElementById("year-label");

//input date parsed
const parsedDay = parseInt(inputDay, 10);
const parsedMonth = parseInt(inputMonth, 10);
const parsedYear = parseInt(inputYear, 10);

// error date
let dayError = document.getElementById("day-error");
let monthError = document.getElementById("month-error");
let yearError = document.getElementById("year-error");

//result
let year_result = document.getElementById("year_result");
let month_result = document.getElementById("month_result");
let day_result = document.getElementById("day_result");

let isValid = true;
///----------------------------------------------------------------

    // Validation
    //day validation
    if (inputDay === "") {
        isValid = false;
        daybox.classList.add("error");
        dayLabel.classList.add("labelError");
        dayError.textContent = "This field is required";
    }
    else if(parsedDay > 31 || parsedDay < 1){
        isValid = false;
        daybox.classList.add("error");
        dayLabel.classList.add("labelError");
       dayError.textContent = "Must be a valid day";
   }
   else if(parsedDay === 31 && (parsedMonth === 4 || parsedMonth === 6 || parsedMonth === 9 || parsedMonth == 11)){
        isValid = false;
        daybox.classList.add("error");
        dayLabel.classList.add("labelError");
       dayError.textContent = "Must be a valid day";
   }
   else if(parsedMonth === 2){
// leap year
    const isLeapYear = parsedYear % 4 === 0 && parsedYear % 100 !== 0;

    if(parsedDay === 29 && !isLeapYear){
        isValid = false;
        daybox.classList.add("error");
        dayLabel.classList.add("labelError");
        dayError.textContent = "Must be a valid day";
    }
    
   }
//month validation
    if(inputMonth === "") {
        isValid = false;
        monthbox.classList.add("error");
        monthLabel.classList.add("labelError");
        monthError.textContent = "This field is required";
    }
    else if(parsedMonth > 12 || parsedMonth < 1){
        isValid = false;
        monthbox.classList.add("error");
        monthLabel.classList.add("labelError");
       monthError.textContent = "Must be a valid month";
   }
// year validation
    if(inputYear === "") {
        isValid = false;
        yearbox.classList.add("error");
        yearLabel.classList.add("labelError");
        yearError.textContent = "This field is required";
    }
    else if(parsedYear > yyyytoday){
        isValid = false;
        yearbox.classList.add("error");
        yearLabel.classList.add("labelError");
       yearError.textContent = "Must be in the past";
   }

   //input > today validation
//change input date to ddmmyyy format

var dateInsert = parsedYear + "-" + parsedMonth + "-" + parsedDay; 
var inputDate = new Date(dateInsert);

today.setHours(0,0,0,0);
inputDate.setHours(0,0,0,0);

if(inputDate > today){
    isValid = false;
    yearError.textContent = "Must be in the past";

}


//-------------calculate

var yearAge, monthAge, dayAge;
if(isValid){

 resetError();
    
yearAge = calcYear(parsedYear, yyyytoday, parsedMonth, mmtoday);
monthAge = calcMonth(parsedMonth, mmtoday, inputDate, ddtoday);
dayAge = calcDay(inputDate, today);

//-----display result

year_result.innerHTML = yearAge;
month_result.innerHTML = monthAge;
day_result.innerHTML = dayAge;

}




 
}
