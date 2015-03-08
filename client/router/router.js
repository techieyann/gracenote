Router.map(function () {
	this.route('tweetStream', {
		path: '/',
		title: 'tweetStream',
		subscriptions: function () {
			this.wait(Meteor.subscribe('tweets'));
		},
		data: function () {
			var tenTweets = Tweets.find({_id:{$ne: 'settings'}},{sort: {created_at: -1}});
			return {
				tweets: tenTweets
			};
		}

	});
});
