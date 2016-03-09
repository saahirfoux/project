# Employer Contacts Example

Please check APIDocumentation.pdf for details concerning the server routes.

- Use 'npm install' and 'bower install' to download the proper resources.
- Start the server with 'node server' from the root dir
- The server configuration file resides at server/configuration.js. Edit this to change the DB and port that the server works with.
- If no employer information is found in the database it is seeded from the list at server/data/employerSeed.js
- As I don't know Angular I chose Backbone/Marionette for the client implementation.  Give me a few more days and I can have an iOS implementation done too.
- Tested the API using the chrome Postman plugin/app.  JSON data for the puts/posts needs to be sent along with the 'Content-Type: applicaiton/json' header.