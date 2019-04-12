const db = require('./connection.js');
const Joi = require('joi');

const tours = db.get('tours');

const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.string().required()
})

function getAll() {
    return tours.find();
}

function create(tour) {
    const result = Joi.validate(tour, schema);
    if (result.error == null) {
        tour.created = new Date();
        return tours.insert(tour);
    } else {
        return Promise.reject(result.error);
    }
}

function deleteTour(tour) {
    tours.findOneAndDelete({_id: tour._id});
    return tours.find();
}

function editTour(tour) {
    console.log(tour._id);
    return tours.findOneAndUpdate(
        { "_id": tour._id},
        { $set: {"title": tour.title, "description": tour.description, "author": tour.author, "price": tour.price}}
    ).catch((error) => {
        console.log(error);
    })
}

function getTour(tour) {
    return tours.findOne(
        { '_id': tour.id}
    )
    .catch((error) => {
        console.log(error);
    })
}

module.exports = {
    getAll,
    create,
    deleteTour,
    editTour,
    getTour
};
