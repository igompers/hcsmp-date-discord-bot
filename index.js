// hcsmp-date-bot
// obvolvo . version 1.1 . obvolvogames@gmail.com

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
			// get countdown values
			const { minutesUntilRevive, hoursUntilRevive, daysUntilRevive} = getTimeUntilRevive();

			// display countdown to channel
			message.channel.send('Revive Countdown: ' + daysUntilRevive + ' days '+ hoursUntilRevive + ' hours ' + minutesUntilRevive + ' minutes');
		}
});

// determine time until nearest revive
function getTimeUntilRevive() {

	// set current date & time
	const currentDateTime = new Date();

	// set revive dates
	var lifeResetDateTime1 = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth()+1, 1);
	var lifeResetDateTime2 = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth()+1, 16);

	// determine nearest revive date
	var timeUntilRevive = 0;
	if((lifeResetDateTime1 - currentDateTime) < (lifeResetDateTime2 - currentDateTime)) {
		timeUntilRevive = (lifeResetDateTime1 - currentDateTime);
	} else {
		timeUntilRevive = (lifeResetDateTime2 - currentDateTime);
	}

	// var. init.
	var minutesUntilRevive = 0;
	var hoursUntilRevive = 0;
	var daysUntilRevive = 0;

	// convert timeUntilRevive from milliseconds to minutes
	timeUntilRevive = parseInt(timeUntilRevive / (1000 * 60));
	var remainingTime = 0;

	// divide remaining time into days, hours, and minutes
	if(timeUntilRevive > 1440) {
		daysUntilRevive = parseInt(timeUntilRevive / 1440)
		remainingTime = (timeUntilRevive % 1440)
	} else {
		daysUntilRevive = 0;
		remainingTime = timeUntilRevive;
	}

	if(((remainingTime) < 1440) && (remainingTime > 60)) {
		hoursUntilRevive = parseInt(remainingTime / 60);
		minutesUntilRevive = (remainingTime % 60);
	} else {
		hoursUntilRevive = 0;
	}

	// return values
	return {
		minutesUntilRevive,
		hoursUntilRevive,
		daysUntilRevive,
	};

}
