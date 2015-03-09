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
		//check if tweet coordinates are actually within specified range
		var lon = tweet.coordinates.coordinates[0];
		var lat = tweet.coordinates.coordinates[1];
		if ((SF[0]<lon && SF[2]>lon) && (SF[1]<lat && SF[3]>lat)) {
			//strip out the useful data
			var options = {
				type: 'tweet',
				text: tweet.text,
				user: tweet.user.screen_name,
				tweet_id: tweet.id_str,
				coordinates: tweet.coordinates,
				heading: 0,
				readable_date: tweet.created_at,
				created_at: tweet.timestamp_ms
			};
			Tweets.insert(options);
			Meteor.call('limitTweets');
		}
	}
});


