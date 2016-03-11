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
	runIfDifferent: function(value, callback) {
		if(value != this.lastValue) {
			this.lastValue = value;
			callback(value);
		}
	},
}


function start() {

	const slack = new Slack("https://hooks.slack.com/services/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");

	setInterval(function(){

		getJSON("http://www.fipradio.fr/livemeta", function(response){
			
			const step = response.steps[response.levels[0].items[0]];
			const track = {
				title: step.title,
				author: step.authors,
				youtube: step.lienYoutube,
			};

			//console.log(step);
			//console.log(track);

			watcher.runIfDifferent(JSON.stringify(track), function() {

				console.log("Track change !");
				console.log(track.title);
				console.log(track.author);
				console.log(track.youtube);

				slack.send({
					text: track.title + " - " + track.author + " now playing on FIP (<" + track.youtube + ">)",
					unfurl_links: true,
				});

			});
		});

	}, 1000);

}

start();