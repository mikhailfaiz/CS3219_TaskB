let mongoose = require('mongoose');

let schema = mongoose.Schema({

    name: {
        type: String,
        required: true
    }, 

    cost: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    }
});

let bikePart = module.exports = mongoose.model('bikePart', schema);

module.exports.get = function (callback, limit) {
    bikePart.find(callback).limit(limit);
}
