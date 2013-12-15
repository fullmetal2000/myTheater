/**
 * Created with JetBrains WebStorm.
 * User: wangshucheng
 * Date: 11/11/2013
 * Time: 3:37 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/MessagesCollection',
    'text!templates/calendar/calendar.html'
], function ($, _, Backbone, MessagesCollection, calendarTemplate) {
    var CalendarView = Backbone.View.extend({
        initialize:function (options) {
            // Deal with default options and then look at options.pos
            // ...
            //  this.time_range=options.time_range;
        },

        el:'.calendar',
        render:function () {
            var that = this;
            /* no messages at the start */
            that.getMessages();
        },
//        events:{
////      'click .post-message': 'postMessage'
//            'click .delete':'delete'
//        }

        getMessages:function () {

            var that = this;

            var messages = new MessagesCollection({name:'abc'}, {range:'thismonth'});
            console.log('range' + 'thismonth');
            console.log('url' + messages.models);
            messages.fetch({
                success:function (messages) {
                    console.log('url' + messages.models);
                    $(that.el).html(_.template(calendarTemplate, {messages:messages.models, _:_}));
                },
                error:function (response) {
                    console.log(response, "Calendar view error!");
                }
            });
        }
//        delete:function () {
//            console.log("delete me");
//
//            var messages = new MessagesCollection({name:'abc'}, {range:'thismonth'});
//            messages.fetch({
//                success:function (messages) {
//                    console.log('url' + messages.models);
//                    // $(that.el).html(_.template(guestbookListTemplate, {messages: messages.models, _:_}));
//                    var model = messages.get("5280224127353a68040001d8");
//                    model.destroy();
//                    messages.remove(model);
//                },
//                error:function (response) {
//                    console.log(response, "GuestbookList error!");
//                }
//            });
//        }

    });
    return CalendarView;
});
