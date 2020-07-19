const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const pollSchema = new Schema(
    {
        createdBy: {
            type: ObjectId
        },
        pollTitle: {
            type: String,
            require: true
        },
        pollId: {
            type: String,
            require: true
        },
        pollPasscode: {
            type: String,
            require: true
        },
        startDate: {
            type: Date,
            require: true
        },
        endDate: {
            type: Date,
            require: true
        },
        maxVoteLimit: {
            type: Number,
            require: true
        },
        // images: {
        //     type: Array,
        //     require: true
        // },
    },

    {
        timestamps: true
    }
);

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;