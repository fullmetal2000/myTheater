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
    'views/guestbook/GuestbookFormView',
    'views/guestbook/GuestbookListView',
    'text!templates/guestbook/guestbookTemplate.html'
], function($, _, Backbone,GuestbookFormView, GuestbookListView, guestbookTemplate){

    var CabinView = Backbone.View.extend({

        el: '.page',

        render: function () {

            $(this.el).html(guestbookTemplate);

            // Create new Backbone views using the view manager (does some extra goodies);
            var guestbookFormView = new GuestbookFormView();
            guestbookFormView.render();

            var guestbookListView = new GuestbookListView();



            guestbookFormView.on('postMessage', function () {
                guestbookListView.render();
            });
            // this.getMessages_today();
        }


    });

    return CabinView;

});
