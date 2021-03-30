const mongoose = require('mongoose');

const PatentSchema = new mongoose.Schema({
    patenttitle: {
        type: String,
        required: true
    },
    teamleader: {
        type: String,
        required: true
    },
    number_inventor: {
        type: String,
        required: true
    },
    inventor: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    filedon: {
        type: String,
        required: false
    },
    patentnumber: {
        type: String,
        required: false
    },
    patentyear: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Patent = mongoose.model('Patent', PatentSchema);
module.exports = Patent;