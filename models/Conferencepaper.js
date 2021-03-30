const mongoose = require('mongoose');

const ConferencePaperSchema = new mongoose.Schema({
    facultyname: {
        type: String,
        required: true
    },
    booktitle: {
        type: String,
        required: true
    },
    papertitle: {
        type: String,
        required: true
    },
    conferencetitle: {
        type: String,
        required: true
    },
    conferencename: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: false
    },
    publicationyear: {
        type: String,
        required: true
    },
    issnisbn: {
        type: String,
        required: false
    },
    affiliatinginstitute: {
        type: String,
        required: false
    },
    publishername: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ConferencePaper = mongoose.model('ConferencePaper', ConferencePaperSchema);
module.exports = ConferencePaper;