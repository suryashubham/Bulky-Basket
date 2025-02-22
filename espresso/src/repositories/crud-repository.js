const { StatusCodes } = require('http-status-codes');

const { DatabaseError } = require('../utils/errors/database-error');
const logger = require('../utils/common/logger');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data) {
        const response = await this.model.destroy({
            where: {
                id: data
            }
        });
        if (!response) {
            logger.error(`Something went wrong in CRUD Repo during deletion:${error}`)
            throw new DatabaseError('Not able to fund the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(data) {
        const whereCondition = {};
        if (data.id) whereCondition.id = data.id;
        if (data.mobile) whereCondition.mobile = data.mobile;

        const response = await this.model.scope(null).findOne({ where: whereCondition });
        if (!response) {
            logger.error(`Something went wrong in CRUD Repo during get operation:${error}`)
            throw new DatabaseError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response.toJSON({ includeSensitive: true });;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data) {
        const response = await this.model.update(data, {
            where: {
                id: id
            }
        })
        return response;
    }

    async doesUserExist(query) {
        try {
            if (!query.userId && !query.mobile) {
                throw new DatabaseError("Provide at least userId or mobile for the query.", StatusCodes.NOT_FOUND);
            }

            const whereCondition = {};
            if (query.userId) whereCondition.id = query.userId;
            if (query.mobile) whereCondition.mobile = query.mobile;

            const user = await this.model.findOne({ where: whereCondition });
            return !!user;
        } catch (error) {
            logger.error(`Error checking user existence:${error.message}`);
            throw new DatabaseError("Error while checking the user", StatusCodes.NOT_FOUND);
        }
    }
}

module.exports = CrudRepository;