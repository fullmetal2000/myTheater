define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var MessageModel = Backbone.Model.extend({
        idAttribute:"_id",
        url: 'http://localhost:8888/messages'
        //url: 'http://nationalpark-mongodb.jit.su/messages'
    });
    return MessageModel;
});
