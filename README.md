# mini-wp by Hermi

## **Installation and getting started **
```javascript
$ npm init -y (inside root server folder)
$ npm install (inside root server folder)
$ npm run dev or nodemon app.js (on terminal inside root server folder)
$ live-server --host=localhost (on terminal inside root client folder)
```
## **Usage**

Access server via `http://localhost:4000`<br>
Access client via `http://localhost:8080`

##  Routes
|       Routes       |  HTTP  | Header(s) |                             Body                             |                           Response                           |        Description         |
| :----------------: | :----: | :-------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------------------------: |
|       /users       |  POST  |   none    | firstName:String(**required**)<br />lastName:String(**required**)<br/>email:String(**required**)
password:String(**required**) | **Success**: Register a user, **Error**: Internal server error (Validation) |      Register a user       |
|  /users/webLogin   |  POST  |   none    | email: String (**required**), password: String (**required**) | **Success**: Login as a user, **Error**: Internal server error (Validation) |      Login as a user       |
| /users/googleLogin |  POST  |   none    | email: String (**required**), password: String (**required**) | **Success**: Login as a user via Google, **Error**: Internal server error (Validation) | Login as a user via Google |
|     /articles      |  GET   |   token   |                             none                             | **Success**: Fetch All posted articles, **Error**: Internal server error (Validation) |     Fetch all Article      |
|     /myarticle     |  GET   |   token   |                             none                             | **Success**: Fetch User posted articles, **Error**: Internal server error (Validation) |     Fetch User Article     |
|     /articles      |  POST  |   token   | title: String (**required**), content: String (**required**), featured_image: File (**optional**) | **Success**: Create an article, **Error**: Internal server error (Validation) |     Create an article      |
|   /articles/:id    |  PUT   |   token   | title: String (**optional**), content: String (**optional**), featured_image: File (**optional**) | **Success**: Update an article, **Error**: Internal server error (Validation) |     Update an article      |
|   /articles/:id    | DELETE |   token   |                             none                             | **Success**: Delete an article, **Error**: Internal server error (Validation) |     Delete an article      |