const { createModel } = require('mongoose-gridfs');

// use default bucket
const Attachment = createModel();

// or create custom bucket with custom options
const Attachment = createModel({
    modelName: 'Attachment',
    connection: 'mongodb://localhost/photo_voting_app';
});


module.exports = Attachment;