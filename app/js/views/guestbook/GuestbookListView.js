define([
    'jquery',
    'underscore',
    'backbone',
    'collections/MessagesCollection',
    'text!templates/guestbook/guestbookListTemplate.html'
], function ($, _, Backbone, MessagesCollection, guestbookListTemplate) {
    var GuestbookListView = Backbone.View.extend({
        initialize:function (options) {
            // Deal with default options and then look at options.pos
            // ...
            //  this.time_range=options.time_range;
        },

        el:'.guestbook-list-container',
        render:function () {
            var that = this;
            /* no messages at the start */
            that.getMessages();
        },
        events:{
//      'click .post-message': 'postMessage'
            'click .delete':'delete'
        },

        getMessages:function () {

            var that = this;

            var messages = new MessagesCollection({name:'abc'}, {range:'thismonth'});
            console.log('range' + 'thismonth')
            console.log('url' + messages.models);
            messages.fetch({
                success:function (messages) {
                    console.log('url' + messages.models);
                    $(that.el).html(_.template(guestbookListTemplate, {messages:messages.models, _:_}));
                },
                error:function (response) {
                    console.log(response, "GuestbookList error!");
                }
            });
        },
        delete:function () {
            console.log("delete me");

            var messages = new MessagesCollection({name:'abc'}, {range:'thismonth'});
            messages.fetch({
                success:function (messages) {
                    console.log('url' + messages.models);
                    // $(that.el).html(_.template(guestbookListTemplate, {messages: messages.models, _:_}));
                    var model = messages.get("5280224127353a68040001d8");
                    model.destroy();
                    messages.remove(model);
                },
                error:function (response) {
                    console.log(response, "GuestbookList error!");
                }
            });
        }

    });
    return GuestbookListView;
});
