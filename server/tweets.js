Meteor.publish('tweets', function () {
	return Tweets.find();
});

//place your twitter API access keys here
var Twit = new TwitMaker({
	consumer_key: '...',
	consumer_secret: '...',
	access_token: '...',
	access_token_secret: '...'
});

//only grab tweets from San Francisco Area
var SF = ['-122.75','36.8','-121.75','37.8'];
var stream = Twit.stream('statuses/filter', {locations: SF});

//wrap the asynchronous stream.on() for Meteor processing
var streamSync = Meteor.wrapAsync(stream.on, stream);

streamSync('tweet', function(tweet) {
	//only add tweets that have coordinates and while the users desire it
	if (tweet.coordinates && Tweets.findOne('settings').running) {
		var options = {
			text: tweet.text,
			user: tweet.user.screen_name,
			tweet_id: tweet.id_str,
			coordinates: tweet.coordinates,
			heading: 0,
			readable_date: tweet.created_at,
			created_at: tweet.timestamp_ms
		};
		Tweets.insert(options);
	}
});


