const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        activePolls: {
            // May be we will add activePolls type as Poll
            type: Array 
        },
        archivedPolls: {
            // May be we will add archivedPolls type as Poll
            type: Array
        }

    }, {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;