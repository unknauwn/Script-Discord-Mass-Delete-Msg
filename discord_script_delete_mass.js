var previous_scan_count = 0;
var current_scan_count = 0;
var endtime = 0;
async function clearMessages() {
	const server = "SERVER_ID"; // server id number
	const author = "USER_ID"; // user id number

        // comment this line to delete all messages of an user from a server
        // else select channel target to delete messages
	const channel = window.location.href.split('/').pop();

	const authToken = document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage.token.replace(/"/g, "");
	const headers = { 'Authorization': authToken, 'Content-Type': 'application/json' };
	const baseURL = `https://discordapp.com/api/v6/channels`;
	let searchURL = `https://discordapp.com/api/v6/guilds/${server}/messages/search?author_id=${author}`;
	if (typeof channel !== 'undefined') searchURL = searchURL + `&channel_id=${channel}`;
	let starttime=new Date();
	let clock = 0;
	let interval = 700;
	function delay(duration) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(), duration);
		});
	}
	
	const response = await fetch(searchURL, {headers});
	const json = await response.json();	
	if (endtime !== 0 && previous_scan_count !== 0 && current_scan_count !== 0){
		let timeDiff = (starttime - endtime)/1000;
		let scan_btw = (previous_scan_count - current_scan_count)
		let seconds_btw = Math.round(timeDiff);
		let scan_per_second = (scan_btw/seconds_btw);
		let seconds_left = (current_scan_count/scan_per_second);
		
		if(seconds_left > 5){
			let date = new Date(null);
			date.setSeconds(seconds_left);
			let timeString = date.toISOString().substr(11, 8);
			console.log("Progress... " + json.total_results + " left.(Time Remaining: ~"+timeString+")");
		}
	}else{	
		console.log("Progress " + json.total_results + " left.(Time Remaining: CALCULATE...)");
	}
	endtime = new Date();
	previous_scan_count = current_scan_count;
	current_scan_count = json.total_results;
	await Array.from(json.messages).map(message => {
		message.forEach(async function(item) {
			if(item.hit == true) {
				await delay(clock += interval);
				await fetch(`${baseURL}/${item.channel_id}/messages/${item.id}`, { headers, method: 'DELETE' });
			}
		});
	});

	if (json.total_results > 0) {
		delay(clock += interval).then(() => { clearMessages(); }); 
	} else {
		console.log("Deleting Messages Done.")
	};
}
clearMessages();
