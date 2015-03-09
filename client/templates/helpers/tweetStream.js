Template.tweetStream.helpers({
	streamRunning: function () {
		var settings = Tweets.findOne('settings');
		if (settings) return settings.running;
	},
	lat: function () {
		return this.coordinates.coordinates[1];
	},
	lon: function () {
		return this.coordinates.coordinates[0];
	}
});

Template.tweetStream.events = {
	'click #heading-left': function () {
		var newHeading;
		if (this.heading == 0)  newHeading = 240;
		else newHeading = (this.heading - 120) % 360;
		this.heading = newHeading;
		Tweets.update({_id: this._id}, this);
	},
	'click #heading-right': function () {
		var newHeading = (this.heading + 120) % 360;
		this.heading = newHeading;
		Tweets.update({_id: this._id}, this);
	}
};
