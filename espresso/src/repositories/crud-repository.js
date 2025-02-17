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
        const response = await this.model.findByPk(data);
        if (!response) {
            logger.error(`Something went wrong in CRUD Repo during get operation:${error}`)
            throw new DatabaseError('Not able to fund the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data) { // data -> {col: value, ....}
        const response = await this.model.update(data, {
            where: {
                id: id
            }
        })
        return response;
    }

    async getByPrimaryContact(contactNumber) {
        const response = await this.model.findOne({ where: { mobile: contactNumber } })
        return response;
    }
}

module.exports = CrudRepository;