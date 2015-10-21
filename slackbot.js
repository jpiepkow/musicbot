var music = require('./functions');
var Slack = require('slack-client');

var token = '';

var slack = new Slack(token, true, true);

slack.on('open', function () {
    var channels = Object.keys(slack.channels)
        .map(function (k) { return slack.channels[k]; })
        .filter(function (c) { return c.is_member; })
        .map(function (c) { return c.name; });
    var groups = Object.keys(slack.groups)
        .map(function (k) { return slack.groups[k]; })
        .filter(function (g) { return g.is_open && !g.is_archived; })
        .map(function (g) { return g.name; });

    console.log('Welcome to Slack. You are ' + slack.self.name + ' of ' + slack.team.name);

    if (channels.length > 0) {
        console.log('You are in: ' + channels.join(', '));
    }
    else {
        console.log('You are not in any channels.');
    }

    if (groups.length > 0) {
        console.log('As well as: ' + groups.join(', '));
    }
});
slack.on('message', function(message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var user = slack.getUserByID(message.user);
    if(message.text.indexOf('+listening') > -1) {
    music.getUser(user.name,function(err,r) {
        music.getSong(r.lastfm, function(err,res) {
            music.post(res);
        })
    })
    }
    if(message.text.indexOf('+register') > -1) {
        var username = message.text.split('=')[1].trim();
        music.regester(user.name, username);
    }
});

slack.login();