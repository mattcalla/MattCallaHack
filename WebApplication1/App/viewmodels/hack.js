define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    return {
        displayName: 'Home',
        feeds: ko.observableArray([]),
        activate: function () {

            var me = this;

            me.feeds.push(getFeed('new york city'));
            me.feeds.push(getFeed('melbourne'));
            me.feeds.push(getFeed('chocolate'));
            me.feeds.push(getFeed('saturday night live'));

        },
        select: function (item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            item.viewUrl = 'views/detail';
            app.showDialog(item);
        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        },

        
    };

    function getFeed(search) {
        var feed = { feedName: search, items: ko.observableArray([]) };
        http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: search, tagmode: 'any', format: 'json' }, 'jsoncallback').then(function (response) {
            for (var i = 0; i < 5; i++) {
                feed.items.push(response.items[i]);
            }
        });

        return feed;
    }
});