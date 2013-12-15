define([
    'jquery',
    'underscore',
    'backbone',
    'views/MainView',
    'views/list/ListView',
    'views/post/PostView',
    'views/calendar/CalendarView'
], function ($, _, Backbone, MainView, ListView,PostView,CalendarView) {

    var MainRouter = Backbone.Router.extend({
        routes:{

            'about':'showAbout',
           // '*actions':'defaultAction',
            '':'defaultAction',
            'messages':'showMessageAboutMongo', // All urls will trigger this route
            'display':'display',
            'post':'post',
            'month.html':'show'
        }
    });

    var initialize = function () {
        //var vent = _.extend({}, Backbone.Events);
        var router = new MainRouter();

        console.log("MainRouter / initialize");
        var mainView = new MainView();
        mainView.render();
//        var calendarView = new CalendarView();
//        calendarView.render();

        router.on('route:defaultAction', function (actions) {

            var mainView = new MainView();
            mainView.render();
            var calendarView = new CalendarView();
            calendarView.render();
            console.log("default route");

        });


        router.on('route:showMessageAboutMongo', function () {

            console.log("display helpful message about setting up mongo");

        });

        router.on('route:showAbout', function () {

            console.log("display   about");

        });



        router.on('route:display', function () {
            var mainView = new MainView();
            mainView.render();

            var listView = new ListView();
            listView.render();

            console.log("all movie");

        });

        router.on('route:post', function () {

            var mainView = new MainView();
            mainView.render();
            var postView = new PostView();
            postView.render();
            console.log("add movie");
        });


        Backbone.history.start();

    };
    return {
        initialize:initialize
    };
});
