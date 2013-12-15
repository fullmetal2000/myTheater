define([
  'jquery',
  'underscore',
  'backbone',
  'models/MessageModel',
  'text!templates/guestbook/guestbookFormTemplate.html'
], function($, _, Backbone,MessageModel, guestbookFormTemplate){

  var GuestbookForm = Backbone.View.extend({
    el: '.guestbook-form-container',

    render: function () {
      $(this.el).html(guestbookFormTemplate);

    },
    events: {
      'click .post-message': 'postMessage'

    },

    postMessage: function() {
      var that = this;

      console.log("posting message from GuestbookForm");

      var messageModel = new MessageModel();

      messageModel.save( { title: $('.title').val(),desc: $('.desc').val(),date: $('.date').val(),len: $('.length').val() }, {

        success: function () {
          console.log("GuestbookForm succes, title:" + messageModel.get('title') )
          console.log("GuestbookForm succes, desc:" + messageModel.get('desc') )
          console.log("GuestbookForm succes, date:" + messageModel.get('date') )
          console.log("GuestbookForm succes, length:" + messageModel.get('length') )


          that.trigger('postMessage');
        },
        error: function () {
          console.log("GuestbookForm error on save");
        }

      });
    }

  });

  return GuestbookForm;

});



