var CronJob = require('cron').CronJob;
new CronJob('0 0 * * * *', function() {
	console.log('You will see this message every hour');
	var date = new Date();
	var current_hour = date.getHours();
	console.log('hour is: ' + current_hour);
}, null, true, 'America/Los_Angeles');