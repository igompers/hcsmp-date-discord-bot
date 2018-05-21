// hcsmp-date-bot
// obvolvo . version 1.0 . obvolvogames@gmail.com

// init.
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Ready!');
});

// authorize hcsmp-date-bot token
client.login(`${token}`);

// command interface
client.on('message', message => {
	if(message.content === `${prefix}display-time-left`) {
			const { minutes, hours, days} = getTimeUntilRevive();
			// display time until nearest revive in order: days, hours, minutes
			if(daysUntilRevive > 1) {
				message.channel.send('Revive Countdown: ' + daysUntilRevive + ' days ');
			} else if(hoursUntilRevive > 1) {
				message.channel.send('Revive Countdown: ' + hoursUntilRevive + ' hours ');
			} else {
				message.channel.send('Revive Countdown: ' + minutesUntilRevive + ' minutes ');
			}
		}
});

// determine time until nearest revive
function getTimeUntilRevive() {

	// set current date & time
	const currentDateTime = new Date();

	// set revive dates
	var lifeResetDateTime1 = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth()+1, 1);
	var lifeResetDateTime2 = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth()+1, 16);

	// determine time until nearest revive
	if((lifeResetDateTime1 - currentDateTime) < (lifeResetDateTime2 - currentDateTime)) {
		timeUntilRevive = (lifeResetDateTime1 - currentDateTime)
	} else {
		timeUntilRevive = (lifeResetDateTime2 - currentDateTime)
	}

	// convert time left to minutes
	minutesUntilRevive = parseInt(timeUntilRevive / (1000 * 60));

	// determine # of days until revive
	if(minutesUntilRevive > 1440) {
		daysUntilRevive = parseInt(minutesUntilRevive / 1440)
		remainingTime = (minutesUntilRevive % 1440)
	} else {
		daysUntilRevive = 0;
	}

	// determine # of hours until revive
	if((remainingTime) < 1440 && (remainingTime > 60)) {
		hoursUntilRevive = parseInt(remainingTime / 60)
		remainingTime = (remainingTime % 60)
	} else {
		hoursUntilRevive = 0;
		minutesUntilRevive = remainingTime;
	}

	// determine # of minutes until revive
	minutesUntilRevive =
	// set values for days, hours, and minutes
	if(minutesUntilRevive > 1440) {
		daysUntilRevive = parseInt(minutesUntilRevive / 1440);
		hoursUntilRevive = 0;
		minutesUntilRevive = 0;
	} else if((minutesUntilRevive > 60)) {
		daysUntilRevive = 0;
		hoursUntilRevive = parseInt(minutesUntilRevive / 60)
		minutesUntilRevive = 0;
	} else {
		daysUntilRevive = 0;
		hoursUntilRevive = 0;
	}

	// return values
	return {
		minutesUntilRevive,
		hoursUntilRevive,
		daysUntilRevive,
	};

}
