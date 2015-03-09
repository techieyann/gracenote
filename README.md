# Gracenote Coding Challenge
This is a meteor app which streams tweets posted in the SF Bay Area. The stream is sortable by tweet text or time of creation. Pausing the stream causes Streetview images to be displayed inline. Users can rotate the heading of the image to find the best view. Users can also choose the number of tweets displayed.

# Preview
View the app in action at https://gracenote.ianmceachern.com

# Installation
Clone this repo:

```
git clone git@github.com:techieyann/gracenote.git
```

install meteor: 

```
curl https://install.meteor.com/ | sh 
```

Modify server/tweets.js to include your Twitter API keys:

```
consumer_key: '...',
consumer_secret: '...',
access_token: '...',
access_token_secret: '...'
```

Optionally modify client/templates/tweetStream.html by adding your Streetview enabled Google API key to the Streetview image url:
```
src="https://maps.googleapis.com/maps/api/streetview?...&key=..."
```

And finally run meteor in the root directory of the repo. If everything went correctly, you can access your stream at http://localhost:3000