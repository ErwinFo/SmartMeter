
var newDate = new Date();
newDate.setHours(0);
newDate.setMinutes(0);
newDate.setSeconds(0);
console.log('newDate: ' + newDate);

newDate.setHours(23);
newDate.setMinutes(59);
newDate.setSeconds(59);
console.log('newDate: ' + newDate);