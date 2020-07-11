'use strict';

module.exports = class UserService {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }

    async createNewUser(userId, userData) {
        return await this.unitOfWork.users.writeUserData(userId, userData);
    }
};