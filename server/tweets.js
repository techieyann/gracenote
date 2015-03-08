Meteor.publish('tweets', function () {
	return Tweets.find();
});


var Twit = new TwitMaker({
	consumer_key: '...',
	consumer_secret: '...',
	access_token: '...',
	access_token_secret: '...'
});

var SF = ['-122.75', '36.8', '-121.75', '37.8'];
var stream = Twit.stream('statuses/filter', {locations: SF});

var streamSync = Meteor.wrapAsync(stream.on, stream);

streamSync('tweet', function(tweet) {
	if (tweet.coordinates && Tweets.findOne('settings').running) {
		console.log(tweet);
		var options = {
			text: tweet.text,
			user: tweet.user.screen_name,
			coordinates: tweet.coordinates,
			readable_date: tweet.created_at,
			created_at: tweet.timestamp_ms
		};
		Tweets.insert(options);
	}
});


