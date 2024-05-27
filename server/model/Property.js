const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String], // Assuming amenities are stored as an array of strings
        // required: true
    },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
