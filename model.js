Tweets = new Mongo.Collection('tweets');

Meteor.methods({
 'limitTweets': function () {
	 //redis-ify Tweets collection
	 var settings = Tweets.findOne('settings');
	 if (settings) {
		 var numTweets = Tweets.find().count() - 1;
		 var maxTweets = settings.tweetCount;
		 if (numTweets > maxTweets) {
			 var oldest = Tweets.find({type: 'tweet'}, {sort: {created_at: -1}, fields: {_id: 1}}).fetch();
			 oldest.splice(0, maxTweets);
			 var ids = [];
			 oldest.forEach(function (idKey) {
				 ids.push(idKey._id);
			 });
			 Tweets.remove({_id: {$in: ids}});
		 }
	 }
 }
});

if(Meteor.isServer) {
	Meteor.startup(function () {
		if (!Tweets.find({type: 'settings'}).count()) {
			var init = {
				_id: 'settings',
				type: 'settings',
				running: true,
				tweetCount: 10
			};
			Tweets.insert(init);
		}
	});
}
if(Meteor.isClient) {
	Meteor.startup(function () {
		Session.set('sort', 'timely');
	});
}

