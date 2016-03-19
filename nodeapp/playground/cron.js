var CronJob = require('cron').CronJob;


/*
.---------------- Minute (0 - 59) 
|  .------------- Hour (0 - 23)
|  |  .---------- Day of month (1 - 31)
|  |  |  .------- Month (1 - 12) 
|  |  |  |  .---- Day of week (0 - 6) (sunday is 0 of 7)
|  |  |  |  |
*  *  *  *  *  commando dat uitgevoerd moet worden
*  /1  *  *  * every minute 
0  0  *  *  * every hour 
*/


try {
    new CronJob('*/1 * * * *', function() {
        console.log('cron job started');

        var date = new Date();
        console.log(date.getHours() + ':' + date.getMinutes());
         //processData.openSerialPort();

    }, function() {

        console.log('Something bad happened');

    }, 
    true, // run directly
    'Europe/Amsterdam');
} catch(ex) {
    console.log("cron pattern not valid");
}