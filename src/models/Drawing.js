'use strict';

module.exports = class Drawing {
    constructor({
        creatorId,
        creatorName = null,
        dateCreated,
        dataUrl,
        isPrivate = false
    }) {
        this.creatorId = creatorId;
        this.creatorName = creatorName;
        this.dateCreated = dateCreated;
        this.dataUrl = dataUrl;
        this.isPrivate = isPrivate;
    }
};