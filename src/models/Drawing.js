'use strict';

module.exports = class Drawing {
    constructor({
        userId,
        dateCreated,
        dataUrl,
        isPrivate
    }) {
        this.userId = userId;
        this.dateCreated = dateCreated;
        this.dataUrl = dataUrl;
        this.isPrivate = isPrivate;
    }
};