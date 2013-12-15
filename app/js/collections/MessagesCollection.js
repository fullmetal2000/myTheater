define([
    'jquery',
    'underscore',
    'backbone',
    'models/MessageModel'
], function ($, _, Backbone, MessageModel) {
    var MessagesCollection = Backbone.Collection.extend({
      initialize: function(attributes, options) {
         // this.url = 'http://localhost:8888/messages?timerange='+options.range;
          this.setElement(this.at(0));
      },
        model:MessageModel,
        url:'http://localhost:8888/messages?timerange='+'thismonth',

        getElement: function() {
            return this.currentElement;
        },
        setElement: function(model) {
            this.currentElement = model;
        },
        next: function (){
            this.setElement(this.at(this.indexOf(this.getElement()) + 1));
            return this;
        },
        prev: function() {
            this.setElement(this.at(this.indexOf(this.getElement()) - 1));
            return this;
        }
    });

    return MessagesCollection;
});


// //oringal code
//define([
//    'jquery',
//    'underscore',
//    'backbone',
//    'models/MessageModel'
//], function($, _, Backbone, MessageModel){
//    var MessagesCollection = Backbone.Collection.extend({
//
//        model: MessageModel,
//        url: 'http://localhost:8888/messages'
//        //url: 'http://nationalpark-mongodb.jit.su/messages'
//    });
//
//    return MessagesCollection;
//});