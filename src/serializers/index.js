'use strict';

const { Serializer: JsonApiSerializer, Error: JsonApiError } = require('jsonapi-serializer');

const globalSerializationConfig = {
    keyForAttribute: 'camelCase'
};

module.exports.userSerializer = new JsonApiSerializer('users', {
    id: 'userId',
    ...{
        attributes: ['email', 'displayName', 'dateCreated', 'token']
    },
    ...globalSerializationConfig
});

module.exports.drawingSerializer = new JsonApiSerializer('drawings', {
    id: 'drawingId',
    attributes: ['creatorId', 'creatorName', 'dateCreated', 'timeToComplete', 'isPrivate', 'dataUrl'],
    meta: {
        count: (records) => {
            return records.length;
        },
    },
    ...globalSerializationConfig
});

module.exports.createJsonApiError = (errorConfig) => {
    return new JsonApiError(errorConfig);
};
