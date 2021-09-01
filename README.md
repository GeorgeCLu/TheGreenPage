# TheGreenPage

This is a WIP demonstration app of a Yellow pages clone using GraphQL.

The frontend is written in Typescript with React and uses Apollo Client.
It is deployed as a Azure Static Web App here:
https://witty-tree-028be3200.azurestaticapps.net/

The backend GraphQL server code uses Node.js and Apollo-server and is deployed as a Azure Function App and connects to a document database in MongoDB Atlas. 
Code can be found here:
https://github.com/GeorgeCLu/TheGreenPage_GraphQL_server

Currently there is no backend user authentication, so any username and password can be used to login to post or edit (but not currently delete) a listing.

The GraphQL server will check if any email addresses posted or edited are valid or not by making a call to an external api at https://eva.pingutil.com/ and will reject requests that do not contain a valid email.
