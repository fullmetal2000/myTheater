define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/mainTemplate.html',
    'views/guestbook/GuestbookListView',
    'text!templates/guestbook/monthly_schedule.html',
    'collections/MessagesCollection'
], function ($, _, Backbone, mainTemplate,GuestbookListView, monthly_Template,MessagesCollection) {

    var MainView = Backbone.View.extend({
        el:'body',
        el_list:'.guestbook-list-container',
        initialize:function () {

        },

        events:{
          'click #today':'today',
          'click #thismonth':'this_month',
          'click #thisweek':'this_week'
        },

        render:function () {
            var that = this;
            $(this.el).html(mainTemplate);

        },

        today:function(){
            console.log("click ss today")
        } ,
        this_month:function () {
            var that = this;
            console.log("this month___________________");
            var messages = new MessagesCollection({name:'abc'}, {range:'thismonth'});

            messages.fetch({
                success:function (messages) {
                    console.log('url' + messages.models);
                    $(that.el_list).html(_.template(monthly_Template, {messages:messages.models, _:_}));
                },
                error:function (response) {
                    console.log(response, "GuestbookList error!");
                }
            });
        },
        this_week:function(){
            console.log("click ss today")
        }

    });
    return MainView;

});
