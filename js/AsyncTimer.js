//Function to get the current time(UC1)
function showTime() {
    const date = new Date();
    return date.getHours() + " Hrs || " + date.getMinutes() + " Minutes || " + date.getMilliseconds() + " MilliSeconds";
}

//Function to show the session expire after some time(UC1)
function showSessionExpire() {
    console.log("Activity B: Your Session Expired At :: " + showTime());
}
console.log("Activity A: Triggering Activity-B At :: " + showTime());
setTimeout(showSessionExpire, 5000);
console.log("Activity A: Triggering Activity-B At :: " + showTime() + " Will Execute After 5 Seconds");
module.exports = { showTime }