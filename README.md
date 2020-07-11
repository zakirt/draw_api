# Draw API

This is a REST API service for the drawing app coding chalenge from TalkSpace.
The API service is using Firebase for storage and authentication.

## Routes

The following routes are exposed by the API service:

* /user/login
* /user/register
* /drawing/list
* /drawing/save
* /drawing/delete/:id

All routes, except **register**, expect valid auth token to be present in the request header.

## Missing features

The following features are either missing, or could be improved upon.

* Unit tests
* Logout feature - [See "How to log out when using JWT" post](https://dev.to/_arpy/how-to-log-out-when-using-jwt-4ajm) for more info.
* Auth token regeneration
* Standardized API format, such as [JSON:API](https://jsonapi.org/)