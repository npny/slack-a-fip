const request = require('request');
const Slack = require('node-slack');


function getJSON (url, callback) {
	request(url, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
			const json = JSON.parse(body);
			callback(json);
	    }
	});
}


const watcher = {
	lastValue: null,
	runIfDifferent: function (value, callback) {
		if(value != this.lastValue) {
			this.lastValue = value;
			callback(value);
		}
	},
}


module.exports = function (webhookUrl, interval) {

	if(!webhookUrl) return console.error("No incoming webhook url specified");
	if(!interval) interval = 5000;

	const slack = new Slack(webhookUrl);

	setInterval(function(){

		getJSON("http://www.fipradio.fr/livemeta", function (response) {
			
			const step = response.steps[response.levels[0].items[3]];
			const track = {
				title: step.title,
				author: step.authors,
				youtube: step.lienYoutube,
			};

			watcher.runIfDifferent(JSON.stringify(track), function() {

				const trackname = (track.title + " - " + track.author).toLowerCase().replace(/\b./g, (c) => c.toUpperCase());

				slack.send({
					text: ":musical_note: Now playing on <http://www.fipradio.fr/player|FIP>\n"
					+ "*" + (track.youtube ? "<" + track.youtube + " | " + trackname + ">" : trackname) + "*",
					unfurl_links: true,
				});

			});
		});

	}, interval);

}


if(require.main === module) module.exports(process.argv[2], parseInt(process.argv[3]));