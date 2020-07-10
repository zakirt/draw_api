'use strict';

module.exports = class User {
    constructor({
        email,
        displayName,
        dateCreated
    }) {
        this.email = email;
        this.displayName = displayName;
        this.dateCreated = dateCreated;
    }
};