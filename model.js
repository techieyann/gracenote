Tweets = new Mongo.Collection('tweets');

if(Meteor.isServer) {
	Meteor.startup(function () {
		if (!Tweets.find('settings').count()) {
			var init = {
				_id: 'settings',
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
	Deps.autorun(function () {
		var settings = Tweets.findOne('settings');
		if (settings){
			var tweetCount = settings.tweetCount;
			//add one for settings entry
			if((Tweets.find().count()-1) > tweetCount) {
				var oldestId = Tweets.findOne({_id:{$ne: 'settings'}}, {sort: {created_at: 1}})._id;
				Tweets.remove(oldestId);
			}
		}
	});
}

