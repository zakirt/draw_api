'use strict';

module.exports = class Drawing {
    constructor({
        creatorId,
        creatorName = null,
        dateCreated,
        timeToComplete,
        dataUrl,
        isPrivate = false
    }) {
        this.creatorId = creatorId;
        this.creatorName = creatorName;
        this.dateCreated = dateCreated;
        this.timeToComplete = timeToComplete;
        this.dataUrl = dataUrl;
        this.isPrivate = isPrivate;
    }
};