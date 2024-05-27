const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/rentify', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
};

module.exports = db;
