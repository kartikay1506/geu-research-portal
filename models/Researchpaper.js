const mongoose = require('mongoose');

const ResearchPaperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    journalname: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    publicationyear: {
        type: String,
        required: false
    },
    publishedwith: {
        type: String,
        required: true
    },
    issn: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ResearchPaper = mongoose.model('ResearchPaper', ResearchPaperSchema);
module.exports = ResearchPaper;