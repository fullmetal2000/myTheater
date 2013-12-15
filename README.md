myTheater
=========

This project use Bootstrap, Backbone.js and require.js as front end frame work, use node.js as server and mongo db as database.

Feature description:
Summary:
This is a single page application, in the page, there is 3 buttons in navigation bar, "home", "all movie" and "add movies"
1 Home:
In Home view, it will render Main view, then render a Calendar view inside it.
1) The calendar will allow you to transverse from calender to check the show time of each day/month/week.
2) When click the grid, a drop down menu will be displayed to show detailed show time of that day.
2 All movies:
It will shows all the available movies which you inputted to DB.
3 Add movies:
It is input form will allows you to input movie info to the DB, used by a admin.

Problems need to fix:
1 Delete button in "all movie" view not working.
2 Need add in login feature for different group of people to log in.

How to play with it:
1 Install MongoDB and node.js in your machine.
2 Start mongodb:
like:
  ~/your_path_of_mongodb/mongod
3 Create a db named "nationalpark"
4 use nationalpark, create a collection called "messages"
5 In the message collection, insert some movie data like below format:
{ "end" : "1385380920000", "start" : "1385380800000", "len" : "120", "desc" : "World War Z is a 2013 British-American apocalyptic film directed by Marc Forster. The screenplay by Matthew Michael Carnahan is based on the 2006 novel of the same name by Max Brooks", "title" : "World War Z", "date" : ISODate("2013-11-25T12:00:00Z"), "_id" : ObjectId("52aa4f35c86d4b0005000032") }
{ "end" : "1387980120000", "start" : "1387980000000", "len" : "120", "desc" : "Grand Masti also referred to as Masti 2 is a Bollywood adult comedy film directed by Indra Kumar and produced by Ashok Thakeria", "title" : "Grand Masti", "date" : ISODate("2013-12-25T14:00:00Z"), "_id" : ObjectId("52aa4f7fc86d4b000500004c") }
6 Go to source code folder, launch app:
node server.js
