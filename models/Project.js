const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projecttitle: {
        type: String,
        required: true
    },
    principalinvestigator: {
        type: String,
        required: true
    },
    fundingagency: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    projecttype: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    awardyear: {
        type: String,
        required: false
    },
    fundreceived: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;