const db = require('./connection.js');
const Joi = require('joi');

const guides = db.get('guides');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    age: Joi.string().required(),
    sex: Joi.string().required()
})

function getAll() {
    return guides.find();
}

function create(guide) {
    const result = Joi.validate(guide, schema);
    if (result.error == null) {
        guide.created = new Date();
        return guides.insert(guide);
    } else {
        return Promise.reject(result.error);
    }
}

function deleteGuide(guide) {
    guides.findOneAndDelete({_id: guide._id});
    return guides.find();
}

function editGuide(guide) {
    return guides.findOneAndUpdate(
        { "_id": guide._id},
        { $set: {"name": guide.name, "address": guide.address, "age": guide.age, "sex": guide.sex}}
    ).catch((error) => {
        console.log(error);
    })
}

function getGuide(guide) {
    return guides.findOne(
        { "_id": guide.id}
    )
    .catch((error) => {
        console.log(error);
    })
}

module.exports = {
    getAll,
    create,
    deleteGuide,
    editGuide,
    getGuide
};
