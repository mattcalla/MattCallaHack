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

            var feed1 = { feedName: "Flickr1", items: ko.observableArray([]) };
            http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: 'new york city', tagmode: 'any', format: 'json' }, 'jsoncallback').then(function (response) {
                for (var i = 0; i < 5; i++) {
                    feed1.items.push(response.items[i]);
                }
            });
            
            var feed2 = { feedName: "Flickr2", items: ko.observableArray([]) };
            http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: 'melbourne demons', tagmode: 'any', format: 'json' }, 'jsoncallback').then(function (response) {
                for (var i = 0; i < 5; i++) {
                    feed2.items.push(response.items[i]);
                }
            });

            me.feeds.push(feed1);
            me.feeds.push(feed2);

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
        }
    };
});