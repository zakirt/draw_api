'use strict';

const UnitOfWork = require('../persistence/UnitOfWork');

module.exports = class UserService {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }

    async createNewUser(userId, userData) {
        try {
            return await this.unitOfWork.users.writeUserData(userId, userData);
        } catch (e) {
            throw e;
        }
    }
};