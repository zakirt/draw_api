# Draw API

This is a REST API service for the drawing app coding chalenge from TalkSpace.
The API service is using Firebase for storage and authentication.

## Routes

The following routes are exposed by the API service:

* **POST** /user/login - sign in user
* **PUT** /user/register - create new user
* **GET** /drawing/list - retrieve a list of public drawings
* **PUT** /drawing - save drawing
* **GET** /drawing/:id - retrieve a drawing created by any user (includes public  & private drawings)
* **DELETE** /drawing/delete/:id - delete specified drawing. Only deletes drawings belonging to the logged in user.

All routes, except **register**, expect valid auth token to be present in the request header.

## Missing features

The following features are either missing, or could be improved upon.

* Unit tests
* Logout feature - [See "How to log out when using JWT" post](https://dev.to/_arpy/how-to-log-out-when-using-jwt-4ajm) for more info.
* Auth token regeneration
* Standardized API format, such as [JSON:API](https://jsonapi.org/)