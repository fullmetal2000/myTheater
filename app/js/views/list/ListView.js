/**
 * Created with JetBrains WebStorm.
 * User: wangshucheng
 * Date: 11/10/2013
 * Time: 2:51 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/guestbook/GuestbookListView',
    'text!templates/guestbook/guestbookTemplate.html',
    'text!templates/guestbook/guestbookListTemplate.html',
    'collections/MessagesCollection',
], function ($, _, Backbone, GuestbookListView,guestbookTemplate, guestbookListTemplate, MessagesCollection) {

    var ListView = Backbone.View.extend({

        el:'.page',

        render:function () {

            $(this.el).html(guestbookTemplate);
            // Create new Backbone views using the view manager (does some extra goodies);
            var guestbookListView = new GuestbookListView();
            guestbookListView.render();

            // this.getMessages_today();
        },
        events:{
//      'click .post-message': 'postMessage'
            'click #thismonth':'this_month',
            'click #today':'today'
        },
        this_month:function () {
            var that = this;
            console.log("today___________________");
            var messages = new MessagesCollection({name:'abc'}, {range:'thismonth'});

            messages.fetch({
                success:function (messages) {
                    console.log('url' + messages.models);
                    $(that.el_list).html(_.template(guestbookListTemplate, {messages:messages.models, _:_}));
                },
                error:function (response) {
                    console.log(response, "GuestbookList error!");
                }
            });
        },
        today:function(){

        }



    });

    return ListView;

});
